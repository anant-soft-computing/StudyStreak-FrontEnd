import React from "react";
import DarkNight from "../../DarkNight";
import TopBar from "../../Topbar";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import DANavBar from "./DANavBar/DANavBar";
import DASidebar from "./Sidebar/DASidebar";

const AdminSettings = () => {
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
                        <h4>My Profile</h4>
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
                                Profile
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
                                Password
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__three"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabindex="-1"
                              >
                                Social Icon
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
                              <div className="col-xl-12">
                                <div className="row">
                                  <div className="col-xl-6">
                                    <div className="dashboard__form__wraper">
                                      <div className="dashboard__form__input">
                                        <label>First Name</label>
                                        <input type="text" placeholder="John" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-6">
                                    <div className="dashboard__form__wraper">
                                      <div className="dashboard__form__input">
                                        <label>Last Name</label>
                                        <input type="text" placeholder="Due" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-6">
                                    <div className="dashboard__form__wraper">
                                      <div className="dashboard__form__input">
                                        <label>User Name</label>
                                        <input
                                          type="text"
                                          placeholder="Ntaden Mic"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-6">
                                    <div className="dashboard__form__wraper">
                                      <div className="dashboard__form__input">
                                        <label>Phone Number</label>
                                        <input
                                          type="text"
                                          placeholder="+1-202-555-0174"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-6">
                                    <div className="dashboard__form__wraper">
                                      <div className="dashboard__form__input">
                                        <label>Skill/Occupation</label>
                                        <input
                                          type="text"
                                          placeholder="Full Stack Developer"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-6">
                                    <div className="dashboard__form__wraper">
                                      <div className="dashboard__form__input">
                                        <label>Display Name Publicly As</label>
                                        <input type="text" placeholder="John" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-12">
                                    <div className="dashboard__form__wraper">
                                      <div className="dashboard__form__input">
                                        <label>Bio</label>
                                        <textarea
                                          name="bio__text"
                                          id="bio__text"
                                          cols="30"
                                          rows="10"
                                        >
                                          Lorem ipsum, dolor sit amet
                                          consectetur adipisicing elit.
                                        </textarea>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-12">
                                    <div className="dashboard__form__button">
                                      <a className="default__button" href=" ">
                                        Update Info
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__two"
                            role="tabpanel"
                            aria-labelledby="projects__two"
                          >
                            <div className="row">
                              <div className="col-xl-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label>Current Password</label>
                                    <input
                                      type="text"
                                      placeholder="Current password"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label>New Password</label>
                                    <input
                                      type="text"
                                      placeholder="New Password"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label>Re-Type New Password</label>
                                    <input
                                      type="text"
                                      placeholder="Re-Type New Password"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="dashboard__form__button">
                                  <a className="default__button" href=" ">
                                    Update Password
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__three"
                            role="tabpanel"
                            aria-labelledby="projects__three"
                          >
                            <div className="row">
                              <div className="col-xl-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label>
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
                                        className="feather feather-facebook"
                                      >
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                      </svg>
                                      Facebook
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="https://facebook.com/"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label>
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
                                        className="feather feather-twitter"
                                      >
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                      </svg>
                                      Twitter
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="https://twitter.com/"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label>
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
                                        className="feather feather-linkedin"
                                      >
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect
                                          x="2"
                                          y="9"
                                          width="4"
                                          height="12"
                                        ></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                      </svg>
                                      Linkedin
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="https://linkedin.com/"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label>
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
                                        className="feather feather-layout"
                                      >
                                        <rect
                                          x="3"
                                          y="3"
                                          width="18"
                                          height="18"
                                          rx="2"
                                          ry="2"
                                        ></rect>
                                        <line
                                          x1="3"
                                          y1="9"
                                          x2="21"
                                          y2="9"
                                        ></line>
                                        <line
                                          x1="9"
                                          y1="21"
                                          x2="9"
                                          y2="9"
                                        ></line>
                                      </svg>
                                      Website
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="https://website.com/"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="dashboard__form__wraper">
                                  <div className="dashboard__form__input">
                                    <label>
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
                                        className="feather feather-github"
                                      >
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                      </svg>
                                      Github
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="https://github.com/"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="dashboard__form__button">
                                  <a className="default__button" href=" ">
                                    Update Password
                                  </a>
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
      </div>
      <Footer />
    </>
  );
};

export default AdminSettings;
