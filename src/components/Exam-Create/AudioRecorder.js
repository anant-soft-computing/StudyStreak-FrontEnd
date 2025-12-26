import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Spinner } from "react-bootstrap";
import ajaxCall from "../../helpers/ajaxCall";
import DisplayAudio from "../UI/DisplayAudio";

const AudioRecorder = ({
  setRecordedFilePath,
  next,
  exam,
  enableRecording = true,
  question_number,
  user,
  completed = false,
  recorderIndex = 0,
  practice,
  Flt,
  setActiveRecordingIndex,
  isActiveRecording,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    setIsRecording(false);
    setAudioBlob(null);
    setRecordedFilePath(null);
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    resetTranscript();
    setIsSubmitting(false);
    setSubmitSuccess(false);
  }, [next, resetTranscript, setRecordedFilePath]);

  const handleStartRecording = () => {
    resetTranscript();
    setSubmitSuccess(false);
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
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        setActiveRecordingIndex(recorderIndex);
        SpeechRecognition.startListening({ continuous: true });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    SpeechRecognition.stopListening();
    setActiveRecordingIndex(null);
  };

  useEffect(() => {
    if (audioBlob) {
      if (!transcript || transcript.trim().length === 0) {
        console.log("No Transcript Available. Skip ChatGPT Analysis.");
        return;
      }
      setIsSubmitting(true);
      setSubmitSuccess(false);
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
            content: `Analyse the IELTS Speaking Task with the following criteria. Provide a fair and encouraging assessment with band scores in .5 increments (e.g., 4.5, 5, 5.5, 6, etc.). Be supportive and recognize effort while providing constructive feedback.
      
              Assessment Criteria:
      
              Fluency and Coherence:
              - Evaluate the natural flow of speech and organization of ideas
              - Minor pauses and hesitations are normal and acceptable in everyday speech
              - Give credit for attempting to maintain continuity even if not perfect
              - Recognize self-corrections as signs of language awareness
      
              Lexical Resource (Vocabulary):
              - Appreciate attempts to use varied vocabulary, even if not always perfect
              - Common everyday vocabulary used appropriately shows good competence
              - Give credit for trying to use topic-relevant words
              - Minor vocabulary errors are acceptable if the meaning is clear
              
              Grammatical Range and Accuracy:
              - Value attempts to use different sentence structures
              - Simple sentences used correctly demonstrate solid foundation
              - Occasional grammar errors are natural and acceptable if they don't block understanding
              - Recognize effort to use complex grammar even if not always accurate
              
              Pronunciation:
              - Focus on overall intelligibility rather than native-like perfection
              - Accent is acceptable as long as speech can be understood
              - Give credit for clear articulation and effort to communicate
              - Recognize good use of stress and intonation patterns
              
              Important: Be encouraging and fair. Most students are learning and improving. If they made a genuine attempt to answer and can be understood, they deserve recognition for their effort.`,
          },
          {
            role: "user",
            content: `Questions: ${question}`,
          },
          {
            role: "user",
            content: `Answers: ${transcript}`,
          },
          {
            role: "user",
            content: `Give band explanation as #Explanation:  
                
                Fluency and Coherence: 
      
                Lexical Resource:
      
                Grammatical Range and Accuracy:
      
                Pronunciation:
                
                as #Band:bandValue`,
          },
        ],
      };

      const getChatGPTResponse = async () => {
        try {
          // Import the secure service
          const { secureOpenAIChatCompletion } = await import('../../helpers/secureOpenAIService');
          
          const gptResponse = await secureOpenAIChatCompletion(gptBody);

          if (!gptResponse?.choices) {
            throw new Error("AI assessment service unavailable");
          }

          // gptResponse is already parsed JSON, no need to call .json() again
          const aiAssessment = gptResponse?.choices?.[0]?.message?.content;

          if (!aiAssessment) {
            throw new Error("No AI assessment content received");
          }

          // Function to round band score to nearest 0.5 (IELTS format)
          const roundToNearestHalf = (score) => {
            return Math.round(score * 2) / 2;
          };
          
          // Extract band value using regex - try multiple patterns
          let bandValue = 0;
          
          // Try pattern 1: Total Band Score: X.X (most common in responses)
          let bandMatch = aiAssessment.match(/Total Band Score:\s*(\d+(?:\.\d+)?)/i);
          
          // Try pattern 2: #Band: X.X (as requested in prompt)
          if (!bandMatch) {
            bandMatch = aiAssessment.match(/#Band:\s*(\d+(?:\.\d+)?)/);
          }
          
          // Try pattern 3: Overall Band: X.X
          if (!bandMatch) {
            bandMatch = aiAssessment.match(/Overall Band:\s*(\d+(?:\.\d+)?)/i);
          }
          
          // Try pattern 4: Band: X.X at the end of the text
          if (!bandMatch) {
            bandMatch = aiAssessment.match(/Band:\s*(\d+(?:\.\d+)?)\s*$/i);
          }
          
          if (bandMatch) {
            const rawBandValue = parseFloat(bandMatch[1]);
            bandValue = roundToNearestHalf(rawBandValue); // Round to nearest 0.5
          }
          
          console.log("AudioRecorder - AI Assessment:", aiAssessment);
          console.log("AudioRecorder - Band Match:", bandMatch);
          console.log("AudioRecorder - Raw Band Value:", bandMatch ? parseFloat(bandMatch[1]) : 0);
          console.log("AudioRecorder - Rounded Band Value:", bandValue);

          // Convert aiAssessment to HTML format
          const assessment = aiAssessment
            .split("\n")
            .map((line) => `<p>${line}</p>`)
            .join("");

          formData.append("AI_Assessment", assessment);
          formData.append("band", bandValue);
          
          console.log("AudioRecorder - FormData band:", formData.get("band"));
          console.log("AudioRecorder - FormData AI_Assessment:", formData.get("AI_Assessment"));

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
              console.log("AudioRecorder - API Response Status:", response.status);
              console.log("AudioRecorder - API Response Data:", response.data);
              if (response.status === 201) {
                setRecordedFilePath({
                  recorderIndex,
                  filePath: response?.data?.answer_audio,
                });
                setSubmitSuccess(true);
              } else {
                console.log("error in submission response:", response);
              }
            })
            .catch((error) => {
              console.log("error submitting data:", error);
            })
            .finally(() => {
              setIsSubmitting(false);
            });
        } catch (error) {
          console.log("error occurred while fetching data from AI:", error);
          setIsSubmitting(false);
        }
      };
      getChatGPTResponse();
    }
  }, [audioBlob]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="ly-mic-audio-container"
    >
      <button
        disabled={!enableRecording || (isActiveRecording && !isRecording)}
        className={`audio__recorder__btn btn ${
          isRecording ? "btn-danger" : "btn-success"
        }`}
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        style={{
          cursor:
            enableRecording && (!isActiveRecording || isRecording)
              ? "pointer"
              : "not-allowed",
        }}
      >
        <i
          className={`icofont-${isRecording ? "stop" : "mic"} audio_icon mr-1`}
        />
        <span>{isRecording ? "Stop Recording" : "Start Recording"}</span>
      </button>
      <div className="mt-2 mb-2">
        {isSubmitting ? (
          <div className="d-flex flex-column align-items-center gap-2">
            <Spinner animation="border" role="status" variant="primary" />
            <p className="mt-2 mb-2">Submitting your recording...</p>
          </div>
        ) : submitSuccess ? (
          <div className="d-flex align-items-center justify-content-center gap-2 text-success">
            <i className="icofont-check-circled"></i>
            <span>Recording submitted successfully!</span>
          </div>
        ) : (
          <h6
            style={{
              alignSelf: "center",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {isRecording
              ? "Recording in progress... Speak clearly"
              : !audioBlob
              ? "Click the button to start recording"
              : ""}
          </h6>
        )}
      </div>
      {audioBlob && submitSuccess && <DisplayAudio audioBlob={audioBlob} />}
    </div>
  );
};

export default AudioRecorder;
