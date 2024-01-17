import React from "react";

const Assignment = ({ activeLesson }) => {
  return (
    <div>
      {activeLesson.assignments.length > 0 ? (
        <>
          <div className="dashboard__section__title">
            <h4>Assignment</h4>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard__table table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Assignment Name</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeLesson.assignments.map((assignment) => (
                      <tr key={assignment.id}>
                        <th>
                          <span>{assignment.attachment_description}</span>
                        </th>
                        <td></td>
                        <td></td>
                        <td>
                          <div className="dashboard__button__group">
                            <a
                              className="dashboard__small__btn__2"
                              href={assignment.attachment}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="icofont-download" />
                              Download
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No Assignment Available For This Lesson.</p>
      )}
    </div>
  );
};

export default Assignment;
