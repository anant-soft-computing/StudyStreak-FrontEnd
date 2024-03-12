import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../../../TopBar/TopBar";
import NavBar from "../../../NavBar/NavBar";
import DSNavBar from "../DSNavBar/DSNavBar";
import DSSidebar from "../DSSideBar/DSSideBar";
import Footer from "../../../Footer/Footer";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DoubtSolving = () => {
  const { studentId, solvingClassBook } = useLocation()?.state;
  const [doubtSolvingClass, setDoubtSolvingClass] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

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
    (async () => {
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
          const doubtData = response?.data?.filter(
            (item) => item?.liveclasstype?.name === "One-To-One-Doubt-Solving"
          );
          setDoubtSolvingClass(doubtData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const handleDateRangeChange = (ranges) => {
    setSelectedDateRange([ranges.selection]);
  };

  const doubtSolvingClasses = () => {
    return doubtSolvingClass.filter(({ start_time }) => {
      const classDate = new Date(start_time).toISOString().split("T")[0];
      const { startDate, endDate } = selectedDateRange[0];
      return (
        (!startDate || classDate >= startDate.toISOString().split("T")[0]) &&
        (!endDate || classDate <= endDate.toISOString().split("T")[0])
      );
    });
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
                        <h4>One To One Doubt Solving</h4>
                        <h6>
                          Your One To One Doubt Solving Class Schedule{" "}
                          <i
                            className="icofont-calendar"
                            style={{ cursor: "pointer", color: "#5f2ded" }}
                            onClick={() => setIsModalOpen(true)}
                          ></i>
                        </h6>
                      </div>
                      <div className="row">
                        {doubtSolvingClasses().map(
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
                              <div
                                key={id}
                                className="col-lg-4 col-md-6 col-12"
                              >
                                <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid tagMain">
                                {solvingClassBook.some(
                                    (item) => item.id === id
                                  ) && (
                                    <>
                                      <span
                                        className="tag"
                                        style={{ backgroundColor: "red" }}
                                      >
                                        Booked
                                      </span>
                                      <br/>
                                    </>
                                  )}
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
                                    <div className="d-flex justify-content-center">
                                      <button
                                        className="default__button"
                                        onClick={() => handleEnrollNow(id)}
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {isModalOpen && (
        <Modal
          size="lg"
          show={isModalOpen}
          onHide={() => setIsModalOpen(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>One To One Solving class schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DateRangePicker
              onChange={handleDateRangeChange}
              ranges={selectedDateRange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              direction="horizontal"
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default DoubtSolving;
