#!/usr/bin/env python3

import os
import sys

# Clear problematic environment variables
if 'CHROMA_SERVER_CORS_ALLOW_ORIGINS' in os.environ:
    del os.environ['CHROMA_SERVER_CORS_ALLOW_ORIGINS']

# Set clean environment for ChromaDB
os.environ['CHROMA_HOST'] = 'localhost'
os.environ['CHROMA_PORT'] = '8000'
os.environ['CHROMA_SERVER_HTTP_PORT'] = '8000'

try:
    import chromadb
    from chromadb.config import Settings
    
    print("🚀 Starting ChromaDB server...")
    print("📍 Host: localhost")
    print("📍 Port: 8000")
    print("🌐 URL: http://localhost:8000")
    print("━" * 50)
    
    # Start ChromaDB server
    import uvicorn
    from chromadb.server.fastapi import app
    
    # Configure the app for CORS
    from fastapi.middleware.cors import CORSMiddleware
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    uvicorn.run(app, host="localhost", port=8000, log_level="info")
    
except ImportError as e:
    print(f"❌ ChromaDB import error: {e}")
    print("💡 Try: pip install chromadb")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error starting ChromaDB: {e}")
    print("💡 Check if port 8000 is available")
    sys.exit(1)