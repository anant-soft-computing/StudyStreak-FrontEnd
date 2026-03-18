import React from "react";
import IELTS from "../../img/brand/ielts.png";
import TOFEL from "../../img/brand/tofel.png";
import PTE from "../../img/brand/output.png";
import DUOLINGO from "../../img/brand/duolingo.png";
import GRE from "../../img/brand/gre.png";
import GMAT from "../../img/brand/gmat.png";

const Scrollar = () => {
  return (
    <div className="animate__content sp_bottom_40 sp_top_40">
      <div className="container-fluid full__width__padding">
        <div className="animate__content__wrap">
          <div className="single__service">
            <div className="service__img">
              <img src={IELTS} alt="ielts" />
            </div>
            <div className="service__content">
              <h3>
                <div>IELTS</div>
              </h3>
              <p>International English Language Testing System</p>
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
              <img src={TOFEL} alt="TOFEL" />
            </div>
            <div className="service__content">
              <h3>
                <div>TOFEL</div>
              </h3>
              <p>Test of English as a Foreign Language</p>
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
              <img src={PTE} alt="PTE" />
            </div>
            <div className="service__content">
              <h3>
                <div>PTE</div>
              </h3>
              <p>Pearson Test of English</p>
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
              <img src={DUOLINGO} alt="DUOLINGO" />
            </div>
            <div className="service__content">
              <h3>
                <div>Duolingo</div>
              </h3>
              <p>Duolingo</p>
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
              <img src={GRE} alt="GRE" />
            </div>
            <div className="service__content">
              <h3>
                <div>GRE</div>
              </h3>
              <p>Graduate Record Examinations</p>
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
            <img src={GMAT} alt="GMAT" />
            </div>
            <div className="service__content">
              <h3>
                <div>GMAT</div>
              </h3>
              <p>Graduate Management Admission Test</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scrollar;
