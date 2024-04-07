import React from "react";
import cpuJack from "../../../img/service/img.png";

function SpeakingInstruction({ startTest }) {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">
        Practice Listening Test - Instructions
      </div>
      <div className="instruction-content">
        This test will last for about 11 to 14 minutes.
      </div>
      <div className="instruction-content">
        Once you start the test, you will find an examiner on the left half of
        the screen and a microphone icon on the right. Play the video. The
        examiner will ask you a series of questions. At the end of each
        question, press the microphone icon and record your answer/response.
      </div>
      <div className="instruction-content">
        You will not need a headphone if you are using a laptop that has a
        functional microphone. But in case you are attempting this speaking
        session on your desktop computer, please ensure that you put on a
        headphone with a microphone to speak into and record your responses to
        the questions asked by the examiner.
      </div>
      <div className="instruction-content">
        In case of a desktop PC, plug in both the microphone cord and the
        headphone cord at the back of your CPU.
      </div>
      <img
        style={{ marginBottom: "20px" }}
        src={cpuJack}
        alt="Mic & Headphone Jack"
      ></img>
      <div className="instruction-content">
        All the instructions will be given to you by the examiner. So listen
        carefully and respond in a clear voice.
      </div>
      <div className="instruction-content">
        Once you have submitted the test, you will get a report in which you can
        listen to your own answers as you’ve spoken.
      </div>
      <div className="instruction-content">
        Please ensure that you have a good internet connectivity for a smooth
        speaking session.
      </div>
      <p className="instruction-wishes">Good Luck!</p>
      <div className="instruction-attention">
        Do not click 'start test' untill you are told to do so.
      </div>
      <button className="start-btn" onClick={() => startTest("speaking")}>
        Start test
      </button>
    </div>
  );
}

export default SpeakingInstruction;