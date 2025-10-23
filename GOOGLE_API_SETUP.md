# Google API Setup Guide for Enhanced Chatbot

This guide will help you set up **FREE** Google APIs to enable your chatbot with web search capabilities and dynamic responses.

## 🆓 Free APIs We're Using

1. **Google Custom Search API** - 100 free searches per day
2. **DuckDuckGo Instant Answer API** - Completely free (fallback)
3. **Wikipedia API** - Completely free (fallback)

## 📋 Step-by-Step Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `influitivezone-chatbot`
4. Click "Create"

### Step 2: Enable Custom Search API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Custom Search API"
3. Click on it and press "Enable"

### Step 3: Create API Key

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy your API key (starts with `AIza...`)
4. **Optional**: Restrict the key to Custom Search API only

### Step 4: Create Custom Search Engine

1. Go to [Google Custom Search Engine](https://cse.google.com/cse/)
2. Click "Add" to create a new search engine
3. Enter any website (e.g., `influitivezone.com`)
4. Click "Create"
5. Go to "Setup" → "Basics"
6. Copy your "Search engine ID" (looks like `017576662512468239146:omuauf_lfve`)

### Step 5: Configure Search Engine

1. In your search engine settings, go to "Setup" → "Basics"
2. Under "Sites to search", add:
   - `*` (to search the entire web)
   - `wikipedia.org`
   - `stackoverflow.com`
   - `developer.mozilla.org`
3. Save changes

### Step 6: Update Environment Variables

1. Copy `backend/env.example` to `backend/.env`
2. Add your API credentials:

```bash
# Google Custom Search API (FREE - 100 searches per day)
GOOGLE_SEARCH_API_KEY=your_actual_api_key_here
GOOGLE_SEARCH_ENGINE_ID=your_actual_search_engine_id_here
```

## 🧪 Test Your Setup

### Test 1: Check API Key
```bash
curl "https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=YOUR_SEARCH_ENGINE_ID&q=test"
```

### Test 2: Test Chatbot
1. Start your backend: `npm run backend`
2. Ask: "What is React.js?"
3. You should get a detailed response with sources

## 🔧 Troubleshooting

### Common Issues

**Issue**: "API key not valid"
- **Solution**: Check your API key is correct and Custom Search API is enabled

**Issue**: "Search engine ID not valid"
- **Solution**: Verify your search engine ID from the CSE dashboard

**Issue**: "Quota exceeded"
- **Solution**: You've used your 100 free searches. Wait 24 hours or upgrade to paid plan

**Issue**: "No search results"
- **Solution**: Check your search engine is configured to search the web (`*`)

### Fallback Behavior

If Google API fails, the system automatically falls back to:
1. DuckDuckGo Instant Answer API (completely free)
2. Wikipedia API (completely free)
3. AI-only response (using TinyLlama)

## 📊 Usage Monitoring

### Check API Usage
1. Go to Google Cloud Console
2. Navigate to "APIs & Services" → "Quotas"
3. Search for "Custom Search API"
4. Monitor your daily usage

### Free Tier Limits
- **100 searches per day** (resets at midnight Pacific Time)
- **10 results per search**
- **No cost** for first 100 searches

## 🚀 Advanced Configuration

### Customize Search Sources
In your Custom Search Engine settings, you can:
- Add specific websites to search
- Exclude certain domains
- Set up site-specific search

### Rate Limiting
The system includes built-in rate limiting:
- 5-minute cache for search results
- Automatic fallback to free APIs
- Error handling and recovery

## 💡 Pro Tips

1. **Monitor Usage**: Check your daily quota regularly
2. **Cache Results**: The system caches results for 5 minutes
3. **Fallback Strategy**: Multiple free APIs ensure reliability
4. **Source Attribution**: All responses include source information

## 🔄 Upgrading (Optional)

If you need more than 100 searches per day:
1. Go to Google Cloud Console
2. Navigate to "Billing"
3. Add a payment method
4. Upgrade to paid tier ($5 per 1000 additional queries)

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your API credentials
3. Test with the curl command
4. Check Google Cloud Console for error logs

---

**Note**: This setup provides a robust, free solution for web search capabilities in your chatbot. The combination of Google Custom Search, DuckDuckGo, and Wikipedia ensures reliable responses even if one service fails.
