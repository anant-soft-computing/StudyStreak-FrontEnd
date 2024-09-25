import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const PracticeTestTable = ({
  pendingTest,
  testType,
  isLoading,
  testData,
  givenTest,
}) => {
  const navigate = useNavigate();

  const handleClick = (data) => {
    if (pendingTest === 0) {
      toast.error(
        "You Do Not Have Any Test Available, Please Upgrade Package !!"
      );
      return;
    }

    Object?.keys(data?.IELTS)?.forEach((key) => {
      if (Array.isArray(data?.IELTS[key])) {
        if (data?.IELTS[key].length > 0) {
          if (testType === "Speaking") {
            window.open(
              `/practice-speaking-live-exam/IELTS/${key}/${data.id}`,
              "_blank"
            );
          } else if (
            testType === "Reading" ||
            testType === "Writing" ||
            testType === "Listening"
          ) {
            window.open(
              `/practice-live-exam/IELTS/${key}/${data.id}`,
              "_blank"
            );
          } else {
            window.open(
              `/general-practice-live-exam/IELTS/${key}/${data.id}`,
              "_blank"
            );
          }
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
          onClick={() => {
            if (testType === "Writing" || testType === "Speaking") {
              navigate(`/practice-assessment/${paperId}`, {
                state: { examType: testType },
              });
            } else if (testType === "General") {
              navigate(`/general-practice-test-answer/${examId}`, {
                state: { fullPaper: paperId, examForm: testType },
              });
            } else {
              navigate(`/exam-practice-test-answer/${examId}`, {
                state: { fullPaper: paperId, examForm: testType },
              });
            }
          }}
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
      width: 200,
    },
    {
      headerName: "Name",
      field: "Name",
      cellRenderer: (params) => {
        return <div>{params.data.IELTS?.Name}</div>;
      },
      filter: true,
      width: 250,
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
          case "General":
            return "3";
          default:
            return "";
        }
      },
      filter: true,
      width: 250,
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
            return "9 to 12";
          case "General":
            return "40";
          default:
            return "";
        }
      },
      filter: true,
      width: 250,
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
          case "General":
            return "60 Minutes";
          default:
            return "";
        }
      },
      filter: true,
      width: 250,
    },
    {
      headerName: "Status",
      field: "Status",
      cellRenderer: (params) => {
        const examId = params.data.id;
        const isGiven = givenTest?.find((test) => test?.id === examId);
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
      width: 250,
    },
  ];

  const sortedData = testData.sort((a, b) => {
    const getNumber = (name) => {
      const match = name.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    const nameA = getNumber(a.IELTS.Name);
    const nameB = getNumber(b.IELTS.Name);
    return nameA - nameB;
  });

  const rowData = sortedData.map((data) => ({
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
      {isLoading ? (
        <Loading />
      ) : testData.length > 0 ? (
        <Table rowData={rowData} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">{`No ${testType} Tests Available !!`}</h5>
      )}
    </>
  );
};

export default PracticeTestTable;
