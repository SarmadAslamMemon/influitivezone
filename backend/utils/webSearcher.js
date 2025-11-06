import axios from 'axios';

class WebSearcher {
  constructor() {
    // Google Custom Search API (FREE - 100 searches per day)
    this.googleApiKey = process.env.GOOGLE_SEARCH_API_KEY;
    this.googleSearchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
    this.googleBaseUrl = 'https://www.googleapis.com/customsearch/v1';
    
    // Fallback: DuckDuckGo Instant Answer API (completely free)
    this.duckDuckGoUrl = 'https://api.duckduckgo.com';
    
    // Cache for search results (5 minutes)
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000;
  }

  /**
   * Search for information using multiple sources
   */
  async search(query, numResults = 5) {
    try {
      // Check cache first
      const cacheKey = `search_${query.toLowerCase()}_${numResults}`;
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey);
        if (Date.now() - cached.timestamp < this.cacheExpiry) {
          console.log('📚 Using cached search results');
          return cached.data;
        }
      }

      console.log(`🔍 Searching for: "${query}"`);

      // Try Google Custom Search first (if API key is available)
      let results = [];
      if (this.googleApiKey && this.googleSearchEngineId) {
        try {
          results = await this.searchGoogle(query, numResults);
          console.log(`✅ Google search completed: ${results.length} results`);
        } catch (error) {
          console.log('⚠️ Google search failed, trying fallback:', error.message);
        }
      }

      // If Google search failed or no API key, try DuckDuckGo
      if (results.length === 0) {
        try {
          results = await this.searchDuckDuckGo(query, numResults);
          console.log(`✅ DuckDuckGo search completed: ${results.length} results`);
        } catch (error) {
          console.log('⚠️ DuckDuckGo search failed:', error.message);
        }
      }

      // If still no results, try Wikipedia API
      if (results.length === 0) {
        try {
          results = await this.searchWikipedia(query, numResults);
          console.log(`✅ Wikipedia search completed: ${results.length} results`);
        } catch (error) {
          console.log('⚠️ Wikipedia search failed:', error.message);
        }
      }

      // Cache the results
      this.cache.set(cacheKey, {
        data: results,
        timestamp: Date.now()
      });

