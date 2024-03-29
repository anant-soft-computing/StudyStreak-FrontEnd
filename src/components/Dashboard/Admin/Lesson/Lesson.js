import React from "react";
import DANavBar from "../DANavBar/DANavBar";
import DASideBar from "../DASideBar/DASideBar";
import CreateLesson from "./CreateLesson";

const Lesson = () => {
  return (
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
                      <h4>Lesson</h4>
                    </div>
                    <div className="row">
                      <div className="col-xl-12 aos-init aos-animate">
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
                              Create Lesson
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
                              tabIndex="-1"
                            >
                              View Lesson
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content tab__content__wrapper aos-init aos-animate">
                        <div
                          className="tab-pane fade active show"
                          role="tabpanel"
                          aria-labelledby="projects__one"
                        >
                          <div className="row">
                            {" "}
                            <CreateLesson />
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          role="tabpanel"
                          aria-labelledby="projects__two"
                        >
                          <div className="row">View Lesson</div>
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

export default Lesson;
