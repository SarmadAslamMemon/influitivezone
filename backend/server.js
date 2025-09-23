const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const chatRoutes = require('./routes/chat');
const simpleChatRoutes = require('./routes/simple-chat');

const app = express();
const PORT = process.env.BACKEND_PORT || 8080;

// =========================
// 🔹 Middleware
// =========================
app.use(cors({
  origin: [
    'http://localhost:3000', // dev frontend
    'http://localhost:3001'  // optional dev frontend
  ],
  credentials: true,
}));
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// =========================
// 🔹 API Routes
// =========================
app.use('/api', simpleChatRoutes);
app.use('/api/advanced', chatRoutes);

// =========================
// 🔹 Serve Frontend (Next.js export)
// ⚠️ Keep your `/api/...` routes above this block so they don’t get overridden
// =========================
const frontendPath = path.join(__dirname, 'public'); // public contains Next.js /out
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// =========================
// 🔹 404 Handler (for API only)
// =========================
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// =========================
// 🔹 Error Handling Middleware
// =========================
app.use((error, req, res, next) => {
  console.error('❌ Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: error.message,
  });
});

// =========================
// 🔹 Start Server
// =========================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
