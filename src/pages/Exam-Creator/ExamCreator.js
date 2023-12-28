import React, { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import NavBar from "../../components/NavBar/NavBar";
import ExSideBar from "../../components/Exam-Create/SideBar/ExSideBar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const exams = [
  {
    name: "IELTS",
    subMenu: [
      {
        name: "Reading",
        link: "/exam-reading",
      },
      {
        name: "Listening",
        link: "/exam-listening",
      },
      {
        name: "Writing",
        link: "",
      },
      {
        name: "Speaking",
        link: "",
      },
    ],
    isDisabled: false,
  },
  {
    name: "TOEFL",
    subMenu: [],
    isDisabled: true,
  },
  {
    name: "PTE",
    subMenu: [],
    isDisabled: true,
  },
  {
    name: "DUOLINGO",
    subMenu: [],
    isDisabled: true,
  },
  {
    name: "GRE",
    subMenu: [],
    isDisabled: true,
  },
  {
    name: "GMAT",
    subMenu: [],
    isDisabled: true,
  },
];

const ExamCreator = () => {
  const navigate = useNavigate();
  const [selectedExamIndex, setSelectedExamIndex] = useState(null);

  const handleSelectExam = (index) => setSelectedExamIndex(index);

  const handleExamClick = (exam) => {
    if (exam.link !== "") navigate(exam.link);
  };

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="dashboardarea sp_bottom_100">
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <ExSideBar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>
                          {selectedExamIndex !== null
                            ? "Create Exam Block"
                            : "Create Practice test"}
                        </h4>
                      </div>
                      <div className="row">
                        {selectedExamIndex === null
                          ? exams.map((exam, index) => (
                              <div
                                style={{
                                  cursor: "pointer",
                                  pointerEvents: exam.isDisabled ? "none" : "",
                                }}
                                className="col-xl-3 col-lg-6 col-md-12 col-12"
                                onClick={() => handleSelectExam(index)}
                              >
                                <div className="dashboard__single__counter">
                                  <div className="counterarea__text__wraper justify-content-center">
                                    <div className="counter__content__wraper">
                                      <p>{exam.name}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          : exams[selectedExamIndex].subMenu.map((exam) => (
                              <div
                                style={{ cursor: "pointer" }}
                                className="col-xl-3 col-lg-6 col-md-12 col-12"
                                onClick={() => handleExamClick(exam)}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExamCreator;