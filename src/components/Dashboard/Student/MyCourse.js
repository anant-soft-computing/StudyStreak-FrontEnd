import React from "react";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import DSSidebar from "./DSSideBar/DSSideBar";
import DSNavBar from "./DSNavBar/DSNavBar";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MyCourse = () => {
  const { enrolledCourse } = useLocation().state;
  const navigate = useNavigate();

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
                          key={enrolledCourse.id}
                          onClick={() =>
                            navigate(`/course/${enrolledCourse?.id}`, {
                              state: { enrolledCourse },
                            })
                          }
                        >
                          <div className="gridarea__wraper gridarea__wraper__2">
                            <div className="gridarea__img">
                              <img
                                src={enrolledCourse?.Course_Thumbnail}
                                alt={enrolledCourse?.Course_Title}
                                onClick={(e) => {
                                  navigate(
                                    `/courseDetail/${enrolledCourse?.id}`
                                  );
                                  e.stopPropagation();
                                }}
                              />
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul className="ps-0">
                                  <li>
                                    <i className="icofont-book-alt"></i>{" "}
                                    {enrolledCourse?.lessons?.length} Lessons
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i>{" "}
                                    {enrolledCourse?.lessons?.reduce(
                                      (totalDuration, lesson) =>
                                        totalDuration +
                                        parseInt(lesson?.Lesson_Duration),
                                      0
                                    )}{" "}
                                    Minutes
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link
                                    to={`/courseLessons/${enrolledCourse?.id}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                    }}
                                  >
                                    {enrolledCourse?.Course_Title}
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
