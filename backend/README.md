# AI Chatbot Backend with TinyLLaMA + RAG

A complete AI-powered chatbot backend using TinyLLaMA-1.1B via Ollama, with Retrieval-Augmented Generation (RAG), sentiment analysis, and lead capture capabilities.

## 🚀 Features

- **TinyLLaMA-1.1B Integration**: Local AI model via Ollama API
- **RAG (Retrieval-Augmented Generation)**: ChromaDB + Hugging Face embeddings
- **Sentiment Analysis**: Tone detection and response adaptation
- **Lead Capture**: Automatic extraction and CSV export
- **RESTful API**: Clean endpoints for frontend integration
- **AWS EC2 Ready**: Production deployment configuration

## 📁 Project Structure

```
backend/
├── server.js              # Main Express server
├── routes/
│   └── chat.js            # Chat API endpoints
├── utils/
│   ├── vectorStore.js     # ChromaDB + embeddings
│   ├── sentiment.js       # Hugging Face sentiment analysis
│   └── leadSaver.js       # Lead extraction and CSV export
├── data/
│   ├── services.json      # Website services data
│   ├── company-info.txt   # Company information
│   ├── portfolio.json     # Portfolio projects
│   └── leads.csv          # Generated leads (auto-created)
└── DEPLOYMENT.md          # AWS EC2 deployment guide
```

## 🛠️ Installation

### Prerequisites

1. **Node.js 18+**
2. **Ollama** with TinyLLaMA-1.1B model
3. **Hugging Face API Key** (for embeddings and sentiment)

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Ollama and pull model:**
   ```bash
   # Install Ollama
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Start Ollama
   ollama serve &
   
   # Pull TinyLLaMA model
   ollama pull tinylama
   ```

3. **Configure environment:**
   ```bash
   cp env.example .env
   # Edit .env with your API keys
   ```

4. **Start the server:**
   ```bash
   npm run backend
   ```

## 🔧 Configuration

### Environment Variables

```env
# Backend Configuration
BACKEND_PORT=5000
FRONTEND_URL=http://localhost:3000

# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=tinylama

# Hugging Face API
HUGGINGFACE_API_KEY=your_huggingface_api_key

# ChromaDB (optional)
CHROMA_HOST=localhost
CHROMA_PORT=8000

# Environment
NODE_ENV=development
```

### Data Files

The system automatically loads data from the `data/` directory:
- **JSON files**: Structured data (services, portfolio)
- **TXT files**: Text content (company info, descriptions)

## 📡 API Endpoints

### POST `/api/chat`
Main chat endpoint with RAG and sentiment analysis.

**Request:**
```json
{
  "message": "I need a website for my business",
  "conversationId": "optional-conversation-id"
}
```

**Response:**
```json
{
  "success": true,
  "reply": "I'd be happy to help you create a website! Based on our services...",
  "tone": "happy",
  "confidence": 0.85,
  "leadSaved": true,
  "leadInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "project": "website for my business"
  },
  "contextUsed": 3,
  "model": "tinylama",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "services": {
    "vectorStore": {
      "ready": true,
      "totalChunks": 45,
      "collectionName": "website_knowledge"
    },
    "ollama": {
      "model": "tinylama",
      "url": "http://localhost:11434"
    },
    "leads": {
      "count": 12
    }
  }
}
```

### GET `/api/leads`
Retrieve captured leads (admin endpoint).

### POST `/api/reinit-vectorstore`
Reinitialize the vector store with fresh data.

## 🧠 How It Works

### 1. RAG Pipeline
1. **Data Loading**: Website content loaded from JSON/TXT files
2. **Embedding Generation**: Hugging Face `sentence-transformers/all-MiniLM-L6-v2`
3. **Vector Storage**: ChromaDB for similarity search
4. **Context Retrieval**: Top 5 relevant chunks for each query
5. **Prompt Building**: Context + user query + tone instructions

### 2. Sentiment Analysis
- **Primary**: Hugging Face `cardiffnlp/twitter-roberta-base-sentiment-latest`
- **Fallback**: Keyword-based tone detection
- **Tones**: Happy, Angry, Flirty, Neutral
- **Adaptation**: Response style matches detected tone

### 3. Lead Capture
- **Extraction**: Regex patterns for name, email, phone, project, budget
- **Storage**: CSV format with timestamps
- **Fields**: Name, Email, Phone, Project, Budget, Company, Message, Source

### 4. Response Generation
- **Model**: TinyLLaMA-1.1B via Ollama
- **Context**: Retrieved website content
- **Tone**: Adapted to user sentiment
- **Format**: Natural, helpful responses

## 🔌 Frontend Integration

### React/Next.js Integration

```javascript
// ChatWidget.jsx
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com/api' 
  : 'http://localhost:5000/api';

const sendMessage = async (message) => {
  try {
    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Handle successful response
      setMessages(prev => [...prev, {
        type: 'bot',
        text: data.reply,
        tone: data.tone
      }]);
      
      // Handle lead capture
      if (data.leadSaved) {
        console.log('Lead captured:', data.leadInfo);
      }
    }
  } catch (error) {
    console.error('Chat error:', error);
  }
};
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete AWS EC2 deployment instructions.

### Quick Start (Development)

```bash
# Terminal 1: Start Ollama
ollama serve

# Terminal 2: Start Backend
npm run backend

# Terminal 3: Start Frontend
npm run dev
```

## 📊 Monitoring

### Health Checks
- **Vector Store**: ChromaDB connection and data count
- **Ollama**: Model availability and response time
- **Leads**: Total captured leads count

### Logs
- **PM2**: `pm2 logs chatbot-backend`
- **Nginx**: `/var/log/nginx/access.log`
- **Application**: Custom logging in server.js

## 🔧 Troubleshooting

### Common Issues

1. **Ollama Connection Failed**
   ```bash
   # Check if Ollama is running
   ps aux | grep ollama
   
   # Restart Ollama
   pkill ollama && ollama serve &
   ```

2. **Vector Store Not Ready**
   ```bash
   # Reinitialize vector store
   curl -X POST http://localhost:5000/api/reinit-vectorstore
   ```

3. **Hugging Face API Errors**
   - Check API key validity
   - Verify rate limits
   - Check network connectivity

4. **Memory Issues**
   - Increase EC2 instance size
   - Monitor with `htop`
   - Restart services if needed

## 📈 Performance

### Optimization Tips
1. **Batch Processing**: Process embeddings in batches
2. **Caching**: Implement Redis for frequent queries
3. **CDN**: Use CloudFront for static assets
4. **Load Balancing**: Multiple backend instances

### Benchmarks
- **Response Time**: ~2-5 seconds (including RAG)
- **Memory Usage**: ~2-4GB (with TinyLLaMA)
- **Concurrent Users**: 10-50 (depending on instance size)

## 🔒 Security

- **API Keys**: Store in environment variables
- **CORS**: Configured for specific domains
- **Rate Limiting**: Implement for production
- **HTTPS**: Required for production deployment
- **Input Validation**: Sanitize all user inputs

## 📝 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the deployment guide

---

**Built with ❤️ using TinyLLaMA, ChromaDB, and Hugging Face**
