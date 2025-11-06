// Test simple chat without web search
import axios from 'axios';

const BACKEND_URL = 'http://localhost:3001';

async function testSimpleChat() {
  console.log('🤖 Testing Simple Chat (No Web Search)...\n');

  const testQueries = [
    "What are your services?", // This should work (company data)
    "Show me your portfolio",   // This should work (company data)
    "Hello there"              // This should work (greeting)
  ];

  for (const query of testQueries) {
    try {
      console.log(`\n📝 Query: "${query}"`);
      console.log('⏳ Waiting for response...');
      
      const response = await axios.post(`${BACKEND_URL}/api/chat`, {
        message: query,
        sessionId: 'test-session'
      }, {
        timeout: 10000 // 10 second timeout
      });

      if (response.data.success) {
        console.log(`✅ Response: ${response.data.reply}`);
        console.log(`📊 Analysis: ${response.data.analysis?.type} (${response.data.analysis?.strategy})`);
      } else {
        console.log(`❌ Error: ${response.data.error}`);
      }
    } catch (error) {
      console.log(`❌ Request failed: ${error.message}`);
    }
  }
}

testSimpleChat();
