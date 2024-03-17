import React from "react";
import Footer from "../../../../Footer/Footer";
import AdditionalResources from "./AdditionalResources";
import Material from "./Material";
import { useLocation, useParams } from "react-router-dom";
import DSSidebar from "../../DSSideBar/DSSideBar";

const CourseContent = () => {
  const { courseId } = useParams();
  const { state: { enrolledCourse } = {} } = useLocation();

  const { Course_Title } = enrolledCourse.find(
    ({ id }) => id === parseInt(courseId)
  );

  return (
    <>
      <div className="body__wrapper all-component-main-container">
        <div className="main_wrapper overflow-hidden">
          <div className="dashboardarea sp_bottom_100">
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper common-background-color-across-app">
                      <div className="dashboard__section__title">
                        <h4>{Course_Title}</h4>
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
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__one"
                                type="button"
                                aria-selected="true"
                                role="tab"
                              >
                                Downloads
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
                            <Material
                              courseId={courseId}
                              courseName={Course_Title}
                            />
                            <AdditionalResources
                              courseId={courseId}
                              courseName={Course_Title}
                            />
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

export default CourseContent;
