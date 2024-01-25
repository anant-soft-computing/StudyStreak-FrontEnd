import React, { useEffect, useState } from "react";
import Footer from "../../../Footer/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TopBar from "../../../TopBar/TopBar";
import NavBar from "../../../NavBar/NavBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LessonList from "./LessonList";
import LessonContent from "./LessonContent";

const Lesson = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [courseLessons, setCourseLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeContentType, setActiveContentType] = useState("video");

  const authData = useSelector((state) => state.authStore);
  const getCourseLessons = async () => {
    try {
      const response = await ajaxCall(
        `/courseretupddelview/${courseId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: "GET",
        },
        8000
      );

      if (response.status === 200) {
        const lessonsData = response?.data?.lessons.map((lesson) => {
          return {
            ...lesson,
          };
        });

        setCourseLessons(lessonsData);
        setActiveLesson(lessonsData[0]);
      } else {
        console.log("error");
      }
    } catch (error) {
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
  }, [courseId, authData]); 

  return (
    <>
      {location === `/courseLessons/${courseId}` ? (
        <>
          <TopBar />
          <NavBar />
          <div className="body__wrapper">
            <div className="main_wrapper overflow-hidden">
              <div className="theme__shadow__circle"></div>
              <div className="theme__shadow__circle shadow__right"></div>
              <div className="tution sp_bottom_100 sp_top_50">
                <div className="container-fluid full__width__padding">
                  <div className="row">
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 course__lessons">
                      <LessonList
                        lessons={courseLessons}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        handleContentChange={setActiveContentType}
                        setActiveLesson={setActiveLesson}
                      />
                    </div>
                    <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 course__videos">
                      <LessonContent
                        activeLesson={activeLesson}
                        activeContentType={activeContentType}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <div className="body__wrapper">
          <div className="main_wrapper overflow-hidden">
            <div className="theme__shadow__circle"></div>
            <div className="theme__shadow__circle shadow__right"></div>
            <div className="row">
              <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 course__lessons">
                <LessonList
                  lessons={courseLessons}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  handleContentChange={setActiveContentType}
                  setActiveLesson={setActiveLesson}
                />
              </div>
              <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 course__videos">
                <LessonContent
                  activeLesson={activeLesson}
                  activeContentType={activeContentType}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Lesson;
