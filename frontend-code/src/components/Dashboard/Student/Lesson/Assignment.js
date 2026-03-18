import React from "react";

const Assignment = ({ activeLesson }) => {
  const assignments = activeLesson?.filter(
    (exam) =>
      exam.block_type === "Assignments" &&
      exam.exam_type === "General" &&
      exam.exam_category === "GENERAL"
  );

  return assignments && assignments.length > 0 ? (
    <div className="row">
      <div className="col-xl-12">
        <div className="dashboard__table table-responsive">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>No Of Questions</th>
                <th>View Assignment</th>
              </tr>
            </thead>
            <tbody>
              {assignments?.map((item, index) => {
                const rowClass = index % 2 === 0 ? "" : "dashboard__table__row";
                return (
                  <tr key={index} className={rowClass}>
                    <td>{index + 1}.</td>
                    <td>{item?.exam_name}</td>
                    <td>{item?.no_of_questions}</td>
                    <td>
                      <button
                        className="take-test"
                        onClick={() =>
                          window.open(
                            `/Assignment/${item.exam_type}/${item.id}`,
                            "_blank"
                          )
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <h5 className="text-center text-danger">Assignment Not Found !!</h5>
  );
};

export default Assignment;
