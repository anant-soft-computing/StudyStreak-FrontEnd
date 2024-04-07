import React from "react";

function WritingInstruction({ startTest }) {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">
        Practice Writing Test - Instructions
      </div>
      <div className="instruction-content">
        1. There will no timer in this practice writing test.
      </div>
      <div className="instruction-note">
        2. Since this is the computer delivered format, you will need to type
        your responses into the spaces given. At the bottom of the text box,
        there will be live word count to help you track the number of words you
        have typed.
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
}

export default WritingInstruction;
