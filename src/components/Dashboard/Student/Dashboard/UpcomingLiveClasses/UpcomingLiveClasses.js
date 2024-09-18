import moment from "moment";
import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../../helpers/ajaxCall";
import { Link } from "react-router-dom";

const UpcomingLiveClasses = () => {
  const [upcomingClass, setUpcomingClass] = useState({});
  const now = moment();

  const hasUpcomingClass =
    upcomingClass?.end_time && moment(upcomingClass.end_time).isAfter(now);

  useEffect(() => {
    const fetchUpcomingClassData = async () => {
      try {
        const response = await ajaxCall(
          `/student/upcoming-class/others/`,
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
          setUpcomingClass(response?.data);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchUpcomingClassData();
  }, []);

  const displayDate = () => {
    if (
      moment(upcomingClass?.start_time).isSameOrBefore(now) &&
      moment(upcomingClass?.end_time).isAfter(now)
    ) {
      // Combine Today's Date With The Meeting's Start Time
      return moment(now)
        .set({
          hour: moment(upcomingClass.start_time).hour(),
          minute: moment(upcomingClass.start_time).minute(),
          second: 0,
        })
        .format("llll");
    }
    return moment(upcomingClass?.start_time).format("llll");
  };

  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Upcoming Live Class</h6>
      </div>
      <hr />
      {hasUpcomingClass ? (
        <>
          <div>{upcomingClass?.meeting_title}</div>
          <div className="d-flex justify-content-between align-items-center">
            <div>{displayDate()}</div>
            <Link
              to={upcomingClass?.join_url}
              target="_blank"
              className="text-decoration-none"
            >
              <div>Join now {">>"}</div>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center text-danger">
          No Upcoming Live Class !!
        </div>
      )}
    </div>
  );
};

export default UpcomingLiveClasses;
