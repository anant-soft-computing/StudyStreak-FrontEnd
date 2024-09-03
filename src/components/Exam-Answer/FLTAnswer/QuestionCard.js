import React from "react";

const QuestionCard = ({ counts }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-3">
      <div className="flt-question-card">
        Correct Answer :{" "}
        <span>{counts?.reading?.correct + counts?.listening?.correct}</span>
      </div>
      <div className="flt-question-card">
        Incorrect Answer :{" "}
        <span>{counts?.reading?.incorrect + counts?.listening?.incorrect}</span>
      </div>
      <div className="flt-question-card">
        Skip Answer :{" "}
        <span>{counts?.reading?.skipped + counts?.listening?.skipped}</span>
      </div>
    </div>
  );
};

export default QuestionCard;
