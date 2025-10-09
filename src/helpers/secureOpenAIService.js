/**
 * SECURE OPENAI PROXY SERVICE
 * This file provides secure alternatives to direct OpenAI API calls
 * All API keys are kept safely on the backend
 */

import ajaxCall from "./ajaxCall";

/**
 * Secure OpenAI Chat Completion Service
 * Replaces direct calls to https://api.openai.com/v1/chat/completions
 */
export const secureOpenAIChatCompletion = async (gptBody) => {
  try {
    const authData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!authData?.accessToken) {
      throw new Error("Authentication required for AI assessment");
    }

    // Add user tracking for security and rate limiting
    const secureRequestBody = {
      ...gptBody,
      user: authData.userId || "anonymous", // OpenAI supports user tracking
      metadata: {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        source: "StudyStreak-Frontend"
      }
    };

    const response = await ajaxCall("/ai/chat-completion/", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authData.accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(secureRequestBody),
    });

    if (response.status !== 200) {
      throw new Error(response.data?.error || "AI assessment service unavailable");
    }

    // Return in the same format as OpenAI API
    return {
      choices: [
        {
          message: {
            content: response.data.assessment || response.data.choices?.[0]?.message?.content
          }
        }
      ]
    };

  } catch (error) {
    console.error("Secure OpenAI Error:", error);
    
    // User-friendly error messages
    if (error.message.includes("Authentication")) {
      throw new Error("Please log in again to use AI assessment features");
    } else if (error.message.includes("rate limit")) {
      throw new Error("You've reached the assessment limit. Please try again later");
    } else {
      throw new Error("AI assessment service is temporarily unavailable. Please try again later");
    }
  }
};

/**
 * Secure Audio Transcription Service
 * Replaces direct calls to https://api.openai.com/v1/audio/transcriptions
 */
export const secureAudioTranscription = async (formData) => {
  try {
    const authData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!authData?.accessToken) {
      throw new Error("Authentication required for audio transcription");
    }

    const response = await fetch("https://studystreak.in/api/ai/audio-transcription/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Audio transcription service unavailable");
    }

    return await response.json();

  } catch (error) {
    console.error("Secure transcription error:", error);
    throw new Error("Audio transcription service is temporarily unavailable");
  }
};

/**
 * Rate Limiting Helper (Client-side protection)
 */
class AssessmentRateLimiter {
  constructor() {
    this.requests = JSON.parse(localStorage.getItem("assessmentRequests") || "[]");
    this.maxPerHour = 20;
    this.maxPerDay = 100;
  }

  canMakeRequest() {
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);
    const oneDayAgo = now - (24 * 60 * 60 * 1000);

    // Clean old requests
    this.requests = this.requests.filter(time => time > oneDayAgo);
    
    const recentRequests = this.requests.filter(time => time > oneHourAgo);
    
    if (recentRequests.length >= this.maxPerHour) {
      throw new Error("Too many assessment requests. Please wait before trying again.");
    }

    if (this.requests.length >= this.maxPerDay) {
      throw new Error("Daily assessment limit reached. Please try again tomorrow.");
    }

    // Record this request
    this.requests.push(now);
    localStorage.setItem("assessmentRequests", JSON.stringify(this.requests));
    
    return true;
  }
}

export const rateLimiter = new AssessmentRateLimiter();

/**
 * Enhanced Security Logger
 */
export const logSecurityEvent = (eventType, details) => {
  const logData = {
    timestamp: new Date().toISOString(),
    type: eventType,
    details,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  // Send to backend for security monitoring
  ajaxCall("/security/log/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logData)
  }).catch(console.error);
};

export default secureOpenAIChatCompletion;