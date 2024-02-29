import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";

const intialWritingField = {
  no_of_questions: "",
  difficulty_level: "Easy",
  exam_name: "",
  block_type: "Mock Test",
  block_threshold: "",
  passage: "",
  exam_type: "Writing",
  answers: [],
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerWriting = (state, action) => {
  return { ...state, [action.type]: action.value };
};

const ExamWriting = ({ category }) => {
  const [writingData, dispatchWritingData] = useReducer(
    reducerWriting,
    intialWritingField
  );

  const [formStatus, setFormStatus] = useState(initialSubmit);

  const navigate = useNavigate();

  const handlePassageChange = (event, editor) => {
    const data = editor.getData();
    dispatchWritingData({
      type: "passage",
      value: data,
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
    if (!writingData.no_of_questions) {
      setFormError("No of Question is Required");
      return false;
    }
    if (!writingData.difficulty_level) {
      setFormError("Difficulty Level is Required");
      return false;
    }
    if (!writingData.exam_name) {
      setFormError("Block Name is Required");
      return false;
    }
    if (!writingData.block_type) {
      setFormError("Block Type is Required");
      return false;
    }
    if (!writingData.block_threshold) {
      setFormError("Block Threshold is Required");
      return false;
    }

    if (!writingData.passage) {
      setFormError("Passage is Required");
      return false;
    }

    if (!writingData.answers) {
      setFormError("Answers is Required");
      return false;
    }

    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const submitWritingExam = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const witingQuestionStrucutre = [
      {
        type: "Textarea",
        numberOfQuestions: 1,
      },
    ];

    const data = {
      block_threshold: writingData.block_threshold,
      block_type: writingData.block_type,
      difficulty_level: writingData.difficulty_level,
      exam_name: writingData.exam_name,
      exam_type: writingData.exam_type,
      no_of_questions: writingData.no_of_questions,
      passage: writingData.passage,
      answers: writingData.answers,
      question_structure: witingQuestionStrucutre,
      exam_category: category,
    };

    try {
      const response = await ajaxCall("/exam-blocks/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
          }`,
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        toast.success("Writing Exam Create SuccessFully");
        navigate("/admin-exam");
      } else if (response.status === 400) {
        toast.error("Some Problem Occurred. Please try again.");
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
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="theme__shadow__circle"></div>
        <div className="theme__shadow__circle shadow__right"></div>
        <div className="container">
          <div className="row">
            <div
              className="col-xl-8 col-lg-8 col-md-12 col-12"
              style={{ width: "-webkit-fill-available" }}
            >
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
                        Question Details
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
                                  <label>Number of Question</label>
                                  <input
                                    type="number"
                                    placeholder="Number of Question"
                                    value={writingData.no_of_questions}
                                    onChange={(e) =>
                                      dispatchWritingData({
                                        type: "no_of_questions",
                                        value: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12 ">
                              <div className="dashboard__select__heading">
                                <span>Difficulty Level</span>
                              </div>
                              <div className="dashboard__selector">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  value={writingData.difficulty_level}
                                  onChange={(e) =>
                                    dispatchWritingData({
                                      type: "difficulty_level",
                                      value: e.target.value,
                                    })
                                  }
                                >
                                  <option value="Easy">Easy</option>
                                  <option value="Medium">Medium</option>
                                  <option value="Hard">Hard</option>
                                </select>
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
                        Block Details
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
                              <div className="dashboard__form__wraper">
                                <div className="dashboard__form__input">
                                  <label>Block Name</label>
                                  <input
                                    type="text"
                                    placeholder="Block Name"
                                    value={writingData.exam_name}
                                    onChange={(e) =>
                                      dispatchWritingData({
                                        type: "exam_name",
                                        value: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                              <div className="dashboard__select__heading">
                                <span>Block Type</span>
                              </div>
                              <div className="dashboard__selector">
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                  value={writingData.block_type}
                                  onChange={(e) =>
                                    dispatchWritingData({
                                      type: "block_type",
                                      value: e.target.value,
                                    })
                                  }
                                >
                                  <option value="Mock Test">Mock Test</option>
                                  <option value="Assignments">
                                    Assignment
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label>Block Threshold</label>
                                    <input
                                      type="number"
                                      placeholder="Block Threshold"
                                      value={writingData.block_threshold}
                                      onChange={(e) =>
                                        dispatchWritingData({
                                          type: "block_threshold",
                                          value: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
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
                        aria-expanded="true"
                        aria-controls="collapseThree"
                      >
                        Passage
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="col-xl-12 col-lg-6 col-md-6 col-12 mb-4">
                          <div className="dashboard__form__wraper">
                            <div className="dashboard__form__input">
                              <label>Passage</label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={writingData.passage}
                                onChange={handlePassageChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="create__course__bottom__button">
                {formStatus.isError && (
                  <div className="text-danger mb-2">{formStatus.errMsg}</div>
                )}
                <button className="default__button" onClick={submitWritingExam}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamWriting;
