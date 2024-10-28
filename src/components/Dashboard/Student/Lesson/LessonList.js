import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";

const LessonList = ({
  lessons,
  activeIndex,
  lessonStatus,
  setActiveIndex,
  setActiveLesson,
  activeLesson,
  completedLessons,
}) => {
  const [courselessons, setCourseLessons] = useState([]);
  const [studentLessons, setStudentLessons] = useState([]);
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  useEffect(() => {
    const fetchStudentLessons = async () => {
      try {
        const response = await ajaxCall(
          `/student/${studentId}/lessons/`,
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
          setStudentLessons(response?.data);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    if (lessonStatus === "Complete" || lessonStatus === "Pending") {
      fetchStudentLessons();
    }
  }, [studentId, lessonStatus]);

  useEffect(() => {
    lessons[0]?.section?.sort((a, b) => {
      const nameA = a?.name?.toLowerCase();
      const nameB = b?.name?.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setCourseLessons(lessons);
  }, [lessons]);

  const isLessonCompleted = (lessonId) => {
    return (
      studentLessons?.some((item) => item.id === lessonId) ||
      completedLessons.includes(lessonId)
    );
  };

  const isLessonAccessible = (lesson, sectionIndex, lessonIndex) => {
    // First lesson is always accessible
    if (sectionIndex === 0 && lessonIndex === 0) return true;

    // If it's the active lesson, it's accessible
    if (lesson.id === activeLesson.id) return true;

    // Check if the previous lesson is completed
    const previousLesson = getPreviousLesson(sectionIndex, lessonIndex);
    return previousLesson ? isLessonCompleted(previousLesson.id) : true;
  };

  const getPreviousLesson = (sectionIndex, lessonIndex) => {
    const sections = courselessons[0]?.section;
    if (!sections) return null;

    if (lessonIndex > 0) {
      // Return previous lesson in the same section
      return sections[sectionIndex].lessons[lessonIndex - 1];
    } else if (sectionIndex > 0) {
      // Return last lesson of the previous section
      const previousSection = sections[sectionIndex - 1];
      return previousSection.lessons[previousSection.lessons.length - 1];
    }
    return null;
  };

  return (
    <div className="accordion content__cirriculum__wrap" id="accordionLessons">
      {courselessons[0]?.section?.map((section, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`section-${index}`}>
            <button
              className={`accordion-button ${
                activeIndex !== index ? "collapsed" : ""
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapseSection-${index}`}
              aria-expanded={activeIndex === index ? "true" : "false"}
              aria-controls={`#collapseSection-${index}`}
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              {section?.name}
            </button>
          </h2>
          <div
            id={`collapseSection-${index}`}
            className={`accordion-collapse collapse ${
              activeIndex === index ? "show" : ""
            }`}
            aria-labelledby={`section-${index}`}
            data-bs-parent="#accordionLessons"
          >
            <div className="accordion-body">
              {section?.lessons
                ?.sort((a, b) => {
                  const lessonA = parseInt(a?.Lesson_Title?.match(/\d+/)?.[0]);
                  const lessonB = parseInt(b?.Lesson_Title?.match(/\d+/)?.[0]);
                  return lessonA - lessonB;
                })
                ?.map((lesson, lessonIndex) => {
                  const completed = isLessonCompleted(lesson.id);
                  const accessible = isLessonAccessible(
                    lesson,
                    index,
                    lessonIndex
                  );

                  return (
                    <div key={lessonIndex}>
                      <div
                        className={`scc__wrap ${!accessible ? "disabled" : ""}`}
                      >
                        <div className="scc__info align-items-center">
                          <i className="icofont-video-alt"></i>
                          <h5>
                            <div
                              onClick={() => {
                                if (accessible) {
                                  setActiveLesson(lesson);
                                }
                              }}
                              style={{
                                cursor: accessible ? "pointer" : "not-allowed",
                                opacity: accessible ? 1 : 0.5,
                              }}
                            >
                              <Link>
                                <span>{lesson?.Lesson_Title}</span>
                              </Link>
                            </div>
                          </h5>
                        </div>
                        <div className="scc__meta">
                          <span className="time">
                            <i
                              className="icofont-clock-time"
                              style={{ color: "black" }}
                            />{" "}
                            {lesson?.Lesson_Duration}
                          </span>
                          <span
                            className="question"
                            style={{
                              backgroundColor: completed ? "green" : "red",
                            }}
                          >
                            {completed ? (
                              <i className="icofont-check-circled" />
                            ) : (
                              <i className="icofont-close-circled" />
                            )}{" "}
                            {completed ? "Complete" : "Pending"}
                          </span>
                          <span className="time" style={{ marginLeft: "10px" }}>
                            {!accessible && (
                              <i className="icofont-lock icofont-md" />
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonList;
