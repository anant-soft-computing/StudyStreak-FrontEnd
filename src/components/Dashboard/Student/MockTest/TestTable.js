import React from "react";
import Table from "../../../UI/Table";

const TestTable = ({ testData, givenTest, givenSpeakingTest, testType }) => {
  const takeTest = (params) => {
    return (
      <button
        className="take-test"
        onClick={() =>
          window.open(
            `/${testType !== "Speaking" ? "live-exam" : "live-speaking-exam"}/${
              params.data.id
            }`,
            "_blank"
          )
        }
      >
        Take Test
      </button>
    );
  };

  const testStatus = (params) => {
    const examId = params.data.id;
    const isGiven =
      testType === "Speaking"
        ? givenSpeakingTest?.find((test) => test?.id === examId)
        : givenTest?.find((test) => test?.id === examId);
    if (isGiven) {
      return <button className="given-tag">Given</button>;
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
    },
    { headerName: "Name", field: "exam_name", filter: true },
    {
      headerName: "No. Of Questions",
      field: "no_of_questions",
      filter: true,
    },
    {
      headerName: "Difficulty Level",
      field: "difficulty_level",
      filter: true,
    },

    {
      headerName: "Status",
      field: "status",
      filter: true,
      cellRenderer: testStatus,
    },
  ];

  return (
    <>
      {testData.length === 0 ? (
        <h5 className="text-center text-danger">{`No ${testType} Tests Available !!`}</h5>
      ) : (
        <Table rowData={testData} columnDefs={columns} />
      )}
    </>
  );
};

export default TestTable;
