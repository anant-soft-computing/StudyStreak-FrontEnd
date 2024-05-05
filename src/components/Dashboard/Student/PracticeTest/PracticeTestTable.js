import React from "react";
import Table from "../../../UI/Table";
import { useNavigate } from "react-router-dom";

const PracticeTestTable = ({ testData, givenTest, testType }) => {
  const navigate = useNavigate();
  const handleClick = (data) => {
    Object?.keys(data?.IELTS)?.forEach((key) => {
      if (Array.isArray(data?.IELTS[key])) {
        if (data?.IELTS[key].length > 0) {
          window.open(
            `${
              testType === "Speaking"
                ? "/practice-speaking-live-exam"
                : "/practice-live-exam"
            }/IELTS/${key}/${data.id}`,
            "_blank"
          );
        }
      }
    });
  };

  const testButton = (params) => {
    const examId = params.data.id;
    const paperId = params.data.IELTS.id;
    const isGiven = givenTest?.find((test) => test?.id === examId);
    if (isGiven) {
      return (
        <button
          className="take-test"
          onClick={() =>
            navigate(`/eaxm-practice-test-answere/${examId}`, {
              state: { fullPaper: paperId, examForm: testType },
            })
          }
          style={{ backgroundColor: "green", border: "1px solid green" }}
        >
          Review Test
        </button>
      );
    } else {
      return (
        <button className="take-test" onClick={() => handleClick(params.data)}>
          Take Test
        </button>
      );
    }
  };

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: testButton,
    },
    {
      headerName: "Name",
      field: "Name",
      cellRenderer: (params) => {
        return <div>{params.data.IELTS?.Name}</div>;
      },
      filter: true,
    },
    {
      headerName: "Sections",
      field: "sections",
      valueGetter: () => {
        switch (testType) {
          case "Reading":
            return "3";
          case "Writing":
            return "2";
          case "Listening":
            return "4";
          case "Speaking":
            return "3";
          default:
            return "";
        }
      },
      filter: true,
    },
    {
      headerName: "Questions",
      field: "questions",
      valueGetter: () => {
        switch (testType) {
          case "Reading":
            return "40";
          case "Writing":
            return "20";
          case "Listening":
            return "40";
          case "Speaking":
            return "";
          default:
            return "";
        }
      },
      filter: true,
    },
    {
      headerName: "Time",
      field: "time",
      valueGetter: () => {
        switch (testType) {
          case "Reading":
            return "60 Minutes";
          case "Writing":
            return "60 Minutes";
          case "Listening":
            return "30 Minutes";
          case "Speaking":
            return "15 Minutes";
          default:
            return "";
        }
      },
      filter: true,
    },
    {
      headerName: "Status",
      field: "Status",
      cellRenderer: (params) => {
        const examId = params.data.id;
        const isGiven = givenTest?.find((test) => test.id === examId);
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
      },
      filter: true,
    },
  ];

  const rowData = testData.map((data) => ({
    ...data,
    sections:
      testType === "Speaking" ? "3" : testType === "Listening" ? "4" : "3",
    questions:
      testType === "Speaking" ? "" : testType === "Writing" ? "20" : "40",
    time:
      testType === "Speaking"
        ? "15 Minutes"
        : testType === "Listening"
        ? "30 Minutes"
        : "60 Minutes",
  }));

  return (
    <>
      {testData.length === 0 ? (
        <h5 className="text-center text-danger">{`No ${testType} Tests Available !!`}</h5>
      ) : (
        <Table rowData={rowData} columnDefs={columns} />
      )}
    </>
  );
};

export default PracticeTestTable;
