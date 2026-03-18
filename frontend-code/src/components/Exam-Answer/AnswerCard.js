import React from "react";
import { getBackgroundColor } from "../../utils/background/background";

const AnswerCard = ({ band, correctCount, incorrectCount, skipCount }) => {
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        <div className="flt-question-card">
          Correct Answer : <span>{correctCount}</span>
        </div>
        <div className="flt-question-card">
          Incorrect Answer : <span>{incorrectCount}</span>
        </div>
        <div className="flt-question-card">
          Skip Answer : <span>{skipCount}</span>
        </div>
        <div
          className="flt-question-card"
          style={{
            backgroundColor: getBackgroundColor(band),
          }}
        >
          Band : <span>{band}</span>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
