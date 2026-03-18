import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";
import Loading from "../../../../UI/Loading";
import Table from "../../../../UI/Table";

const PracticeTestReport = ({ activeTab }) => {
  const navigate = useNavigate();

  const [ptData, setPtData] = useState([]);
  const [totalPT, setTotalPT] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeTab === "Practice Test") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            "/get-student-pt/",
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
          if (response.status === 200) {
            setPtData(response.data[0].student_pt);
            setTotalPT(response.data[0].total_pt);
            setIsLoading(false);
          }
        } catch (error) {
          console.log("error", error);
        }
      })();
    }
  }, [activeTab]);

  const columns = [
    {
      headerName: "No",
      field: "no",
      width: 100,
      cellRenderer: (params) => params.rowIndex + 1,
    },
    {
      headerName: "Name",
      field: "IELTS.Name",
      filter: true,
      width: 400,
    },
    {
      headerName: "Exam Type",
      field: "IELTS.practice_test_type",
      filter: true,
      width: 350,
    },
    {
      headerName: "Category",
      field: "IELTS.category",
      filter: true,
      width: 300,
    },
    {
      headerName: "View",
      field: "IELTS.id",
      width: 300,
      cellRenderer: (params) => {
        const paperId = params.data.IELTS.id;
        const testType = params.data.IELTS.practice_test_type;
        return (
          <button
            className="take-test"
            onClick={() => {
              if (testType === "Writing" || testType === "Speaking") {
                navigate(`/PracticeTest/Assessment/${testType}/${paperId}`);
              } else if (testType === "General") {
                navigate(`/PracticeTest/Answer/GENERAL/${paperId}`);
              } else {
                navigate(`/PracticeTest/Answer/${testType}/${paperId}`);
              }
            }}
          >
            View
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <div className="mainWrapper">
        <div className="d-flex flex-wrap gap-3 mb-3">
          <div className="wrap_item_icon">
            <i className="icofont-justify-all text-info icofont-md" />(
            {ptData?.length}) Given Tests
          </div>
          <div className="wrap_item_icon">
            <i className="icofont-list text-success icofont-md" />(
            {totalPT - ptData?.length}) Available Tests
          </div>
          <div className="wrap_item_icon">
            <i className="icofont-ui-copy text-secondary icofont-md"></i>(
            {totalPT}) Total Tests
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : ptData?.length > 0 ? (
        <Table rowData={ptData} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">
          Not Given Any Practice Test !!
        </h5>
      )}
    </div>
  );
};

export default PracticeTestReport;
