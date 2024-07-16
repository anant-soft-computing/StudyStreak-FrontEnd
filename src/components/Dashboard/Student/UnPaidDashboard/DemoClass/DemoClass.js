import React from "react";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const DemoClass = ({ demoClass }) => {
  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Free Demo Class</h6>
      </div>
      <hr />
      <div>{demoClass?.meeting_title}</div>
      <div className="d-flex justify-content-between align-items-center">
        <div>{moment(demoClass?.start_time).format("lll")}</div>
        <Link to={demoClass?.join_url} className="text-decoration-none">
          <div>Join now {">>"}</div>
        </Link>
      </div>
    </div>
  );
};

export default DemoClass;
