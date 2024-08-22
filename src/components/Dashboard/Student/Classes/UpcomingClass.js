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
    const { join_url, start_time, end_time, id } = params.data;
    const now = currentTime;
    const classStartTime = moment(start_time);
    const classEndTime = moment(end_time);

    const isButtonEnabled = now.isBetween(
      classStartTime.subtract(5, "minutes"),
      classEndTime.add(5, "minutes")
    );

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
    {
      headerName: "Start Date",
      field: "start_date",
      cellRenderer: (params) => moment(params.data.start_time).format("lll"),
    },
    {
      headerName: "End Date",
      field: "end_date",
      cellRenderer: (params) => moment(params.data.end_time).format("lll"),
    },
    {
      headerName: "Batch Name",
      field: "batch_name",
      cellRenderer: (params) => (
        <div>
          {params.data.select_batch
            ?.map((item) => item.batch_name)
            .join(", ") || "-"}
        </div>
      ),
    },
    {
      headerName: "Course Name",
      field: "course_name",
      cellRenderer: (params) => (
        <div>
          {params.data.select_course
            ?.map((item) => item.Course_Title)
            .join(", ") || "-"}
        </div>
      ),
    },
    {
      headerName: "Status",
      field: "status",
      cellRenderer: handleBook,
    },
  ];

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : classes.length > 0 ? (
    <Table rowData={classes} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">{message}</h5>
  );
};

export default UpcomingClass;
