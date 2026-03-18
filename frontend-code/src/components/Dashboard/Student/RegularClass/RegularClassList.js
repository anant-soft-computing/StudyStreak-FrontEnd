import React from "react";
import moment from "moment";
import { toast } from "react-toastify";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const RegularClassList = ({ isLoading, regularClass }) => {
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  const joinNow = (url) => {
    window.open(url, "__blank");
  };

  const handleJoinNow = (params) => {
    const { join_url, id } = params.data;
    return (
      <button
        className="take-test"
        onClick={() => {
          joinNow(join_url);
          gamificationSubmit(id);
          studentJoinNow(id);
        }}
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
