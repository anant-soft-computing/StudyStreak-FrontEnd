import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DASideBar from "../DASideBar/DASideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import CheckIcon from "../../../UI/CheckIcon";
import CancelIcon from "../../../UI/CancelIcon";

const Student = () => {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/student_list_view_dashboard/`,
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
          const studentWithNumbers = response?.data?.map((student, index) => ({
            ...student,
            no: index + 1,
          }));
          setStudentList(studentWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const renderItemAvailable = ({ value }) => {
    return value ? <CheckIcon /> : <CancelIcon />;
  };

  const gridOptions = {
    rowData: studentList,
    columnDefs: [
      {
        headerName: "No.",
        field: "no",
        filter: true,
        resizable: false,
        width: 75,
      },
      { headerName: "User Name", field: "user.username", filter: true },
      {
        headerName: "First Name",
        field: "user.first_name",
        filter: true,
        width: 120,
      },
      {
        headerName: "Last Name",
        field: "user.last_name",
        filter: true,
        width: 120,
      },
      {
        headerName: "Gender",
        field: "gender",
        filter: true,
        width: 120,
      },
      { headerName: "Phone No.", field: "phone_no", width: 120 },
      {
        headerName: "Whatsapp No.",
        field: "whatsapp_no",
        width: 130,
      },
      {
        headerName: "Last Education",
        field: "last_education",
        width: 130,
      },
      {
        headerName: "City",
        field: "city.name",
        width: 120,
      },
      {
        headerName: "State",
        field: "state.name",
        width: 120,
      },
      {
        headerName: "Country",
        field: "country.name",
        width: 120,
      },
      {
        headerName: "Country Interested In",
        field: "country_interested_in.name",
        width: 180,
      },
      {
        headerName: "Reference By",
        field: "reference_by",
        width: 120,
      },
      {
        headerName: "Remark",
        field: "remark",
        width: 120,
      },
      {
        headerName: "Biography",
        field: "biography",
        width: 120,
      },
      {
        headerName: "IETLS Taken Before",
        field: "ielts_taken_before",
        cellRenderer: renderItemAvailable,
        width: 180,
      },
      {
        headerName: "Duolingo Taken Before",
        field: "duolingo_taken_before",
        cellRenderer: renderItemAvailable,
        width: 180,
      },
      {
        headerName: "PTE Taken Before",
        field: "pte_taken_before",
        cellRenderer: renderItemAvailable,
        width: 180,
      },
      {
        headerName: "TOFEL Taken Before",
        field: "toefl_taken_before",
        cellRenderer: renderItemAvailable,
        width: 180,
      },
      {
        headerName: "GRE Taken Before",
        field: "gre_taken_before",
        cellRenderer: renderItemAvailable,
        width: 180,
      },
      {
        headerName: "GMAT Taken Before",
        field: "gmat_taken_before",
        cellRenderer: renderItemAvailable,
        width: 180,
      },
      {
        headerName: "Interested In Visa Counselling",
        field: "interested_in_visa_counselling",
        cellRenderer: renderItemAvailable,
      },
    ],
    pagination: true,
    paginationPageSize: 10,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    getRowStyle: (params) => {
      if (params.node.rowIndex % 2 === 1) {
        return { background: "#01579b36" };
      }
      return null;
    },
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DASideBar />
                <div className="col-xl-9 col-lg-9 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Student</h4>
                    </div>
                    <div className="row">
                      <div className="ag-theme-quartz">
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
    </div>
  );
};

export default Student;
