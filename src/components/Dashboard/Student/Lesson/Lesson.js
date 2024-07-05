import React, { useEffect, useState } from "react";
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
  const [activeContentType, setActiveContentType] = useState("video");

  const authData = useSelector((state) => state.authStore);

  const getCourseLessons = async () => {
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
        setIsLoading(false);
        setCourseLessons(tempCourse);
        setActiveLesson(tempCourse[0]);
      } else {
        setIsLoading(false);
        console.log("error");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (courseLessons.length > 0) {
      setActiveLesson(courseLessons[activeIndex]);
    }
  }, [activeIndex, courseLessons]);

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
  }, [courseId]);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="tution sp_bottom_100 sp_top_50">
          <div className="container-fluid full__width__padding">
            <div className="row">
              {isLoading ? (
                <Loading text="Loading..." color="primary" />
              ) : (
                <>
                  <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 course__lessons">
                    <LessonList
                      lessons={courseLessons}
                      activeIndex={activeIndex}
                      setActiveIndex={setActiveIndex}
                      handleContentChange={setActiveContentType}
                      setActiveLesson={setActiveLesson}
                    />
                  </div>
                  <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 col-12 course__videos">
                    <LessonContent
                      activeLesson={activeLesson}
                      activeContentType={activeContentType}
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
