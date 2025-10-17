import express from 'express';
import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import LeadSaver from '../utils/leadSaver.js';
import SentimentAnalyzer from '../utils/sentiment.js';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize LeadSaver and SentimentAnalyzer
const leadSaver = new LeadSaver();
const sentimentAnalyzer = new SentimentAnalyzer();

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

// Function to save contact details to CSV
async function saveContactToCSV(contactInfo) {
  try {
    const csvPath = path.join(__dirname, '../data/urgent_contacts.csv');
    const timestamp = new Date().toISOString();
    
    console.log('📁 Attempting to save contact to:', csvPath);
    console.log('📝 Contact info:', contactInfo);
    
    // Create CSV header if file doesn't exist
    let csvExists = true;
    try {
      await fs.access(csvPath);
      console.log('✅ CSV file already exists');
    } catch {
      csvExists = false;
      console.log('🆕 CSV file does not exist, will create with header');
    }
    
    let csvContent = '';
    if (!csvExists) {
      csvContent = 'Timestamp,Name,Email,Phone,Request_Type\n';
    }
    
    // Add the contact data
    csvContent += `${timestamp},"${contactInfo.name}","${contactInfo.email}","${contactInfo.phone}","Urgent Delivery"\n`;
    
    console.log('📄 CSV content to append:', csvContent);
    
    // Append to file
    await fs.appendFile(csvPath, csvContent);
    console.log('✅ Contact details saved to CSV successfully:', contactInfo);
    
    return true;
  } catch (error) {
    console.error('❌ Error saving contact to CSV:', error.message);
    console.error('❌ Full error:', error);
    return false;
  }
}

