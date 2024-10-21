import React from "react";

const WritingDTI = ({ startTest }) => {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">
        Diagnostic Writing Test - Instructions
      </div>

      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>(1) : </span>
        Choose the correct word or phrase to fill in the blanks.
      </div>

      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>(2) : </span>
        Only one answer per question is correct.
      </div>

      <p className="instruction-wishes">Good Luck!</p>

      <div className="instruction-attention">
        Do not click 'start test' untill you are told to do so.
      </div>

      <button className="start-btn" onClick={() => startTest("writing")}>
        Start test
      </button>
    </div>
  );
};

export default WritingDTI;
