import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import ajaxCall from "../../../../helpers/ajaxCall";
import SingleSelection from "../../../UI/SingleSelect";
import SelectionBox from "../../../UI/SelectionBox";
import Tab from "../../../UI/Tab";

const initialCourseData = {
  Course_Title: "",
  course_identifier: "",
  Short_Description: "",
  Description: "",
  Category: "",
  Level: "",
  Language: "",
  tutor: [],
  tutorId: [],
  EnrollmentStartDate: "",
  EnrollmentEndDate: "",
  max_enrollments: "",
  faqs: "",
  course_type: "PRIVATE",
  course_delivery: "SELF-STUDY",
  primary_instructor: "",
  Featured: false,
  Support_Available: false,
  is_active: false,
  Requirements: [],
  requirementId: [],
  Outcome: [],
  outcomeId: [],
  Course_Overview_Provider: "",
  Course_Overview_URL: "",
  Course_Thumbnail: "",
  course_banner: "",
  SEO_Meta_Keywords: "",
  Meta_Description: "",
  lessons: [],
  lessonsId: [],
};

const reducerCreateCourse = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialCourseData;
  }
  if (
    action.type === "SEO_Meta_Keywords" ||
    action.type === "Meta_Description"
  ) {
    return {
      ...state,
      [action.type]: [action.value],
    };
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const tabs = [
  { name: "Course Details" },
  { name: "Requirements & Outcomes" },
  { name: "Course Media" },
  { name: "Course SEO" },
  { name: "Lessons" },
];

const validateForm = (createCourseData, setFormError) => {
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
  if (!createCourseData.Category) {
    setFormError("Category is Required");
    return false;
  }
  if (!createCourseData.Level) {
    setFormError("Level is Required");
    return false;
  }
  if (!createCourseData.Language) {
    setFormError("Language is Required");
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
  if (!createCourseData.primary_instructor) {
    setFormError("Primary Instructor is Required");
    return false;
  }
  if (!createCourseData.tutor) {
    setFormError("Tutor is Required");
    return false;
  }
  if (!createCourseData.max_enrollments) {
    setFormError("Max Enrollments is Required");
    return false;
  }
  if (!createCourseData.Course_Thumbnail) {
    setFormError("Course Thumbnail is Required");
    return false;
  }
  if (!createCourseData.course_banner) {
    setFormError("Course Banner is Required");
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
  return true;
};

const CreateCourse = ({ setMainTab }) => {
  const [createCourseData, dispatchCreateCourse] = useReducer(
    reducerCreateCourse,
    initialCourseData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeTab, setActiveTab] = useState("Course Details");
  const authData = useSelector((state) => state.authStore);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const resetReducerForm = () => {
    dispatchCreateCourse({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createCourse = async (e) => {
    e.preventDefault();
    if (!validateForm(createCourseData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    try {
      const formData = new FormData();
      formData.append("Course_Title", createCourseData.Course_Title);
      formData.append("course_identifier", createCourseData.course_identifier);
      formData.append("Short_Description", createCourseData.Short_Description);
      formData.append("Description", createCourseData.Description);
      formData.append("Category", createCourseData.Category);
      formData.append("Level", createCourseData.Level);
      formData.append("Language", createCourseData.Language);
      createCourseData.tutorId.forEach((id) => {
        formData.append(`tutor`, id);
      });
      formData.append(
        "EnrollmentStartDate",
        createCourseData.EnrollmentStartDate
      );
      formData.append("EnrollmentEndDate", createCourseData.EnrollmentEndDate);
      formData.append("max_enrollments", createCourseData.max_enrollments);
      formData.append("faqs", createCourseData.faqs);
      formData.append("course_type", createCourseData.course_type);
      formData.append("course_delivery", createCourseData.course_delivery);
      formData.append(
        "primary_instructor",
        createCourseData.primary_instructor
      );
      formData.append("Featured", createCourseData.Featured);
      formData.append("Support_Available", createCourseData.Support_Available);
      formData.append("is_active", createCourseData.is_active);
      createCourseData.requirementId.forEach((id) => {
        formData.append(`Requirements`, id);
      });
      createCourseData.outcomeId.forEach((id) => {
        formData.append(`Outcome`, id);
      });
      formData.append(
        "Course_Overview_Provider",
        createCourseData.Course_Overview_Provider
      );
      formData.append(
        "Course_Overview_URL",
        createCourseData.Course_Overview_URL
      );
      formData.append("Course_Thumbnail", createCourseData.Course_Thumbnail);
      formData.append("course_banner", createCourseData.course_banner);
      formData.append("SEO_Meta_Keywords", createCourseData.SEO_Meta_Keywords);
      formData.append("Meta_Description", createCourseData.Meta_Description);
      createCourseData.lessonsId.forEach((id) => {
        formData.append(`lessons`, id);
      });

      const response = await ajaxCall(
        "/courselistview/",
        {
          headers: {
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: formData,
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setMainTab("View Course");
        toast.success("Course Created Successfully");
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    } finally {
      setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    }
  };

  const addedSelectVal = (fieldName, proFieldName, isSingle, val) => {
    if (isSingle) {
      dispatchCreateCourse({
        type: fieldName,
        value: val,
      });
      dispatchCreateCourse({
        type: proFieldName,
        value: +val[0]?.id,
      });
      return;
    }
    const newValIds = val.map((ids) => ids.id);
    dispatchCreateCourse({
      type: fieldName,
      value: val,
    });
    dispatchCreateCourse({
      type: proFieldName,
      value: newValIds,
    });
  };

  return (
    <>
      <Tab
        tabs={tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <div className="tab-content tab__content__wrapper aos-init aos-animate">
        <div
          className={`tab-pane fade ${
            activeTab === "Course Details" ? "show active" : ""
          }`}
        >
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
                    value={createCourseData.course_identifier}
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
                    value={createCourseData.Short_Description}
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
                <SingleSelection
                  value={createCourseData.Category}
                  onChange={(val) => {
                    dispatchCreateCourse({
                      type: "Category",
                      value: val,
                    });
                  }}
                  isSearch={true}
                  url="/categoryview/"
                  objKey={["name"]}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
              <div className="dashboard__select__heading">
                <span>Level</span>
              </div>
              <div className="dashboard__selector">
                <SingleSelection
                  value={createCourseData.Level}
                  onChange={(val) => {
                    dispatchCreateCourse({
                      type: "Level",
                      value: val,
                    });
                  }}
                  isSearch={true}
                  url="/levelView/"
                  objKey={["name"]}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
              <div className="dashboard__select__heading">
                <span>Language</span>
              </div>
              <div className="dashboard__selector">
                <SingleSelection
                  value={createCourseData.Language}
                  onChange={(val) => {
                    dispatchCreateCourse({
                      type: "Language",
                      value: val,
                    });
                  }}
                  isSearch={true}
                  url="/languageview/"
                  objKey={["name"]}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
              <div className="dashboard__select__heading">
                <span>Tutor</span>
              </div>
              <div className="dashboard__selector">
                <SelectionBox
                  value={createCourseData.tutor}
                  onSelect={addedSelectVal.bind(
                    null,
                    "tutor",
                    "tutorId",
                    false
                  )}
                  url="/tutorcourses/"
                  name="username"
                  objKey={["username"]}
                  isSearch={true}
                  multiple={true}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Enrollment StartDate</label>
                  <input
                    type="date"
                    value={createCourseData.EnrollmentStartDate}
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
                    value={createCourseData.EnrollmentEndDate}
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
                  <option value="PRIVATE">Private</option>
                  <option value="PUBLIC">Public</option>
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
                  <option value="SELF-STUDY">Self-Study Course</option>
                  <option value="TAUGHT">Taught Course</option>
                </select>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__select__heading">
                <span>Primary Instructor</span>
              </div>
              <div className="dashboard__selector">
                <SingleSelection
                  value={createCourseData.primary_instructor}
                  onChange={(val) => {
                    dispatchCreateCourse({
                      type: "primary_instructor",
                      value: val,
                    });
                  }}
                  isSearch={true}
                  url="/instructorcourses/"
                  objKey={["username"]}
                />
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
        <div
          className={`tab-pane fade ${
            activeTab === "Requirements & Outcomes" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__select__heading">
                <span>Requirements</span>
              </div>
              <div className="dashboard__selector">
                <SelectionBox
                  value={createCourseData.Requirements}
                  onSelect={addedSelectVal.bind(
                    null,
                    "Requirements",
                    "requirementId",
                    false
                  )}
                  url="/requirementsview/"
                  name="description"
                  objKey={["description"]}
                  isSearch={true}
                  multiple={true}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__select__heading">
                <span>Outcome</span>
              </div>
              <div className="dashboard__selector">
                <SelectionBox
                  value={createCourseData.Outcome}
                  onSelect={addedSelectVal.bind(
                    null,
                    "Outcome",
                    "outcomeId",
                    false
                  )}
                  url="/outcomesview/"
                  name="description"
                  objKey={["description"]}
                  isSearch={true}
                  multiple={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Course Media" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Course Overview Provider</label>
                  <input
                    type="text"
                    placeholder="Course Overview Provider"
                    value={createCourseData.Course_Overview_Provider}
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
                    value={createCourseData.Course_Overview_URL}
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
                  <label>Course Thumbnail (1483 pixels x 800 pixels)</label>
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
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Course Banner (2000 pixels x 477 pixels)</label>
                  <input
                    type="file"
                    placeholder=""
                    onChange={(e) => {
                      dispatchCreateCourse({
                        type: "course_banner",
                        value: e.target.files[0],
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Course SEO" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>SEO Meta Keywords</label>
                  <input
                    type="text"
                    placeholder="SEO Meta Keywords"
                    value={createCourseData.SEO_Meta_Keywords[0]}
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
                    value={createCourseData.Meta_Description[0]}
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
        <div
          className={`tab-pane fade ${
            activeTab === "Lessons" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__select__heading">
                <span>Lessons</span>
              </div>
              <div className="dashboard__selector">
                <SelectionBox
                  value={createCourseData.lessons}
                  onSelect={addedSelectVal.bind(
                    null,
                    "lessons",
                    "lessonsId",
                    false
                  )}
                  url="/lessonview/"
                  name="Lesson_Title"
                  objKey={["Lesson_Title"]}
                  isSearch={true}
                  multiple={true}
                />
              </div>
            </div>
            <div className="create__course__bottom__button text-center mt-4">
              {formStatus.isError && (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              )}
              {formStatus.isSubmitting ? (
                <Spinner animation="border" style={{ color: "#01579b" }} />
              ) : (
                <button
                  className="default__button"
                  onClick={createCourse}
                  disabled={formStatus.isSubmitting}
                >
                  Create Course
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
