import React from "react";
import { Link } from "react-router-dom";

const ScoreCard = () => {
  return (
    <>
      <div className="col-xl-6 column__custom__class">
        <div className="gridarea__wraper card-background">
          <div className="gridarea__content">
            <div className="gridarea__heading">
              <h6>Your Latest Given Practice Test</h6>
            </div>
            <div className="gridarea__price d-flex gap-2 mb-0">
              <h3>Reading Practice Test 1 - Reading</h3>
            </div>
            <div className="gridarea__bottom">
              <div className="gridarea__small__content">
                <Link to="">
                  <h6>View Full Report {">>"}</h6>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6 column__custom__class">
        <div className="gridarea__wraper card-background">
          <div className="gridarea__content">
            <div className="gridarea__heading">
              <h6>Your Latest Full Length Test </h6>
            </div>
            <div className="gridarea__price d-flex gap-2 mb-0">
              <h3>Full Length Test - 1</h3>
            </div>
            <div className="gridarea__bottom">
              <div className="gridarea__small__content">
                <Link to="">
                  <h6>View Full Report {">>"}</h6>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreCard;