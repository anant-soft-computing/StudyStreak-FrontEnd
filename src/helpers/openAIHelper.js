import ajaxCall from "./ajaxCall";

/**
 * Secure OpenAI API helper function
 * This replaces direct calls to OpenAI API with calls to your secure backend proxy
 */

const openAICall = async (messages, model = "gpt-3.5-turbo", temperature = 0.7, maxTokens = null) => {
  try {
    const requestBody = {
      model,
      messages,
      temperature,
      ...(maxTokens && { max_tokens: maxTokens })
    };

    // Call your secure backend proxy instead of OpenAI directly
    const response = await ajaxCall("/openai/chat-completion/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (response.isError) {
      throw new Error(response.data?.error || "OpenAI API call failed");
    }

    return response.data;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
};

/**
 * Helper function for PTE Speaking assessments
 */
export const assessSpeakingResponse = async (
  transcript,
  audioTranscript,
  taskType = "general"
) => {
  const assessmentPrompts = {
    general: `Analyze the following PTE Speaking response using these criteria:
    
    **Content (0–5 points):**
        - 5 Points: Addresses the prompt completely and accurately with relevant content.
        - 4 Points: Addresses most aspects of the prompt with mostly relevant content.
        - 3 Points: Addresses some aspects but misses important elements or includes irrelevant content.
        - 2 Points: Limited response to the prompt with significant irrelevant content.
        - 1 Point: Minimal attempt with little relevant content.
        - 0 Points: No meaningful attempt or completely irrelevant.
    
    **Pronunciation (0–5 points):**
        - 5 Points: Native-like pronunciation, easily understood.
        - 4 Points: Slight accent but clear and understandable.
        - 3 Points: Noticeable accent or mispronunciations but understandable.
        - 2 Points: Frequently unclear and difficult to understand.
        - 1 Point: Rarely understandable.
        - 0 Points: Not understandable.
    
    **Oral Fluency (0–5 points):**
        - 5 Points: Natural pace, smooth flow, no hesitations.
        - 4 Points: Minor hesitations or unnatural intonation.
        - 3 Points: Noticeable hesitations or uneven flow.
        - 2 Points: Frequent pauses, stuttering, or halting speech.
        - 1 Point: Speech is very disjointed and difficult to follow.
        - 0 Points: No attempt or incomprehensible delivery.
    
    Please provide the assessment in the following format:
    
    #Detailed_Analysis:
    
    Content:
    [Detailed analysis]
    Score: X/5
    
    Pronunciation:
    [Detailed analysis]
    Score: X/5
    
    Oral Fluency:
    [Detailed analysis]
    Score: X/5
    
    #Subscore: X/15
    #Subscore Percentage: X%
    #Total Score: X/90`,

    readAloud: `Analyze this PTE Read Aloud response for pronunciation and fluency...`,
    repeatSentence: `Analyze this PTE Repeat Sentence response...`,
    describeImage: `Analyze this PTE Describe Image response...`,
    retellLecture: `Analyze this PTE Retell Lecture response...`,
    answerShortQuestion: `Analyze this PTE Answer Short Question response...`,
    summarizeGroupDiscussion: `Analyze this PTE Summarize Group Discussion response...`,
  };

  const messages = [
    {
      role: "user",
      content: assessmentPrompts[taskType] || assessmentPrompts.general,
    },
    {
      role: "user",
      content: `Audio Transcript: ${audioTranscript}
      Student Response: ${transcript}`,
    },
  ];

  return await openAICall(messages, "gpt-3.5-turbo", 0.3);
};

/**
 * Helper function for PTE Writing assessments
 */
export const assessWritingResponse = async (essayText, taskType = "general") => {
  const writingPrompts = {
    general: `Analyze the following PTE Writing response using these criteria:
    
    **Content (0–3 points):**
        - 3 Points: Addresses the topic fully with relevant ideas and examples.
        - 2 Points: Addresses the topic with some relevant ideas.
        - 1 Point: Limited addressing of the topic.
        - 0 Points: Does not address the topic.
    
    **Development, Structure and Coherence (0–2 points):**
        - 2 Points: Well-organized with clear structure and logical flow.
        - 1 Point: Generally organized but may lack some clarity.
        - 0 Points: Poorly organized or unclear structure.
    
    **Form (0–2 points):**
        - 2 Points: Meets word count and format requirements.
        - 1 Point: Minor issues with word count or format.
        - 0 Points: Significant issues with word count or format.
    
    **General Linguistic Range (0–2 points):**
        - 2 Points: Wide range of vocabulary and structures.
        - 1 Point: Good range with some variety.
        - 0 Points: Limited range.
    
    **Grammar Usage and Mechanics (0–2 points):**
        - 2 Points: Accurate grammar with few errors.
        - 1 Point: Generally accurate with some errors.
        - 0 Points: Frequent errors affecting meaning.
    
    **Vocabulary Range (0–2 points):**
        - 2 Points: Precise and varied vocabulary.
        - 1 Point: Good vocabulary with some precision.
        - 0 Points: Limited or imprecise vocabulary.
    
    **Spelling (0–2 points):**
        - 2 Points: Accurate spelling throughout.
        - 1 Point: Few spelling errors.
        - 0 Points: Frequent spelling errors.
    
    Please provide the assessment in the following format:
    
    #Detailed_Analysis:
    
    Content: [Analysis] Score: X/3
    Development, Structure and Coherence: [Analysis] Score: X/2
    Form: [Analysis] Score: X/2
    General Linguistic Range: [Analysis] Score: X/2
    Grammar Usage and Mechanics: [Analysis] Score: X/2
    Vocabulary Range: [Analysis] Score: X/2
    Spelling: [Analysis] Score: X/2
    
    #Subscore: X/15
    #Subscore Percentage: X%
    #Total Score: X/90`,
  };

  const messages = [
    {
      role: "user",
      content: writingPrompts[taskType] || writingPrompts.general,
    },
    {
      role: "user",
      content: `Essay Text: ${essayText}`,
    },
  ];

  return await openAICall(messages, "gpt-3.5-turbo", 0.3);
};

export default openAICall;