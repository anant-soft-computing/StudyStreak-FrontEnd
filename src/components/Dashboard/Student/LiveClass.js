import React from "react";
import DSSidebar from "./DSSideBar/DSSideBar";
import DSNavBar from "./DSNavBar/DSNavBar";
import Footer from "../../Footer/Footer";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import img1 from "../../../img/zoom/1.jpg"
import img2 from "../../../img/zoom/2.jpg"
import img3 from "../../../img/zoom/3.jpg"
import img4 from "../../../img/zoom/4.jpg"


const LiveClass = () => {
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
                        <h4>Live Classes</h4>
                      </div>
                      <div className="row">
                        <div
                          className="col-lg-4 col-md-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid ">
                            <div className="gridarea__img">
                              <a href="zoom-meeting-details.html">
                                <img src={img1} alt="grid" />
                              </a>
                            </div>
                            <div className="gridarea__content ">
                              <div className="gridarea__list">
                                <ul className="ps-0">
                                  <li>
                                    <i className="icofont-calendar"></i> Dec 22,2023
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 1 hr 30
                                    min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <a href="zoom-meeting-details.html">
                                    Executive Assistant Meeting
                                  </a>
                                </h3>
                              </div>
                              <div className="zoom__meeting__time__id">
                                <div className="zoom__meeting__time">
                                  <p>
                                    Starting Time:
                                    <span>6.00 PM</span>
                                  </p>
                                </div>
                                <div className="zoom__meeting__id">
                                  <p>
                                    Meeting ID :<span>952428993687</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-lg-4 col-md-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid">
                            <div className="gridarea__img">
                              <a href="zoom-meeting-details.html">
                                <img src={img2} alt="grid" />
                              </a>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul className="ps-0">
                                  <li>
                                    <i className="icofont-calendar"></i> Dec 25,2023
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 2 hr 30
                                    min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <a href="zoom-meeting-details.html">
                                    Website Renovation Meeting
                                  </a>
                                </h3>
                              </div>
                              <div className="zoom__meeting__time__id">
                                <div className="zoom__meeting__time">
                                  <p>
                                    Starting Time:
                                    <span>5.00 PM</span>
                                  </p>
                                </div>
                                <div className="zoom__meeting__id">
                                  <p>
                                    Meeting ID :<span>952429936777</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-lg-4 col-md-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid">
                            <div className="gridarea__img">
                              <a href="zoom-meeting-details.html">
                                <img src={img3} alt="grid" />
                              </a>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul className="ps-0">
                                  <li>
                                    <i className="icofont-calendar"></i> Dec 29,2023
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 3 hr 30
                                    min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <a href="zoom-meeting-details.html">
                                    Marketing Committee Meeting
                                  </a>
                                </h3>
                              </div>
                              <div className="zoom__meeting__time__id">
                                <div className="zoom__meeting__time">
                                  <p>
                                    Starting Time:
                                    <span>4.00 PM</span>
                                  </p>
                                </div>
                                <div className="zoom__meeting__id">
                                  <p>
                                    Meeting ID :<span>952428993999</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-lg-4 col-md-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid">
                            <div className="gridarea__img">
                              <a href="zoom-meeting-details.html">
                                <img src={img4} alt="grid" />
                              </a>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul className="ps-0">
                                  <li>
                                    <i className="icofont-calendar"></i> Dec 29,2023
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 3 hr 30
                                    min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <a href="zoom-meeting-details.html">
                                    Teacher Leader Team Meeting
                                  </a>
                                </h3>
                              </div>
                              <div className="zoom__meeting__time__id">
                                <div className="zoom__meeting__time">
                                  <p>
                                    Starting Time:
                                    <span>7.00 AM</span>
                                  </p>
                                </div>
                                <div className="zoom__meeting__id">
                                  <p>
                                    Meeting ID :<span>952428993555</span>
                                  </p>
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

export default LiveClass;