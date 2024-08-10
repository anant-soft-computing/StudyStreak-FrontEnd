import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const ClassList = ({ count, classes, isLoading, message, classType }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [bookedCount, setBookedCount] = useState(0);
  const [bookingSlotId, setBookingSlotId] = useState(null);
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  const fetchBookedCount = useCallback(async () => {
    try {
      const response = await ajaxCall(
        `/student/${studentId}/live-classes/?live_class_type=${classType}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        setBookedCount(response?.data?.live_class_id?.length);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error:", error);
    }
  }, [classType, studentId]);

  useEffect(() => {
    fetchBookedCount();
  }, [classType, fetchBookedCount, studentId]);

  const handleEnrollNow = async (Id) => {
    const data = JSON.stringify({
      live_class_id: Id,
      student_id: studentId,
    });
    try {
      const response = await ajaxCall(
        `/enroll-students-in-live-class/`,
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
        toast.success("Slot Booked Successfully");
        // Update the booked count by fetching the latest count
        fetchBookedCount();
      } else if (response.status === 400) {
        toast.error(response?.data?.Message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsBooking(false);
      setBookingSlotId(null);
    }
  };

  const bookCount = async (Id) => {
    if (bookedCount >= count) {
      toast.error(
        `You Do Not Have ${classType} Class Available, Please Upgrade Package !!`
      );
      return;
    }

    setIsBooking(true);
    setBookingSlotId(Id);
    try {
      const response = await ajaxCall(
        `/add-bookslot/${Id}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
        },
        8000
      );
      if (response.status === 200) {
        handleEnrollNow(Id);
      } else if (response.status === 400) {
        toast.error(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsBooking(false);
      setBookingSlotId(null);
    }
  };

  const handleBook = (params) => {
    // Class Start Date is Greater than Current Date than it's worked
    const { id, isPastDate } = params.data;
    return (
      <button
        className="take-test"
        onClick={() => bookCount(id)}
        disabled={isPastDate || (isBooking && bookingSlotId === id)}
        style={{ opacity: isPastDate ? 0.5 : 1 }}
      >
        {isBooking && bookingSlotId === id ? "Booking..." : "Book Slot"}
      </button>
    );
  };

  const columns = [
    {
      headerName: "Book Slot",
      cellRenderer: handleBook,
      width: 190,
    },
    { headerName: "Meeting Title", field: "title" },
    { headerName: "Description", field: "description" },
    { headerName: "Start Date", field: "startDate" },
    { headerName: "End Date", field: "endDate" },
    { headerName: "Batch Name", field: "batchName" },
  ];

  const rowData = classes.map(
    ({
      id,
      start_time,
      end_time,
      meeting_title,
      meeting_description,
      select_batch,
    }) => {
      const start_Date = new Date(start_time);
      const startDate = moment(start_time).format("lll");
      const endDate = moment(end_time).format("lll");
      const title = meeting_title;
      const batchName = select_batch?.map((batch) => batch.batch_name).join(",");
      const description = meeting_description;
      const startingTime = moment(start_time).format("hh:mm A");
      const isPastDate = start_Date < new Date();

      return {
        id,
        startDate,
        endDate,
        title,
        batchName,
        description,
        startingTime,
        isPastDate,
      };
    }
  );

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : classes.length > 0 ? (
    <Table rowData={rowData} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">{message}</h5>
  );
};

export default ClassList;
