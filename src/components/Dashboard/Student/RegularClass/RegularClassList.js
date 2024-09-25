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

  // Button is enable before 5 minutes from the start_time and disabled after 5 minutes by default
  const handleJoinNow = (params) => {
    const { join_url, start_time, id } = params.data;

    const now = currentTime.format("HH:mm:ss");
    const classStartTime = moment(start_time).format("HH:mm:ss");

    const isButtonEnabled = moment(now, "HH:mm:ss").isBetween(
      moment(classStartTime, "HH:mm:ss").subtract(5, "minutes"),
      moment(classStartTime, "HH:mm:ss").add(5, "minutes")
    );

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
      width: 190,
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
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : regularClass.length > 0 ? (
        <Table rowData={regularClass} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">
          No Regular Classes Available !! , Please Schedule Your Classes.
        </h5>
      )}
    </>
  );
};

export default RegularClassList;
