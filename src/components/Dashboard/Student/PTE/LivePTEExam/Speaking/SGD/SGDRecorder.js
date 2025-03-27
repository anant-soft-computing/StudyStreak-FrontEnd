import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ProgressBar } from "react-bootstrap";
import DisplayAudio from "../../../../../../UI/DisplayAudio";
import ajaxCall from "../../../../../../../helpers/ajaxCall";

const SGDRecorder = ({
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
      setCountdown(90);
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

        // Set 120-second recording timer
        setRecordingTimer(120);
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

      const audioTranscript = exam?.questions
        ?.find((q) => q.question_number === question_number)
        ?.question.replace(/<\/?[^>]+(>|$)/g, "");

      const gptBody = {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Analyze the following PTE Speaking: Summarize Group Discussion response using these criteria:
            
            **Content (0–5 points):**
                - 5 Points: Summarizes all key points and main ideas from the discussion accurately and comprehensively.
                - 4 Points: Summarizes most key points but misses some minor details or nuances.
                - 3 Points: Summarizes some key points but misses important details or misinterprets some ideas.
                - 2 Points: Mentions a few points but lacks coherence or misses most key ideas.
                - 1 Point: Mentions only one or two aspects of the discussion, with no meaningful summary.
                - 0 Points: No meaningful attempt or summary is entirely unrelated to the discussion.
            
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
            
            Scoring Calculation:
                1. Calculate subscore out of 15 (5 points per category)
                2. Calculate subscore percentage
                3. Convert percentage to final score out of 90
            
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
            
            #Subscore: X/15
            #Subscore Percentage: X%
          
            #Total Score: X/90
            
            Respond only with the evaluation up to the #Total Score. Do not include any additional text or explanation beyond this point.`,
          },
          {
            role: "user",
            content: `Audio Transcript: ${audioTranscript}`,
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
      <div className="text-center">Recorded Answer</div>
      {countdown && <div>Recording : Beginning in {countdown} seconds</div>}
      {recordingTimer && `Recording Time Left : ${recordingTimer}s`}
      {recordingTimer && (
        <ProgressBar
          striped
          animated
          className="mt-2"
          now={((120 - recordingTimer) / 120) * 100}
          variant={recordingTimer <= 10 ? "danger" : "success"}
        />
      )}
      {audioBlob && <DisplayAudio audioBlob={audioBlob} />}
    </div>
  );
};

export default SGDRecorder;
