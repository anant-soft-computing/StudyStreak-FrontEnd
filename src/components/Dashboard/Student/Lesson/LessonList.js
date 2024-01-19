import { Link } from "react-router-dom";

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
                className={`accordion-button ${activeIndex !== index ? "collapsed" : ""
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
              className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""
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

  export default LessonList