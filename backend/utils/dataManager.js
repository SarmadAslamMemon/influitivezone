import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

class DataManager {
  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    this.dataPath = path.join(__dirname, '../data');
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000; // 5 minutes cache
  }

  /**
   * Load and cache company data files
   */
  async loadCompanyInfo() {
    return this.loadFile('company-info.txt', 'text');
  }

  async loadPortfolio() {
    return this.loadFile('portfolio.json', 'json');
  }

  async loadServices() {
    return this.loadFile('services.json', 'json');
  }

  async loadPricing() {
    return this.loadFile('pricing.json', 'json');
  }

  async loadContact() {
    return this.loadFile('contact.json', 'json');
  }

  /**
   * Generic file loader with caching
   */
  async loadFile(filename, type = 'json') {
    const cacheKey = `${filename}_${type}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        return cached.data;
      }
    }

    try {
      const filePath = path.join(this.dataPath, filename);
      const fileContent = await fs.readFile(filePath, 'utf8');
      
      let data;
      if (type === 'json') {
        data = JSON.parse(fileContent);
      } else {
        data = fileContent;
      }

      // Cache the result
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error(`❌ Error loading ${filename}:`, error.message);
      return null;
    }
  }

  /**
   * Clear cache (useful for development)
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Search for specific information across data files
   */
  async searchPortfolioByKeyword(keyword) {
    const portfolio = await this.loadPortfolio();
    if (!portfolio) return [];

    const lowerKeyword = keyword.toLowerCase();
    return portfolio.filter(project => 
      project.project.toLowerCase().includes(lowerKeyword) ||
      project.client.toLowerCase().includes(lowerKeyword) ||
      project.description.toLowerCase().includes(lowerKeyword) ||
      project.technologies.some(tech => tech.toLowerCase().includes(lowerKeyword))
    );
  }

  async searchServicesByKeyword(keyword) {
    const services = await this.loadServices();
    if (!services) return [];

    const lowerKeyword = keyword.toLowerCase();
    return services.filter(service =>
      service.title.toLowerCase().includes(lowerKeyword) ||
      service.description.toLowerCase().includes(lowerKeyword) ||
      service.features.some(feature => feature.toLowerCase().includes(lowerKeyword))
    );
  }

  async findPricingByService(serviceKeyword) {
    const pricing = await this.loadPricing();
    if (!pricing) return null;

    const lowerKeyword = serviceKeyword.toLowerCase();
    
    // Search in packages
    const packages = pricing.packages?.filter(pkg =>
      pkg.name.toLowerCase().includes(lowerKeyword) ||
      pkg.services.some(service => service.toLowerCase().includes(lowerKeyword))
    ) || [];

    // Search in services
    const services = {};
    if (pricing.services) {
      Object.keys(pricing.services).forEach(key => {
        if (key.toLowerCase().includes(lowerKeyword)) {
          services[key] = pricing.services[key];
        }
      });
    }

    return {
      packages,
      services,
      addOns: pricing.addOns || [],
      discounts: pricing.discounts || {}
    };
  }

  /**
   * Get formatted contact information
   */
  async getContactInfo(department = null) {
    const contact = await this.loadContact();
    if (!contact) return null;

    if (department && contact.departments && contact.departments[department]) {
      return {
        general: contact.contact,
        department: contact.departments[department],
        officeHours: contact.officeHours,
        address: contact.address,
        meetingOptions: contact.meetingOptions,
        responseTime: contact.responseTime
      };
    }

    return contact;
  }

  /**
   * Get company overview
   */
  async getCompanyOverview() {
    const companyInfo = await this.loadCompanyInfo();
    const contact = await this.loadContact();
    
    if (!companyInfo) return null;

    return {
      info: companyInfo,
      contact: contact?.contact || {},
      tagline: contact?.tagline || 'Your Digital Growth Partner'
    };
  }
}

export default DataManager;