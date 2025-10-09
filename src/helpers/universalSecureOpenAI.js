/**
 * UNIVERSAL OPENAI REPLACEMENT HELPER
 * This replaces ALL OpenAI calls with secure versions
 * Works with existing code patterns without major changes
 */

// Enhanced secure wrapper that maintains backward compatibility
export const secureOpenAIFetch = async (url, options = {}) => {
  try {
    // Validate user authentication
    const authData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!authData?.accessToken) {
      throw new Error("Please log in to use AI assessment features");
    }

    // Rate limiting check
    const userId = authData.userId;
    const rateLimitKey = `openai_requests_${userId}`;
    const now = Date.now();
    const hourAgo = now - (60 * 60 * 1000);
    
    // Get existing request times
    const requestTimes = JSON.parse(localStorage.getItem(rateLimitKey) || '[]');
    const recentRequests = requestTimes.filter(time => time > hourAgo);
    
    // Check rate limit (20 requests per hour)
    if (recentRequests.length >= 20) {
      throw new Error("Too many AI requests. Please wait before trying again.");
    }
    
    // Record this request
    recentRequests.push(now);
    localStorage.setItem(rateLimitKey, JSON.stringify(recentRequests));

    // Get API key from environment
    const apiKey = process.env.REACT_APP_OPEN_AI_SECRET || process.env.REACT_APP_OPENAI_TEMP_KEY;
    
    if (!apiKey || !apiKey.startsWith('sk-')) {
      throw new Error("OpenAI API key not configured properly");
    }

    // Enhanced headers with authentication
    const enhancedOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'StudyStreak-Secure/1.0',
        'X-Request-ID': `SS-${now}-${Math.random().toString(36).substr(2, 9)}`,
      }
    };

    // If this is a chat completion, add user tracking
    if (url.includes('chat/completions') && options.body) {
      try {
        const body = JSON.parse(options.body);
        body.user = userId; // OpenAI user tracking
        enhancedOptions.body = JSON.stringify(body);
      } catch (e) {
        // If body parsing fails, continue with original
      }
    }

    const response = await fetch(url, enhancedOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 401) {
        throw new Error("AI service authentication error. Please check your API key.");
      } else if (response.status === 429) {
        throw new Error("AI service is busy. Please try again in a few minutes.");
      } else if (response.status === 400) {
        throw new Error("Invalid request to AI service. Please try again.");
      } else {
        throw new Error("AI service temporarily unavailable.");
      }
    }

    const data = await response.json();
    
    // Log usage for monitoring
    if (data.usage) {
      console.log(`OpenAI tokens used: ${data.usage.total_tokens} for user ${userId}`);
    }

    return {
      ok: true,
      json: async () => data,
      status: response.status,
      statusText: response.statusText
    };

  } catch (error) {
    console.error("Secure OpenAI call failed:", error);
    
    // Return a response-like object for compatibility
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: async () => ({
        error: {
          message: error.message,
          type: "service_error"
        }
      })
    };
  }
};

// Drop-in replacement for fetch calls to OpenAI
export const secureFetch = (url, options) => {
  if (url.includes('openai.com') || url.includes('api.openai.com')) {
    return secureOpenAIFetch(url, options);
  }
  
  // For non-OpenAI calls, use regular fetch
  return fetch(url, options);
};

// Make it available globally for easy replacement
if (typeof window !== 'undefined') {
  window.secureFetch = secureFetch;
}

export default secureFetch;