import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import DarkNight from "../../DarkNight";
import TopBar from "../../Topbar";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import counter1 from "../../../img/counter/counter__1.png";
import counter2 from "../../../img/counter/counter__2.png";
import counter3 from "../../../img/counter/counter__3.png";
import counter4 from "../../../img/counter/counter__4.png";
import teacher1 from "../../../img/teacher/teacher__1.png";
import teacher2 from "../../../img/teacher/teacher__2.png";
import teacher3 from "../../../img/teacher/teacher__3.png";
import teacher4 from "../../../img/teacher/teacher__4.png";
import teacher5 from "../../../img/teacher/teacher__5.png";
import grid1 from "../../../img/grid/grid_1.png";
import grid2 from "../../../img/grid/grid_2.png";
import grid3 from "../../../img/grid/grid_3.png";
import grid4 from "../../../img/grid/grid_4.png";
import blog6 from "../../../img/blog/blog_6.png";
import blog7 from "../../../img/blog/blog_7.png";
import blog8 from "../../../img/blog/blog_8.png";
import blog9 from "../../../img/blog/blog_9.png";
import blog4 from "../../../img/blog/blog_4.png";
import profile from "../../../img/dashbord/profile.png";
import lock from "../../../img/dashbord/lock.png";
import success from "../../../img/dashbord/success.png";
import verify from "../../../img/dashbord/verify.png";
import video from "../../../img/dashbord/video.png";
import DANavBar from "./DANavBar/DANavBar";
import { Link } from "react-router-dom";
import DASidebar from "./Sidebar/DASidebar";

