import React from "react";

const GeneralInstruction = ({ testType = "Practice", startTest }) => {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">
        {testType} General Test - Instructions
      </div>
      <div className="instruction-attention">
        Do not click 'start test' untill you are told to do so.
      </div>
      <button className="start-btn" onClick={() => startTest("general")}>
        Start test
      </button>
    </div>
  );
};

export default GeneralInstruction;
