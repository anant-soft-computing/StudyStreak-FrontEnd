import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";

const CourseDurationLeft = () => {
  const [upcomingClass, setUpcomingClass] = useState({});
  const now = moment();

  useEffect(() => {
    const fetchCourseDurationLeft = async () => {
      try {
        const response = await ajaxCall(
          `/student/upcoming-class/?class_type=regular`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response?.status === 200) {
          setUpcomingClass(response?.data);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchCourseDurationLeft();
  }, []);

  return (
    <div className='col-xl-12'>
      <div className='gridarea__wraper card-background'>
        <div className='gridarea__content'>
          <div className='gridarea__heading'>
            <h6>Course Duration Left</h6>
          </div>
          <h6 className='text-center text-danger'>Course Expired!!</h6>
        </div>
      </div>
    </div>
  );
};

export default CourseDurationLeft;
