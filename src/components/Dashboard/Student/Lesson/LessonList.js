import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LessonList = ({
  lessons,
  activeIndex,
  lessonStatus,
  setActiveIndex,
  setActiveLesson,
  handleContentChange,
}) => {
  const [courselessons, setCourseLessons] = useState([]);

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
                .sort((a, b) => {
                  const lessonA = parseInt(a?.Lesson_Title.match(/\d+/)[0]);
                  const lessonB = parseInt(b?.Lesson_Title.match(/\d+/)[0]);
                  return lessonA - lessonB;
                })
                .map((lesson, lessonIndex) => (
                  <div key={lessonIndex}>
                    <div className="scc__wrap">
                      <div className="scc__info align-items-center">
                        <i className="icofont-video-alt"></i>
                        <h5>
                          <div
                            onClick={() => {
                              setActiveLesson(lesson);
                              handleContentChange("video");
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
                            backgroundColor:
                              lessonStatus === "Complete" ? "green" : "red",
                          }}
                        >
                          {lessonStatus === "Complete" ? (
                            <i className="icofont-check-circled" />
                          ) : (
                            <i className="icofont-close-circled" />
                          )}{" "}
                          {lessonStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonList;
