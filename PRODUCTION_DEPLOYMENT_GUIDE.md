# Production Deployment Guide for Influitive Zone

## Environment Configuration

### Frontend (.env.local)
```bash
# Use relative API paths for production
NEXT_PUBLIC_BACKEND_URL=
BACKEND_URL=http://localhost:3001

# Other configurations...
PORT=3001
OPENAI_API_KEY=your_key_here
```

### Backend (.env)
```bash
# Backend Configuration
BACKEND_PORT=3001
FRONTEND_URL=https://influitivezone.com
PRODUCTION_FRONTEND_URL=https://influitivezone.com

# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=tinyllama

# Hugging Face API
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

## Nginx Configuration

Add this to your Nginx configuration to proxy API requests:

```nginx
server {
    listen 80;
    server_name influitivezone.com www.influitivezone.com;
    
    # Frontend (Next.js on port 8080)
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API proxy (Express.js on port 3001)
    location /api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Deployment Steps

1. **Update Environment Variables**:
   - Set `NEXT_PUBLIC_BACKEND_URL` to empty string in frontend
   - Set `BACKEND_URL=http://localhost:3001` in frontend
   - Configure backend CORS to allow influitivezone.com

2. **Configure Nginx**:
   - Add the proxy configuration above
   - Reload Nginx: `sudo nginx -s reload`

3. **Restart Services**:
   - Restart frontend: `pm2 restart frontend`
   - Restart backend: `pm2 restart backend`

4. **Test the Connection**:
   - Visit https://influitivezone.com
   - Open browser dev tools
   - Test the chatbot functionality
   - Check console for any CORS or API errors

## Troubleshooting

- **CORS Errors**: Ensure backend CORS includes influitivezone.com
- **API Not Found**: Check Nginx proxy configuration
- **Connection Refused**: Verify backend is running on port 3001
- **Frontend Errors**: Check browser console for detailed error messages
