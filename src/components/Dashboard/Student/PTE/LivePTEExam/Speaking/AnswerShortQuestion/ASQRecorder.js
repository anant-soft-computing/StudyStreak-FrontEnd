import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ProgressBar } from "react-bootstrap";
import ajaxCall from "../../../../../../../helpers/ajaxCall";
import DisplayAudio from "../../../../../../UI/DisplayAudio";

const ASQRecorder = ({
  setRecordedFilePath,
  next,
  exam,
  question_number,
  user,
  recorderIndex = 0,
  practice,
  Flt,
  shouldStartRecording,
}) => {
  const [audioBlob, setAudioBlob] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [countdown, setCountdown] = useState(null);
  const [recordingTimer, setRecordingTimer] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

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
      setCountdown(3);
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
  }, [shouldStartRecording]);

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

        // Set 10-second recording timer
        setRecordingTimer(10);
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
            content: `Analyze the following PTE Speaking: Answer Short Questions response using these criteria:
  
              **Content (0-1 point):**
                - 1 Point: The response is correct and relevant to the question.
                - 0 Points: The response is incorrect, irrelevant, or there is no response.
  
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
  
              Scoring Calculation:
                  1. Calculate subscore out of 11 (1 points for content and 5 points for pronunciation and oral fluency)
                  2. Calculate subscore percentage
                  3. Convert percentage to final score out of 90
  
              Please provide the assessment in the following format:
  
              #Detailed_Analysis:
  
              Content:
              [Detailed analysis with specific examples from the response]
              Score: X/1
  
              Pronunciation:
              [Detailed analysis with specific examples from the response]
              Score: X/5
  
              Oral Fluency:
              [Detailed analysis with specific examples from the response]
              Score: X/5
  
              #Subscore: X/11
              #Subscore Percentage: X%
  
              #Total Score: X/90
  
              Respond only with the evaluation up to the #Total Score. Do not include any additional text or explanation beyond this point.`,
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

          const scoreMatch = assessment.match(/Total Score:\s*(\d+)/);
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
      {recordingTimer && (
        <ProgressBar
          striped
          animated
          className="mt-2"
          now={((10 - recordingTimer) / 10) * 100}
          variant={recordingTimer <= 5 ? "danger" : "success"}
        />
      )}
      {audioBlob && <DisplayAudio audioBlob={audioBlob} />}
    </div>
  );
};

export default ASQRecorder;
