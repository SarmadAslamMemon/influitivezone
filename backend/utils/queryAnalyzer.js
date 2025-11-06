class QueryAnalyzer {
  constructor() {
    // Keywords that indicate factual queries requiring data files
    this.factualKeywords = {
      portfolio: ['portfolio', 'projects', 'work', 'examples', 'case studies', 'clients', 'previous work', 'show me', 'can i see', 'look at', 'have a look', 'showcase', 'samples'],
      services: ['services', 'what do you do', 'offerings', 'solutions', 'capabilities', 'expertise', 'what can you do'],
      pricing: ['pricing', 'cost', 'price', 'how much', 'rates', 'budget', 'packages', 'quote'],
      contact: ['contact', 'reach', 'call', 'email', 'address', 'phone', 'location', 'office', 'hours', 'get in touch', 'contact you', 'contact details', 'contact info'],
      timeline: ['time', 'duration', 'long', 'quick', 'fast', 'ready', 'timeline', 'when', 'how long', 'how much time', 'urgent', 'asap', 'rush', 'immediately', 'soon', 'faster', 'expedite', 'priority'],
      technology: ['technology', 'tech', 'framework', 'react', 'next.js', 'node.js', 'react native', 'cloud', 'technologies'],
      process: ['process', 'how', 'work', 'create', 'make', 'build', 'methodology', 'approach', 'steps', 'how it works'],
      about: ['about', 'company', 'who are you', 'tell me about', 'introduction'],
      thankyou: ['thanks', 'thank you', 'thankyou', 'thx', 'ty', 'appreciate', 'grateful', 'ok got it', 'got it', 'okay', 'alright', 'perfect', 'great', 'awesome', 'wonderful', 'excellent', 'good', 'nice', 'bye', 'goodbye', 'good bye', 'see you', 'talk later', 'have a good', 'take care', 'farewell', 'catch you later', 'until next time', 'ok thanks', 'okay thanks', 'alright thanks', 'ok', 'OK'],
      leadcapture: ['my email', 'my mail', 'email is', 'mail is', 'my phone', 'phone is', 'my number', 'number is', 'contact me at', 'reach me at', 'call me', 'my name is', 'name is', 'i am', 'giving my', 'here is my', 'my contact']
    };

    // Region detection keywords
    this.regionKeywords = {
      USA: ['usa', 'united states', 'america', 'us', 'dollar', 'usd', '$'],
      UAE: ['uae', 'united arab emirates', 'dubai', 'abu dhabi', 'aed', 'dirham'],
      UK: ['uk', 'united kingdom', 'britain', 'england', 'gbp', 'pound', '£']
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

    // Keywords that indicate general knowledge queries (need web search)
    this.generalKnowledgeKeywords = [
      'what is', 'how does', 'explain', 'tell me about', 'define',
      'meaning of', 'difference between', 'compare', 'vs', 'versus',
      'how to', 'tutorial', 'guide', 'steps', 'process', 'work',
      'benefits of', 'advantages', 'disadvantages', 'pros and cons',
      'best practices', 'trends', 'latest', 'current', 'recent',
      'news about', 'update on', 'information about', 'can you tell me',
      'so can tell me', 'i asked you about', 'i wanna know',
      'show me', 'examples', 'portfolio', 'projects', 'work'
    ];

    // Keywords that indicate technical queries (need web search)
    this.technicalKeywords = [
      'code', 'programming', 'development', 'API', 'database',
      'framework', 'library', 'syntax', 'error', 'bug', 'debug',
      'tutorial', 'documentation', 'implementation', 'example',
      'react', 'node', 'javascript', 'python', 'java', 'php',
      'mysql', 'mongodb', 'aws', 'docker', 'git', 'deployment',
      'web development', 'app development', 'mobile development',
      'frontend', 'backend', 'full stack', 'responsive design',
      'next.js', 'nextjs', 'what is', 'how does', 'explain',
      'tell me about', 'can you tell me', 'working', 'for'
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

    // Check for general knowledge queries FIRST (before factual)
    const generalKnowledgeMatch = this.detectGeneralKnowledgeQuery(lowerMessage);
    if (generalKnowledgeMatch.detected) {
      return {
        type: 'general_knowledge',
        keywords: generalKnowledgeMatch.keywords,
        confidence: generalKnowledgeMatch.confidence,
        strategy: 'web_search_enhanced'
      };
    }

    // Check for technical queries
    const technicalMatch = this.detectTechnicalQuery(lowerMessage);
    if (technicalMatch.detected) {
      return {
        type: 'technical',
        keywords: technicalMatch.keywords,
        confidence: technicalMatch.confidence,
        strategy: 'web_search_enhanced'
      };
    }

    // Check for factual queries (company-specific)
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
   * Detect general knowledge queries that need web search
   */
  detectGeneralKnowledgeQuery(message) {
    const matches = this.generalKnowledgeKeywords.filter(keyword => message.includes(keyword));
    
    return {
      detected: matches.length > 0,
      keywords: matches,
      confidence: Math.min(matches.length * 0.4, 0.9)
    };
  }

  /**
   * Detect technical queries that need web search
   */
  detectTechnicalQuery(message) {
    const matches = this.technicalKeywords.filter(keyword => message.includes(keyword));
    
    return {
      detected: matches.length > 0,
      keywords: matches,
      confidence: Math.min(matches.length * 0.3, 0.9)
    };
  }

  /**
   * Detect region from query
   */
  detectRegion(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [region, keywords] of Object.entries(this.regionKeywords)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return region;
      }
    }
    
    return null; // No specific region detected
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
    const basePrompt = "You are Zooni AI Assistant, a professional assistant for Influitive Zone, a web development, design, and branding agency.";
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
      
      case 'general_knowledge':
        return `${basePrompt} ${behaviorRules} For general knowledge queries, think step by step: 1) Understand what the user is asking, 2) Use your knowledge and any provided context, 3) Provide a clear, helpful explanation, 4) Relate it to our digital services when relevant. Be thorough but concise.`;
      
      case 'technical':
        return `${basePrompt} ${behaviorRules} For technical queries, provide accurate, detailed explanations. Think through the problem step by step, explain concepts clearly, and offer practical solutions. If relevant, mention how our development team can help implement these solutions.`;
      
      default:
        return `${basePrompt} ${behaviorRules} Provide helpful information about digital services. ${companyContext} Always start with a polite greeting, give a clear contextual answer, and suggest a next step if helpful.`;
    }
  }
}

export default QueryAnalyzer;