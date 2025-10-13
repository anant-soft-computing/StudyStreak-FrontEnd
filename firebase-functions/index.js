const { onRequest } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');
const admin = require('firebase-admin');
const OpenAI = require('openai');
const cors = require('cors')({ origin: true });

// Load environment variables
require('dotenv').config();

// Set global options
setGlobalOptions({ maxInstances: 10 });

// Initialize Firebase Admin
admin.initializeApp();

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Modern approach using .env file
});

// Rate limiting store (in production, use Firestore)
const userRequestCounts = new Map();

// Rate limiting function
const checkRateLimit = (userId) => {
  const now = Date.now();
  const hourInMs = 60 * 60 * 1000;
  const dayInMs = 24 * hourInMs;
  
  if (!userRequestCounts.has(userId)) {
    userRequestCounts.set(userId, { hourly: [], daily: [] });
  }
  
  const userCounts = userRequestCounts.get(userId);
  
  // Clean old entries
  userCounts.hourly = userCounts.hourly.filter(time => now - time < hourInMs);
  userCounts.daily = userCounts.daily.filter(time => now - time < dayInMs);
  
  // Check limits
  if (userCounts.hourly.length >= 20) {
    throw new Error('Rate limit exceeded: 20 requests per hour');
  }
  if (userCounts.daily.length >= 100) {
    throw new Error('Rate limit exceeded: 100 requests per day');
  }
  
  // Add current request
  userCounts.hourly.push(now);
  userCounts.daily.push(now);
};

// Verify JWT token (you'll need to adapt this to your auth system)
const verifyAuth = async (authHeader) => {
  if (!authHeader) {
    console.error('Auth Error: No authorization header provided');
    throw new Error('No authorization header');
  }
  
  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    console.error('Auth Error: No token provided in header');
    throw new Error('No token provided');
  }
  
  try {
    // If using Firebase Auth, uncomment this:
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // return decodedToken;
    
    // Flexible authentication - handle different token formats
    console.log('Attempting to decode token...');
    
    // Try JWT format first
    if (token.includes('.')) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const decoded = JSON.parse(atob(parts[1]));
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          throw new Error('Token expired');
        }
        const user = { uid: decoded.userId || decoded.sub || decoded.id || 'jwt_user' };
        console.log('JWT token decoded successfully for user:', user.uid);
        return user;
      }
    }
    
    // For non-JWT tokens, create a user ID based on token hash
    const userHash = token.substring(0, 8); // Use first 8 chars as user identifier
    const user = { uid: `user_${userHash}` };
    console.log('Token accepted for user:', user.uid);
    return user;
    
  } catch (error) {
    console.error('Auth Error:', error.message);
    // Fallback: allow with anonymous user for testing
    console.log('Using fallback anonymous user');
    return { uid: 'anonymous_user' };
  }
};

/**
 * OpenAI Chat Completion Proxy
 * POST /openai-chat-completion
 */
exports.openaiChatCompletion = onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      // Only allow POST requests
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      // Verify authentication
      const user = await verifyAuth(req.headers.authorization);
      
      // Check rate limiting
      checkRateLimit(user.uid);

      // Get request body and filter allowed parameters
      const { model, messages, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, stream } = req.body;
      
      // Create clean request body with only supported OpenAI parameters
      const gptBody = {
        model: model || 'gpt-3.5-turbo',
        messages,
        ...(temperature !== undefined && { temperature }),
        ...(max_tokens !== undefined && { max_tokens }),
        ...(top_p !== undefined && { top_p }),
        ...(frequency_penalty !== undefined && { frequency_penalty }),
        ...(presence_penalty !== undefined && { presence_penalty }),
        ...(stream !== undefined && { stream }),
        user: user.uid // Add user tracking for OpenAI
      };

      // Log request for monitoring
      console.log(`OpenAI Chat request from user: ${user.uid}`, {
        model: gptBody.model,
        messageCount: gptBody.messages?.length,
        timestamp: new Date().toISOString()
      });

      // Call OpenAI API
      const completion = await openai.chat.completions.create(gptBody);

      // Log usage
      console.log(`OpenAI tokens used: ${completion.usage?.total_tokens} for user: ${user.uid}`);

      // Return response in expected format
      res.json({
        choices: completion.choices,
        usage: completion.usage,
        id: completion.id,
        created: completion.created,
        model: completion.model
      });

    } catch (error) {
      console.error('OpenAI Chat Completion Error:', error);
      
      // Return user-friendly error messages
      if (error.message.includes('Rate limit')) {
        return res.status(429).json({ 
          error: 'Too many AI requests. Please wait before trying again.',
          retryAfter: '1 hour'
        });
      }
      
      if (error.message.includes('Authentication') || error.message.includes('Token')) {
        return res.status(401).json({ 
          error: 'Please log in again to use AI features.' 
        });
      }

      // Generic error for other issues
      res.status(500).json({ 
        error: 'AI assessment service is temporarily unavailable. Please try again later.' 
      });
    }
  });
});

/**
 * OpenAI Audio Transcription Proxy  
 * POST /openai-audio-transcription
 */
exports.openaiAudioTranscription = onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      // Only allow POST requests
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      // Verify authentication
      const user = await verifyAuth(req.headers.authorization);
      
      // Check rate limiting
      checkRateLimit(user.uid);

      // Get audio file from multipart form data
      if (!req.body || !req.body.file) {
        return res.status(400).json({ error: 'No audio file provided' });
      }

      // Log request
      console.log(`OpenAI Transcription request from user: ${user.uid}`);

      // Call OpenAI Whisper API
      const transcription = await openai.audio.transcriptions.create({
        file: req.body.file,
        model: 'whisper-1',
        response_format: 'json'
      });

      // Log usage
      console.log(`OpenAI transcription completed for user: ${user.uid}`);

      res.json(transcription);

    } catch (error) {
      console.error('OpenAI Transcription Error:', error);
      
      if (error.message.includes('Rate limit')) {
        return res.status(429).json({ 
          error: 'Too many AI requests. Please wait before trying again.' 
        });
      }
      
      if (error.message.includes('Authentication')) {
        return res.status(401).json({ 
          error: 'Please log in again to use AI features.' 
        });
      }

      res.status(500).json({ 
        error: 'Audio transcription service is temporarily unavailable.' 
      });
    }
  });
});

/**
 * Health check endpoint
 */
exports.openaiHealthCheck = onRequest((req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'StudyStreak OpenAI Proxy'
  });
});