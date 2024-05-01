import React, { useEffect, useState } from "react";
import DASideBar from "../DASideBar/DASideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import CheckIcon from "../../../UI/CheckIcon";
import CancelIcon from "../../../UI/CancelIcon";
import Table from "../../../UI/Table";

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

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 75,
    },
    { headerName: "User Name", field: "user.username", filter: true },
    {
      headerName: "First Name",
      field: "user.first_name",
      filter: true,
    },
    {
      headerName: "Last Name",
      field: "user.last_name",
      filter: true,
    },
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
    {
      headerName: "City",
      field: "city.name",
    },
    {
      headerName: "State",
      field: "state.name",
    },
    {
      headerName: "Country",
      field: "country.name",
    },
    {
      headerName: "Country Interested In",
      field: "country_interested_in.name",
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
  ];

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
                      <Table rowData={studentList} columnDefs={columns} />
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
