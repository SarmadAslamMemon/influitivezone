class QueryAnalyzer {
  constructor() {
    // Keywords that indicate factual queries requiring data files
    this.factualKeywords = {
      portfolio: ['portfolio', 'projects', 'work', 'examples', 'case studies', 'clients', 'previous work'],
      services: ['services', 'what do you do', 'offerings', 'solutions', 'capabilities', 'expertise'],
      pricing: ['pricing', 'cost', 'price', 'how much', 'rates', 'budget', 'packages', 'quote'],
      contact: ['contact', 'reach', 'call', 'email', 'address', 'phone', 'location', 'office', 'hours']
    };

    // Keywords for service/package explanation queries
    this.serviceExplanationKeywords = [
      'what is web development', 'what is app development', 'what is branding',
      'explain web development', 'explain app development', 'explain branding',
      'what does web development include', 'what does app development include',
      'what does branding include', 'what are your packages', 'tell me about packages'
    ];

    // Keywords for advice/comparison queries
    this.adviceKeywords = [
      'vs', 'versus', 'better', 'should I choose', 'which is better',
      'app vs web', 'web vs app', 'what should I do', 'recommend',
      'pros and cons', 'comparison', 'decide', 'choice', 'should I',
      'or mobile', 'or web', 'mobile or web', 'web or mobile'
    ];

    // Keywords that indicate creative/advisory queries
    this.creativeKeywords = [
      'suggest', 'ideas', 'tips', 'inspiration', 'design ideas',
      'website ideas', 'branding ideas', 'creative', 'help me brainstorm',
      'what would you', 'guidance', 'strategy', 'approach'
    ];

    // Greeting patterns
    this.greetingPatterns = [
      /^(hi|hello|hey|good morning|good afternoon|good evening)/i,
      /^(what's up|how are you|howdy)/i
    ];
  }

  /**
   * Analyze user query and determine response strategy
   */
  analyzeQuery(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Check for greetings
    if (this.isGreeting(lowerMessage)) {
      return {
        type: 'greeting',
        confidence: 0.9,
        strategy: 'predefined'
      };
    }

    // Check for service explanation queries
    const serviceExplanationMatch = this.detectServiceExplanationQuery(lowerMessage);
    if (serviceExplanationMatch.detected) {
      return {
        type: 'service_explanation',
        keywords: serviceExplanationMatch.keywords,
        confidence: serviceExplanationMatch.confidence,
        strategy: 'service_explanation'
      };
    }

    // Check for advice/comparison queries
    const adviceMatch = this.detectAdviceQuery(lowerMessage);
    if (adviceMatch.detected) {
      return {
        type: 'advice',
        keywords: adviceMatch.keywords,
        confidence: adviceMatch.confidence,
        strategy: 'advice_comparison'
      };
    }

    // Check for factual queries
    const factualMatch = this.detectFactualQuery(lowerMessage);
    if (factualMatch.detected) {
      return {
        type: 'factual',
        category: factualMatch.category,
        keywords: factualMatch.keywords,
        confidence: factualMatch.confidence,
        strategy: 'data_driven'
      };
    }

    // Check for creative/advisory queries
    const creativeMatch = this.detectCreativeQuery(lowerMessage);
    if (creativeMatch.detected) {
      return {
        type: 'creative',
        keywords: creativeMatch.keywords,
        confidence: creativeMatch.confidence,
        strategy: 'ai_generation'
      };
    }

    // Default to general query
    return {
      type: 'general',
      confidence: 0.5,
      strategy: 'general_response'
    };
  }

  /**
   * Detect greeting messages
   */
  isGreeting(message) {
    return this.greetingPatterns.some(pattern => pattern.test(message));
  }

  /**
   * Detect service explanation queries
   */
  detectServiceExplanationQuery(message) {
    const matches = this.serviceExplanationKeywords.filter(keyword => message.includes(keyword));
    
    return {
      detected: matches.length > 0,
      keywords: matches,
      confidence: Math.min(matches.length * 0.5, 0.9)
    };
  }

  /**
   * Detect advice/comparison queries
   */
  detectAdviceQuery(message) {
    const matches = this.adviceKeywords.filter(keyword => message.includes(keyword));
    
    return {
      detected: matches.length > 0,
      keywords: matches,
      confidence: Math.min(matches.length * 0.4, 0.8)
    };
  }

  /**
   * Detect factual queries that require data files
   */
  detectFactualQuery(message) {
    let highestConfidence = 0;
    let bestCategory = null;
    let matchedKeywords = [];

    // Check each category
    Object.keys(this.factualKeywords).forEach(category => {
      const keywords = this.factualKeywords[category];
      const matches = keywords.filter(keyword => message.includes(keyword));
      
      if (matches.length > 0) {
        const confidence = matches.length / keywords.length;
        if (confidence > highestConfidence) {
          highestConfidence = confidence;
          bestCategory = category;
          matchedKeywords = matches;
        }
      }
    });

    return {
      detected: highestConfidence > 0,
      category: bestCategory,
      keywords: matchedKeywords,
      confidence: Math.min(highestConfidence * 2, 1) // Boost confidence but cap at 1
    };
  }

  /**
   * Detect creative/advisory queries
   */
  detectCreativeQuery(message) {
    const matches = this.creativeKeywords.filter(keyword => message.includes(keyword));
    
    return {
      detected: matches.length > 0,
      keywords: matches,
      confidence: Math.min(matches.length * 0.3, 0.9)
    };
  }

  /**
   * Extract specific search terms from the query
   */
  extractSearchTerms(message, category) {
    const words = message.toLowerCase().split(/\s+/);
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'about', 'can', 'you', 'show', 'me', 'what', 'how', 'do', 'does', 'is', 'are'];
    
    // Remove stop words and factual keywords
    const categoryKeywords = this.factualKeywords[category] || [];
    const meaningfulWords = words.filter(word => 
      word.length > 2 && 
      !stopWords.includes(word) && 
      !categoryKeywords.includes(word)
    );

    return meaningfulWords;
  }

  /**
   * Generate appropriate system prompt based on query type
   */
  generateSystemPrompt(analysisResult, companyContext = '') {
    const basePrompt = "You are a professional assistant for Influitive Zone, a web development, design, and branding agency.";
    const behaviorRules = "Always greet the user politely and acknowledge their query before answering. Introduce the company briefly when relevant. Keep responses professional, friendly, and welcoming.";
    
    switch (analysisResult.type) {
      case 'greeting':
        return `${basePrompt} ${behaviorRules} Respond to greetings warmly, briefly introduce the company services (web development, app development, branding), and ask how you can help with their digital needs.`;
      
      case 'factual':
        return `${basePrompt} ${behaviorRules} For factual queries about portfolio, services, pricing, or contact, use ONLY the company data files provided. Do not guess or invent details. If information is missing, respond with "I don't have that information." Always start with a polite greeting.`;
      
      case 'service_explanation':
        return `${basePrompt} ${behaviorRules} When explaining services or packages, provide clear but concise explanations of what the service includes. Keep it simple and user-friendly, not overly technical. Mention available packages or pricing tiers if appropriate. Keep answers short but understandable.`;
      
      case 'advice':
        return `${basePrompt} ${behaviorRules} For advice or comparison queries, provide balanced, reasonable suggestions with short pros and cons. Explain key factors (audience, budget, features, timeline). Keep answers under 6 sentences, concise but informative. End with a recommendation or next step.`;
      
      case 'creative':
        return `${basePrompt} ${behaviorRules} For creative/idea queries, use your general knowledge as a web and branding expert. Provide practical, relevant suggestions that align with the company's style and services. Encourage engagement by offering to show portfolio examples or discuss specific needs.`;
      
      default:
        return `${basePrompt} ${behaviorRules} Provide helpful information about digital services. ${companyContext} Always start with a polite greeting, give a clear contextual answer, and suggest a next step if helpful.`;
    }
  }
}

module.exports = QueryAnalyzer;