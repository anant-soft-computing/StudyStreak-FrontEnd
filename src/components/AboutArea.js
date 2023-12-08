import React from "react";
import { Link } from "react-router-dom";
import about2 from "../img/about/about_2.png";
import about3 from "../img/about/about_3.png";
import about4 from "../img/about/about_4.png";
import about11 from "../img/about/about_11.png";

const AboutArea = () => {
  return (
    <div className="aboutarea__2 sp_top_100">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
            data-aos="fade-up"
          >
            <div className="about__right__wraper__2">
              <div className="educationarea__img" data-tilt>
                <img
                  className="aboutarea__2__img__1"
                  src={about2}
                  alt="education"
                />
                <img
                  className="aboutarea__2__img__2"
                  src={about3}
                  alt="education"
                />
                <img
                  className="aboutarea__2__img__3"
                  src={about4}
                  alt="education"
                />
                <img
                  className="aboutarea__2__img__4"
                  src={about11}
                  alt="education"
                />
              </div>
              <div className="aboutarea__2__text">
                <div className="aboutarea__counter">
                  <span className="counter">25</span> +
                </div>
                <p>YEARS EXPERIENCE JUST ACHIEVED</p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
            data-aos="fade-up"
          >
            <div className="aboutarea__content__wraper">
              <div className="aboutarea__button">
                <div className="default__small__button">
                  <Link to="/about">About Us</Link>
                </div>
              </div>
              <div className="aboutarea__headding heading__underline">
                <h2>
                  Welcome to another best <span>University</span> in the world.
                </h2>
              </div>
              <div className="aboutarea__para aboutarea__para__2">
                <p>
                  25+Contrary to popular belief, Lorem Ipsum is not simply
                  random text roots in a piece of classical Latin literature
                  from 45 BC
                </p>
              </div>
              <div className="aboutarea__list__2">
                <ul>
                  <li>
                    <i className="icofont-check"></i> Lorem Ipsum is simply
                    dummy
                  </li>
                  <li>
                    <i className="icofont-check"></i> Explore a variety of fresh
                    educational teach
                  </li>
                  <li>
                    <i className="icofont-check"></i> Lorem Ipsum is simply
                    dummy text of
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

export default AboutArea;
