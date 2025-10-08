// Quick Rate Limiting Addition (5-minute fix)
// Add this to your existing OpenAI calls without changing the structure

class QuickRateLimiter {
  constructor() {
    this.requests = [];
    this.maxPerHour = 50; // Adjust based on your needs
  }

  checkLimit() {
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;
    
    // Clean old requests
    this.requests = this.requests.filter(time => time > hourAgo);
    
    if (this.requests.length >= this.maxPerHour) {
      throw new Error("Too many requests. Please try again later.");
    }
    
    this.requests.push(now);
    return true;
  }
}

const rateLimiter = new QuickRateLimiter();

// In your existing OpenAI calls, just add this line before the fetch:
// rateLimiter.checkLimit(); // Add this single line

// Example - modify your existing SGDRecorder.js:
const getChatGPTResponse = async () => {
  try {
    rateLimiter.checkLimit(); // <-- ADD ONLY THIS LINE
    
    // Your existing code remains exactly the same:
    const gptResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_SECRET}`,
        },
        body: JSON.stringify(gptBody),
      }
    );
    // ... rest of your existing code unchanged
  } catch (error) {
    console.error("Error:", error);
  }
};