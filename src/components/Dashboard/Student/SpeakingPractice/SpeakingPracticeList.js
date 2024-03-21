import React from "react";
import moment from "moment";

const SpeakingPracticeList = ({ speakingClasses, bookCount }) => {
  return (
    <>
      <div className="dashboard__section__title">
        <h4>Available Slot</h4>
      </div>
      {speakingClasses.length > 0 ? (
        <div className="row">
          {speakingClasses.map(
            ({
              id,
              start_time,
              end_time,
              meeting_title,
              meeting_description,
            }) => {
              const startDate = new Date(start_time);
              const isPastDate = startDate < new Date();
              return (
                <div key={id} className="col-lg-4 col-md-6 col-12">
                  <div className="global-neomorphism-card-styling gridarea__wraper gridarea__wraper__2 zoom__meeting__grid tagMain d-flex flex-column justify-content-between">
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
                      <div className="d-flex justify-content-center">
                        <button
                          className="default__button mb-2"
                          onClick={() => bookCount(id)}
                          disabled={isPastDate}
                        >
                          Book Slot
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        <h5 className="text-center">No Speaking Practice Classes Available.</h5>
      )}
    </>
  );
};

export default SpeakingPracticeList;
