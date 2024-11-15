import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Tab from "../../../UI/Tab";
import SelectSearch from "react-select-search";
import SelectionBox from "../../../UI/SelectionBox";
import ajaxCall from "../../../../helpers/ajaxCall";
import SingleSelection from "../../../UI/SingleSelect";

const initialLessonData = {
  section: "",
  Lesson_Title: "",
  Lesson_Description: "",
  Lesson_Video: "",
  Lesson_Duration: "",
  lesson_assignment: [],
  sequence: 0,
  active: false,
  lesson_attachments: [{ attachment: null, attachment_description: "" }],
  quiz_questions: [
    {
      Question: "",
      quiz_options: [
        { Answers: "", correct_answer: false },
        { Answers: "", correct_answer: false },
        { Answers: "", correct_answer: false },
        { Answers: "", correct_answer: false },
      ],
    },
  ],
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerCreateLesson = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialLessonData;
  }
  return { ...state, [action.type]: action.value };
};

const tabs = [
  { name: "Lesson Details" },
  { name: "Lesson Attachments" },
  { name: "Lesson Quiz" },
];

const validateForm = (createLessonData, setFormError) => {
  if (!createLessonData.Lesson_Title) {
    setFormError("Lesson Title is Required");
    return false;
  }
  if (!createLessonData.sequence) {
    setFormError("Lesson Sequence is Required");
    return false;
  }
  return true;
};

