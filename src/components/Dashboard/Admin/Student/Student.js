import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import CheckIcon from "../../../UI/CheckIcon";
import DASideBar from "../DASideBar/DASideBar";
import CancelIcon from "../../../UI/CancelIcon";
import ajaxCall from "../../../../helpers/ajaxCall";

const Student = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [studentList, setStudentList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/student_list_view_dashboard/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData?.accessToken}`,
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
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [authData?.accessToken]);

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
    { headerName: "User Name", field: "username", filter: true },
    {
      headerName: "First Name",
      field: "first_name",
      filter: true,
    },
    {
      headerName: "Last Name",
      field: "last_name",
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
      field: "city_name",
    },
    {
      headerName: "State",
      field: "state_name",
    },
    {
      headerName: "Country",
      field: "country_name",
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
  ];

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DASideBar />
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper">
                    <div className="dashboard__section__title">
                      <h4>Student</h4>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading />
                      ) : studentList.length > 0 ? (
                        <Table rowData={studentList} columnDefs={columns} />
                      ) : (
                        <h5 className="text-center text-danger">
                          No Students Available !!
                        </h5>
                      )}
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
