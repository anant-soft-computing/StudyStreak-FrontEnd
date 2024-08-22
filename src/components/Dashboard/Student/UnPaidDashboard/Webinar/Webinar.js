import moment from "moment";
import React from "react";

const Webinar = ({ webinar }) => {
  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Free Webinar</h6>
      </div>
      <hr />
      {webinar.length > 0 ? (
        <div className="dashboard__table table-responsive">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date & Time</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {webinar.map(
                ({ id, meeting_title, start_time, join_url }, index) => (
                  <tr
                    key={id}
                    className={index % 2 === 0 ? "" : "dashboard__table__row"}
                  >
                    <td>{meeting_title}</td>
                    <td>{moment(start_time).format("lll")}</td>
                    <td>
                      <button
                        className="take-test"
                        onClick={() => window.open(join_url)}
                      >
                        Join Now
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <h5 className="text-center text-danger">No Webinar Available !!</h5>
      )}
    </div>
  );
};

export default Webinar;
