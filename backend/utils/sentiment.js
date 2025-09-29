class SentimentAnalyzer {
  constructor() {
    this.hf = null;
    this.model = 'cardiffnlp/twitter-roberta-base-sentiment-latest';
    this.initializeHf();
  }

  async initializeHf() {
    try {
      const hfModule = await import('@huggingface/inference');
      this.hf = new hfModule.HfInference(process.env.HUGGINGFACE_API_KEY);
    } catch (error) {
      console.warn('⚠️ HuggingFace inference module not available, using keyword fallback only');
      this.hf = null;
    }
  }

  // Test API connection
  async testConnection() {
    try {
      console.log('🔍 Testing HuggingFace API connection...');
      const testResult = await this.hf.textClassification({
        model: this.model,
        inputs: 'Hello world'
      });
      console.log('✅ HuggingFace API test successful:', testResult);
      return { success: true, result: testResult };
    } catch (error) {
      console.error('❌ HuggingFace API test failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  async analyzeSentiment(text) {
    try {
      // Check if HuggingFace is available
      if (!this.hf) {
        console.log('🔄 HuggingFace not available, using keyword fallback');
        const keywordTone = this.detectToneByKeywords(text);
        return {
          tone: keywordTone,
          confidence: 0.7,
          method: 'keyword_fallback',
          fallbackReason: 'HuggingFace module not available'
        };
      }

      // Check if API key is configured
      if (!process.env.HUGGINGFACE_API_KEY || process.env.HUGGINGFACE_API_KEY === 'your_huggingface_token_here') {
        console.warn('⚠️ HuggingFace API key not configured properly. Using keyword fallback.');
        return {
          tone: 'neutral',
          confidence: 0.5,
          error: 'API key not configured'
        };
      }

      console.log(`🔑 Using HuggingFace API key: ${process.env.HUGGINGFACE_API_KEY.substring(0, 8)}...`);
      console.log(`📝 Analyzing text: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);

      const result = await this.hf.textClassification({
        model: this.model,
        inputs: text
      });

      console.log('✅ HuggingFace API response received:', result);

      // Get the highest confidence prediction
      const prediction = result[0];
      const label = prediction.label;
      const score = prediction.score;

      // Map Hugging Face labels to our tone categories
      const toneMapping = {
        'LABEL_0': 'angry',      // Negative
        'LABEL_1': 'neutral',    // Neutral  
        'LABEL_2': 'happy'       // Positive
      };

      const tone = toneMapping[label] || 'neutral';
      
      return {
        tone,
        confidence: score,
        rawPrediction: prediction
      };
    } catch (error) {
      console.error('❌ Error analyzing sentiment with HuggingFace API:');
      console.error('   Message:', error.message);
      console.error('   Status:', error.status || 'No status');
      console.error('   Response:', error.response?.data || 'No response data');
      console.error('   API Key configured:', !!process.env.HUGGINGFACE_API_KEY && process.env.HUGGINGFACE_API_KEY !== 'your_huggingface_token_here');
      console.error('   API Key preview:', process.env.HUGGINGFACE_API_KEY ? `${process.env.HUGGINGFACE_API_KEY.substring(0, 8)}...` : 'Not set');
      
      return {
        tone: 'neutral',
        confidence: 0.5,
        error: error.message
      };
    }
  }

  getToneInstructions(tone) {
    const instructions = {
      happy: {
        style: "friendly and enthusiastic",
        greeting: "Great to hear from you!",
        response: "I'm excited to help you with that!",
        closing: "Feel free to ask me anything else!"
      },
      angry: {
        style: "professional and understanding",
        greeting: "I understand your frustration.",
        response: "Let me help you resolve this issue professionally.",
        closing: "I'm here to assist you with any concerns."
      },
      flirty: {
        style: "playful but professional",
        greeting: "Well hello there! 😊",
        response: "I'd love to help you with that!",
        closing: "Don't hesitate to reach out anytime!"
      },
      neutral: {
        style: "polite and informative",
        greeting: "Hello! How can I assist you today?",
        response: "I'd be happy to help you with that.",
        closing: "Is there anything else I can help you with?"
      }
    };

    return instructions[tone] || instructions.neutral;
  }

  buildTonePrompt(userMessage, tone) {
    const instructions = this.getToneInstructions(tone);
    
    return `You are a helpful AI assistant for a digital agency. The user's message has a ${tone} tone.

Tone Guidelines:
- Style: ${instructions.style}
- Be ${instructions.style} in your response
- Use appropriate language for the detected tone
- Maintain professionalism while matching the user's energy

User Message: "${userMessage}"

Respond in a way that matches the ${tone} tone while being helpful and professional.`;
  }

  // Additional tone detection using keyword analysis as fallback
  detectToneByKeywords(text) {
    const lowerText = text.toLowerCase();
    
    const angryKeywords = ['angry', 'frustrated', 'annoyed', 'upset', 'mad', 'hate', 'terrible', 'awful', 'disappointed', 'fuck', 'shit', 'damn', 'hell', 'pissed', 'furious', 'rage', 'stupid', 'idiot', 'asshole', 'bitch', 'bastard', 'suck', 'sucks', 'crap', 'bullshit', 'piss off', 'fuck off', 'go to hell', 'shut up'];
    const happyKeywords = ['happy', 'excited', 'great', 'awesome', 'amazing', 'love', 'fantastic', 'wonderful', 'perfect'];
    const flirtyKeywords = ['cute', 'sexy', 'beautiful', 'handsome', 'gorgeous', 'hot', 'attractive', 'charming', 'sweet'];
    
    const angryScore = angryKeywords.filter(keyword => lowerText.includes(keyword)).length;
    const happyScore = happyKeywords.filter(keyword => lowerText.includes(keyword)).length;
    const flirtyScore = flirtyKeywords.filter(keyword => lowerText.includes(keyword)).length;
    
    if (angryScore > happyScore && angryScore > flirtyScore) return 'angry';
    if (flirtyScore > happyScore && flirtyScore > angryScore) return 'flirty';
    if (happyScore > angryScore && happyScore > flirtyScore) return 'happy';
    
    return 'neutral';
  }

  async analyzeWithFallback(text) {
    try {
      // Try Hugging Face API first
      const hfResult = await this.analyzeSentiment(text);
      
      if (hfResult.error) {
        console.log('🔄 Falling back to keyword analysis due to API error');
        // Fallback to keyword analysis
        const keywordTone = this.detectToneByKeywords(text);
        return {
          tone: keywordTone,
          confidence: 0.7,
          method: 'keyword_fallback',
          fallbackReason: hfResult.error
        };
      }
      
      return {
        ...hfResult,
        method: 'huggingface'
      };
    } catch (error) {
      console.log('🔄 Falling back to keyword analysis due to exception:', error.message);
      // Fallback to keyword analysis
      const keywordTone = this.detectToneByKeywords(text);
      return {
        tone: keywordTone,
        confidence: 0.6,
        method: 'keyword_fallback',
        error: error.message
      };
    }
  }
}

export default SentimentAnalyzer;
