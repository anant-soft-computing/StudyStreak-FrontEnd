import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
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
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsBooking(false);
      setBookingSlotId(null);
    }
  };

  const bookCount = async (Id) => {
    if (count !== -1 && bookedCount >= count) {
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
    const { id, start_time, end_time } = params.data;
    const startDate = moment(start_time).startOf("day"); // Start Of start_time Day
    const endDate = moment(end_time).endOf("day"); // End Of end_time Day
    const currentDate = moment().startOf("day"); // Current Date Without Time
    const currentDateTime = moment(); // Current Date and Time
    const startDateTime = moment(start_time); // Exact start time

    let isWithinRange;
    let isTimeValid = true;

    // Check if current time is past start_time on the same day
    if (currentDate.isSame(startDate, "day")) {
      isTimeValid = currentDateTime.isSameOrBefore(startDateTime);
    }

    // Check If start_time and end_time Are On The Same Day
    if (startDate.isSame(endDate, "day")) {
      // Button Active On The start date
      isWithinRange = currentDate.isSame(startDate, "day");
    } else {
      // Button Active From start_date Up To end_date
      isWithinRange = currentDate.isBetween(startDate, endDate, null, "[]");
    }

    const isButtonEnabled = isWithinRange && isTimeValid;

    return (
      <button
        className="take-test"
        onClick={() => bookCount(id)}
        disabled={!isButtonEnabled || (isBooking && bookingSlotId === id)}
        style={{ opacity: !isButtonEnabled ? 0.5 : 1 }}
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
  ];

  return isLoading ? (
    <Loading />
  ) : classes.length > 0 ? (
    <Table rowData={classes} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">{message}</h5>
  );
};

export default ClassList;
