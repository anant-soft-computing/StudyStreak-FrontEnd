import React from "react";
import { Link } from "react-router-dom";

const Writing = ({ writingData, givenTest }) => {
  const handleClick = (id) => {
    window.open(`/live-exam/${id}`, "_blank");
  };

  return (
    <div className="row">
      {writingData?.map(
        ({ id, exam_name, no_of_questions, difficulty_level }, index) => (
          <div
            className="col-lg-4 col-md-6 col-12"
            data-aos="fade-up"
            key={index}
          >
            <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid tagMain global-neomorphism-card-styling d-flex flex-column justify-content-between">
              {givenTest.some((test) => test.id === id) && (
                <span className="tag">Given</span>
              )}
              <div className="gridarea__content ">
                <div className="gridarea__heading mt-3">
                  <h3 className="text-center">
                    <Link to={`/live-exam/${writingData?.id}`} target="_blank">
                      {exam_name}
                    </Link>
                  </h3>
                </div>
                <div className="zoom__meeting__id">
                  <p>
                    Questions : <span>{no_of_questions}</span>
                  </p>
                </div>
                <div className="zoom__meeting__id">
                  <p>
                    Difficulty Level : <span>{difficulty_level}</span>
                  </p>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-center mb-3">
                  <button
                    className="default__button"
                    onClick={() => handleClick(id)}
                  >
                    Take Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Writing;
