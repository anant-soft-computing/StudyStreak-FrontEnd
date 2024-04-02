import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajaxCall from "../../../../helpers/ajaxCall";
import moment from "moment";

const columns = [
  { headerName: "No.", field: "no", filter: true, resizable: false, width: 86 },
  {
    headerName: "Batch",
    field: "select_batch.batch_name",
    filter: true,
  },
  { headerName: "Live Class Type", field: "liveclasstype.name", filter: true },
  {
    headerName: "Meeting Name",
    field: "meeting_title",
    filter: true,
    width: 150,
  },
  {
    headerName: "Start Date",
    field: "start_time",
    filter: true,
    width: 120,
    valueFormatter: ({ value }) => moment(value).format("YYYY-MM-DD"),
  },
  {
    headerName: "Start Time",
    field: "start_time",
    filter: true,
    width: 120,
    valueFormatter: ({ value }) => moment(value).format("HH:mm:ss"),
  },
  {
    headerName: "End Date",
    field: "end_time",
    filter: true,
    width: 120,
    valueFormatter: ({ value }) => moment(value).format("YYYY-MM-DD"),
  },
  {
    headerName: "End Time",
    field: "end_time",
    filter: true,
    width: 120,
    valueFormatter: ({ value }) => moment(value).format("HH:mm:ss"),
  },
];

const ViewLiveClasses = () => {
  const [liveClassList, setLiveClassList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/liveclass_list_view/`,
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
          const liveClassWithNumbers = response?.data?.map(
            (liveClass, index) => ({
              ...liveClass,
              no: index + 1,
            })
          );
          setLiveClassList(liveClassWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const gridOptions = {
    rowData: liveClassList,
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
export default ViewLiveClasses;
