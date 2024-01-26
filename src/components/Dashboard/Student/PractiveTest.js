import React, { useEffect, useState } from "react";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";
import DSNavBar from "./DSNavBar/DSNavBar";
import DSSidebar from "./DSSideBar/DSSideBar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ajaxCall from "../../../helpers/ajaxCall";
import { Link } from "react-router-dom";

const PracticeTest = () => {
  const [practiceTestData, setPracticeTestData] = useState([]);

  const getPracticeTestData = async () => {
    try {
      const response = await ajaxCall(
        `/examlistfilterview/?block_type=Practice`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        const examBlockWithNumbers = response?.data?.map(
          (examBlock, index) => ({
            ...examBlock,
            no: index + 1,
          })
        );
        setPracticeTestData(examBlockWithNumbers);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getPracticeTestData();
  }, []);

  const gridOptions = {
    rowData: practiceTestData,
    columnDefs: [
      { headerName: "No.", field: "no", filter: true },
      {
        headerName: "Exam Name",
        field: "exam_name",
        filter: true,
        cellRenderer: (params) => {
          const name = params.value;
          const examData = params?.data;
          return (
            <Link to="/live-writing-exam" state={examData}>
              {name}
            </Link>
          );
        },
      },
      { headerName: "Exam Type", field: "exam_type", filter: true },
      {
        headerName: "No. Of Questions",
        field: "no_of_questions",
        filter: true,
      },
      {
        headerName: "Difficulty Level",
        field: "difficulty_level",
        filter: true,
      },
    ],
    pagination: true,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  };

  return (
    <div>
      <TopBar />
      <NavBar />
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
                        <h4>Practice Test</h4>
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
    </div>
  );
};

export default PracticeTest;
