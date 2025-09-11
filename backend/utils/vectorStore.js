const { ChromaClient } = require('chromadb');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

class VectorStore {
  constructor() {
    this.client = null;
    this.collection = null;
    this.isEnabled = process.env.VECTOR_STORE_ENABLED === 'true';
    this.useEmbedded = true; // Use embedded mode instead of server
    this.persistPath = './chroma_data'; // Local storage path
    // Use Ollama for embeddings so no external API key is required
    this.ollamaBaseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    this.embeddingModel = process.env.OLLAMA_EMBED_MODEL || 'nomic-embed-text';
    this.collectionName = 'website_knowledge';
  }

  async initialize() {
    try {
      if (!this.isEnabled) {
        console.log('⚠️ Vector store is disabled. Set VECTOR_STORE_ENABLED=true to enable.');
        return false;
      }

      // Initialize ChromaDB client in embedded mode
      if (this.useEmbedded) {
        console.log('💾 Using ChromaDB in embedded mode...');
        const { ChromaClient } = require('chromadb');
        this.client = new ChromaClient();
      } else {
        console.log('🌐 Using ChromaDB server mode...');
        this.client = new ChromaClient({
          path: this.chromaUrl
        });
        // Test connection first
        await this.client.heartbeat();
      }
      
      // Create or get collection
      this.collection = await this.client.getOrCreateCollection({
        name: this.collectionName,
        metadata: { description: 'Website knowledge base for RAG' }
      });
      
      console.log('✅ Vector store initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Error initializing vector store:', error.message);
      if (!this.useEmbedded) {
        console.log('💡 Tip: Make sure ChromaDB is running on', this.chromaUrl);
        console.log('💡 Or try embedded mode by updating the code');
      }
      console.log('💡 Or disable vector store by setting VECTOR_STORE_ENABLED=false');
      return false;
    }
  }

  async generateEmbedding(text) {
    try {
      const { data } = await axios.post(`${this.ollamaBaseUrl}/api/embeddings`, {
        model: this.embeddingModel,
        input: text
      });

      // Ollama returns { embedding: number[] }
      if (data && Array.isArray(data.embedding)) {
        return data.embedding;
      }

      throw new Error('Invalid embedding response from Ollama');
    } catch (error) {
      console.error('❌ Error generating embedding via Ollama:', error?.response?.data || error.message);
      throw error;
    }
  }

  async loadWebsiteData() {
    try {
      const dataDir = path.join(__dirname, '../data');
      const files = await fs.readdir(dataDir);
      const websiteData = [];

      for (const file of files) {
        if (file.endsWith('.json') || file.endsWith('.txt')) {
          const filePath = path.join(dataDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          
          if (file.endsWith('.json')) {
            const jsonData = JSON.parse(content);
            websiteData.push(...this.parseJsonData(jsonData, file));
          } else {
            websiteData.push(...this.parseTextData(content, file));
          }
        }
      }

      console.log(`📚 Loaded ${websiteData.length} data chunks from website files`);
      return websiteData;
    } catch (error) {
      console.error('❌ Error loading website data:', error);
      return [];
    }
  }

  parseJsonData(data, filename) {
    const chunks = [];
    
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          Object.entries(item).forEach(([key, value]) => {
            if (typeof value === 'string' && value.length > 10) {
              chunks.push({
                text: value,
                source: filename,
                metadata: { key, index, type: 'json' }
              });
            }
          });
        }
      });
    } else if (typeof data === 'object') {
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string' && value.length > 10) {
          chunks.push({
            text: value,
            source: filename,
            metadata: { key, type: 'json' }
          });
        }
      });
    }

    return chunks;
  }

  parseTextData(content, filename) {
    const chunks = [];
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
    
    sentences.forEach((sentence, index) => {
      chunks.push({
        text: sentence.trim(),
        source: filename,
        metadata: { index, type: 'text' }
      });
    });

    return chunks;
  }

  async populateVectorStore() {
    try {
      if (!this.isEnabled || !this.collection) {
        console.log('⚠️ Vector store not available for population');
        return false;
      }

      const websiteData = await this.loadWebsiteData();
      
      if (websiteData.length === 0) {
        console.log('⚠️ No website data found to populate vector store');
        return false;
      }

      // Clear existing data safely
      try {
        const count = await this.collection.count();
        if (count > 0) {
          await this.collection.delete({ where: {} });
        }
      } catch (deleteError) {
        console.log('⚠️ Could not clear existing data, proceeding with fresh data');
      }

      // Process in batches
      const batchSize = 10;
      for (let i = 0; i < websiteData.length; i += batchSize) {
        const batch = websiteData.slice(i, i + batchSize);
        
        const texts = batch.map(item => item.text);
        const embeddings = await Promise.all(texts.map(text => this.generateEmbedding(text)));
        
        const ids = batch.map((_, index) => `chunk_${i + index}`);
        const metadatas = batch.map(item => item.metadata);

        await this.collection.add({
          ids,
          embeddings,
          documents: texts,
          metadatas
        });

        console.log(`📝 Processed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(websiteData.length / batchSize)}`);
      }

      console.log('✅ Vector store populated successfully');
      return true;
    } catch (error) {
      console.error('❌ Error populating vector store:', error.message);
      return false;
    }
  }

  async searchSimilar(query, limit = 5) {
    try {
      if (!this.isEnabled || !this.collection) {
        console.log('⚠️ Vector store not available for search');
        return [];
      }

      const queryEmbedding = await this.generateEmbedding(query);
      
      const results = await this.collection.query({
        queryEmbeddings: [queryEmbedding],
        nResults: limit
      });

      if (results.documents && results.documents[0]) {
        return results.documents[0].map((doc, index) => ({
          text: doc,
          metadata: results.metadatas[0][index],
          distance: results.distances[0][index]
        }));
      }

      return [];
    } catch (error) {
      console.error('❌ Error searching vector store:', error.message);
      return [];
    }
  }

  async getCollectionStats() {
    try {
      if (!this.isEnabled || !this.collection) {
        return { totalChunks: 0, collectionName: this.collectionName, enabled: false };
      }

      const count = await this.collection.count();
      return {
        totalChunks: count,
        collectionName: this.collectionName,
        enabled: true
      };
    } catch (error) {
      console.error('❌ Error getting collection stats:', error.message);
      return { totalChunks: 0, collectionName: this.collectionName, enabled: false };
    }
  }
}

module.exports = VectorStore;
