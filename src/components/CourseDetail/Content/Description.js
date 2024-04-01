import React from "react";

const Description = ({ courseDetail }) => {
  return (
    <div
      className="tab-pane fade"
      id="projects__two"
      role="tabpanel"
      aria-labelledby="projects__two"
    >
      <div className="experence__heading">
        <h5>Experience Description</h5>
      </div>
      <div className="experence__description">
        <div
          dangerouslySetInnerHTML={{
            __html: courseDetail?.Description,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Description;