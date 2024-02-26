import React from "react";
import { Link } from "react-router-dom";
import "../../css/style.css";
import IcoFont from "react-icofont";

const TopBar = () => {
  return (
    <div className="topbararea">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 ">
            <div className="topbar__left">
              <ul className="topbar_ul">
                <li>Call Us: +91 91069 95326 </li>
                <li>- Mail Us: reachus@studystreak.io</li>
              </ul>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6">
            <div className="topbar__right">
              <div className="topbar__icon">
                <IcoFont icon="location-pin" />
              </div>
              <div className="topbar__text">
                <p>IELTS | TOFEL | PTE | DUOLINGO | GRE | GMAT</p>
              </div>
              <div className="topbar__list">
                <ul>
                  <li>
                    <Link
                      to="https://www.facebook.com/espivisaconsultants/"
                      target="_blank"
                    >
                      <i className="icofont-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://twitter.com/espionline" target="_blank">
                      <i className="icofont-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.instagram.com/espiconsultants/?hl=en"
                      target="_blank"
                    >
                      <i className="icofont-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.youtube.com/channel/UCFcwCIfSD2_sL79XmR-M-fQ"
                      target="_blank"
                    >
                      <i className="icofont-youtube-play"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
