import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DASideBar from "../DASideBar/DASideBar";
import ExamWriting from "../../../Exam-Create/ExamWriting";
import ExamReading from "../../../Exam-Create/ExamReading";
import ExamListening from "../../../Exam-Create/ExamListening";
import ExamSpeaking from "../../../Exam-Create/ExamSpeaking";
import ViewExam from "./ViewExam";
import FLT from "../../../Exam-Create/FullLength-Test/FLT";
import PT from "../../../Exam-Create/Practice-Test/PT";
import Tab from "../../../UI/Tab";

const tabs = [
  { name: "View Exam" },
  { name: "Create MT" },
  { name: "Create PT" },
  { name: "Create FLT" },
];

const exams = [
  {
    name: "IELTS",
    link: "/admin-exam/IELTS",
    isDisabled: false,
  },
  {
    name: "TOFEL",
    link: "/admin-exam/TOFEL",
    isDisabled: false,
  },
  {
    name: "PTE",
    link: "/admin-exam/PTE",
    isDisabled: false,
  },
  {
    name: "DUOLINGO",
    subMenu: [],
    link: "/admin-exam/DUOLINGO",
    isDisabled: true,
  },
  {
    name: "GRE",
    link: "/admin-exam/GRE",
    isDisabled: false,
  },
  {
    name: "GMAT",
    link: "/admin-exam/GMAT",
    isDisabled: false,
  },
  {
    name: "GENERAL",
    link: "/admin-exam/GENERAL",
    isDisabled: false,
  },
];

