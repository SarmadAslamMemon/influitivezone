# AI Chatbot Backend Deployment Guide

## AWS EC2 Deployment with Ollama

### Prerequisites
- AWS EC2 instance (Ubuntu 20.04+ recommended)
- Domain name (optional, for SSL)
- Basic knowledge of Linux commands

### Step 1: Launch EC2 Instance

1. **Launch EC2 Instance:**
   - Instance Type: `t3.medium` or larger (recommended for Ollama)
   - AMI: Ubuntu Server 20.04 LTS
   - Storage: 20GB+ (for models and data)
   - Security Groups: Allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 5000 (Backend)

2. **Connect to Instance:**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

### Step 2: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python and pip
sudo apt install python3 python3-pip -y

# Install Git
sudo apt install git -y

# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

### Step 3: Setup Ollama

```bash
# Start Ollama service
ollama serve &

# Pull TinyLLaMA model
ollama pull tinylama

# Verify model is available
ollama list
```

### Step 4: Deploy Backend Code

```bash
# Clone your repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo

# Install dependencies
npm install

# Copy environment file
cp backend/env.example backend/.env

# Edit environment variables
nano backend/.env
```

**Environment Configuration:**
```env
BACKEND_PORT=5000
FRONTEND_URL=https://yourdomain.com
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=tinylama
HUGGINGFACE_API_KEY=your_actual_api_key
NODE_ENV=production
```

### Step 5: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/chatbot-backend
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend (if serving from same server)
    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/chatbot-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Setup SSL (Optional but Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Step 7: Start Services with PM2

```bash
# Create PM2 ecosystem file
nano ecosystem.config.js
```

**PM2 Configuration:**
```javascript
module.exports = {
  apps: [
    {
      name: 'chatbot-backend',
      script: 'backend/server.js',
      cwd: '/home/ubuntu/your-repo',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        BACKEND_PORT: 5000
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true
    }
  ]
};
```

```bash
# Create logs directory
mkdir logs

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
```

### Step 8: Monitor and Test

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs chatbot-backend

# Test API
curl http://localhost:5000/api/health

# Test from external
curl http://your-domain.com/api/health
```

### Step 9: Frontend Integration

Update your React frontend to use the new backend:

```javascript
// In your ChatWidget component
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com/api' 
  : 'http://localhost:5000/api';

// Update fetch calls
const response = await fetch(`${BACKEND_URL}/chat`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ message: userMessage })
});
```

### Troubleshooting

**Common Issues:**

1. **Ollama not responding:**
   ```bash
   # Check if Ollama is running
   ps aux | grep ollama
   
   # Restart Ollama
   pkill ollama
   ollama serve &
   ```

2. **Model not found:**
   ```bash
   # Pull model again
   ollama pull tinylama
   
   # List available models
   ollama list
   ```

3. **Backend not starting:**
   ```bash
   # Check logs
   pm2 logs chatbot-backend
   
   # Restart service
   pm2 restart chatbot-backend
   ```

4. **Nginx errors:**
   ```bash
   # Test configuration
   sudo nginx -t
   
   # Check error logs
   sudo tail -f /var/log/nginx/error.log
   ```

### Performance Optimization

1. **Increase EC2 instance size** if needed
2. **Use Redis** for caching (optional)
3. **Enable gzip compression** in Nginx
4. **Monitor memory usage** with `htop`
5. **Set up CloudWatch** for monitoring

### Security Considerations

1. **Firewall rules** - Only open necessary ports
2. **Regular updates** - Keep system and dependencies updated
3. **API rate limiting** - Implement rate limiting for production
4. **Environment variables** - Never commit API keys to repository
5. **HTTPS only** - Use SSL certificates for production

### Backup Strategy

```bash
# Backup leads data
cp backend/data/leads.csv /backup/leads-$(date +%Y%m%d).csv

# Backup vector store (if using persistent storage)
cp -r ~/.local/share/chromadb /backup/chromadb-$(date +%Y%m%d)

# Setup automated backups
crontab -e
# Add: 0 2 * * * /path/to/backup-script.sh
```

### Scaling Considerations

- **Load Balancer**: Use AWS Application Load Balancer for multiple instances
- **Database**: Consider using managed database services
- **CDN**: Use CloudFront for static assets
- **Monitoring**: Implement comprehensive monitoring and alerting

This deployment guide provides a production-ready setup for your AI chatbot backend with TinyLLaMA and RAG capabilities.
