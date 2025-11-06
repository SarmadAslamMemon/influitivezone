#!/usr/bin/env node

const axios = require('axios');
require('dotenv').config();

async function checkSetup() {
  console.log('🔍 Checking backend setup...\n');

  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log(`  OLLAMA_BASE_URL: ${process.env.OLLAMA_BASE_URL || 'http://localhost:11434'}`);
  console.log(`  OLLAMA_MODEL: ${process.env.OLLAMA_MODEL || 'tinylama'}`);
  console.log(`  VECTOR_STORE_ENABLED: ${process.env.VECTOR_STORE_ENABLED || 'false'}`);
  console.log(`  BACKEND_PORT: ${process.env.BACKEND_PORT || '5000'}\n`);

  // Check Ollama connection
  try {
    console.log('🔗 Checking Ollama connection...');
    const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const response = await axios.get(`${ollamaUrl}/api/tags`);
    console.log('✅ Ollama is running');
    
    const models = response.data.models || [];
    const modelNames = models.map(m => m.name);
    console.log(`📦 Available models: ${modelNames.join(', ')}`);
    
    const targetModel = process.env.OLLAMA_MODEL || 'tinylama';
    if (modelNames.some(name => name.includes(targetModel))) {
      console.log(`✅ Target model '${targetModel}' is available`);
    } else {
      console.log(`⚠️  Target model '${targetModel}' not found. Available: ${modelNames.join(', ')}`);
      console.log(`💡 Run: ollama pull ${targetModel}`);
    }
  } catch (error) {
    console.log('❌ Ollama connection failed');
    console.log('💡 Make sure Ollama is running: ollama serve');
    console.log('💡 Or install Ollama from: https://ollama.ai');
  }

  console.log('\n🔧 Quick fixes if needed:');
  console.log('  1. Install Ollama: https://ollama.ai');
  console.log('  2. Start Ollama: ollama serve');
  console.log('  3. Pull model: ollama pull tinylama');
  console.log('  4. Disable ChromaDB: Set VECTOR_STORE_ENABLED=false in .env');
  
  console.log('\n🚀 Start server: npm run backend:dev');
}

checkSetup().catch(console.error);