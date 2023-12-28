import React, { useReducer, useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";

const initialCourseData = {
  Course_Title: "",
  course_identifier: "",
  Short_Description: "",
  Description: "",
  Category: "",
  Level: "",
  EnrollmentStartDate: "",
  EnrollmentEndDate: "",
  max_enrollments: "",
  faqs: "",
  course_type: "",
  course_delivery: "",
  primary_instructor: "",
  Featured: false,
  Support_Available: false,
  is_active: false,
  Requirements: "",
  Outcome: "",
  Course_Overview_Provider: "",
  Course_Overview_URL: "",
  Course_Thumbnail: "",
  SEO_Meta_Keywords: "",
  Meta_Description: "",
  lessons: "",
};

const reducerCreateCourse = (state, action) => {
  if (action.type === "reset") {
    return initialCourseData;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const CreateCourse = () => {
  const [createCourseData, dispatchCreateCourse] = useReducer(
    reducerCreateCourse,
    initialCourseData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const navigate = useNavigate();

  const resetReducerForm = () => {
    dispatchCreateCourse({
      type: "reset",
    });
  };

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const validateForm = () => {
    if (!createCourseData.Course_Title) {
      setFormError("Course Title is Required");
      return false;
    }
    if (!createCourseData.Short_Description) {
      setFormError("Short Description is Required");
      return false;
    }
    if (!createCourseData.Description) {
      setFormError("Description is Required");
      return false;
    }
    if (!createCourseData.EnrollmentStartDate) {
      setFormError("Enrollment Start Date is Required");
      return false;
    }
    if (!createCourseData.EnrollmentEndDate) {
      setFormError("Enrollment End Date is Required");
      return false;
    }
    if (!createCourseData.max_enrollments) {
      setFormError("Max Enrollments is Required");
      return false;
    }
    if (!createCourseData.Course_Overview_Provider) {
      setFormError("Course Overview Provider is Required");
      return false;
    }
    if (!createCourseData.Course_Overview_URL) {
      setFormError("Course Overview URL is Required");
      return false;
    }
    if (!createCourseData.Course_Thumbnail) {
      setFormError("Course Thumbnail is Required");
      return false;
    }
    if (!createCourseData.SEO_Meta_Keywords) {
      setFormError("SEO Meta Keywords URL is Required");
      return false;
    }
    if (!createCourseData.Meta_Description) {
      setFormError("Meta Description is Required");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const createCourse = async (e) => {
    resetReducerForm();
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await ajaxCall("/courselistview/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(createCourseData),
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate("/");
      } else if (response.status === 400 || response.status === 404) {
        setFormStatus({
          isError: true,
          errMsg: "Some Problem Occurred. Please try again.",
          isSubmitting: false,
        });
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    }
  };

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
                                        value={createCourseData.Course_Title}
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "Course_Title",
                                            value: e.target.value,
                                          });
                                        }}
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
                                        value={
                                          createCourseData.course_identifier
                                        }
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "course_identifier",
                                            value: e.target.value,
                                          });
                                        }}
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
                                        value={
                                          createCourseData.Short_Description
                                        }
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "Short_Description",
                                            value: e.target.value,
                                          });
                                        }}
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
                                        value={createCourseData.Description}
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "Description",
                                            value: e.target.value,
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
                                  <div className="dashboard__select__heading">
                                    <span>Category</span>
                                  </div>
                                  <div className="dashboard__selector">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                      value={createCourseData.Category}
                                      onChange={(e) => {
                                        dispatchCreateCourse({
                                          type: "Category",
                                          value: e.target.value,
                                        });
                                      }}
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
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
                                  <div className="dashboard__select__heading">
                                    <span>Level</span>
                                  </div>
                                  <div className="dashboard__selector">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                      value={createCourseData.Level}
                                      onChange={(e) => {
                                        dispatchCreateCourse({
                                          type: "Level",
                                          value: e.target.value,
                                        });
                                      }}
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
                                      <input
                                        type="date"
                                        value={
                                          createCourseData.EnrollmentStartDate
                                        }
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "EnrollmentStartDate",
                                            value: e.target.value,
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Enrollment EndDate</label>
                                      <input
                                        type="date"
                                        value={
                                          createCourseData.EnrollmentEndDate
                                        }
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "EnrollmentEndDate",
                                            value: e.target.value,
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Max Enrollments</label>
                                      <input
                                        type="number"
                                        value={createCourseData.max_enrollments}
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "max_enrollments",
                                            value: e.target.value,
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>FAQS</label>
                                      <textarea
                                        type="text"
                                        value={createCourseData.faqs}
                                        onChange={(e) =>
                                          dispatchCreateCourse({
                                            type: "faqs",
                                            value: e.target.value,
                                          })
                                        }
                                      />
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
                                      value={createCourseData.course_type}
                                      onChange={(e) =>
                                        dispatchCreateCourse({
                                          type: "course_type",
                                          value: e.target.value,
                                        })
                                      }
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
                                      value={createCourseData.course_delivery}
                                      onChange={(e) => {
                                        dispatchCreateCourse({
                                          type: "course_delivery",
                                          value: e.target.value,
                                        });
                                      }}
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
                                      value={
                                        createCourseData.primary_instructor
                                      }
                                      onChange={(e) => {
                                        dispatchCreateCourse({
                                          type: "primary_instructor",
                                          value: e.target.value,
                                        });
                                      }}
                                    >
                                      <option value="Admin">Admin</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="d-flex flex-wrap gap-4 mt-4">
                                  <div className="form__check">
                                    <label>Featured</label>{" "}
                                    <input
                                      type="checkbox"
                                      value={createCourseData.Featured}
                                      onChange={(e) => {
                                        dispatchCreateCourse({
                                          type: "Featured",
                                          value: e.target.checked,
                                        });
                                      }}
                                    />
                                  </div>
                                  <div className="form__check">
                                    <label>Support Available</label>{" "}
                                    <input
                                      type="checkbox"
                                      value={createCourseData.Support_Available}
                                      onChange={(e) => {
                                        dispatchCreateCourse({
                                          type: "Support_Available",
                                          value: e.target.checked,
                                        });
                                      }}
                                    />
                                  </div>
                                  <div className="form__check">
                                    <label>Is Active</label>{" "}
                                    <input
                                      type="checkbox"
                                      value={createCourseData.is_active}
                                      onChange={(e) => {
                                        dispatchCreateCourse({
                                          type: "is_active",
                                          value: e.target.checked,
                                        });
                                      }}
                                    />
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
                                      value={createCourseData.Requirements}
                                      onChange={(e) => {
                                        dispatchCreateCourse({
                                          type: "Requirements",
                                          value: e.target.value,
                                        });
                                      }}
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
                                      value={createCourseData.Outcome}
                                      onChange={(e) => {
                                        dispatchCreateCourse({
                                          type: "Outcome",
                                          value: e.target.value,
                                        });
                                      }}
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
                                        value={
                                          createCourseData.Course_Overview_Provider
                                        }
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "Course_Overview_Provider",
                                            value: e.target.value,
                                          });
                                        }}
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
                                        value={
                                          createCourseData.Course_Overview_URL
                                        }
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "Course_Overview_URL",
                                            value: e.target.value,
                                          });
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__form__wraper">
                                    <div className="dashboard__form__input">
                                      <label>Course Thumbnail</label>
                                      <input
                                        type="file"
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "Course_Thumbnail",
                                            value: e.target.files[0],
                                          });
                                        }}
                                      />
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
                                        value={
                                          createCourseData.SEO_Meta_Keywords
                                        }
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "SEO_Meta_Keywords",
                                            value: e.target.value,
                                          });
                                        }}
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
                                        value={
                                          createCourseData.Meta_Description
                                        }
                                        onChange={(e) => {
                                          dispatchCreateCourse({
                                            type: "Meta_Description",
                                            value: e.target.value,
                                          });
                                        }}
                                      />
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
                                    value={createCourseData.lessons}
                                    onChange={(e) => {
                                      dispatchCreateCourse({
                                        type: "lessons",
                                        value: e.target.value,
                                      });
                                    }}
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
                        {formStatus.isError && (
                          <div className="text-danger mb-2">
                            {formStatus.errMsg}
                          </div>
                        )}
                        <button
                          className="default__button"
                          onClick={createCourse}
                        >
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
