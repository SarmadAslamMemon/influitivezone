// Debug chatbot query analysis
import QueryAnalyzer from './backend/utils/queryAnalyzer.js';

const queryAnalyzer = new QueryAnalyzer();

// Test queries
const testQueries = [
  "What is React.js?",
  "How does machine learning work?",
  "What are your services?",
  "Show me your portfolio",
  "Hello there"
];

console.log('🔍 Testing Query Analysis...\n');

testQueries.forEach((query, index) => {
  console.log(`Test ${index + 1}: "${query}"`);
  const analysis = queryAnalyzer.analyzeQuery(query);
  console.log('Analysis:', analysis);
  console.log('---');
});
