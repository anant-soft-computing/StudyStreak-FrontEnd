import React, { useState, useRef, useEffect } from "react";
import ajaxCall from "../../helpers/ajaxCall";

const AudioRecorder = ({
  setRecordedFilePath,
  next,
  exam_id,
  enableRecording = true,
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
    if (audioBlob) {
      const formData = new FormData();
      formData.append("file", audioBlob);
      formData.append("exam_id", exam_id);
      formData.append("extension", "mp3");

      ajaxCall(
        "/save-audio-file/",
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
          setRecordedFilePath(response?.data?.file_path);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [audioBlob]); // Include 'next' as a dependency here

  return (
    <div>
      <h1>
        {(!enableRecording && "Finish listening content") ||
          (isRecording && "Recording...") ||
          (!isRecording && !audioBlob && "Click on Mic to Recording") ||
          "Recording Completed"}
      </h1>
      <button
        disabled={!enableRecording}
        className="audio__recorder__btn"
        onClick={isRecording ? handleStopRecording : handleStartRecording}
      >
        {isRecording ? (
          <i className="icofont-stop audio_stop_icon"></i>
        ) : (
          <i
            class={`icofont-mic audio-30  ${enableRecording && "audio_recorder_icon"}`}
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
