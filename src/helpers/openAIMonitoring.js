/**
 * OPENAI USAGE MONITORING & ALERTS
 * Sets up real-time monitoring to detect unauthorized usage
 */

// Set up OpenAI usage monitoring
export const setupOpenAIMonitoring = () => {
  
  // Monitor API key usage every 5 minutes
  setInterval(async () => {
    try {
      // Check OpenAI usage via their API
      const response = await fetch('https://api.openai.com/v1/usage', {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPEN_AI_SECRET}`,
        }
      });
      
      if (response.ok) {
        const usage = await response.json();
        
        // Check for unusual spikes
        const currentHourUsage = getCurrentHourUsage(usage);
        const expectedUsage = getExpectedUsage(); // Based on your app's normal usage
        
        if (currentHourUsage > expectedUsage * 2) {
          // Alert about suspicious usage
          console.error('🚨 UNUSUAL OPENAI USAGE DETECTED!');
          
          // You could send this to your backend for alerts
          fetch('https://studystreak.in/api/security/alert/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'unusual_openai_usage',
              usage: currentHourUsage,
              expected: expectedUsage,
              timestamp: new Date().toISOString()
            })
          }).catch(console.error);
        }
      }
    } catch (error) {
      console.error('Usage monitoring error:', error);
    }
  }, 5 * 60 * 1000); // Every 5 minutes
};

const getCurrentHourUsage = (usage) => {
  // Parse OpenAI usage data for current hour
  // This would need to be implemented based on OpenAI's usage API response
  return 0;
};

const getExpectedUsage = () => {
  // Return expected usage based on your app's patterns
  // You could calculate this based on number of active users
  return 100; // tokens per hour
};

// Set up alerts for key theft
export const setupKeyTheftDetection = () => {
  
  // Monitor for requests from unauthorized domains
  const originalFetch = window.fetch;
  
  window.fetch = function(...args) {
    const [url, options] = args;
    
    if (url.includes('openai.com') && options?.headers?.Authorization) {
      // Log all OpenAI requests
      console.log('OpenAI Request:', {
        url,
        domain: window.location.hostname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      });
      
      // Check if request is from authorized domain
      const authorizedDomains = ['localhost', 'studystreak.in', '127.0.0.1'];
      
      if (!authorizedDomains.includes(window.location.hostname)) {
        console.error('🚨 UNAUTHORIZED DOMAIN DETECTED!');
        
        // Block the request
        return Promise.reject(new Error('Unauthorized domain'));
      }
    }
    
    return originalFetch.apply(this, args);
  };
};

// Initialize monitoring
if (typeof window !== 'undefined') {
  setupKeyTheftDetection();
  setupOpenAIMonitoring();
}