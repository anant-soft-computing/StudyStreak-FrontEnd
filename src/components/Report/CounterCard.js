import React from "react";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";
import SkipIcon from "../UI/SkipIcon";

const CounterCard = ({
  counts,
  testType,
  latestBand,
  testGiven,
  testAvailable,
}) => {
  return (
    <div>
      <div className="mainWrapper">
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div>{testType} : </div>
          <div className="wrap_item_icon">
            <i className="icofont-justify-all text-info icofont-md" />{" "}
            {testGiven}
            Tests Given
          </div>
          <div className="wrap_item_icon">
            <i className="icofont-list text-success icofont-md" />
            {testAvailable - testGiven} Tests Available
          </div>
          <div className="wrap_item_icon">
            <i className="icofont-ui-copy text-secondary icofont-md"></i>
            {testAvailable} Total Tests
          </div>
        </div>
      </div>
      <div className="mainWrapper gap-3">
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
              <i className="icofont-score-board text-secondary icofont-md"></i>
              {counts?.band}
            </div>
            <div className="warp_item_text">Band Score</div>
          </div>
        </div>
        <div className="latest_wrapper">
          <div className="wrap_item">
            <div className="wrap_item_icon">{latestBand} - Band</div>
            <div className="warp_item_text">Latest Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterCard;
