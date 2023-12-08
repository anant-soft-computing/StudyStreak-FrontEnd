import React from "react";
import DarkNight from "../../DarkNight";
import TopBar from "../../Topbar";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import counter1 from "../../../img/counter/counter__1.png";
import counter2 from "../../../img/counter/counter__2.png";
import counter3 from "../../../img/counter/counter__3.png";
import counter4 from "../../../img/counter/counter__4.png";
import DINavBar from "./DINavBar/DINavBar";
import { Link } from "react-router-dom";
import DISidebar from "./DISidebar/DISidebar";

const InstructorDashboard = () => {
  return (
    <>
      <DarkNight />
      <TopBar />
      <Navbar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="dashboardarea sp_bottom_100">
            <DINavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DISidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Dashboard</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__single__counter">
                            <div className="counterarea__text__wraper">
                              <div className="counter__img">
                                <img src={counter1} alt="counter" />
                              </div>
                              <div className="counter__content__wraper">
                                <div className="counter__number">
                                  <span className="counter">27</span>+
                                </div>
                                <p>Enrolled Courses</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__single__counter">
                            <div className="counterarea__text__wraper">
                              <div className="counter__img">
                                <img src={counter2} alt="counter" />
                              </div>
                              <div className="counter__content__wraper">
                                <div className="counter__number">
                                  <span className="counter">08</span>+
                                </div>
                                <p>Active Courses</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__single__counter">
                            <div className="counterarea__text__wraper">
                              <div className="counter__img">
                                <img src={counter3} alt="counter" />
                              </div>
                              <div className="counter__content__wraper">
                                <div className="counter__number">
                                  <span className="counter">5</span>k
                                </div>
                                <p>Complete Courses</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__single__counter">
                            <div className="counterarea__text__wraper">
                              <div className="counter__img">
                                <img src={counter4} alt="counter" />
                              </div>
                              <div className="counter__content__wraper">
                                <div className="counter__number">
                                  <span className="counter">14</span>+
                                </div>
                                <p>Total Courses</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__single__counter">
                            <div className="counterarea__text__wraper">
                              <div className="counter__img">
                                <img src={counter3} alt="counter" />
                              </div>
                              <div className="counter__content__wraper">
                                <div className="counter__number">
                                  <span className="counter">10</span>k
                                </div>
                                <p>Total Students</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__single__counter">
                            <div className="counterarea__text__wraper">
                              <div className="counter__img">
                                <img src={counter4} alt="counter" />
                              </div>
                              <div className="counter__content__wraper">
                                <div className="counter__number">
                                  <span className="counter">30,000</span>+
                                </div>
                                <p>Total Earning</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Dashboard</h4>
                        <Link to="/courses">See More...</Link>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="dashboard__table table-responsive">
                            <table>
                              <thead>
                                <tr>
                                  <th>Course Name</th>
                                  <th>Enrolled</th>
                                  <th>Rating</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>
                                    <a href=" ">Javascript</a>
                                  </th>
                                  <td>1100</td>
                                  <td>
                                    <div className="dashboard__table__star">
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-star"
                                      >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                      </svg>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>
                                    <a href=" ">PHP</a>
                                  </th>
                                  <td>700</td>
                                  <td>
                                    <div className="dashboard__table__star">
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-star"
                                      >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                      </svg>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <a href=" ">HTML</a>
                                  </th>
                                  <td>1350</td>
                                  <td>
                                    <div className="dashboard__table__star">
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-star"
                                      >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                      </svg>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>
                                    <a href=" ">Graphic</a>
                                  </th>
                                  <td>1266</td>
                                  <td>
                                    <div className="dashboard__table__star">
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <i className="icofont-star"></i>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-star"
                                      >
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                      </svg>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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

export default InstructorDashboard;
