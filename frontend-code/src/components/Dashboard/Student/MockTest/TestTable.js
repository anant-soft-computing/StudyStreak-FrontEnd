import React from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const TestTable = ({
  testData,
  givenTest,
  givenSpeakingTest,
  testType,
  isLoading,
}) => {
  const navigate = useNavigate();
  const takeTest = (params) => {
    const examId = params.data.id;
    const isGiven =
      testType === "Speaking"
        ? givenSpeakingTest?.find((test) => test === examId)
        : givenTest?.find((test) => test === examId);
    if (isGiven) {
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
          style={{ backgroundColor: "green", border: "1px solid green" }}
        >
          Review Test
        </button>
      );
    } else {
      return (
        <button
          className="take-test"
          onClick={() =>
            window.open(
              `${
                testType === "General"
                  ? "/GENERAL-MiniLiveExam"
                  : testType !== "Speaking"
                  ? "/MiniLiveExam"
                  : "/Speaking-MiniLiveExam"
              }/${testType}/${params.data.id}`,
              "_blank"
            )
          }
        >
          Take Test
        </button>
      );
    }
  };

  const testStatus = (params) => {
    const examId = params.data.id;
    const isGiven =
      testType === "Speaking"
        ? givenSpeakingTest?.find((test) => test === examId)
        : givenTest?.find((test) => test === examId);
    if (isGiven) {
      return (
        <button className="given-tag" style={{ backgroundColor: "green" }}>
          Given
        </button>
      );
    } else {
      return (
        <button className="given-tag" style={{ backgroundColor: "red" }}>
          Not Given
        </button>
      );
    }
  };

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: takeTest,
      filter: true,
      width: 240,
    },
    { headerName: "Name", field: "exam_name", filter: true, width: 350 },
    {
      headerName: "No. Of Questions",
      field: "no_of_questions",
      filter: true,
      width: 290,
    },
    {
      headerName: "Category",
      field: "exam_category",
      filter: true,
      width: 290,
    },
    {
      headerName: "Status",
      field: "status",
      filter: true,
      cellRenderer: testStatus,
      width: 280,
    },
  ];

  const sortedData = testData.sort((a, b) => {
    const getNumber = (name) => {
      const match = name.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    const nameA = getNumber(a.exam_name);
    const nameB = getNumber(b.exam_name);
    return nameA - nameB;
  });

  return (
    <>
      {isLoading ? (
        <Loading text="Loading..." color="primary" />
      ) : testData.length > 0 ? (
        <Table rowData={sortedData} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">{`No ${testType} Tests Available !!`}</h5>
      )}
    </>
  );
};

export default TestTable;
