import React from "react";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import { toast } from "react-toastify";
import ajaxCall from "../../../../helpers/ajaxCall";

const UpcomingClass = ({
  isLoading,
  joinNow,
  isWithin5Minutes,
  classes,
  message,
}) => {
  const handleJoinNow = (params) => {
    const { zoom_meeting_id, start_time, id } = params.data;
    return (
      <button
        className="take-test"
        onClick={() => {
          joinNow(zoom_meeting_id);
          gamificationSubmit(id);
        }}
        disabled={!isWithin5Minutes(start_time)}
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

  const rowData = classes.map(
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

export default UpcomingClass;
