import React, { useRef, useState } from "react";

const One = () => {
  const audioChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.log("error", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playBackRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div className="instruction-card m-5">
      <h3 className="instruction-heading">PTE-Academic Mock Test</h3>
      <div className="instruction-type" />
      <div className="d-flex justify-content-between gap-5 mx-4 flex-column flex-md-row">
        <div>
          <h4 className="instruction-content">
            This is PTE-Academic Mock test. It is a simulation of Pearson
            PTE-Academic English Test and the questions are selected randomly
            from our question bank. Each PTE-Academic Mock Test will have
            different questions and the number of questions and time management
            is based on the real PTE exam.
          </h4>
          <div className="instruction-content">
            Taking the PTE-Academic Mock test is free but for checking the
            answers and scoring, you need to pay the Mock fee{" "}
            <b className="text-danger">(1 credit)</b>. Your PTEstudy.net mock
            tests will be stored on our server for one month and after that,
            they will be removed.
          </div>
          <h4>Requirements</h4>
          <div>
            <div className="d-flex flex-wrap align-items-center">
              <div className="requirement">
                <i className="icofont-check-circled icofont-md"></i> JavaScript
                is Enable.
              </div>
              <div className="requirement">
                <i className="icofont-check-circled icofont-md"></i> Cookies are
                Enable.
              </div>
            </div>
            <div className="d-flex flex-wrap align-items-center">
              <div className="requirement">
                <i className="icofont-check-circled icofont-md"></i> Your
                browser is Google Chrome 128.0.0.0
              </div>
              <div className="requirement">
                <i className="icofont-check-circled icofont-md"></i> Your
                operating system is Linux x64
              </div>
            </div>
          </div>
          <h4 className="mt-3">Test audio recording</h4>
          <div className="instruction-content">
            Click 'Record' below and repeat the following:
          </div>
          <div className="instruction-content">
            I'm here now and I'm ready to start learning!
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <button
              className="default__button"
              onClick={startRecording}
              disabled={isRecording}
            >
              <i className="icofont-record"></i> Start Record
            </button>
            <button
              className="default__button"
              onClick={stopRecording}
              disabled={!isRecording}
            >
              <i className="icofont-stop"></i> Stop Record
            </button>
            <button
              className="default__button"
              onClick={playBackRecording}
              disabled={!audioUrl}
            >
              <i className="icofont-play-alt-1"></i> Play Back
            </button>

            <div className="instruction-content">
              We suggest to continue the Mock test in full screen mode.
            </div>
            <button className="default__button" onClick={handleFullScreen}>
              <i className="icofont-plus-square"></i> Full Screen (F11)
            </button>
          </div>
          <h4 className="text-danger mt-3">Notice :</h4>
          <ul>
            <li>
              <i className="icofont-check"></i> Make sure the microphone access
              is grantet for the studystreak.in
            </li>
          </ul>
          <ul>
            <li>
              <i className="icofont-check"></i> Make sure that Auto audio play
              is enable in your browser.
            </li>
          </ul>
          <ul>
            <li>
              <i className="icofont-check"></i> Never exit the exam during the
              mock test. By doing this, you may lose data.
            </li>
          </ul>
          <ul>
            <li>
              <i className="icofont-check"></i> Check your internet speed before
              the test. A speed of more than 1 Mbps for Download and Upload is
              recommended.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default One;
