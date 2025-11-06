# AI Chatbot Integration Guide

## 🚀 Complete AI-Powered Chatbot with TinyLLaMA + RAG

Your chatbot backend is now ready! This guide will help you integrate it with your existing frontend and deploy it to production.

## 📋 What's Been Built

### ✅ Backend Components
- **Express Server** (`backend/server.js`) - Main API server
- **Chat Route** (`backend/routes/chat.js`) - RAG + sentiment + lead capture
- **Vector Store** (`backend/utils/vectorStore.js`) - ChromaDB + embeddings
- **Sentiment Analyzer** (`backend/utils/sentiment.js`) - Tone detection
- **Lead Saver** (`backend/utils/leadSaver.js`) - CSV lead export
- **Sample Data** - Website content for RAG testing

### ✅ Frontend Integration
- **ChatWidget Updated** - Now works with new backend API
- **Lead Capture** - Automatic detection and logging
- **Tone Detection** - Response adaptation based on user sentiment

## 🛠️ Quick Start (Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Ollama
```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Start Ollama
ollama serve &

# Pull TinyLLaMA model
ollama pull tinylama
```

### 3. Configure Environment
```bash
# Copy backend environment file
cp backend/env.example backend/.env

# Edit with your API keys
nano backend/.env
```

**Required Environment Variables:**
```env
BACKEND_PORT=5000
FRONTEND_URL=http://localhost:8080
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=tinylama
HUGGINGFACE_API_KEY=your_huggingface_api_key
NODE_ENV=development
```

### 4. Start Services
```bash
# Terminal 1: Start Backend
npm run backend

# Terminal 2: Start Frontend
npm run dev
```

## 🔧 API Endpoints

### Main Chat Endpoint
```http
POST /api/chat
Content-Type: application/json

{
  "message": "I need a website for my business"
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
  "model": "tinylama"
}
```

### Health Check
```http
GET /api/health
```

### Lead Management
```http
GET /api/leads
```

## 🧠 How It Works

### 1. RAG Pipeline
1. **User sends message** → Frontend calls `/api/chat`
2. **Sentiment analysis** → Detects tone (happy, angry, flirty, neutral)
3. **Lead extraction** → Finds name, email, project details
4. **Vector search** → Retrieves relevant website content
5. **Prompt building** → Combines context + tone + user message
6. **TinyLLaMA generation** → Creates response via Ollama
7. **Response delivery** → Returns formatted response to frontend

### 2. Data Flow
```
User Message → Sentiment Analysis → Lead Extraction → Vector Search → TinyLLaMA → Response
     ↓              ↓                    ↓              ↓            ↓
  Frontend    Tone Detection      CSV Export    RAG Context   AI Response
```

## 🚀 Production Deployment

### AWS EC2 Setup
See `backend/DEPLOYMENT.md` for complete instructions.

**Quick Commands:**
```bash
# Install dependencies
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh
ollama serve &
ollama pull tinylama

# Deploy code
git clone your-repo
cd your-repo
npm install
cp backend/env.example backend/.env
# Edit .env with production values

# Start with PM2
npm install -g pm2
pm2 start backend/server.js --name chatbot-backend
pm2 save
pm2 startup
```

### Environment Variables (Production)
```env
BACKEND_PORT=5000
FRONTEND_URL=https://yourdomain.com
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=tinylama
HUGGINGFACE_API_KEY=your_production_api_key
NODE_ENV=production
```

## 🔌 Frontend Integration

Your `ChatWidget.jsx` is already updated to work with the new backend. The integration includes:

### Key Features
- **Automatic lead capture** - Detects and logs user information
- **Tone detection** - Adapts responses to user sentiment
- **RAG responses** - Uses website content for accurate answers
- **Error handling** - Graceful fallbacks for API issues

### Configuration
The widget automatically uses the correct backend URL:
- **Development**: `http://localhost:5000/api`
- **Production**: `https://yourdomain.com/api`

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# Check backend health
curl http://localhost:5000/api/health

# Check Ollama
curl http://localhost:11434/api/tags

# Check PM2 status
pm2 status
```

### Logs
```bash
# Backend logs
pm2 logs chatbot-backend

# Ollama logs
journalctl -u ollama -f
```

### Lead Management
Leads are automatically saved to `backend/data/leads.csv` with:
- Timestamp
- Name, Email, Phone
- Project Description
- Budget, Company
- Original Message
- Source

## 🛠️ Troubleshooting

### Common Issues

1. **Ollama Connection Failed**
   ```bash
   # Check if running
   ps aux | grep ollama
   
   # Restart
   pkill ollama && ollama serve &
   ```

2. **Vector Store Not Ready**
   ```bash
   # Reinitialize
   curl -X POST http://localhost:5000/api/reinit-vectorstore
   ```

3. **Hugging Face API Errors**
   - Verify API key in `.env`
   - Check rate limits
   - Ensure network connectivity

4. **Memory Issues**
   - Increase EC2 instance size
   - Monitor with `htop`
   - Restart services if needed

### Performance Optimization
- **Instance Size**: Use `t3.medium` or larger
- **Caching**: Consider Redis for frequent queries
- **CDN**: Use CloudFront for static assets
- **Load Balancing**: Multiple backend instances

## 📈 Features Overview

### ✅ Implemented
- **TinyLLaMA-1.1B** via Ollama
- **RAG with ChromaDB** + Hugging Face embeddings
- **Sentiment Analysis** with tone adaptation
- **Lead Capture** with CSV export
- **RESTful API** with proper error handling
- **AWS EC2 deployment** ready
- **Frontend integration** complete

### 🎯 Capabilities
- **Contextual Responses** - Uses your website content
- **Tone Adaptation** - Matches user sentiment
- **Lead Generation** - Automatic capture and export
- **Scalable Architecture** - Production-ready setup
- **Monitoring** - Health checks and logging

## 🔒 Security Considerations

- **API Keys** - Store in environment variables
- **CORS** - Configured for specific domains
- **Input Validation** - Sanitize all user inputs
- **HTTPS** - Required for production
- **Rate Limiting** - Implement for production use

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the deployment guide
3. Check logs for error details
4. Verify all services are running

---

**Your AI chatbot is now ready for production! 🚀**

The system combines TinyLLaMA's local AI capabilities with RAG for accurate responses, sentiment analysis for personalized interactions, and automatic lead capture for business growth.
