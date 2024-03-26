import React from "react";
import moment from "moment";

const DetailCard = ({ courseDetail }) => {
  const startDate = courseDetail?.EnrollmentStartDate
    ? moment(courseDetail?.EnrollmentStartDate).format("DD-MMM-YYYY")
    : "";

  const endDate = courseDetail?.EnrollmentEndDate
    ? moment(courseDetail?.EnrollmentEndDate).format("DD-MMM-YYYY")
    : "";

  return (
    <div className="course__details__wraper col-xl-6 col-lg-6">
      <ul>
        <li>
          Instructor :<span>{courseDetail?.primary_instructor?.username}</span>
        </li>
        <li>
          Category :<span>{courseDetail?.Category?.name}</span>
        </li>
        <li>
          Start Date :<span className="sb_content">{startDate}</span>
        </li>
        <li>
          End Date :<span className="sb_content">{endDate}</span>
        </li>
      </ul>
      <ul>
        <li>
          Course level :<span>{courseDetail?.Level?.name}</span>
        </li>
        <li>
          Language :<span>{courseDetail?.Language?.name}</span>
        </li>

        <li>
          Max Enroll :<span>{courseDetail?.max_enrollments || 0}</span>
        </li>
        <li>
          Total Duration :
          <span className="sb_content">
            {courseDetail?.lessons.reduce(
              (totalDuration, lesson) =>
                totalDuration + parseInt(lesson?.Lesson_Duration),
              0
            )}{" "}
            Min
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DetailCard;