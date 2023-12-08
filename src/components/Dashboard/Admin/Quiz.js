import React from "react";
import DarkNight from "../../DarkNight";
import TopBar from "../../Topbar";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import DANavBar from "./DANavBar/DANavBar";
import DASidebar from "./Sidebar/DASidebar";

const AdminQuiz = () => {
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
            <DANavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <div className="col-xl-3 col-lg-3 col-md-12">
                    <div className="dashboard__inner sticky-top">
                      <div className="dashboard__nav__title">
                        <h6>Welcome, Micle Obema</h6>
                      </div>
                      <DASidebar />
                    </div>
                  </div>
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
                                  <th>Status</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>
                                    <p>December 26, 2023</p>
                                    <span>Write a on yourself using the 5</span>
                                    <p>
                                      Student: <a href=" ">Mice Jerry</a>
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
                                    <span className="dashboard__td dashboard__td--running">
                                      Running
                                    </span>
                                  </td>
                                  <td>
                                    <div className="dashboard__button__group">
                                      <a
                                        className="dashboard__small__btn__2"
                                        href=" "
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
                                          className="feather feather-edit"
                                        >
                                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>{" "}
                                        Edit
                                      </a>
                                      <a
                                        className="dashboard__small__btn__2 dashboard__small__btn__3"
                                        href=" "
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
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>
                                    <p>December 26, 2023</p>
                                    <span>Write a on yourself using the 5</span>
                                    <p>
                                      Student: <a href=" ">Mice Jerry</a>
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
                                      Time Over
                                    </span>
                                  </td>
                                  <td>
                                    <div className="dashboard__button__group">
                                      <a
                                        className="dashboard__small__btn__2"
                                        href=" "
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
                                          className="feather feather-edit"
                                        >
                                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>{" "}
                                        Edit
                                      </a>
                                      <a
                                        className="dashboard__small__btn__2  dashboard__small__btn__3"
                                        href=" "
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
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <p>December 26, 2023</p>
                                    <span>Write a on yourself using the 5</span>
                                    <p>
                                      Student: <a href=" ">Mice Jerry</a>
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
                                    <span className="dashboard__td dashboard__td--comming">
                                      Coming
                                    </span>
                                  </td>
                                  <td>
                                    <div className="dashboard__button__group">
                                      <a
                                        className="dashboard__small__btn__2"
                                        href=" "
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
                                          className="feather feather-edit"
                                        >
                                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>{" "}
                                        Edit
                                      </a>
                                      <a
                                        className="dashboard__small__btn__2  dashboard__small__btn__3"
                                        href=" "
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
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>
                                    <p>December 26, 2023</p>
                                    <span>Write a on yourself using the 5</span>
                                    <p>
                                      Student: <a href=" ">Mice Jerry</a>
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
                                      <a
                                        className="dashboard__small__btn__2"
                                        href=" "
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
                                          className="feather feather-edit"
                                        >
                                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>{" "}
                                        Edit
                                      </a>
                                      <a
                                        className="dashboard__small__btn__2  dashboard__small__btn__3"
                                        href=" "
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
                                      </a>
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

export default AdminQuiz;
