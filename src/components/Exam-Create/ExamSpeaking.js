import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import Tab from "../UI/Tab";

const initialSpeakingField = {
  name: "",
  difficulty_level: "Easy",
  block_threshold: 0,
  questions: [{ question: "", question_number: "" }],
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerSpeaking = (state, action) => {
  return { ...state, [action.type]: action.value };
};

const tabs = [{ name: "Details" }, { name: "Question" }];

const ExamSpeaking = ({ category }) => {
  const [SpeakingData, dispatchSpeakingData] = useReducer(
    reducerSpeaking,
    initialSpeakingField
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeTab, setActiveTab] = useState("Details");
  const navigate = useNavigate();

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
    setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    return true;
  };

  const submitSpeakingExam = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const data = {
      ...SpeakingData,
      exam_category: category,
    };
    try {
      const response = await ajaxCall(
        "/speaking-block/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify(data),
        },
        8000
      );
      if (response.status === 201) {
        toast.success("Speaking Exam Create Successfully");
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
                  <label>Exam Name</label>
                  <input
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
                  <label>Exam Type</label>
                  <select
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
                    <label>Question Number</label>
                    <input
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
                <div className="dashboard__form__wraper">
                  <div className="dashboard__form__input">
                    <label>Question</label>
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
            <button className="default__button" onClick={submitSpeakingExam}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamSpeaking;
