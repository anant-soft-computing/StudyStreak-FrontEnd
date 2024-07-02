import React from "react";
import moment from "moment";

const UpcomingLiveClass = ({ upcommingClass }) => {
  const getUpcomingMeeting = (meetings) => {
    const now = new Date();
    const sortedMeetings = meetings?.sort(
      (a, b) => new Date(a.start_time) - new Date(b.start_time)
    );
    return (
      sortedMeetings?.find((meeting) => new Date(meeting.start_time) > now) || null
    );
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
          <div>{upcomingMeeting.meeting_title}</div>
          <div>{moment(upcomingMeeting.start_time).format("llll")}</div>
        </>
      ) : (
        <div className="text-center text-danger">No Upcoming Live Class !!</div>
      )}
    </div>
  );
};

export default UpcomingLiveClass;