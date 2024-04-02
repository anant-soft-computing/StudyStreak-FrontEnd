import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  {
    headerName: "No.",
    field: "no",
    resizable: false,
    width: 76,
    headerClass: "ag-grid-header",
  },
  { headerName: "Name", field: "batch_name", filter: true },
  { headerName: "Package", field: "add_package.package_name", filter: true },
  {
    headerName: "Start Date",
    field: "batch_startdate",
    filter: true,
    width: 160,
  },
  { headerName: "End Date", field: "batch_enddate", filter: true, width: 160 },
  {
    headerName: "Start Time",
    field: "batch_start_timing",
    filter: true,
    width: 160,
  },
  {
    headerName: "End Time",
    field: "batch_end_timing",
    filter: true,
    width: 160,
  },
];

const ViewBatches = () => {
  const [batchList, setBatchList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/batchview/`,
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
          const batchesWithNumbers = response?.data?.map((batch, index) => ({
            ...batch,
            no: index + 1,
          }));
          setBatchList(batchesWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const gridOptions = {
    rowData: batchList,
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
    <div className="ag-theme-quartz">
      <AgGridReact {...gridOptions} />
    </div>
  );
};

export default ViewBatches;
