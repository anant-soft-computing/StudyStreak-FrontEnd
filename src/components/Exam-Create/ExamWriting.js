import React, { useReducer, useState } from "react";
import TopBar from "../TopBar/TopBar";
import NavBar from "../NavBar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const intialWritingField = {
  no_of_questions: "",
  difficulty_level: "",
  exam_name: "",
  block_type: "",
  block_threshold: "",
  audio_file: "",
  passage: "",
  question: "",
  exam_type: "Writing",
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerWriting = (state, action) => {
  return { ...state, [action.type]: action.value };
};

const ExamWriting = () => {
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
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const handleOnNext = () => {
    if (!validateForm()) return;
    navigate("/exam-create", { state: { writingData } });
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="theme__shadow__circle"></div>
        <div className="theme__shadow__circle shadow__right"></div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-xl-12">
              <div className="breadcrumb__inner">
                <ul>
                  <li>
                    <Link to="/exam-creator">Create Exam</Link>
                  </li>
                  <li>Writing</li>
                </ul>
              </div>
            </div>
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
                                  <option value="Practice">Practice</option>
                                  <option value="Full Length">
                                    Full Length
                                  </option>
                                  <option value="Both">Both</option>
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
                        Questions
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
                              <label>Instruction</label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={writingData.passage}
                                onChange={handlePassageChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-6 col-md-6 col-12">
                          <div className="dashboard__form__wraper">
                            <div className="dashboard__form__input">
                              <label>Audio</label>
                              <input
                                type="file"
                                onChange={(e) =>
                                  dispatchWritingData({
                                    type: "audio_file",
                                    value: e.target.files[0],
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
              <div className="create__course__bottom__button">
                {formStatus.isError && (
                  <div className="text-danger mb-2">{formStatus.errMsg}</div>
                )}
                <button className="default__button" onClick={handleOnNext}>
                  Next
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
