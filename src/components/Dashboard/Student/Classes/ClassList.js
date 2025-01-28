import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const DISCOVERY_URL = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const ClassList = ({ count, classes, isLoading, message, classType }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [bookedCount, setBookedCount] = useState(0);
  const [bookingSlotId, setBookingSlotId] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  let tokenClient;

  const studentId = JSON.parse(localStorage.getItem("StudentID"));


  // Google Scripts Loading Effect
  useEffect(() => {
    const loadGoogleScripts = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("Google Identity Services script loaded.");
        setGoogleLoaded(true);
      };
      document.body.appendChild(script);

      const aScript = document.createElement("script");
      aScript.src = "https://apis.google.com/js/api.js";
      aScript.async = true;
      aScript.defer = true;
      aScript.onload = () => {
        window.gapi.load("client", () => {
          window.gapi.client
            .init({
              apiKey: process.env.REACT_APP_GOOGLE_CALENDER_API_KEY,
              discoveryDocs: DISCOVERY_URL,
            })
            .then(() => {
              console.log("Google API client initialized.");
            });
        });
      };
      document.body.appendChild(aScript);
    };

    loadGoogleScripts();
  }, []);

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

  const handleEnrollNow = async (id, data) => {
    const enrollData = JSON.stringify({
      live_class_id: id,
      student_id: studentId,
    });
    try {
      const response = await ajaxCall(
        "/enroll-students-in-live-class/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: enrollData,
        },
        8000
      );
      if (response.status === 200) {
        toast.success("Slot Booked Successfully");
        // Update the booked count by fetching the latest count
        fetchBookedCount();

        // Add to Google Calendar if loaded and available
        if (!googleLoaded) {
          alert("Google Identity Services not loaded yet. Please wait.");
          return;
        }

        // Initialize the token client if it doesn't already exist
        if (!tokenClient) {
          tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: process.env.REACT_APP_GOOGLE_CALENDER_CLIENT_ID,
            scope: SCOPES,
            callback: (response) => {
              if (response.error) {
                console.error("Error during token request:", response.error);
                return;
              }
              console.log("Access token acquired:", response.access_token);
              createGoogleCalendarEvent(data);
            },
          });
        }

        // Request access token
        tokenClient.requestAccessToken();
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

  const createGoogleCalendarEvent = async (data) => {
    const event = {
      summary: data.meeting_title,
      description: `${data.meeting_description}\n\n[Join the Zoom Class](${data.join_url})`,
      start: {
        dateTime: moment(data.start_time).toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: moment(data.end_time).toISOString(),
        timeZone: "UTC",
      },
      reminders: {
        useDefault: false,
        overrides: [{ method: "popup", minutes: 10 }],
      },
    };

    try {
      await window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
      toast.success("Event added to Google Calendar");
    } catch (error) {
      toast.error("Failed to add event to Google Calendar");
    }
  };

  const bookCount = async (params) => {
    const { id, ...data } = params.data;

    if (count !== -1 && bookedCount >= count) {
      toast.error(
        `You Do Not Have ${classType} Class Available, Please Upgrade Package !!`
      );
      return;
    }

    setIsBooking(true);
    setBookingSlotId(id);
    try {
      const response = await ajaxCall(
        `/add-bookslot/${id}/`,
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
        handleEnrollNow(id, data);
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
    const { id, start_time } = params.data;
    const startDate = moment(start_time).startOf("day"); // Start Of start_time Day
    const currentDate = moment().startOf("day"); // Current Date Without Time
    const currentDateTime = moment(); // Current Date and Time
    const startDateTime = moment(start_time); // Exact start time

    let isTimeValid = true;

    // Check if current time is past start_time on the same day
    if (currentDate.isSame(startDate, "day")) {
      isTimeValid = currentDateTime.isSameOrBefore(startDateTime);
    } else {
      // For future dates, button should be enabled
      isTimeValid = currentDate.isBefore(startDate);
    }

    const isButtonEnabled = isTimeValid;

    return (
      <button
        className="take-test"
        onClick={() => bookCount(params)}
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