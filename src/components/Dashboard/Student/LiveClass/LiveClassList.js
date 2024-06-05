import React from "react";
import moment from "moment";
import Table from "../../../UI/Table";
import { toast } from "react-toastify";
import ajaxCall from "../../../../helpers/ajaxCall";

const LiveClassList = ({ liveClasses, joinNow, isWithin5Minutes }) => {
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
    { headerName: "Start Date", field: "start_date" },
    { headerName: "Start Time", field: "start_time" },
    { headerName: "End Date", field: "end_date" },
    { headerName: "End Time", field: "end_time" },
    { headerName: "Meeting Title", field: "meeting_title" },
    { headerName: "Batch Name", field: "select_batch.batch_name" },
    { headerName: "Description", field: "meeting_description" },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: handleBook,
    },
  ];

  const rowData = liveClasses?.map((classItem) => ({
    ...classItem,
    start_date: moment(classItem.start_time).format("DD MMM, YYYY"),
    start_time: moment(classItem.start_time).format("hh:mm A"),
    end_time: moment(classItem.end_time).format("hh:mm A"),
    end_date: moment(classItem.end_time).format("DD MMM, YYYY"),
  }));

  return (
    <>
      {liveClasses?.length > 0 ? (
        <Table rowData={rowData} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">
          No LiveClasses Available Today !! , Please Schedule Your Classes.
        </h5>
      )}
    </>
  );
};

export default LiveClassList;
