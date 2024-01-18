import React from "react";

const Attachment = ({activeLesson}) => {
  return (
    <div>
      {activeLesson.attachments.length > 0 ? (
        <>
          <div className="dashboard__section__title">
            <h4>Attachments</h4>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="dashboard__table table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeLesson.attachments.map((attachment) => (
                      <tr key={attachment.id}>
                        <th>
                          <span>{attachment.attachment_description}</span>
                        </th>
                        <td></td>
                        <td></td>
                        <td style={{ width: "0%" }}>
                          <div className="dashboard__button__group">
                            <a
                              className="dashboard__small__btn__2"
                              href={attachment.attachment}
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
        <p>No Attachments Available For This Lesson.</p>
      )}
    </div>
  );
};

export default Attachment;
