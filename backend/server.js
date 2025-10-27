import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Fix __dirname + __filename for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for frontend communication
app.use((req, res, next) => {
  // Allow requests from both localhost (development) and production domain
  const allowedOrigins = [
    'http://localhost:8080',
    'https://influitivezone.com',
    'http://influitivezone.com'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Import and use API routes
import chatRoutes from "./routes/chat.js";
import simpleChatRoutes from "./routes/simple-chat.js";

// API routes
// app.use("/api", chatRoutes);
// app.use("/api/simple", simpleChatRoutes);

// API routes
app.use("/api", chatRoutes);
app.use("/api/simple", simpleChatRoutes);


// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    message: "Backend API server is running",
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "API endpoint not found",
    message: "This is a backend API server. Available endpoints: /api/chat, /api/simple/chat, /health"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend API server running at http://localhost:${PORT}`);
  console.log(`📡 Available endpoints:`);
  console.log(`   - POST /api/chat (Enhanced chatbot)`);
  console.log(`   - POST /api/simple/chat (Simple chatbot)`);
  console.log(`   - GET /health (Health check)`);
  console.log(`   - GET /api/leads (Get leads)`);
  console.log(`\n💡 Frontend should connect to: http://localhost:${PORT}`);
});
