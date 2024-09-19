import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";

const SpeakingSlots = () => {
  const [upcomingSSClass, setUpcomingSSClass] = useState({});
  const now = moment();

  const hasUpcomingSSClass =
    upcomingSSClass?.end_time && moment(upcomingSSClass.end_time).isAfter(now);

  useEffect(() => {
    const fetchUpcomingSSData = async () => {
      try {
        const response = await ajaxCall(
          `/student/upcoming-class/?class_type=speaking-practice`,
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
          setUpcomingSSClass(response?.data);
        }
      } catch (error) {
        console.log("error:", error);
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