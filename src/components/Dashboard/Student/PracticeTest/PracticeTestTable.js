import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const PracticeTestTable = ({ testData, givenTest, testType }) => {
  const handleClick = (data) => {
    Object?.keys(data?.IELTS)?.forEach((key) => {
      if (Array.isArray(data?.IELTS[key])) {
        if (data?.IELTS[key].length > 0) {
          window.open(`/practice-live-exam/IELTS/${key}/${data.id}`, "_blank");
        }
      }
    });
  };

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: (params) => {
        return (
          <button
            className="take-test"
            onClick={() => handleClick(params.data)}
          >
            Take Test
          </button>
        );
      },
    },
    {
      headerName: "Name",
      field: "Name",
      cellRenderer: (params) => {
        return <div>{params.data.IELTS?.Name}</div>;
      },
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
      width: 155,
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
      width: 160,
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
    },
    {
      headerName: "Status",
      field: "Status",
      cellRenderer: (params) => {
        const examId = params.data.id;
        const isGiven = givenTest.find((test) => test.id === examId);
        if (isGiven) {
          return <button className="given-tag">Given</button>;
        } else {
          return (
            <button className="given-tag" style={{ backgroundColor: "red" }}>
              Not Given
            </button>
          );
        }
      },
    },
  ];

  const gridOptions = {
    rowData: testData.map((data) => ({
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
    })),
    columnDefs: columns,
    pagination: true,
    paginationPageSize: 10,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
    getRowStyle: (params) => {
      if (params.node.rowIndex % 2 === 1) {
        return { background: "#01579b36" };
      }
      return null;
    },
  };

  return (
    <>
      {testData.length === 0 ? (
        <h5 className="text-center text-danger">{`No ${testType} Tests Available !!`}</h5>
      ) : (
        <div className="ag-theme-alpine">
          <AgGridReact {...gridOptions} />
        </div>
      )}
    </>
  );
};

export default PracticeTestTable;
