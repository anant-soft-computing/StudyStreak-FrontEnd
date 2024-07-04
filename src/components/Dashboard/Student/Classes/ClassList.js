import React from "react";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const ClassList = ({ classes, bookCount, isLoading, message }) => {
  const handleBook = (params) => {
    // Class Start Date is Greater than Current Date than it's worked
    const { id, isPastDate } = params.data;
    return (
      <button
        className="take-test"
        onClick={() => bookCount(id)}
        disabled={isPastDate}
        style={{ opacity: isPastDate ? 0.5 : 1 }}
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
    { headerName: "Meeting Title", field: "title" },
    { headerName: "Description", field: "description" },
    { headerName: "Starting Time", field: "startingTime" },
    { headerName: "Date", field: "date" },
    { headerName: "Time", field: "time" },
    { headerName: "Batch Name", field: "batchName" },
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
      {isLoading ? (
        <Loading text="Loading..." color="primary" />
      ) : classes.length > 0 ? (
        <Table rowData={rowData} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">{message}</h5>
      )}
    </>
  );
};

export default ClassList;
