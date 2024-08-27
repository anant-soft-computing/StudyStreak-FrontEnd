import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../components/UI/Loading";

const CourseListItem = ({ search, selectedCategory, selectedLevel }) => {
  const [courseList, setCouresList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const courseIds = JSON.parse(localStorage.getItem("courses"));
  const authData = useSelector((state) => state.authStore);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/courselistview/?search=${search}&Category__name=${selectedCategory}&Level__name=${selectedLevel}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          },
          8000
        );

        if (response.status === 200) {
          setIsLoading(false);
          setCouresList(
            response.data?.filter(({ course_type }) => course_type === "PUBLIC")
          );
        } else {
          setIsLoading(false);
          toast.error("Some Problem Occurred. Please try again.");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Some Problem Occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [search, selectedCategory, selectedLevel]);

  const handleClick = (courseId) => {
    if (!authData.loggedIn) {
      toast.error("Please Do Login To View Course Details.");
    } else {
      navigate(`/courseDetail/${courseId}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading text="Loading..." color="primary" />
      ) : (
        <div className="row">
          {courseList.length > 0 ? (
            courseList.map((course) => (
              <div
                className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                key={course.id}
              >
                <div className="gridarea__wraper gridarea__wraper__2 tagMain">
                  {courseIds?.some((item) => item?.id === course.id) && (
                    <span className="tag tag__color">Enrolled</span>
                  )}
                  <div className="gridarea__img">
                    <img
                      src={course?.Course_Thumbnail}
                      alt={course?.Course_Title}
                      className="course__image"
                      onClick={() => handleClick(course?.id)}
                    />
                  </div>
                  <div className="gridarea__content">
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
                              totalDuration + parseInt(lesson?.Lesson_Duration),
                            0
                          )}{" "}
                          Minutes
                        </li>
                      </ul>
                    </div>
                    <div className="gridarea__heading">
                      <h3 onClick={() => handleClick(course?.id)}>
                        <Link>{course?.Course_Title}</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h5 className="text-center text-danger">No Courses Available !!</h5>
          )}
        </div>
      )}
    </>
  );
};
export default CourseListItem;
