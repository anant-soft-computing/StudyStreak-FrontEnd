import React from "react";
import cpuJack from "../../img/service/img.png"

function SpeakingInstruction({ testType, startTest }) {
  return (
    <div className="instruction-card mb-5 pb-5">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">
        {testType} Speaking Test - Instructions
      </div>
      <div className="d-flex justify-content-between gap-5 mx-4 flex-column flex-md-row">
        <div>
          <div className="instruction-content">
            This test will last for about 11 to 14 minutes.
          </div>
          <div className="instruction-content">
            Once you start the test, you will find an examiner on the left half
            of the screen and a microphone icon on the right. Play the video.
            The examiner will ask you a series of questions. At the end of each
            question, press the microphone icon and record your answer/response.
          </div>
          <div className="instruction-content">
            You will not need a headphone if you are using a laptop that has a
            functional microphone. But in case you are attempting this speaking
            session on your desktop computer, please ensure that you put on a
            headphone with a microphone to speak into and record your responses
            to the questions asked by the examiner.
          </div>
          <div className="instruction-content">
            In case of a desktop PC, plug in both the microphone cord and the
            headphone cord at the back of your CPU.
          </div>
          <div className="instruction-content">
            All the instructions will be given to you by the examiner. So listen
            carefully and respond in a clear voice.
          </div>
          <div className="instruction-content">
            Once you have submitted the test, you will get a report in which you
            can listen to your own answers as you’ve spoken.
          </div>
          <div className="instruction-content">
            Please ensure that you have a good internet connectivity for a
            smooth speaking session.
          </div>
          <div className="instruction-content">
            <span style={{ fontWeight: "bold", color: "#595959" }}>
              Part 1:{" "}
            </span>
            Introduction General questions on familiar topics like family,
            friends, home, hobbies, or work.
          </div>
          <div className="instruction-content">
            <span style={{ fontWeight: "bold", color: "#595959" }}>
              Part 2:{" "}
            </span>
            Cue Card You need to speak on the topic given in the cue card. After
            that, the examiner asks questions on the same topic.
          </div>
          <div className="instruction-content">
            <span style={{ fontWeight: "bold", color: "#595959" }}>
              Part 3:{" "}
            </span>
            Discussion The examiner discusses the topic given in Part 2 in
            detail with you.
          </div>
          <p className="instruction-wishes">Good Luck!</p>
        </div>
        <div className="mb-4 mb-md-0 d-flex d-md-block justify-content-center">
          <img
            src={cpuJack}
            alt="Mic & Headphone Jack"
            className="lv-instruction-image"
            style={{
              borderRadius: "6px",
              border: "none",
            }}
          />
        </div>
      </div>

      <div className="instruction-attention text-center">
        Do not click 'start test' until you are told to do so.
      </div>
      <button className="start-btn" onClick={() => startTest("speaking")}>
        Start test
      </button>
    </div>
  );
}

export default SpeakingInstruction;
