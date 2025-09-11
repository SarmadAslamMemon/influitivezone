const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs').promises;
const path = require('path');

class LeadSaver {
  constructor() {
    this.csvPath = path.join(__dirname, '../data/leads.csv');
    this.csvWriter = createCsvWriter({
      path: this.csvPath,
      header: [
        { id: 'timestamp', title: 'Timestamp' },
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'phone', title: 'Phone' },
        { id: 'project', title: 'Project Description' },
        { id: 'budget', title: 'Budget' },
        { id: 'company', title: 'Company' },
        { id: 'message', title: 'Original Message' },
        { id: 'source', title: 'Source' }
      ],
      append: true
    });
  }

  extractLeadInfo(text) {
    const leadInfo = {
      name: null,
      email: null,
      phone: null,
      project: null,
      budget: null,
      company: null,
      message: text
    };

    // Email regex
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emailMatch = text.match(emailRegex);
    if (emailMatch) {
      leadInfo.email = emailMatch[0];
    }

    // Phone regex (various formats)
    const phoneRegex = /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g;
    const phoneMatch = text.match(phoneRegex);
    if (phoneMatch) {
      leadInfo.phone = phoneMatch[0];
    }

    // Name extraction (look for "I'm [name]", "My name is [name]", etc.)
    const namePatterns = [
      /(?:i'?m|i am|my name is|call me)\s+([a-zA-Z\s]{2,30})/gi,
      /(?:this is|it's)\s+([a-zA-Z\s]{2,30})/gi,
      /^([a-zA-Z\s]{2,30})\s+(?:here|speaking)/gi
    ];

    for (const pattern of namePatterns) {
      const match = text.match(pattern);
      if (match) {
        const name = match[0].replace(/(?:i'?m|i am|my name is|call me|this is|it's|here|speaking)/gi, '').trim();
        if (name.length > 1 && name.length < 30) {
          leadInfo.name = name;
          break;
        }
      }
    }

    // Project description extraction
    const projectKeywords = [
      'project', 'website', 'app', 'design', 'development', 'marketing', 'branding',
      'logo', 'ecommerce', 'portfolio', 'landing page', 'mobile app', 'web app'
    ];

    const projectPatterns = [
      /(?:i need|i want|i'm looking for|i require|i'm interested in)\s+([^.!?]{10,200})/gi,
      /(?:project|website|app|design|development|marketing|branding)\s+([^.!?]{10,200})/gi,
      /(?:build|create|develop|design|make)\s+([^.!?]{10,200})/gi
    ];

    for (const pattern of projectPatterns) {
      const match = text.match(pattern);
      if (match) {
        const project = match[0].trim();
        if (project.length > 10) {
          leadInfo.project = project;
          break;
        }
      }
    }

    // Budget extraction
    const budgetPatterns = [
      /(?:budget|budget is|budget of|spending|cost)\s*:?\s*\$?([0-9,]+(?:k|thousand|million)?)/gi,
      /\$([0-9,]+(?:k|thousand|million)?)/g,
      /([0-9,]+(?:k|thousand|million)?)\s*(?:dollars?|usd|budget)/gi
    ];

    for (const pattern of budgetPatterns) {
      const match = text.match(pattern);
      if (match) {
        leadInfo.budget = match[0].replace(/[^\d,kthousandmillion]/gi, '').trim();
        break;
      }
    }

    // Company extraction
    const companyPatterns = [
      /(?:company|business|organization|firm|agency)\s+(?:is|name is|called)\s+([a-zA-Z\s&.,]{2,50})/gi,
      /(?:at|from|working at)\s+([a-zA-Z\s&.,]{2,50})/gi,
      /^([a-zA-Z\s&.,]{2,50})\s+(?:company|corp|inc|llc|ltd)/gi
    ];

    for (const pattern of companyPatterns) {
      const match = text.match(pattern);
      if (match) {
        const company = match[0].replace(/(?:company|business|organization|firm|agency|is|name is|called|at|from|working at|corp|inc|llc|ltd)/gi, '').trim();
        if (company.length > 2 && company.length < 50) {
          leadInfo.company = company;
          break;
        }
      }
    }

    return leadInfo;
  }

  hasLeadInfo(leadInfo) {
    return !!(leadInfo.email || leadInfo.phone || leadInfo.name || leadInfo.project);
  }

  async saveLead(leadInfo, source = 'chatbot') {
    try {
      // Ensure data directory exists
      const dataDir = path.dirname(this.csvPath);
      await fs.mkdir(dataDir, { recursive: true });

      // Check if file exists, if not create with headers
      try {
        await fs.access(this.csvPath);
      } catch {
        // File doesn't exist, create it with headers
        await this.csvWriter.writeRecords([]);
      }

      const leadRecord = {
        timestamp: new Date().toISOString(),
        name: leadInfo.name || '',
        email: leadInfo.email || '',
        phone: leadInfo.phone || '',
        project: leadInfo.project || '',
        budget: leadInfo.budget || '',
        company: leadInfo.company || '',
        message: leadInfo.message || '',
        source: source
      };

      await this.csvWriter.writeRecords([leadRecord]);
      
      console.log('✅ Lead saved successfully:', {
        name: leadInfo.name,
        email: leadInfo.email,
        project: leadInfo.project ? leadInfo.project.substring(0, 50) + '...' : 'N/A'
      });

      return {
        success: true,
        leadId: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        savedFields: Object.keys(leadInfo).filter(key => leadInfo[key])
      };
    } catch (error) {
      console.error('❌ Error saving lead:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getLeadsCount() {
    try {
      const data = await fs.readFile(this.csvPath, 'utf8');
      const lines = data.split('\n').filter(line => line.trim());
      return Math.max(0, lines.length - 1); // Subtract header row
    } catch (error) {
      return 0;
    }
  }

  async getAllLeads() {
    try {
      const data = await fs.readFile(this.csvPath, 'utf8');
      const lines = data.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',');
      
      return lines.slice(1).map(line => {
        const values = line.split(',');
        const lead = {};
        headers.forEach((header, index) => {
          lead[header.trim()] = values[index] ? values[index].trim() : '';
        });
        return lead;
      });
    } catch (error) {
      console.error('❌ Error reading leads:', error);
      return [];
    }
  }
}

module.exports = LeadSaver;