// Function to get response when user refuses to share contact details
function getContactRefusalResponse() {
  const responses = [
    "No problem at all! I completely understand. Feel free to reach out anytime if you need help with our services. Have a wonderful day!",
    "That's perfectly fine! Your privacy is important. If you ever need assistance with web development, apps, or marketing, just let me know. Have a great day!",
    "Absolutely no worries! I respect your privacy. You can always contact us through our website when you're ready. Take care and have an amazing day!",
    "No problem whatsoever! I understand completely. Feel free to browse our services and reach out whenever you need help. Have a fantastic day!",
    "That's totally fine! No pressure at all. I'm here whenever you need information about our digital services. Wishing you a wonderful day!"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// Function to check if user is declining to share contact info
function isContactRefusal(message) {
  const refusalKeywords = [
    'no', 'not giving', 'not sharing', 'don\'t want', 'won\'t share', 'refuse', 
    'decline', 'not interested', 'no thanks', 'sorry no', 'i won\'t', 'i don\'t want',
    'not providing', 'can\'t share', 'won\'t provide', 'not comfortable', 'prefer not',
    'don\'t give', 'not give', 'not tell', 'won\'t tell', 'keep private'
  ];
  
  const lowerMessage = message.toLowerCase();
  return refusalKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Function to extract contact details from message
function extractContactDetails(message) {
  const lowerMessage = message.toLowerCase();
  
  // FIRST: Check if user is refusing to share contact details
  if (isContactRefusal(message)) {
    console.log('🚫 User declined to share contact details');
    return null;
  }
  
  const contactInfo = {};
  
  // Skip if message contains profanity or is clearly rude
  const rudeWords = ['fuck', 'shit', 'damn', 'hell', 'asshole', 'bitch', 'bastard', 'piss off', 'fuck off', 'go to hell', 'shut up'];
  const isRude = rudeWords.some(word => lowerMessage.includes(word));
  if (isRude) {
    return null; // Don't extract contact from rude messages
  }
  
  // Check for explicit contact sharing patterns (more specific)
  const hasContactIntent = [
    'my name is', 'name is', 'i am', 'call me', 'my email', 'email is', 
    'my phone', 'phone is', 'contact me at', 'reach me at'
  ].some(pattern => lowerMessage.includes(pattern));
  
  // Only proceed if user shows intent to share contact info
  if (!hasContactIntent) {
    return null;
  }
  
  // Extract name (look for patterns like "my name is", "name is", "i am") - be more specific
  const namePatterns = [
    /(?:my name is|name is|i am|i'm|call me)\s+([a-zA-Z\s]{2,30})(?:\s|$|\.|,|and|my\semail|email|phone)/i,
    /(?:^|\s)([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)*)(?=\s+(?:my email|email|phone|and|$))/
  ];
  
  for (const pattern of namePatterns) {
    const nameMatch = message.match(pattern);
    if (nameMatch && nameMatch[1] && nameMatch[1].trim().length >= 2) {
      const name = nameMatch[1].trim();
      // Validate name (should be alphabetic with possible spaces) and not refusal words
      if (/^[a-zA-Z\s]{2,30}$/.test(name) && !['no', 'not', 'sorry', 'giving', 'sharing'].includes(name.toLowerCase())) {
        contactInfo.name = name;
        break;
      }
    }
  }
  
  // Extract email (only if user explicitly mentions email)
  if (lowerMessage.includes('email')) {
    const emailMatch = message.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
    if (emailMatch) {
      contactInfo.email = emailMatch[1];
    }
  }
  
  // Extract phone (only if user explicitly mentions phone/number)
  if (lowerMessage.includes('phone') || lowerMessage.includes('number') || lowerMessage.includes('call')) {
    const phoneMatch = message.match(/(?:phone|number|contact|call me at|reach me at)\s*(?:is|:)?\s*([0-9+\-\s()]{10,})/i);
    if (phoneMatch) {
      contactInfo.phone = phoneMatch[1].replace(/\s+/g, '').trim();
    }
  }
  
  // Return contact info only if we have meaningful contact details
  if (Object.keys(contactInfo).length > 0 && (contactInfo.name || contactInfo.email || contactInfo.phone)) {
    return {
      name: contactInfo.name || 'Not provided',
      email: contactInfo.email || 'Not provided', 
      phone: contactInfo.phone || 'Not provided'
    };
  }
  
  return null;
}

// Function to check if query is a thank you or goodbye
function isThankYouOrGoodbye(message) {
  const thankYouKeywords = [
    'thanks', 'thank you', 'thankyou', 'thx', 'ty', 'appreciate', 'grateful',
    'bye', 'goodbye', 'good bye', 'see you', 'talk later', 'have a good',
    'take care', 'farewell', 'catch you later', 'until next time',
    'ok thanks', 'okay thanks', 'alright thanks', 'got it thanks'
  ];
  
  const lowerMessage = message.toLowerCase().trim();
  
  // Check for exact matches or messages that primarily contain thank you/goodbye
  return thankYouKeywords.some(keyword => {
    return lowerMessage === keyword || 
           lowerMessage.startsWith(keyword + ' ') ||
           lowerMessage.startsWith(keyword + '!') ||
           lowerMessage.endsWith(' ' + keyword) ||
           lowerMessage.endsWith(' ' + keyword + '!') ||
           (lowerMessage.includes(keyword) && lowerMessage.length <= keyword.length + 5);
  });
}

// Function to get thank you/goodbye response with contact request if needed
function getThankYouGoodbyeResponse(sessionId = null) {
  // Check if we have contact info for this session
  const hasContact = sessionId && leadSaver.hasContactInfo(sessionId);
  
  if (!hasContact) {
    // Request contact details since user is leaving without providing them
    const contactRequestResponses = [
      "Thank you for chatting with us! Before you go, would you mind sharing your contact details so we can send you helpful resources or special offers? Just your name and email would be great!",
      "It was great talking with you! Could I quickly get your contact information? We'd love to keep you updated on our latest services and special deals.",
      "Thanks for your time! One quick favor - could you share your email or phone number? We occasionally send valuable tips and exclusive offers to our community.",
      "Wonderful chatting with you! Would you like to stay connected? Just share your contact details and we'll send you helpful resources and updates about our services.",
      "Thank you! Before you leave, could you share your contact info? We'd love to send you some valuable resources and keep you informed about our latest projects and offers."
    ];
    return contactRequestResponses[Math.floor(Math.random() * contactRequestResponses.length)];
  } else {
    // Normal goodbye if we already have contact info
    const responses = [
      "Thank you for chatting with us! Have a wonderful day! Feel free to reach out anytime you need help.",
      "You're very welcome! Have a great day ahead! We're always here when you need us.",
      "My pleasure! Take care and have an amazing day! Don't hesitate to contact us again.",
      "Thanks for your time! Wishing you a fantastic day! We look forward to working with you.",
      "You're welcome! Have a nice day! Feel free to get in touch whenever you need our services."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

// Function to check if message is rude or abusive
function isRudeMessage(message) {
  const rudeWords = [
    'fuck', 'shit', 'damn', 'hell', 'asshole', 'bitch', 'bastard', 
    'piss off', 'fuck off', 'go to hell', 'shut up', 'screw you',
    'get lost', 'go away', 'leave me alone', 'stop bothering'
  ];
  const lowerMessage = message.toLowerCase();
  return rudeWords.some(word => lowerMessage.includes(word));
}

// Function to get professional response to rude messages
function getRudeMessageResponse() {
  const responses = [
    "I understand you may be frustrated. I'm here to help in a professional manner. How can I assist you with our services?",
    "I'm sorry if there's been any confusion. I'm here to provide information about our digital agency services. What can I help you with?",
    "I appreciate your feedback. Let me know if you'd like to learn about our web development, mobile apps, or digital marketing services.",
    "I'm here to help with any questions about our services. Would you like to know more about what we offer?",
    "Thank you for reaching out. I'm available to discuss our digital solutions whenever you're ready."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

// Load pricing data on startup
loadPricingData();

// Function to check if query is about portfolio (more specific patterns)
function isPortfolioQuery(message) {
  const portfolioKeywords = [
    'portfolio', 'example', 'examples', 'project', 'projects', 'work', 'works',
    'can i see', 'show me', 'look at', 'have a look', 'showcase', 'samples',
    'previous work', 'past work', 'completed projects'
  ];
  const lowerMessage = message.toLowerCase();
  return portfolioKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Function to check if query is asking for contact details
function isContactDetailsQuery(message) {
  const contactKeywords = [
    'contact details', 'contact info', 'your email', 'your phone', 'your number',
    'how to contact', 'reach you', 'get in touch', 'contact you', 'your mail',
    'phone number', 'email address', 'contact information'
  ];
  const lowerMessage = message.toLowerCase();
  return contactKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Function to get portfolio response
function getPortfolioResponse() {
  return "We're proud of our work! We've created websites, mobile apps, and marketing campaigns for various industries. Check out our portfolio here: http://localhost:8080/portfolio - Click the link to see our amazing projects!";
}

// Function to get contact details response
function getContactDetailsResponse() {
  return "Here are our contact details: Email: info@influitivezone.com | Phone: +1-856-252-0922 | Office: 123 Tech Street, Digital City | You can also use our contact form or continue chatting with me!";
}
// Function to check if query is a simple greeting (not complex queries starting with greeting words)
function isGreeting(message) {
  const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings'];
  const lowerMessage = message.toLowerCase().trim();
  
  // Check for exact greeting matches
  if (greetings.includes(lowerMessage)) {
    return true;
  }
  
  // Check for simple greetings with basic endings (exclamation, question)
  for (const greeting of greetings) {
    if (lowerMessage === greeting + '!' || 
        lowerMessage === greeting + '?' ||
        lowerMessage === greeting + '.') {
      return true;
    }
  }
  
  // Check for very simple variations like "hi there", "hello there", "hey there"
  const simpleVariations = [
    'hi there', 'hello there', 'hey there',
    'hi there!', 'hello there!', 'hey there!',
    'good morning!', 'good afternoon!', 'good evening!'
  ];
  
  if (simpleVariations.includes(lowerMessage)) {
    return true;
  }
  
  // If the message contains specific request keywords, it's NOT a simple greeting
  const requestKeywords = [
    'portfolio', 'platform', 'service', 'price', 'cost', 'help', 'about',
    'website', 'app', 'marketing', 'brand', 'contact', 'work', 'project',
    'can i', 'could i', 'would i', 'do you', 'what', 'how', 'where', 'when', 'why',
    'tell me', 'show me', 'give me', 'i want', 'i need', 'looking for'
  ];
  
  const hasRequestKeywords = requestKeywords.some(keyword => lowerMessage.includes(keyword));
  if (hasRequestKeywords) {
    return false;
  }
  
  return false;
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
// Function to check if query is about timeline/duration
function isTimelineQuery(message) {
  const timelineKeywords = ['time', 'duration', 'long', 'quick', 'fast', 'ready', 'timeline', 'when', 'how long', 'how much time'];
  const lowerMessage = message.toLowerCase();
  return timelineKeywords.some(keyword => lowerMessage.includes(keyword)) && 
         !lowerMessage.includes('cost') && 
         !lowerMessage.includes('price') && 
         !lowerMessage.includes('pricing');
}

// Function to check if user is asking for urgent/faster delivery
function isUrgentRequest(message) {
  const lowerMessage = message.toLowerCase();
  const urgentKeywords = [
    '1 week', 'one week', '2 week', 'two week', 'urgent', 'asap', 'quickly', 'fast',
    'rush', 'immediately', 'soon', 'faster', 'quick', 'expedite', 'priority',
    'in 1 week', 'in one week', 'in 2 week', 'in two week', 'within 1 week', 'within one week',
    'i want immediately', 'want immediately', 'need immediately', 'need urgent', 'want urgent',
    'i need quick', 'need quick', 'want quick', 'i want fast', 'want fast', 'need fast'
  ];
  
  // Check if it contains urgent keywords (timeline context is implied if urgent keywords are used)
  return urgentKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Function to get urgent delivery response
function getUrgentDeliveryResponse() {
  return "I understand you need this completed urgently! For expedited delivery timelines like 1-2 weeks, our project manager will need to discuss the requirements and feasibility with you personally. Please provide your contact details (name, email, phone) and our manager will reach out within 24 hours to arrange a custom timeline that meets your needs.";
}

// Function to check if query is about pricing
function isPricingQuery(message) {
  const pricingKeywords = ['price', 'pricing', 'cost', 'how much', 'package', 'rate', 'fee', 'budget', 'quote'];
  const lowerMessage = message.toLowerCase();
  // Exclude timeline queries that might contain "how much"
  if (isTimelineQuery(message)) return false;
  return pricingKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Function to get direct response for common queries (bypassing AI)
function getDirectResponse(message, sessionId = null) {
  const lowerMessage = message.toLowerCase();
  
  // Check for rude messages FIRST before any other processing
  if (isRudeMessage(message)) {
    return getRudeMessageResponse();
  }
  
  // Check for thank you/goodbye responses SECOND
  if (isThankYouOrGoodbye(message)) {
    return getThankYouGoodbyeResponse(sessionId);
  }

  // Check for contact refusal THIRD (before contact extraction)
  if (isContactRefusal(message)) {
    return getContactRefusalResponse();
  }

  // Always try to extract and save lead info from every message
  const leadInfo = leadSaver.extractLeadInfo(message, sessionId);
  if (leadSaver.hasLeadInfo(leadInfo)) {
    // Update session lead info
    leadSaver.updateSessionLead(sessionId || leadInfo.sessionId, leadInfo);
    
    // Save to CSV asynchronously
    leadSaver.saveLead(leadInfo, 'chatbot').then(result => {
      if (result.success) {
        console.log('✅ Lead information captured and saved');
      }
    }).catch(error => {
      console.error('❌ Failed to save lead information:', error);
    });
  }
  
  // Check for contact details (name, email, phone) - this should be checked early
  const contactDetails = extractContactDetails(message);
  if (contactDetails) {
    // Save to CSV asynchronously
    saveContactToCSV(contactDetails).then(saved => {
      if (saved) {
        console.log('✅ Contact details saved successfully');
      }
    }).catch(error => {
      console.error('❌ Failed to save contact details:', error);
    });
    
    return `Thank you ${contactDetails.name !== 'Not provided' ? contactDetails.name : ''}! I've received your contact details. Our project manager will reach out to you within 24 hours to discuss your urgent project requirements and arrange a custom timeline. We'll contact you at ${contactDetails.email !== 'Not provided' ? contactDetails.email : contactDetails.phone}. Looking forward to working with you!`;
  }
  
  // Check for urgent requests (before general service responses)
  if (isUrgentRequest(message)) {
    return getUrgentDeliveryResponse();
  }
  
  // Check for portfolio queries FIRST (high priority)
  if (isPortfolioQuery(message)) {
    return getPortfolioResponse();
  }
  
  // Check for contact details queries
  if (isContactDetailsQuery(message)) {
    return getContactDetailsResponse();
  }
  
  // Service-related queries
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('what can you do')) {
    return "Great question! We're passionate about providing web development, mobile apps, digital marketing, and branding services. What interests you most?";
  }
  
  // Web development queries
  if (lowerMessage.includes('web') || lowerMessage.includes('website') || lowerMessage.includes('site')) {
    return "Awesome! We love creating responsive websites, e-commerce platforms, and custom web applications using cutting-edge technologies. Let's build something amazing together!";
  }
  
  // Mobile app queries
  if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
    return "Fantastic! We develop native iOS and Android apps, plus cross-platform mobile applications. Ready to bring your app idea to life?";
  }
  
  // Digital marketing queries
  if (lowerMessage.includes('marketing') || lowerMessage.includes('seo') || lowerMessage.includes('social media')) {
    return "Excellent choice! We offer SEO, social media marketing, Google Ads, content marketing, and digital strategy services. Let's boost your online presence!";
  }
  
  // Branding queries
  if (lowerMessage.includes('brand') || lowerMessage.includes('logo') || lowerMessage.includes('design')) {
    return "Perfect! We create stunning brand identities, logos, marketing materials, and complete visual design solutions. Let's make your brand shine!";
  }
  
  // Company/About queries
  if (lowerMessage.includes('about') || lowerMessage.includes('company') || lowerMessage.includes('who are you')) {
    return "Nice to meet you! This is Influitive Zone is a passionate digital agency that creates websites, mobile apps, and digital marketing solutions for businesses like yours.";
  }
  
  // Contact queries (general)
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch')) {
    return "I'd love to help you get in touch! You can contact us through our website contact form, email us at info@influitivezone.com, call us at +1-856-252-0922, or continue chatting with me for more information.";
  }
  
  // Help queries
  if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
    return "I'm here to help! I can tell you all about our digital agency services. What interests you - web development, mobile apps, marketing, or branding?";
  }
  
  // Technology queries
  if (lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('framework')) {
    return "Great question! We use modern technologies like React, Next.js, Node.js, React Native, and cloud platforms for our projects. Technology that works!";
  }
  
  // Process/How it works queries (be more specific to avoid conflicts)
  if (lowerMessage.includes('process') || 
      (lowerMessage.includes('how') && (lowerMessage.includes('work') || lowerMessage.includes('create') || lowerMessage.includes('make') || lowerMessage.includes('build'))) ||
      lowerMessage.includes('methodology') || lowerMessage.includes('approach')) {
    return "I'm glad you asked! Our process is simple: 1) Consultation to understand your needs 2) Planning and design 3) Development 4) Testing 5) Launch and support. Easy!";
  }
  
  return null; // Use AI for other queries
}
// Function to extract pricing information based on query
function getPricingResponse(message) {
  if (!pricingData) return "Thanks for asking! I'll get back to you with pricing information shortly.";
  
  const lowerMessage = message.toLowerCase();
  
  // Check if user wants ALL services pricing
  if ((lowerMessage.includes('all') || lowerMessage.includes('every')) && (lowerMessage.includes('service') || lowerMessage.includes('pricing'))) {
    return `Here's our complete pricing! All Services: Web Development ($2,500-$15,000), Mobile Apps ($8,000-$25,000), Digital Marketing ($1,500-$5,000/month), Branding ($1,000-$10,000). Let's find the perfect fit for you!`;
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
    return `Perfect! Here's what you're looking for: ${responses.join(' | ')}. Let's discuss which option works best for you!`;
  }
  
  // If single service found, return it
  if (responses.length === 1) {
    return `Great choice! ${responses[0]}. Would you like to know more about any specific option?`;
  }
  
  // Handle package queries
  if (lowerMessage.includes('package') || lowerMessage.includes('bundle')) {
    return `Excellent! Our Packages: Starter ($2,500), Professional ($5,000), Enterprise ($10,000+). Discounts available for bundles! Which sounds interesting?`;
  }
  
  // General pricing response
  return `Happy to share our pricing! Our services: Web Development ($2,500-$15,000), Mobile Apps ($8,000-$25,000), Digital Marketing ($1,500-$5,000/month), Branding ($1,000-$10,000). What catches your eye?`;
}

const router = express.Router();

// Ollama configuration
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'tinyllama';

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
    const { message, sessionId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and must be a string'
      });
    }

    // Generate session ID if not provided
    const currentSessionId = sessionId || leadSaver.generateSessionId();
    
    // Analyze sentiment for tone adaptation
    const sentimentResult = await sentimentAnalyzer.analyzeWithFallback(message);
    
    // Enhanced logging with method information
    if (sentimentResult.method === 'keyword_fallback') {
      console.log(`🔄 Using keyword fallback for sentiment analysis: ${sentimentResult.tone} (reason: ${sentimentResult.fallbackReason || 'API error'})`);
    } else {
      console.log(`🎭 Detected tone: ${sentimentResult.tone} (confidence: ${sentimentResult.confidence}) [Method: ${sentimentResult.method}]`);
    }
    
    // Always extract and update lead info from every message first
    const leadInfo = leadSaver.extractLeadInfo(message, currentSessionId);
    let leadSaved = false;
    let savedLeadInfo = null;
    
    if (leadSaver.hasLeadInfo(leadInfo)) {
      // Update session lead info
      const updatedLead = leadSaver.updateSessionLead(currentSessionId, leadInfo);
      
      // Save to CSV asynchronously
      leadSaver.saveLead(updatedLead, 'chatbot').then(result => {
        if (result.success) {
          console.log('✅ Lead information captured and saved from message');
        }
      }).catch(error => {
        console.error('❌ Failed to save lead information:', error);
      });
      
      leadSaved = true;
      savedLeadInfo = updatedLead;
    }

    console.log(`💬 Simple chat message: "${message}" [Session: ${currentSessionId}] [Tone: ${sentimentResult.tone}]`);

    // Handle simple greetings first (fastest response)
    if (isGreeting(message)) {
      const greetingResponse = getGreetingResponse();
      
      return res.json({
        success: true,
        reply: greetingResponse,
        sessionId: currentSessionId,
        tone: sentimentResult.tone,
        confidence: sentimentResult.confidence,
        leadSaved: leadSaved,
        leadInfo: savedLeadInfo,
        contextUsed: 0,
        model: 'greeting-handler',
        timestamp: new Date().toISOString()
      });
    }

    // Check if this is a timeline query first (before pricing check)
    if (isTimelineQuery(message)) {
      // Check if it's an urgent/fast delivery request
      if (isUrgentRequest(message)) {
        const urgentResponse = getUrgentDeliveryResponse();
        
        return res.json({
          success: true,
          reply: urgentResponse,
          sessionId: currentSessionId,
          tone: sentimentResult.tone,
          confidence: sentimentResult.confidence,
          leadSaved: leadSaved,
          leadInfo: savedLeadInfo,
          contextUsed: 0,
          model: 'urgent-timeline',
          timestamp: new Date().toISOString()
        });
      }
      
      // Standard timeline response - make it specific to what user asked about
      const lowerMessage = message.toLowerCase();
      let timelineResponse;
      
      if (lowerMessage.includes('website') || lowerMessage.includes('web')) {
        timelineResponse = "Great question! Website development timelines: Basic websites (2-4 weeks), E-commerce sites (4-8 weeks), Custom websites (6-12 weeks). Let's discuss your specific website requirements!";
      } else if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
        timelineResponse = "Perfect! Mobile app development timelines: Basic apps (8-12 weeks), Advanced apps (12-20 weeks), Enterprise apps (20+ weeks). What type of app are you planning?";
      } else if (lowerMessage.includes('marketing') || lowerMessage.includes('seo')) {
        timelineResponse = "Excellent! Digital marketing timelines: Initial setup (1-2 weeks), SEO results (3-6 months), Campaign optimization (ongoing). Marketing is a continuous process!";
      } else if (lowerMessage.includes('brand') || lowerMessage.includes('logo')) {
        timelineResponse = "Fantastic! Branding project timelines: Logo design (1-2 weeks), Complete brand identity (3-4 weeks), Full brand package (4-8 weeks). Let's create your brand!";
      } else {
        timelineResponse = "Good question! Project timelines vary: Basic websites (2-4 weeks), E-commerce sites (4-8 weeks), Mobile apps (8-16 weeks), Marketing campaigns (ongoing). Let's discuss your timeline!";
      }
      
      return res.json({
        success: true,
        reply: timelineResponse,
        sessionId: currentSessionId,
        tone: sentimentResult.tone,
        confidence: sentimentResult.confidence,
        leadSaved: leadSaved,
        leadInfo: savedLeadInfo,
        contextUsed: 0,
        model: 'timeline-data',
        timestamp: new Date().toISOString()
      });
    }

    // Check if this is a pricing query and handle it directly
    if (isPricingQuery(message)) {
      const pricingResponse = getPricingResponse(message);
      
      return res.json({
        success: true,
        reply: pricingResponse,
        sessionId: currentSessionId,
        tone: sentimentResult.tone,
        confidence: sentimentResult.confidence,
        leadSaved: leadSaved,
        leadInfo: savedLeadInfo,
        contextUsed: 0,
        model: 'pricing-data',
        timestamp: new Date().toISOString()
      });
    }

    // Check for direct responses (bypassing AI for common queries)
    const directResponse = getDirectResponse(message, currentSessionId);
    if (directResponse) {
      return res.json({
        success: true,
        reply: directResponse,
        sessionId: currentSessionId,
        tone: sentimentResult.tone,
        confidence: sentimentResult.confidence,
        leadSaved: leadSaved,
        leadInfo: savedLeadInfo,
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
      cleanResponse = "Hi there! We're Influitive Zone, a passionate digital agency offering web development, mobile apps, digital marketing, and branding services. What specific information can I help you with?";
    } else {
      // Build a sentiment-aware prompt with clear instructions
      const toneInstructions = sentimentAnalyzer.getToneInstructions(sentimentResult.tone);
      const prompt = `You are Zooni AI Assistant, a ${toneInstructions.style} customer service assistant for Influitive Zone digital agency. 

User tone: ${sentimentResult.tone}
Style: ${toneInstructions.style}

User: ${message}

Respond in 20 words max, being ${toneInstructions.style}:`;

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
        // Generate a smart fallback response based on query content and sentiment
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('service')) {
          cleanResponse = sentimentResult.tone === 'happy' ? 
            "That's exciting! We offer web development, mobile apps, digital marketing, and branding services. What sounds awesome to you?" :
            "Great question! We offer web development, mobile apps, digital marketing, and branding services. What interests you most?";
        } else if (lowerMessage.includes('help')) {
          cleanResponse = sentimentResult.tone === 'happy' ? 
            "I'm thrilled to help! I'd love to tell you about our amazing digital agency services. What can I assist you with?" :
            "I'm here to help! I'd love to tell you about our digital agency services. What can I assist you with?";
        } else if (lowerMessage.includes('web') || lowerMessage.includes('website')) {
          cleanResponse = sentimentResult.tone === 'happy' ? 
            "That's fantastic! We create amazing websites and web applications. Let's build something incredible together!" :
            "Awesome! We create professional websites and web applications. Let's build something amazing!";
        } else if (lowerMessage.includes('app') || lowerMessage.includes('mobile')) {
          cleanResponse = sentimentResult.tone === 'happy' ? 
            "How exciting! We develop awesome mobile apps for iOS and Android platforms. Ready to bring your amazing idea to life?" :
            "Perfect! We develop mobile apps for iOS and Android platforms. Ready to bring your idea to life?";
        } else if (lowerMessage.includes('marketing')) {
          cleanResponse = sentimentResult.tone === 'happy' ? 
            "That's wonderful! We provide fantastic digital marketing services including SEO and social media. Let's boost your amazing presence!" :
            "Excellent! We provide digital marketing services including SEO and social media. Let's boost your presence!";
        } else if (lowerMessage.includes('brand') || lowerMessage.includes('logo')) {
          cleanResponse = sentimentResult.tone === 'happy' ? 
            "How exciting! We create stunning brand identities and beautiful logo designs. Let's make your brand absolutely shine!" :
            "Fantastic! We create brand identities and logo designs. Let's make your brand shine!";
        } else if (lowerMessage.includes('understand') || lowerMessage.includes('getting') || lowerMessage.includes('saying')) {
          cleanResponse = sentimentResult.tone === 'angry' ? 
            "I sincerely apologize for any confusion! Could you please rephrase your question? I'm here to help with our web development, mobile apps, marketing, or branding services." :
            "I apologize for the confusion! Could you please rephrase your question? I'm here to help with information about our web development, mobile apps, marketing, or branding services.";
        } else {
          cleanResponse = sentimentResult.tone === 'happy' ? 
            "I'd absolutely love to help you! Could you tell me more about what you're looking for? We specialize in amazing web development, mobile apps, digital marketing, and branding!" :
            "I'd love to help you! Could you tell me more about what you're looking for? We specialize in web development, mobile apps, digital marketing, and branding.";
        }
      }
    }

    // Return response
    res.json({
      success: true,
      reply: cleanResponse,
      sessionId: currentSessionId,
      tone: sentimentResult.tone,
      confidence: sentimentResult.confidence,
      leadSaved: leadSaved,
      leadInfo: savedLeadInfo,
      contextUsed: 0,
      model: OLLAMA_MODEL,
      sentimentMethod: sentimentResult.method,
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

// Test HuggingFace API endpoint
router.get('/test-sentiment', async (req, res) => {
  try {
    const testResult = await sentimentAnalyzer.testConnection();
    
    res.json({
      success: testResult.success,
      message: testResult.success ? 'HuggingFace API is working' : 'HuggingFace API failed',
      details: testResult.success ? testResult.result : testResult.error,
      apiKeyConfigured: !!process.env.HUGGINGFACE_API_KEY && process.env.HUGGINGFACE_API_KEY !== 'your_huggingface_token_here',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
