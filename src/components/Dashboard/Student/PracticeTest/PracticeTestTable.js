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

    const baseUrl =
      data?.exam_type === "Speaking"
        ? "/Speaking-PracticeLiveExam/IELTS"
        : "/PracticeLiveExam/IELTS";

    const url =
      data?.exam_type === "General"
        ? `/GENERAL-PracticeLiveExam/IELTS/${data.exam_type}/${data.id}`
        : `${baseUrl}/${data.exam_type}/${data.id}`;
    window.open(url, "_blank");
  };

  const testButton = (params) => {
    const { id: examId, exam_type, IELTS } = params.data;
    const paperId = IELTS?.id;
    const isGiven = givenTest?.some((test) => test?.id === examId);

    return isGiven ? (
      <button
        className="take-test"
        onClick={() => {
          const reviewUrl =
            exam_type === "Writing" || exam_type === "Speaking"
              ? `/PracticeTest/Assessment/${exam_type}/${paperId}`
              : `/PracticeTest/Answer/${
                  exam_type === "General" ? "GENERAL" : exam_type
                }/${paperId}`;
          navigate(reviewUrl);
        }}
        style={{ backgroundColor: "green", border: "1px solid green" }}
      >
        Review Test
      </button>
    ) : (
      <button className="take-test" onClick={() => handleClick(params.data)}>
        Take Test
      </button>
    );
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
      valueGetter: (params) => {
        switch (params.data.exam_type) {
          case "Reading":
            return params.data.reading_block_count;
          case "Writing":
            return params.data.writing_block_count;
          case "Listening":
            return params.data.listening_block_count;
          case "Speaking":
            return params.data.speaking_block_count;
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
      valueGetter: (params) => {
        switch (params.data.exam_type) {
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
      valueGetter: (params) => {
        switch (params.data.exam_type) {
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
        const isGiven = givenTest?.some((test) => test?.id === examId);

        return isGiven ? (
          <button className="given-tag" style={{ backgroundColor: "green" }}>
            Given
          </button>
        ) : (
          <button className="given-tag" style={{ backgroundColor: "red" }}>
            Not Given
          </button>
        );
      },
      filter: true,
      width: 250,
    },
  ];

  const rowData = testData.sort((a, b) => {
    const getNumber = (name) => {
      const match = name.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    const nameA = getNumber(a.IELTS.Name);
    const nameB = getNumber(b.IELTS.Name);
    return nameA - nameB;
  });

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
