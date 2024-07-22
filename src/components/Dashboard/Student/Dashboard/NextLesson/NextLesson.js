import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";

const NextLesson = () => {
  const [lessonData, setLessonData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/getyoutubedataview/`,
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
          setLessonData(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Next Lesson Due</h6>
      </div>
      <hr />
      {lessonData ? (
        <>
          <div>{lessonData?.lesson?.Lesson_Title}</div>
          <div className="d-flex justify-content-between align-items-center">
            <div>{lessonData?.course?.Course_Title}</div>
            <Link
              to={`/courseLessons/${lessonData?.course?.id}`}
              className="text-decoration-none"
            >
              <div>View Lesson {">>"}</div>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center text-danger">No Lesson Available !!</div>
      )}
    </div>
  );
};

export default NextLesson;