import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ProgressBar } from "react-bootstrap";
import ajaxCall from "../../../../../../../helpers/ajaxCall";
import DisplayAudio from "../../../../../../UI/DisplayAudio";

const DIRecorder = ({
  setRecordedFilePath,
  next,
  exam,
  question_number,
  user,
  recorderIndex = 0,
  practice,
  Flt,
  preparationTimer,
  shouldStartRecording,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [recordingTimer, setRecordingTimer] = useState(40);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    setIsRecording(false);
    setAudioBlob(null);
    setRecordedFilePath(null);
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    resetTranscript();
    setRecordingTimer(40);
  }, [next, resetTranscript, setRecordedFilePath]);

  useEffect(() => {
    if (shouldStartRecording && !isRecording && !audioBlob) {
      handleStartRecording();
    }
  }, [shouldStartRecording]);

  useEffect(() => {
    let interval;
    if (isRecording && recordingTimer > 0) {
      interval = setInterval(() => {
        setRecordingTimer((prev) => prev - 1);
      }, 1000);
    } else if (recordingTimer === 0 && isRecording) {
      handleStopRecording();
    }
    return () => clearInterval(interval);
  }, [isRecording, recordingTimer]);

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
          // Stop all tracks in the stream
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        SpeechRecognition.startListening({ continuous: true });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleStopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
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
            content: `Analyze the following PTE Speaking: Describe Image response using these criteria:
        
                **Content (0–5 points):**
                    - 5 Points: Includes all key points and relationships; the description is accurate, logical, and complete.
                    - 4 Points: Includes most key points but misses some minor details or relationships.
                    - 3 Points: Includes some key points but misses important details or relationships.
                    - 2 Points: Mentions a few details but lacks coherence or misses most key points.
                    - 1 Point: Mentions only one or two aspects of the image, with no meaningful description.
                    - 0 Points: No meaningful attempt or description is entirely unrelated to the image.
        
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
      <div>
        {!isRecording && !audioBlob && (
          <div>Beginning in {preparationTimer} seconds</div>
        )}
        {isRecording && (
          <div>
            Recording Time Left : {recordingTimer}s
            <ProgressBar
              striped
              animated
              className="mt-2"
              now={((40 - recordingTimer) / 40) * 100}
              variant={recordingTimer <= 10 ? "danger" : "success"}
            />
          </div>
        )}
        {audioBlob && <DisplayAudio audioBlob={audioBlob} />}
      </div>
    </div>
  );
};

export default DIRecorder;
