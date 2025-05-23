import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Tab from "../UI/Tab";
import ajaxCall from "../../helpers/ajaxCall";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ieltsSubCategory = [
  { name: "Academic", value: "Academic" },
  { name: "General", value: "General" },
  { name: "Foundation", value: "Foundation" },
  { name: "Grammar", value: "Grammar" },
];

const pteSubCategory = [
  { name: "Read aloud [RA]", value: "RA" },
  { name: "Repeat sentence [RS]", value: "RS" },
  { name: "Describe image [DI]", value: "DI" },
  { name: "Re-tell lecture [RL]", value: "RL" },
  { name: "Answer short question [ASQ]", value: "ASQ" },
  { name: "Respond to a situation [RTS]", value: "RTS" },
  { name: "Summarize group discussion [SGD]", value: "SGD" },
];

const initialSpeakingField = {
  name: "",
  sub_category: "",
  difficulty_level: "Easy",
  block_threshold: 0,
  questions: [{ question: "", file: "", question_number: "" }],
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerSpeaking = (state, action) => {
  if (action.type === "reset") {
    return initialSpeakingField;
  }
  return { ...state, [action.type]: action.value };
};

const tabs = [{ name: "Details" }, { name: "Question" }];

const ExamSpeaking = ({ category }) => {
  const navigate = useNavigate();
  const [SpeakingData, dispatchSpeakingData] = useReducer(
    reducerSpeaking,
    initialSpeakingField
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeTab, setActiveTab] = useState("Details");

  const examSubCategory =
    category === "IELTS"
      ? ieltsSubCategory
      : category === "PTE"
      ? pteSubCategory
      : [];

  useEffect(() => {
    if (category === "IELTS") {
      dispatchSpeakingData({ type: "sub_category", value: "Academic" });
    } else if (category === "PTE") {
      dispatchSpeakingData({ type: "sub_category", value: "RA" });
    } else {
      dispatchSpeakingData({ type: "sub_category", value: "" });
    }
  }, [category]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const addQuestion = () => {
    dispatchSpeakingData({
      type: "questions",
      value: [...SpeakingData.questions, { question: "", question_number: "" }],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = SpeakingData.questions.filter(
      (_, i) => i !== index
    );
    dispatchSpeakingData({ type: "questions", value: updatedQuestions });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...SpeakingData.questions];
    updatedQuestions[index][field] = value;
    dispatchSpeakingData({ type: "questions", value: updatedQuestions });
  };

  const validateForm = () => {
    if (!SpeakingData.difficulty_level) {
      setFormError("Difficulty Level is Required");
      return false;
    }
    if (!SpeakingData.name) {
      setFormError("Exam Name is Required");
      return false;
    }
    if (
      !SpeakingData.questions.every(
        (question) => question.question && question.question_number
      )
    ) {
      setFormError("All Questions must have both Question and Question Number");
      return false;
    }
    if (
      category === "PTE" &&
      (SpeakingData.sub_category === "DI" ||
        SpeakingData.sub_category === "SGD")
    ) {
      if (!SpeakingData.questions.every((question) => question.file)) {
        SpeakingData.sub_category === "DT"
          ? setFormError(
              "All Questions must have an image for Describe Image (DI)"
            )
          : setFormError(
              "All Questions must have an audio for Summarize Group Discussion (SGD)"
            );
        return false;
      }
    }
    setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    return true;
  };

  const submitSpeakingExam = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus((prev) => ({ ...prev, isSubmitting: true }));
    try {
      const formData = new FormData();
      formData.append("exam_category", category);
      formData.append("name", SpeakingData.name);
      formData.append("sub_category", SpeakingData.sub_category);
      formData.append("difficulty_level", SpeakingData.difficulty_level);
      formData.append("block_threshold", SpeakingData.block_threshold);
      SpeakingData.questions.forEach((question, index) => {
        formData.append(`questions[${index}]question`, question.question);
        formData.append(
          `questions[${index}]question_number`,
          question.question_number
        );
        formData.append(`questions[${index}]file`, question.file);
      });
      const response = await ajaxCall(
        "/speaking-block/",
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: formData,
        },
        8000
      );
      if (response.status === 201) {
        toast.success("Speaking Exam Created Successfully");
        navigate("/admin-exam");
        dispatchSpeakingData({ type: "reset" });
      } else if (response.status === 400) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    } finally {
      setFormStatus((prev) => ({ ...prev, isSubmitting: false }));
    }
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
            activeTab === "Details" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label htmlFor="exam-name">Exam Name</label>
                  <input
                    id="exam-name"
                    type="text"
                    placeholder="Exam Name"
                    value={SpeakingData.name}
                    onChange={(e) =>
                      dispatchSpeakingData({
                        type: "name",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label htmlFor="exam-type">Exam Type</label>
                  <select
                    id="exam-type"
                    className="form-select"
                    aria-label="Default select example"
                    value={SpeakingData.block_threshold}
                    onChange={(e) =>
                      dispatchSpeakingData({
                        type: "block_threshold",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="0">Assignment</option>
                    <option value="1">Mock Test</option>
                  </select>
                </div>
              </div>
            </div>
            {(category === "IELTS" || category === "PTE") && (
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="dashboard__select__heading">
                  <span>Exam category</span>
                </div>
                <div className="dashboard__selector">
                  <select
                    className="form-select"
                    value={SpeakingData.sub_category}
                    onChange={(e) =>
                      dispatchSpeakingData({
                        type: "sub_category",
                        value: e.target.value,
                      })
                    }
                  >
                    {examSubCategory.map((item, index) => (
                      <option key={index} value={item.value}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Question" ? "show active" : ""
          }`}
        >
          <div className="row">
            {SpeakingData.questions.map((question, index) => (
              <div className="col-xl-6 col-lg-6 col-md-6 col-12" key={index}>
                <div className="dashboard__form__wraper">
                  <div className="dashboard__form__input">
                    <label htmlFor={`question-number-${index}`}>
                      Question Number
                    </label>
                    <input
                      id={`question-number-${index}`}
                      type="number"
                      placeholder="Question Number"
                      value={question.question_number}
                      onChange={(e) =>
                        handleQuestionChange(
                          index,
                          "question_number",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                {category === "PTE" &&
                  (SpeakingData.sub_category === "DI" ||
                    SpeakingData.sub_category === "SGD") && (
                    <div className="dashboard__form__wraper">
                      <div className="dashboard__form__input">
                        <label htmlFor={`question-file-${index}`}>
                          Question Image / Audio
                        </label>
                        <input
                          id={`question-file-${index}`}
                          type="file"
                          onChange={(e) =>
                            handleQuestionChange(
                              index,
                              "file",
                              e.target.files[0]
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                <div className="dashboard__form__wraper">
                  <div className="dashboard__form__input">
                    <label htmlFor={`question-${index}`}>Question</label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={question.question}
                      onChange={(event, editor) => {
                        handleQuestionChange(
                          index,
                          "question",
                          editor.getData()
                        );
                      }}
                    />
                  </div>
                </div>
                {SpeakingData.questions.length > 1 && (
                  <button
                    className="dashboard__small__btn__2 flash-card__remove__btn"
                    onClick={() => removeQuestion(index)}
                  >
                    <i className="icofont-ui-delete" />
                  </button>
                )}
              </div>
            ))}
            <div className="col-xl-12 mt-2">
              <button
                className="dashboard__small__btn__2"
                onClick={addQuestion}
              >
                Add Question
              </button>
            </div>
          </div>
          <div className="create__course__bottom__button text-center mt-4">
            {formStatus.isError && (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            )}
            <button
              className="default__button"
              onClick={submitSpeakingExam}
              disabled={formStatus.isSubmitting}
            >
              {formStatus.isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamSpeaking;
