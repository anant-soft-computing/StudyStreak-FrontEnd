import React from "react";
import TopBar from "../../components/TopBar/TopBar";
import NavBar from "../../components/NavBar/NavBar";
import ExSideBar from "../../components/Exam-Creator/SideBar/ExSideBar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const ExamCreator = () => {
  const navigate = useNavigate();
  const onReading = () => {
    navigate("/exam-reading");
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
                        <h4>Create Exam Block</h4>
                      </div>
                      <div className="row">
                        <div
                          style={{ cursor: "pointer" }}
                          className="col-xl-3 col-lg-6 col-md-12 col-12"
                          onClick={onReading}
                        >
                          <div className="dashboard__single__counter">
                            <div className="counterarea__text__wraper justify-content-center">
                              <div className="counter__content__wraper">
                                <p className="text-center">Reading</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ cursor: "pointer" }} className="col-xl-3 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__single__counter">
                            <div className="counterarea__text__wraper justify-content-center">
                              <div className="counter__content__wraper">
                                <p>Listening</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ cursor: "pointer" }} className="col-xl-3 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__single__counter">
                            <div className="counterarea__text__wraper justify-content-center">
                              <div className="counter__content__wraper">
                                <p>Writing</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ cursor: "pointer" }} className="col-xl-3 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__single__counter">
                            <div className="counterarea__text__wraper justify-content-center">
                              <div className="counter__content__wraper">
                                <p>Speaking</p>
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExamCreator;
