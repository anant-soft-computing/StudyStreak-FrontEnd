import React, { useEffect, useState } from "react";
import "../../../css/student panel/dashboard.css";
import moment from "moment";
import Footer from "../../Footer/Footer";
import DSSidebar from "./DSSideBar/DSSideBar";
import ajaxCall from "../../../helpers/ajaxCall";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Dashboard = () => {
  const [studentList, setStudentList] = useState([]);
  const [latestLiveClass, setLatestLiveClass] = useState({});
  const batchId = JSON.parse(localStorage.getItem("BatchID"));

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/batchidwisestudentgetview/${batchId}/`,
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
          const studentWithNumbers = response?.data?.students.map(
            (student, index) => ({
              ...student,
              no: index + 1,
            })
          );
          setStudentList(studentWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [batchId]);

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
      <div className="body__wrapper all-component-main-container">
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
                      <div>
                        <table className="student-dashboard-leaderboard-table">
                          <thead className="student-dashboard-leaderboard-table-head">
                            <tr>
                              <th className="sd-leaderboard-header-cell">
                                No.
                              </th>
                              <th className="sd-leaderboard-header-cell">
                                First Name
                              </th>
                              <th className="sd-leaderboard-header-cell">
                                Last Name
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentList?.length > 0 &&
                              studentList?.map((elem) => (
                                <tr key={elem?.id}>
                                  <td className="sd-leaderboard-header-cell">
                                    {`${elem?.no}.`}
                                  </td>
                                  <td className="sd-leaderboard-header-cell">
                                    {elem?.first_name}
                                  </td>
                                  <td className="sd-leaderboard-header-cell">
                                    {elem?.last_name}
                                  </td>
                                </tr>
                              ))}
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
      <Footer />
    </>
  );
};

export default Dashboard;
