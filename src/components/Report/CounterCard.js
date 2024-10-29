import React from "react";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";
import SkipIcon from "../UI/SkipIcon";

const CounterCard = ({
  band,
  correct,
  skipped,
  testType,
  incorrect,
  testGiven,
  testAvailable,
  latestBand,
}) => {
  return (
    <div>
      <div className="mainWrapper">
        <div className="d-flex flex-wrap gap-3 mb-3">
          {testType && <div>{testType} : </div>}
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
        {correct !== undefined && (
          <div className="wrapper">
            <div className="wrap_item">
              <div className="wrap_item_icon">
                <CheckIcon />
                {correct}
              </div>
              <div className="warp_item_text">Correct Answers</div>
            </div>
            <div className="wrap_item">
              <div className="wrap_item_icon">
                <CancelIcon />
                {incorrect}
              </div>
              <div className="warp_item_text">Incorrect Answers</div>
            </div>
            <div className="wrap_item">
              <div className="wrap_item_icon">
                <SkipIcon />
                {skipped}
              </div>
              <div className="warp_item_text">Skipped Answers</div>
            </div>
            <div className="wrap_item">
              <div className="wrap_item_icon">
                <i className="icofont-score-board text-secondary icofont-md"></i>
                {band}
              </div>
              <div className="warp_item_text">Band Score</div>
            </div>
          </div>
        )}
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
