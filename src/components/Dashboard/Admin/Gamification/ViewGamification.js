import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const columns = [
  { headerName: "No.", field: "no" },
  { headerName: "Model", field: "model", filter: true },
  { headerName: "Exam Name", field: "exam_name", filter: true },
  { headerName: "Exam Type", field: "exam_type", filter: true },
  {
    headerName: "No. Of Questions",
    field: "no_of_questions",
    filter: true,
  },
  { headerName: "Block Type", field: "block_type", filter: true },
  {
    headerName: "Difficulty Level",
    field: "difficulty_level",
    filter: true,
  },
  {
    headerName: "Block Threshold",
    field: "block_threshold",
    filter: true,
  },
];

const ViewGamification = () => {
  const [gamificationList, setGimificationList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/get/gamification/`,
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

        if (response?.status === 200) {
          const gamificationWithNumbers = response?.data?.map(
            (gamification, index) => ({
              ...gamification,
              no: index + 1,
            })
          );
          setGimificationList(gamificationWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const gridOptions = {
    rowData: gamificationList,
    columnDefs: columns,
    pagination: true,
    paginationPageSize: 20,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  };
  return (
    <div className="ag-theme-alpine">
      <AgGridReact {...gridOptions} />
    </div>
  );
};

export default ViewGamification;