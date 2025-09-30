import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SessionManager {
  constructor() {
    this.sessions = new Map(); // In-memory session storage
    this.sessionFile = path.join(__dirname, '../data/sessions.json');
    this.loadSessions();
  }

  /**
   * Load sessions from file
   */
  async loadSessions() {
    try {
      const data = await fs.readFile(this.sessionFile, 'utf8');
      const sessionsData = JSON.parse(data);
      this.sessions = new Map(Object.entries(sessionsData));
      console.log(`📁 Loaded ${this.sessions.size} sessions from file`);
    } catch (error) {
      console.log('📁 No existing sessions file, starting fresh');
      this.sessions = new Map();
    }
  }

  /**
   * Save sessions to file
   */
  async saveSessions() {
    try {
      const sessionsData = Object.fromEntries(this.sessions);
      await fs.writeFile(this.sessionFile, JSON.stringify(sessionsData, null, 2));
    } catch (error) {
      console.error('❌ Failed to save sessions:', error.message);
    }
  }

  /**
   * Get or create a session
   */
  getSession(sessionId) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        id: sessionId,
        createdAt: new Date().toISOString(),
        leadCaptured: false,
        leadInfo: null,
        messageCount: 0
      });
    }
    return this.sessions.get(sessionId);
  }

  /**
   * Update session with lead information
   */
  updateSessionWithLead(sessionId, leadInfo) {
    const session = this.getSession(sessionId);
    session.leadCaptured = true;
    session.leadInfo = leadInfo;
    session.leadCapturedAt = new Date().toISOString();
    this.sessions.set(sessionId, session);
    this.saveSessions(); // Save to file
    return session;
  }

  /**
   * Increment message count
   */
  incrementMessageCount(sessionId) {
    const session = this.getSession(sessionId);
    session.messageCount++;
    session.lastMessageAt = new Date().toISOString();
    this.sessions.set(sessionId, session);
    return session;
  }

  /**
   * Check if lead has been captured in this session
   */
  hasLeadCaptured(sessionId) {
    const session = this.getSession(sessionId);
    return session.leadCaptured;
  }

  /**
   * Get session info
   */
  getSessionInfo(sessionId) {
    return this.getSession(sessionId);
  }

  /**
   * Clean up old sessions (older than 24 hours)
   */
  cleanupOldSessions() {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    let cleanedCount = 0;
    for (const [sessionId, session] of this.sessions.entries()) {
      const sessionTime = new Date(session.createdAt);
      if (sessionTime < oneDayAgo) {
        this.sessions.delete(sessionId);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} old sessions`);
      this.saveSessions();
    }
  }
}

export default SessionManager;
