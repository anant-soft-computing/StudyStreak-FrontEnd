import React from "react";

const Assignment = ({ activeLesson, lessonName }) => {
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
                    {activeLesson.assignments.map(
                      ({ id, attachment_description, attachment }, index) => (
                        <tr
                          key={id}
                          className={`${
                            index % 2 === 0 ? "" : "dashboard__table__row"
                          }`}
                        >
                          <th>
                            <span>{attachment_description}</span>
                            <p className="mt-2">
                              Lesson : <span>{lessonName}</span>
                            </p>
                          </th>
                          <td></td>
                          <td></td>
                          <td style={{ width: "0%" }}>
                            <div className="dashboard__button__group">
                              <a
                                className="dashboard__small__btn__2"
                                href={attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="icofont-download" />
                                Download
                              </a>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
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
