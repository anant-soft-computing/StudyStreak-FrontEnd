import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ProgressBar, Spinner } from "react-bootstrap";
import ajaxCall from "../../../../../../../helpers/ajaxCall";
import DisplayAudio from "../../../../../../UI/DisplayAudio";

const RSRecorder = ({
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
  const [status, setStatus] = useState("idle");

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    setAudioBlob(null);
    setRecordedFilePath(null);
    setCountdown(null);
    setRecordingTimer(null);
    setStatus("idle");
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    resetTranscript();
  }, [next, resetTranscript, setRecordedFilePath]);

  useEffect(() => {
    if (shouldStartRecording && status === "idle") {
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
  }, [shouldStartRecording, status]);

  const handleStartRecording = () => {
    setStatus("recording");
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

        // Set 15-second recording timer
        setRecordingTimer(15);
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
        setStatus("idle");
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecordingTimer(null);
    SpeechRecognition.stopListening();
    setStatus("processing");
  };

  useEffect(() => {
    if (audioBlob && status === "processing") {
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
            content: `Analyze the following PTE Speaking: Repeat Sentence response using these criteria:
        
                **Content (0-3 points):**
                  - 3 Points: All words in the sentence are repeated correctly in the correct order.
                  - 2 Points: More than 50% of the words are repeated correctly, and the meaning is preserved.
                  - 1 Point: Less than 50% of the words are repeated correctly, or the meaning is partially preserved.
                  - 0 Points: No correct words or no meaningful attempt.
        
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
                  1. Calculate subscore out of 13 (3 points for content and 5 points for pronunciation and oral fluency)
                  2. Calculate subscore percentage
                  3. Convert percentage to final score out of 90
        
                Please provide the assessment in the following format:
        
                #Detailed_Analysis:
        
                Content:
                [Detailed analysis with specific examples from the response]
                Score: X/3
        
                Pronunciation:
                [Detailed analysis with specific examples from the response]
                Score: X/5
        
                Oral Fluency:
                [Detailed analysis with specific examples from the response]
                Score: X/5
        
                #Subscore: X/13
                #Subscore Percentage: X%
          
                #Total Score: X/90
        
                Respond only with the evaluation up to the #Total Score. Do not include any additional text or explanation beyond this point.`,
          },
          {
            role: "user",
            content: `Original Sentence: ${question}`,
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

          const scoreMatch = assessment.match(/#Total Score:\s*(\d+)/);
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
                setStatus("completed");
              } else {
                console.log("error in submission response:", response);
                setStatus("completed");
              }
            })
            .catch((error) => {
              console.log("error submitting data:", error);
              setStatus("completed");
            });
        } catch (error) {
          console.log("error occurred while fetching data from AI:", error);
          setStatus("completed");
        }
      };
      getChatGPTResponse();
    }
  }, [audioBlob, status]);

  return (
    <div>
      <h6 className="text-center">Recorded Answer</h6>
      {countdown && <div>Recording : Beginning in {countdown} seconds</div>}
      {status === "recording" && (
        <div>
          <div>Recording Time Left: {recordingTimer}s</div>
          <ProgressBar
            striped
            animated
            className="mt-2"
            now={((15 - recordingTimer) / 15) * 100}
            variant={recordingTimer <= 7 ? "danger" : "success"}
          />
        </div>
      )}
      {status === "processing" && (
        <div className="text-center mt-3">
          <Spinner animation="border" role="status" variant="primary" />
          <p className="mt-2">Submitting recording...</p>
        </div>
      )}
      {status === "completed" && (
        <div className="text-center text-success mt-2">
          Recording submitted successfully!
        </div>
      )}
      {audioBlob && status === "completed" && (
        <div className="mt-3">
          <DisplayAudio audioBlob={audioBlob} />
        </div>
      )}
    </div>
  );
};

export default RSRecorder;
