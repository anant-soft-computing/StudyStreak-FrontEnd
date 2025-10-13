export const speakingApiService = async (formData) => {
  try {
    const authData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!authData?.accessToken) {
      throw new Error("Authentication required");
    }

    // Call Firebase Cloud Functions for secure audio transcription
    const FIREBASE_FUNCTIONS_URL = 'https://us-central1-gazra-mitra.cloudfunctions.net';
    
    const res = await fetch(`${FIREBASE_FUNCTIONS_URL}/openaiAudioTranscription`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authData.accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Transcription service unavailable");

    return res.json();
  } catch (error) {
    console.log("Transcription error:", error);
    throw new Error("Audio transcription service is temporarily unavailable");
  }
};

export const writingApiService = async (questions, answer) => {
  try {
    const authData = JSON.parse(localStorage.getItem("loginInfo"));
    if (!authData?.accessToken) {
      throw new Error("Authentication required");
    }

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

    // Call Firebase Cloud Functions for secure OpenAI proxy
    const FIREBASE_FUNCTIONS_URL = 'https://us-central1-gazra-mitra.cloudfunctions.net';
    
    const res = await fetch(`${FIREBASE_FUNCTIONS_URL}/openaiChatCompletion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authData.accessToken}`,
      },
      body: JSON.stringify(gptBody),
    });

    if (!res.ok) {
      throw new Error("Writing assessment service unavailable");
    }

    return await res.json();
  } catch (error) {
    console.log("Writing assessment error:", error);
    throw new Error("Writing assessment service is temporarily unavailable");
  }
};
