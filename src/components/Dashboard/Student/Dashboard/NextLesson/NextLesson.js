import React from "react";
import { Link } from "react-router-dom";

const NextLesson = () => {
  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Next Lesson Due</h6>
      </div>
      <hr />
      <div>Writing Task 2 - Essay Writing</div>
      <div className="d-flex justify-content-between align-items-center">
        <div>Lesson No. 7</div>
        <Link to="" className="text-decoration-none">
          <div>View Lesson {">>"}</div>
        </Link>
      </div>
    </div>
  );
};

export default NextLesson;