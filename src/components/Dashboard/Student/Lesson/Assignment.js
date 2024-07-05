import { Link } from "react-router-dom";

const Assignment = ({ activeLesson }) => {
  const handleClick = (id) => {
    window.open(`/assignment/General/${id}`, "_blank");
  };

  const assignments = activeLesson?.filter(
    (exam) =>
      exam.block_type === "Assignments" &&
      exam.exam_type === "General" &&
      exam.exam_category === "GENERAL"
  );

  return assignments && assignments.length > 0 ? (
    <>
      <div className="lesson__content__wrap">
        <h3>Assignment</h3>
      </div>
      <div className="row">
        {assignments.map((exam, index) => (
          <div className="col-lg-4 col-md-6 col-12 card__title" key={index}>
            <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid global-neomorphism-card-styling d-flex flex-column justify-content-between">
              <div className="gridarea__content">
                <div className="gridarea__heading">
                  <h3 className="text-center">
                    <Link to={`/live-exam/${exam.id}`} target="_blank">
                      {exam.exam_name}
                    </Link>
                  </h3>
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
    <h5 className="text-danger">Assignment Not Found !!</h5>
  );
};

export default Assignment;
