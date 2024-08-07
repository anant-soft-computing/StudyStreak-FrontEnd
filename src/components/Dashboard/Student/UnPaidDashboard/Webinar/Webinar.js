import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Webinar = ({ webinar }) => {
  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Free Webinar</h6>
      </div>
      <hr />
      <div>{webinar?.meeting_title}</div>
      <div className="d-flex justify-content-between align-items-center">
        <div>{moment(webinar?.start_time).format("lll")}</div>
        <Link
          to={webinar?.join_url}
          target="_blank"
          className="text-decoration-none"
        >
          <div>Join now {">>"}</div>
        </Link>
      </div>
    </div>
  );
};

export default Webinar;
