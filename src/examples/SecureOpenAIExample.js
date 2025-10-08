// Example: Updated SGDRecorder.js with secure OpenAI integration
// This shows how to replace the insecure OpenAI API call

// OLD CODE (INSECURE):
/*
const getChatGPTResponse = async () => {
  try {
    const gptResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_SECRET}`, // EXPOSED!
        },
        body: JSON.stringify(gptBody),
      }
    );

    if (!gptResponse.ok) {
      throw new Error("error");
    }

    const data = await gptResponse.json();
    const assessment = data.choices[0].message.content;
    // ... rest of the code
  } catch (error) {
    console.error("Error:", error);
  }
};
*/

// NEW CODE (SECURE):
import { assessSpeakingResponse } from "../../../../../../helpers/openAIHelper";

// Replace the getChatGPTResponse function with:
const getChatGPTResponse = async () => {
  try {
    const data = await assessSpeakingResponse(
      transcript,
      audioTranscript,
      "summarizeGroupDiscussion"
    );
    
    const assessment = data.choices[0].message.content;
    
    const scoreMatch = assessment.match(/#Total Score:\s*(\d+)/);
    const totalScore = scoreMatch ? parseInt(scoreMatch[1]) : 0;

    const subsScoreMatch = assessment.match(/#Subscore:\s*(\d+)/);
    const subScore = subsScoreMatch ? parseInt(subsScoreMatch[1]) : 0;

    const percentageMatch = assessment.match(/#Subscore Percentage:\s*(\d+)%/);
    const percentage = percentageMatch ? parseInt(percentageMatch[1]) : 0;

    // Set the scores
    setAiScore(totalScore);
    setAiOverallScore(subScore);
    setAssessment(assessment);

    // Continue with your existing logic...
  } catch (error) {
    console.error("Error getting ChatGPT response:", error);
    // Handle error appropriately
    setStatus("completed");
  }
};

// Alternative: If you want to keep the existing structure but make it secure:
const getChatGPTResponseSecure = async () => {
  try {
    // Use your existing backend proxy
    const gptResponse = await ajaxCall("/openai/chat-completion/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // No API key needed - handled securely on backend
      },
      body: JSON.stringify(gptBody),
    });

    if (gptResponse.isError) {
      throw new Error("Error from OpenAI proxy");
    }

    const assessment = gptResponse.data.choices[0].message.content;
    
    // Your existing score parsing logic...
    const scoreMatch = assessment.match(/#Total Score:\s*(\d+)/);
    const totalScore = scoreMatch ? parseInt(scoreMatch[1]) : 0;
    
    // Rest of your existing logic...
  } catch (error) {
    console.error("Error:", error);
  }
};