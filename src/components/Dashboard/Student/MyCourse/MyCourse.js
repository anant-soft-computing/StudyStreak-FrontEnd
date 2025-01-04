import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Loading from "../../../UI/Loading";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import ajaxCall from "../../../../helpers/ajaxCall";

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
    const expiry = expiryDate.find((exp) => exp.course_id === course.id);
    return {
      ...course,
      expiryDate: expiry ? expiry.expiry_date : null,
    };
  });

  const fetchCourses = useCallback(async () => {
    try {
      const response = await ajaxCall(
        "/courselistview/",
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
        "/student/course-enrollment/",
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
      console.log("error", error);
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
  const formatDuration = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    if (hours > 0) {
      return `${hours} Hrs, ${minutes} Minutes`;
    } else {
      return `${minutes} Minutes`;
    }
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
                          coursesWithExpiry.map((item, index) => {
                            const daysRemaining = getDaysRemaining(
                              item.expiryDate
                            );
                            return (
                              <span key={index}>
                                {item.Course_Title} : {daysRemaining} days Left
                              </span>
                            );
                          })}
                      </h5>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading />
                      ) : courses?.length > 0 ? (
                        courses?.map((item, index) => (
                          <div
                            className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12"
                            key={index}
                          >
                            <div className="gridarea__wraper gridarea__wraper__2 global-neomorphism-card-styling">
                              <div className="gridarea__img">
                                <img
                                  src={item?.Course_Thumbnail}
                                  alt={item?.Course_Title}
                                  className="course__image"
                                />
                              </div>
                              <div className="gridarea__content d-flex flex-column justify-content-between">
                                <div className="gridarea__heading">
                                  <h3>{item?.Course_Title}</h3>
                                </div>
                                <div className="gridarea__list">
                                  <ul className="ps-0">
                                    <li>
                                      <i className="icofont-book-alt"></i>{" "}
                                      {item?.total_lesson} Lessons
                                    </li>
                                    <li>
                                      <i className="icofont-clock-time"></i>{" "}
                                      {formatDuration(item?.total_duration)}
                                    </li>
                                  </ul>
                                </div>
                                <div className="d-flex gap-2 align-items-center justify-content-center">
                                  <button
                                    onClick={() =>
                                      navigate(`/courseLessons/${item?.id}`)
                                    }
                                    className="default__button"
                                  >
                                    Start Lessons
                                  </button>
                                  <button
                                    onClick={() =>
                                      navigate(`/courseMaterials/${item?.id}`)
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
