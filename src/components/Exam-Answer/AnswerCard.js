import React from "react";

const AnswerCard = ({
  totalQuestions,
  timeTaken,
  correctCount,
  incorrectCount,
  bandValue,
}) => {
  return (
    <div className="course__details__wraper">
      <ul className="answerContent">
        {totalQuestions && (
          <li className="text-dark">
            Total Question :
            <div className="scc__meta">
              <strong className="answerCount">{totalQuestions}</strong>
            </div>
          </li>
        )}
        <li className="text-dark">
          Time Taken :
          <div className="scc__meta">
            <strong className="answerCount">{timeTaken}</strong>
          </div>
        </li>
      </ul>
      <ul className="answerContent">
        <li className="text-dark">
          Correct :
          <div className="scc__meta">
            <strong className="answerCount">{correctCount}</strong>
          </div>
        </li>
        <li className="text-dark">
          In Correct :
          <div className="scc__meta">
            <strong className="answerCount">{incorrectCount}</strong>
          </div>
        </li>
        <li className="text-dark">
          Band Score :
          <div className="scc__meta">
            <strong className="answerCount">{bandValue}</strong>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AnswerCard;