      return results;

    } catch (error) {
      console.error('❌ Search error:', error);
      return [];
    }
  }

  /**
   * Google Custom Search API (FREE - 100 searches/day)
   */
  async searchGoogle(query, numResults) {
    const response = await axios.get(this.googleBaseUrl, {
      params: {
        key: this.googleApiKey,
        cx: this.googleSearchEngineId,
        q: query,
        num: Math.min(numResults, 10), // Google allows max 10
        safe: 'medium',
        fields: 'items(title,snippet,link)'
      },
      timeout: 10000
    });

    return this.formatGoogleResults(response.data.items || []);
  }

  /**
   * DuckDuckGo Instant Answer API (completely free)
   */
  async searchDuckDuckGo(query, numResults) {
    const response = await axios.get(this.duckDuckGoUrl, {
      params: {
        q: query,
        format: 'json',
        no_html: '1',
        skip_disambig: '1'
      },
      timeout: 10000
    });

    return this.formatDuckDuckGoResults(response.data, query);
  }

  /**
   * Wikipedia API (completely free)
   */
  async searchWikipedia(query, numResults) {
    // First, search for articles
    const searchResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        srsearch: query,
        srlimit: Math.min(numResults, 5)
      },
      timeout: 10000
    });

    const searchResults = searchResponse.data.query?.search || [];
    
    if (searchResults.length === 0) return [];

    // Get extracts for the first few results
    const pageIds = searchResults.slice(0, 3).map(result => result.pageid);
    const extractResponse = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        pageids: pageIds.join('|'),
        prop: 'extracts',
        exintro: '1',
        explaintext: '1',
        exlimit: '3'
      },
      timeout: 10000
    });

    return this.formatWikipediaResults(extractResponse.data.query?.pages || {});
  }

  /**
   * Format Google search results
   */
  formatGoogleResults(items) {
    return items.map((item, index) => ({
      title: item.title || 'No title',
      snippet: item.snippet || 'No description available',
      url: item.link || '#',
      source: 'Google',
      relevance: this.calculateRelevance(item.snippet || '', item.title || ''),
      index: index + 1
    }));
  }

  /**
   * Format DuckDuckGo results
   */
  formatDuckDuckGoResults(data, query) {
    const results = [];

    // Add abstract if available
    if (data.Abstract) {
      results.push({
        title: data.Heading || query,
        snippet: data.Abstract,
        url: data.AbstractURL || '#',
        source: 'DuckDuckGo',
        relevance: 0.9,
        index: 1
      });
    }

    // Add definition if available
    if (data.Definition) {
      results.push({
        title: `Definition: ${query}`,
        snippet: data.Definition,
        url: data.DefinitionURL || '#',
        source: 'DuckDuckGo',
        relevance: 0.8,
        index: 2
      });
    }

    // Add related topics
    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      data.RelatedTopics.slice(0, 3).forEach((topic, index) => {
        if (topic.Text) {
          results.push({
            title: topic.FirstURL ? topic.FirstURL.split('/').pop().replace(/_/g, ' ') : `Related: ${query}`,
            snippet: topic.Text,
            url: topic.FirstURL || '#',
            source: 'DuckDuckGo',
            relevance: 0.7 - (index * 0.1),
            index: results.length + 1
          });
        }
      });
    }

    return results;
  }

  /**
   * Format Wikipedia results
   */
  formatWikipediaResults(pages) {
    return Object.values(pages).map((page, index) => ({
      title: page.title || 'Wikipedia Article',
      snippet: page.extract ? page.extract.substring(0, 300) + '...' : 'No description available',
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title || '')}`,
      source: 'Wikipedia',
      relevance: 0.8 - (index * 0.1),
      index: index + 1
    }));
  }

  /**
   * Calculate relevance score for search results
   */
  calculateRelevance(snippet, title) {
    let score = 0.5; // Base score

    // Boost score for longer, more detailed snippets
    if (snippet && snippet.length > 100) score += 0.2;
    if (snippet && snippet.length > 200) score += 0.1;

    // Boost score for descriptive titles
    if (title && title.length > 20) score += 0.1;
    if (title && title.length > 40) score += 0.1;

    // Boost score for certain keywords
    const qualityKeywords = ['definition', 'explanation', 'tutorial', 'guide', 'how to', 'benefits', 'advantages'];
    const lowerSnippet = (snippet || '').toLowerCase();
    const lowerTitle = (title || '').toLowerCase();
    
    qualityKeywords.forEach(keyword => {
      if (lowerSnippet.includes(keyword) || lowerTitle.includes(keyword)) {
        score += 0.1;
      }
    });

    return Math.min(score, 1.0);
  }

  /**
   * Search for specific types of information
   */
  async searchForDefinition(term) {
    const query = `definition of ${term} what is ${term}`;
    return await this.search(query, 3);
  }

  async searchForTutorial(topic) {
    const query = `how to ${topic} tutorial guide steps`;
    return await this.search(query, 3);
  }

  async searchForComparison(term1, term2) {
    const query = `${term1} vs ${term2} difference between ${term1} and ${term2}`;
    return await this.search(query, 3);
  }

  async searchForNews(topic) {
    const query = `${topic} news latest updates recent`;
    return await this.search(query, 3);
  }

  /**
   * Get search suggestions
   */
  async getSearchSuggestions(query) {
    try {
      const response = await axios.get('https://suggestqueries.google.com/complete/search', {
        params: {
          client: 'firefox',
          q: query
        },
        timeout: 5000
      });

      return response.data[1] || [];
    } catch (error) {
      console.log('⚠️ Search suggestions failed:', error.message);
      return [];
    }
  }

  /**
   * Clear cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

export default WebSearcher;