const AdminDashboard = () => {
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    const pieChartCanvas = document.getElementById("pieChart");
    if (!pieChartCanvas) return;

    if (pieChartRef.current) {
      pieChartRef.current.destroy();
    }

    pieChartRef.current = new Chart(pieChartCanvas, {
      type: "pie",
      data: {
        labels: ["Direct", "Referral", "Organic"],
        datasets: [
          {
            label: "#",
            data: [40, 28, 32],
          },
        ],
      },
      options: {
        cutout: "75%",
        plugins: {
          legend: {
            position: "left",
          },
        },
        elements: {
          arc: {
            backgroundColor: "#5F2DED",
            hoverBackgroundColor: "#5F2DED",
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    const lineChartCanvas = document.getElementById("lineChart");
    if (!lineChartCanvas) return;

    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }

    lineChartRef.current = new Chart(lineChartCanvas, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Marc",
          "April",
          "May",
          "Jun",
          "July",
          "Agust",
          "Sept",
          "Oct",
          "Now",
          "Dec",
        ],
        datasets: [
          {
            label: "#",
            data: [148, 100, 205, 110, 165, 145, 180, 156, 148, 220, 180, 245],
            tension: 0.4,
            backgroundColor: "#5F2DED",
            borderColor: "#5F2DED",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            min: 0,
            max: 300,
            ticks: {
              stepSize: 50,
            },
          },
        },
      },
    });
  }, []);

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
                                  <span className="counter">900</span>+
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
                                  <span className="counter">500</span>+
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
                                  <span className="counter">300</span>k
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
                                  <span className="counter">1500</span>+
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
                                  <span className="counter">30</span>k
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
                                  <span className="counter">90,000</span>K+
                                </div>
                                <p>Total Earning</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard__admin__report__wrap">
                      <div className="dashboard__admin__report dashboard__linechart">
                        <div className="dashboard__admin__report__top">
                          <div className="dashboard__section__title">
                            <h4>Dashboard</h4>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              defaultValue="HTML"
                            >
                              <option value="HTML">HTML</option>
                              <option value="1">CSS</option>
                              <option value="2">Javascript</option>
                              <option value="3">PHP</option>
                              <option value="4">WordPress</option>
                            </select>
                          </div>
                        </div>
                        <canvas id="lineChart"></canvas>
                      </div>
                      <div className="dashboard__admin__report dashboard__piechart">
                        <div className="dashboard__admin__report__top">
                          <div className="dashboard__section__title">
                            <h4>Traffic</h4>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                            >
                              <option selected>Today</option>
                              <option value="1">Weekly</option>
                              <option value="2">Monthly</option>
                              <option value="3">Yearly</option>
                            </select>
                          </div>
                        </div>
                        <canvas id="pieChart"></canvas>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-6 col-lg-12 col-md-12 col-12">
                        <div className="dashboard__content__wraper admin__content__wrapper">
                          <div className="dashboard__section__title">
                            <h4>Popular Instructor</h4>
                            <Link to="/courses">See More...</Link>
                          </div>
                          <div className="dashboard__popular__instructor">
                            <div className="dashboard__popular__instructor__single">
                              <div className="dashboard__popular__instructor__img">
                                <img src={teacher1} alt="" />
                              </div>
                              <div className="dashboard__popular__instructor__content">
                                <h4>
                                  <Link to="/instructor-details">
                                    Sanki Jho
                                  </Link>
                                </h4>
                                <ul>
                                  <li>
                                    <i className="icofont-chat"></i>
                                    25,895 Reviews
                                  </li>
                                  <li>
                                    <i className="icofont-student-alt"></i>
                                    692 Students
                                  </li>
                                  <li>
                                    <i className="icofont-video-alt"></i>
                                    15+ Courses
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="dashboard__popular__instructor__single">
                              <div className="dashboard__popular__instructor__img">
                                <img src={teacher2} alt="" />
                              </div>
                              <div className="dashboard__popular__instructor__content">
                                <h4>
                                  <Link to="/instructor-details">
                                    Nidmjae Mollin
                                  </Link>
                                </h4>
                                <ul>
                                  <li>
                                    <i className="icofont-chat"></i>
                                    21,895 Reviews
                                  </li>
                                  <li>
                                    <i className="icofont-student-alt"></i>
                                    95 Students
                                  </li>
                                  <li>
                                    <i className="icofont-video-alt"></i>
                                    10+ Courses
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="dashboard__popular__instructor__single">
                              <div className="dashboard__popular__instructor__img">
                                <img src={teacher3} alt="" />
                              </div>
                              <div className="dashboard__popular__instructor__content">
                                <h4>
                                  <Link to="/instructor-details">
                                    Nidmjae Mollin
                                  </Link>
                                </h4>
                                <ul>
                                  <li>
                                    <i className="icofont-chat"></i>
                                    17,895 Reviews
                                  </li>
                                  <li>
                                    <i className="icofont-student-alt"></i>
                                    325 Students
                                  </li>
                                  <li>
                                    <i className="icofont-video-alt"></i>
                                    20+ Courses
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="dashboard__popular__instructor__single">
                              <div className="dashboard__popular__instructor__img">
                                <img src={teacher4} alt="" />
                              </div>
                              <div className="dashboard__popular__instructor__content">
                                <h4>
                                  <Link to="/instructor-details">Sndi Jac</Link>
                                </h4>
                                <ul>
                                  <li>
                                    <i className="icofont-chat"></i>
                                    17,895 Reviews
                                  </li>
                                  <li>
                                    <i className="icofont-student-alt"></i>
                                    325 Students
                                  </li>
                                  <li>
                                    <i className="icofont-video-alt"></i>
                                    45+ Courses
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="dashboard__popular__instructor__single">
                              <div className="dashboard__popular__instructor__img">
                                <img src={teacher5} alt="" />
                              </div>
                              <div className="dashboard__popular__instructor__content">
                                <h4>
                                  <Link to="/instructor-details">Sndi Jac</Link>
                                </h4>
                                <ul>
                                  <li>
                                    <i className="icofont-chat"></i>
                                    17,895 Reviews
                                  </li>
                                  <li>
                                    <i className="icofont-student-alt"></i>
                                    325 Students
                                  </li>
                                  <li>
                                    <i className="icofont-video-alt"></i>
                                    45+ Courses
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-12 col-md-12 col-12">
                        <div className="dashboard__content__wraper admin__content__wrapper">
                          <div className="dashboard__section__title">
                            <h4>Recent Course</h4>
                            <Link to="/courses">See More...</Link>
                          </div>
                          <div className="dashboard__recent__course">
                            <div className="dashboard__recent__course__single">
                              <div className="dashboard__recent__course__img">
                                <Link to="/course-details">
                                  <img src={grid1} alt="grid" />
                                </Link>
                              </div>
                              <div className="dashboard__recent__course__content">
                                <div className="dashboard__recent__course__heading">
                                  <h3>
                                    <Link to="/course-details">
                                      {" "}
                                      Complete Python Zero to Hero in Python.
                                    </Link>
                                  </h3>
                                </div>
                                <div className="dashboard__recent__course__meta">
                                  <ul>
                                    <li>
                                      <i className="icofont-teacher"></i>{" "}
                                      <Link to="/instructor-details">
                                        Jon Ron
                                      </Link>
                                    </li>
                                    <li>
                                      <i className="icofont-book-alt"></i> 9
                                      Lesson
                                    </li>

                                    <li>
                                      <i className="icofont-clock-time"></i> 3
                                      hr 30 min
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="dashboard__recent__course__single">
                              <div className="dashboard__recent__course__img">
                                <Link to="/course-details">
                                  <img src={grid2} alt="grid" />
                                </Link>
                              </div>
                              <div className="dashboard__recent__course__content">
                                <div className="dashboard__recent__course__heading">
                                  <h3>
                                    <Link to="/course-details">
                                      {" "}
                                      Lorem ipsum dolor sit amet consectetur.
                                    </Link>
                                  </h3>
                                </div>
                                <div className="dashboard__recent__course__meta">
                                  <ul>
                                    <li>
                                      <i className="icofont-teacher"></i>{" "}
                                      <Link to="/instructor-details">
                                        Jon Ron
                                      </Link>
                                    </li>
                                    <li>
                                      <i className="icofont-book-alt"></i> 9
                                      Lesson
                                    </li>

                                    <li>
                                      <i className="icofont-clock-time"></i>2 hr
                                      30 min
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="dashboard__recent__course__single">
                              <div className="dashboard__recent__course__img">
                                <Link to="/course-details">
                                  <img src={grid3} alt="grid" />
                                </Link>
                              </div>
                              <div className="dashboard__recent__course__content">
                                <div className="dashboard__recent__course__heading">
                                  <h3>
                                    <Link to="/course-details">
                                      Voluptatum eius quo consectetur atque.
                                    </Link>
                                  </h3>
                                </div>
                                <div className="dashboard__recent__course__meta">
                                  <ul>
                                    <li>
                                      <i className="icofont-teacher"></i>{" "}
                                      <Link to="/instructor-details">
                                        Jon Ron
                                      </Link>
                                    </li>
                                    <li>
                                      <i className="icofont-book-alt"></i> 5
                                      Lesson
                                    </li>
                                    <li>
                                      <i className="icofont-clock-time"></i> 1
                                      hr 30 min
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="dashboard__recent__course__single">
                              <div className="dashboard__recent__course__img">
                                <Link to="/course-details">
                                  <img src={grid4} alt="grid" />
                                </Link>
                              </div>
                              <div className="dashboard__recent__course__content">
                                <div className="dashboard__recent__course__heading">
                                  <h3>
                                    <Link to="/course-details">
                                      Sapiente recusandae nemo sint hic iste!
                                    </Link>
                                  </h3>
                                </div>
                                <div className="dashboard__recent__course__meta">
                                  <ul>
                                    <li>
                                      <i className="icofont-teacher"></i>{" "}
                                      <Link to="/instructor-details">
                                        Mini Ron
                                      </Link>
                                    </li>
                                    <li>
                                      <i className="icofont-book-alt"></i> 7
                                      Lesson
                                    </li>
                                    <li>
                                      <i className="icofont-clock-time"></i> 3
                                      hr 30 min
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-12 col-md-12 col-12">
                        <div className="dashboard__content__wraper admin__content__wrapper">
                          <div className="dashboard__section__title">
                            <h4>Notice Board</h4>
                            <Link to="/courses">See More...</Link>
                          </div>
                          <div className="dashboard__recent__course dashboard__notice__board">
                            <div className="dashboard__recent__course__single">
                              <div className="dashboard__recent__course__img">
                                <Link to="/course-details">
                                  <img src={blog6} alt="grid" />
                                </Link>
                              </div>
                              <div className="dashboard__recent__course__content">
                                <div className="dashboard__recent__course__heading">
                                  <h3>
                                    <Link to="/course-details">
                                      {" "}
                                      Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Libero velit quos dolore
                                      voluptatem...
                                    </Link>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dashboard__recent__course dashboard__notice__board">
                            <div className="dashboard__recent__course__single">
                              <div className="dashboard__recent__course__img">
                                <Link to="/course-details">
                                  <img src={blog7} alt="grid" />
                                </Link>
                              </div>
                              <div className="dashboard__recent__course__content">
                                <div className="dashboard__recent__course__heading">
                                  <h3>
                                    <Link to="/course-details">
                                      {" "}
                                      Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Libero velit quos dolore
                                      aedgeds...
                                    </Link>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dashboard__recent__course dashboard__notice__board">
                            <div className="dashboard__recent__course__single">
                              <div className="dashboard__recent__course__img">
                                <Link to="/course-details">
                                  <img src={blog8} alt="grid" />
                                </Link>
                              </div>
                              <div className="dashboard__recent__course__content">
                                <div className="dashboard__recent__course__heading">
                                  <h3>
                                    <Link to="/course-details">
                                      {" "}
                                      Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Libero velit quos dolore
                                      wdedged...
                                    </Link>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dashboard__recent__course dashboard__notice__board">
                            <div className="dashboard__recent__course__single">
                              <div className="dashboard__recent__course__img">
                                <Link to="/course-details">
                                  <img src={blog9} alt="grid" />
                                </Link>
                              </div>
                              <div className="dashboard__recent__course__content">
                                <div className="dashboard__recent__course__heading">
                                  <h3>
                                    <Link to="/course-details">
                                      {" "}
                                      Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Libero velit quos dolore
                                      nidelsd...
                                    </Link>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="dashboard__recent__course dashboard__notice__board">
                            <div className="dashboard__recent__course__single">
                              <div className="dashboard__recent__course__img">
                                <Link to="/course-details">
                                  <img src={blog4} alt="grid" />
                                </Link>
                              </div>
                              <div className="dashboard__recent__course__content">
                                <div className="dashboard__recent__course__heading">
                                  <h3>
                                    <Link to="/course-details">
                                      {" "}
                                      Lorem ipsum dolor sit amet consectetur
                                      adipisicing elit. Libero velit quos dolore
                                      midnied...
                                    </Link>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-lg-12 col-md-12 col-12">
                        <div className="dashboard__content__wraper admin__content__wrapper">
                          <div className="dashboard__section__title">
                            <h4>Notifications</h4>
                            <Link to="/courses">See More...</Link>
                          </div>
                          <div className="dashboard__popular__instructor dashboard__notificatoin__wrap">
                            <div className="dashboard__popular__instructor__single">
                              <div className="dashboard__popular__instructor__img">
                                <img src={profile} alt="" />
                              </div>
                              <div className="dashboard__popular__instructor__content">
                                <h4>
                                  <a href=" ">
                                    latest resume has been updated!
                                  </a>
                                </h4>
                                <span>1 Hour Ago</span>
                              </div>
                            </div>
                            <div className="dashboard__popular__instructor__single">
                              <div className="dashboard__popular__instructor__img">
                                <img src={lock} alt="" />
                              </div>
                              <div className="dashboard__popular__instructor__content">
                                <h4>
                                  <a href=" ">
                                    Password has been changed 3 times
                                  </a>
                                </h4>
                                <span>2 Hour Ago</span>
                              </div>
                            </div>
                            <div className="dashboard__popular__instructor__single">
                              <div className="dashboard__popular__instructor__img">
                                <img src={verify} alt="" />
                              </div>
                              <div className="dashboard__popular__instructor__content">
                                <h4>
                                  <a href=" ">
                                    Account has been created successfully
                                  </a>
                                </h4>
                                <span>50 Min Ago</span>
                              </div>
                            </div>
                            <div className="dashboard__popular__instructor__single">
                              <div className="dashboard__popular__instructor__img">
                                <img src={success} alt="" />
                              </div>
                              <div className="dashboard__popular__instructor__content">
                                <h4>
                                  <a href=" ">
                                    Successfully applied for a job Developer
                                  </a>
                                </h4>
                                <span>30 Min Ago</span>
                              </div>
                            </div>
                            <div className="dashboard__popular__instructor__single">
                              <div className="dashboard__popular__instructor__img">
                                <img src={video} alt="" />
                              </div>
                              <div className="dashboard__popular__instructor__content">
                                <h4>
                                  <a href=" ">
                                    Multi vendor course updated successfully
                                  </a>
                                </h4>
                                <span>3 hours Ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Total Feedbacks</h4>
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

export default AdminDashboard;
