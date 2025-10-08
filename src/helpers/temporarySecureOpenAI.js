// Temporary Security Measures (INTERIM SOLUTION ONLY)
// This provides minimal protection while you implement the proper backend proxy

import { jwtDecode } from "jwt-decode";

// Rate limiting and usage tracking
class OpenAIRateLimiter {
  constructor() {
    this.userRequests = new Map();
    this.maxRequestsPerHour = 20; // Limit per user
    this.maxRequestsPerDay = 100; // Daily limit
  }

  canMakeRequest(userId) {
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;
    const dayAgo = now - 24 * 60 * 60 * 1000;

    if (!this.userRequests.has(userId)) {
      this.userRequests.set(userId, []);
    }

    const userReqs = this.userRequests.get(userId);
    
    // Clean old requests
    const recentReqs = userReqs.filter(time => time > dayAgo);
    this.userRequests.set(userId, recentReqs);

    const hourlyReqs = recentReqs.filter(time => time > hourAgo);

    if (hourlyReqs.length >= this.maxRequestsPerHour) {
      throw new Error("Rate limit exceeded: Too many requests in the last hour");
    }

    if (recentReqs.length >= this.maxRequestsPerDay) {
      throw new Error("Rate limit exceeded: Daily limit reached");
    }

    // Add current request
    recentReqs.push(now);
    return true;
  }
}

const rateLimiter = new OpenAIRateLimiter();

// Temporary secure wrapper (use only until backend proxy is ready)
export const temporarySecureOpenAI = async (requestBody, userToken) => {
  try {
    // Validate user authentication
    if (!userToken) {
      throw new Error("Authentication required");
    }

    const decodedToken = jwtDecode(userToken);
    const userId = decodedToken.userid;

    // Check if user has valid subscription/access
    // You should validate this against your backend
    const now = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < now) {
      throw new Error("Token expired");
    }

    // Rate limiting
    rateLimiter.canMakeRequest(userId);

    // Additional request validation
    if (!requestBody.messages || !Array.isArray(requestBody.messages)) {
      throw new Error("Invalid request format");
    }

    // Log usage for monitoring
    console.log(`OpenAI request from user ${userId} at ${new Date().toISOString()}`);

    // Make the API call with additional headers for monitoring
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_SECRET}`,
        "User-Agent": `StudyStreak-App-${userId}`, // For tracking
      },
      body: JSON.stringify({
        ...requestBody,
        max_tokens: Math.min(requestBody.max_tokens || 1000, 1000), // Limit tokens
        user: userId, // OpenAI user tracking
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Log token usage for cost monitoring
    if (data.usage) {
      console.log(`Tokens used: ${data.usage.total_tokens} for user ${userId}`);
    }

    return data;

  } catch (error) {
    console.error("Secure OpenAI call failed:", error);
    throw error;
  }
};

// Usage example:
// const result = await temporarySecureOpenAI(gptBody, authData.accessToken);

// IMPORTANT: This is still not fully secure as the API key is in the frontend.
// This is only a temporary measure to add some protection and monitoring.
// You MUST implement the backend proxy solution for proper security.