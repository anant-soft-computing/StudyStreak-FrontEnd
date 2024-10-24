import React, { useState } from "react";

const Curriculum = ({ courseDetail }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div
      className="tab-pane fade  active show"
      id="projects__one"
      role="tabpanel"
      aria-labelledby="projects__one"
    >
      <div
        className="accordion content__cirriculum__wrap"
        id="accordionCourseContent"
      >
        {courseDetail?.section.length > 0 ? (
          courseDetail?.section
            ?.sort((a, b) => {
              const nameA = a?.name?.toLowerCase();
              const nameB = b?.name?.toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }
              return 0;
            })
            .map((sectionItem, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={`section-${index}`}>
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
                    {sectionItem?.name}
                  </button>
                </h2>
                <div
                  id={`collapseOne-${index}`}
                  className={`accordion-collapse collapse ${
                    activeIndex === index ? "show" : ""
                  }`}
                  aria-labelledby={`section-${index}`}
                  data-bs-parent="#accordionCourseContent"
                >
                  <div className="accordion-body">
                    {sectionItem?.lessons
                      ?.sort((a, b) => {
                        const lessonA = parseInt(
                          a?.Lesson_Title.match(/\d+/)?.[0]
                        );
                        const lessonB = parseInt(
                          b?.Lesson_Title.match(/\d+/)?.[0]
                        );
                        return lessonA - lessonB;
                      })
                      .map((lessonItem, index) => (
                        <div className="scc__wrap" key={index}>
                          <div className="scc__info align-items-center">
                            <i className="icofont-video-alt"></i>
                            <h5>
                              <span>{lessonItem?.Lesson_Title}</span>
                            </h5>
                          </div>
                          <div className="scc__meta">
                            <span>
                              <i className="icofont-lock"></i>
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <h5 className="text-center text-danger">
            No Curriculum Available !!
          </h5>
        )}
      </div>
    </div>
  );
};

export default Curriculum;
