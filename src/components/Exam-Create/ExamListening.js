import React, { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../UI/Tab";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const ieltsSubCategory = [
  { name: "Academic", value: "Academic" },
  { name: "General", value: "General" },
  { name: "Foundation", value: "Foundation" },
  { name: "Grammar", value: "Grammar" },
];

const pteSubCategory = [
  {
    name: "Summarize spoken text [SST]",
    value: "SST",
  },
  {
    name: "MC, choose multiple answers [CMA]",
    value: "CMA",
  },
  {
    name: "Fill in the blanks [LFIB]",
    value: "LFIB",
  },
  {
    name: "Highlight correct summar [HCS]",
    value: "HCS",
  },
  {
    name: "MC, choose single answer [CSA]",
    value: "CSA",
  },
  {
    name: "Select missing words [SMW]",
    value: "SMW",
  },
  {
    name: "Highlight incorrect words [HIW]",
    value: "HIW",
  },
  {
    name: "Write from diction [WFD]",
    value: "WFD",
  },
];

const intialListeningField = {
  no_of_questions: "10",
  difficulty_level: "Easy",
  exam_name: "",
  block_type: "Mock Test",
  sub_category: "",
  block_threshold: 0,
  audio_file: "",
  passage: "",
  question: "",
  exam_type: "Listening",
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const listeningReducer = (state, action) => {
  return { ...state, [action.type]: action.value };
};

const tabs = [{ name: "Details" }, { name: "Instruction & Audio" }];

const ExamListening = ({ category }) => {
  const [listeningData, dispatchListeningData] = useReducer(
    listeningReducer,
    intialListeningField
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
      dispatchListeningData({ type: "sub_category", value: "Academic" });
    } else if (category === "PTE") {
      dispatchListeningData({
        type: "sub_category",
        value: "SST",
      });
    } else {
      dispatchListeningData({ type: "sub_category", value: "" });
    }
  }, [category]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const navigate = useNavigate();

  const handlePassageChange = (event, editor) => {
    const data = editor.getData();
    dispatchListeningData({ type: "passage", value: data });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const validateForm = () => {
    if (!listeningData.no_of_questions) {
      setFormError("No of Question is Required");
      return false;
    }
    if (!listeningData.difficulty_level) {
      setFormError("Difficulty Level is Required");
      return false;
    }
    if (!listeningData.exam_name) {
      setFormError("Exam Name is Required");
      return false;
    }
    if (!listeningData.block_type) {
      setFormError("Block Type is Required");
      return false;
    }
    setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    return true;
  };

  const handleOnNext = () => {
    if (!validateForm()) return;
    navigate("/exam-create", { state: { listeningData, category } });
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
                    value={listeningData.exam_name}
                    onChange={(e) =>
                      dispatchListeningData({
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
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    value={listeningData.no_of_questions}
                    onChange={(e) =>
                      dispatchListeningData({
                        type: "no_of_questions",
                        value: e.target.value,
                      })
                    }
                  >
                    <option value="10">10</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                  </select>
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
                  value={listeningData.block_type}
                  onChange={(e) =>
                    dispatchListeningData({
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
            {(category === "IELTS" || category === "PTE") && (
              <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                <div className="dashboard__select__heading">
                  <span>Exam category</span>
                </div>
                <div className="dashboard__selector">
                  <select
                    className="form-select"
                    value={listeningData.sub_category}
                    onChange={(e) =>
                      dispatchListeningData({
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
            activeTab === "Instruction & Audio" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-12 col-lg-6 col-md-6 col-12 mb-4">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Instruction</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={listeningData.passage}
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
                      dispatchListeningData({
                        type: "audio_file",
                        value: e.target.files[0],
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="create__course__bottom__button text-center">
            {formStatus.isError && (
              <div className="text-danger mb-2">{formStatus.errMsg}</div>
            )}
            <button className="default__button" onClick={handleOnNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamListening;
