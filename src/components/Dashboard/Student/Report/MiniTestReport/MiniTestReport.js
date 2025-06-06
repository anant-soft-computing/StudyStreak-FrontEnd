import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";
import Loading from "../../../../UI/Loading";
import Table from "../../../../UI/Table";

const MiniTestReport = ({ activeTab }) => {
  const navigate = useNavigate();

  const [mtData, setMtData] = useState([]);
  const [speakingData, setSpeakingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalMT, setTotalMT] = useState(0);
  const [totalSpeaking, setTotalSpeaking] = useState(0);

  const totalTests = totalMT + totalSpeaking;
  const givenTests = mtData.length + speakingData.length;
  const availableTests = totalTests - givenTests;

  useEffect(() => {
    if (activeTab === "Mini Test") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            "/get-student-mock/",
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
            setMtData(response.data[0].student_mock);
            setTotalMT(response.data[0].total_mock);
            setIsLoading(false);
          }
        } catch (error) {
          console.log("error", error);
        }
      })();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "Mini Test") {
      setIsLoading(true);
      (async () => {
        try {
          const response = await ajaxCall(
            "/get-student-speaking/",
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
            setSpeakingData(response.data[0].student_speakingblock);
            setTotalSpeaking(response.data[0].total_speaking);
            setIsLoading(false);
          }
        } catch (error) {
          console.log("error", error);
        }
      })();
    }
  }, [activeTab]);

  const tableData = useMemo(
    () =>
      [...mtData, ...speakingData].map((item) => ({
        id: item.id,
        exam_name: item.exam_name || item.name,
        exam_type: item.exam_type,
        exam_category: item.exam_category,
      })),
    [mtData, speakingData]
  );

  const columns = [
    {
      headerName: "No",
      field: "no",
      width: 100,
      cellRenderer: (params) => params.rowIndex + 1,
    },
    {
      headerName: "Name",
      field: "exam_name",
      filter: true,
      width: 400,
    },
    {
      headerName: "Exam Type",
      field: "exam_type",
      filter: true,
      width: 350,
    },
    {
      headerName: "Category",
      field: "exam_category",
      filter: true,
      width: 350,
    },
    {
      headerName: "View",
      field: "id",
      width: 250,
      cellRenderer: (params) => {
        const examId = params.data.id;
        const testType = params.data.exam_type;
        return (
          <button
            className="take-test"
            onClick={() => {
              if (testType === "Speaking" || testType === "Writing") {
                navigate(`/MiniTest/Assessment/${testType}/${examId}`);
              } else if (testType === "General") {
                navigate(`/MiniTest/Answer/GENERAL/${examId}`);
              } else {
                navigate(`/MiniTest/Answer/${examId}`);
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
            {givenTests}) Given Tests
          </div>
          <div className="wrap_item_icon">
            <i className="icofont-list text-success icofont-md" />(
            {availableTests}) Available Tests
          </div>
          <div className="wrap_item_icon">
            <i className="icofont-ui-copy text-secondary icofont-md"></i>(
            {totalTests}) Total Tests
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : tableData?.length > 0 ? (
        <Table rowData={tableData} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">Not Given Any Min Test !!</h5>
      )}
    </div>
  );
};

export default MiniTestReport;
