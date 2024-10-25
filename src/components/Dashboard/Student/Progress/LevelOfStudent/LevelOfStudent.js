import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../../helpers/ajaxCall";
import Table from "../../../../UI/Table";

const LevelOfStudent = () => {
  const [fltData, setFLTData] = useState([]);
  const [givenTest, setGivenTest] = useState([]);

  const reportData = fltData
    ?.filter((item) => givenTest?.some((index) => index === item.id))
    ?.map((item, index) => ({ ...item, no: index + 1 }));

  const viewReport = (params) => {
    return (
      <button
        className="take-test"
        onClick={() => {
          window.open(`/diagnostic-test-answer/${params.data.id}`, "_blank");
        }}
        style={{ backgroundColor: "#01579b", border: "1px solid #01579b" }}
      >
        View Report
      </button>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/student-stats/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setGivenTest(response?.data?.student_flt);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/get/flt/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setFLTData(
            response?.data?.filter(({ name }) => name?.includes("Diagnostic"))
          );
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const columns = [
    {
      headerName: "No",
      field: "no",
      width: 95,
      filter: true,
      cellRenderer: (params) => {
        return <div>{params.data.no}</div>;
      },
    },
    {
      headerName: "Name",
      field: "name",
      width: 300,
      filter: true,
    },
    {
      headerName: "Reading Set",
      field: "reading_set.Reading.length",
      filter: true,
    },
    {
      headerName: "Writing Set",
      field: "writing_set.Writing.length",
      filter: true,
    },
    {
      headerName: "Listening Set",
      field: "listening_set.Listening.length",
      filter: true,
    },
    {
      headerName: "Speaking Set",
      field: "speaking_set.Speaking.length",
      filter: true,
    },
    {
      headerName: "View Report",
      field: "button",
      cellRenderer: viewReport,
      width: 260,
    },
  ];

  return (
    reportData?.length > 0 && (
      <div>
        <h4
          className="sidebar__title"
          style={{ marginBottom: "0px", marginTop: "20px" }}
        >
          Level Of Student
        </h4>
        <div className="col-xl-12 mt-4">
          <div className="dashboard__table table-responsive">
            <Table rowData={reportData} columnDefs={columns} />
          </div>
        </div>
      </div>
    )
  );
};

export default LevelOfStudent;
