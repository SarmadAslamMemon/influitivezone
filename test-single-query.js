// Test single web search query
import axios from 'axios';

const BACKEND_URL = 'http://localhost:3001';

async function testSingleQuery() {
  console.log('🤖 Testing Single Web Search Query...\n');

  try {
    const query = "What is web development?";
    console.log(`📝 Query: "${query}"`);
    console.log('⏳ Waiting for response...');
    
    const response = await axios.post(`${BACKEND_URL}/api/chat`, {
      message: query,
      sessionId: 'test-single'
    }, {
      timeout: 20000 // 20 second timeout
    });

    if (response.data.success) {
      console.log(`✅ Response: ${response.data.reply}`);
      console.log(`📊 Analysis: ${response.data.analysis?.type} (${response.data.analysis?.strategy})`);
      if (response.data.analysis?.sources) {
        console.log(`🔍 Sources: ${response.data.analysis.sources}`);
      }
    } else {
      console.log(`❌ Error: ${response.data.error}`);
    }
  } catch (error) {
    console.log(`❌ Request failed: ${error.message}`);
    if (error.code === 'ECONNABORTED') {
      console.log('⏰ Request timed out - the AI might be taking too long to process');
    }
  }
}

testSingleQuery();
