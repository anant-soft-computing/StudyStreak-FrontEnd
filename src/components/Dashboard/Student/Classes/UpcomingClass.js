import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const UpcomingClass = ({ isLoading, classes, message }) => {
  const [currentTime, setCurrentTime] = useState(moment());
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Button is enable before 7 minutes from the start_time and disabled after 5 minutes by default
  const handleJoinNow = (params) => {
    const { id, start_time, join_url, liveclasstype } = params.data;

    const classType = liveclasstype?.name;

    const now = currentTime.format("HH:mm:ss");
    const classStartTime = moment(start_time).format("HH:mm:ss");

    const isButtonEnabled = moment(now, "HH:mm:ss").isBetween(
      moment(classStartTime, "HH:mm:ss").subtract(7, "minutes"),
      moment(classStartTime, "HH:mm:ss").add(7, "minutes")
    );

    const shouldDisableButton =
      classType !== "Webinar" && classType !== "Counselling"
        ? !isButtonEnabled
        : false;

    const buttonStyle =
      classType !== "Webinar" && classType !== "Counselling"
        ? { opacity: isButtonEnabled ? 1 : 0.5 }
        : undefined;

    return (
      <button
        className="take-test"
        onClick={() => {
          window.open(join_url, "__blank");
          gamificationSubmit(id);
          studentJoinNow(id);
        }}
        disabled={shouldDisableButton}
        style={buttonStyle}
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

  const studentJoinNow = async (classID) => {
    const data = JSON.stringify({
      live_class_id: classID,
      student_id: studentId,
    });
    try {
      const response = await ajaxCall(
        "/students-join-live-class/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: data,
        },
        8000
      );
      if (response.status === 200) {
        toast.success("Join Successfully");
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
      field: "start_time",
      cellRenderer: (params) => moment(params.value).format("lll"),
    },
    {
      headerName: "End Date",
      field: "end_time",
      cellRenderer: (params) => moment(params.value).format("lll"),
    },
    {
      headerName: "Batch Name",
      field: "select_batch",
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
      field: "select_course",
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
    <Loading />
  ) : classes.length > 0 ? (
    <Table rowData={classes} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">{message}</h5>
  );
};

export default UpcomingClass;
