import React, { useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import ajaxCall from "../../../helpers/ajaxCall";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Assignment from "./Assignment";
import Attachment from "./Attachment";
import Quiz from "./Quiz";

const LessonContent = ({ activeLesson, activeContentType }) => {
  return (
    <div className="lesson__content__main">
      {activeContentType === "video" && (
        <>
          <div className="lesson__content__wrap">
            <h3>{activeLesson?.Lesson_Title}</h3>
          </div>
          <div className="plyr__video-embed rbtplayer">
            <iframe
              src={activeLesson?.Lesson_Video?.replace("watch?v=", "embed/")}
              allow="autoplay"
              allowFullScreen
              title="YouTube video player"
              frameborder="0"
              className="video"
            ></iframe>
          </div>
        </>
      )}
      {activeContentType === "attachment" && (
        <Attachment activeLesson={activeLesson} />
      )}
      {activeContentType === "quiz" && <Quiz activeLesson={activeLesson} />}
      {activeContentType === "assignment" && (
        <Assignment activeLesson={activeLesson} />
      )}
    </div>
  );
};

const LessonList = ({
  lessons,
  activeIndex,
  setActiveIndex,
  setActiveLesson,
  handleContentChange,
}) => {
  return (
    <div className="accordion content__cirriculum__wrap" id="accordionLessons">
      {lessons?.map((lessonItem, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`lesson-${index}`}>
            <button
              className={`accordion-button ${
                activeIndex !== index ? "collapsed" : ""
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseOne-${index}`}
              aria-expanded={activeIndex === index ? "true" : "false"}
              aria-controls={`#collapseOne-${index}`}
              onClick={() => setActiveIndex(index)}
            >
              {lessonItem?.Lesson_Title}
            </button>
          </h2>
          <div
            id={`collapseOne-${index}`}
            className={`accordion-collapse collapse ${
              activeIndex === index ? "show" : ""
            }`}
            aria-labelledby={`lesson-${index}`}
            data-bs-parent="#accordionLessons"
          >
            <div className="accordion-body">
              <div className="scc__wrap">
                <div
                  className="scc__info align-items-center"
                  style={{
                    wordWrap: "break-word",
                    width: "100%",
                    maxWidth: "240px",
                  }}
                >
                  <i className="icofont-video-alt"></i>
                  <h5>
                    <div
                      onClick={() => {
                        setActiveLesson(lessonItem);
                        handleContentChange("video");
                      }}
                    >
                      <Link to="">
                        <span>{lessonItem?.Lesson_Description}</span>
                      </Link>
                    </div>
                  </h5>
                </div>
                <div className="scc__meta">
                  <strong>{lessonItem?.Lesson_Duration}</strong>
                </div>
              </div>
              <div className="scc__wrap">
                <div className="scc__info">
                  <i className="icofont-book-alt"></i>
                  <h5>
                    <div onClick={() => handleContentChange("attachment")}>
                      <Link>
                        <span>Attachement</span>{" "}
                      </Link>
                    </div>
                  </h5>
                </div>
                <div className="scc__meta">
                  <strong className="count">
                    {lessonItem.attachmentCount}
                  </strong>
                </div>
              </div>
              <div className="scc__wrap">
                <div className="scc__info">
                  <i className="icofont-audio"></i>
                  <h5>
                    <div onClick={() => handleContentChange("quiz")}>
                      <Link>
                        <span>Quiz</span>
                      </Link>
                    </div>
                  </h5>
                </div>
              </div>
              <div className="scc__wrap">
                <div className="scc__info">
                  <i className="icofont-book-alt"></i>
                  <h5>
                    <div onClick={() => handleContentChange("assignment")}>
                      <Link>
                        <span>Assignment</span>{" "}
                      </Link>
                    </div>
                  </h5>
                </div>
                <div className="scc__meta">
                  <strong className="count">
                    {lessonItem.assignmentCount}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Lesson = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

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
          const attachments = lesson.attachment_lession_count.attachments;
          const assignments = lesson.assignment_lession_count.assignments;
          return {
            ...lesson,
            attachments,
            assignments,
            attachmentCount: attachments.length,
            assignmentCount: assignments.length,
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
  );
};

export default Lesson;