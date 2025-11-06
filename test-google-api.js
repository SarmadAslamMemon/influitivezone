// Test Google Custom Search API
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './backend/.env' });

const GOOGLE_API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
const SEARCH_ENGINE_ID = process.env.GOOGLE_SEARCH_ENGINE_ID;

console.log('🔍 Testing Google Custom Search API...');
console.log('API Key:', GOOGLE_API_KEY ? '✅ Found' : '❌ Missing');
console.log('Search Engine ID:', SEARCH_ENGINE_ID ? '✅ Found' : '❌ Missing');

if (!GOOGLE_API_KEY || !SEARCH_ENGINE_ID) {
  console.log('❌ Missing API credentials. Please check your .env file.');
  process.exit(1);
}

async function testGoogleSearch() {
  try {
    console.log('\n🧪 Testing search for "React.js"...');
    
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: 'React.js',
        num: 3
      }
    });

    console.log('✅ Search successful!');
    console.log('Results found:', response.data.items?.length || 0);
    
    if (response.data.items && response.data.items.length > 0) {
      console.log('\n📄 First result:');
      console.log('Title:', response.data.items[0].title);
      console.log('Snippet:', response.data.items[0].snippet?.substring(0, 100) + '...');
    }

  } catch (error) {
    console.log('❌ Search failed:', error.response?.data?.error?.message || error.message);
    
    if (error.response?.status === 403) {
      console.log('💡 This might be a quota issue or API key problem.');
    }
  }
}

testGoogleSearch();
