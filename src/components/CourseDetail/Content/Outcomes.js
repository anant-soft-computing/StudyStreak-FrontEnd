import React from "react";

const Outcomes = ({ courseDetail }) => {
  return (
    <div
      className="tab-pane fade"
      id="projects__four"
      role="tabpanel"
      aria-labelledby="projects__four"
    >
      <div className="experence__heading">
        <h5>Outcomes</h5>
      </div>
      <div className="course__list__wraper">
        <div className="aboutarea__list__2 blog__details__list__2">
          {courseDetail?.Outcome?.map(({ description }, index) => (
            <ul key={index}>
              <li>
                <i className="icofont-check"></i>
                <p>{description}</p>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Outcomes;