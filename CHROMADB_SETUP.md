# ChromaDB Setup Guide

## What is ChromaDB?

ChromaDB is an AI-native vector database that enables your chatbot to:
- Store and search through your website content
- Provide context-aware responses using RAG (Retrieval Augmented Generation)
- Remember and retrieve relevant information from your knowledge base

## Installation Methods

### Method 1: Docker (Recommended)

1. **Install Docker Desktop**
   - Download from: https://www.docker.com/products/docker-desktop/
   - Install and start Docker Desktop

2. **Run ChromaDB Container**
   ```bash
   docker run -p 8000:8000 chromadb/chroma
   ```

3. **Verify Installation**
   ```bash
   curl http://localhost:8000/api/v1/heartbeat
   ```

### Method 2: Python Installation

1. **Install Python 3.8+**
   - Download from: https://www.python.org/downloads/

2. **Install ChromaDB**
   ```bash
   pip install chromadb
   ```

3. **Start ChromaDB Server**
   ```bash
   chroma run --host localhost --port 8000
   ```

### Method 3: Using Conda

1. **Install Conda/Miniconda**
   - Download from: https://docs.conda.io/en/latest/miniconda.html

2. **Create Environment**
   ```bash
   conda create -n chromadb python=3.9
   conda activate chromadb
   pip install chromadb
   ```

3. **Start Server**
   ```bash
   chroma run --host localhost --port 8000
   ```

## Configuration

### Step 1: Update Environment Variables

In your `.env` file, change:

```env
# Enable ChromaDB
VECTOR_STORE_ENABLED=true

# ChromaDB Configuration
CHROMA_DB_URL=http://localhost:8000
CHROMA_SERVER_CORS_ALLOW_ORIGINS=*
```

### Step 2: Install Embedding Model (if using Ollama embeddings)

```bash
ollama pull nomic-embed-text
```

### Step 3: Restart Backend

```bash
npm run backend:dev
```

## Verification

### Check ChromaDB is Running

1. **Browser Test**: Visit http://localhost:8000/docs
2. **API Test**: 
   ```bash
   curl http://localhost:8000/api/v1/heartbeat
   ```

### Check Backend Integration

1. **Start your backend**: `npm run backend:dev`
2. **Look for success messages**:
   ```
   ✅ Vector store initialized successfully
   📚 Loaded XX data chunks from website files
   ✅ Vector store populated successfully
   🚀 Vector store ready for RAG queries
   ```

3. **Test advanced chat**: POST to `http://localhost:5000/api/advanced/chat`

## Troubleshooting

### Common Issues

1. **Port 8000 already in use**
   ```bash
   # Use different port
   docker run -p 8001:8000 chromadb/chroma
   # Update CHROMA_DB_URL=http://localhost:8001
   ```

2. **Docker permission issues**
   - Make sure Docker Desktop is running
   - Try running as administrator

3. **Python/pip issues**
   ```bash
   # Update pip
   python -m pip install --upgrade pip
   # Install with user flag
   pip install --user chromadb
   ```

4. **Connection refused**
   - Ensure ChromaDB is running on correct port
   - Check firewall settings
   - Verify CHROMA_DB_URL in .env

### Performance Tuning

For better performance with large datasets:

```bash
# Docker with more memory
docker run -p 8000:8000 -e CHROMA_SERVER_AUTH_CREDENTIALS_PROVIDER=chromadb.auth.basic.BasicAuthCredentialsProvider chromadb/chroma

# Python with custom config
chroma run --host localhost --port 8000 --workers 4
```

## Benefits of ChromaDB Integration

### Without ChromaDB (Current):
- ✅ Simple chat responses
- ❌ No context from your website
- ❌ Generic responses

### With ChromaDB:
- ✅ Context-aware responses
- ✅ Searches your services/portfolio data
- ✅ More accurate and relevant answers
- ✅ Learns from your content

## Quick Start Commands

```bash
# Option 1: Docker (Easiest)
docker run -p 8000:8000 chromadb/chroma

# Option 2: Python
pip install chromadb
chroma run --host localhost --port 8000

# Then update .env and restart backend
# VECTOR_STORE_ENABLED=true
npm run backend:dev
```

## Need Help?

1. **Docker Issues**: https://docs.docker.com/desktop/troubleshoot/
2. **ChromaDB Docs**: https://docs.trychroma.com/
3. **Python Setup**: https://www.python.org/downloads/

Your project will work fine without ChromaDB, but enabling it will make your AI chatbot much smarter and more helpful!