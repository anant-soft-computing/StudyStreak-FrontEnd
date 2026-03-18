import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ProgressBar, Spinner } from "react-bootstrap";
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
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [countdown, setCountdown] = useState(null);
  const [recordingTimer, setRecordingTimer] = useState(10);
  const [status, setStatus] = useState("idle");
  const [noSpeechDetected, setNoSpeechDetected] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const transcriptTimeoutRef = useRef(null);

  useEffect(() => {
    setIsRecording(false);
    setAudioBlob(null);
    setRecordedFilePath(null);
    setCountdown(null);
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    resetTranscript();
    setRecordingTimer(10);
    setStatus("idle");
    setNoSpeechDetected(false);
    if (transcriptTimeoutRef.current) {
      clearTimeout(transcriptTimeoutRef.current);
    }
  }, [next, resetTranscript, setRecordedFilePath]);

  // Auto-start recording when shouldStartRecording becomes true
  useEffect(() => {
    if (
      shouldStartRecording &&
      !isRecording &&
      !audioBlob &&
      status === "idle"
    ) {
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

  // Recording timer countdown
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

  // Check for transcript changes and set a timeout to check if speech was detected
  useEffect(() => {
    if (isRecording && transcript) {
      if (transcriptTimeoutRef.current) {
        clearTimeout(transcriptTimeoutRef.current);
        transcriptTimeoutRef.current = null;
      }
      setNoSpeechDetected(false);
    }
  }, [transcript, isRecording]);

  const handleStartRecording = () => {
    setStatus("recording");
    resetTranscript();
    setNoSpeechDetected(false);

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
        setIsRecording(true);
        SpeechRecognition.startListening({ continuous: true });

        // Set a timeout to check if speech was detected after 5 seconds
        transcriptTimeoutRef.current = setTimeout(() => {
          if (!transcript || transcript.trim() === "") {
            setNoSpeechDetected(true);
          }
        }, 5000);
      })
      .catch((error) => {
        console.log("error", error);
        setStatus("idle");
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

    if (transcriptTimeoutRef.current) {
      clearTimeout(transcriptTimeoutRef.current);
      transcriptTimeoutRef.current = null;
    }

    if (!transcript || transcript.trim() === "") {
      setNoSpeechDetected(true);
      setStatus("completed");
      setRecordedFilePath({
        recorderIndex,
        filePath: null,
        noSpeech: true,
      });
    } else {
      setStatus("processing");
    }
  };

  const handleRetry = () => {
    setNoSpeechDetected(false);
    setAudioBlob(null);
    chunksRef.current = [];
    resetTranscript();
    setRecordingTimer(10);
    setStatus("idle");
    handleStartRecording();
  };

  useEffect(() => {
    if (audioBlob && status === "processing" && !noSpeechDetected) {
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

      if (transcript && transcript.trim() !== "") {
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
            // Import the secure service
            const { secureOpenAIChatCompletion } = await import('../../../../../../helpers/secureOpenAIService');
            
            const gptResponse = await secureOpenAIChatCompletion(gptBody);

            if (!gptResponse?.choices) {
              throw new Error("AI assessment service unavailable");
            }

            // gptResponse is already parsed JSON, no need to call .json() again
            const assessment = gptResponse.choices[0].message.content;

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
      } else {
        setNoSpeechDetected(true);
        setStatus("completed");
        setRecordedFilePath({
          recorderIndex,
          filePath: null,
          noSpeech: true,
        });
      }
    }
  }, [audioBlob, status, transcript, noSpeechDetected]);

  return (
    <div className="w-100">
      <h6 className="text-center">Recorded Answer</h6>
      <div>
        {countdown && status === "idle" && (
          <div className="text-center">Beginning in {countdown} seconds</div>
        )}

        {isRecording && status === "recording" && (
          <div>
            <div className="text-center mb-2">
              Recording Time Left: {recordingTimer}s
            </div>
            <ProgressBar
              striped
              animated
              className="mt-2"
              now={((10 - recordingTimer) / 10) * 100}
              variant={recordingTimer <= 5 ? "danger" : "success"}
            />
            {noSpeechDetected && (
              <div className="text-warning text-center mt-2">
                No speech detected. Please speak clearly.
              </div>
            )}
          </div>
        )}

        {status === "processing" && (
          <div className="text-center mt-3">
            <Spinner animation="border" role="status" variant="primary" />
            <p className="mt-2">Submitting recording...</p>
          </div>
        )}

        {status === "completed" && noSpeechDetected ? (
          <div className="text-center mt-3">
            <div className="text-danger mb-3">
              No speech detected. Please speak clearly and try again.
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleRetry}>
              Retry Recording
            </button>
          </div>
        ) : status === "completed" && !noSpeechDetected ? (
          <div className="text-center text-success mt-2">
            Recording submitted successfully!
          </div>
        ) : null}

        {audioBlob && status === "completed" && !noSpeechDetected && (
          <div className="mt-3">
            <DisplayAudio audioBlob={audioBlob} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ASQRecorder;
