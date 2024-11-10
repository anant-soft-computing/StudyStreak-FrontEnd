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
            const data = response.data[0].student_mock.map((item, index) => {
              return {
                ...item,
                no: index + 1,
              };
            });
            setMtData(data);
            setTotalMT(response.data[0].total_mock);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching data", error);
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
            const data = response.data[0].student_speakingblock.map(
              (item, index) => {
                return {
                  ...item,
                  no: index + 1,
                };
              }
            );
            setSpeakingData(data);
            setTotalSpeaking(response.data[0].total_speaking);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching data", error);
        }
      })();
    }
  }, [activeTab]);

  const tableData = useMemo(
    () =>
      [...mtData, ...speakingData].map((item, index) => ({
        no: index + 1,
        id: item.id,
        exam_name: item.exam_name || item.name,
        exam_type: item.exam_type,
        exam_category: item.exam_category,
      })),
    [mtData, speakingData]
  );

  const columns = [
    { headerName: "No", field: "no", resizable: false, width: 60 },
    {
      headerName: "Name",
      field: "exam_name",
      filter: true,
      width: 300,
    },
    {
      headerName: "Exam Type",
      field: "exam_type",
      filter: true,
    },
    {
      headerName: "Category",
      field: "exam_category",
      filter: true,
    },
    {
      headerName: "View",
      field: "id",
      cellRenderer: (params) => {
        const examId = params.data.id;
        const testType = params.data.exam_type;
        return (
          <button
            className="take-test"
            onClick={() => {
              if (testType === "Speaking" || testType === "Writing") {
                navigate(`/assessment/${examId}`, {
                  state: { examType: testType },
                });
              } else if (testType === "General") {
                navigate(`/general-exam-answer/${examId}`);
              } else {
                navigate(`/exam-answer/${examId}`);
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
        <div className="col-xl-8">
          <Table rowData={tableData} columnDefs={columns} />
        </div>
      ) : (
        <h5 className="text-center text-danger">Not Given Any Min Test !!</h5>
      )}
    </div>
  );
};

export default MiniTestReport;
