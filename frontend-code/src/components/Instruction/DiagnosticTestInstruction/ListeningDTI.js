import React from "react";

const ListeningDTI = ({ startTest }) => {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">
        Diagnostic Listening Test - Instructions
      </div>

      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>(1) : </span>
        Listen to each audio clip provided.
      </div>

      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>(2) : </span>
        Answer the questions based on the information in the audio.
      </div>

      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>(3) : </span>
        You have 5 minutes to complete the section.
      </div>

      <p className="instruction-wishes">Good Luck!</p>

      <div className="instruction-attention">
        Do not click 'start test' untill you are told to do so.
      </div>

      <button className="start-btn" onClick={() => startTest("listening")}>
        Start test
      </button>
    </div>
  );
};

export default ListeningDTI;
