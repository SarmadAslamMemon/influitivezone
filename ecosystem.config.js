module.exports = {
  apps: [
    {
      name: 'influitivezone-frontend',
      script: 'npm',
      args: 'start',
      cwd: './',
      env: {
        NODE_ENV: 'production',
        PORT: 8080,
        NEXT_PUBLIC_BACKEND_URL: '',
        BACKEND_URL: 'http://localhost:3001'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
        NEXT_PUBLIC_BACKEND_URL: '',
        BACKEND_URL: 'http://localhost:3001',
        // SMTP Configuration (Hostinger uses port 465 with SSL)
        SMTP_HOST: 'smtp.hostinger.com',
        SMTP_PORT: '465',
        SMTP_SECURE: 'true',
        SMTP_USER: 'cameron.blake@influitivezone.com',
        SMTP_PASS: 'mM>1|&mYU6',
        SMTP_FROM: 'cameron.blake@influitivezone.com',
        CONTACT_EMAIL: 'info@influitivezone.com'
      }
    },
    {
      name: 'influitivezone-backend',
      script: 'server.js',
      cwd: './backend',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        FRONTEND_URL: 'https://influitivezone.com',
        PRODUCTION_FRONTEND_URL: 'https://influitivezone.com'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        FRONTEND_URL: 'https://influitivezone.com',
        PRODUCTION_FRONTEND_URL: 'https://influitivezone.com'
      }
    }
  ]
};
