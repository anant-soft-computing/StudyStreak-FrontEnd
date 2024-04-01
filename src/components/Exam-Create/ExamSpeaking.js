import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import Tab from "../UI/Tab";

const intialSpeakingField = {
  no_of_questions: "",
  difficulty_level: "Easy",
  exam_name: "",
  block_type: "Mock Test",
  block_threshold: "",
  passage: "",
  exam_type: "Speaking",
  answers: [],
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const reducerSpeaking = (state, action) => {
  return { ...state, [action.type]: action.value };
};

const tabs = [
  { name: "Questions Details" },
  { name: "Block Details" },
  { name: "Passage" },
];

const ExamSpeaking = ({ category }) => {
  const [SpeakingData, dispatchSpeakingData] = useReducer(
    reducerSpeaking,
    intialSpeakingField
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [activeTab, setActiveTab] = useState("Questions Details");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const navigate = useNavigate();

  const handlePassageChange = (event, editor) => {
    const data = editor.getData();
    dispatchSpeakingData({
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
    if (!SpeakingData.no_of_questions) {
      setFormError("No of Question is Required");
      return false;
    }
    if (!SpeakingData.difficulty_level) {
      setFormError("Difficulty Level is Required");
      return false;
    }
    if (!SpeakingData.exam_name) {
      setFormError("Block Name is Required");
      return false;
    }
    if (!SpeakingData.block_type) {
      setFormError("Block Type is Required");
      return false;
    }
    if (!SpeakingData.block_threshold) {
      setFormError("Block Threshold is Required");
      return false;
    }
    if (!SpeakingData.passage) {
      setFormError("Passage is Required");
      return false;
    }

    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const submitSpeakingExam = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = {
      block_threshold: SpeakingData.block_threshold,
      block_type: SpeakingData.block_type,
      difficulty_level: SpeakingData.difficulty_level,
      exam_name: SpeakingData.exam_name,
      exam_type: SpeakingData.exam_type,
      no_of_questions: SpeakingData.no_of_questions,
      passage: SpeakingData.passage,
      answers: SpeakingData.answers,
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
        toast.success("Speaking Exam Create SuccessFully");
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
            activeTab === "Questions Details" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Number of Question</label>
                  <input
                    type="number"
                    placeholder="Number of Question"
                    value={SpeakingData.no_of_questions}
                    onChange={(e) =>
                      dispatchSpeakingData({
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
                  value={SpeakingData.difficulty_level}
                  onChange={(e) =>
                    dispatchSpeakingData({
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
        <div
          className={`tab-pane fade ${
            activeTab === "Block Details" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Block Name</label>
                  <input
                    type="text"
                    placeholder="Block Name"
                    value={SpeakingData.exam_name}
                    onChange={(e) =>
                      dispatchSpeakingData({
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
                  value={SpeakingData.block_type}
                  onChange={(e) =>
                    dispatchSpeakingData({
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
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="dashboard__form__wraper">
                  <div className="dashboard__form__input">
                    <label>Block Threshold</label>
                    <input
                      type="number"
                      placeholder="Block Threshold"
                      value={SpeakingData.block_threshold}
                      onChange={(e) =>
                        dispatchSpeakingData({
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
                    data={SpeakingData.passage}
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
