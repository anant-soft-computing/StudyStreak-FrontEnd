import React from "react";

const WritingMTInstruction = ({ startTest }) => {
  return (
    <div className="instruction-card">
      <h3 className="instruction-heading">Instructions</h3>
      <div className="instruction-type">Mini Writing Test - Instructions</div>
      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>
          1. Task 1 (Academic/General) :{" "}
        </span>
        You will be required to write a minimum of 150 words. The task may
        involve describing a chart, graph, or diagram (Academic) or writing a
        letter (General). Structure your response with a clear introduction,
        body, and conclusion.
      </div>
      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>
          2. Task 2 (Essay) :{" "}
        </span>
        You will be asked to write a minimum of 250 words in response to a
        question that presents an opinion, problem, or argument. Ensure you
        present a balanced response with clear points and examples.
      </div>
      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>
          3. Time Limit :{" "}
        </span>
        <ul>
          <div>Task 1: 20 minutes</div>
          <div>Task 2: 40 minutes</div>
        </ul>
      </div>
      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>
          4. Submission :{" "}
        </span>
        Essay You are given a point of view, argument, or a problem. You need to
        present a solution to the problem, justify an opinion, evaluate ideas or
        arguments in at least 250 words. You must spend about 40 minutes on this
        task.
      </div>
      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>
          5. Evaluation Criteria :{" "}
        </span>
        Responses will be assessed based on Task Achievement, Coherence and
        Cohesion, Lexical Resource, and Grammatical Range and Accuracy.
      </div>
      <div className="instruction-content">
        <span style={{ fontWeight: "bold", color: "#595959" }}>
          6. Feedback :{" "}
        </span>
        Tutors will provide detailed feedback with suggestions for improvement
        in both content and language.
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

export default WritingMTInstruction;
