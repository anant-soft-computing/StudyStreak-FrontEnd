import React, { useEffect, useState } from "react";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import DSNavBar from "./DSNavBar/DSNavBar";
import DSSidebar from "./DSSideBar/DSSideBar";
import ajaxCall from "../../../helpers/ajaxCall";

const Dashboard = () => {
  const [lastestLiveClass, setLastestLiveClass] = useState({});

  const getLiveClassesList = async () => {
    try {
      const response = await ajaxCall(
        `/liveclass_list_view`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );

      if (response?.status === 200) {
        setLastestLiveClass(response?.data?.[0]);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getLiveClassesList();
  }, []);

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
                        <h4>Dashboard</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__inner sticky-top mt-4">
                            <div className="dashboard__nav__title">
                              <h6 className="mb-2">Upcoming Live Class</h6>
                            </div>
                            <hr />
                            <ul className="ps-0 d-flex justify-content-between">
                              <li>
                                <i
                                  className="icofont-calendar"
                                  style={{ color: "#5f2ded" }}
                                ></i>{" "}
                                {new Date(
                                  lastestLiveClass?.start_time
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </li>
                              <li>
                                <i
                                  className="icofont-clock-time"
                                  style={{ color: "#5f2ded" }}
                                ></i>{" "}
                                {new Date(
                                  lastestLiveClass?.start_time
                                ).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                })}{" "}
                                -{" "}
                                {new Date(
                                  lastestLiveClass?.end_time
                                ).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                })}
                              </li>
                            </ul>
                            <p className="text-dark">
                              Name :
                              <span>
                                {" "}
                                <strong>
                                  {lastestLiveClass?.meeting_title}
                                </strong>
                              </span>
                            </p>
                            <p className="text-dark">
                              ID :
                              <span> {lastestLiveClass?.zoom_meeting_id}</span>
                            </p>
                            <p className="text-dark">
                              Password :
                              <span>
                                {" "}
                                {lastestLiveClass?.zoom_meeting_password}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__inner sticky-top mt-4">
                            <div className="dashboard__nav__title">
                              <h6 className="mb-2">Next Lesson Due</h6>
                            </div>
                            <hr />
                            <div className="dashboard__nav">
                              <div>Writing Task 2 - Eassay Writing</div>
                              <div className="d-flex justify-content-between">
                                <div>Lesson No. 7</div>
                                <div>Take me to the lesson</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__inner sticky-top mt-4">
                            <div className="dashboard__nav__title">
                              <h6 className="mb-2">Today's Mission</h6>
                            </div>
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Leaderboard</h4>
                        <h6>Practice daily and lead the game!</h6>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="dashboard__table table-responsive">
                            <table>
                              <thead>
                                <tr>
                                  <th>No.</th>
                                  <th>Name</th>
                                  <th>Points</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>
                                    <div>1.</div>
                                  </th>
                                  <td>Amish Patel</td>
                                  <td>
                                    <div className="dashboard__table__star">
                                      1240 pts
                                    </div>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>
                                    <div>2.</div>
                                  </th>
                                  <td>Rohini Chaudhary</td>
                                  <td>
                                    <div className="dashboard__table__star">
                                      1100 pts
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <div>3.</div>
                                  </th>
                                  <td>Sweety Gill</td>
                                  <td>
                                    <div className="dashboard__table__star">
                                      879 pts
                                    </div>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>
                                    <div>4.</div>
                                  </th>
                                  <td>Amiraj Solanki</td>
                                  <td>
                                    <div className="dashboard__table__star">
                                      800 pts
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <th>
                                    <div>152.</div>
                                  </th>
                                  <td>Krina Patel</td>
                                  <td>
                                    <div className="dashboard__table__star">
                                      432 pts
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

export default Dashboard;
