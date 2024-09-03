import React from "react";

const ScoreCard = () => {
  return (
    <div className="col-xl-4 col-lg-4">
      <div className="course__details__sidebar">
        <div className="event__sidebar__wraper">
          <h5 className="sidebar__title">Band Score</h5>
          <hr></hr>
          <div className="course__summery__lists">
            <ul>
              <div className="course__summery__item d-flex justify-content-between">
                <span>Level</span>
                <span>Band</span>
              </div>
              <hr></hr>
              <div className="level__band">
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Expert</span>
                    <span className="sb_content">9</span>
                  </div>
                </li>
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Very Good</span>
                    <span className="sb_content">8.5</span>
                  </div>
                </li>
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Very Good</span>
                    <span className="sb_content">8</span>
                  </div>
                </li>
              </div>
              <div className="level__good">
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Good</span>
                    <span className="sb_content">7.5</span>
                  </div>
                </li>
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Good</span>
                    <span className="sb_content">7</span>
                  </div>
                </li>
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Competent</span>
                    <span className="sb_content">6.5</span>
                  </div>
                </li>
              </div>
              <div className="level__competent">
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Competent</span>
                    <span className="sb_content">6.5</span>
                  </div>
                </li>
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Competent</span>
                    <span className="sb_content">6</span>
                  </div>
                </li>
              </div>
              <div className="level__modest">
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Modest</span>
                    <span className="sb_content">5.5</span>
                  </div>
                </li>
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Modest</span>
                    <span className="sb_content">5</span>
                  </div>
                </li>
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Limited</span>
                    <span className="sb_content">4.5</span>
                  </div>
                </li>
              </div>
              <div className="level__limited">
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Limited</span>
                    <span className="sb_content">4</span>
                  </div>
                </li>
                <li>
                  <div className="course__summery__item text-dark">
                    <span className="sb_label">Extremely Limited</span>
                    <span className="sb_content"> 3.5</span>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;