import React from "react";
import Table from "../../../../UI/Table";
import { useNavigate } from "react-router-dom";

const PTAssessment = ({ testType, givenWritingTest, givenSpeakingTest }) => {
  const navigate = useNavigate();

  const viewAssessment = (params) => {
    const paperId = params.data.IELTS.id;
    return (
      <button
        className="take-test"
        onClick={() =>
          navigate(`/PracticeTest/Assessment/${params.data.exam_type}/${paperId}`)
        }
      >
        View
      </button>
    );
  };

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 155,
      cellRenderer: (params) => params.rowIndex + 1,
    },
    {
      headerName: "Name",
      field: "Name",
      cellRenderer: (params) => {
        return <div>{params.data.IELTS?.Name}</div>;
      },
      filter: true,
      width: 432,
    },
    {
      headerName: "Sections",
      field: "section",
      cellRenderer: (params) => {
        return (
          <div>
            {params.data.exam_type === "Writing"
              ? params.data.writing_block_count
              : params.data.speaking_block_count}
          </div>
        );
      },
      filter: true,
      width: 432,
    },
    {
      headerName: "View Assessment",
      field: "button",
      cellRenderer: viewAssessment,
      filter: true,
      width: 432,
    },
  ];

  return (
    <div className="dashboard__content__wraper common-background-color-across-app">
      <div className="dashboard__section__title">
        <h4>Assessment</h4>
      </div>
      {(testType === "Writing" && givenWritingTest.length > 0) ||
      (testType === "Speaking" && givenSpeakingTest.length > 0) ? (
        <Table
          rowData={
            testType === "Writing" ? givenWritingTest : givenSpeakingTest
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
