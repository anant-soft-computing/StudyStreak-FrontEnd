import React from "react";
import moment from "moment";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const UpcomingClass = ({ joinNow, isWithin5Minutes, classes, message }) => {
  const handleJoinNow = (params) => (
    <button
      className="take-test"
      onClick={() => joinNow(params.data.zoom_meeting_id)}
      disabled={!isWithin5Minutes(params.data.start_time)}
    >
      Join Now
    </button>
  );

  const handleBook = () => <button className="given-tag">Booked</button>;

  const columns = [
    {
      headerName: "Join Now",
      cellRenderer: handleJoinNow,
    },
    { headerName: "Date", field: "date" },
    { headerName: "Time", field: "time" },
    { headerName: "Meeting Title", field: "meeting_title" },
    { headerName: "Batch Name", field: "batch_name" },
    { headerName: "Description", field: "meeting_description" },
    { headerName: "Start Time", field: "start_time" },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: handleBook,
    },
  ];
  const gridOptions = {
    rowData: classes.map(
      ({
        id,
        start_time,
        end_time,
        meeting_title,
        meeting_description,
        zoom_meeting_id,
        select_batch,
      }) => ({
        id,
        date: moment(start_time).format("DD MMM, YYYY"),
        time: `${moment(start_time).format("hh:mm A")} - ${moment(
          end_time
        ).format("hh:mm A")}`,
        meeting_title,
        batch_name: select_batch?.batch_name,
        meeting_description,
        zoom_meeting_id,
        start_time: moment(start_time).format("hh:mm A"),
      })
    ),
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
    <div className="ag-theme-alpine">
      {classes.length > 0 ? (
        <AgGridReact {...gridOptions} />
      ) : (
        <h5 className="text-center text-danger">{message}</h5>
      )}
    </div>
  );
};

export default UpcomingClass;
