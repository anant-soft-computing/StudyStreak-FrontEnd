import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const SpeakingSlots = ({ speakingSlots }) => {
  const speakingClass = speakingSlots?.filter(
    (item) => item.liveclasstype === "Speaking-Practice"
  );

  const speakingslot = speakingClass?.sort(
    (a, b) => new Date(b.start_time) - new Date(a.start_time)
  )[0];

  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Speaking Slots</h6>
      </div>
      <hr />
      {speakingslot ? (
        <>
          <div>{speakingslot.meeting_title}</div>
          <div className="d-flex justify-content-between align-items-center">
            <div>{moment(speakingslot.start_time).format("llll")}</div>
            <Link to="/studentLiveClasses" className="text-decoration-none">
              <div>View all slots {">>"}</div>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center text-danger">
          No Speaking Slots !!
        </div>
      )}
    </div>
  );
};

export default SpeakingSlots;