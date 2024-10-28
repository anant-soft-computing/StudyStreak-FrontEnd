import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";

const NextLesson = () => {
  const category = localStorage.getItem("category");
  const [lessonData, setLessonData] = useState(null);

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
          const nextLesson =
            response.data?.course?.category === category ? response.data : null;
          setLessonData(nextLesson);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [category]);

  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Next Lesson Due</h6>
      </div>
      <hr />
      {lessonData ? (
        <div>
          <div>{lessonData?.lesson?.Lesson_Title}</div>
          <div>{lessonData?.course?.Course_Title}</div>
          <Link
            to={`/courseLessons/${lessonData?.course?.id}`}
            className="text-decoration-none text-end"
          >
            <div>View Lesson {">>"}</div>
          </Link>
        </div>
      ) : (
        <div className="text-center text-danger">No Lesson Available !!</div>
      )}
    </div>
  );
};

export default NextLesson;
