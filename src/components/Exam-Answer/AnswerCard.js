import React from "react";

const AnswerCard = ({
  totalQuestions,
  correctCount,
  incorrectCount,
  skipCount,
  bandValue,
  examType,
}) => {
  return (
    <div className="course__details__wraper">
      <ul className="answerContent">
        {totalQuestions >= 0 && (
          <li className="text-dark">
            Total Question :
            <div className="scc__meta">
              <strong className="answerCount">{totalQuestions}</strong>
            </div>
          </li>
        )}
        <li className="text-dark">
          Band Score :
          <div className="scc__meta">
            <strong className="answerCount">
              {bandValue == null ? 0 : bandValue}
            </strong>
          </div>
        </li>
        {bandValue == 0 && examType !== "General" && (
          <li className="text-danger">
            <div className="scc__meta">
              (This Exam Is Not Eligible For A Band Score)
            </div>
          </li>
        )}
      </ul>
      <ul className="answerContent">
        <li className="text-dark">
          Correct Answer :
          <div className="scc__meta">
            <strong className="answerCount">{correctCount}</strong>
          </div>
        </li>
        <li className="text-dark">
          Incorrect Answer :
          <div className="scc__meta">
            <strong className="answerCount">{incorrectCount}</strong>
          </div>
        </li>
        <li className="text-dark">
          Skip Answer :
          <div className="scc__meta">
            <strong className="answerCount">{skipCount}</strong>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AnswerCard;
