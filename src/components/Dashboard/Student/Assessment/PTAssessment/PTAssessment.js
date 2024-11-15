import React from "react";
import Table from "../../../../UI/Table";
import { useNavigate } from "react-router-dom";

const PTAssessment = ({ testType, givenWritingTest, givenSpeakingTest }) => {
  const navigate = useNavigate();

  const writingAssessment = givenWritingTest.map((item, index) => {
    return {
      ...item,
      no: index + 1,
    };
  });

  const speakingAssessment = givenSpeakingTest.map((item, index) => {
    return {
      ...item,
      no: index + 1,
    };
  });

  const viewAssessment = (params) => {
    const paperId = params.data.IELTS.id;
    return (
      <button
        className="take-test"
        onClick={() =>
          navigate(`/practice-assessment/${paperId}`, {
            state: { examType: testType },
          })
        }
      >
        View
      </button>
    );
  };

  const columns = [
    { headerName: "No.", field: "no", resizable: false, width: 155 },
    {
      headerName: "Name",
      field: "Name",
      cellRenderer: (params) => {
        return <div>{params.data.IELTS?.Name}</div>;
      },
      filter: true,
      width: 325,
    },
    {
      headerName: "Difficulty Level",
      field: "difficulty_level",
      cellRenderer: (params) => {
        return <div>{params.data.IELTS?.difficulty_level}</div>;
      },
      filter: true,
      width: 325,
    },
    {
      headerName: "Sections",
      field: "section",
      cellRenderer: (params) => {
        return (
          <div>
            {testType === "Writing"
              ? params.data.IELTS?.Writing.length
              : params.data.IELTS?.Speaking.length}
          </div>
        );
      },
      filter: true,
      width: 325,
    },
    {
      headerName: "View Assessment",
      field: "button",
      cellRenderer: viewAssessment,
      filter: true,
      width: 325,
    },
  ];

  return (
    <div className="dashboard__content__wraper common-background-color-across-app">
      <div className="dashboard__section__title">
        <h4>Assessment</h4>
      </div>
      {(testType === "Writing" && writingAssessment.length > 0) ||
      (testType === "Speaking" && speakingAssessment.length > 0) ? (
        <Table
          rowData={
            testType === "Writing" ? writingAssessment : speakingAssessment
          }
          columnDefs={columns}
        />
      ) : (
        <h5 className="text-center text-danger">No Assessment Available !!</h5>
      )}
    </div>
  );
};

export default PTAssessment;
