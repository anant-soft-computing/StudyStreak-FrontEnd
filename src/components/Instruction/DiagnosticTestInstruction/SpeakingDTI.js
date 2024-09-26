import React from "react";

const SpeakingDTI = ({ startTest }) => {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">
        Diagnostic Speaking Test - Instructions
      </div>

      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>(1) : </span>
        Record your responses to each question using a clear and audible voice.
      </div>

      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>(2) : </span>
        You have 2 minutes per question to respond.
      </div>

      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>(3) : </span>
        Submit each answer as an individual audio file (e.g.,
        Question1_Introduction.mp3).
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
};

export default SpeakingDTI;
