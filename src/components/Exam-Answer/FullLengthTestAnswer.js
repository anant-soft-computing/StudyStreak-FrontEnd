import React from "react";
import BandScoreCard from "./BandScoreCard";

const FullLengthTestAnswer = () => {
  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8 AnswerCard">
                <div className="blog__details__content__wraper"></div>
              </div>
              <BandScoreCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullLengthTestAnswer;