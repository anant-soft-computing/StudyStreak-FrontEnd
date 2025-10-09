/**
 * ENHANCED TEMPORARY SECURE OPENAI SERVICE
 * Immediate solution with multiple security layers
 * Use until backend proxy is implemented
 */

import { jwtDecode } from "jwt-decode";

// Get API key from environment
const getSecureKey = () => {
  const key = process.env.REACT_APP_OPENAI_TEMP_KEY;
  
  if (!key || key === 'ADD_YOUR_NEW_KEY_HERE') {
    console.error('OpenAI API key not found in environment variables');
    throw new Error('OpenAI API key not configured. Please check your .env file.');
  }
  
  if (!key.startsWith('sk-')) {
    console.error('Invalid OpenAI API key format');
    throw new Error('Invalid OpenAI API key format.');
  }
  
  return key;
};

class EnhancedSecureOpenAI {
  constructor() {
    this.userSessions = new Map();
    this.maxRequestsPerHour = 15; // Reduced for safety
    this.maxRequestsPerDay = 50;   // Reduced for safety
  }

  validateUser() {
    const authData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!authData?.accessToken) {
      throw new Error("Authentication required for AI features");
    }

    try {
      const decoded = jwtDecode(authData.accessToken);
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Session expired. Please log in again");
      }
    } catch (e) {
      throw new Error("Invalid session. Please log in again");
    }

    return authData;
  }

  checkRateLimit(userId) {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * 60 * 60 * 1000;

    if (!this.userSessions.has(userId)) {
      this.userSessions.set(userId, {
        requests: [],
        dailyCount: 0,
        lastDayReset: now
      });
    }

    const session = this.userSessions.get(userId);

    // Reset daily counter
    if (now - session.lastDayReset > oneDay) {
      session.dailyCount = 0;
      session.lastDayReset = now;
      session.requests = [];
    }

    // Clean old requests
    session.requests = session.requests.filter(time => now - time < oneHour);

    // Check limits
    if (session.requests.length >= this.maxRequestsPerHour) {
      throw new Error("Too many AI requests. Please wait before trying again.");
    }

    if (session.dailyCount >= this.maxRequestsPerDay) {
      throw new Error("Daily AI limit reached. Please try again tomorrow.");
    }

    // Record request
    session.requests.push(now);
    session.dailyCount++;
  }

  async secureOpenAICall(requestBody) {
    try {
      const authData = this.validateUser();
      this.checkRateLimit(authData.userId);

      // Get and validate API key
      const apiKey = getSecureKey();
      console.log('API Key available:', apiKey ? 'Yes' : 'No');
      console.log('API Key starts with sk-:', apiKey?.startsWith('sk-') ? 'Yes' : 'No');

      const secureBody = {
        ...requestBody,
        user: authData.userId,
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "User-Agent": "StudyStreak-Secure/1.0",
        },
        body: JSON.stringify(secureBody),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("AI service is busy. Please try again later.");
        } else if (response.status === 401) {
          throw new Error("AI service authentication error.");
        } else {
          throw new Error("AI service temporarily unavailable.");
        }
      }

      return await response.json();

    } catch (error) {
      console.error("Secure OpenAI Error:", error);
      throw new Error(error.message || "AI service temporarily unavailable");
    }
  }
}

const secureManager = new EnhancedSecureOpenAI();

// Export the secure function
export const temporarySecureOpenAI = async (requestBody) => {
  return secureManager.secureOpenAICall(requestBody);
};

// Enhanced transcription service
export const temporarySecureTranscription = async (formData) => {
  try {
    const authData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!authData?.accessToken) {
      throw new Error("Authentication required");
    }

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getSecureKey()}`,
        "User-Agent": "StudyStreak-Secure/1.0",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Audio transcription service temporarily unavailable");
    }

    return await response.json();
  } catch (error) {
    console.error("Secure transcription error:", error);
    throw new Error("Audio transcription service is temporarily unavailable");
  }
};

// Rate limit checker for UI
export const checkCanMakeRequest = () => {
  try {
    const authData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!authData?.accessToken) return false;
    
    secureManager.checkRateLimit(authData.userId);
    return true;
  } catch {
    return false;
  }
};

// TEMPORARY SOLUTION WARNING:
// This still uses the API key on frontend (though with enhanced security)
// Replace with backend proxy as soon as possible for full security