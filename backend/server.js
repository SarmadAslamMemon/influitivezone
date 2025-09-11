const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const simpleChatRoutes = require('./routes/simple-chat');

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api', simpleChatRoutes); // Using simple chat (no ChromaDB dependency)
app.use('/api/advanced', chatRoutes); // Full RAG chat (requires ChromaDB)

// Static files for data
app.use('/data', express.static(path.join(__dirname, 'data')));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Chatbot Backend with TinyLLaMA + RAG',
    version: '1.0.0',
    endpoints: {
      chat: 'POST /api/chat',
      health: 'GET /api/health',
      leads: 'GET /api/leads',
      reinitVectorStore: 'POST /api/reinit-vectorstore'
    },
    features: [
      'TinyLLaMA-1.1B via Ollama',
      'RAG with ChromaDB + Hugging Face embeddings',
      'Sentiment analysis and tone detection',
      'Lead capture and CSV export',
      'AWS EC2 deployment ready'
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /',
      'POST /api/chat',
      'GET /api/health',
      'GET /api/leads',
      'POST /api/reinit-vectorstore'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 AI Chatbot Backend Server Started');
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`🤖 Model: ${process.env.OLLAMA_MODEL || 'tinylama'}`);
  console.log(`🔗 Ollama: ${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}`);
  console.log(`📊 Vector Store: ${process.env.VECTOR_STORE_ENABLED === 'true' ? 'Enabled' : 'Disabled'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully');
  process.exit(0);
});

module.exports = app;
