import React from "react";

const ReadingMTInstruction = ({ startTest }) => {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">Mini Reading Test - Instructions</div>
      <div className="instruction-content">
        You will be given ONE Reading Passage based on which you will have to
        answer a total of 13/14 questions. You may select any sentence(s) and
        right click to highlight or take notes.
      </div>
      <div className="instruction-note">
        Since this is a practice test, it is not timed. You may take as long as
        you wish to enter your answers before submitting the test.
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

export default ReadingMTInstruction;
