import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate, useParams } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import LessonList from "./LessonList";
import LessonContent from "./LessonContent";
import Loading from "../../../UI/Loading";

const Lesson = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeLesson, setActiveLesson] = useState({});
  const [courseLessons, setCourseLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState({});
  const [lessonStatus, setLessonStatus] = useState("Pending");
  const [completedLessons, setCompletedLessons] = useState([]);

  const getNextLesson = useCallback(
    (currentLessonId) => {
      let foundNext = false;
      for (const section of courseLessons[0]?.section || []) {
        for (let i = 0; i < section.lessons.length; i++) {
          if (foundNext) {
            return section.lessons[i];
          }
          if (section.lessons[i].id === currentLessonId) {
            foundNext = true;
            // If this is the last lesson in the section, look in the next section
            if (i === section.lessons.length - 1) {
              const nextSectionIndex =
                courseLessons[0].section.indexOf(section) + 1;
              if (nextSectionIndex < courseLessons[0].section.length) {
                return courseLessons[0].section[nextSectionIndex].lessons[0];
              }
            }
          }
        }
      }
      return null;
    },
    [courseLessons]
  );

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
          setCurrentLesson(response?.data);
        } else {
          setCurrentLesson({});
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const getCourseLessons = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await ajaxCall(
        `/courseretupddelview/${courseId}/`,
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
        const tempSessions = [];
        response?.data?.lessons.forEach((lesson) => {
          const isExist = tempSessions.findIndex(
            (item) => item.id === lesson.section?.id
          );

          if (isExist !== -1) {
            tempSessions[isExist].lessons.push(lesson);
          } else {
            tempSessions.push({
              id: lesson.section?.id,
              name: lesson.section?.name,
              lessons: [lesson],
            });
          }
        });
        const tempCourse = [{ ...response?.data, section: tempSessions }];
        setCourseLessons(tempCourse);

        // Find And Set The Active Lesson Based On CurrentLesson or Default to First Lesson
        const lessonToActivate = currentLesson.lesson?.id
          ? response?.data?.lessons.find(
              (lesson) => lesson.id === currentLesson.lesson?.id
            )
          : tempCourse[0].section[0].lessons[0]; // Default to first lesson if no current lesson

        if (lessonToActivate) {
          setActiveLesson(lessonToActivate);
          const sectionIndex = tempCourse[0].section.findIndex(
            (section) => section.id === lessonToActivate.section?.id
          );
          if (sectionIndex !== -1) {
            setActiveIndex(sectionIndex);
          }
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  }, [courseId, currentLesson]);

  useEffect(() => {
    if (!courseId || isNaN(courseId)) {
      toast.error("Please select a valid course");
      navigate("/");
      return;
    }
    getCourseLessons();
  }, [courseId, getCourseLessons, navigate]);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="tution sp_bottom_100 sp_top_50">
          <div className="container-fluid full__width__padding">
            <div className="row">
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 course__lessons">
                    <LessonList
                      lessons={courseLessons}
                      activeIndex={activeIndex}
                      lessonStatus={lessonStatus}
                      setActiveIndex={setActiveIndex}
                      setActiveLesson={setActiveLesson}
                      activeLesson={activeLesson}
                      completedLessons={completedLessons}
                    />
                  </div>
                  <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 col-12 course__videos">
                    <LessonContent
                      activeLesson={activeLesson}
                      setLessonStatus={setLessonStatus}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
