import React, { useState, useRef, useEffect } from "react";
import ajaxCall from "../../helpers/ajaxCall";

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
      formData.append("question_number", question_number);
      formData.append("extension", "mp3");
      formData.append("answer_audio", audioBlob, "output.mp3");
      formData.append("user", user);
      formData.append("speaking_block", exam?.id);
      formData.append("practise_test", practice ? practice : "");
      formData.append("Flt", Flt ? Flt : "");

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
          setRecordedFilePath({
            recorderIndex,
            filePath: response?.data?.answer_audio,
          });
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [audioBlob]); // Include 'next' as a dependency here

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // borderBottom: "grey 1px solid",
      }}
      className="ly-mic-audio-container"
    >
      <button
        disabled={!enableRecording}
        className="audio__recorder__btn"
        onClick={isRecording ? handleStopRecording : handleStartRecording}
        style={{
          cursor: enableRecording ? "pointer" : "not-allowed",
        }}
      >
        {isRecording ? (
          <i className="icofont-stop audio_stop_icon"></i>
        ) : !completed ? (
          <i
            className={`icofont-mic audio-30  ${
              enableRecording && "audio_recorder_icon"
            }`}
            style={{
              background: completed ? "green" : "",
              color: !enableRecording ? "grey" : "",
            }}
          ></i>
        ) : null}
      </button>
      <h6 style={{ alignSelf: "center", textAlign: "center" }}>
        {(!enableRecording &&
          "Click on the Mic icon to Record your Response") ||
          (completed && "Recording Completed") ||
          (isRecording && "Recording...") ||
          (!isRecording && !audioBlob && "Click on Mic to Recording")}
      </h6>
      {audioBlob && <audio controls src={URL.createObjectURL(audioBlob)} />}
    </div>
  );
};

export default AudioRecorder;
