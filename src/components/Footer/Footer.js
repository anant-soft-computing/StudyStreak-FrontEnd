import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo/Logo.png";

const Footer = () => {
  return (
    <div className="footerarea">
      <div className="container">
        <div className="footerarea__newsletter__wraper">
          <div className="row">
            <div
              className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
              data-aos="fade-up"
            >
              <div className="footerarea__text">
                <h3>
                  Still You Need Our <span>Support</span> ?
                </h3>
                <p>
                  Don’t wait, make a smart & logical quote here. It's pretty
                  easy.
                </p>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"
              data-aos="fade-up"
            >
              <div className="footerarea__newsletter">
                <div className="footerarea__newsletter__input">
                  <form action="#">
                    <input type="text" placeholder="Enter your email here" />
                    <div className="footerarea__newsletter__button">
                      <button type="submit" className="subscribe__btn">
                        Subscribe Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footerarea__copyright__wrapper footerarea__copyright__wrapper__2">
          <div className="row">
            <div className="col-xl-3 col-lg-3">
              <div className="copyright__logo">
                <Link to="/">
                  <img className="logoSize" src={logo} alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="footerarea__copyright__content footerarea__copyright__content__2">
                <p>
                  Copyright © <span>2023</span> by StudyStreak. All Rights
                  Reserved.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3">
              <div className="footerarea__icon footerarea__icon__2">
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

export default Footer;
