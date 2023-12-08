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
import dashboard8 from '../../img/dashbord/dashbord__8.jpg';
import dashboard4 from '../../img/dashbord/dashbord__4.jpg';
import dashboard5 from '../../img/dashbord/dashbord__5.jpg';
import dashboard9 from '../../img/dashbord/dashbord__9.jpg';
import dashboard7 from '../../img/dashbord/dashbord__7.jpg';

const CreateCourse = () => {
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
                  <div className="breadcrumb__content__wraper" data-aos="fade-up">
                    <div className="breadcrumb__title">
                      <h2 className="heading">Create Course</h2>
                    </div>
                    <div className="breadcrumb__inner">
                      <ul>
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>Create Course</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shape__icon__2">
              <img
                className=" shape__icon__img shape__icon__img__1"
                src={img1}
                alt=""
              />
              <img
                className=" shape__icon__img shape__icon__img__2"
                src={img2}
                alt=""
              />
              <img
                className=" shape__icon__img shape__icon__img__3"
                src={img3}
                alt=""
              />
              <img
                className=" shape__icon__img shape__icon__img__4"
                src={img4}
                alt=""
              />
            </div>
          </div>
          <div className="create__course sp_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-12 col-12">
                  <div className="create__course__accordion__wraper">
                    <div className="accordion" id="accordionExample">
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
                            Course Info
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="become__instructor__form">
                              <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label for="#">Course Title</label>
                                      <input
                                        type="text"
                                        placeholder="Course Title"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label for="#">Course Slug</label>
                                      <input
                                        type="text"
                                        placeholder="Course Slug"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label for="#">
                                        {" "}
                                        Free Regular Price ($)
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Free Regular Price ($)"
                                      />
                                    </div>
                                    <small className="create__course__small">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="feather feather-info"
                                      >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line
                                          x1="12"
                                          y1="16"
                                          x2="12"
                                          y2="12"
                                        ></line>
                                        <line
                                          x1="12"
                                          y1="8"
                                          x2="12.01"
                                          y2="8"
                                        ></line>
                                      </svg>{" "}
                                      The Course Price Includes Your Author Fee.
                                    </small>
                                  </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label for="#">
                                        Discounted Price ($)
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="Discounted Price ($)"
                                      />
                                      <small className="create__course__small">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          className="feather feather-info"
                                        >
                                          <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                          ></circle>
                                          <line
                                            x1="12"
                                            y1="16"
                                            x2="12"
                                            y2="12"
                                          ></line>
                                          <line
                                            x1="12"
                                            y1="8"
                                            x2="12.01"
                                            y2="8"
                                          ></line>
                                        </svg>{" "}
                                        The Course Price Includes Your Author
                                        Fee.
                                      </small>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                    <div className="dashboard__select__heading">
                                      <span>Courses</span>
                                    </div>
                                    <div className="dashboard__selector">
                                      <select
                                        className="form-select"
                                        aria-label="Default select example"
                                      >
                                        <option selected>All</option>
                                        <option value="1">Web Design</option>
                                        <option value="2">Graphic</option>
                                        <option value="3">English</option>
                                        <option value="4">
                                          Spoken English
                                        </option>
                                        <option value="5">Art Painting</option>
                                        <option value="6">
                                          App Development
                                        </option>
                                        <option value="7">
                                          Web Application
                                        </option>
                                        <option value="7">
                                          Php Development
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                    <div className="dashboard__select__heading">
                                      <span>SHORT BY OFFER</span>
                                    </div>
                                    <div className="dashboard__selector">
                                      <select
                                        className="form-select"
                                        aria-label="Default select example"
                                      >
                                        <option selected>Free</option>
                                        <option value="1">paid</option>
                                        <option value="2">premimum</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label for="#">About Course</label>
                                      <textarea
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="10"
                                      ></textarea>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                  <div className="dashboard__form__button create__course__margin">
                                    <Link className="default__button" to=" ">
                                      Update Info
                                    </Link>
                                  </div>
                                </div>
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
                            Course Intro Video
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="become__instructor__form">
                              <div className="row">
                                <div className="col-xl-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <input
                                        type="text"
                                        placeholder="Select Video search"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label for="#">Add Your Video URL</label>
                                      <input
                                        type="text"
                                        placeholder="Add your Video URL here"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <small>
                                  Example:{" "}
                                  <Link to="https://www.youtube.com/watch?v=yourvideoid">
                                    https://www.youtube.com/watch?v=yourvideoid
                                  </Link>
                                </small>
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
                            aria-expanded="true"
                            aria-controls="collapseThree"
                          >
                            Course Builder
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="create__course__button">
                              <Link className="default__button" to=" ">
                                Add New Topic
                              </Link>
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
                            aria-expanded="true"
                            aria-controls="collapseFour"
                          >
                            Additional Information
                          </button>
                        </h2>
                        <div
                          id="collapseFour"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFour"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="row">
                              <div className="col-xl-6">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label for="#">Start Date</label>
                                    <input
                                      type="text"
                                      placeholder="mm/dd/yyyy"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-6">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label for="#">Language</label>
                                    <input type="text" placeholder="English" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-6">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label for="#">Requirements</label>
                                    <textarea
                                      className="create__course__textarea"
                                      name=""
                                      id=""
                                      cols="30"
                                      rows="10"
                                    >
                                      Add your course benefits here.
                                    </textarea>
                                    <small className="create__course__small">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="feather feather-info"
                                      >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line
                                          x1="12"
                                          y1="16"
                                          x2="12"
                                          y2="12"
                                        ></line>
                                        <line
                                          x1="12"
                                          y1="8"
                                          x2="12.01"
                                          y2="8"
                                        ></line>
                                      </svg>{" "}
                                      Enter for per line.
                                    </small>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-6">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label for="#">Description</label>
                                    <textarea
                                      className="create__course__textarea"
                                      name=""
                                      id=""
                                      cols="30"
                                      rows="10"
                                    >
                                      Add your course benefits here.
                                    </textarea>
                                    <small className="create__course__small">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="feather feather-info"
                                      >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line
                                          x1="12"
                                          y1="16"
                                          x2="12"
                                          y2="12"
                                        ></line>
                                        <line
                                          x1="12"
                                          y1="8"
                                          x2="12.01"
                                          y2="8"
                                        ></line>
                                      </svg>{" "}
                                      Enter for per line.
                                    </small>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label for="#">Course Tags</label>
                                    <textarea
                                      name=""
                                      id=""
                                      cols="30"
                                      rows="10"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="dashboard__form__button">
                                  <Link className="default__button" to=" ">
                                    Update Info
                                  </Link>
                                </div>
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
                            aria-expanded="true"
                            aria-controls="collapseFive"
                          >
                            Certificate Template
                          </button>
                        </h2>
                        <div
                          id="collapseFive"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFive"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="row">
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                <div className="create__course__single__img">
                                  <img
                                    src={dashboard8}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                <div className="create__course__single__img">
                                  <img
                                    src={dashboard4}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                <div className="create__course__single__img">
                                  <img
                                    src={dashboard5}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                <div className="create__course__single__img">
                                  <img
                                    src={dashboard9}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                <div className="create__course__single__img">
                                  <img
                                    src={dashboard7}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                <div className="create__course__single__img">
                                  <img
                                    src={dashboard8}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-12">
                      <div className="create__course__bottom__button">
                        <Link to=" ">Preview</Link>
                      </div>
                    </div>
                    <div className="col-xl-8 col-lg-8 col-md-6 col-12">
                      <div className="create__course__bottom__button">
                        <Link to=" ">Create Course</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12 col-12">
                  <div className="create__course__wraper">
                    <div className="create__course__title">
                      <h4>Course Upload Tips</h4>
                    </div>
                    <div className="create__course__list">
                      <ul>
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-check"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Set the Course Price option make it free.
                        </li>
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-check"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Standard size for the course thumbnail.
                        </li>
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-check"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Video section controls the course overview video.
                        </li>
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-check"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Course Builder is where you create course.
                        </li>
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-check"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Add Topics in the Course Builder section to create
                          lessons, .
                        </li>
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-check"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Prerequisites refers to the fundamental courses .
                        </li>
                        <li>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="feather feather-check"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Information from the Additional Data section.
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
      <Footer />
    </>
  );
};

export default CreateCourse;
