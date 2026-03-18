import React, { useRef, useState } from "react";
import microphone from "../../../../../../img/service/microphone.png";

const Four = () => {
  const audioChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

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
      <h3 className="instruction-content">Microphone Check </h3>
      <div className="instruction-content">
        This is an opportunity to check that your microphone is working
        correctly.
      </div>

      <div className="instruction-content">
        <ul>
          <li>
            <i className="icofont-check"></i> Make sure your headset is on and
            the microphone is in the downward position near your mouth.
          </li>
        </ul>
        <ul>
          <li>
            <i className="icofont-check"></i> When you are ready. click on the{" "}
            <b className="text-danger">Record</b> button and say "Testing,
            testing, one, two, three" into the microphone.
          </li>
        </ul>
        <ul>
          <li>
            <i className="icofont-check"></i> After you have spoken, click on
            the <b className="text-danger">Stop</b> button. your recording is
            now complete.
          </li>
        </ul>
        <ul>
          <li>
            <i className="icofont-check"></i> Now click on the{" "}
            <b className="text-danger">Playback</b> button. You should clearly
            hear yourself speaking.
          </li>
        </ul>
        <ul>
          <li>
            <i className="icofont-check"></i> If you can not hear your voice,
            please raise your hand to get the attention of the Test
            Administrator
          </li>
        </ul>
        <div className="instruction-audio">
          <span>Status : Click To Record</span>
          <div className="d-flex flex-wrap gap-2 mt-3">
            <button
              className="default__button"
              onClick={startRecording}
              disabled={isRecording}
            >
              <i className="icofont-record"></i> Record
            </button>
            <button
              className="default__button"
              onClick={playBackRecording}
              disabled={!audioUrl}
            >
              <i className="icofont-play-alt-1"></i> Playback
            </button>
            <button
              className="default__button"
              onClick={stopRecording}
              disabled={!isRecording}
            >
              <i className="icofont-stop"></i> Stop
            </button>
          </div>
        </div>
        <ul>
          <li>
            <i className="icofont-check"></i> During the test you will not have{" "}
            <b className="text-danger">Play, Playback</b> and{" "}
            <b className="text-danger">Stop</b> buttons. The voice recording
            will start automatically.
          </li>
        </ul>
        <div>
          <img
            src={microphone}
            alt="Micro Phone"
            className="lv-instruction-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Four;
