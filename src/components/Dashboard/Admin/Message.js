import React from "react";
import Footer from "../../Footer";
import Navbar from "../../Navbar";
import TopBar from "../../Topbar";
import DarkNight from "../../DarkNight";
import teacher1 from "../../../img/teacher/teacher__1.png";
import teacher2 from "../../../img/teacher/teacher__2.png";
import teacher3 from "../../../img/teacher/teacher__3.png";
import teacher4 from "../../../img/teacher/teacher__4.png";
import teacher5 from "../../../img/teacher/teacher__5.png";
import DANavBar from "./DANavBar/DANavBar";
import { Link } from "react-router-dom";
import DASidebar from "./Sidebar/DASidebar";

const AdminMessage = () => {
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
                    <div className="dashboard__message__content__main">
                      <div className="dashboard__message__content__main__title dashboard__message__content__main__title__2">
                        <h3>Messages</h3>
                      </div>
                      <div className="dashboard__meessage__wraper">
                        <div className="row">
                          <div className="col-xl-5 col-lg-6 col-md-12 col-12">
                            <div className="dashboard__meessage">
                              <div className="dashboard__meessage__chat">
                                <h3>Chats</h3>
                              </div>
                              <div className="dashboard__meessage__search">
                                <button>
                                  <i className="icofont-search-1"></i>
                                </button>
                                <input type="text" placeholder="Search" />
                              </div>
                              <div className="dashboard__meessage__contact">
                                <ul>
                                  <li>
                                    <div className="dashboard__meessage__contact__wrap">
                                      <div className="dashboard__meessage__chat__img">
                                        <span className="dashboard__meessage__dot online"></span>
                                        <img src={teacher1} alt="" />
                                      </div>
                                      <div className="dashboard__meessage__meta">
                                        <h5>Rex Allen</h5>
                                        <p className="preview">
                                          Hey, How are you?
                                        </p>
                                        <span className="chat__time">
                                          12 min
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="dashboard__meessage__contact__wrap">
                                      <div className="dashboard__meessage__chat__img">
                                        <span className="dashboard__meessage__dot online"></span>
                                        <img src={teacher2} alt="" />
                                      </div>
                                      <div className="dashboard__meessage__meta">
                                        <h5>Rex Allen</h5>
                                        <p className="preview">
                                          Hey, How are you?
                                        </p>
                                        <span className="chat__time">
                                          4:35pm
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="dashboard__meessage__contact__wrap">
                                      <div className="dashboard__meessage__chat__img">
                                        <span className="dashboard__meessage__dot online"></span>
                                        <img src={teacher3} alt="" />
                                      </div>
                                      <div className="dashboard__meessage__meta">
                                        <h5>Julia Jhones</h5>
                                        <p className="preview">
                                          Hey, How are you?
                                        </p>
                                        <span className="chat__time">
                                          1:40pm
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="dashboard__meessage__contact__wrap">
                                      <div className="dashboard__meessage__chat__img">
                                        <span className="dashboard__meessage__dot online"></span>
                                        <img src={teacher4} alt="" />
                                      </div>
                                      <div className="dashboard__meessage__meta">
                                        <h5>Anderson</h5>
                                        <p className="preview">
                                          Hey, How are you?
                                        </p>
                                        <span className="chat__time">
                                          3:20am
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="dashboard__meessage__contact__wrap">
                                      <div className="dashboard__meessage__chat__img">
                                        <span className="dashboard__meessage__dot online"></span>
                                        <img src={teacher5} alt="" />
                                      </div>
                                      <div className="dashboard__meessage__meta">
                                        <h5>Rex Allen</h5>
                                        <p className="preview">
                                          Hey, How are you?
                                        </p>
                                        <span className="chat__time">
                                          12 min
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="dashboard__meessage__contact__wrap">
                                      <div className="dashboard__meessage__chat__img">
                                        <span className="dashboard__meessage__dot online"></span>
                                        <img src={teacher5} alt="" />
                                      </div>
                                      <div className="dashboard__meessage__meta">
                                        <h5>Rex Allen</h5>
                                        <p className="preview">
                                          Hey, How are you?
                                        </p>
                                        <span className="chat__time">
                                          12 min
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="dashboard__meessage__contact__wrap">
                                      <div className="dashboard__meessage__chat__img">
                                        <span className="dashboard__meessage__dot online"></span>
                                        <img src={teacher2} alt="" />
                                      </div>
                                      <div className="dashboard__meessage__meta">
                                        <h5>Rex Allen</h5>
                                        <p className="preview">
                                          Hey, How are you?
                                        </p>
                                        <span className="chat__time">
                                          4:35pm
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                  <li>
                                    <div className="dashboard__meessage__contact__wrap">
                                      <div className="dashboard__meessage__chat__img">
                                        <span className="dashboard__meessage__dot online"></span>
                                        <img src={teacher1} alt="" />
                                      </div>
                                      <div className="dashboard__meessage__meta">
                                        <h5>Julia Jhones</h5>
                                        <p className="preview">
                                          Hey, How are you?
                                        </p>
                                        <span className="chat__time">
                                          1:40pm
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-7 col-lg-6 col-md-12 col-12">
                            <div className="dashboard__meessage__content__wrap">
                              <div className="dashboard__meessage__profile">
                                <div className="dashboard__meessage__profile__img">
                                  <img src={teacher2} alt="" />
                                </div>
                                <div className="dashboard__meessage__profile__meta">
                                  <h5>Bradshaw</h5>
                                  <p>Stay at home, Stay safe</p>
                                </div>
                                <div className="dashboard__meessage__profile__chat__option">
                                  <Link to="/dashboard/admin-dashboard">
                                    <i className="icofont-phone"></i>
                                  </Link>
                                  <Link to="/dashboard/admin-dashboard">
                                    <i className="icofont-ui-video-chat"></i>
                                  </Link>
                                </div>
                              </div>
                              <div className="dashboard__meessage__sent">
                                <ul>
                                  <li>
                                    <div className="dashboard__meessage__sent__item__img">
                                      <img src={teacher1} alt="" />
                                    </div>
                                    <div className="dashboard__meessage__sent__item__content">
                                      <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing sed.
                                      </p>
                                      <span className="time">4:32 PM</span>
                                      <p>Dolor sit amet consectetur</p>
                                      <span className="time">4:30 PM</span>
                                    </div>
                                  </li>
                                  <li className="dashboard__meessage__sent__item">
                                    <div className="dashboard__meessage__sent__item__content">
                                      <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing sed.
                                      </p>
                                      <span className="time">4:40 PM</span>
                                      <p>Dolor sit amet consectetur</p>
                                      <span className="time">4:42 PM</span>
                                    </div>
                                    <div className="dashboard__meessage__sent__item__img">
                                      <img src={teacher3} alt="" />
                                    </div>
                                  </li>
                                  <li className="sent">
                                    <div className="dashboard__meessage__sent__item__img">
                                      <img src={teacher4} alt="" />
                                    </div>
                                    <div className="dashboard__meessage__sent__item__content">
                                      <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing sed.
                                      </p>
                                      <span className="time">5:01 PM</span>
                                      <p>Dolor sit amet consectetur</p>
                                      <span className="time">5:03 PM</span>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                              <div className="dashboard__meessage__input">
                                <input
                                  type="text"
                                  placeholder="Type something"
                                />
                                <i
                                  className="icofont-attachment attachment"
                                  aria-hidden="true"
                                ></i>
                                <button className="submit">
                                  <i className="icofont-arrow-right"></i>
                                </button>
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

export default AdminMessage;
