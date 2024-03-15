import React, { useEffect, useState } from "react";
import moment from "moment";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import DSSidebar from "./DSSideBar/DSSideBar";
import ajaxCall from "../../../helpers/ajaxCall";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const { packageId } = useLocation()?.state || {};
  const [studentList, setStudentList] = useState([]);
  const [latestLiveClass, setLatestLiveClass] = useState({});

  console.log("studentList", studentList);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/packageidwisestudentGetview/${packageId}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );

        if (response?.status === 200) {
          console.log("-------->", response);
          setStudentList(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [packageId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/liveclass_list_view/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );

        if (response?.status === 200) {
          setLatestLiveClass(response?.data?.[0]);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="dashboardarea sp_bottom_100">
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper common-background-color-across-app">
                      <div className="dashboard__section__title">
                        <h4>Dashboard</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__inner sticky-top mt-4 global-neomorphism-card-styling">
                            <div className="dashboard__nav__title">
                              <h6 className="mb-2">Upcoming Live Class</h6>
                            </div>
                            <hr />
                            <ul className="ps-0 d-flex justify-content-between">
                              {latestLiveClass?.start_time && (
                                <li>
                                  <i
                                    className="icofont-calendar"
                                    style={{ color: "#01579b" }}
                                  ></i>{" "}
                                  {moment(latestLiveClass?.start_time).format(
                                    "MMM DD, YYYY"
                                  )}
                                </li>
                              )}
                              {latestLiveClass?.start_time &&
                                latestLiveClass?.end_time && (
                                  <li>
                                    <i
                                      className="icofont-clock-time"
                                      style={{ color: "#01579b" }}
                                    ></i>{" "}
                                    {moment(latestLiveClass?.start_time).format(
                                      "hh:mm A"
                                    )}
                                    -
                                    {moment(latestLiveClass?.end_time).format(
                                      "hh:mm A"
                                    )}
                                  </li>
                                )}
                            </ul>
                            {latestLiveClass?.meeting_title && (
                              <div className="gridarea__heading">
                                <h5>{latestLiveClass?.meeting_title}</h5>
                              </div>
                            )}
                            {latestLiveClass?.start_time && (
                              <div className="zoom__meeting__id">
                                <p>
                                  Starting Time :{" "}
                                  <span
                                    style={{
                                      color: "#01579b",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {moment(latestLiveClass?.start_time).format(
                                      "hh:mm A"
                                    )}
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__inner sticky-top mt-4 global-neomorphism-card-styling">
                            <div className="dashboard__nav__title">
                              <h6 className="mb-2">Next Lesson Due</h6>
                            </div>
                            <hr />
                            <div className="dashboard__nav">
                              <div>Writing Task 2 - Essay Writing</div>
                              <div className="d-flex justify-content-between">
                                <div>Lesson No. 7</div>
                                <div>Take me to the lesson</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                          <div className="dashboard__inner sticky-top mt-4 global-neomorphism-card-styling">
                            <div className="dashboard__nav__title">
                              <h6 className="mb-2">Today's Mission</h6>
                            </div>
                            <hr />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard__content__wraper common-background-color-across-app">
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
