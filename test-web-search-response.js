// Test web search response generation directly
import ResponseGenerator from './backend/utils/responseGenerator.js';
import DataManager from './backend/utils/dataManager.js';
import QueryAnalyzer from './backend/utils/queryAnalyzer.js';

const dataManager = new DataManager();
const queryAnalyzer = new QueryAnalyzer();
const responseGenerator = new ResponseGenerator(dataManager, queryAnalyzer);

async function testWebSearchResponse() {
  console.log('🔍 Testing Web Search Response Generation...\n');

  try {
    const message = "What is web development?";
    const analysisResult = {
      type: 'general_knowledge',
      keywords: ['what is'],
      confidence: 0.4,
      strategy: 'web_search_enhanced'
    };

    console.log(`📝 Testing: "${message}"`);
    console.log('📊 Analysis:', analysisResult);
    console.log('⏳ Generating response...');

    const startTime = Date.now();
    const response = await responseGenerator.generateWebSearchResponse(message, analysisResult);
    const endTime = Date.now();

    console.log(`✅ Response generated in ${endTime - startTime}ms`);
    console.log(`📄 Response: ${response}`);

  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    console.log('Stack:', error.stack);
  }
}

testWebSearchResponse();
