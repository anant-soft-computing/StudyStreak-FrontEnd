import React from "react";

const Requirement = ({ courseDetail }) => {
  return (
    <div
      className="tab-pane fade"
      id="projects__three"
      role="tabpanel"
      aria-labelledby="projects__three"
    >
      <div className="course__list__wraper">
        <div className="aboutarea__list__2 blog__details__list__2">
          {courseDetail?.Requirements.length > 0 ? (
            <div>
              <div className="experence__heading">
                <h5>Requirements</h5>
              </div>
              {courseDetail?.Requirements?.map(({ description }, index) => (
                <ul key={index} style={{ paddingLeft: "0px" }}>
                  <li>
                    <i className="icofont-check"></i>
                    <p>{description}</p>
                  </li>
                </ul>
              ))}
            </div>
          ) : (
            <h5 className="text-center text-danger">
              No Requirement Available !!
            </h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default Requirement;
