const { HfInference } = require('@huggingface/inference');

class SentimentAnalyzer {
  constructor() {
    this.hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
    this.model = 'cardiffnlp/twitter-roberta-base-sentiment-latest';
  }

  async analyzeSentiment(text) {
    try {
      const result = await this.hf.textClassification({
        model: this.model,
        inputs: text
      });

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
      console.error('❌ Error analyzing sentiment:', error);
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
    
    const angryKeywords = ['angry', 'frustrated', 'annoyed', 'upset', 'mad', 'hate', 'terrible', 'awful', 'disappointed'];
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
        // Fallback to keyword analysis
        const keywordTone = this.detectToneByKeywords(text);
        return {
          tone: keywordTone,
          confidence: 0.7,
          method: 'keyword_fallback'
        };
      }
      
      return {
        ...hfResult,
        method: 'huggingface'
      };
    } catch (error) {
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

module.exports = SentimentAnalyzer;
