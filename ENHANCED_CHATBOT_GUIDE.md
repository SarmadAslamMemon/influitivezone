# Enhanced TinyLLaMA Chatbot System

## Overview

This enhanced chatbot system provides intelligent, accurate responses using a hybrid approach:
- **Data-driven responses** (80%) for factual queries using company files
- **AI-generated responses** (20%) for creative/advisory queries
- **100% accuracy** for company information through direct file integration

## System Architecture

### Core Components

1. **DataManager** (`utils/dataManager.js`)
   - Loads and caches company data files
   - Provides search functions across data
   - 5-minute cache expiry for performance

2. **QueryAnalyzer** (`utils/queryAnalyzer.js`)
   - Classifies queries as factual, creative, or greetings
   - Detects keywords for appropriate routing
   - Assigns confidence scores

3. **ResponseGenerator** (`utils/responseGenerator.js`)
   - Generates responses based on query analysis
   - Integrates with TinyLLaMA via Ollama API
   - Optimizes AI parameters for quality responses

## Data Files

### Required Files in `backend/data/`
- `company-info.txt` - Company overview and information
- `portfolio.json` - Project portfolio with 6 completed projects
- `services.json` - 5 core services offered
- `pricing.json` - Package pricing and service rates
- `contact.json` - Complete contact information and departments

## Assistant Behavior Guidelines

### Professional Communication Standards
1. **Greeting Protocol**: Always greet users politely and acknowledge their query before answering
2. **Company Introduction**: Briefly mention company services (web development, app development, branding) when relevant
3. **Factual Accuracy**: Use only company data files for factual queries (portfolio, services, pricing, contact)
4. **Service Explanations**: Provide clear, concise explanations that are simple and user-friendly
5. **Advice Structure**: Balanced suggestions with pros/cons, key factors, under 6 sentences
6. **Creative Guidance**: Use expert knowledge while relating to company style and services
7. **Professional Tone**: Keep responses friendly, welcoming, professional, and helpful
8. **Missing Information**: Politely state "I don't have that information" when data unavailable
9. **Engagement**: Always suggest next steps and encourage further discussion
10. **Response Structure**: Greeting → Clear answer → Next step suggestion

### Query Types & Response Strategies

#### 1. Greeting Queries
**Triggers:** hi, hello, hey patterns
**Response:** Warm greeting + company introduction + service offer
**Example:** "Hello! → Welcome to Influitive Zone → How can I help with your digital needs?"

#### 2. Factual Queries (Data-Driven)
**Triggers:** portfolio, services, pricing, contact keywords
**Response:** Uses relevant data file exclusively + polite greeting
**Example:** "What services do you offer?" → Greeting + Services from data file + Engagement

#### 3. Service Explanation Queries
**Triggers:** "what is web development", "explain branding", "what are packages"
**Response:** Simple, user-friendly explanation + available packages
**Example:** "What is web development?" → Greeting + Clear explanation + Package mention

#### 4. Advice/Comparison Queries
**Triggers:** vs, better, should I choose, pros and cons
**Response:** Balanced suggestions + key factors + recommendation
**Example:** "Web vs mobile app?" → Greeting + Pros/cons + Factors + Next step

#### 5. Creative/Idea Queries
**Triggers:** suggest, ideas, tips, inspiration, design ideas
**Response:** Expert knowledge + company context + portfolio examples
**Example:** "Design ideas for my website?" → Greeting + Suggestions + Portfolio offer

#### 6. Instant Pricing Responses
**Special Feature:** Direct data lookup for pricing queries
- "All services pricing" → Complete pricing breakdown
- Specific service pricing → Targeted response
- Multiple services → All requested services covered

### Response Quality Standards
- Professional greeting in every response
- Clear, actionable information
- Company context integration
- Encouragement for continued conversation
- Maximum 150 characters for optimal readability (AI responses)
- Instant responses for pricing queries (no AI delay)

## Query Types & Handling

### 1. Factual Queries (Data-Driven)
**Triggers:** portfolio, services, pricing, contact keywords
**Response:** Uses relevant data file exclusively
**Example:** "What services do you offer?" → Uses `services.json`

