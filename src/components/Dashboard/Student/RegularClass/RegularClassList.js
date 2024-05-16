import React from "react";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const RegularClassList = ({
  isLoading,
  regularClass,
  joinNow,
  isWithin5Minutes,
}) => {
  const handleJoinNow = (params) => {
    const { zoom_meeting_id, start_time } = params.data;
    return (
      <button
        className="take-test"
        onClick={() => joinNow(zoom_meeting_id)}
        disabled={!isWithin5Minutes(start_time)}
      >
        Join Now
      </button>
    );
  };

  const columns = [
    {
      headerName: "Join Now",
      cellRenderer: handleJoinNow,
    },
    { headerName: "Start Date", field: "start_date" },
    { headerName: "Start Time", field: "start_time" },
    { headerName: "End Date", field: "end_date" },
    { headerName: "End Time", field: "end_time" },
    { headerName: "Meeting Title", field: "meeting_title" },
    { headerName: "Batch Name", field: "select_batch.batch_name" },
    { headerName: "Description", field: "meeting_description" },
  ];

  const rowData = regularClass.map((classItem) => ({
    ...classItem,
    start_date: moment(classItem.start_time).format("DD MMM, YYYY"),
    start_time: moment(classItem.start_time).format("hh:mm A"),
    end_time: moment(classItem.end_time).format("hh:mm A"),
    end_date: moment(classItem.end_time).format("DD MMM, YYYY"),
  }));

  return (
    <>
      {isLoading ? (
        <Loading text="Loading..." color="primary" />
      ) : regularClass.length > 0 ? (
        <Table rowData={rowData} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">
          No Regular Classes Available Today !! , Please Schedule Your Classes.
        </h5>
      )}
    </>
  );
};

export default RegularClassList;
