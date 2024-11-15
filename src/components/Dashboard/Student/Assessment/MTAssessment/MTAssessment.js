import React from "react";
import Table from "../../../../UI/Table";
import { useNavigate } from "react-router-dom";
const MTAssessment = ({ testType, givenWritingTest, givenSpeakingTest }) => {
  const navigate = useNavigate();
  const viewAssessment = (params) => {
    return (
      <button
        className="take-test"
        onClick={() =>
          navigate(`/assessment/${params.data.id}`, {
            state: { examType: testType },
          })
        }
      >
        View
      </button>
    );
  };

  const columns = [
    {
      headerName: "View Assessment",
      field: "button",
      cellRenderer: viewAssessment,
      filter: true,
    },
    { headerName: "Name", field: "exam_name", filter: true, width: 305 },
    {
      headerName: "Difficulty Level",
      field: "difficulty_level",
      filter: true,
      width: 305,
    },
    {
      headerName: "Category",
      field: "exam_category",
      filter: true,
      valueGetter: (params) => {
        return params.data?.exam_category || "IELTS";
      },
      width: 305,
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

export default MTAssessment;
