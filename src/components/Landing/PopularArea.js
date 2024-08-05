import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../img/service/service__shape__1.png";
import img2 from "../../img/service/service__shape__bg__1.png";
import img3 from "../../img/icon/chat-app.png";
import img4 from "../../img/icon/machine-learning.png";
import img5 from "../../img/icon/virtual-reality.png";
import img6 from "../../img/icon/artificial-intelligence.png";

const PopulerArea = () => {
  return (
    <div className="populerarea__2 sp_top_50 sp_bottom_50">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 about__wrap__content">
            <div className="service__animate__shape__1">
              <img src={img1} alt="" />
            </div>
            <div className="populerarea__content__wraper__2">
              <div className="section__title">
                <div className="section__title__heading">
                  <h2>Created For Success</h2>
                </div>
              </div>
              <div className="populerarea__content__2">
                <p className="populerarea__para__1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officia, ducimus officiis quisquam sint dolore reprehenderit
                  iure rem corporis eligendi ea.
                </p>
                <p className="populerarea__para__2">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo
                  quas consequatur quis optio eveniet soluta vel nobis, illo
                  praesentium quaerat.
                </p>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 service__wrap__content">
            <div className="service__animate__shape__2">
              <img src={img2} alt="" />
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="single__service">
                  <div className="service__img">
                    <img src={img3} alt="" />
                  </div>
                  <div className="service__content service__content__2">
                    <h3 className="logo_title">
                      <Link to="/course-detail">Instant Result</Link>
                    </h3>
                  </div>
                  <div className="service__small__img">
                    <svg
                      className="icon__hover__img"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5961 10.265L19 1.33069L10.0022 3.73285L1 6.1306L7.59393 12.6627L14.1879 19.1992L16.5961 10.265Z"
                        stroke="#FFB31F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="single__service">
                  <div className="service__img">
                    <img src={img4} alt="" />
                  </div>
                  <div className="service__content service__content__2">
                    <h3 className="logo_title">
                      <Link to="/course-detail">Real Time Tutor Support</Link>
                    </h3>
                  </div>
                  <div className="service__small__img">
                    <svg
                      className="icon__hover__img"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5961 10.265L19 1.33069L10.0022 3.73285L1 6.1306L7.59393 12.6627L14.1879 19.1992L16.5961 10.265Z"
                        stroke="#FFB31F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="single__service ss_margin">
                  <div className="service__img">
                    <img src={img5} alt="" />
                  </div>
                  <div className="service__content service__content__2">
                    <h3 className="logo_title">
                      <Link to="/course-detail">Live Classes</Link>
                    </h3>
                  </div>
                  <div className="service__small__img">
                    <svg
                      className="icon__hover__img"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5961 10.265L19 1.33069L10.0022 3.73285L1 6.1306L7.59393 12.6627L14.1879 19.1992L16.5961 10.265Z"
                        stroke="#FFB31F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="single__service">
                  <div className="service__img">
                    <img src={img6} alt="" />
                  </div>
                  <div className="service__content service__content__2">
                    <h3 className="logo_title">
                      <Link to="/course-detail">Great Community</Link>
                    </h3>
                  </div>
                  <div className="service__small__img">
                    <svg
                      className="icon__hover__img"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5961 10.265L19 1.33069L10.0022 3.73285L1 6.1306L7.59393 12.6627L14.1879 19.1992L16.5961 10.265Z"
                        stroke="#FFB31F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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

export default PopulerArea;
