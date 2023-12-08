import React from "react";
import { Link } from "react-router-dom";
import about5 from "../img/about/about_5.png";
import about6 from "../img/about/about_6.png";
import about7 from "../img/about/about_7.png";
import about9 from "../img/about/about_9.png";

const AboutSection = () => {
  return (
    <div className="aboutarea__3 testimonial__area__2 sp_bottom_90 sp_top_120">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 custom__review__grid"
            data-aos="fade-up"
          >
            <div className="section__title aboutarea__3__section__title">
              <div className="section__title__button">
                <div className="default__small__button">Course List</div>
              </div>
              <div className="section__title__heading">
                <h2>
                  What They Say
                  <br />
                  About us
                </h2>
              </div>
            </div>
            <div className="aboutarea__3__content">
              <p>
                Construction is a general term meaning the art and science to
                form systems organizations and comes from Latin Construction is
              </p>
            </div>
            <div className="aboutarea__3__button">
              <Link className="default__button" to="#">
                Explore More
                <i className="icofont-long-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 custom__review__grid"
            data-aos="fade-up"
          >
            <div className="aboutarea__content__wraper__3">
              <div className="aboutarea__para__3">
                <p>
                  “The other hand we denounce righteou indg ation men who are so
                  beguiled and demoralized by the the moment. Dislike men who so
                  development co”
                </p>
                <div className="aboutarea__icon__3">
                  <i className="icofont-quote-left"></i>
                </div>
              </div>
              <div className="aboutarea__img__3">
                <img src={about5} alt="about" />
                <div className="aboutarea__img__name">
                  <h6>Robind Jon</h6>
                  <p>Designer TechBoot</p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 custom__review__grid"
            data-aos="fade-up"
          >
            <div className="aboutarea__content__wraper__3">
              <div className="aboutarea__para__3">
                <p>
                  “The other hand we denounce righteou indg ation men who are so
                  beguiled and demoralized by the the moment. Dislike men who so
                  development co”
                </p>
                <div className="aboutarea__icon__3">
                  <i className="icofont-quote-left"></i>
                </div>
              </div>
              <div className="aboutarea__img__3">
                <img src={about5} alt="about" />
                <div className="aboutarea__img__name">
                  <h6>Robind Jon</h6>
                  <p>Designer TechBoot</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="aboutarea__img__3">
        <img className="aboutarea__3__img__1" src={about6} alt="about" />
        <img className="aboutarea__3__img__2" src={about7} alt="about" />
        <img className="aboutarea__3__img__3" src={about9} alt="about" />
      </div>
    </div>
  );
};

export default AboutSection;
