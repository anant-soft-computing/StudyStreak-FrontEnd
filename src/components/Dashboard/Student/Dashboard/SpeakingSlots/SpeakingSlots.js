import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const SpeakingSlots = ({ upcomingSS }) => {
  const getUSS = (meetings) => {
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
        moment(meeting?.start_time).isAfter(now)
      ) ||
      null;
    return upcomingMeeting;
  };

  const upcomingSSClass = getUSS(upcomingSS);

  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Speaking Slots</h6>
      </div>
      <hr />
      {upcomingSSClass ? (
        <>
          <div>{upcomingSSClass?.meeting_title}</div>
          <div className="d-flex justify-content-between align-items-center">
            <div>{moment(upcomingSSClass?.start_time).format("llll")}</div>
            <Link
              to={"/studentLiveClasses"}
              state={{ activeTab: "Speaking Practice" }}
              className="text-decoration-none"
            >
              <div>View all slots {">>"}</div>
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