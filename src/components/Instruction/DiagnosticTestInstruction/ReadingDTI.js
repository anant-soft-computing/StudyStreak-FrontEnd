import React from "react";

const ReadingDTI = ({ startTest }) => {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">
        Diagnostic Reading Test - Instructions
      </div>

      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>(1) : </span>
        Read the passage "Sustainable Living" carefully.
      </div>

      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>(2) : </span>
        Answer the multiple-choice questions that follow.
      </div>

      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>(3) : </span>
        Only one answer per question is correct.
      </div>

      <p className="instruction-wishes">Good Luck!</p>

      <div className="instruction-attention">
        Do not click 'start test' untill you are told to do so.
      </div>

      <button className="start-btn" onClick={() => startTest("reading")}>
        Start test
      </button>
    </div>
  );
};

export default ReadingDTI;
