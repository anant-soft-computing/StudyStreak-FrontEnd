import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useSelector } from "react-redux";
import Loading from "../../../UI/Loading";

const MyCourse = () => {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authData = useSelector((state) => state.authStore);
  const courseIds = JSON.parse(localStorage.getItem("courses"));

  const courses = courseList.filter((item) =>
    courseIds?.some((data) => data?.id === item?.id)
  );

  useEffect(() => {
    setIsLoading(true);
    (async () => {
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
          setIsLoading(false);
          setCourseList(response?.data);
        } else {
          setIsLoading(false);
          console.log("error");
        }
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      }
    })();
  }, [authData?.accessToken]);

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
                    <div className="dashboard__section__title">
                      <h4>Courses</h4>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading text="Loading..." color="primary" />
                      ) : courses?.length > 0 ? (
                        courses?.map((course) => (
                          <div
                            key={course?.id}
                            className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                          >
                            <div className="gridarea__wraper gridarea__wraper__2 global-neomorphism-card-styling">
                              <div className="gridarea__img mt-2">
                                <img
                                  src={course?.Course_Thumbnail}
                                  alt={course?.Course_Title}
                                  className="course__image"
                                />
                              </div>
                              <div className="gridarea__content d-flex flex-column justify-content-between">
                                <div
                                  className="course__pointer"
                                  onClick={() =>
                                    navigate(`/course/${course?.id}`)
                                  }
                                >
                                  <div className="gridarea__heading">
                                    <h3>{course?.Course_Title}</h3>
                                  </div>
                                  <div className="gridarea__list">
                                    <ul className="ps-0">
                                      <li>
                                        <i className="icofont-book-alt"></i>{" "}
                                        {course?.lessons?.length} Lessons
                                      </li>
                                      <li>
                                        <i className="icofont-clock-time"></i>{" "}
                                        {course?.lessons.reduce(
                                          (totalDuration, lesson) =>
                                            totalDuration +
                                            parseInt(lesson?.Lesson_Duration),
                                          0
                                        )}{" "}
                                        Minutes
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                  <button
                                    onClick={() =>
                                      navigate(`/courseLessons/${course?.id}`)
                                    }
                                    className="default__button mb-2"
                                  >
                                    Start Lessons
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <BuyCourse message="No Courses Available , Please Buy a Course !!" />
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
