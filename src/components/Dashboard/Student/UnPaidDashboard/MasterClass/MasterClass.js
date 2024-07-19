import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const MasterClass = ({ masterClass }) => {
  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Join an IELTS Masterclass</h6>
      </div>
      <hr />
      <div>{masterClass?.meeting_title}</div>
      <div className="d-flex justify-content-between align-items-center">
        <div>{moment(masterClass?.start_time).format("lll")}</div>
        <Link
          to={masterClass?.join_url}
          target="_blank"
          className="text-decoration-none"
        >
          <div>Join now {">>"}</div>
        </Link>
      </div>
    </div>
  );
};

export default MasterClass;
