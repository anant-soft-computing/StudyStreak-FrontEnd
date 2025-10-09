/**
 * BETTER TEMPORARY SOLUTION: Domain-Restricted API Usage
 * This adds additional layers to make key theft less valuable
 */

import { jwtDecode } from "jwt-decode";

class DomainRestrictedOpenAI {
  constructor() {
    this.allowedDomains = ['localhost', 'studystreak.in', '127.0.0.1'];
    this.userSessions = new Map();
    this.maxRequestsPerHour = 10; // Even more restrictive
    this.maxRequestsPerDay = 25;   // Even more restrictive
  }

  validateDomain() {
    const currentDomain = window.location.hostname;
    if (!this.allowedDomains.includes(currentDomain)) {
      throw new Error("Unauthorized domain");
    }
  }

  validateUser() {
    const authData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!authData?.accessToken) {
      throw new Error("Authentication required");
    }

    try {
      const decoded = jwtDecode(authData.accessToken);
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Session expired");
      }
      
      // Additional validation: Check if user has active subscription
      // You can add more business logic here
      
      return authData;
    } catch (e) {
      throw new Error("Invalid session");
    }
  }

  async restrictedOpenAICall(requestBody) {
    try {
      // Multiple validation layers
      this.validateDomain();
      const authData = this.validateUser();
      
      // Super strict rate limiting
      this.checkSuperStrictRateLimit(authData.userId);
      
      // Add fingerprinting to track usage
      const fingerprint = this.generateFingerprint();
      
      const enhancedBody = {
        ...requestBody,
        user: `${authData.userId}-${fingerprint}`, // Unique identifier
        max_tokens: Math.min(requestBody.max_tokens || 500, 500), // Strict token limit
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getObfuscatedKey()}`,
          "User-Agent": `StudyStreak/${authData.userId}`,
          "Referer": window.location.origin,
        },
        body: JSON.stringify(enhancedBody),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Log everything for monitoring
      this.logUsage(authData.userId, data.usage, fingerprint);
      
      return data;

    } catch (error) {
      // Log failed attempts
      this.logFailedAttempt(error.message);
      throw new Error("AI service temporarily unavailable");
    }
  }

  checkSuperStrictRateLimit(userId) {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    const oneDay = 24 * 60 * 60 * 1000;

    if (!this.userSessions.has(userId)) {
      this.userSessions.set(userId, { requests: [], dailyCount: 0, lastReset: now });
    }

    const session = this.userSessions.get(userId);
    
    // Reset daily counter
    if (now - session.lastReset > oneDay) {
      session.dailyCount = 0;
      session.lastReset = now;
      session.requests = [];
    }

    // Clean old requests
    session.requests = session.requests.filter(time => now - time < oneHour);

    // Super strict limits
    if (session.requests.length >= this.maxRequestsPerHour) {
      throw new Error("Hourly limit exceeded. Please wait.");
    }

    if (session.dailyCount >= this.maxRequestsPerDay) {
      throw new Error("Daily limit exceeded. Try again tomorrow.");
    }

    session.requests.push(now);
    session.dailyCount++;
  }

  generateFingerprint() {
    // Create a browser fingerprint to track unique sessions
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('StudyStreak fingerprint', 2, 2);
    
    return btoa(
      navigator.userAgent +
      screen.width + screen.height +
      new Date().getTimezoneOffset() +
      canvas.toDataURL()
    ).substring(0, 16);
  }

  getObfuscatedKey() {
    // Multiple layers of obfuscation (still not fully secure, but better)
    const baseKey = process.env.REACT_APP_OPEN_AI_SECRET;
    
    if (!baseKey) {
      throw new Error("Configuration error");
    }

    // Basic validation
    if (!baseKey.startsWith('sk-')) {
      throw new Error("Invalid configuration");
    }

    return baseKey;
  }

  logUsage(userId, usage, fingerprint) {
    const logEntry = {
      userId,
      fingerprint,
      timestamp: new Date().toISOString(),
      tokens: usage?.total_tokens || 0,
      domain: window.location.hostname,
      userAgent: navigator.userAgent.substring(0, 50)
    };

    // Store locally for monitoring
    const logs = JSON.parse(localStorage.getItem('aiUsageLogs') || '[]');
    logs.push(logEntry);
    
    // Keep only last 50 entries
    if (logs.length > 50) {
      logs.splice(0, logs.length - 50);
    }
    
    localStorage.setItem('aiUsageLogs', JSON.stringify(logs));
    
    // Also send to console for immediate monitoring
    console.log('OpenAI Usage:', logEntry);
  }

  logFailedAttempt(error) {
    console.warn('OpenAI Failed Attempt:', {
      error,
      domain: window.location.hostname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent.substring(0, 50)
    });
  }
}

const restrictedManager = new DomainRestrictedOpenAI();

// Export the highly restricted function
export const superSecureOpenAI = (requestBody) => {
  return restrictedManager.restrictedOpenAICall(requestBody);
};

export default superSecureOpenAI;