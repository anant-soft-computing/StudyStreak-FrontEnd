import React from "react";
import moment from "moment";

const DetailCard = ({ courseDetail, batches }) => {
  const startDate = courseDetail?.EnrollmentStartDate
    ? moment(courseDetail?.EnrollmentStartDate).format("DD-MMM-YYYY")
    : "";

  const endDate = courseDetail?.EnrollmentEndDate
    ? moment(courseDetail?.EnrollmentEndDate).format("DD-MMM-YYYY")
    : "";

  return (
    <div className="course__details__wraper col-xl-7 col-lg-6">
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
        {batches?.map(({ batch_name }) => {
          return (
            <li>
              Batch : <span>{batch_name}</span>
            </li>
          );
        })}
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
        {batches.map(({ batch_start_timing }) => {
          return (
            <li>
              Batch Start Time :{" "}
              <span>
                {moment(batch_start_timing, "HH:mm:ss").format("hh:mm A")}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DetailCard;