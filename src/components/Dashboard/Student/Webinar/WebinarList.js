import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";

const WebinarList = ({ isLoading, webinar }) => {
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
    { headerName: "Start Time", field: "start_time" },
    { headerName: "End Date", field: "end_date" },
    { headerName: "End Time", field: "end_time" },
    { headerName: "Batch Name", field: "select_batch.batch_name" },
  ];

  const rowData = webinar.map((classItem) => ({
    ...classItem,
    start_date: moment(classItem.start_time).format("DD MMM, YYYY"),
    start_time: moment(classItem.start_time).format("hh:mm A"),
    end_time: moment(classItem.end_time).format("hh:mm A"),
    end_date: moment(classItem.end_time).format("DD MMM, YYYY"),
  }));

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : webinar.length > 0 ? (
    <Table rowData={rowData} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">
      No Webinar Available Today !! , Please Schedule Your Classes.
    </h5>
  );
};

export default WebinarList;
