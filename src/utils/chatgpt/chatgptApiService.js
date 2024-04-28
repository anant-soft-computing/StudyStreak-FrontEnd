export const speakingApiService = async (formData) => {
  try {
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_SECRET}`,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error occurred:", error);
    throw error; // re-throw the error for the caller to handle
  }
};

export const writingApiService = async (questions, answer) => {
  try {
    const gptBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Analyse The Package For IELTS Writing Task With Following Criteria TASK RESPONSE, COHERENCE AND COHESION, LEXICAL RESOURCE AND Grammatical Range and Accuracy and Give IELTS Bands To The Task",
        },
        {
          role: "user",
          content: `Questions: ${questions}`,
        },
        {
          role: "user",
          content: `Answers: ${answer} `,
        },
        {
          role: "user",
          content:
            "Give band explanation as #Explanation: exaplanationValue  and band as #Band:bandValue",
        },
      ],
    };
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_SECRET}`,
      },
      body: JSON.stringify(gptBody),
    });
    return await res.json();
  } catch (error) {
    console.error("Error occurred:", error);
    throw error; // re-throw the error for the caller to handle
  }
};
