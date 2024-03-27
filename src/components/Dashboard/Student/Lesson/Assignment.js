import { Link } from "react-router-dom";

const Assignment = ({ activeLesson }) => {
  const handleClick = (id) => {
    window.open(`/live-exam/${id}`, "_blank");
  };

  return activeLesson && activeLesson.length > 0 ? (
    <>
      <div className="lesson__content__wrap">
        <h3>Assignment</h3>
      </div>
      <div className="row">
        {activeLesson.map((exam, index) => (
          <div
            className="col-lg-4 col-md-6 col-12"
            data-aos="fade-up"
            key={index}
            style={{ marginTop: "70px" }}
          >
            <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid global-neomorphism-card-styling d-flex flex-column justify-content-between">
              <div className="gridarea__content">
                <div className="gridarea__heading">
                  <h3 className="text-center">
                    <Link to={`/live-exam/${exam.id}`} target="_blank">
                      {exam.exam_name}
                    </Link>
                  </h3>
                </div>
                <div className="zoom__meeting__id">
                  <p>
                    Questions : <span>{exam.no_of_questions}</span>
                  </p>
                </div>
                <div className="zoom__meeting__id">
                  <p>
                    Difficulty Level : <span>{exam.difficulty_level}</span>
                  </p>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-center">
                  <button
                    className="default__button mb-2"
                    onClick={() => handleClick(exam.id)}
                  >
                    Take Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <h5 className="text-danger">Please Select Lesson for Assignment !!</h5>
  );
};

export default Assignment;
