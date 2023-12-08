import React from "react";
import { Link } from "react-router-dom";
import DarkNight from "../DarkNight";
import TopBar from "../Topbar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import img1 from "../../img/herobanner/herobanner__1.png";
import img2 from "../../img/herobanner/herobanner__2.png";
import img3 from "../../img/herobanner/herobanner__3.png";
import img4 from "../../img/herobanner/herobanner__5.png";
import blog7 from "../../img/blog/blog_7.png";
import blog8 from "../../img/blog/blog_8.png";
import blog10 from "../../img/blog/blog_10.png";
import video from "../../img/dashbord/video.png";
import teacher1 from "../../img/teacher/teacher__1.png";
import teacher2 from "../../img/teacher/teacher__2.png";
import teacher3 from "../../img/teacher/teacher__3.png";
import grid1 from "../../img/grid/grid_1.png";
import grid1Small from "../../img/grid/grid_small_1.jpg";
import grid2 from "../../img/grid/grid_2.png";
import grid2Small from "../../img/grid/grid_small_2.jpg";
import blogDetail1 from '../../img/blog-details/blog-details__1.png';
import blogDetail2 from '../../img/blog-details/blog-details__2.png';
import blogDetail3 from '../../img/blog-details/blog-details__3.png';
import blogDetail4 from '../../img/blog-details/blog-details__4.png';
import blogDetail6 from '../../img/blog-details/blog-details__6.png';
import blogDetail7 from '../../img/blog-details/blog-details__7.png';
import blogDetail8 from '../../img/blog-details/blog-details__8.png';

