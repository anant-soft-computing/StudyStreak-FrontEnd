import React from "react";
import { Link } from "react-router-dom";
import DarkNight from "../../DarkNight";
import TopBar from "../../Topbar";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import DSNavBar from "./DSNavbar/DSNavbar";
import grid1 from "../../../img/grid/grid_1.png";
import grid2 from "../../../img/grid/grid_2.png";
import grid3 from "../../../img/grid/grid_3.png";
import grid8 from "../../../img/grid/grid_8.png";
import grids1 from "../../../img/grid/grid_small_1.jpg";
import grids2 from "../../../img/grid/grid_small_2.jpg";
import grids3 from "../../../img/grid/grid_small_3.jpg";
import DSSidebar from "./DSSidebar/DSSidebar";

const Ecourses = () => {
  return (
    <>
      <DarkNight />
      <TopBar />
      <Navbar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="dashboardarea sp_bottom_100">
            <DSNavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>My Profile</h4>
                      </div>
                      <div className="row">
                        <div
                          className="col-xl-12 aos-init aos-animate"
                          data-aos="fade-up"
                        >
                          <ul
                            className="nav  about__button__wrap dashboard__button__wrap"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link active"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__one"
                                type="button"
                                aria-selected="true"
                                role="tab"
                              >
                                Enrolled Courses
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__two"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabindex="-1"
                              >
                                Active Courses
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__three"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabindex="-1"
                              >
                                Completed Courses
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className="tab-content tab__content__wrapper aos-init aos-animate"
                          id="myTabContent"
                          data-aos="fade-up"
                        >
                          <div
                            className="tab-pane fade active show"
                            id="projects__one"
                            role="tabpanel"
                            aria-labelledby="projects__one"
                          >
                            <div className="row">
                              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div className="gridarea__wraper">
                                  <div className="gridarea__img">
                                    <Link to="/course-details">
                                      <img src={grid1} alt="grid" />
                                    </Link>
                                    <div className="gridarea__small__button">
                                      <div className="grid__badge">
                                        Data &amp; Tech
                                      </div>
                                    </div>
                                    <div className="gridarea__small__icon">
                                      <Link to="#">
                                        <i className="icofont-heart-alt"></i>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="gridarea__content">
                                    <div className="gridarea__list">
                                      <ul>
                                        <li>
                                          <i className="icofont-book-alt"></i>{" "}
                                          23 Lesson
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          1 hr 30 min
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>
                                        <Link to="/course-details">
                                          Foundation course to under stand about
                                          softwere
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="gridarea__price">
                                      $32.00 <del>/ $67.00</del>
                                      <span>
                                        {" "}
                                        <del className="del__2">Free</del>
                                      </span>
                                    </div>
                                    <div className="gridarea__bottom">
                                      <Link to="/instructor-details">
                                        <div className="gridarea__small__img">
                                          <img src={grids1} alt="grid" />
                                          <div className="gridarea__small__content">
                                            <h6>Micle Jhon</h6>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="gridarea__star">
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <span>(44)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid__course__status populerarea__button">
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow="100"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: "100%" }}
                                      >
                                        100% Complete
                                      </div>
                                    </div>

                                    <Link className="default__button" to="#">
                                      Download Certificate
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div className="gridarea__wraper">
                                  <div className="gridarea__img">
                                    <img src={grid2} alt="grid" />
                                    <div className="gridarea__small__button">
                                      <div className="grid__badge blue__color">
                                        Mechanical
                                      </div>
                                    </div>
                                    <div className="gridarea__small__icon">
                                      <Link to="#">
                                        <i className="icofont-heart-alt"></i>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="gridarea__content">
                                    <div className="gridarea__list">
                                      <ul>
                                        <li>
                                          <i className="icofont-book-alt"></i>{" "}
                                          29 Lesson
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          2 hr 10 min
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>
                                        <Link to="#">
                                          Nidnies course to under stand about
                                          softwere
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="gridarea__price green__color">
                                      $32.00<del>/$67.00</del>
                                      <span>.Free</span>
                                    </div>
                                    <div className="gridarea__bottom">
                                      <Link to="/instructor-details">
                                        <div className="gridarea__small__img">
                                          <img src={grids2} alt="grid" />
                                          <div className="gridarea__small__content">
                                            <h6>Rinis Jhon</h6>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="gridarea__star">
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <span>(44)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid__course__status populerarea__button">
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow="100"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: "100%" }}
                                      >
                                        100% Complete
                                      </div>
                                    </div>

                                    <Link className="default__button" to="#">
                                      Download Certificate
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div className="gridarea__wraper">
                                  <div className="gridarea__img">
                                    <img src={grid3} alt="grid" />
                                    <div className="gridarea__small__button">
                                      <div className="grid__badge blue__color">
                                        Mechanical
                                      </div>
                                    </div>
                                    <div className="gridarea__small__icon">
                                      <Link to="#">
                                        <i className="icofont-heart-alt"></i>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="gridarea__content">
                                    <div className="gridarea__list">
                                      <ul>
                                        <li>
                                          <i className="icofont-book-alt"></i>{" "}
                                          29 Lesson
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          2 hr 10 min
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>
                                        <Link to="#">
                                          Nidnies course to under stand about
                                          softwere
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="gridarea__price green__color">
                                      $32.00<del>/$67.00</del>
                                      <span>.Free</span>
                                    </div>
                                    <div className="gridarea__bottom">
                                      <Link to="/instructor-details">
                                        <div className="gridarea__small__img">
                                          <img src={grids2} alt="grid" />
                                          <div className="gridarea__small__content">
                                            <h6>Rinis Jhon</h6>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="gridarea__star">
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <span>(44)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid__course__status populerarea__button">
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow="100"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: "100%" }}
                                      >
                                        100% Complete
                                      </div>
                                    </div>

                                    <Link className="default__button" to="#">
                                      Download Certificate
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div className="gridarea__wraper">
                                  <div className="gridarea__img">
                                    <Link to="/course-details">
                                      <img src={grid1} alt="grid" />
                                    </Link>
                                    <div className="gridarea__small__button">
                                      <div className="grid__badge">
                                        Data &amp; Tech
                                      </div>
                                    </div>
                                    <div className="gridarea__small__icon">
                                      <Link to="#">
                                        <i className="icofont-heart-alt"></i>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="gridarea__content">
                                    <div className="gridarea__list">
                                      <ul>
                                        <li>
                                          <i className="icofont-book-alt"></i>{" "}
                                          23 Lesson
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          1 hr 30 min
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>
                                        <Link to="/course-details">
                                          Foundation course to under stand about
                                          softwere
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="gridarea__price">
                                      $32.00 <del>/ $67.00</del>
                                      <span>
                                        {" "}
                                        <del className="del__2">Free</del>
                                      </span>
                                    </div>
                                    <div className="gridarea__bottom">
                                      <Link to="/instructor-details">
                                        <div className="gridarea__small__img">
                                          <img src={grids1} alt="grid" />
                                          <div className="gridarea__small__content">
                                            <h6>Micle Jhon</h6>
                                          </div>
                                        </div>
                                      </Link>

                                      <div className="gridarea__star">
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <span>(44)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid__course__status populerarea__button">
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow="80"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: "80%" }}
                                      >
                                        80% Complete
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div className="gridarea__wraper">
                                  <div className="gridarea__img">
                                    <img src={grid2} alt="grid" />
                                    <div className="gridarea__small__button">
                                      <div className="grid__badge blue__color">
                                        Mechanical
                                      </div>
                                    </div>
                                    <div className="gridarea__small__icon">
                                      <Link to="#">
                                        <i className="icofont-heart-alt"></i>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="gridarea__content">
                                    <div className="gridarea__list">
                                      <ul>
                                        <li>
                                          <i className="icofont-book-alt"></i>{" "}
                                          29 Lesson
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          2 hr 10 min
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>
                                        <Link to="#">
                                          Nidnies course to under stand about
                                          softwere
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="gridarea__price green__color">
                                      $32.00<del>/$67.00</del>
                                      <span>.Free</span>
                                    </div>
                                    <div className="gridarea__bottom">
                                      <Link to="/instructor-details">
                                        <div className="gridarea__small__img">
                                          <img src={grids2} alt="grid" />
                                          <div className="gridarea__small__content">
                                            <h6>Rinis Jhon</h6>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="gridarea__star">
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <span>(44)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid__course__status populerarea__button">
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow="70"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: "70%" }}
                                      >
                                        70% Complete
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div className="gridarea__wraper">
                                  <div className="gridarea__img">
                                    <Link to="/course-details">
                                      <img src={grid8} alt="grid" />
                                    </Link>
                                    <div className="gridarea__small__button">
                                      <div className="grid__badge pink__color">
                                        Development
                                      </div>
                                    </div>
                                    <div className="gridarea__small__icon">
                                      <Link to="#">
                                        <i className="icofont-heart-alt"></i>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="gridarea__content">
                                    <div className="gridarea__list">
                                      <ul>
                                        <li>
                                          <i className="icofont-book-alt"></i>{" "}
                                          25 Lesson
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          1 hr 40 min
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>
                                        <Link to="/course-details">
                                          Minws course to under stand about
                                          solution
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="gridarea__price">
                                      $40.00 <del>/ $67.00</del>
                                      <span>
                                        {" "}
                                        <del className="del__2">Free</del>
                                      </span>
                                    </div>
                                    <div className="gridarea__bottom">
                                      <Link to="/instructor-details">
                                        <div className="gridarea__small__img">
                                          <img src={grids3} alt="grid" />
                                          <div className="gridarea__small__content">
                                            <h6>Micle Jhon</h6>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="gridarea__star">
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <span>(44)</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__two"
                            role="tabpanel"
                            aria-labelledby="projects__two"
                          >
                            <div className="row">
                              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div className="gridarea__wraper">
                                  <div className="gridarea__img">
                                    <Link to="/course-details">
                                      <img src={grid1} alt="grid" />
                                    </Link>
                                    <div className="gridarea__small__button">
                                      <div className="grid__badge">
                                        Data &amp; Tech
                                      </div>
                                    </div>
                                    <div className="gridarea__small__icon">
                                      <Link to="#">
                                        <i className="icofont-heart-alt"></i>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="gridarea__content">
                                    <div className="gridarea__list">
                                      <ul>
                                        <li>
                                          <i className="icofont-book-alt"></i>{" "}
                                          23 Lesson
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          1 hr 30 min
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>
                                        <Link to="/course-details">
                                          Foundation course to under stand about
                                          softwere
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="gridarea__price">
                                      $32.00 <del>/ $67.00</del>
                                      <span>
                                        {" "}
                                        <del className="del__2">Free</del>
                                      </span>
                                    </div>
                                    <div className="gridarea__bottom">
                                      <Link to="/instructor-details">
                                        <div className="gridarea__small__img">
                                          <img src={grids1} alt="grid" />
                                          <div className="gridarea__small__content">
                                            <h6>Micle Jhon</h6>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="gridarea__star">
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <span>(44)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid__course__status populerarea__button">
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow="80"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: "80%" }}
                                      >
                                        80% Complete
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div className="gridarea__wraper">
                                  <div className="gridarea__img">
                                    <img src={grid2} alt="grid" />
                                    <div className="gridarea__small__button">
                                      <div className="grid__badge blue__color">
                                        Mechanical
                                      </div>
                                    </div>
                                    <div className="gridarea__small__icon">
                                      <Link to="#">
                                        <i className="icofont-heart-alt"></i>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="gridarea__content">
                                    <div className="gridarea__list">
                                      <ul>
                                        <li>
                                          <i className="icofont-book-alt"></i>{" "}
                                          29 Lesson
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          2 hr 10 min
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>
                                        <Link to="#">
                                          Nidnies course to under stand about
                                          softwere
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="gridarea__price green__color">
                                      $32.00<del>/$67.00</del>
                                      <span>.Free</span>
                                    </div>
                                    <div className="gridarea__bottom">
                                      <Link to="/instructor-details">
                                        <div className="gridarea__small__img">
                                          <img src={grids2} alt="grid" />
                                          <div className="gridarea__small__content">
                                            <h6>Rinis Jhon</h6>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="gridarea__star">
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <span>(44)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid__course__status populerarea__button">
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow="70"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: "70%" }}
                                      >
                                        70% Complete
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__three"
                            role="tabpanel"
                            aria-labelledby="projects__three"
                          >
                            <div className="row">
                              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div className="gridarea__wraper">
                                  <div className="gridarea__img">
                                    <Link to="/course-details">
                                      <img src={grid1} alt="grid" />
                                    </Link>
                                    <div className="gridarea__small__button">
                                      <div className="grid__badge">
                                        Data &amp; Tech
                                      </div>
                                    </div>
                                    <div className="gridarea__small__icon">
                                      <Link to="#">
                                        <i className="icofont-heart-alt"></i>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="gridarea__content">
                                    <div className="gridarea__list">
                                      <ul>
                                        <li>
                                          <i className="icofont-book-alt"></i>{" "}
                                          23 Lesson
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          1 hr 30 min
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>
                                        <Link to="/course-details">
                                          Foundation course to under stand about
                                          softwere
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="gridarea__price">
                                      $32.00 <del>/ $67.00</del>
                                      <span>
                                        {" "}
                                        <del className="del__2">Free</del>
                                      </span>
                                    </div>
                                    <div className="gridarea__bottom">
                                      <Link to="/instructor-details">
                                        <div className="gridarea__small__img">
                                          <img src={grids1} alt="grid" />
                                          <div className="gridarea__small__content">
                                            <h6>Micle Jhon</h6>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="gridarea__star">
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <span>(44)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid__course__status populerarea__button">
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow="100"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: "100%" }}
                                      >
                                        100% Complete
                                      </div>
                                    </div>
                                    <Link className="default__button" to="#">
                                      Download Certificate
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div className="gridarea__wraper">
                                  <div className="gridarea__img">
                                    <img src={grid2} alt="grid" />
                                    <div className="gridarea__small__button">
                                      <div className="grid__badge blue__color">
                                        Mechanical
                                      </div>
                                    </div>
                                    <div className="gridarea__small__icon">
                                      <Link to="#">
                                        <i className="icofont-heart-alt"></i>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="gridarea__content">
                                    <div className="gridarea__list">
                                      <ul>
                                        <li>
                                          <i className="icofont-book-alt"></i>{" "}
                                          29 Lesson
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          2 hr 10 min
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>
                                        <Link to="#">
                                          Nidnies course to under stand about
                                          softwere
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="gridarea__price green__color">
                                      $32.00<del>/$67.00</del>
                                      <span>.Free</span>
                                    </div>
                                    <div className="gridarea__bottom">
                                      <Link to="/instructor-details">
                                        <div className="gridarea__small__img">
                                          <img src={grids2} alt="grid" />
                                          <div className="gridarea__small__content">
                                            <h6>Rinis Jhon</h6>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="gridarea__star">
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <span>(44)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid__course__status populerarea__button">
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow="100"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: "100%" }}
                                      >
                                        100% Complete
                                      </div>
                                    </div>
                                    <Link className="default__button" to="#">
                                      Download Certificate
                                    </Link>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                <div className="gridarea__wraper">
                                  <div className="gridarea__img">
                                    <img src={grid3} alt="grid" />
                                    <div className="gridarea__small__button">
                                      <div className="grid__badge blue__color">
                                        Mechanical
                                      </div>
                                    </div>
                                    <div className="gridarea__small__icon">
                                      <Link to="#">
                                        <i className="icofont-heart-alt"></i>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="gridarea__content">
                                    <div className="gridarea__list">
                                      <ul>
                                        <li>
                                          <i className="icofont-book-alt"></i>{" "}
                                          29 Lesson
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          2 hr 10 min
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>
                                        <Link to="#">
                                          Nidnies course to under stand about
                                          softwere
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="gridarea__price green__color">
                                      $32.00<del>/$67.00</del>
                                      <span>.Free</span>
                                    </div>
                                    <div className="gridarea__bottom">
                                      <Link to="/instructor-details">
                                        <div className="gridarea__small__img">
                                          <img src={grids2} alt="grid" />
                                          <div className="gridarea__small__content">
                                            <h6>Rinis Jhon</h6>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="gridarea__star">
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <i className="icofont-star"></i>
                                        <span>(44)</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid__course__status populerarea__button">
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        aria-valuenow="100"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: "100%" }}
                                      >
                                        100% Complete
                                      </div>
                                    </div>
                                    <Link className="default__button" to="#">
                                      Download Certificate
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Ecourses;
