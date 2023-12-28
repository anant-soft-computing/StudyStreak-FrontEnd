import React from "react";
import TopBar from "../../components/TopBar/TopBar";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const CreateCourse = () => {
  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
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
                            Course Details
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
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Course Title</label>
                                      <input
                                        type="text"
                                        placeholder="Course Title"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Course Identifire</label>
                                      <input
                                        type="text"
                                        placeholder="Course Identifire"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Short Description</label>
                                      <textarea
                                        type="text"
                                        placeholder="Short Description"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Description</label>
                                      <textarea
                                        type="text"
                                        placeholder="Description"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__select__heading">
                                    <span>Category</span>
                                  </div>
                                  <div className="dashboard__selector">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                    >
                                      <option value="English Language Tests">
                                        English Language Tests
                                      </option>
                                      <option value="German Language Tests">
                                        German Language Tests
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__select__heading">
                                    <span>Level</span>
                                  </div>
                                  <div className="dashboard__selector">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                    >
                                      <option value="Beginner">Beginner</option>
                                      <option value="Advanced">Advanced</option>
                                      <option value="Intermediate">
                                        Intermediate
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Enrollment StartDate</label>
                                      <input type="date" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Enrollment EndDate</label>
                                      <input type="date" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Max Enrollments</label>
                                      <input type="number" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>FAQS</label>
                                      <textarea type="text" />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__select__heading">
                                    <span>Course Type</span>
                                  </div>
                                  <div className="dashboard__selector">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                    >
                                      <option value="Private">Private</option>
                                      <option value="Public">Public</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__select__heading">
                                    <span>Course Delivery</span>
                                  </div>
                                  <div className="dashboard__selector">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                    >
                                      <option value="TaughtCourse">
                                        Taught Course
                                      </option>
                                      <option value="Self-StudyCourse">
                                        Self-Study Course
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__select__heading">
                                    <span>Primary Instructor</span>
                                  </div>
                                  <div className="dashboard__selector">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                    >
                                      <option value="Admin">Admin</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="d-flex flex-wrap gap-4 mt-4">
                                  <div className="form__check">
                                    <label>Featured</label>{" "}
                                    <input type="checkbox" />
                                  </div>
                                  <div className="form__check">
                                    <label>Support Available</label>{" "}
                                    <input type="checkbox" />
                                  </div>
                                  <div className="form__check">
                                    <label>Is Active</label>{" "}
                                    <input type="checkbox" />
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
                            Requirements
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
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__select__heading">
                                    <span>Requirements</span>
                                  </div>
                                  <div className="dashboard__selector">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                    >
                                      <option value="ABCD">ABCD</option>
                                      <option value="EFGH">EFGH</option>
                                    </select>
                                  </div>
                                </div>
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
                            Outcome
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="become__instructor__form">
                              <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__select__heading">
                                    <span>Outcome</span>
                                  </div>
                                  <div className="dashboard__selector">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                    >
                                      <option value="123">123</option>
                                      <option value="DEF">DEF</option>
                                    </select>
                                  </div>
                                </div>
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
                            Course Media
                          </button>
                        </h2>
                        <div
                          id="collapseFour"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFour"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="become__instructor__form">
                              <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Course Overview Provider</label>
                                      <input
                                        type="text"
                                        placeholder="Course Overview Provider"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Course Overview URL</label>
                                      <input
                                        type="text"
                                        placeholder="Course Overview URL"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Course Thumbnail</label>
                                      <input type="file" />
                                    </div>
                                  </div>
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
                            aria-expanded="false"
                            aria-controls="collapseFive"
                          >
                            Course SEO
                          </button>
                        </h2>
                        <div
                          id="collapseFive"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingFive"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="become__instructor__form">
                              <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>SEO Meta Keywords</label>
                                      <input
                                        type="text"
                                        placeholder="SEO Meta Keywords"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Meta Description</label>
                                      <input
                                        type="text"
                                        placeholder="Meta Description"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Course Thumbnail</label>
                                      <input type="file" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingSix">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSix"
                            aria-expanded="false"
                            aria-controls="collapseSix"
                          >
                            Lessons
                          </button>
                        </h2>
                        <div
                          id="collapseSix"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingSix"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="become__instructor__form">
                              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="dashboard__select__heading">
                                  <span>Lessons</span>
                                </div>
                                <div className="dashboard__selector">
                                  <select
                                    className="form-select"
                                    aria-label="Default select example"
                                  >
                                    <option value="Reading Intro">
                                      Reading Intro
                                    </option>
                                    <option value="Listening-101">
                                      Listening-101
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingSeven">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSeven"
                            aria-expanded="false"
                            aria-controls="collapseSeven"
                          >
                            Course Materials
                          </button>
                        </h2>
                        <div
                          id="collapseSeven"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingSeven"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="become__instructor__form">
                              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label>Course Material</label>
                                    <input type="file" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingEigth">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseEigth"
                            aria-expanded="false"
                            aria-controls="collapseEigth"
                          >
                            Additional Information
                          </button>
                        </h2>
                        <div
                          id="collapseEigth"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingEigth"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <div className="become__instructor__form">
                              <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Information</label>
                                      <input
                                        type="text"
                                        placeholder="Information"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Course File</label>
                                      <input type="file" />
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
                  <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-6 col-12">
                      <div className="create__course__bottom__button">
                        <button className="default__button">
                          Create Course
                        </button>
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

export default CreateCourse;