const CourseDetails = () => {
  return (
    <>
      <DarkNight />
      <TopBar />
      <Navbar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="breadcrumbarea">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div
                    className="breadcrumb__content__wraper"
                    data-aos="fade-up"
                  >
                    <div className="breadcrumb__title">
                      <h2 className="heading">Course-Details</h2>
                    </div>
                    <div className="breadcrumb__inner">
                      <ul>
                        <li>
                          <Link to="/"/>
                        </li>
                        <li>Course-Details</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shape__icon__2">
              <img
                className="shape__icon__img shape__icon__img__1"
                src={img1}
                alt=""
              />
              <img
                className="shape__icon__img shape__icon__img__2"
                src={img2}
                alt=""
              />
              <img
                className="shape__icon__img shape__icon__img__3"
                src={img3}
                alt=""
              />
              <img
                className="shape__icon__img shape__icon__img__4"
                src={img4}
                alt=""
              />
            </div>
          </div>
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8">
                  <div
                    className="blogarae__img__2 course__details__img__2"
                    data-aos="fade-up"
                  >
                    <img src={blog8} alt="blog" />
                    <div className="registerarea__content course__details__video">
                      <div className="registerarea__video">
                        <div className="video__pop__btn">
                          <Link
                            className="video-btn"
                            to="https://www.youtube.com/watch?v=vHdclsdkp28"
                          >
                            {" "}
                            <img src={video} alt="" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="blog__details__content__wraper">
                    <div className="course__button__wraper" data-aos="fade-up">
                      <div className="course__button">
                        <Link to=" ">Featured</Link>
                        <Link className="course__2" to=" ">
                          Ux Design
                        </Link>
                      </div>
                      <div className="course__date">
                        <p>
                          Last Update:<span> Sep 29, 2023</span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="course__details__heading"
                      data-aos="fade-up"
                    >
                      <h3>Making Music with Other People</h3>
                    </div>
                    <div className="course__details__price" data-aos="fade-up">
                      <ul>
                        <li>
                          <div className="course__price">
                            $32.00 <del>/ $67.00</del>
                          </div>
                        </li>
                        <li>
                          <div className="course__details__date">
                            <i className="icofont-book-alt"></i> 23 Lesson
                          </div>
                        </li>
                        <li>
                          <div className="course__star">
                            <i className="icofont-star"></i>
                            <i className="icofont-star"></i>
                            <i className="icofont-star"></i>
                            <i className="icofont-star"></i>
                            <i className="icofont-star"></i>
                            <span>(44)</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="course__details__paragraph"
                      data-aos="fade-up"
                    >
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Curabitur vulputate vestibulum rhoncus, dolor eget
                        viverra pretium, dolor tellus aliquet nunc, vitae
                        ultricies erat elit eu lacus. Vestibulum non justo
                        consectetur, cursus ante, tincidunt sapien. Nulla quis
                        diam sit amet turpis interd enim. Vivamus faucibus ex
                        sed nibh egestas elementum. Mauris et bibendum dui.
                        Aenean consequat pulvinar luctus. Suspendisse
                        consectetur tristique
                      </p>
                    </div>
                    <h4 className="sidebar__title" data-aos="fade-up">
                      Course Details
                    </h4>
                    <div className="course__details__wraper" data-aos="fade-up">
                      <ul>
                        <li>
                          Instructor : <span> Mirnsdo.H</span>
                        </li>
                        <li>
                          Lectures : <span> 120 sub</span>
                        </li>
                        <li>
                          Duration : <span> 20h 41m 32s</span>
                        </li>
                        <li>
                          Enrolled : <span> 2 students</span>
                        </li>
                        <li>
                          Total : <span> 222 students</span>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          Course level : <span>Intermediate</span>
                        </li>
                        <li>
                          Language : <span>English spanish</span>
                        </li>
                        <li>
                          Price Discount : <span>-20%</span>
                        </li>
                        <li>
                          Regular Price : <span>$228/Mo</span>
                        </li>
                        <li>
                          Course Status : <span>Available</span>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="course__details__tab__wrapper"
                      data-aos="fade-up"
                    >
                      <div className="row">
                        <div className="col-xl-12">
                          <ul
                            className="nav  course__tap__wrap"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link active"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__two"
                                type="button"
                              >
                                <i className="icofont-book-alt"></i>Curriculum
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__one"
                                type="button"
                              >
                                <i className="icofont-paper"></i>Description
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__three"
                                type="button"
                              >
                                <i className="icofont-star"></i>Reviews
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__four"
                                type="button"
                              >
                                <i className="icofont-teacher"></i>Instructor
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="tab-content tab__content__wrapper"
                        id="myTabContent"
                      >
                        <div
                          className="tab-pane fade  active show"
                          id="projects__two"
                          role="tabpanel"
                          aria-labelledby="projects__two"
                        >
                          <div
                            className="accordion content__cirriculum__wrap"
                            id="accordionExample"
                          >
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingOne">
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  Intro Course content <span>02hr 35min</span>
                                </button>
                              </h2>
                              <div
                                id="collapseOne"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        22 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span className="question">
                                          <i className="icofont-eye"></i>{" "}
                                          Preview
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        05 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span className="question">
                                          <i className="icofont-eye"></i>{" "}
                                          Preview
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        10 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        15 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        08 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-file-text"></i>
                                      <h5>
                                        {" "}
                                        <span>Lesson 03 Exam :</span>
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span>
                                        <i className="icofont-lock"></i> 20 Ques
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingTwo">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseTwo"
                                  aria-expanded="false"
                                  aria-controls="collapseTwo"
                                >
                                  Course Fundamentals <span>1hr 35min</span>
                                </button>
                              </h2>
                              <div
                                id="collapseTwo"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingTwo"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        22 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        05 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        10 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        15 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        08 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-file-text"></i>
                                      <h5>
                                        {" "}
                                        <span>Lesson 03 Exam :</span>
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span>
                                        <i className="icofont-lock"></i> 20 Ques
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2
                                className="accordion-header"
                                id="headingThree"
                              >
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseThree"
                                  aria-expanded="false"
                                  aria-controls="collapseThree"
                                >
                                  Course Core Concept <span>3hr 10min</span>
                                </button>
                              </h2>
                              <div
                                id="collapseThree"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingThree"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        22 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        05 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        10 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        15 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        08 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-file-text"></i>
                                      <h5>
                                        {" "}
                                        <span>Lesson 03 Exam :</span>
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span>
                                        <i className="icofont-lock"></i> 20 Ques
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingFour">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseFour"
                                  aria-expanded="false"
                                  aria-controls="collapseFour"
                                >
                                  Course Key Features <span>2hr 10min</span>
                                </button>
                              </h2>
                              <div
                                id="collapseFour"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingFour"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        22 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        05 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        10 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        15 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        08 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-file-text"></i>
                                      <h5>
                                        {" "}
                                        <span>Lesson 03 Exam :</span>
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span>
                                        <i className="icofont-lock"></i> 20 Ques
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingFive">
                                <button
                                  className="accordion-button collapsed"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseFive"
                                  aria-expanded="false"
                                  aria-controls="collapseFive"
                                >
                                  Course Conclusion <span>2hr 10min</span>
                                </button>
                              </h2>
                              <div
                                id="collapseFive"
                                className="accordion-collapse collapse"
                                aria-labelledby="headingFive"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        22 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        05 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        10 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        15 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        {" "}
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        {" "}
                                        <i className="icofont-clock-time"></i>{" "}
                                        08 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span>
                                          <i className="icofont-lock"></i>
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-file-text"></i>
                                      <h5>
                                        {" "}
                                        <span>Lesson 03 Exam :</span>
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span>
                                        <i className="icofont-lock"></i> 20 Ques
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="projects__one"
                          role="tabpanel"
                          aria-labelledby="projects__one"
                        >
                          <div className="experence__heading">
                            <h5> Experience Description</h5>
                          </div>
                          <div className="experence__description">
                            <p className="description__1">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Curabitur vulputate vestibulum Phasellus
                              rhoncus, dolor eget viverra pretium, dolor tellus
                              aliquet nunc, vitae ultricies erat elit eu lacus.
                              Vestibulum non justo consectetur, cursus ante,
                              tincidunt sapien. Nulla quis diam sit amet turpis
                              interdum accumsan quis nec enim. Vivamus faucibus
                              ex sed nibh egestas elementum. Mauris et bibendum
                              dui. Aenean consequat pulvinar luctus
                            </p>
                            <p className="description__2">
                              We have covered many special events such as
                              fireworks, fairs, parades, races, walks, awards
                              ceremonies, fashion shows, sporting events, and
                              even a memorial service.
                            </p>
                            <p className="description__3">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Curabitur vulputate vestibulum Phasellus
                              rhoncus, dolor eget viverra pretium, dolor tellus
                              aliquet nunc, vitae ultricies erat elit eu lacus.
                              Vestibulum non justo consectetur, cursus ante,
                              tincidunt sapien. Nulla quis diam sit amet turpis
                              interdum accumsan quis nec enim. Vivamus faucibus
                              ex sed nibh egestas elementum. Mauris et bibendum
                              dui. Aenean consequat pulvinar luctus.
                            </p>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="projects__three"
                          role="tabpanel"
                          aria-labelledby="projects__three"
                        >
                          <div className="row">
                            <div className="col-lg-4">
                              <div className="review__box">
                                <div className="review__number">5.0</div>
                                <div className="review__icon">
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                </div>
                                <span>(17 Reviews)</span>
                              </div>
                            </div>
                            <div className="col-lg-8 col--30">
                              <div className="review__wrapper">
                                <div className="single__progress__bar">
                                  <div className="rating__text">
                                    5 <i className="icofont-star"></i>
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "100%" }}
                                      aria-valuenow="100"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="rating-value">10</span>
                                </div>
                                <div className="single__progress__bar">
                                  <div className="rating__text">
                                    4 <i className="icofont-star"></i>
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "80%" }}
                                      aria-valuenow="80"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="rating-value">5</span>
                                </div>
                                <div className="single__progress__bar">
                                  <div className="rating__text">
                                    3 <i className="icofont-star"></i>
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "60%" }}
                                      aria-valuenow="60"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="rating-value">3</span>
                                </div>
                                <div className="single__progress__bar">
                                  <div className="rating__text">
                                    2 <i className="icofont-star"></i>
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "30%" }}
                                      aria-valuenow="30"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="rating-value">2</span>
                                </div>
                                <div className="single__progress__bar">
                                  <div className="rating__text">
                                    1 <i className="icofont-star"></i>
                                  </div>
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: "10%" }}
                                      aria-valuenow="10"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                  <span className="rating-value">1</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="property__facts__feature property__facts__feature__2 ">
                            <h4>Customer Reviews</h4>
                            <ul className="property__comment">
                              <li className="property__comment__list">
                                <div className="property__comment__img">
                                  <img
                                    src={teacher2}
                                    alt=""
                                  />
                                </div>
                                <div className="property__comment__comment">
                                  <h6>
                                    <Link to=" ">Adam Smit</Link>
                                  </h6>
                                  <div className="property__sidebar__icon">
                                    <ul>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                    </ul>
                                  </div>
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Doloribus, omnis fugit
                                    corporis iste magnam ratione.
                                  </p>
                                  <span className="property__comment__reply__btn">
                                    September 2, 2023
                                  </span>
                                </div>
                              </li>
                              <li className="property__comment__list">
                                <div className="property__comment__img">
                                  <img
                                    src={teacher1}
                                    alt=""
                                  />
                                </div>
                                <div className="property__comment__comment">
                                  <h6>
                                    <Link to=" ">Adam Smit</Link>
                                  </h6>
                                  <div className="property__sidebar__icon">
                                    <ul>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                    </ul>
                                  </div>
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Doloribus, omnis fugit
                                    corporis iste magnam ratione.
                                  </p>
                                  <span className="property__comment__reply__btn">
                                    September 2, 2023
                                  </span>
                                </div>
                              </li>
                              <li className="property__comment__list">
                                <div className="property__comment__img">
                                  <img
                                    src={teacher3}
                                    alt=""
                                  />
                                </div>
                                <div className="property__comment__comment">
                                  <h6>
                                    <Link to=" ">Adam Smit</Link>
                                  </h6>
                                  <div className="property__sidebar__icon">
                                    <ul>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                      <li>
                                        <i className="icofont-star"></i>
                                      </li>
                                    </ul>
                                  </div>
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Doloribus, omnis fugit
                                    corporis iste magnam ratione.
                                  </p>
                                  <span className="property__comment__reply__btn">
                                    September 2, 2023
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <form action="#" className="add__a__review__wrapper">
                            <h4>Add a Review</h4>
                            <div className="add__a__review">
                              <h6>Your Ratings:</h6>
                              <div className="property__sidebar__icon">
                                <ul>
                                  <li>
                                    <i className="icofont-star"></i>
                                  </li>
                                  <li>
                                    <i className="icofont-star"></i>
                                  </li>
                                  <li>
                                    <i className="icofont-star"></i>
                                  </li>
                                  <li>
                                    <i className="icofont-star"></i>
                                  </li>
                                  <li>
                                    <i className="icofont-star"></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="add__a__review__input">
                              <textarea placeholder="Type your comments...."></textarea>
                            </div>
                            <div className="add__a__review__input">
                              <input
                                type="text"
                                placeholder="Type your name...."
                              />
                            </div>
                            <div className="add__a__review__input">
                              <input
                                type="email"
                                placeholder="Type your email...."
                              />
                            </div>
                            <div className="add__a__review__input">
                              <input
                                type="text"
                                name="website"
                                placeholder="Type your website...."
                              />
                            </div>
                            <label className="mb-0">
                              <input type="checkbox" name="agree" /> Save my
                              name, email, and website in this browser for the
                              next time I comment.
                            </label>
                            <div className="add__a__review__button">
                              <button className="default__button" type="submit">
                                Submit
                              </button>
                            </div>
                          </form>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="projects__four"
                          role="tabpanel"
                          aria-labelledby="projects__four"
                        >
                          <div className="blogsidebar__content__wraper__2 tab__instructor">
                            <div className="blogsidebar__content__inner__2">
                              <div className="blogsidebar__img__2">
                                <img src={blog10} alt="blog" />
                              </div>
                              <div className="tab__instructor__inner">
                                <div className="blogsidebar__name__2">
                                  <h5>
                                    <Link to=" "> Rosalina D. Willaim</Link>
                                  </h5>
                                  <p>Blogger/Photographer</p>
                                </div>
                                <div className="blog__sidebar__text__2">
                                  <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500s, when an unknown
                                    printer took a galley
                                  </p>
                                </div>
                                <div className="blogsidbar__icon__2">
                                  <ul>
                                    <li>
                                      <Link to=" ">
                                        <i className="icofont-facebook"></i>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to=" ">
                                        <i className="icofont-youtube-play"></i>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to=" ">
                                        <i className="icofont-instagram"></i>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to=" ">
                                        <i className="icofont-twitter"></i>
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="course__list__wraper" data-aos="fade-up">
                      <div className="blog__details__heading__2">
                        <h5>Why search Is Important ?</h5>
                      </div>
                      <div
                        className="aboutarea__list__2 blog__details__list__2"
                        data-aos="fade-up"
                      >
                        <ul>
                          <li>
                            <i className="icofont-check"></i>
                            <p>
                              Lorem Ipsum is simply dummying text of the
                              printing andtypesetting industry most of the
                              standard.
                            </p>
                          </li>
                          <li>
                            <i className="icofont-check"></i>
                            <p>
                              Lorem Ipsum is simply dummying text of the
                              printing andtypesetting industry most of the
                              standard.
                            </p>
                          </li>
                          <li>
                            <i className="icofont-check"></i>
                            <p>
                              Lorem Ipsum is simply dummying text of the
                              printing andtypesetting industry most of the
                              standard.
                            </p>
                          </li>
                          <li>
                            <i className="icofont-check"></i>
                            <p>
                              Lorem Ipsum is simply dummying text of the
                              printing andtypesetting industry most of the
                              standard.
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="blog__details__tag" data-aos="fade-up">
                      <ul>
                        <li className="heading__tag">Tag</li>
                        <li>
                          <Link to=" ">Business</Link>
                        </li>
                        <li>
                          <Link to=" ">Design</Link>
                        </li>
                        <li>
                          <Link to=" ">apps</Link>
                        </li>
                        <li>
                          <Link to=" ">data</Link>
                        </li>
                      </ul>
                      <ul className="share__list">
                        <li className="heading__tag">Share</li>
                        <li>
                          <Link to=" ">
                            <i className="icofont-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to=" ">
                            <i className="icofont-facebook"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to=" ">
                            <i className="icofont-instagram"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="online__course__wrap">
                      <div
                        className="instructor__heading__2"
                        data-aos="fade-up"
                      >
                        <h3>Author More Courses</h3>
                        <Link to="/courses">More Courses...</Link>
                      </div>
                      <div
                        className="row instructor__slider__active row__custom__class"
                        data-aos="fade-up"
                      >
                        <div className="col-xl-6 column__custom__class">
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
                                <Link to=" ">
                                  <i className="icofont-heart-alt"></i>
                                </Link>
                              </div>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 23
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 1 hr
                                    30 min
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
                                    <img
                                      src={grid1Small}
                                      alt="grid"
                                    />
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
                        <div className="col-xl-6 column__custom__class">
                          <div className="gridarea__wraper">
                            <div className="gridarea__img">
                              <img src={grid2} alt="grid" />
                              <div className="gridarea__small__button">
                                <div className="grid__badge blue__color">
                                  Mechanical
                                </div>
                              </div>
                              <div className="gridarea__small__icon">
                                <Link to=" ">
                                  <i className="icofont-heart-alt"></i>
                                </Link>
                              </div>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 29
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 2 hr
                                    10 min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link to=" ">
                                    Nidnies course to under stand about softwere
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
                                    <img
                                      src={grid2Small}
                                      alt="grid"
                                    />
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
                          </div>
                        </div>
                        <div className="col-xl-6 column__custom__class">
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
                                <Link to=" ">
                                  <i className="icofont-heart-alt"></i>
                                </Link>
                              </div>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 23
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 1 hr
                                    30 min
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
                                    <img
                                      src={grid1Small}
                                      alt="grid"
                                    />
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
                        <div className="col-xl-6 column__custom__class">
                          <div className="gridarea__wraper">
                            <div className="gridarea__img">
                              <img src={grid2} alt="grid" />
                              <div className="gridarea__small__button">
                                <div className="grid__badge blue__color">
                                  Mechanical
                                </div>
                              </div>
                              <div className="gridarea__small__icon">
                                <Link to=" ">
                                  <i className="icofont-heart-alt"></i>
                                </Link>
                              </div>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 29
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 2 hr
                                    10 min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link to=" ">
                                    Nidnies course to under stand about softwere
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
                                    <img
                                      src={grid2Small}
                                      alt="grid"
                                    />
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
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="blog__details__comment">
                      <div
                        className="blog__details__comment__heading"
                        data-aos="fade-up"
                      >
                        <h5>(04) Comment</h5>
                      </div>
                      <div
                        className="blog__details__comment__inner"
                        data-aos="fade-up"
                      >
                        <div className="author__img">
                          <img
                            src={blogDetail1}
                            alt="author"
                          />
                        </div>
                        <div className="author__content">
                          <div className="author__name">
                            <h6>
                              <Link to=" ">Rohan De Spond</Link>
                            </h6>
                            <p>25 january 2023</p>
                          </div>
                          <div className="author__text">
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum available, but the majority have. There are
                              many variations of passages of Lorem Ipsum
                              available, but the majority have
                            </p>
                          </div>
                        </div>
                        <div className="author__icon">
                          <button>
                            <svg
                              width="26"
                              height="19"
                              viewBox="0 0 26 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.91943 10.2031L12.1694 16.4531C13.3413 17.625 15.3726 16.8047 15.3726 15.125V12.3516C19.9819 12.5469 20.0991 13.5625 19.4351 15.8672C18.9272 17.5469 20.8413 18.9141 22.2866 17.9375C24.2788 16.5703 25.3726 14.8516 25.3726 12.3516C25.3726 6.76562 20.3726 5.67188 15.3726 5.47656V2.66406C15.3726 0.984375 13.3413 0.164062 12.1694 1.33594L5.91943 7.58594C5.17725 8.28906 5.17725 9.5 5.91943 10.2031ZM7.24756 8.875L13.4976 2.625V7.3125C18.1851 7.3125 23.4976 7.58594 23.4976 12.3516C23.4976 14.5391 22.3647 15.6328 21.2319 16.375C22.8335 11.0625 18.8491 10.4375 13.4976 10.4375V15.125L7.24756 8.875ZM0.919434 7.58594C0.177246 8.28906 0.177246 9.5 0.919434 10.2031L7.16943 16.4531C7.95068 17.2734 9.12256 17.1562 9.82568 16.4531L2.24756 8.875L9.82568 1.33594C9.12256 0.632812 7.95068 0.515625 7.16943 1.33594L0.919434 7.58594Z"
                                fill="#121416"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div
                        className="blog__details__comment__inner author__padding__left"
                        data-aos="fade-up"
                      >
                        <div className="author__img">
                          <img
                            src={blogDetail2}
                            alt="author"
                          />
                        </div>
                        <div className="author__content">
                          <div className="author__name">
                            <h6>
                              <Link to=" ">Rohan De Spond</Link>
                            </h6>
                            <p>25 january 2023</p>
                          </div>
                          <div className="author__text">
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum available, but the majority have. There are
                              many variations of passages of Lorem Ipsum
                              available, but the majority have
                            </p>
                          </div>
                        </div>
                        <div className="author__icon">
                          <button>
                            <svg
                              width="26"
                              height="19"
                              viewBox="0 0 26 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.91943 10.2031L12.1694 16.4531C13.3413 17.625 15.3726 16.8047 15.3726 15.125V12.3516C19.9819 12.5469 20.0991 13.5625 19.4351 15.8672C18.9272 17.5469 20.8413 18.9141 22.2866 17.9375C24.2788 16.5703 25.3726 14.8516 25.3726 12.3516C25.3726 6.76562 20.3726 5.67188 15.3726 5.47656V2.66406C15.3726 0.984375 13.3413 0.164062 12.1694 1.33594L5.91943 7.58594C5.17725 8.28906 5.17725 9.5 5.91943 10.2031ZM7.24756 8.875L13.4976 2.625V7.3125C18.1851 7.3125 23.4976 7.58594 23.4976 12.3516C23.4976 14.5391 22.3647 15.6328 21.2319 16.375C22.8335 11.0625 18.8491 10.4375 13.4976 10.4375V15.125L7.24756 8.875ZM0.919434 7.58594C0.177246 8.28906 0.177246 9.5 0.919434 10.2031L7.16943 16.4531C7.95068 17.2734 9.12256 17.1562 9.82568 16.4531L2.24756 8.875L9.82568 1.33594C9.12256 0.632812 7.95068 0.515625 7.16943 1.33594L0.919434 7.58594Z"
                                fill="#121416"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div
                        className="blog__details__comment__inner"
                        data-aos="fade-up"
                      >
                        <div className="author__img">
                          <img
                            src={blogDetail3}
                            alt="author"
                          />
                        </div>
                        <div className="author__content">
                          <div className="author__name">
                            <h6>
                              <Link to=" ">Rohan De Spond</Link>
                            </h6>
                            <p>25 january 2023</p>
                          </div>
                          <div className="author__text">
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum available, but the majority have. There are
                              many variations of passages of Lorem Ipsum
                              available, but the majority have
                            </p>
                          </div>
                        </div>
                        <div className="author__icon">
                          <button>
                            <svg
                              width="26"
                              height="19"
                              viewBox="0 0 26 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.91943 10.2031L12.1694 16.4531C13.3413 17.625 15.3726 16.8047 15.3726 15.125V12.3516C19.9819 12.5469 20.0991 13.5625 19.4351 15.8672C18.9272 17.5469 20.8413 18.9141 22.2866 17.9375C24.2788 16.5703 25.3726 14.8516 25.3726 12.3516C25.3726 6.76562 20.3726 5.67188 15.3726 5.47656V2.66406C15.3726 0.984375 13.3413 0.164062 12.1694 1.33594L5.91943 7.58594C5.17725 8.28906 5.17725 9.5 5.91943 10.2031ZM7.24756 8.875L13.4976 2.625V7.3125C18.1851 7.3125 23.4976 7.58594 23.4976 12.3516C23.4976 14.5391 22.3647 15.6328 21.2319 16.375C22.8335 11.0625 18.8491 10.4375 13.4976 10.4375V15.125L7.24756 8.875ZM0.919434 7.58594C0.177246 8.28906 0.177246 9.5 0.919434 10.2031L7.16943 16.4531C7.95068 17.2734 9.12256 17.1562 9.82568 16.4531L2.24756 8.875L9.82568 1.33594C9.12256 0.632812 7.95068 0.515625 7.16943 1.33594L0.919434 7.58594Z"
                                fill="#121416"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div
                        className="blog__details__comment__inner author__padding__left"
                        data-aos="fade-up"
                      >
                        <div className="author__img">
                          <img
                            src={blogDetail4}
                            alt="author"
                          />
                        </div>
                        <div className="author__content">
                          <div className="author__name">
                            <h6>
                              <Link to=" ">Rohan De Spond</Link>
                            </h6>
                            <p>25 january 2023</p>
                          </div>
                          <div className="author__text">
                            <p>
                              There are many variations of passages of Lorem
                              Ipsum available, but the majority have. There are
                              many variations of passages of Lorem Ipsum
                              available, but the majority have
                            </p>
                          </div>
                        </div>
                        <div className="author__icon">
                          <button>
                            <svg
                              width="26"
                              height="19"
                              viewBox="0 0 26 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.91943 10.2031L12.1694 16.4531C13.3413 17.625 15.3726 16.8047 15.3726 15.125V12.3516C19.9819 12.5469 20.0991 13.5625 19.4351 15.8672C18.9272 17.5469 20.8413 18.9141 22.2866 17.9375C24.2788 16.5703 25.3726 14.8516 25.3726 12.3516C25.3726 6.76562 20.3726 5.67188 15.3726 5.47656V2.66406C15.3726 0.984375 13.3413 0.164062 12.1694 1.33594L5.91943 7.58594C5.17725 8.28906 5.17725 9.5 5.91943 10.2031ZM7.24756 8.875L13.4976 2.625V7.3125C18.1851 7.3125 23.4976 7.58594 23.4976 12.3516C23.4976 14.5391 22.3647 15.6328 21.2319 16.375C22.8335 11.0625 18.8491 10.4375 13.4976 10.4375V15.125L7.24756 8.875ZM0.919434 7.58594C0.177246 8.28906 0.177246 9.5 0.919434 10.2031L7.16943 16.4531C7.95068 17.2734 9.12256 17.1562 9.82568 16.4531L2.24756 8.875L9.82568 1.33594C9.12256 0.632812 7.95068 0.515625 7.16943 1.33594L0.919434 7.58594Z"
                                fill="#121416"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="blog__details__form">
                      <div
                        className="blog__details__input__heading"
                        data-aos="fade-up"
                      >
                        <h5>Write your comment</h5>
                      </div>
                      <div className="row">
                        <div className="col-xl-6" data-aos="fade-up">
                          <div className="blog__details__input">
                            <input type="text" placeholder="Enter your name*" />
                          </div>
                        </div>
                        <div className="col-xl-6" data-aos="fade-up">
                          <div className="blog__details__input">
                            <input
                              type="text"
                              placeholder="Enter your mail**"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6" data-aos="fade-up">
                          <div className="blog__details__input">
                            <input
                              type="text"
                              placeholder="Enter your  number*"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6" data-aos="fade-up">
                          <div className="blog__details__input">
                            <input type="text" placeholder="Website*" />
                          </div>
                        </div>
                        <div className="col-xl-12" data-aos="fade-up">
                          <div className="blog__details__input">
                            <textarea cols="30" rows="10">
                              Enter your Massage*
                            </textarea>
                          </div>
                        </div>
                      </div>
                      <div className="blog__check__box" data-aos="fade-up">
                        <input type="checkbox" checked="checked" /> Save my
                        name, email, and website in this browser for the next
                        time I comment.
                      </div>
                    </div>
                    <div className="blog__details__button" data-aos="fade-up">
                      <Link className="default__button" to=" ">
                        Post a Comment
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4">
                  <div className="course__details__sidebar">
                    <div className="event__sidebar__wraper" data-aos="fade-up">
                      <div
                        className="blogarae__img__2 course__details__img__2"
                        data-aos="fade-up"
                      >
                        <img src={blog7} alt="blog" />
                        <div className="registerarea__content course__details__video">
                          <div className="registerarea__video">
                            <div className="video__pop__btn">
                              <Link
                                className="video-btn"
                                to="https://www.youtube.com/watch?v=vHdclsdkp28"
                              >
                                {" "}
                                <img src={video} alt="" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="event__price__wraper">
                        <div className="event__price">
                          $32.00 <del>/ $67.00</del>
                        </div>
                        <div className="event__Price__button">
                          <Link to=" ">68% OFF</Link>
                        </div>
                      </div>
                      <div className="course__summery__button">
                        <Link className="default__button" to=" ">
                          Add To Cart
                        </Link>
                        <Link
                          className="default__button default__button--2"
                          to=" "
                        >
                          Buy Now
                        </Link>
                        <span>
                          <i className="icofont-ui-rotation"></i>
                          45-Days Money-Back Guarantee
                        </span>
                      </div>
                      <div className="course__summery__lists">
                        <ul>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Instructor:</span>
                              <span className="sb_content">
                                <Link to="/instructor-details">D. Willaim</Link>
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Start Date</span>
                              <span className="sb_content">05 Dec 2024</span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Total Duration</span>
                              <span className="sb_content">08Hrs 32Min</span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Enrolled</span>
                              <span className="sb_content">100</span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Lectures</span>
                              <span className="sb_content">30</span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Skill Level</span>
                              <span className="sb_content">Basic</span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Language</span>
                              <span className="sb_content">Spanish</span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Quiz</span>
                              <span className="sb_content">Yes</span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Certificate</span>
                              <span className="sb_content">Yes</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="course__summery__button">
                        <p>More inquery about course.</p>
                        <Link
                          className="default__button default__button--3"
                          to="tel:+4733378901"
                        >
                          <i className="icofont-phone"></i> +47 333 78 901
                        </Link>
                      </div>
                    </div>
                    <div
                      className="blogsidebar__content__wraper__2"
                      data-aos="fade-up"
                    >
                      <h4 className="sidebar__title">Follow Us</h4>
                      <div className="follow__icon">
                        <ul>
                          <li>
                            <Link to=" ">
                              <i className="icofont-facebook"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to=" ">
                              <i className="icofont-youtube-play"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to=" ">
                              <i className="icofont-instagram"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to=" ">
                              <i className="icofont-twitter"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to=" ">
                              <i className="icofont-instagram"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div
                      className="blogsidebar__content__wraper__2"
                      data-aos="fade-up"
                    >
                      <h4 className="sidebar__title">Populer Course</h4>
                      <ul className="course__details__populer__list">
                        <li>
                          <div className="course__details__populer__img">
                            <img
                              src={blogDetail6}
                              alt="populer"
                            />
                          </div>
                          <div className="course__details__populer__content">
                            <span>$32,000</span>
                            <h6>
                              <Link to=" ">Making Music with Other People</Link>
                            </h6>
                          </div>
                        </li>
                        <li>
                          <div className="course__details__populer__img">
                            <img
                              src={blogDetail7}
                              alt="populer"
                            />
                          </div>
                          <div className="course__details__populer__content">
                            <span>$32,000</span>
                            <h6>
                              <Link to=" ">Making Music with Other People</Link>
                            </h6>
                          </div>
                        </li>
                        <li>
                          <div className="course__details__populer__img">
                            <img
                              src={blogDetail8}
                              alt="populer"
                            />
                          </div>
                          <div className="course__details__populer__content">
                            <span>$32,000</span>
                            <h6>
                              <Link to=" ">Making Music with Other People</Link>
                            </h6>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="blogsidebar__content__wraper__2"
                      data-aos="fade-up"
                    >
                      <h4 className="sidebar__title">Get in Touch</h4>
                      <div className="get__touch__input">
                        <input type="text" placeholder="Enter name*" />
                        <input type="text" placeholder="Enter your mail*" />
                        <input type="text" placeholder="Massage*" />
                        <Link className="default__button" to="blog-details.html">
                          SEND MASSAGE
                        </Link>
                      </div>
                    </div>
                    <div
                      className="blogsidebar__content__wraper__2"
                      data-aos="fade-up"
                    >
                      <h4 className="sidebar__title">Popular tag</h4>
                      <div className="populer__tag__list">
                        <ul>
                          <li>
                            <Link to="blog-details.html">Business</Link>
                          </li>
                          <li>
                            <Link to="blog-details.html">Design</Link>
                          </li>
                          <li>
                            <Link to="blog-details.html">apps</Link>
                          </li>
                          <li>
                            <Link to="blog-details.html">landing page</Link>
                          </li>
                          <li>
                            <Link to="blog-details.html">data</Link>
                          </li>
                          <li>
                            <Link to="blog-details.html">book</Link>
                          </li>
                          <li>
                            <Link to="blog-details.html">Design</Link>
                          </li>
                          <li>
                            <Link to="blog-details.html">book</Link>
                          </li>
                          <li>
                            <Link to="blog-details.html">landing page</Link>
                          </li>
                          <li>
                            <Link to="blog-details.html">data</Link>
                          </li>
                        </ul>
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

export default CourseDetails;
