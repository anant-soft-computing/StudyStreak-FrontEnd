import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";

const SpeakingSlots = () => {
  const [upcomingSSClass, setUpcomingSSClass] = useState({});
  const courseId = JSON.parse(localStorage.getItem("course"))?.id;
  const now = moment();

  const hasUpcomingSSClass =
    upcomingSSClass?.end_time && moment(upcomingSSClass.end_time).isAfter(now);

  useEffect(() => {
    const fetchUpcomingSSData = async () => {
      try {
        const response = await ajaxCall(
          "/liveclass/studentonly/?liveClassType=Speaking-Practice",
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
        if (response?.status === 200) {
          console.log("Speaking Classes Data:", response?.data);
          // Find the next upcoming class (where start_time is in the future - hasn't started yet)
          const upcomingClasses = response?.data
            ?.filter((cls) => moment(cls.start_time).isAfter(now))
            .sort((a, b) => moment(a.start_time).diff(moment(b.start_time)));
          
          console.log("Upcoming Speaking Classes:", upcomingClasses);
          
          if (upcomingClasses && upcomingClasses.length > 0) {
            const nextClass = upcomingClasses[0];
            console.log("Next Upcoming Speaking Class:", nextClass);
            setUpcomingSSClass(nextClass);
          }
        } else {
          console.log("Speaking Classes - Non-200 response:", response);
        }
      } catch (error) {
        console.error("Error fetching speaking classes:", error);
      }
    };
    fetchUpcomingSSData();
  }, []);

  const displayDate = () => {
    if (
      moment(upcomingSSClass?.start_time).isSameOrBefore(now) &&
      moment(upcomingSSClass?.end_time).isAfter(now)
    ) {
      // Combine Today's Date With The Meeting's Start Time
      return moment(now)
        .set({
          hour: moment(upcomingSSClass.start_time).hour(),
          minute: moment(upcomingSSClass.start_time).minute(),
          second: 0,
        })
        .format("llll");
    }
    return moment(upcomingSSClass?.start_time).format("llll");
  };

  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Upcoming Speaking Class</h6>
      </div>
      <hr />
      {hasUpcomingSSClass ? (
        <>
          <div>{upcomingSSClass?.meeting_title}</div>
          <div className="d-flex justify-content-between align-items-center">
            <div>{displayDate()}</div>
            <Link
              to={upcomingSSClass?.join_url}
              target="_blank"
              className="text-decoration-none"
            >
              <div>Join now {">>"}</div>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center text-danger">No Speaking Slots !!</div>
      )}
    </div>
  );
};

export default SpeakingSlots;