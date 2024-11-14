import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
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
  }, [next, resetTranscript, setRecordedFilePath]);

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
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
        setActiveRecordingIndex(recorderIndex);
        SpeechRecognition.startListening({ continuous: true });
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
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
            content: `Analyse The Package For IELTS Speaking Task With Following Criteria. Be strict in your evaluation, and provide band scores in .5 increments (e.g., 3, 3.5, 4, 4.5, etc.)
    
            Assessment Criteria:
    
            Task:
    
            Fluency: Refers to the ability to speak at a natural pace without excessive pausing or hesitation. The speaker should be able to maintain a smooth flow of speech without too many self-corrections or repetition.
    
            Coherence: Involves logical organization of ideas, effective use of linking words, and the ability to convey information clearly. The speaker should be able to connect sentences and ideas in a way that makes their speech easy to follow.
    
            Range of Vocabulary: The use of a wide range of vocabulary relevant to the topic. The examiner looks for both everyday vocabulary and less common or idiomatic language.
    
            Accuracy and Appropriacy: The correct use of words and phrases, appropriate word choice for context, and the ability to paraphrase effectively when necessary. Minor errors are acceptable if they do not impede communication.
            
            Range of Grammar: Use of various sentence structures, such as simple, compound, and complex sentences. The use of different grammatical forms, including tenses, conditionals, passive voice, and modal verbs.
            
            Accuracy: Correct use of grammar, with attention to verb forms, word order, and subject-verb agreement. Occasional errors are acceptable if they do not affect understanding.
            
            Intelligibility: The ability to be understood throughout the speaking test. This includes clarity of speech, correct pronunciation of words, and consistent use of stress and intonation patterns.
            
            Range of Pronunciation Features: The use of features such as rhythm, intonation, stress patterns, and connected speech. Effective use of these features helps convey meaning and maintain the listener's interest.`,
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
            throw new Error("Failed to fetch from OpenAI API");
          }

          const data = await gptResponse.json();
          const aiAssessment = data?.choices?.[0]?.message?.content || "";

          const pattern = /\b\d+(?:\.\d+)?\b/g;
          const matches = aiAssessment.match(pattern);
          const bandValue = matches ? matches[matches.length - 1] : 0;

          formData.append("AI_Assessment", aiAssessment);
          formData.append("band", bandValue);

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
        className="audio__recorder__btn"
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        style={{
          cursor:
            enableRecording && (!isActiveRecording || isRecording)
              ? "pointer"
              : "not-allowed",
          backgroundColor: isRecording ? "red" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <i
          className={`icofont-${isRecording ? "stop" : "mic"} audio_icon`}
          style={{ marginRight: "8px" }}
        ></i>
        <span>{isRecording ? "Stop" : "Start"}</span>
      </button>
      <h6
        style={{ alignSelf: "center", textAlign: "center", marginTop: "10px" }}
      >
        {(!enableRecording &&
          "Click on the Mic icon to Record your Response") ||
          (completed && "Recording Completed") ||
          (isRecording && "Recording...") ||
          (!isRecording && !audioBlob && "Click on Mic to Record")}
      </h6>
      {audioBlob && <DisplayAudio audioBlob={audioBlob} />}
      {isRecording && <p>Transcript: {transcript}</p>}
    </div>
  );
};

export default AudioRecorder;
