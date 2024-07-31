import React from "react";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";
import SkipIcon from "../UI/SkipIcon";
import ScoreIcon from "../UI/ScoreIcon";

const CounterCard = ({ counts }) => {
  return (
    <div className="mainWrapper">
      <div className="wrapper">
        <div className="wrap_item">
          <div className="wrap_item_icon">
            <CheckIcon />
            {counts?.correct}
          </div>
          <div className="warp_item_text">Correct Answers</div>
        </div>
        <div className="wrap_item">
          <div className="wrap_item_icon">
            <CancelIcon />
            {counts?.incorrect}
          </div>
          <div className="warp_item_text">Incorrect Answers</div>
        </div>
        <div className="wrap_item">
          <div className="wrap_item_icon">
            <SkipIcon />
            {counts?.skipped}
          </div>
          <div className="warp_item_text">Skipped Answers</div>
        </div>
        <div className="wrap_item">
          <div className="wrap_item_icon">
            <ScoreIcon />
            {counts?.band}
          </div>
          <div className="warp_item_text">Band Score</div>
        </div>
      </div>
    </div>
  );
};

export default CounterCard;
