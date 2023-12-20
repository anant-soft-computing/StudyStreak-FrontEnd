import React, { useReducer } from "react";
import TopBar from "../TopBar/TopBar";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ajaxCall from "../../helpers/ajaxCall";

const intialExamCreate = {
  no_of_questions: "",
  difficulty_level: "",
  question_type: "",
  exam_Name: "",
  block_type: "",
  block_threshold: "",
  passage: "",
  question: "",
  exam_type: 1,
};

const reducerExamCreate = (state, action) => {
  if (action.type === "reset") {
    return {
      ...state,
    };
  }
  return { ...state, [action.type]: action.value };
};

const ExamReading = () => {
  const [examCreateData, dispatchExamCreate] = useReducer(
    reducerExamCreate,
    intialExamCreate
  );

  console.log("----examCreateData---->", examCreateData);

  const resetReducerForm = () => {
    dispatchExamCreate({
      type: "reset",
    });
  };

  const doExamCreate = async (e) => {
    resetReducerForm();
    e.preventDefault();
    const data = JSON.stringify(examCreateData);
    try {
      const response = await ajaxCall("/exam-blocks/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      });
      console.log("--Response-->", response);
    } catch (error) {
      console.log("-->", error);
    }
  };

  const handlePassageChange = (event, editor) => {
    const data = editor.getData();
    dispatchExamCreate({
      type: "passage",
      value: data,
    });
  };

  const handleQuestionsChange = (event, editor) => {
    const data = editor.getData();
    dispatchExamCreate({
      type: "question",
      value: data,
    });
  };

  return (
    <>
      <TopBar />
      <NavBar />
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
                    <li>Reading</li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 col-md-12 col-12">
                <form method="POST" onSubmit={doExamCreate}>
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
                                        value={examCreateData.no_of_questions}
                                        onChange={(e) =>
                                          dispatchExamCreate({
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
                                      value={examCreateData.difficulty_level}
                                      onChange={(e) =>
                                        dispatchExamCreate({
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
                                <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                  <div className="dashboard__select__heading">
                                    <span>Question Type</span>
                                  </div>
                                  <div className="dashboard__selector">
                                    <select
                                      className="form-select"
                                      aria-label="Default select example"
                                      value={examCreateData.question_type}
                                      onChange={(e) =>
                                        dispatchExamCreate({
                                          type: "question_type",
                                          value: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="1">MCQ</option>
                                      <option value="2">
                                        True / False
                                      </option>
                                      <option value="3">
                                        Multiple Choice
                                      </option>
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
                                        value={examCreateData.exam_Name}
                                        onChange={(e) =>
                                          dispatchExamCreate({
                                            type: "exam_Name",
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
                                      value={examCreateData.block_type}
                                      onChange={(e) =>
                                        dispatchExamCreate({
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
                                          value={examCreateData.block_threshold}
                                          onChange={(e) =>
                                            dispatchExamCreate({
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
                            <div className="col-xl-12 col-lg-6 col-md-6 col-12">
                              <div className="dashboard__form__wraper">
                                <div className="dashboard__form__input">
                                  <label>Passage</label>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={examCreateData.passage}
                                    onChange={handlePassageChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-12 col-lg-6 col-md-6 col-12">
                              <div className="dashboard__form__wraper">
                                <div className="dashboard__form__input">
                                  <label>Questions</label>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={examCreateData.question}
                                    onChange={handleQuestionsChange}
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
                    <button className="default__button">Create Block</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamReading;
