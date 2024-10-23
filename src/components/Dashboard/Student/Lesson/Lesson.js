import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

  const authData = useSelector((state) => state.authStore);

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
          console.log("error");
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

        // Find And Set The Active Lesson Based On CurrentLesson
        const lessonToActivate = response?.data?.lessons.find(
          (lesson) => lesson.id === currentLesson.lesson?.id
        );
        if (lessonToActivate) {
          setActiveLesson(lessonToActivate);
          const sectionIndex = tempCourse[0].section.findIndex(
            (section) => section.id === lessonToActivate.section?.id
          );
          if (sectionIndex !== -1) {
            setActiveIndex(sectionIndex);
          }
        } else {
          // If No Matching Lesson Found, Set The First Lesson As Active
          setActiveLesson(tempCourse[0].section[0].lessons[0]);
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
    if (!authData.authLoading && !authData.loggedIn) {
      toast.error("You are not authorized to access this location");
      navigate("/login");
      return;
    }
    getCourseLessons();
  }, [courseId, getCourseLessons]);

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
