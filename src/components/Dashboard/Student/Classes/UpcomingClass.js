import React, { useState, useEffect } from "react";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import { toast } from "react-toastify";
import ajaxCall from "../../../../helpers/ajaxCall";

const UpcomingClass = ({ isLoading, classes, message }) => {
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Button is enable before 5 minutes from the start_time and disabled after 5 minutes by default
  const handleJoinNow = (params) => {
    const { join_url, start_time, id } = params.data;
    const now = currentTime;
    const classStartTime = moment(start_time);
    const timeDifference = classStartTime.diff(now, "minutes");
    const isButtonEnabled = timeDifference <= 5 && timeDifference >= 0;

    return (
      <button
        className="take-test"
        onClick={() => {
          window.open(join_url, "__blank");
          gamificationSubmit(id);
        }}
        disabled={!isButtonEnabled}
        style={{ opacity: isButtonEnabled ? 1 : 0.5 }}
      >
        Join Now
      </button>
    );
  };

  const handleBook = () => <button className="given-tag">Booked</button>;

  const gamificationSubmit = async (classID) => {
    const data = {
      model: "Live Class",
      object_id: classID,
    };
    try {
      const response = await ajaxCall(
        "/gamification/points/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify(data),
        },
        8000
      );
      if (response.status === 201) {
        toast.success("Points Updated Successfully");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const columns = [
    {
      headerName: "Join Now",
      cellRenderer: handleJoinNow,
    },
    { headerName: "Meeting Title", field: "meeting_title" },
    { headerName: "Description", field: "meeting_description" },
    { headerName: "Start Time", field: "start_time" },
    { headerName: "Date", field: "date" },
    { headerName: "Time", field: "time" },
    { headerName: "Batch Name", field: "batch_name" },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: handleBook,
    },
  ];

  const rowData = classes.map(
    ({
      id,
      start_time,
      end_time,
      meeting_title,
      meeting_description,
      join_url,
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
      join_url,
      start_time: moment(start_time).format("hh:mm A"),
    })
  );

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : classes.length > 0 ? (
    <Table rowData={rowData} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">{message}</h5>
  );
};

export default UpcomingClass;
