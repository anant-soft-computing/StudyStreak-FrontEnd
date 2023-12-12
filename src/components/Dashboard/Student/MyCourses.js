import React from "react";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";

const MyCourses = () => {
  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="tution sp_bottom_100 sp_top_50">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <div
                  className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12"
                  data-aos="fade-up"
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
                          Lesson #01
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
                                <Link to="">
                                  <span>Course Intro</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>3.27</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-video-alt"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>5.00</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-file-text"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Materials</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-audio"></i>
                              <h5>
                                <Link to="">
                                  <span>Summer Quiz</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-file-text"></i>
                              <h5>
                                <Link to="">
                                  <span>Assignment</span>
                                </Link>
                              </h5>
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
                          Lesson #02
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
                                <Link to="">
                                  <span>Course Intro</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>3.27</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-video-alt"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>5.00</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-video-alt"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>7.00</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-file-text"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Materials</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-audio"></i>
                              <h5>
                                <Link to="">
                                  <span>Summer Quiz</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-file-text"></i>
                              <h5>
                                <Link to="">
                                  <span>Assignment</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="headingThree">
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          Lesson #03
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
                                <Link to="">
                                  <span>Course Intro</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>3.27</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-video-alt"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>5.00</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-video-alt"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>7.00</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-file-text"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Materials</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-audio"></i>
                              <h5>
                                <Link to="">
                                  <span>Summer Quiz</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-file-text"></i>
                              <h5>
                                <Link to="">
                                  <span>Assignment</span>
                                </Link>
                              </h5>
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
                          Lesson #04
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
                                <Link to="">
                                  <span>Course Intro</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>3.27</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-video-alt"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>5.00</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-video-alt"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>7.00</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-file-text"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Materials</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-audio"></i>
                              <h5>
                                <Link to="">
                                  <span>Summer Quiz</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-file-text"></i>
                              <h5>
                                <Link to="">
                                  <span>Assignment</span>
                                </Link>
                              </h5>
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
                          Lesson #05
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
                                <Link to="">
                                  <span>Course Intro</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>3.27</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-video-alt"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>5.00</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-video-alt"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Outline</span>
                                </Link>
                              </h5>
                            </div>
                            <div className="scc__meta">
                              <strong>7.00</strong>
                              <Link to="">
                                <span className="question">
                                  <i className="icofont-eye"></i> Preview
                                </span>
                              </Link>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-file-text"></i>
                              <h5>
                                <Link to="">
                                  <span>Course Materials</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-audio"></i>
                              <h5>
                                <Link to="">
                                  <span>Summer Quiz</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                          <div className="scc__wrap">
                            <div className="scc__info">
                              <i className="icofont-file-text"></i>
                              <h5>
                                <Link to="">
                                  <span>Assignment</span>
                                </Link>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12"
                  data-aos="fade-up"
                >
                  <div className="lesson__content__main">
                    <div className="lesson__content__wrap">
                      <h3>Video Content lesson 01</h3>
                      <span>
                        <Link to="">Close</Link>
                      </span>
                    </div>
                    <div className="plyr__video-embed rbtplayer">
                      <iframe
                        src="https://www.youtube.com/embed/vHdclsdkp28"
                        allowfullscreen
                        allow="autoplay"
                        title="UniqueTitleHere"
                        className="video"
                      ></iframe>
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

export default MyCourses;
