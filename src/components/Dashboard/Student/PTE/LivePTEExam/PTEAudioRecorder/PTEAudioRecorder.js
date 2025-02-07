import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import DisplayAudio from "../../../../../UI/DisplayAudio";
import ajaxCall from "../../../../../../helpers/ajaxCall";

const PTEAudioRecorder = ({
  next,
  Flt,
  exam,
  user,
  practice,
  recorderIndex = 0,
  shouldStartRecording,
  question_number,
  setRecordedFilePath,
}) => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [recordingTimer, setRecordingTimer] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const chunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    setAudioBlob(null);
    setRecordedFilePath(null);
    setCountdown(null);
    setRecordingTimer(null);
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    resetTranscript();
  }, [next, resetTranscript, setRecordedFilePath]);

  useEffect(() => {
    if (shouldStartRecording) {
      if (exam.sub_category === "RA") {
        setCountdown(40);
      } else if (exam.sub_category === "RS") {
        setCountdown(3);
      } else if (exam.sub_category === "DI") {
        setCountdown(25);
      } else if (exam.sub_category === "RL") {
        setCountdown(86);
      } else {
        setCountdown(3);
      }
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            handleStartRecording();
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [exam.sub_category, shouldStartRecording]);

  const handleStartRecording = () => {
    resetTranscript();
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "audio/mp3" });
          setAudioBlob(blob);
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorderRef.current.start();
        SpeechRecognition.startListening({ continuous: true });

        // Set Recording Timer
        if (exam.sub_category === "RA") {
          setRecordingTimer(40);
        } else if (exam.sub_category === "RS") {
          setRecordingTimer(15);
        } else if (exam.sub_category === "DI") {
          setRecordingTimer(40);
        } else if (exam.sub_category === "RL") {
          setRecordingTimer(40);
        } else {
          setRecordingTimer(10);
        }
        const timerInterval = setInterval(() => {
          setRecordingTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timerInterval);
              handleStopRecording();
              return null;
            }
            return prev - 1;
          });
        }, 1000);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecordingTimer(null);
    SpeechRecognition.stopListening();
  };

  useEffect(() => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append("question_number", question_number);
      formData.append("extension", "mp3");
      formData.append("answer_audio", audioBlob, "output.mp3");
      formData.append("user", user);
      formData.append("speaking_block", exam?.id);
      formData.append("practise_test", practice ? practice : "");
      formData.append("Flt", Flt ? Flt : "");

      const question = exam?.questions
        ?.find((q) => q.question_number === question_number)
        ?.question.replace(/<\/?[^>]+(>|$)/g, "");

      const gptBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Analyze the following PTE Speaking response based on the task type and provide a detailed evaluation using these criteria:
  
              **Content (0-5 points):**
                - 5 Points: The response is accurate, complete, and fully addresses the task.
                - 4 Points: The response is mostly accurate and addresses the task but may have minor omissions.
                - 3 Points: The response is partially accurate but has significant omissions or inaccuracies.
                - 2 Points: The response is largely inaccurate or irrelevant.
                - 1 Point: The response is minimal and does not address the task.
                - 0 Points: No response or completely irrelevant.
  
              **Pronunciation (0-5 points):**
                - 5 Points: Native-like pronunciation, easily understandable.
                - 4 Points: Slight accent but clear and understandable.
                - 3 Points: Noticeable accent or minor mispronunciations but understandable.
                - 2 Points: Frequently unclear and difficult to understand.
                - 1 Point: Rarely understandable.
                - 0 Points: Not understandable.
  
              **Oral Fluency (0-5 points):**
                - 5 Points: Smooth delivery, natural pace, no hesitations.
                - 4 Points: Minor hesitations or unnatural intonation.
                - 3 Points: Noticeable hesitations or uneven flow.
                - 2 Points: Frequent pauses, stuttering, or halting speech.
                - 1 Point: Speech is very disjointed and difficult to follow.
                - 0 Points: No attempt or incomprehensible delivery.
  
              Provide scores on a scale of 15 points, broken down as follows:
                - Content: 0-5 points
                - Pronunciation: 0-5 points
                - Oral Fluency: 0-5 points
  
              Please provide the assessment in the following format:
  
              #Detailed_Analysis:
  
              Content:
              [Detailed analysis with specific examples from the response]
              Score: X/5
  
              Pronunciation:
              [Detailed analysis with specific examples from the response]
              Score: X/5
  
              Oral Fluency:
              [Detailed analysis with specific examples from the response]
              Score: X/5
  
              #Overall_Score: [Total]/15
  
              Respond only with the evaluation up to the #Overall_Score. Do not include any additional text or explanation beyond this point.`,
          },
          {
            role: "user",
            content: `Task Type: ${exam.sub_category}`, // e.g., "Read Aloud", "Repeat Sentence", "Describe Image", "Answer Short Question", "Re-tell Lecture"
          },
          {
            role: "user",
            content: `Question: ${question}`,
          },
          {
            role: "user",
            content: `Candidate's Response: ${transcript}`,
          },
        ],
      };

      const getChatGPTResponse = async () => {
        try {
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

          if (!gptResponse.ok) {
            throw new Error("error");
          }

          const data = await gptResponse.json();
          const assessment = data.choices[0].message.content;

          const scoreMatch = assessment.match(/Overall_Score:\s*(\d+)/);
          const overallScore = scoreMatch ? parseFloat(scoreMatch[1]) : null;

          const formattedResponse = assessment
            .split("\n")
            .map((line) => `<p>${line}</p>`)
            .join("");

          formData.append("AI_Assessment", `<div>${formattedResponse}</div>`);
          formData.append("band", overallScore);

          ajaxCall(
            "/speaking-answers/",
            {
              method: "POST",
              body: formData,
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${
                  JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
                }`,
              },
            },
            8000
          )
            .then((response) => {
              if (response.status === 201) {
                setRecordedFilePath({
                  recorderIndex,
                  filePath: response?.data?.answer_audio,
                });
              } else {
                console.log("error in submission response:", response);
              }
            })
            .catch((error) => {
              console.log("error submitting data:", error);
            });
        } catch (error) {
          console.log("error occurred while fetching data from AI:", error);
        }
      };
      getChatGPTResponse();
    }
  }, [audioBlob]);

  return (
    <div>
      <h6 className="text-center">Recorded Answer</h6>
      {countdown && <div>Recording : Beginning in {countdown} seconds</div>}
      {recordingTimer && (
        <div style={{ color: recordingTimer <= 5 ? "red" : "inherit" }}>
          Recording Time Left : {recordingTimer}s
        </div>
      )}
      {audioBlob && <DisplayAudio audioBlob={audioBlob} />}
    </div>
  );
};

export default PTEAudioRecorder;
