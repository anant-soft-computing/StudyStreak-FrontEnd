import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  { headerName: "No.", field: "no", filter: true },
  {
    headerName: "Batch",
    field: "select_batch.batch_name",
    filter: true,
  },
  { headerName: "Live Class Type", field: "liveclasstype.name", filter: true },
  { headerName: "Meeting Name", field: "meeting_title", filter: true },
  {
    headerName: "Start Date",
    field: "start_time",
    filter: true,
    valueFormatter: ({ value }) => {
      const startDate = new Date(value).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const [month, day, year] = startDate.split("/");
      return `${year}-${month}-${day}`;
    },
  },
  {
    headerName: "Start Time",
    field: "start_time",
    filter: true,
    valueFormatter: ({ value }) => {
      const startTime = new Date(value).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return startTime;
    },
  },
  {
    headerName: "End Date",
    field: "end_time",
    filter: true,
    valueFormatter: ({ value }) => {
      const endDate = new Date(value).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const [month, day, year] = endDate.split("/");
      return `${year}-${month}-${day}`;
    },
  },
  {
    headerName: "End Time",
    field: "end_time",
    filter: true,
    valueFormatter: ({ value }) => {
      const endTime = new Date(value).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return endTime;
    },
  },
  { headerName: "Meeting ID", field: "zoom_meeting_id", filter: true },
  {
    headerName: "Meeting Password",
    field: "zoom_meeting_password",
    filter: true,
  },
];

const ViewLiveClasses = () => {
  const [liveClassList, setLiveClassList] = useState([]);

  const getLiveClassesList = async () => {
    try {
      const response = await ajaxCall(
        `/liveclass_list_view`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
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
  };

  useEffect(() => {
    getLiveClassesList();
  }, []);

  const gridOptions = {
    rowData: liveClassList,
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
export default ViewLiveClasses;
