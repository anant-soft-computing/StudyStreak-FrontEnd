import React from "react";
import { Link } from "react-router-dom";
import TopBar from "../Topbar";
import Navbar from "../Navbar";
import Footer from "../Footer";
import blog7 from "../../img/blog/blog_7.png";
import blog8 from "../../img/blog/blog_8.png";
import blog10 from "../../img/blog/blog_10.png";
import video from "../../img/dashbord/video.png";
import blogDetail6 from "../../img/blog-details/blog-details__6.png";
import blogDetail7 from "../../img/blog-details/blog-details__7.png";
import blogDetail8 from "../../img/blog-details/blog-details__8.png";

const CourseDetails = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
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
                            <img src={video} alt="" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="blog__details__content__wraper">
                    <div className="course__button__wraper" data-aos="fade-up">
                      <div className="course__button">
                        <Link to="">Featured</Link>
                        <Link className="course__2" to="">
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
                                        22 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span className="question">
                                          <i className="icofont-eye"></i>
                                          Preview
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
                                        05 minutes
                                      </span>
                                      <Link to="lesson.html">
                                        <span className="question">
                                          <i className="icofont-eye"></i>
                                          Preview
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                        <span>Video :</span> Lorem ipsum dolor
                                        sit amet.
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <span className="time">
                                        <i className="icofont-clock-time"></i>
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
                                    <Link to=""> Rosalina D. Willaim</Link>
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
                                      <Link to="">
                                        <i className="icofont-facebook"></i>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="">
                                        <i className="icofont-youtube-play"></i>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="https://www.instagram.com/">
                                        <i className="icofont-instagram"></i>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to="">
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
                          <Link to="">Business</Link>
                        </li>
                        <li>
                          <Link to="">Design</Link>
                        </li>
                        <li>
                          <Link to="">apps</Link>
                        </li>
                        <li>
                          <Link to="">data</Link>
                        </li>
                      </ul>
                      <ul className="share__list">
                        <li className="heading__tag">Share</li>
                        <li>
                          <Link to="">
                            <i className="icofont-twitter"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="">
                            <i className="icofont-facebook"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to="https://www.instagram.com/">
                            <i className="icofont-instagram"></i>
                          </Link>
                        </li>
                      </ul>
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
                          <Link to="">68% OFF</Link>
                        </div>
                      </div>
                      <div className="course__summery__button">
                        <Link className="default__button">
                          Enroll Now
                        </Link>
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
                              <span className="sb_content">English</span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Quiz</span>
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
                            <Link to="">
                              <i className="icofont-facebook"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="">
                              <i className="icofont-youtube-play"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="https://www.instagram.com/">
                              <i className="icofont-instagram"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="">
                              <i className="icofont-twitter"></i>
                            </Link>
                          </li>
                          <li>
                            <Link to="https://www.instagram.com/">
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
                            <img src={blogDetail6} alt="populer" />
                          </div>
                          <div className="course__details__populer__content">
                            <span>$32,000</span>
                            <h6>
                              <Link to="">Making Music with Other People</Link>
                            </h6>
                          </div>
                        </li>
                        <li>
                          <div className="course__details__populer__img">
                            <img src={blogDetail7} alt="populer" />
                          </div>
                          <div className="course__details__populer__content">
                            <span>$32,000</span>
                            <h6>
                              <Link to="">Making Music with Other People</Link>
                            </h6>
                          </div>
                        </li>
                        <li>
                          <div className="course__details__populer__img">
                            <img src={blogDetail8} alt="populer" />
                          </div>
                          <div className="course__details__populer__content">
                            <span>$32,000</span>
                            <h6>
                              <Link to="">Making Music with Other People</Link>
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
                        <Link
                          className="default__button"
                          to="blog-details.html"
                        >
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
