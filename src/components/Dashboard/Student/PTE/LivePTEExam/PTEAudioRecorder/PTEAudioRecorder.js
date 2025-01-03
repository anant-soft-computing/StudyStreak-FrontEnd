import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ajaxCall from "../../../../../../helpers/ajaxCall";
import DisplayAudio from "../../../../../UI/DisplayAudio";

const PTEAudioRecorder = ({
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
            content: `Analyze the following PTE Speaking response using these criteria:
              
              Content and Relevance:
                - Complete coverage of the task requirements
                - Relevance and appropriateness of the response
                - Development of ideas and supporting details
    
              Oral Fluency:
                - Smooth flow of speech with natural pacing
                - Minimal hesitation and self-correction
                - Effective use of linking words and phrases
          
              Pronunciation:
                - Clear articulation of sounds
                - Appropriate word stress and sentence stress
                - Natural intonation patterns
                - Consistent rhythm and connected speech
          
              Language Use:
                - Range and accuracy of vocabulary
                - Grammatical accuracy and complexity
                - Appropriate word choice and collocations
              
              Provide scores on a scale of 90 points, broken down as follows:
                - Content and Relevance: 0-25 points
                - Oral Fluency: 0-25 points
                - Pronunciation: 0-20 points
                - Language Use: 0-20 points
              `,
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
            content: `Please provide the assessment in the following format:
      
              #Detailed_Analysis:
              
              Content and Relevance:
              [Detailed analysis with specific examples from the response]
              Score: X/25
              
              Oral Fluency:
              [Detailed analysis with specific examples from the response]
              Score: X/25
              
              Pronunciation:
              [Detailed analysis with specific examples from the response]
              Score: X/20
              
              Language Use:
              [Detailed analysis with specific examples from the response]
              Score: X/20
              
              #Overall_Score: [Total]/90
              
              Respond only with the evaluation up to the #Overall_Score. Do not include any additional text or explanation beyond this point.`,
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

export default PTEAudioRecorder;
