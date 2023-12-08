import React from "react";
import { Link } from "react-router-dom";
import DarkNight from "../../DarkNight";
import TopBar from "../../Topbar";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import DSNavBar from "./DSNavbar/DSNavbar";
import DSSidebar from "./DSSidebar/DSSidebar";

const Quiz = () => {
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
            <DSNavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>My Quiz Attempts</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-6 col-lg-4 col-md-4 col-12">
                          <div className="dashboard__select__heading">
                            <span>Courses</span>
                          </div>
                          <div className="dashboard__selector">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>All</option>
                              <option value="1">Web Design</option>
                              <option value="2">Graphic</option>
                              <option value="3">English</option>
                              <option value="4">Spoken English</option>
                              <option value="5">Art Painting</option>
                              <option value="6">App Development</option>
                              <option value="7">Web Application</option>
                              <option value="7">Php Development</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                          <div className="dashboard__select__heading">
                            <span>SHORT BY</span>
                          </div>
                          <div className="dashboard__selector">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Default</option>
                              <option value="1">Trending</option>
                              <option value="2">Price: low to high</option>
                              <option value="3">Price: low to low</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-4 col-md-4 col-12">
                          <div className="dashboard__select__heading">
                            <span>SHORT BY OFFER</span>
                          </div>
                          <div className="dashboard__selector">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Free</option>
                              <option value="1">paid</option>
                              <option value="2">premimum</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <hr className="mt-40" />
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="dashboard__table table-responsive">
                            <table>
                              <thead>
                                <tr>
                                  <th>Quiz</th>
                                  <th>Qus</th>
                                  <th>TM</th>
                                  <th>CA</th>
                                  <th>Result</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>
                                    <p>December 26, 2023</p>
                                    <span>Write a on yourself using the 5</span>
                                    <p>
                                      Student: <Link to="#">Mice Jerry</Link>
                                    </p>
                                  </th>
                                  <td>
                                    <p>4</p>
                                  </td>
                                  <td>
                                    <p>8</p>
                                  </td>
                                  <td>
                                    <p>4</p>
                                  </td>
                                  <td>
                                    <span className="dashboard__td dashboard__td--cancel">
                                      Cancel
                                    </span>
                                  </td>
                                  <td>
                                    <div className="dashboard__button__group">
                                      <Link
                                        className="dashboard__small__btn__2"
                                        to="#"
                                      >
                                        {" "}
                                        <i className="icofont-eye"></i>View
                                      </Link>
                                      <Link
                                        className="dashboard__small__btn__2 dashboard__small__btn__3"
                                        to="#"
                                      >
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
                                          className="feather feather-trash-2"
                                        >
                                          <polyline points="3 6 5 6 21 6"></polyline>
                                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                          <line
                                            x1="10"
                                            y1="11"
                                            x2="10"
                                            y2="17"
                                          ></line>
                                          <line
                                            x1="14"
                                            y1="11"
                                            x2="14"
                                            y2="17"
                                          ></line>
                                        </svg>{" "}
                                        Delete
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>
                                    <p>December 26, 2023</p>
                                    <span>Write a on yourself using the 5</span>
                                    <p>
                                      Student: <Link to="#">Mice Jerry</Link>
                                    </p>
                                  </th>
                                  <td>
                                    <p>4</p>
                                  </td>
                                  <td>
                                    <p>8</p>
                                  </td>
                                  <td>
                                    <p>4</p>
                                  </td>
                                  <td>
                                    <span className="dashboard__td dashboard__td--over">
                                      Over
                                    </span>
                                  </td>
                                  <td>
                                    <div className="dashboard__button__group">
                                      <Link
                                        className="dashboard__small__btn__2"
                                        to="#"
                                      >
                                        {" "}
                                        <i className="icofont-eye"></i>View
                                      </Link>
                                      <Link
                                        className="dashboard__small__btn__2  dashboard__small__btn__3"
                                        to="#"
                                      >
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
                                          className="feather feather-trash-2"
                                        >
                                          <polyline points="3 6 5 6 21 6"></polyline>
                                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                          <line
                                            x1="10"
                                            y1="11"
                                            x2="10"
                                            y2="17"
                                          ></line>
                                          <line
                                            x1="14"
                                            y1="11"
                                            x2="14"
                                            y2="17"
                                          ></line>
                                        </svg>{" "}
                                        Delete
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p>December 26, 2023</p>
                                    <span>Write a on yourself using the 5</span>
                                    <p>
                                      Student: <Link to="#">Mice Jerry</Link>
                                    </p>
                                  </th>
                                  <td>
                                    <p>4</p>
                                  </td>
                                  <td>
                                    <p>8</p>
                                  </td>
                                  <td>
                                    <p>4</p>
                                  </td>
                                  <td>
                                    <span className="dashboard__td">Pass</span>
                                  </td>
                                  <td>
                                    <div className="dashboard__button__group">
                                      <Link
                                        className="dashboard__small__btn__2"
                                        to="#"
                                      >
                                        {" "}
                                        <i className="icofont-eye"></i>View
                                      </Link>
                                      <Link
                                        className="dashboard__small__btn__2  dashboard__small__btn__3"
                                        to="#"
                                      >
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
                                          className="feather feather-trash-2"
                                        >
                                          <polyline points="3 6 5 6 21 6"></polyline>
                                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                          <line
                                            x1="10"
                                            y1="11"
                                            x2="10"
                                            y2="17"
                                          ></line>
                                          <line
                                            x1="14"
                                            y1="11"
                                            x2="14"
                                            y2="17"
                                          ></line>
                                        </svg>{" "}
                                        Delete
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>
                                    <p>December 26, 2023</p>
                                    <span>Write a on yourself using the 5</span>
                                    <p>
                                      Student: <Link to="#">Mice Jerry</Link>
                                    </p>
                                  </th>
                                  <td>
                                    <p>4</p>
                                  </td>
                                  <td>
                                    <p>8</p>
                                  </td>
                                  <td>
                                    <p>4</p>
                                  </td>
                                  <td>
                                    <span className="dashboard__td">Pass</span>
                                  </td>
                                  <td>
                                    <div className="dashboard__button__group">
                                      <Link
                                        className="dashboard__small__btn__2"
                                        to="#"
                                      >
                                        {" "}
                                        <i className="icofont-eye"></i>View
                                      </Link>
                                      <Link
                                        className="dashboard__small__btn__2  dashboard__small__btn__3"
                                        to="#"
                                      >
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
                                          className="feather feather-trash-2"
                                        >
                                          <polyline points="3 6 5 6 21 6"></polyline>
                                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                          <line
                                            x1="10"
                                            y1="11"
                                            x2="10"
                                            y2="17"
                                          ></line>
                                          <line
                                            x1="14"
                                            y1="11"
                                            x2="14"
                                            y2="17"
                                          ></line>
                                        </svg>{" "}
                                        Delete
                                      </Link>
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

export default Quiz;
