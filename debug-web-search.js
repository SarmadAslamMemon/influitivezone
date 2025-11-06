// Debug web search functionality
import WebSearcher from './backend/utils/webSearcher.js';

const webSearcher = new WebSearcher();

async function testWebSearch() {
  console.log('🔍 Testing Web Search...\n');

  const testQueries = [
    "What is web development?",
    "How does React work?",
    "I'm interested in web development"
  ];

  for (const query of testQueries) {
    try {
      console.log(`\n📝 Testing: "${query}"`);
      console.log('⏳ Searching...');
      
      const startTime = Date.now();
      const results = await webSearcher.search(query, 3);
      const endTime = Date.now();
      
      console.log(`✅ Search completed in ${endTime - startTime}ms`);
      console.log(`📊 Results found: ${results.length}`);
      
      if (results.length > 0) {
        console.log('📄 First result:');
        console.log(`  Title: ${results[0].title}`);
        console.log(`  Source: ${results[0].source}`);
        console.log(`  Snippet: ${results[0].snippet?.substring(0, 100)}...`);
      } else {
        console.log('❌ No results found');
      }
      
    } catch (error) {
      console.log(`❌ Search failed: ${error.message}`);
    }
  }
}

testWebSearch();
