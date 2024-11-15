import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";

const MyCourse = () => {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  const [expiryDate, setExpiryDate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const category = localStorage.getItem("category");
  const courseIds = JSON.parse(localStorage.getItem("courses"));

  const courses = courseList.filter((course) =>
    courseIds.some(
      (data) => data === course?.id && course?.Category?.name === category
    )
  );

  const coursesWithExpiry = courses.map((course) => {
    const expiry = expiryDate.find((exp) => exp.course.id === course.id);
    return {
      ...course,
      expiryDate: expiry ? expiry.expiry_date : null,
    };
  });

  const fetchCourses = useCallback(async () => {
    try {
      const response = await ajaxCall(
        `/courselistview/`,
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

      if (response.status === 200) {
        setCourseList(response.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchExpiryDates = useCallback(async () => {
    try {
      const response = await ajaxCall(
        `/student/enrollment/`,
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

      if (response.status === 200) {
        setExpiryDate(response.data);
      }
    } catch (error) {
      console.error("error", error);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    fetchExpiryDates();
  }, [fetchExpiryDates]);

  const getDaysRemaining = (endDate) => {
    const end = moment(endDate);
    const today = moment();
    return end.diff(today, "days");
  };

  const calculateTotalDuration = (lessons) => {
    const totalMinutes = lessons.reduce((totalDuration, lesson) => {
      const [minutes] = lesson?.Lesson_Duration.split(" ");
      const [minPart, secPart] = minutes.split(".").map(Number);
      const totalSeconds = minPart * 60 + (secPart || 0);
      return totalDuration + totalSeconds;
    }, 0);

    const hours = Math.floor(totalMinutes / 3600);
    const minutes = Math.floor((totalMinutes % 3600) / 60);

    return `${
      hours > 0 ? `${hours} Hr${hours > 1 ? "s" : ""} ` : ""
    }${minutes} Minute${minutes !== 1 ? "s" : ""}`;
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title flex-wrap gap-2">
                      <h4>Courses</h4>
                      <h5 className="text-danger">
                        {coursesWithExpiry?.length > 0 &&
                          coursesWithExpiry.map((course) => {
                            const daysRemaining = getDaysRemaining(
                              course.expiryDate
                            );
                            return (
                              <span key={course?.id}>
                                {course.Course_Title} : {daysRemaining} days
                                Left |{" "}
                              </span>
                            );
                          })}
                      </h5>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading />
                      ) : courses?.length > 0 ? (
                        courses?.map((course) => (
                          <div
                            className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12"
                            key={course?.id}
                          >
                            <div className="gridarea__wraper gridarea__wraper__2 global-neomorphism-card-styling">
                              <div className="gridarea__img">
                                <img
                                  src={course?.Course_Thumbnail}
                                  alt={course?.Course_Title}
                                  className="course__image"
                                />
                              </div>
                              <div className="gridarea__content d-flex flex-column justify-content-between">
                                <div className="gridarea__heading">
                                  <h3>{course?.Course_Title}</h3>
                                </div>
                                {course?.lessons?.length > 0 && (
                                  <div className="gridarea__list">
                                    <ul className="ps-0">
                                      <li>
                                        <i className="icofont-book-alt"></i>{" "}
                                        {course?.lessons?.length} Lessons
                                      </li>
                                      <li>
                                        <i className="icofont-clock-time"></i>{" "}
                                        {calculateTotalDuration(
                                          course?.lessons
                                        )}
                                      </li>
                                    </ul>
                                  </div>
                                )}
                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                  <button
                                    onClick={() =>
                                      navigate(`/courseLessons/${course?.id}`)
                                    }
                                    className="default__button"
                                  >
                                    Start Lessons
                                  </button>
                                  <button
                                    onClick={() =>
                                      navigate(`/courseMaterials/${course?.id}`)
                                    }
                                    className="default__button"
                                  >
                                    View Materials
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <BuyCourse message="No Courses Available, Please Buy a Course !!" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
