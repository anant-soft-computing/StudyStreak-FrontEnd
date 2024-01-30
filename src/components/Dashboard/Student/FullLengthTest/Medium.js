import React from "react";
import { Link } from "react-router-dom";

const Medium = ({ mediumData }) => {
  const handleClick = (id) => {
    window.open(`/live-exam/${id}`, "_blank");
  };

  return (
    <div className="row">
      {mediumData?.map(
        ({ id, exam_name, no_of_questions, exam_type }, index) => (
          <div
            className="col-lg-4 col-md-6 col-12"
            data-aos="fade-up"
            key={index}
          >
            <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid ">
              <div className="gridarea__content ">
                <div className="gridarea__heading">
                  <h3 className="text-center">
                    <Link to={`/live-exam/${id}`} target="_blank">
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
                    Exam Type : <span>{exam_type}</span>
                  </p>
                </div>
                <div className="d-flex justify-content-center">
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

export default Medium;