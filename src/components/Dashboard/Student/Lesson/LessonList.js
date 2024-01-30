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
      {lessons[0]?.section.map((section, index) => (
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
              {section?.lessons?.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="scc__wrap">
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
                    <strong>{lesson?.Lesson_Duration}</strong>
                  </div>
                </div>
              ))}
              <div className="scc__wrap">
                <div className="scc__info">
                  <i className="icofont-book-alt"></i>
                  <h5>
                    <div
                      onClick={() => {
                        setActiveLesson(
                          section?.lessons?.map(
                            (item) =>
                              item?.attachment_lession_count?.attachments
                          )
                        );
                        handleContentChange("attachment");
                      }}
                    >
                      <Link>
                        <span>Attachement</span>{" "}
                      </Link>
                    </div>
                  </h5>
                </div>
                <div className="scc__meta">
                  <strong className="count">
                    {section?.lessons?.map(
                      (lesson) => lesson?.attachment_lession_count?.count
                    )}
                  </strong>
                </div>
              </div>
              <div className="scc__wrap">
                <div className="scc__info">
                  <i className="icofont-book-alt"></i>
                  <h5>
                    <div
                      onClick={() => {
                        setActiveLesson(
                          section?.lessons?.map(
                            (item) => item?.lesson_assignment
                          )
                        );
                        handleContentChange("assignment");
                      }}
                    >
                      <Link>
                        <span>Assignment</span>{" "}
                      </Link>
                    </div>
                  </h5>
                </div>
                <div className="scc__meta">
                  <strong className="count">
                    {section?.lessons?.map(
                      (lesson) => lesson?.lesson_assignment?.length
                    )}
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

export default LessonList;
