import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const UpcomingLiveClass = ({ upcommingClass }) => {
  const getUpcomingMeeting = (meetings) => {
    const now = moment();
    const sortedMeetings = meetings?.sort(
      (a, b) => moment(a.start_time) - moment(b.start_time)
    );
    const upcomingMeeting =
      sortedMeetings?.find(
        (meeting) =>
          moment(meeting.start_time).isSameOrBefore(now) &&
          moment(meeting.end_time).isAfter(now)
      ) ||
      sortedMeetings?.find((meeting) =>
        moment(meeting.start_time).isAfter(now)
      ) ||
      null;
    return upcomingMeeting;
  };

  const upcomingMeeting = getUpcomingMeeting(upcommingClass);

  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Upcoming Live Class</h6>
      </div>
      <hr />
      {upcomingMeeting ? (
        <>
          <div>{upcomingMeeting?.meeting_title}</div>
          <div className="d-flex justify-content-between align-items-center">
            <div>{moment(upcomingMeeting?.start_time).format("llll")}</div>
            <Link
              to={upcomingMeeting?.join_url}
              target="_blank"
              className="text-decoration-none"
            >
              <div>Join now {">>"}</div>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center text-danger">No Upcoming Live Class !!</div>
      )}
    </div>
  );
};

export default UpcomingLiveClass;