const CreateLesson = ({ parentActiveTab, parentSetActiveTab }) => {
  const [createLessonData, dispatchCreateLesson] = useReducer(
    reducerCreateLesson,
    initialLessonData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeTab, setActiveTab] = useState("Lesson Details");
  const authData = useSelector((state) => state.authStore);

  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const resetReducerForm = () => {
    dispatchCreateLesson({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const addedSelectVal = (fieldName, proFieldName, isSingle, val) => {
    if (isSingle) {
      dispatchCreateLesson({
        type: fieldName,
        value: val,
      });
      dispatchCreateLesson({
        type: proFieldName,
        value: +val[0]?.id,
      });
      return;
    }
    const newValIds = val.map((ids) => ids.id);
    dispatchCreateLesson({
      type: fieldName,
      value: val,
    });
    dispatchCreateLesson({
      type: proFieldName,
      value: newValIds,
    });
  };

  const addContent = () => {
    const updatedAttachments = [
      ...createLessonData.lesson_attachments,
      { attachment: null, attachment_description: "" },
    ];
    dispatchCreateLesson({
      type: "lesson_attachments",
      value: updatedAttachments,
    });
  };

  const removeContent = (index) => {
    const updatedAttachments = createLessonData.lesson_attachments.filter(
      (_, i) => i !== index
    );
    dispatchCreateLesson({
      type: "lesson_attachments",
      value: updatedAttachments,
    });
  };

  const handleInputChange = (qIndex, field, value) => {
    const updatedQuestions = [...createLessonData.quiz_questions];

    if (field === "Question") {
      updatedQuestions[qIndex].Question = value;
    } else {
      const optionIndex = parseInt(field.split("_")[1], 10); // Get option index from the field
      updatedQuestions[qIndex].quiz_options[optionIndex].Answers = value;
    }

    dispatchCreateLesson({
      type: "quiz_questions",
      value: updatedQuestions,
    });
  };

  const handleCorrectAnswerChange = (qIndex, optionIndex) => {
    const updatedQuestions = [...createLessonData.quiz_questions];

    // Set correct_answer to true for the selected option and false for others
    updatedQuestions[qIndex].quiz_options = updatedQuestions[
      qIndex
    ].quiz_options.map((option, idx) => ({
      ...option,
      correct_answer: idx === optionIndex,
    }));

    dispatchCreateLesson({
      type: "quiz_questions",
      value: updatedQuestions,
    });
  };

  const addNewQuestion = () => {
    const newQuestion = {
      Question: "",
      quiz_options: [
        { Answers: "", correct_answer: false },
        { Answers: "", correct_answer: false },
        { Answers: "", correct_answer: false },
        { Answers: "", correct_answer: false },
      ],
    };

    dispatchCreateLesson({
      type: "quiz_questions",
      value: [...createLessonData.quiz_questions, newQuestion],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = createLessonData.quiz_questions.filter(
      (_, i) => i !== index
    );

    dispatchCreateLesson({
      type: "quiz_questions",
      value: updatedQuestions,
    });
  };
  const createLesson = async (e) => {
    e.preventDefault();
    if (!validateForm(createLessonData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });

    const formData = new FormData();

    formData.append("section", createLessonData?.section);
    formData.append("Lesson_Title", createLessonData?.Lesson_Title);
    formData.append("Lesson_Description", createLessonData?.Lesson_Description);
    formData.append("Lesson_Duration", createLessonData?.Lesson_Duration);
    formData.append("active", createLessonData?.active);
    formData.append("sequence", createLessonData?.sequence);
    formData.append("Lesson_Video", encodeURI(createLessonData.Lesson_Video));

    createLessonData.lesson_assignment.forEach((item, index) => {
      formData.append(`lesson_assignment`, item.id);
    });

    // Append lesson attachments
    createLessonData.lesson_attachments.forEach((attachment, index) => {
      if (attachment.attachment) {
        formData.append(
          `lesson_attachments[${index}]attachment`,
          attachment.attachment
        );
      }
      formData.append(
        `lesson_attachments[${index}]attachment_description`,
        attachment.attachment_description
      );
    });

    // Append quiz questions and their options
    createLessonData.quiz_questions.forEach((question, qIndex) => {
      formData.append(`quiz_questions[${qIndex}]Question`, question.Question);

      question.quiz_options.forEach((option, optIndex) => {
        formData.append(
          `quiz_questions[${qIndex}]quiz_options[${optIndex}]Answers`,
          option.Answers
        );
        formData.append(
          `quiz_questions[${qIndex}]quiz_options[${optIndex}]correct_answer`,
          option.correct_answer
        );
      });
    });

    try {
      const response = await ajaxCall(
        "/lesson-create/",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: formData,
        },
        8000
      );

      if (response.status === 201) {
        resetReducerForm();
        parentSetActiveTab("View Lesson");
        toast.success("Lesson Created Successfully");
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

  useEffect(() => {
    if (parentActiveTab === "Create Lesson") {
      const fetchVideoLinks = async () => {
        setIsLoading(true);
        try {
          const response = await ajaxCall(
            "/list/lessons-videos/",
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData?.accessToken}`,
              },
              method: "GET",
            },
            8000
          );
          if (response?.status === 200) {
            const result = response?.data?.files?.map((item) => ({
              name: item?.url?.slice(62),
              value: item?.url,
            }));
            setOptions(result);
          }
        } catch (error) {
          console.log("API Error: ", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchVideoLinks();
    }
  }, [authData?.accessToken, parentActiveTab]);

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
            activeTab === "Lesson Details" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
              <div className="dashboard__select__heading">
                <span>Section</span>
              </div>
              <div className="dashboard__selector">
                <SingleSelection
                  value={createLessonData.section}
                  onChange={(val) => {
                    dispatchCreateLesson({
                      type: "section",
                      value: val,
                    });
                  }}
                  url="/lessonsection-list/"
                  objKey={["name"]}
                  isSearch={true}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Lesson Title"
                    value={createLessonData.Lesson_Title}
                    onChange={(e) => {
                      dispatchCreateLesson({
                        type: "Lesson_Title",
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
                  <input
                    type="text"
                    placeholder="Lesson Description"
                    value={createLessonData.Lesson_Description}
                    onChange={(e) => {
                      dispatchCreateLesson({
                        type: "Lesson_Description",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
              <div className="dashboard__select__heading">
                <span>Video</span>
              </div>
              <div className="dashboard__selector">
                <SelectSearch
                  search
                  options={options}
                  className="select-search"
                  value={createLessonData.Lesson_Video}
                  onChange={(val) => {
                    dispatchCreateLesson({
                      type: "Lesson_Video",
                      value: val,
                    });
                  }}
                  placeholder={
                    isLoading
                      ? "Loading"
                      : options?.length
                      ? "Select Options"
                      : "No Data Found"
                  }
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Duration</label>
                  <input
                    type="text"
                    placeholder="Lesson Duration"
                    value={createLessonData.Lesson_Duration}
                    onChange={(e) => {
                      dispatchCreateLesson({
                        type: "Lesson_Duration",
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__select__heading">
                <span>Assignment</span>
              </div>
              <div className="dashboard__selector">
                <SelectionBox
                  value={createLessonData?.lesson_assignment}
                  onSelect={addedSelectVal.bind(
                    null,
                    "lesson_assignment",
                    "lesson_assignmentId",
                    false
                  )}
                  url="/assignment-exam-list/"
                  name="lesson_assignment"
                  objKey={["name"]}
                  isSearch={true}
                  multiple={true}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Sequence</label>
                  <input
                    type="number"
                    placeholder="Lesson Sequence"
                    value={createLessonData.sequence}
                    onChange={(e) =>
                      dispatchCreateLesson({
                        type: "sequence",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="form__check">
              <label>Active</label>{" "}
              <input
                type="checkbox"
                value={createLessonData.active}
                onChange={(e) => {
                  dispatchCreateLesson({
                    type: "active",
                    value: e.target.checked,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Lesson Attachments" ? "show active" : ""
          }`}
        >
          <div className="row">
            {createLessonData.lesson_attachments.map((_, index) => (
              <div className="row" key={index}>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor={`attachment-${index}`}>Document</label>
                      <div className="d-flex align-items-center">
                        <input
                          id={`attachment-${index}`}
                          type="file"
                          className="form-control"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const updatedAttachments = [
                              ...createLessonData.lesson_attachments,
                            ];
                            updatedAttachments[index].attachment = file;
                            dispatchCreateLesson({
                              type: "lesson_attachments",
                              value: updatedAttachments,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label htmlFor={`description-${index}`}>
                        Description
                      </label>
                      <div className="d-flex align-items-center">
                        <input
                          id={`description-${index}`}
                          type="text"
                          className="form-control"
                          placeholder="Description of Lesson Attachment"
                          value={
                            createLessonData.lesson_attachments[index]
                              .attachment_description
                          }
                          onChange={(e) => {
                            const updatedAttachments = [
                              ...createLessonData.lesson_attachments,
                            ];
                            updatedAttachments[index].attachment_description =
                              e.target.value;
                            dispatchCreateLesson({
                              type: "lesson_attachments",
                              value: updatedAttachments,
                            });
                          }}
                        />
                        {createLessonData.lesson_attachments.length > 1 && (
                          <button
                            className="dashboard__small__btn__2 flash-card__remove__btn"
                            onClick={() => removeContent(index)}
                          >
                            <i className="icofont-ui-delete" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="col-xl-12">
              <button className="dashboard__small__btn__2" onClick={addContent}>
                + Description & Document
              </button>
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Lesson Quiz" ? "show active" : ""
          }`}
        >
          <div className="row">
            {createLessonData.quiz_questions.map((quiz, qIndex) => (
              <div key={qIndex} className="mt-4">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                    <div className="dashboard__form__wraper">
                      <div className="dashboard__form__input">
                        <label>Question ({qIndex + 1})</label>
                        <input
                          type="text"
                          placeholder="Enter question"
                          value={quiz.Question}
                          onChange={(e) =>
                            handleInputChange(
                              qIndex,
                              "Question",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className="dashboard__small__btn__2 flash-card__remove__btn"
                    onClick={() => removeQuestion(qIndex)}
                  >
                    <i className="icofont-ui-delete" />
                  </button>
                </div>

                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  {quiz.quiz_options.map((option, optIndex) => (
                    <div key={optIndex}>
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>{`Option ${String.fromCharCode(
                            65 + optIndex
                          )}`}</label>
                          <input
                            type="text"
                            placeholder={`Option ${String.fromCharCode(
                              65 + optIndex
                            )}`}
                            value={option.Answers}
                            onChange={(e) =>
                              handleInputChange(
                                qIndex,
                                `option_${optIndex}`,
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="form__check">
                        <label>Is This Correct</label>
                        <input
                          type="checkbox"
                          checked={option.correct_answer}
                          onChange={() =>
                            handleCorrectAnswerChange(qIndex, optIndex)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="col-xl-12 mt-4">
              <button
                className="dashboard__small__btn__2"
                onClick={addNewQuestion}
              >
                + Question
              </button>
            </div>

            <div className="row">
              <div className="create__course__bottom__button text-center mt-4">
                {formStatus.isError && (
                  <div className="text-danger mb-2">{formStatus.errMsg}</div>
                )}
                {formStatus.isSubmitting ? (
                  <Spinner animation="border" style={{ color: "#01579b" }} />
                ) : (
                  <button
                    className="default__button"
                    onClick={createLesson}
                    disabled={formStatus.isSubmitting}
                  >
                    Create Lesson
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateLesson;
