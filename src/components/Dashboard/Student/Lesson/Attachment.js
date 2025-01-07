import React from "react";

const Attachment = ({ activeLesson }) => {
  return activeLesson && activeLesson.length > 0 ? (
    <div className="row">
      <div className="col-xl-12">
        <div className="dashboard__table table-responsive">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Lesson Name</th>
                <th>Description</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {activeLesson?.map((item, index) => {
                const rowClass = index % 2 === 0 ? "" : "dashboard__table__row";
                return (
                  <tr key={index} className={rowClass}>
                    <td>{index + 1}.</td>
                    <td>{item?.lesson?.Lesson_Title}</td>
                    <td>{item?.attachment_description || "-"}</td>
                    <td>
                      <button
                        className="take-test"
                        onClick={() => window.open(item?.attachment)}
                      >
                        <i className="icofont-download" />
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
    <h5 className="text-center text-danger">Attachment Not Found !!</h5>
  );
};

export default Attachment;
