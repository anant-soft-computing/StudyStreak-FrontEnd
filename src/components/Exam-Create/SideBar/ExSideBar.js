import React from "react";

const ExSideBar = () => {
  return (
    <>
      <div className="col-xl-3 col-lg-3 col-md-12">
        <div className="dashboard__inner sticky-top">
          <div className="dashboard__nav__title">
            <h6>Exam</h6>
          </div>
          <div className="dashboard__nav">
            <ul>
              <li style={{ cursor: "pointer" }}>Create Block</li>
              <li style={{ cursor: "pointer" }}>Create Test</li>
              <li style={{ cursor: "pointer" }}>Create Full Lenght Test</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExSideBar;
