import React, { useEffect, useState } from "react";
import DSSidebar from "./DSSideBar/DSSideBar";
import DSNavBar from "./DSNavBar/DSNavBar";
import Footer from "../../Footer/Footer";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../helpers/ajaxCall";

const LiveClass = () => {
  const { batchId } = useLocation()?.state;
  const [liveClass, setLiveClass] = useState([]);

  const getLiveClass = async () => {
    try {
      const response = await ajaxCall(
        `/liveclass_listwithid_view/${batchId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        setLiveClass(response?.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const joinNow = (zoom_meeting) => {
    window.open(zoom_meeting, "__blank");
  };

  useEffect(() => {
    getLiveClass();
  }, [batchId]);

  const isWithin5Minutes = (startTime) => {
    const currentTime = new Date();
    const classStartTime = new Date(startTime);
    const difference = classStartTime.getTime() - currentTime.getTime();
    return difference >= 0 && difference <= 5 * 60 * 1000;
  };

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div>
            <div className="theme__shadow__circle"></div>
            <div className="theme__shadow__circle shadow__right"></div>
          </div>
          <div className="dashboardarea sp_bottom_100">
            <DSNavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Live Classes</h4>
                      </div>
                      <div className="row">
                        {liveClass?.map(
                          ({
                            id,
                            start_time,
                            end_time,
                            meeting_title,
                            meeting_description,
                            zoom_meeting_id,
                          }) => {
                            return (
                              <div
                                key={id}
                                className="col-lg-4 col-md-6 col-12"
                              >
                                <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid ">
                                  <div className="gridarea__content ">
                                    <div className="gridarea__list">
                                      <ul className="ps-0">
                                        <li>
                                          <i className="icofont-calendar"></i>{" "}
                                          {new Date(
                                            start_time
                                          ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                          })}
                                        </li>
                                        <li>
                                          <i className="icofont-clock-time"></i>{" "}
                                          {new Date(
                                            start_time
                                          ).toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "numeric",
                                          })}{" "}
                                          -{" "}
                                          {new Date(
                                            end_time
                                          ).toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "numeric",
                                          })}
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="gridarea__heading">
                                      <h3>{meeting_title}</h3>
                                    </div>
                                    <div class="zoom__meeting__id">
                                      <p>
                                        Description:
                                        <span>{meeting_description}</span>
                                      </p>
                                    </div>
                                    <div class="zoom__meeting__time__id">
                                      <div class="zoom__meeting__time">
                                        <p>
                                          Starting Time:
                                          <span>
                                            {" "}
                                            {new Date(
                                              start_time
                                            ).toLocaleTimeString("en-US", {
                                              hour: "numeric",
                                              minute: "numeric",
                                            })}
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                    {zoom_meeting_id && (
                                      <div className="d-flex justify-content-center">
                                        <button
                                          className="default__button"
                                          onClick={() =>
                                            joinNow(zoom_meeting_id)
                                          }
                                          disabled={
                                            !isWithin5Minutes(start_time)
                                          }
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LiveClass;
