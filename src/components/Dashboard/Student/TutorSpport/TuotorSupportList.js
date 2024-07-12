import React from "react";
import Loading from "../../../UI/Loading";
import moment from "moment";
import Table from "../../../UI/Table";

const TuotorSupportList = ({ isLoading, tutorSupportClass }) => {
  const handleJoinNow = (params) => {
    return (
      <button
        className="take-test"
        onClick={() => {
          window.open(params.data.join_url, "__blank");
        }}
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
    { headerName: "Meeting Title", field: "meeting_title" },
    { headerName: "Description", field: "meeting_description" },
    { headerName: "Start Date", field: "start_date" },
    { headerName: "Start Time", field: "start_time" },
    { headerName: "End Date", field: "end_date" },
    { headerName: "End Time", field: "end_time" },
    { headerName: "Batch Name", field: "select_batch.batch_name" },
  ];

  const rowData = tutorSupportClass.map((classItem) => ({
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
      ) : tutorSupportClass.length > 0 ? (
        <Table rowData={rowData} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">
          No Tuotor Support Classes Available Today !! , Please Schedule Your
          Classes.
        </h5>
      )}
    </>
  );
};

export default TuotorSupportList;
