import React from "react";
import moment from "moment";

const LiveClassList = ({ liveClasses, joinNow, isWithin5Minutes }) => {
  return liveClasses?.length > 0 ? (
    <div className="row">
      {liveClasses?.map(
        ({
          id,
          start_time,
          end_time,
          meeting_title,
          meeting_description,
          zoom_meeting_id,
          select_batch,
        }) => {
          return (
            <div key={id} className="col-lg-4 col-md-6 col-12">
              <div className="global-neomorphism-card-styling gridarea__wraper gridarea__wraper__2 zoom__meeting__grid tagMain">
                <span className="tag">Booked</span>
                <br />
                <div className="gridarea__content ">
                  <div className="gridarea__list mt-1">
                    <ul className="ps-0">
                      <li>
                        <i className="icofont-calendar"></i>{" "}
                        {moment(start_time).format("DD MMM, YYYY")}
                      </li>
                      <li>
                        <i className="icofont-clock-time"></i>{" "}
                        {moment(start_time).format("hh:mm A")} -{" "}
                        {moment(end_time).format("hh:mm A")}
                      </li>
                    </ul>
                  </div>
                  <div className="gridarea__heading">
                    <h3>{meeting_title}</h3>
                  </div>
                  <div className="zoom__meeting__id">
                    <p>
                      Batch Name: <span>{select_batch?.batch_name}</span>
                    </p>
                  </div>
                  <div className="zoom__meeting__id">
                    <p>
                      Description: <span>{meeting_description}</span>
                    </p>
                  </div>
                  <div className="zoom__meeting__id">
                    <p>
                      Starting Time:{" "}
                      <span>{moment(start_time).format("hh:mm A")}</span>
                    </p>
                  </div>
                </div>
                <div>
                  {zoom_meeting_id && (
                    <div className="d-flex justify-content-center">
                      <button
                        className="default__button mb-2"
                        onClick={() => joinNow(zoom_meeting_id)}
                        disabled={!isWithin5Minutes(start_time)}
                      >
                        Join Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  ) : (
    <h5 className="text-center text-danger">
      No LiveClasses Available Today !! , Please Schedule Your Classes.
    </h5>
  );
};

export default LiveClassList;
