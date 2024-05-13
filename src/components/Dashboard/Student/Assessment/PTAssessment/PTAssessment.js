import React from "react";
import Table from "../../../../UI/Table";

const PTAssessment = ({ testType, givenWritingTest, givenSpeakingTest }) => {
  const viewAssessment = () => {
    return <button className="take-test">View</button>;
  };

  const columns = [
    {
      headerName: "View Assessment",
      field: "button",
      cellRenderer: viewAssessment,
      filter: true,
    },
    {
      headerName: "Name",
      field: "Name",
      cellRenderer: (params) => {
        return <div>{params.data.IELTS?.Name}</div>;
      },
      filter: true,
      width: 305,
    },
    {
      headerName: "Difficulty Level",
      field: "difficulty_level",
      cellRenderer: (params) => {
        return <div>{params.data.IELTS?.difficulty_level}</div>;
      },
      filter: true,
      width: 305,
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

export default PTAssessment;
