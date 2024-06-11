import React, { useEffect, useState } from "react";
import moment from "moment";
import DSSidebar from "../DSSideBar/DSSideBar";
import DashboardContent from "./DashboardContent";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";

const Dashboard = () => {
  const [batchData, setBatchData] = useState([]);
  const { solvingClassBook } = useLocation()?.state || {};
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));

  const studentBatch = batchData?.filter((item) =>
    batchIds?.includes(item?.id)
  );

  const joinNow = (url) => {
    window.open(url, "__blank");
  };

  const isWithin5Minutes = (startTime) => {
    const currentTime = moment();
    const classStartTime = moment(startTime);
    const difference = classStartTime.diff(currentTime, "milliseconds");
    return difference >= 0 && difference <= 5 * 60 * 1000;
  };

  const latestLiveClass = solvingClassBook?.sort((a, b) => {
    const dateA = moment(a.start_time);
    const dateB = moment(b.start_time);

    const monthComparison = dateB.month() - dateA.month();
    if (monthComparison !== 0) {
      return monthComparison;
    }

    return dateB.date() - dateA.date();
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/batchview/`,
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

        if (response?.status === 200) {
          setBatchData(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                <div className="col-xl-9 col-lg-9 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Dashboard</h4>
                      <div>
                        <h5>
                          {studentBatch.map((batch) => (
                            <span key={batch.id}>
                              {batch.batch_name} :{" "}
                              {moment(
                                batch.batch_start_timing,
                                "HH:mm:ss"
                              ).format("hh:mm A")}{" "}
                              |{" "}
                            </span>
                          ))}
                        </h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                        <div className="dashboard__inner sticky-top mt-4 global-neomorphism-card-styling">
                          <div className="dashboard__nav__title">
                            <h6 className="mb-2">Upcoming Live Class</h6>
                          </div>
                          <hr />
                          <ul className="ps-0 d-flex justify-content-between">
                            {latestLiveClass?.[0]?.start_time && (
                              <li>
                                <i className="icofont-calendar"></i>{" "}
                                {moment(
                                  latestLiveClass?.[0]?.start_time
                                ).format("MMM DD, YYYY")}
                              </li>
                            )}
                            {latestLiveClass?.[0]?.start_time &&
                              latestLiveClass?.[0]?.end_time && (
                                <li>
                                  <i className="icofont-clock-time"></i>{" "}
                                  {moment(
                                    latestLiveClass[0]?.start_time
                                  ).format("hh:mm A")}
                                  -
                                  {moment(
                                    latestLiveClass?.[0]?.end_time
                                  ).format("hh:mm A")}
                                </li>
                              )}
                          </ul>
                          {latestLiveClass?.[0]?.meeting_title && (
                            <div className="gridarea__heading">
                              <h5>{latestLiveClass?.[0]?.meeting_title}</h5>
                            </div>
                          )}
                          {latestLiveClass?.[0]?.start_time && (
                            <div className="zoom__meeting__id">
                              <p>
                                Starting Time :{" "}
                                <span className="start__time">
                                  {moment(
                                    latestLiveClass?.[0]?.start_time
                                  ).format("hh:mm A")}
                                </span>
                              </p>
                            </div>
                          )}
                          {latestLiveClass?.[0]?.join_url && (
                            <div className="d-flex justify-content-center">
                              <button
                                className="default__button mb-2"
                                onClick={() =>
                                  joinNow(latestLiveClass?.[0]?.join_url)
                                }
                                disabled={
                                  !isWithin5Minutes(
                                    latestLiveClass?.[0]?.start_time
                                  )
                                }
                              >
                                Join Now
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <DashboardContent batchData={batchData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;