### 2. Creative Queries (AI-Generated)
**Triggers:** suggest, recommend, advice, ideas, tips keywords
**Response:** Uses TinyLLaMA with company context
**Example:** "What design trends should I consider?" → AI advice

### 3. Greetings (Predefined)
**Triggers:** hi, hello, hey patterns
**Response:** Warm, professional greeting
**Example:** "Hello!" → "Hi there! How can I help you today?"

## API Endpoints

### POST `/api/chat`
**Request:**
```json
{
  "message": "What services do you offer?",
  "conversationId": "optional"
}
```

**Response:**
```json
{
  "success": true,
  "reply": "We offer web development, mobile apps, digital marketing...",
  "analysis": {
    "type": "factual",
    "category": "services",
    "strategy": "data_driven",
    "confidence": 0.8
  },
  "tone": "neutral",
  "leadSaved": false,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET `/api/health`
**Response:** System status and data file availability

### POST `/api/refresh-data`
**Purpose:** Clear cache and reload data files

## Installation & Setup

### 1. Prerequisites
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull TinyLLaMA model
ollama pull tinylama

# Start Ollama service
ollama serve
```

### 2. Environment Variables
```bash
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=tinylama
```

### 3. Test the System
```bash
node test_chatbot.js
```

## Key Features

### ✅ 100% Accuracy for Factual Queries
- Direct file integration, no hallucination
- Keyword fallback system ensures critical queries use data
- Clear "I don't have that information" when data unavailable
- Instant pricing responses with complete service coverage

### ✅ Intelligent Query Classification
- 6 query types: Greeting, Factual, Service Explanation, Advice, Creative, General
- Automatic detection with confidence scoring
- Context-aware response strategy selection
- Professional behavioral guidelines for each type

### ✅ Enhanced Communication Standards
- Professional greetings with company introduction
- Structured advice responses (pros/cons, factors, recommendations)
- Clear service explanations (simple, user-friendly)
- Creative suggestions with company context integration
- Consistent engagement encouragement

### ✅ Performance Optimized
- File caching with 5-minute expiry
- Optimized TinyLLaMA parameters (max_tokens: 50, temperature: 0.5)
- Response cleaning and 150-character limit for readability
- First-line response extraction for clarity

### ✅ Easy to Maintain
- Clear separation of concerns
- Simple file-based data management
- Comprehensive error handling

## Usage Examples

### Factual Queries
```
User: "Show me your portfolio"
Bot: [Lists projects from portfolio.json]

User: "How much does a website cost?"
Bot: [Provides pricing from pricing.json]
```

### Creative Queries
```
User: "What design trends should I consider?"
Bot: [AI-generated advice with company context]

User: "How can I improve my website's SEO?"
Bot: [Professional recommendations using AI knowledge]
```

## Expanding the System

### Adding New Data Files
1. Create JSON/TXT file in `backend/data/`
2. Add loader method in `DataManager`
3. Add keywords in `QueryAnalyzer`
4. Add formatting in `ResponseGenerator`

### Adding New Query Types
1. Define keywords in `QueryAnalyzer`
2. Add strategy in `ResponseGenerator`
3. Create formatting method if needed

## Troubleshooting

### Common Issues
1. **Ollama not responding:** Ensure `ollama serve` is running
2. **Model not found:** Run `ollama pull tinylama`
3. **Data file errors:** Check file permissions and JSON syntax
4. **Cache issues:** Use `/api/refresh-data` endpoint

### Debug Endpoints
- `POST /api/analyze-query` - Test query analysis
- `GET /api/health` - Check system status
- `GET /api/leads` - View collected leads

## Performance Metrics

### Response Time Targets
- Factual queries: <500ms
- Creative queries: <2000ms
- Cached data: <100ms

### Accuracy Goals
- Factual queries: 100% (data-based)
- Creative queries: High relevance with company context
- Query classification: >90% accuracy

## Support

For technical issues or questions about the enhanced chatbot system, contact the development team or refer to the test file for verification procedures.