import axios from 'axios';

class ResponseGenerator {
  constructor(dataManager, queryAnalyzer) {
    this.dataManager = dataManager;
    this.queryAnalyzer = queryAnalyzer;

    // Ollama configuration
    this.OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    this.OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'tinyllama';
  }

  /**
   * Generate response based on query analysis
   */
  async generateResponse(message, analysisResult, sessionContext = {}) {
    try {
      switch (analysisResult.strategy) {
        case 'predefined':
          return this.generatePredefinedResponse(analysisResult);

        case 'data_driven':
          return await this.generateDataDrivenResponse(message, analysisResult, sessionContext);

        case 'service_explanation':
          return await this.generateServiceExplanationResponse(message, analysisResult);

        case 'advice_comparison':
          return await this.generateAdviceResponse(message, analysisResult);

        case 'ai_generation':
          return await this.generateAIResponse(message, analysisResult);

        case 'general_response':
          return await this.generateGeneralResponse(message, analysisResult);

        default:
          return await this.generateFallbackResponse(message);
      }
    } catch (error) {
      console.error('❌ Error generating response:', error);
      return this.generateErrorResponse();
    }
  }

  /**
   * Generate predefined responses (e.g., greetings)
   */
  generatePredefinedResponse(analysisResult) {
    if (analysisResult.type === 'greeting') {
      const greetings = [
        "Hello! Welcome to Influitive Zone. I'm here to help you with all your digital needs - from web development and mobile apps to digital marketing and branding. How can I assist you today?",
        "Hi there! Great to meet you. I'm the Influitive Zone assistant, ready to help with any questions about our services, portfolio, pricing, or to discuss your digital project ideas. What can I help you with?",
        "Hey! Welcome to Influitive Zone, your digital growth partner. I'm here to assist with questions about web development, mobile apps, digital marketing, branding, or anything else. How can I help you today?",
        "Hello and welcome! I'm here to help you explore how Influitive Zone can support your digital goals. Whether you're interested in our services, want to see our work, or need creative advice, I'm ready to assist. What brings you here today?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    return "Hello! How can I help you with your digital needs today?";
  }

  /**
   * Generate data-driven responses using company files
   */
  async generateDataDrivenResponse(message, analysisResult, sessionContext = {}) {
    const { category } = analysisResult;
    let data = null;
    let contextText = '';

    try {
      // Load relevant data based on category
      switch (category) {
        case 'portfolio':
          data = await this.dataManager.loadPortfolio();
          if (data) {
            // Check for specific search terms
            const searchTerms = this.queryAnalyzer.extractSearchTerms(message, category);
            if (searchTerms.length > 0) {
              const filteredProjects = await this.dataManager.searchPortfolioByKeyword(searchTerms.join(' '));
              data = filteredProjects.length > 0 ? filteredProjects : data;
            }
            contextText = this.formatPortfolioData(data);
          }
          break;

        case 'services':
          data = await this.dataManager.loadServices();
          if (data) {
            const searchTerms = this.queryAnalyzer.extractSearchTerms(message, category);
            if (searchTerms.length > 0) {
              const filteredServices = await this.dataManager.searchServicesByKeyword(searchTerms.join(' '));
              data = filteredServices.length > 0 ? filteredServices : data;
            }
            contextText = this.formatServicesData(data);
          }
          break;

        case 'pricing':
          // For pricing queries, provide instant response based on memory specification
          data = await this.dataManager.loadPricing();
          if (data) {
            const searchTerms = this.queryAnalyzer.extractSearchTerms(message, category);

            // Check if user asks for "all services pricing"
            const isAllPricingQuery = message.includes('all services') || message.includes('all pricing') ||
              message.includes('everything') || message.includes('complete pricing');

            if (isAllPricingQuery) {
              // Provide comprehensive pricing for all services per memory specification
              return this.generateRegionSpecificPricingResponse(message);
            } else if (searchTerms.length > 0) {
              const filteredPricing = await this.dataManager.findPricingByService(searchTerms.join(' '));
              data = filteredPricing || data;
            }

            // For specific pricing queries, provide region-specific response
            return this.generateRegionSpecificPricingResponse(message);
          }
          break;

        case 'contact':
          data = await this.dataManager.loadContact();
          if (data) {
            contextText = this.formatContactData(data);
          }
          break;

        case 'timeline':
        case 'technology':
        case 'process':
        case 'about':
        case 'thankyou':
        case 'leadcapture':
          // For these categories, we don't need specific data files
          // Just use the enhanced fallback responses
          contextText = '';
          break;

        default:
          return "I don't have specific information about that. How else can I help you?";
      }

      // For categories without data files, contextText might be empty, which is fine
      if (data && !contextText) {
        return "I don't have that information available right now. Please contact us directly for more details.";
      }

      // Use direct fallback responses for better performance and reliability
      console.log(`📊 Using ${category} data for response`);
      return this.generateFallbackDataResponse(category, contextText, message);

    } catch (error) {
      console.error('❌ Error in data-driven response:', error);
      return "I'm having trouble accessing that information right now. Please try again or contact us directly.";
    }
  }

  /**
   * Generate enhanced fallback response using simple-chat.js data
   */
  generateFallbackDataResponse(category, contextText, message = '') {
    // Extract key information from contextText for more dynamic responses
    let dynamicInfo = '';

    if (contextText) {
      // Extract first few lines of relevant data
      const lines = contextText.split('\n').filter(line => line.trim()).slice(0, 3);
      if (lines.length > 0) {
        dynamicInfo = lines.join(' ');
        // Limit length to avoid overwhelming responses
        if (dynamicInfo.length > 200) {
          dynamicInfo = dynamicInfo.substring(0, 197) + '...';
        }
      }
    }

    switch (category) {
      case 'portfolio':
        return `Hey there! 🎨 Check out our amazing portfolio here: http://localhost:3000/portfolio-dark`;

      case 'services':
        return `Great question! We're passionate about providing web development, mobile apps, digital marketing, and branding services. ${dynamicInfo ? `Here's what we provide: ${dynamicInfo}` : "We use modern technologies like React, Next.js, Node.js, React Native, and cloud platforms for our projects."} What interests you most?`;

      case 'pricing':
        return this.generateRegionSpecificPricingResponse(message);

      case 'contact':
        return `I'd love to help you get in touch! You can contact us through our website contact form, email us at info@influitivezone.com, call us at +1-555-0123, or continue chatting with me for more information. ${dynamicInfo ? `Here are our details: ${dynamicInfo}` : "We're available Monday-Friday 9AM-6PM and offer both in-person and virtual consultations."} We'd love to discuss your project!`;

      case 'timeline':
        return `Good question! Project timelines vary: Basic websites (2-4 weeks), E-commerce sites (4-8 weeks), Mobile apps (8-16 weeks), Marketing campaigns (ongoing). ${dynamicInfo ? `Here's more detail: ${dynamicInfo}` : "Let's discuss your specific timeline requirements!"}`;

      case 'technology':
        return `Great question! We use modern technologies like React, Next.js, Node.js, React Native, and cloud platforms for our projects. ${dynamicInfo ? `Here's our tech stack: ${dynamicInfo}` : "Technology that works!"} What specific technology interests you?`;

      case 'process':
        return `I'm glad you asked! Our process is simple: 1) Consultation to understand your needs 2) Planning and design 3) Development 4) Testing 5) Launch and support. ${dynamicInfo ? `Here's more detail: ${dynamicInfo}` : "Easy!"} Would you like to know more about any specific step?`;

      case 'about':
        return `Nice to meet you! This is Influitive Zone - a passionate digital agency that creates websites, mobile apps, and digital marketing solutions for businesses like yours. ${dynamicInfo ? `Here's more about us: ${dynamicInfo}` : "We're here to help your business grow!"} What can I help you with today?`;

      case 'thankyou':
        // Check if lead has already been captured in this session
        if (sessionContext.hasLeadCaptured) {
          return this.generateGoodbyeResponse();
        }
        return this.generateThankYouResponse();
      
      case 'leadcapture':
        return this.generateLeadCaptureResponse();
      
      default:
        return `I'm here to help! I can tell you all about our digital agency services. ${dynamicInfo ? `Here's some info: ${dynamicInfo}` : "What interests you - web development, mobile apps, marketing, or branding?"}`;
    }
  }

  /**
   * Generate thank you response with lead capture request
   */
  generateThankYouResponse() {
    const responses = [
      "Thank you for chatting with us! Before you go, would you mind sharing your contact details so we can send you helpful resources or special offers? Just your name and email would be great!",
      "It was great talking with you! Could I quickly get your contact information? We'd love to keep you updated on our latest services and special deals.",
      "Thanks for your time! One quick favor - could you share your email or phone number? We occasionally send valuable tips and exclusive offers to our community.",
      "Wonderful chatting with you! Would you like to stay connected? Just share your contact details and we'll send you helpful resources and updates about our services.",
      "Thank you! Before you leave, could you share your contact info? We'd love to send you some valuable resources and keep you informed about our latest projects and offers."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Generate lead capture response when user provides contact info
   */
  generateLeadCaptureResponse() {
    const responses = [
      "Perfect! Thank you for sharing your contact information. Our team will reach out to you within 24 hours to discuss your project. Have a wonderful day! 🎉",
      "Excellent! We've received your contact details. Our project manager will contact you soon to discuss your requirements. Thanks for choosing Influitive Zone! ✨",
      "Great! Your information has been saved. We'll be in touch shortly to help you with your project. Have an amazing day! 🚀",
      "Wonderful! Thank you for providing your contact information. Our team will reach out to you soon. We look forward to working with you! 💫",
      "Perfect! We've got your contact details. Our team will contact you within 24 hours to discuss your project. Thank you for choosing us! 🌟"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Generate goodbye response when lead has already been captured
   */
  generateGoodbyeResponse() {
    const responses = [
      "Thank you for chatting with us! Have a wonderful day! 😊",
      "It was great talking with you! Take care! 👋",
      "Thanks for your time! Have an amazing day! ✨",
      "Wonderful chatting with you! See you later! 🌟",
      "Thank you! Have a great day! 🎉"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Generate region-specific pricing response
   */
  generateRegionSpecificPricingResponse(message = '') {
    const pricingData = {
      USA: {
        currency: '$',
        region: 'United States',
        flag: '🇺🇸',
        plans: [
          { name: 'Starter', price: 299, description: 'Perfect for small businesses and startups' },
          { name: 'Professional', price: 499, description: 'Ideal for growing businesses and teams', featured: true },
          { name: 'Enterprise', price: 799, description: 'For large organizations and enterprises' }
        ]
      },
      UAE: {
        currency: 'AED',
        region: 'United Arab Emirates',
        flag: '🇦🇪',
        plans: [
          { name: 'Starter', price: 1095, description: 'Perfect for small businesses and startups' },
          { name: 'Professional', price: 1825, description: 'Ideal for growing businesses and teams', featured: true },
          { name: 'Enterprise', price: 2920, description: 'For large organizations and enterprises' }
        ]
      },
      UK: {
        currency: '£',
        region: 'United Kingdom',
        flag: '🇬🇧',
        plans: [
          { name: 'Starter', price: 220, description: 'Perfect for small businesses and startups' },
          { name: 'Professional', price: 370, description: 'Ideal for growing businesses and teams', featured: true },
          { name: 'Enterprise', price: 590, description: 'For large organizations and enterprises' }
        ]
      }
    };

    // Detect region from message
    const detectedRegion = this.queryAnalyzer.detectRegion(message);

    if (detectedRegion && pricingData[detectedRegion]) {
      // Show specific region pricing
      const regionData = pricingData[detectedRegion];
      return `Happy to share our ${regionData.region} pricing! ${regionData.flag}

**${regionData.region} (${regionData.currency}):**
• Starter: ${regionData.currency}${regionData.plans[0].price}/month - ${regionData.plans[0].description}
• Professional: ${regionData.currency}${regionData.plans[1].price}/month - ${regionData.plans[1].description} ⭐ Most Popular
• Enterprise: ${regionData.currency}${regionData.plans[2].price}/month - ${regionData.plans[2].description}

All plans include mobile app access, analytics, and support. Would you like details about a specific plan?`;
    } else {
      // Show all regions
      const usaPricing = pricingData.USA;

      return `Happy to share our pricing! We offer region-specific pricing plans:

${usaPricing.flag} **${usaPricing.region} (${usaPricing.currency}):**
• Starter: ${usaPricing.currency}${usaPricing.plans[0].price}/month - ${usaPricing.plans[0].description}
• Professional: ${usaPricing.currency}${usaPricing.plans[1].price}/month - ${usaPricing.plans[1].description} ⭐ Most Popular
• Enterprise: ${usaPricing.currency}${usaPricing.plans[2].price}/month - ${usaPricing.plans[2].description}

${pricingData.UAE.flag} **${pricingData.UAE.region} (${pricingData.UAE.currency}):** Starter: ${pricingData.UAE.currency}1,095 | Professional: ${pricingData.UAE.currency}1,825 | Enterprise: ${pricingData.UAE.currency}2,920
${pricingData.UK.flag} **${pricingData.UK.region} (${pricingData.UK.currency}):** Starter: ${pricingData.UK.currency}220 | Professional: ${pricingData.UK.currency}370 | Enterprise: ${pricingData.UK.currency}590

All plans include mobile app access, analytics, and support. What region are you in, or would you like details about a specific plan?`;
    }
  }

  /**
   * Generate AI responses for creative/advisory queries
   */
  async generateAIResponse(message, analysisResult) {
    try {
      // Get company context for relevant advice
      const companyOverview = await this.dataManager.getCompanyOverview();
      const companyContext = companyOverview ?
        `Consider that our company specializes in web development, mobile apps, digital marketing, and branding.` :
        '';

      const systemPrompt = this.queryAnalyzer.generateSystemPrompt(analysisResult, companyContext);

      const prompt = `${systemPrompt}

USER MESSAGE: "${message}"

Start with a polite, professional greeting. Then provide helpful, actionable advice using your knowledge while relating it to our company's expertise in web development, mobile apps, digital marketing, and branding. End by encouraging further discussion or questions. Keep responses friendly, welcoming, and under 150 words.`;

      return await this.callOllama(prompt);
    } catch (error) {
      console.error('❌ Error in AI response generation:', error);
      return this.generateFallbackResponse(message);
    }
  }

  /**
   * Generate complete pricing response for "all services" queries
   */
  generateCompletePricingResponse(pricingData) {
    let response = "Hello! I'd be happy to share our complete pricing information.\n\n";

    // Add packages
    if (pricingData.packages) {
      response += "📦 PACKAGES:\n";
      pricingData.packages.forEach(pkg => {
        response += `• ${pkg.name}: ${pkg.price} - ${pkg.bestFor}\n`;
      });
      response += "\n";
    }

    // Add individual services
    if (pricingData.services) {
      response += "🔧 INDIVIDUAL SERVICES:\n";
      Object.keys(pricingData.services).forEach(key => {
        const service = pricingData.services[key];
        response += `• ${key.charAt(0).toUpperCase() + key.slice(1)}: `;
        if (typeof service === 'object') {
          response += Object.values(service).join(', ');
        } else {
          response += service;
        }
        response += "\n";
      });
      response += "\n";
    }

    // Add discounts
    if (pricingData.discounts) {
      response += "💰 DISCOUNTS AVAILABLE:\n";
      Object.keys(pricingData.discounts).forEach(key => {
        response += `• ${pricingData.discounts[key]}\n`;
      });
    }

    response += "\nWould you like to discuss a specific service or get a custom quote? Feel free to ask!";
    return response;
  }

  /**
   * Generate instant pricing response for specific queries
   */
  generateInstantPricingResponse(pricingData, query) {
    const lowerQuery = query.toLowerCase();
    let response = "Hello! Here's the pricing information you requested:\n\n";

    // Detect specific service mentions
    if (lowerQuery.includes('web') || lowerQuery.includes('website')) {
      response += "🌐 WEB DEVELOPMENT:\n";
      if (pricingData.services?.webDevelopment) {
        Object.keys(pricingData.services.webDevelopment).forEach(key => {
          response += `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${pricingData.services.webDevelopment[key]}\n`;
        });
      }
    }

    if (lowerQuery.includes('app') || lowerQuery.includes('mobile')) {
      response += "📱 MOBILE APP DEVELOPMENT:\n";
      if (pricingData.services?.mobileApp) {
        Object.keys(pricingData.services.mobileApp).forEach(key => {
          response += `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${pricingData.services.mobileApp[key]}\n`;
        });
      }
    }

    if (lowerQuery.includes('marketing') || lowerQuery.includes('digital marketing')) {
      response += "📈 DIGITAL MARKETING:\n";
      if (pricingData.services?.digitalMarketing) {
        Object.keys(pricingData.services.digitalMarketing).forEach(key => {
          response += `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${pricingData.services.digitalMarketing[key]}\n`;
        });
      }
    }

    if (lowerQuery.includes('brand') || lowerQuery.includes('logo')) {
      response += "🎨 BRANDING:\n";
      if (pricingData.services?.branding) {
        Object.keys(pricingData.services.branding).forEach(key => {
          response += `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${pricingData.services.branding[key]}\n`;
        });
      }
    }

    if (lowerQuery.includes('package')) {
      response += "📦 PACKAGES:\n";
      if (pricingData.packages) {
        pricingData.packages.forEach(pkg => {
          response += `• ${pkg.name}: ${pkg.price} - ${pkg.bestFor}\n`;
        });
      }
    }

    response += "\nWould you like more details about any specific service or package? I'm here to help!";
    return response;
  }

  /**
   * Generate service explanation responses
   */
  async generateServiceExplanationResponse(message, analysisResult) {
    try {
      // Load relevant service data for context
      const services = await this.dataManager.loadServices();
      const pricing = await this.dataManager.loadPricing();

      let contextData = '';
      if (services) {
        contextData += 'SERVICES OVERVIEW:\n' + this.formatServicesData(services) + '\n\n';
      }
      if (pricing) {
        contextData += 'PRICING PACKAGES:\n' + this.formatPricingData(pricing);
      }

      const systemPrompt = this.queryAnalyzer.generateSystemPrompt(analysisResult);

      const prompt = `${systemPrompt}

COMPANY DATA:
${contextData}

USER QUERY: "${message}"

Start with a polite greeting. Provide a clear but concise explanation of what the service includes. Keep it simple and user-friendly, not overly technical. If appropriate, mention available packages or pricing tiers. Keep answer short but understandable.`;

      return await this.callOllama(prompt);
    } catch (error) {
      console.error('❌ Error in service explanation response:', error);
      return this.generateFallbackResponse(message);
    }
  }

  /**
   * Generate advice/comparison responses
   */
  async generateAdviceResponse(message, analysisResult) {
    try {
      const systemPrompt = this.queryAnalyzer.generateSystemPrompt(analysisResult);

      const prompt = `${systemPrompt}

USER QUERY: "${message}"

Start with a polite greeting. Provide balanced, reasonable suggestions with short pros and cons. Explain key factors (audience, budget, features, timeline). Keep answers under 6 sentences, concise but informative. End with a recommendation or next step (e.g., "We can suggest a package if you share your goals.").`;

      return await this.callOllama(prompt);
    } catch (error) {
      console.error('❌ Error in advice response:', error);
      return this.generateFallbackResponse(message);
    }
  }

  /**
   * Generate general responses
   */
  async generateGeneralResponse(message, analysisResult) {
    try {
      const systemPrompt = this.queryAnalyzer.generateSystemPrompt(analysisResult);

      const prompt = `${systemPrompt}

USER MESSAGE: "${message}"

Start with a polite greeting. Give a clear, contextual answer. If helpful, suggest a next step (e.g., view portfolio, check packages, contact us). Keep response professional, friendly, and welcoming.`;

      return await this.callOllama(prompt);
    } catch (error) {
      console.error('❌ Error in general response:', error);
      return this.generateFallbackResponse(message);
    }
  }

  /**
   * Generate fallback response
   */
  async generateFallbackResponse(message) {
    const prompt = `You are a professional assistant for Influitive Zone, a web development, design, and branding agency.
    
Always greet the user politely and professionally before answering. Keep responses friendly, welcoming, professional, and helpful. Encourage further engagement or discussion after answering.
    
User message: "${message}"

Start with a professional greeting, then provide a brief, helpful response. If you can't answer specifically, politely offer to help with services, pricing, portfolio, or contact information. End by encouraging further questions.`;

    try {
      return await this.callOllama(prompt);
    } catch (error) {
      return this.generateErrorResponse();
    }
  }

  /**
   * Generate error response
   */
  generateErrorResponse() {
    return "Hello! I'm having some technical difficulties right now, but I'd still love to help you. Please feel free to contact us directly at info@influitivezone.com or call +1 (555) 123-4567 for immediate assistance. Our team is ready to discuss your digital needs!";
  }

  /**
   * Call Ollama API with optimized parameters
   */
  async callOllama(prompt) {
    try {
      const response = await axios.post(`${this.OLLAMA_BASE_URL}/api/generate`, {
        model: this.OLLAMA_MODEL,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 200,
          repeat_penalty: 1.3
        }
      });

      let reply = response.data.response || '';

      // Clean up the response
      reply = this.cleanResponse(reply);

      return reply || "I'm not sure how to help with that. Could you please rephrase your question?";
    } catch (error) {
      console.error('❌ Ollama API error:', error.message);
      throw error;
    }
  }

  /**
   * Clean AI response text
   */
  cleanResponse(text) {
    if (!text) return '';

    // Remove common AI prefixes and artifacts
    text = text.replace(/^(AI:|Assistant:|Bot:|Response:)\s*/i, '');
    text = text.replace(/^(User:|Human:)\s*.*/gm, '');

    // Remove "DATA PROVIDED:" prefix if present
    text = text.replace(/^DATA PROVIDED:\s*/i, '');
    text = text.replace(/^DATA PROVIDED\s*/i, '');

    // Take the first meaningful line, but allow longer responses
    const lines = text.split('\n').filter(line => line.trim() && !line.includes('DATA PROVIDED'));
    if (lines.length > 0) {
      text = lines[0];
    }

    // Allow longer responses for better user experience
    if (text.length > 300) {
      text = text.substring(0, 297) + '...';
    }

    return text.trim();
  }

  /**
   * Format portfolio data for AI consumption
   */
  formatPortfolioData(portfolio) {
    if (!Array.isArray(portfolio)) return '';

    return portfolio.map(project =>
      `Project: ${project.project} (Client: ${project.client})
      Description: ${project.description}
      Technologies: ${project.technologies.join(', ')}
      Results: ${project.results}
      Duration: ${project.duration}, Budget: ${project.budget}`
    ).join('\n\n');
  }

  /**
   * Format services data for AI consumption
   */
  formatServicesData(services) {
    if (!Array.isArray(services)) return '';

    return services.map(service =>
      `Service: ${service.title}
      Description: ${service.description}
      Features: ${service.features.join(', ')}
      Pricing: ${service.pricing}`
    ).join('\n\n');
  }

  /**
   * Format pricing data for AI consumption
   */
  formatPricingData(pricing) {
    if (!pricing) return '';

    let formatted = '';

    if (pricing.packages) {
      formatted += 'PACKAGES:\n';
      pricing.packages.forEach(pkg => {
        formatted += `${pkg.name} (${pkg.category}): ${pkg.price}
        Services: ${pkg.services.join(', ')}
        Best for: ${pkg.bestFor}\n\n`;
      });
    }

    if (pricing.services) {
      formatted += 'INDIVIDUAL SERVICES:\n';
      Object.keys(pricing.services).forEach(key => {
        const service = pricing.services[key];
        formatted += `${key}: ${typeof service === 'object' ? Object.values(service).join(', ') : service}\n`;
      });
    }

    if (pricing.discounts) {
      formatted += '\nDISCOUNTS:\n';
      Object.keys(pricing.discounts).forEach(key => {
        formatted += `${key}: ${pricing.discounts[key]}\n`;
      });
    }

    return formatted;
  }

  /**
   * Format contact data for AI consumption
   */
  formatContactData(contact) {
    if (!contact) return '';

    return `CONTACT INFORMATION:
    Email: ${contact.contact?.email}
    Phone: ${contact.contact?.phone}
    Website: ${contact.contact?.website}
    
    ADDRESS:
    ${contact.address?.street}
    ${contact.address?.city}, ${contact.address?.state} ${contact.address?.zip}
    
    OFFICE HOURS:
    ${contact.officeHours?.weekdays}
    ${contact.officeHours?.saturday}
    ${contact.officeHours?.sunday}
    
    RESPONSE TIME: ${contact.responseTime}
    
    MEETING OPTIONS:
    ${contact.meetingOptions?.join('\n    ')}`;
  }
}

export default ResponseGenerator;