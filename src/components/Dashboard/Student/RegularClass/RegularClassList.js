import React, { useState, useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const RegularClassList = ({ isLoading, regularClass }) => {
  
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const joinNow = (url) => {
    window.open(url, "__blank");
  };

  const handleJoinNow = (params) => {
    const { join_url, start_time, id } = params.data;
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
          joinNow(join_url);
          gamificationSubmit(id);
        }}
        disabled={!isButtonEnabled}
        style={{ opacity: isButtonEnabled ? 1 : 0.5 }}
      >
        Join Now
      </button>
    );
  };

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
    { headerName: "Start Date", field: "start_date" },
    { headerName: "End Date", field: "end_date" },
    { headerName: "Batch Name", field: "select_batch.batch_name" },
  ];

  const rowData = regularClass.map((item) => ({
    ...item,
    start_date: moment(item.start_time).format("lll"),
    end_date: moment(item.end_time).format("lll"),
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