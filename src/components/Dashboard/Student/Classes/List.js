import React, { useEffect, useState } from "react";
import moment from "moment";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";

const List = ({ isLoading, classes, message }) => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinNow = (params) => {
    const { join_url, start_time } = params.data;
    const now = currentTime;
    const todayDate = now.format("YYYY-MM-DD");
    const classStartTime = moment(
      `${todayDate} ${start_time}`,
      "YYYY-MM-DD hh:mm A"
    );
    const timeDifference = classStartTime.diff(now, "minutes");
    const isButtonEnabled = timeDifference <= 5 && timeDifference >= 0;

    return (
      <button
        className="take-test"
        onClick={() => {
          window.open(join_url, "__blank");
        }}
        disabled={!isButtonEnabled}
        style={{ opacity: isButtonEnabled ? 1 : 0.5 }}
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
    { headerName: "End Date", field: "end_date" },
    { headerName: "Batch Name", field: "select_batch.batch_name" },
  ];

  const rowData = classes.map((item) => ({
    ...item,
    start_date: moment(item.start_time).format("lll"),
    end_date: moment(item.end_time).format("lll"),
  }));
  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : classes.length > 0 ? (
    <Table rowData={rowData} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">{message}</h5>
  );
};

export default List;
