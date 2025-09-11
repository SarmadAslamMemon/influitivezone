const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

// Load pricing data
let pricingData = null;

async function loadPricingData() {
  try {
    const dataPath = path.join(__dirname, '../data/pricing.json');
    const data = await fs.readFile(dataPath, 'utf8');
    pricingData = JSON.parse(data);
  } catch (error) {
    console.error('❌ Error loading pricing data:', error.message);
  }
}

// Load pricing data on startup
loadPricingData();

// Function to check if query is a simple greeting
function isGreeting(message) {
  const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings'];
  const lowerMessage = message.toLowerCase().trim();
  return greetings.some(greeting => 
    lowerMessage === greeting || 
    lowerMessage.startsWith(greeting + ' ') ||
    lowerMessage.startsWith(greeting + ',')
  );
}

// Function to get appropriate greeting response
function getGreetingResponse() {
  const responses = [
    "Hello! How can I help you today?",
    "Hi there! What can I assist you with?",
    "Hey! How can I help you?",
    "Hello! What would you like to know about our services?",
    "Hi! I'm here to help. What do you need?"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}
// Function to check if query is about pricing
function isPricingQuery(message) {
  const pricingKeywords = ['price', 'pricing', 'cost', 'how much', 'package', 'rate', 'fee', 'budget', 'quote'];
  const lowerMessage = message.toLowerCase();
  return pricingKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Function to get direct response for common queries (bypassing AI)
function getDirectResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Service-related queries
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('what can you do')) {
    return "We provide web development, mobile apps, digital marketing, and branding services.";
  }
  
  // Web development queries
  if (lowerMessage.includes('web') || lowerMessage.includes('website') || lowerMessage.includes('site')) {
    return "We create responsive websites, e-commerce platforms, and custom web applications using modern technologies.";
  }
  
  // Mobile app queries
  if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
    return "We develop native iOS and Android apps, as well as cross-platform mobile applications.";
  }
  
  // Digital marketing queries
  if (lowerMessage.includes('marketing') || lowerMessage.includes('seo') || lowerMessage.includes('social media')) {
    return "We offer SEO, social media marketing, Google Ads, content marketing, and digital strategy services.";
  }
  
  // Branding queries
  if (lowerMessage.includes('brand') || lowerMessage.includes('logo') || lowerMessage.includes('design')) {
    return "We create brand identities, logos, marketing materials, and complete visual design solutions.";
  }
  
  // Company/About queries
  if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('who are you')) {
    return "Influitive Zone is a digital agency that creates websites, mobile apps, and digital marketing solutions for businesses.";
  }
  
  // Contact queries
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
    return "You can contact us through our website contact form or continue chatting with me for more information.";
  }
  
  // Help queries
  if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
    return "I can help you learn about our digital agency services. What interests you - web development, mobile apps, marketing, or branding?";
  }
  
  // Technology queries
  if (lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('framework')) {
    return "We use modern technologies like React, Next.js, Node.js, React Native, and cloud platforms for our projects.";
  }
  
  // Process/How it works queries
  if (lowerMessage.includes('process') || lowerMessage.includes('how') || lowerMessage.includes('work')) {
    return "Our process: 1) Consultation to understand your needs 2) Planning and design 3) Development 4) Testing 5) Launch and support.";
  }
  
  // Portfolio/Examples queries
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('example') || lowerMessage.includes('work') || lowerMessage.includes('project')) {
    return "We've created websites, mobile apps, and marketing campaigns for various industries. Contact us to see relevant examples for your business.";
  }
  
  // Timeline queries
  if (lowerMessage.includes('time') || lowerMessage.includes('long') || lowerMessage.includes('duration')) {
    return "Project timelines vary: Basic websites (2-4 weeks), E-commerce sites (4-8 weeks), Mobile apps (8-16 weeks), Marketing campaigns (ongoing).";
  }
  
  return null; // Use AI for other queries
}
// Function to extract pricing information based on query
function getPricingResponse(message) {
  if (!pricingData) return "I'll get back to you with pricing information shortly.";
  
  const lowerMessage = message.toLowerCase();
  
  // Check if user wants ALL services pricing
  if ((lowerMessage.includes('all') || lowerMessage.includes('every')) && (lowerMessage.includes('service') || lowerMessage.includes('pricing'))) {
    return `All Services: Web Development ($2,500-$15,000), Mobile Apps ($8,000-$25,000), Digital Marketing ($1,500-$5,000/month), Branding ($1,000-$10,000)`;
  }
  
  // Check for multiple services in one query
  let responses = [];
  
  if (lowerMessage.includes('web') || lowerMessage.includes('website')) {
    responses.push('Web Development: Basic ($2,500-$5,000), E-commerce ($5,000-$15,000), Custom ($10,000+)');
  }
  
  if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
    responses.push('Mobile Apps: Basic ($8,000-$12,000), Advanced ($15,000-$25,000), Enterprise ($25,000+)');
  }
  
  if (lowerMessage.includes('marketing') || lowerMessage.includes('seo') || lowerMessage.includes('digital marketing')) {
    responses.push('Digital Marketing: Basic ($1,500/month), Standard ($3,000/month), Premium ($5,000+/month)');
  }
  
  if (lowerMessage.includes('logo') || lowerMessage.includes('brand') || lowerMessage.includes('branding')) {
    responses.push('Branding: Logo ($1,000-$2,000), Complete Package ($3,000-$8,000), Enterprise ($10,000+)');
  }
  
  // If multiple services found, return all of them
  if (responses.length > 1) {
    return responses.join(' | ');
  }
  
  // If single service found, return it
  if (responses.length === 1) {
    return responses[0];
  }
  
  // Handle package queries
  if (lowerMessage.includes('package') || lowerMessage.includes('bundle')) {
    return `Our Packages: Starter ($2,500), Professional ($5,000), Enterprise ($10,000+). Discounts available for bundles!`;
  }
  
  // General pricing response
  return `Our services: Web Development ($2,500-$15,000), Mobile Apps ($8,000-$25,000), Digital Marketing ($1,500-$5,000/month), Branding ($1,000-$10,000)`;
}

