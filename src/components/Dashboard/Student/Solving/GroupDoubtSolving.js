import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../../../TopBar/TopBar";
import NavBar from "../../../NavBar/NavBar";
import DSNavBar from "../DSNavBar/DSNavBar";
import DSSidebar from "../DSSideBar/DSSideBar";
import Footer from "../../../Footer/Footer";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";

const GroupDoubtSolving = () => {
  const { studentId } = useLocation()?.state;
  const [groupDoubtSolvingData, setGroupDoubtSolvingData] = useState([]);

  const getGroupDoubtSolvingData = async () => {
    try {
      const response = await ajaxCall(
        `/liveclass_list_view`,
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
        const groupDoubtData = response?.data?.filter(
          (item) => item?.liveclasstype?.name === "Group-Doubt Solving"
        );
        setGroupDoubtSolvingData(groupDoubtData);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEnrollNow = async (Id) => {
    const data = JSON.stringify({
      live_class_id: Id,
      student_id: studentId,
    });
    try {
      const response = await ajaxCall(
        `/enroll-students-in-live-class/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: data,
        },
        8000
      );
      if (response.status === 200) {
        toast.success("Slot Booked Successfully");
      } else if (response.status === 400) {
        toast.error(response?.data?.Message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getGroupDoubtSolvingData();
  }, []);

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
                        <h4>Group Doubt Solving</h4>
                      </div>
                      <div className="row">
                        {groupDoubtSolvingData?.map(
                          ({
                            id,
                            start_time,
                            end_time,
                            meeting_title,
                            meeting_description,
                            zoom_meeting_id,
                          }) => {
                            const startDate = new Date(start_time);
                            const isPastDate = startDate < new Date();
                            return (
                              <div
                                key={id}
                                className="col-lg-4 col-md-6 col-12"
                                data-aos="fade-up"
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
                                    <p className="text-dark">
                                      Meeting Description :
                                      <span> {meeting_description}</span>
                                    </p>
                                    <div>
                                      <p className="text-dark">
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
                                      <button
                                        className="default__button"
                                        onClick={() => handleEnrollNow(id)}
                                        disabled={isPastDate}
                                      >
                                        Book Solt
                                      </button>
                                    </div>
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

export default GroupDoubtSolving;
