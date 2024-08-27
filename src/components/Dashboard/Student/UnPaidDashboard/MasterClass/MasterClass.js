import moment from "moment";
import React from "react";

const MasterClass = ({ masterClass }) => {
  const now = moment();
  const masterClasses = masterClass.filter((item) =>
    moment(item.end_time).isAfter(now)
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
        <h6>Masterclass</h6>
      </div>
      <hr />
      {masterClasses.length > 0 ? (
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
              {masterClasses.map(
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
        <h5 className="text-center text-danger">No MasterClass Available !!</h5>
      )}
    </div>
  );
};

export default MasterClass;
