import React from "react";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import DSSidebar from "./DSSideBar/DSSideBar";
import DSNavBar from "./DSNavBar/DSNavBar";
import { Link, useLocation } from "react-router-dom";

const MyCourse = () => {
  const { enrolledCourses } = useLocation().state;
  const course = enrolledCourses?.select_course;

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div>
            <div className="theme__shadow__circle"></div>
            <div className="theme__shadow__circle shadow__right"></div>
          </div>
          <div className="dashboardarea sp_bottom_100">
            <DSNavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Courses</h4>
                      </div>
                      <div className="row">
                        <div
                          className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                          data-aos="fade-up"
                          key={course.id}
                        >
                          <div className="gridarea__wraper gridarea__wraper__2">
                            <div className="gridarea__img">
                              <img
                                src={course?.Course_Thumbnail}
                                alt={course?.Course_Title}
                              />
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul className="ps-0">
                                  <li>
                                    <Link to={`/course-lessons/${course?.id}`}>
                                      <i className="icofont-book-alt"></i>{" "}
                                      {course?.lessons?.length} Lessons
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link to={`/course-detail/${course?.id}`}>
                                    {course?.Course_Title}
                                  </Link>
                                </h3>
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

export default MyCourse;
