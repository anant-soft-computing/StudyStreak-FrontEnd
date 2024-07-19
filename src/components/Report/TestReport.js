import React, { useState } from "react";
import Loading from "../UI/Loading";
import Table from "../UI/Table";
import Report from "./Report";

const TestReport = ({ reportData, testType, isLoading }) => {
  const [reportParams, setReportParams] = useState(null);

  const viewReport = (params) => {
    const examId = params.data.id;
    const paperId = params.data.IELTS.id;

    return (
      <button
        className="take-test"
        onClick={() =>
          setReportParams({
            examId: examId,
            paperId: paperId,
            testType: testType,
          })
        }
        style={{ backgroundColor: "green", border: "1px solid green" }}
      >
        View Report
      </button>
    );
  };

  const columns = [
    {
      headerName: "No",
      field: "no",
      width: 110,
      filter: true,
      cellRenderer: (params) => {
        return <div>{`(${params.data.no}).`}</div>;
      },
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
      headerName: "View Report",
      field: "button",
      cellRenderer: viewReport,
    },
  ];

  const rowData = reportData?.map((data, index) => ({
    ...data,
    no: index + 1,
  }));

  return (
    <>
      {isLoading ? (
        <Loading text="Loading...." color="primary" />
      ) : reportData.length > 0 ? (
        <>
          <div style={{ width: "540px" }}>
            <Table rowData={rowData} columnDefs={columns} />
          </div>
          {reportParams &&  (
            <Report
              examId={reportParams?.examId}
              paperId={reportParams?.paperId}
              testType={reportParams?.testType}
            />
          )}
        </>
      ) : (
        <h5 className="text-center text-danger">{`No ${testType} Report Available !!`}</h5>
      )}
    </>
  );
};

export default TestReport;
