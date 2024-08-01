import React, { useState, useRef, useEffect } from "react";
import {
  speakingApiService,
  writingApiService,
} from "../../utils/chatgpt/chatgptApiService";

const AudioRecorder = ({
  setRecordedFilePath,
  next,
  enableRecording = true,
  questions,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    setIsRecording(false);
    setAudioBlob(null);
    setRecordedFilePath(null);
    mediaRecorderRef.current = null;
    chunksRef.current = [];
  }, [next]);

  const handleStartRecording = () => {
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
      })
      .catch((error) => console.error("Error accessing microphone:", error));
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  useEffect(() => {
    (async () => {
      if (audioBlob) {
        const formData = new FormData();
        formData.append("file", audioBlob);
        formData.append("model", "whisper-1");
        formData.append("response_format", "json");
        formData.append("temperature", 0);
        formData.append("language", "en");

        const res = await speakingApiService(formData);
        const writingRes = await writingApiService(questions, res.text);
        setRecordedFilePath(writingRes?.choices?.[0]?.message?.content);
      }
    })();
  }, [audioBlob]); // Include 'next' as a dependency here

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderBottom: "grey 1px solid",
      }}
    >
      <h5 style={{ alignSelf: "center" }}>
        {(!enableRecording &&
          "Click on the Mic icon to Record your Response") ||
          (isRecording && "Recording...") ||
          (!isRecording && !audioBlob && "Click on Mic to Recording") ||
          "Recording Completed"}
      </h5>
      <button
        disabled={!enableRecording}
        className="audio__recorder__btn"
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {isRecording ? (
          <i className="icofont-stop audio_stop_icon"></i>
        ) : (
          <i
            className={`icofont-mic audio-30  ${
              enableRecording && "audio_recorder_icon"
            }`}
          ></i>
        )}
      </button>
      {audioBlob && (
        <div>
          <h2>Recorded Audio</h2>
          <audio controls>
            <source src={URL.createObjectURL(audioBlob)} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
