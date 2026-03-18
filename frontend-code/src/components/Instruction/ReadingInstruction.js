import React from "react";

function ReadingInstruction({ testType, startTest }) {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">
        {testType} Reading Test - Instructions
      </div>

      <div className="instruction-content">
        You will be given three reading passages based on which you will have to
        answer a total of 40 questions. You will be able to surf between the
        passages so you can attempt the passages in any order. You may select
        any sentence(s) and right click to highlight or take notes.
      </div>

      {testType === "Practice" ? (
        <div className="instruction-note">
          Since this is a practice test, it is timed. You have 60 minutes to
          enter your answers before submitting the test.
        </div>
      ) : (
        <div className="instruction-note">
          This is a Full Length Test and thus it is timed. The test will be auto
          submitted after 60 minutes.
        </div>
      )}
      <p className="instruction-wishes">Good Luck!</p>
      <div className="instruction-attention">
        Do not click 'start test' untill you are told to do so.
      </div>
      <button className="start-btn" onClick={() => startTest("reading")}>
        Start test
      </button>
    </div>
  );
}

export default ReadingInstruction;
