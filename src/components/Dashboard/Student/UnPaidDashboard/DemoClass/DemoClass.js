import React from "react";
import moment from "moment/moment";

const DemoClass = ({ demoClass }) => {
  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>Free Demo Class</h6>
      </div>
      <hr />
      {demoClass.length > 0 ? (
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
              {demoClass.map(
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
        <h5 className="text-center text-danger">No Demo Class Available !!</h5>
      )}
    </div>
  );
};

export default DemoClass;
