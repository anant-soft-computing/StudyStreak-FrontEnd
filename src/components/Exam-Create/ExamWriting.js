import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import Tab from "../UI/Tab";

const intialWritingField = {
  no_of_questions: "",
  difficulty_level: "Easy",
  exam_name: "",
  block_type: "Mock Test",
  block_threshold: 0,
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

const tabs = [{ name: "Details" }, { name: "Passage" }];

const ExamWriting = ({ category }) => {
  const [writingData, dispatchWritingData] = useReducer(
    reducerWriting,
    intialWritingField
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeTab, setActiveTab] = useState("Details");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const navigate = useNavigate();

  const handlePassageChange = (event, editor) => {
    const data = editor.getData();
    dispatchWritingData({ type: "passage", value: data });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
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
      setFormError("Exam Name is Required");
      return false;
    }
    if (!writingData.block_type) {
      setFormError("Block Type is Required");
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
    setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    return true;
  };

  const submitWritingExam = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const witingQuestionStrucutre = [
      { type: "Textarea", numberOfQuestions: 1 },
    ];
    const data = {
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
      const response = await ajaxCall(
        "/exam-blocks/",
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
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__select__heading">
                <span>Exam Type</span>
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
                  <option value="Assignments">Assignment</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Passage" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-12 col-lg-6 col-md-6 col-12">
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
          <div className="create__course__bottom__button text-center">
            {formStatus.isError && (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            )}
            <button className="default__button" onClick={submitWritingExam}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamWriting;
