import React from "react";
import moment from "moment";

const UnPaidClasses = ({ classData, title, message }) => {
  const now = moment();
  const classes = classData.filter((item) =>
    moment(item.end_time).isAfter(now)
  );

  const sortedClasses = classes.sort((a, b) =>
    moment(a.start_time).diff(moment(b.start_time))
  );

  const displayDate = (start_time, end_time) => {
    if (
      moment(start_time).isSameOrBefore(now) &&
      moment(end_time).isAfter(now)
    ) {
      return moment(now)
        .set({
          hour: moment(start_time).hour(),
          minute: moment(start_time).minute(),
          second: 0,
        })
        .format("llll");
    }
    return moment(start_time).format("llll");
  };

  return (
    <div className="dashboard__inner mt-4 card-background">
      <div className="dashboard__nav__title">
        <h6>{title}</h6>
      </div>
      <hr />
      {sortedClasses.length > 0 ? (
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
              {sortedClasses.map(
                (
                  { id, meeting_title, start_time, end_time, join_url },
                  index
                ) => (
                  <tr
                    key={id}
                    className={index % 2 === 0 ? "" : "dashboard__table__row"}
                  >
                    <td>{meeting_title}</td>
                    <td>{displayDate(start_time, end_time)}</td>
                    <td>
                      <button
                        className="take-test"
                        onClick={() => window.open(join_url, "_blank")}
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
        <h5 className="text-center text-danger">{message}</h5>
      )}
    </div>
  );
};

export default UnPaidClasses;
