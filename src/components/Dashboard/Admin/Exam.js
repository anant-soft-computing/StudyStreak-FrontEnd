import React, { useState } from "react";
import Footer from "../../Footer/Footer";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import DANavBar from "./DANavBar/DANavBar";
import DASideBar from "./DASideBar/DASideBar";
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

const Exam = () => {
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
            <DANavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DASideBar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Exam</h4>
                      </div>
                      <div className="row">
                        <div
                          className="col-xl-12 aos-init aos-animate"
                          data-aos="fade-up"
                        >
                          <ul
                            className="nav  about__button__wrap dashboard__button__wrap"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link active"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__one"
                                type="button"
                                aria-selected="true"
                                role="tab"
                              >
                                Create Exam
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__two"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabindex="-1"
                              >
                                View Exam
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className="tab-content tab__content__wrapper aos-init aos-animate"
                          id="myTabContent"
                          data-aos="fade-up"
                        >
                          <div
                            className="tab-pane fade active show"
                            id="projects__one"
                            role="tabpanel"
                            aria-labelledby="projects__one"
                          >
                            <div className="row">
                              {selectedExamIndex === null
                                ? exams.map((exam, index) => (
                                    <div
                                      style={{
                                        cursor: "pointer",
                                        pointerEvents: exam.isDisabled
                                          ? "none"
                                          : "",
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
                                : exams[selectedExamIndex].subMenu.map(
                                    (exam) => (
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
                                    )
                                  )}
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__two"
                            role="tabpanel"
                            aria-labelledby="projects__two"
                          >
                            <div className="row">View Exam</div>
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
      <Footer />
    </>
  );
};

export default Exam;
