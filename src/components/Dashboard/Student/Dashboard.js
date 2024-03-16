import React, { useEffect, useState } from "react";
import moment from "moment";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import DSSidebar from "./DSSideBar/DSSideBar";
import ajaxCall from "../../../helpers/ajaxCall";
import { AgGridReact } from "ag-grid-react";
import { checkIcon } from "../Admin/Student/Student";
import { cancelIcon } from "../Admin/Student/Student";
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

  const renderItemAvailable = ({ value }) => {
    return value ? checkIcon() : cancelIcon();
  };

  const gridOptions = {
    rowData: studentList,
    columnDefs: [
      { headerName: "No.", field: "no", filter: true },
      { headerName: "First Name", field: "first_name", filter: true },
      { headerName: "Last Name", field: "last_name", filter: true },
      {
        headerName: "Gender",
        field: "gender",
        filter: true,
      },
      { headerName: "Phone No.", field: "phone_no" },
      {
        headerName: "Whatsapp No.",
        field: "whatsapp_no",
      },
      {
        headerName: "Last Education",
        field: "last_education",
      },
      { headerName: "Batch", field: "select_batch", filter: true },
      { headerName: "Package", field: "select_package", filter: true },
      { headerName: "Assignment", field: "student_mock.length", filter: true },
      { headerName: "Pratice Test", field: "student_pt.length", filter: true },
      {
        headerName: "Full Length Test",
        field: "student_flt.length",
        filter: true,
      },
      {
        headerName: "City",
        field: "city",
      },
      {
        headerName: "State",
        field: "state",
      },
      {
        headerName: "Country",
        field: "country",
      },
      {
        headerName: "Country Interested In",
        field: "country_interested_in",
      },
      {
        headerName: "Reference By",
        field: "reference_by",
      },
      {
        headerName: "Remark",
        field: "remark",
      },
      {
        headerName: "Biography",
        field: "biography",
      },
      {
        headerName: "IETLS Taken Before",
        field: "ielts_taken_before",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "Duolingo Taken Before",
        field: "duolingo_taken_before",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "PTE Taken Before",
        field: "pte_taken_before",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "TOFEL Taken Before",
        field: "toefl_taken_before",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "GRE Taken Before",
        field: "gre_taken_before",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "GMAT Taken Before",
        field: "gmat_taken_before",
        cellRenderer: renderItemAvailable,
      },
      {
        headerName: "Interested In Visa Counselling",
        field: "interested_in_visa_counselling",
        cellRenderer: renderItemAvailable,
      },
    ],
    pagination: true,
    paginationPageSize: 20,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  };

  return (
    <>
      {/* <TopBar /> */}
      {/* <NavBar /> */}
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
                      <div className="ag-theme-alpine">
                        <AgGridReact {...gridOptions} />
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
