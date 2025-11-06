#!/usr/bin/env node

const { spawn } = require('child_process');
const axios = require('axios');
require('dotenv').config();

async function setupChromaDB() {
  console.log('🔧 ChromaDB Setup Wizard\n');

  // Check if ChromaDB is already running
  try {
    console.log('🔍 Checking if ChromaDB is already running...');
    await axios.get('http://localhost:8000/api/v1/heartbeat');
    console.log('✅ ChromaDB is already running on port 8000!\n');
    
    console.log('📋 Next steps:');
    console.log('1. Update your .env file:');
    console.log('   VECTOR_STORE_ENABLED=true');
    console.log('2. Restart your backend: npm run backend:dev');
    return;
  } catch (error) {
    console.log('⚠️  ChromaDB not running, let\'s set it up...\n');
  }

  console.log('🐳 Checking if Docker is available...');
  
  // Check if docker is available
  const dockerCheck = spawn('docker', ['--version'], { stdio: 'pipe' });
  
  dockerCheck.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Docker found! Starting ChromaDB container...\n');
      startDockerChromaDB();
    } else {
      console.log('❌ Docker not found. Checking Python...\n');
      checkPython();
    }
  });

  dockerCheck.on('error', () => {
    console.log('❌ Docker not found. Checking Python...\n');
    checkPython();
  });
}

function startDockerChromaDB() {
  console.log('🚀 Starting ChromaDB with Docker...');
  console.log('Command: docker run -p 8000:8000 chromadb/chroma\n');
  
  const docker = spawn('docker', ['run', '-p', '8000:8000', 'chromadb/chroma'], {
    stdio: 'inherit'
  });

  docker.on('error', (error) => {
    console.error('❌ Failed to start Docker:', error.message);
    console.log('\n💡 Alternative options:');
    console.log('1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/');
    console.log('2. Or install Python and run: pip install chromadb');
  });

  // Give it a moment to start
  setTimeout(async () => {
    try {
      await axios.get('http://localhost:8000/api/v1/heartbeat');
      console.log('\n✅ ChromaDB is now running!');
      printNextSteps();
    } catch (error) {
      console.log('\n⚠️  ChromaDB might still be starting up...');
      console.log('Check http://localhost:8000/docs in your browser');
    }
  }, 5000);
}

function checkPython() {
  const pythonCheck = spawn('python', ['--version'], { stdio: 'pipe' });
  
  pythonCheck.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Python found!');
      installPythonChromaDB();
    } else {
      console.log('❌ Python not found either.');
      printInstallationOptions();
    }
  });

  pythonCheck.on('error', () => {
    console.log('❌ Python not found either.');
    printInstallationOptions();
  });
}

function installPythonChromaDB() {
  console.log('📦 Installing ChromaDB via pip...\n');
  
  const pip = spawn('pip', ['install', 'chromadb'], { stdio: 'inherit' });
  
  pip.on('close', (code) => {
    if (code === 0) {
      console.log('\n✅ ChromaDB installed successfully!');
      console.log('🚀 Starting ChromaDB server...\n');
      
      const chroma = spawn('chroma', ['run', '--host', 'localhost', '--port', '8000'], {
        stdio: 'inherit'
      });

      chroma.on('error', (error) => {
        console.error('❌ Failed to start ChromaDB:', error.message);
        console.log('\n💡 Try running manually: chroma run --host localhost --port 8000');
      });

      setTimeout(() => {
        printNextSteps();
      }, 3000);
    } else {
      console.log('\n❌ Failed to install ChromaDB via pip');
      printInstallationOptions();
    }
  });
}

function printInstallationOptions() {
  console.log('\n🔧 Installation Options:\n');
  
  console.log('📦 Option 1: Docker (Recommended)');
  console.log('  1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/');
  console.log('  2. Run: docker run -p 8000:8000 chromadb/chroma\n');
  
  console.log('🐍 Option 2: Python');
  console.log('  1. Install Python: https://www.python.org/downloads/');
  console.log('  2. Run: pip install chromadb');
  console.log('  3. Run: chroma run --host localhost --port 8000\n');
  
  console.log('📝 Option 3: Continue without ChromaDB');
  console.log('  Your app works fine without it, just with simpler chat responses.\n');
  
  console.log('💡 For detailed instructions, see: CHROMADB_SETUP.md');
}

function printNextSteps() {
  console.log('\n🎉 ChromaDB Setup Complete!\n');
  
  console.log('📋 Next Steps:');
  console.log('1. Update your .env file:');
  console.log('   VECTOR_STORE_ENABLED=true\n');
  
  console.log('2. Restart your backend:');
  console.log('   npm run backend:dev\n');
  
  console.log('3. Test the advanced chat:');
  console.log('   POST http://localhost:5000/api/advanced/chat\n');
  
  console.log('🌐 ChromaDB Admin UI: http://localhost:8000/docs');
  console.log('📖 Full guide: CHROMADB_SETUP.md');
}

// Run the setup
setupChromaDB().catch(console.error);