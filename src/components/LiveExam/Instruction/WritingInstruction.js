import React from "react";

function WritingInstruction({ testType, startTest }) {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">
        {testType} Writing Test - Instructions
      </div>
      <div className="instruction-content">
        1. Since this is a practice test, it will be timed.
      </div>
      <div className="instruction-note">
        2. Since this is the computer delivered format, you will need to type
        your responses into the spaces given. At the bottom of the text box,
        there will be live word count to help you track the number of words you
        have typed.
      </div>
      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>Part 1: </span>
        Diagram You are supposed to describe the given diagram or data (graph,
        table, chart) in at least  150 words. You must spend about 20 minutes on
        this task.
      </div>
      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>Part 2: </span>
        Essay You are given a point of view, argument, or a problem. You need to
        present a solution to the problem, justify an opinion, evaluate ideas or
        arguments in at least 250 words.
      </div>
      <div className="instruction-content">
        You must spend about 40 minutes on this task.
      </div>
      <div className="instruction-content">
        Note: Include all the points given in the instructions to fulfill the
        Task Response criteria.
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
