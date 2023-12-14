import React from "react";
import grid1 from "../../img/grid/grid_1.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GridSection = () => {

  const settings = {
    dots: false,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="gridarea gridarea__2">
      <div className="container">
        <Slider {...settings}>
          <div className="gridarea__wraper">
            <div className="gridarea__img">
              <Link to="/course-detail">
                <img src={grid1} alt="grid" />
              </Link>
            </div>
            <div className="gridarea__content">
              <div className="gridarea__list">
                <ul>
                  <li>
                    <i className="icofont-book-alt"></i> 23 Lesson
                  </li>
                  <li>
                    <i className="icofont-clock-time"></i> 1 hr 30 min
                  </li>
                </ul>
              </div>
              <div className="gridarea__heading">
                <h3 className="gridarea_link">
                  <Link to="/course-detail">
                    Foundation course to understand about software
                  </Link>
                </h3>
              </div>
              <div className="gridarea__price">
                $32.00 <del>/$67.00</del>
                <span>
                  <del className="del__2">Free</del>
                </span>
              </div>
            </div>
          </div>
          <div className="gridarea__wraper">
            <div className="gridarea__img">
              <Link to="/course-detail">
                <img src={grid1} alt="grid" />
              </Link>
            </div>
            <div className="gridarea__content">
              <div className="gridarea__list">
                <ul>
                  <li>
                    <i className="icofont-book-alt"></i> 23 Lesson
                  </li>
                  <li>
                    <i className="icofont-clock-time"></i> 1 hr 30 min
                  </li>
                </ul>
              </div>
              <div className="gridarea__heading">
                <h3 className="gridarea_link">
                  <Link to="/course-detail">
                    Foundation course to understand about software
                  </Link>
                </h3>
              </div>
              <div className="gridarea__price">
                $32.00 <del>/$67.00</del>
                <span>
                  <del className="del__2">Free</del>
                </span>
              </div>
            </div>
          </div>
          <div className="gridarea__wraper">
            <div className="gridarea__img">
              <Link to="/course-detail">
                <img src={grid1} alt="grid" />
              </Link>
            </div>
            <div className="gridarea__content">
              <div className="gridarea__list">
                <ul>
                  <li>
                    <i className="icofont-book-alt"></i> 23 Lesson
                  </li>
                  <li>
                    <i className="icofont-clock-time"></i> 1 hr 30 min
                  </li>
                </ul>
              </div>
              <div className="gridarea__heading">
                <h3 className="gridarea_link">
                  <Link to="/course-detail">
                    Foundation course to understand about software
                  </Link>
                </h3>
              </div>
              <div className="gridarea__price">
                $32.00 <del>/$67.00</del>
                <span>
                  <del className="del__2">Free</del>
                </span>
              </div>
            </div>
          </div>
          <div className="gridarea__wraper">
            <div className="gridarea__img">
              <Link to="/course-detail">
                <img src={grid1} alt="grid" />
              </Link>
            </div>
            <div className="gridarea__content">
              <div className="gridarea__list">
                <ul>
                  <li>
                    <i className="icofont-book-alt"></i> 23 Lesson
                  </li>
                  <li>
                    <i className="icofont-clock-time"></i> 1 hr 30 min
                  </li>
                </ul>
              </div>
              <div className="gridarea__heading">
                <h3 className="gridarea_link">
                  <Link to="/course-detail">
                    Foundation course to understand about software
                  </Link>
                </h3>
              </div>
              <div className="gridarea__price">
                $32.00 <del>/$67.00</del>
                <span>
                  <del className="del__2">Free</del>
                </span>
              </div>
            </div>
          </div>
          <div className="gridarea__wraper">
            <div className="gridarea__img">
              <Link to="/course-detail">
                <img src={grid1} alt="grid" />
              </Link>
            </div>
            <div className="gridarea__content">
              <div className="gridarea__list">
                <ul>
                  <li>
                    <i className="icofont-book-alt"></i> 23 Lesson
                  </li>
                  <li>
                    <i className="icofont-clock-time"></i> 1 hr 30 min
                  </li>
                </ul>
              </div>
              <div className="gridarea__heading">
                <h3 className="gridarea_link">
                  <Link to="/course-detail">
                    Foundation course to understand about software
                  </Link>
                </h3>
              </div>
              <div className="gridarea__price">
                $32.00 <del>/$67.00</del>
                <span>
                  <del className="del__2">Free</del>
                </span>
              </div>
            </div>
          </div>
          <div className="gridarea__wraper">
            <div className="gridarea__img">
              <Link to="/course-detail">
                <img src={grid1} alt="grid" />
              </Link>
            </div>
            <div className="gridarea__content">
              <div className="gridarea__list">
                <ul>
                  <li>
                    <i className="icofont-book-alt"></i> 23 Lesson
                  </li>
                  <li>
                    <i className="icofont-clock-time"></i> 1 hr 30 min
                  </li>
                </ul>
              </div>
              <div className="gridarea__heading">
                <h3 className="gridarea_link">
                  <Link to="/course-detail">
                    Foundation course to understand about software
                  </Link>
                </h3>
              </div>
              <div className="gridarea__price">
                $32.00 <del>/$67.00</del>
                <span>
                  <del className="del__2">Free</del>
                </span>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default GridSection;
