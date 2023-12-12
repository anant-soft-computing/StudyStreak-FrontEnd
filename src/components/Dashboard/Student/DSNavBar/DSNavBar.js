import React from "react";
import dashboard2 from "../../../../img/dashbord/dashbord__2.jpg";
import { Link } from "react-router-dom";

const DSNavBar = () => {
  return (
    <div className="container-fluid full__width__padding">
      <div className="row">
        <div className="col-xl-12">
          <div className="dashboardarea__wraper">
            <div className="dashboardarea__img">
              <div className="dashboardarea__inner">
                <div className="dashboardarea__left">
                  <div className="dashboardarea__left__img">
                    <img src={dashboard2} alt="" />
                  </div>
                  <div className="dashboardarea__left__content">
                    <h5>Hello</h5>
                    <h4>Michle Obema</h4>
                  </div>
                </div>
                <div className="dashboardarea__right">
                  <div className="dashboardarea__right__button">
                    <Link className="default__button" to="/create-course">
                      Create a New Course
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-arrow-right"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DSNavBar;