const router = express.Router();

// Ollama configuration
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'tinylama';

// Generate response using TinyLLaMA via Ollama
async function generateResponse(prompt) {
  try {
    const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
      model: OLLAMA_MODEL,
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.3, // Very low temperature for focused responses
        top_p: 0.7,
        max_tokens: 25, // Extremely short to prevent spam
        stop: ["\n", "User:", "AI:", "Assistant:", "!", "."], // Stop at punctuation
        repeat_penalty: 1.5 // Very high penalty against repetition
      }
    });

    return response.data.response.trim();
  } catch (error) {
    console.error('❌ Error calling Ollama:', error);
    throw new Error('Failed to generate response from AI model');
  }
}

// Simple chat endpoint without RAG/sentiment
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a string'
      });
    }

    console.log(`💬 Simple chat message: "${message}"`);

    // Handle simple greetings first (fastest response)
    if (isGreeting(message)) {
      const greetingResponse = getGreetingResponse();
      
      return res.json({
        success: true,
        reply: greetingResponse,
        tone: 'friendly',
        confidence: 1.0,
        leadSaved: false,
        leadInfo: null,
        contextUsed: 0,
        model: 'greeting-handler',
        timestamp: new Date().toISOString()
      });
    }

    // Check if this is a pricing query and handle it directly
    if (isPricingQuery(message)) {
      const pricingResponse = getPricingResponse(message);
      
      return res.json({
        success: true,
        reply: pricingResponse,
        tone: 'neutral',
        confidence: 1.0,
        leadSaved: false,
        leadInfo: null,
        contextUsed: 0,
        model: 'pricing-data',
        timestamp: new Date().toISOString()
      });
    }

    // Check for direct responses (bypassing AI for common queries)
    const directResponse = getDirectResponse(message);
    if (directResponse) {
      return res.json({
        success: true,
        reply: directResponse,
        tone: 'neutral',
        confidence: 1.0,
        leadSaved: false,
        leadInfo: null,
        contextUsed: 0,
        model: 'direct-response',
        timestamp: new Date().toISOString()
      });
    }
    // For remaining queries, try to provide direct response instead of AI
    // Only use AI for very specific conversational queries
    const lowerMessage = message.toLowerCase();
    let cleanResponse;
    
    const shouldUseAI = !lowerMessage.includes('what') && 
                       !lowerMessage.includes('how') && 
                       !lowerMessage.includes('why') && 
                       !lowerMessage.includes('tell me') && 
                       !lowerMessage.includes('explain') &&
                       !lowerMessage.includes('describe');
    
    if (!shouldUseAI) {
      // Provide direct informational response
      cleanResponse = "We're Influitive Zone, a digital agency offering web development, mobile apps, digital marketing, and branding services. What specific information do you need?";
    } else {
      // Build a simple prompt with clear instructions
      const prompt = `Answer briefly in 20 words max about Influitive Zone digital agency services.

User: ${message}
Answer:`;

      // Generate response using TinyLLaMA
      const aiResponse = await generateResponse(prompt);

      // Aggressive response cleaning and fallback
      cleanResponse = aiResponse
        .replace(/^(AI:|Assistant:|Response:|Answer:)/gi, '') // Remove AI prefixes
        .replace(/User:.*$/gi, '') // Remove any user text
        .replace(/Influitive Zone.*?:/gi, '') // Remove company intro patterns
        .replace(/Digital Age.*?:/gi, '') // Remove digital age patterns
        .replace(/AI Assistance.*?:/gi, '') // Remove AI assistance patterns
        .split('\n')[0] // Take only first line
        .split('.')[0] + '.' // Take only first sentence
        .trim();

      // Check if response is still inappropriate (contains spam patterns)
      const spamPatterns = [
        'three answers',
        'thirty words',
        'website and app services include',
        'Digital Age',
        'Helpful AI assistant'
      ];
      
      const isSpamResponse = spamPatterns.some(pattern => 
        cleanResponse.toLowerCase().includes(pattern.toLowerCase())
      );

      // If AI generated spam or empty response, use intelligent fallback
      if (!cleanResponse || cleanResponse.length < 5 || isSpamResponse || cleanResponse.length > 100) {
        // Generate a smart fallback response based on query content
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('service')) {
          cleanResponse = "We offer web development, mobile apps, digital marketing, and branding services.";
        } else if (lowerMessage.includes('help')) {
          cleanResponse = "I'm here to help with information about our digital agency services.";
        } else if (lowerMessage.includes('web') || lowerMessage.includes('website')) {
          cleanResponse = "We create professional websites and web applications.";
        } else if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
          cleanResponse = "We develop mobile apps for iOS and Android platforms.";
        } else if (lowerMessage.includes('marketing')) {
          cleanResponse = "We provide digital marketing services including SEO and social media.";
        } else if (lowerMessage.includes('brand') || lowerMessage.includes('logo')) {
          cleanResponse = "We create brand identities and logo designs.";
        } else if (lowerMessage.includes('cost') || lowerMessage.includes('price')) {
          cleanResponse = "Our pricing varies by project. Ask about specific service pricing for details.";
        } else {
          cleanResponse = "We're a digital agency specializing in web development, apps, and marketing. What would you like to know?";
        }
      }
    }

    // Return response
    res.json({
      success: true,
      reply: cleanResponse,
      tone: 'neutral',
      confidence: 1.0,
      leadSaved: false,
      leadInfo: null,
      contextUsed: 0,
      model: OLLAMA_MODEL,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Simple chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      ollama: {
        model: OLLAMA_MODEL,
        url: OLLAMA_BASE_URL
      }
    }
  });
});

module.exports = router;