const Exam = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [screenContent, setScreenContent] = useState({
    exam: "",
    examType: "",
    examForm: "",
  });
  
  const [activeTab, setActiveTab] = useState(() => {
    const examTab = localStorage.getItem("examTab");
    return examTab || "View Exam";
  });

  const examTypes =
    screenContent?.examType === "GRE" || screenContent?.examType === "GMAT"
      ? [
          {
            name: "AWA",
            link: `/admin-exam/${screenContent?.examType}/AWA`,
          },
          {
            name: "Integrated Reasoning",
            link: `/admin-exam/${screenContent?.examType}/Integrated-Reasoning`,
          },
          {
            name: "Quantitative Reasoning",
            link: `/admin-exam/${screenContent?.examType}/Quantitative-Reasoning`,
          },
          {
            name: "Verbal Reasoning",
            link: `/admin-exam/${screenContent?.examType}/Verbal-Reasoning`,
          },
        ]
      : screenContent?.examType === "GENERAL"
      ? [
          {
            name: "General",
            link: `/admin-exam/${screenContent?.examType}/General`,
          },
        ]
      : [
          {
            name: "Reading",
            link: `/admin-exam/${screenContent?.examType}/Reading`,
          },
          {
            name: "Writing",
            link: `/admin-exam/${screenContent?.examType}/Writing`,
          },
          {
            name: "Listening",
            link: `/admin-exam/${screenContent?.examType}/Listening`,
          },
          {
            name: "Speaking",
            link: `/admin-exam/${screenContent?.examType}/Speaking`,
          },
        ];

  useEffect(() => {
    const examType = location.pathname.split("/")[2];
    const examForm = location.pathname.split("/")[3];
    if (!examType && !examForm) {
      setScreenContent({ exam: "Exam", examType: "", examForm: "" });
    } else if (examType && !examForm) {
      setScreenContent({ exam: "Exam", examType: examType, examForm: "" });
    } else if (examType && examForm) {
      setScreenContent({
        exam: "Exam",
        examType: examType,
        examForm: examForm,
      });
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem("examTab", activeTab);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNavigate = (link) => {
    if (link !== "") navigate(link);
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DASideBar />
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Exam</h4>
                      {activeTab !== "Create FLT" && (
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            {screenContent.exam && (
                              <li className="breadcrumb-item">
                                <Link to="/admin-exam">
                                  {screenContent.exam}
                                </Link>
                              </li>
                            )}
                            {screenContent.examType && (
                              <li className="breadcrumb-item">
                                <Link
                                  to={`/admin-exam/${screenContent.examType}`}
                                >
                                  {screenContent.examType}
                                </Link>
                              </li>
                            )}
                            {screenContent.examForm && (
                              <li className="breadcrumb-item">
                                {screenContent.examForm}
                              </li>
                            )}
                          </ol>
                        </nav>
                      )}
                    </div>
                    <div className="row">
                      <Tab
                        tabs={tabs}
                        activeTab={activeTab}
                        handleTabChange={handleTabChange}
                      />
                      <div className="tab-content tab__content__wrapper aos-init aos-animate">
                        <div
                          className={`tab-pane fade ${
                            activeTab === "Create MT" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            {!screenContent.examType &&
                              !screenContent.examForm &&
                              exams.map((exam, index) => (
                                <div
                                  style={{
                                    cursor: "pointer",
                                    pointerEvents: exam.isDisabled
                                      ? "none"
                                      : "",
                                  }}
                                  className="col-xl-3 col-lg-6 col-md-12 col-12"
                                  onClick={() => handleNavigate(exam.link)}
                                  key={index}
                                >
                                  <div className="dashboard__single__counter">
                                    <div className="counterarea__text__wraper justify-content-center">
                                      <div className="counter__content__wraper">
                                        <p>{exam.name}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {screenContent.examType &&
                              !screenContent.examForm &&
                              examTypes.map((exam, index) => (
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="col-xl-3 col-lg-6 col-md-12 col-12"
                                  onClick={() => handleNavigate(exam.link)}
                                  key={index}
                                >
                                  <div className="dashboard__single__counter">
                                    <div className="counterarea__text__wraper justify-content-center">
                                      <div className="counter__content__wraper">
                                        <p>{exam.name}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {(screenContent.examType &&
                              (screenContent.examForm === "Reading" ||
                                screenContent.examForm === "AWA" ||
                                screenContent.examForm ===
                                  "Integrated-Reasoning" ||
                                screenContent.examForm ===
                                  "Quantitative-Reasoning" ||
                                screenContent.examForm === "Verbal-Reasoning" ||
                                screenContent.examForm === "General") && (
                                <ExamReading
                                  category={screenContent.examType}
                                  examType={screenContent.examForm}
                                />
                              )) ||
                              (screenContent.examForm === "Writing" && (
                                <ExamWriting
                                  category={screenContent.examType}
                                />
                              )) ||
                              (screenContent.examForm === "Listening" && (
                                <ExamListening
                                  category={screenContent.examType}
                                />
                              )) ||
                              (screenContent.examForm === "Speaking" && (
                                <ExamSpeaking
                                  category={screenContent.examType}
                                />
                              ))}
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "Create PT" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            {!screenContent.examType &&
                              !screenContent.examForm &&
                              exams.map((exam, index) => (
                                <div
                                  style={{
                                    cursor: "pointer",
                                    pointerEvents: exam.isDisabled
                                      ? "none"
                                      : "",
                                  }}
                                  className="col-xl-3 col-lg-6 col-md-12 col-12"
                                  onClick={() => handleNavigate(exam.link)}
                                  key={index}
                                >
                                  <div className="dashboard__single__counter">
                                    <div className="counterarea__text__wraper justify-content-center">
                                      <div className="counter__content__wraper">
                                        <p>{exam.name}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {screenContent.examType &&
                              !screenContent.examForm &&
                              examTypes.map((exam, index) => (
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="col-xl-3 col-lg-6 col-md-12 col-12"
                                  onClick={() => handleNavigate(exam.link)}
                                  key={index}
                                >
                                  <div className="dashboard__single__counter">
                                    <div className="counterarea__text__wraper justify-content-center">
                                      <div className="counter__content__wraper">
                                        <p>{exam.name}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {(screenContent.examType &&
                              screenContent.examForm === "Reading" && (
                                <PT
                                  activeTab={activeTab}
                                  setActiveTab={setActiveTab}
                                  type={screenContent.examForm}
                                  category={screenContent.examType}
                                />
                              )) ||
                              (screenContent.examForm === "Writing" && (
                                <PT
                                  activeTab={activeTab}
                                  setActiveTab={setActiveTab}
                                  type={screenContent.examForm}
                                  category={screenContent.examType}
                                />
                              )) ||
                              (screenContent.examForm === "Listening" && (
                                <PT
                                  activeTab={activeTab}
                                  setActiveTab={setActiveTab}
                                  type={screenContent.examForm}
                                  category={screenContent.examType}
                                />
                              )) ||
                              (screenContent.examForm === "Speaking" && (
                                <PT
                                  activeTab={activeTab}
                                  setActiveTab={setActiveTab}
                                  type={screenContent.examForm}
                                  category={screenContent.examType}
                                />
                              )) ||
                              (screenContent.examForm === "General" && (
                                <PT
                                  activeTab={activeTab}
                                  setActiveTab={setActiveTab}
                                  type={screenContent.examForm}
                                  category={screenContent.examType}
                                />
                              ))}
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "Create FLT" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            {!screenContent.examType &&
                              !screenContent.examForm &&
                              exams.map((exam, index) => (
                                <div
                                  style={{
                                    cursor: "pointer",
                                    pointerEvents: exam.isDisabled
                                      ? "none"
                                      : "",
                                  }}
                                  className="col-xl-3 col-lg-6 col-md-12 col-12"
                                  onClick={() => handleNavigate(exam.link)}
                                  key={index}
                                >
                                  <div className="dashboard__single__counter">
                                    <div className="counterarea__text__wraper justify-content-center">
                                      <div className="counter__content__wraper">
                                        <p>{exam.name}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {screenContent.examType && (
                              <FLT
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                              />
                            )}
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "View Exam" ? "show active" : ""
                          }`}
                        >
                          <ViewExam key={activeTab} activeTab={activeTab} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
