import React from "react";
import moment from "moment";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const ClassList = ({ classes, bookCount, message }) => {
  const handleBook = (params) => {
    const { id, isPastDate } = params.data;
    return (
      <button
        className="take-test"
        onClick={() => bookCount(id)}
        disabled={isPastDate}
      >
        Book Slot
      </button>
    );
  };

  const columns = [
    {
      headerName: "Book Slot",
      cellRenderer: handleBook,
    },
    { headerName: "Date", field: "date" },
    { headerName: "Time", field: "time" },
    { headerName: "Meeting Title", field: "title" },
    { headerName: "Batch Name", field: "batchName" },
    { headerName: "Description", field: "description" },
    { headerName: "Starting Time", field: "startingTime" },
  ];

  const rowData = classes.map(
    ({
      id,
      start_time,
      end_time,
      meeting_title,
      meeting_description,
      select_batch,
    }) => {
      const start_Date = new Date(start_time);
      const startDate = moment(start_time).format("DD MMM, YYYY");
      const startTime = moment(start_time).format("hh:mm A");
      const endTime = moment(end_time).format("hh:mm A");
      const title = meeting_title;
      const batchName = select_batch?.batch_name;
      const description = meeting_description;
      const startingTime = moment(start_time).format("hh:mm A");
      const isPastDate = start_Date < new Date();
      return {
        id,
        date: startDate,
        time: `${startTime} - ${endTime}`,
        title,
        batchName,
        description,
        startingTime,
        isPastDate,
      };
    }
  );

  return (
    <>
      {classes.length === 0 ? (
        <h5 className="text-center text-danger">{message}</h5>
      ) : (
        <div
          className="ag-theme-alpine"
          style={{ height: "500px", width: "100%" }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
            defaultColDef={{
              sortable: true,
              resizable: true,
            }}
            getRowStyle={(params) => {
              if (params.node.rowIndex % 2 === 1) {
                return { background: "#01579b36" };
              }
              return null;
            }}
          />
        </div>
      )}
    </>
  );
};

export default ClassList;
