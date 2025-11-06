// Test the enhanced chatbot
import axios from 'axios';

const BACKEND_URL = 'http://localhost:3001';

async function testChatbot() {
  console.log('🤖 Testing Enhanced Chatbot...\n');

  const testQueries = [
    "What is web development?",
    "How does React work?",
    "What are your services?",
    "I'm interested in web development"
  ];

  for (const query of testQueries) {
    try {
      console.log(`\n📝 Query: "${query}"`);
      console.log('⏳ Waiting for response...');
      
      const response = await axios.post(`${BACKEND_URL}/api/chat`, {
        message: query,
        sessionId: 'test-session'
      }, {
        timeout: 15000 // 15 second timeout
      });

      if (response.data.success) {
        console.log(`✅ Response: ${response.data.reply}`);
        console.log(`📊 Analysis: ${response.data.analysis?.type} (${response.data.analysis?.strategy})`);
        if (response.data.analysis?.sources) {
          console.log(`🔍 Sources: ${response.data.analysis.sources}`);
        }
        console.log('─'.repeat(80));
      } else {
        console.log(`❌ Error: ${response.data.error}`);
      }
    } catch (error) {
      console.log(`❌ Request failed: ${error.message}`);
      if (error.code === 'ECONNREFUSED') {
        console.log('💡 Make sure your backend is running: npm run backend');
      }
    }
  }
}

testChatbot();
