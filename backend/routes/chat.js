import express from 'express';
import DataManager from '../utils/dataManager.js';
import QueryAnalyzer from '../utils/queryAnalyzer.js';
import ResponseGenerator from '../utils/responseGenerator.js';
import SentimentAnalyzer from '../utils/sentiment.js';
import LeadSaver from '../utils/leadSaver.js';
import SessionManager from '../utils/sessionManager.js';

const router = express.Router();

// Initialize components
const dataManager = new DataManager();
const queryAnalyzer = new QueryAnalyzer();
const responseGenerator = new ResponseGenerator(dataManager, queryAnalyzer);
const sentimentAnalyzer = new SentimentAnalyzer();
const leadSaver = new LeadSaver();
const sessionManager = new SessionManager();

// Initialize data manager on startup
(async () => {
  try {
    console.log('🚀 Initializing enhanced chatbot system...');
    
    // Pre-load and validate data files
    const [companyInfo, portfolio, services, pricing, contact] = await Promise.all([
      dataManager.loadCompanyInfo(),
      dataManager.loadPortfolio(),
      dataManager.loadServices(),
      dataManager.loadPricing(),
      dataManager.loadContact()
    ]);
    
    const loadedFiles = {
      companyInfo: !!companyInfo,
      portfolio: !!portfolio,
      services: !!services,
      pricing: !!pricing,
      contact: !!contact
    };
    
    console.log('📁 Data files loaded:', loadedFiles);
    console.log('✅ Enhanced chatbot ready for intelligent queries');
    
  } catch (error) {
    console.error('❌ Failed to initialize chatbot:', error.message);
    console.log('💡 Application will continue with limited functionality');
  }
})();

// Main chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, conversationId, sessionId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a string'
      });
    }

    // Use sessionId or conversationId for session tracking
    const currentSessionId = sessionId || conversationId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`💬 New chat message: "${message.substring(0, 100)}..." (Session: ${currentSessionId})`);

    // 1. Update session message count
    sessionManager.incrementMessageCount(currentSessionId);
    const sessionInfo = sessionManager.getSessionInfo(currentSessionId);
    const hasLeadCaptured = sessionManager.hasLeadCaptured(currentSessionId);

    console.log(`📊 Session info:`, {
      sessionId: currentSessionId,
      messageCount: sessionInfo.messageCount,
      leadCaptured: hasLeadCaptured
    });

    // 2. Analyze the query to determine response strategy
    const analysisResult = queryAnalyzer.analyzeQuery(message);
    console.log(`🔍 Query analysis:`, {
      type: analysisResult.type,
      category: analysisResult.category,
      strategy: analysisResult.strategy,
      confidence: analysisResult.confidence
    });

    // 3. Analyze sentiment for tone
    const sentimentResult = await sentimentAnalyzer.analyzeWithFallback(message);
    console.log(`🎭 Detected tone: ${sentimentResult.tone} (confidence: ${sentimentResult.confidence})`);

    // 4. Extract lead information
    const leadInfo = leadSaver.extractLeadInfo(message);
    const hasLead = leadSaver.hasLeadInfo(leadInfo);
    
    if (hasLead) {
      console.log('👤 Lead information detected:', {
        name: leadInfo.name,
        email: leadInfo.email,
        project: leadInfo.project ? leadInfo.project.substring(0, 50) + '...' : 'N/A'
      });
      
      // Update session with lead information
      sessionManager.updateSessionWithLead(currentSessionId, leadInfo);
    }

    // 5. Generate response using the enhanced system
    // Pass session info to response generator to avoid duplicate lead requests
    const aiResponse = await responseGenerator.generateResponse(message, analysisResult, { hasLeadCaptured });

    // 6. Save lead if detected
    let leadSaved = false;
    if (hasLead) {
      const saveResult = await leadSaver.saveLead(leadInfo, 'chatbot');
      leadSaved = saveResult.success;
    }

    // 7. Clean up old sessions periodically
    if (sessionInfo.messageCount % 10 === 0) {
      sessionManager.cleanupOldSessions();
    }

    // 8. Return response
    res.json({
      success: true,
      reply: aiResponse,
      sessionId: currentSessionId,
      analysis: {
        type: analysisResult.type,
        category: analysisResult.category,
        strategy: analysisResult.strategy,
        confidence: analysisResult.confidence
      },
      tone: sentimentResult.tone,
      leadSaved,
      leadInfo: hasLead ? {
        name: leadInfo.name,
        email: leadInfo.email,
        project: leadInfo.project
      } : null,
      sessionInfo: {
        messageCount: sessionInfo.messageCount,
        leadCaptured: hasLeadCaptured
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check endpoint
router.get('/health', async (req, res) => {
  try {
    const leadsCount = await leadSaver.getLeadsCount();
    
    // Check data files availability
    const dataStatus = {
      companyInfo: !!(await dataManager.loadCompanyInfo()),
      portfolio: !!(await dataManager.loadPortfolio()),
      services: !!(await dataManager.loadServices()),
      pricing: !!(await dataManager.loadPricing()),
      contact: !!(await dataManager.loadContact())
    };

    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        dataFiles: dataStatus,
        leads: {
          count: leadsCount
        },
        enhancedChatbot: {
          queryAnalysis: true,
          dataIntegration: true,
          responseTuning: true
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get leads endpoint (for admin purposes)
router.get('/leads', async (req, res) => {
  try {
    const leads = await leadSaver.getAllLeads();
    res.json({
      success: true,
      leads,
      count: leads.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Data management endpoints
router.post('/refresh-data', async (req, res) => {
  try {
    dataManager.clearCache();
    
    const [companyInfo, portfolio, services, pricing, contact] = await Promise.all([
      dataManager.loadCompanyInfo(),
      dataManager.loadPortfolio(),
      dataManager.loadServices(),
      dataManager.loadPricing(),
      dataManager.loadContact()
    ]);
    
    res.json({
      success: true,
      message: 'Data refreshed successfully',
      dataStatus: {
        companyInfo: !!companyInfo,
        portfolio: !!portfolio,
        services: !!services,
        pricing: !!pricing,
        contact: !!contact
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Test query analysis endpoint (for debugging)
router.post('/analyze-query', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      });
    }
    
    const analysisResult = queryAnalyzer.analyzeQuery(message);
    
    res.json({
      success: true,
      message,
      analysis: analysisResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
