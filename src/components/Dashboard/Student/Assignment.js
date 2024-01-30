import { Link } from "react-router-dom";

const Assignment = ({ activeLesson }) => {
  const handleClick = (id) => {
    window.open(`/live-exam/${id}`, "_blank");
  };

  return (
    <div>
      {activeLesson?.[0]?.length > 0 && (
        <>
          <div className="lesson__content__wrap">
            <h3>Assignment</h3>
          </div>
          <div className="row">
            {activeLesson[0]?.map((exam, index) => (
              <div
                className="col-lg-4 col-md-6 col-12"
                data-aos="fade-up"
                key={index}
                style={{ marginTop: "70px" }}
              >
                <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid ">
                  <div className="gridarea__content ">
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
                    <div className="d-flex justify-content-center">
                      <button
                        className="default__button"
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
      )}
    </div>
  );
};

export default Assignment;
