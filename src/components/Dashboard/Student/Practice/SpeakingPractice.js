import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { addDays, subDays } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../../../TopBar/TopBar";
import NavBar from "../../../NavBar/NavBar";
import DSSidebar from "../DSSideBar/DSSideBar";
import Footer from "../../../Footer/Footer";
import ajaxCall from "../../../../helpers/ajaxCall";
import SpeakingPracticeList from "./SpeakingPracticeList";
import SmallModal from "../../../UI/Modal";
import DateRange from "../../../UI/DateRangePicker";

const SpeakingPractice = () => {
  const navigate = useNavigate();
  const { studentId, solvingClassBook, count, batchId } = useLocation()?.state;
  const [speakingSolvingClass, setSpeakingSolvingClass] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const { speaking_practice_count } = count;

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
        navigate("/studentLiveClasses");
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
          `/liveclass_listwithid_view/${batchId}/`,
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
          const speakingData = response?.data?.filter(
            (item) => item?.liveclasstype?.name === "Speaking-Practice"
          );
          setSpeakingSolvingClass(speakingData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [batchId]);

  const handleDateRangeChange = (ranges) => {
    setSelectedDateRange([ranges.selection]);
  };

  const joinNow = (zoom_meeting) => {
    window.open(zoom_meeting, "__blank");
  };

  const isWithin5Minutes = (startTime) => {
    const currentTime = moment();
    const classStartTime = moment(startTime);
    const difference = classStartTime.diff(currentTime, "milliseconds");
    return difference >= 0 && difference <= 5 * 60 * 1000;
  };

  const speakingClasses = () => {
    return speakingSolvingClass.filter(({ start_time }) => {
      const classDate = moment(start_time).format("YYYY-MM-DD");
      const { startDate, endDate } = selectedDateRange[0];
      return (
        (!startDate || classDate >= moment(startDate).format("YYYY-MM-DD")) &&
        (!endDate || classDate <= moment(endDate).format("YYYY-MM-DD"))
      );
    });
  };

  return (
    <>
      <TopBar />
      <NavBar />
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
                        <h4>Speaking Practice</h4>
                        <h6>
                          Your Speaking Practice Class Schedule{" "}
                          <i
                            className="icofont-calendar"
                            style={{ cursor: "pointer", color: "#01579b" }}
                            onClick={() => setIsModalOpen(true)}
                          ></i>
                        </h6>
                      </div>
                      {speaking_practice_count === "" ? (
                        <>
                          <div className="d-flex justify-content-center">
                            <h5>
                              No Speaking Practice Class Available , Please Buy
                              a Course
                            </h5>
                          </div>
                          <div className="d-flex justify-content-center mt-4">
                            <button
                              className="default__button"
                              onClick={() => navigate("/courses")}
                            >
                              Buy Course
                            </button>
                          </div>
                        </>
                      ) : (
                        <SpeakingPracticeList
                          speakingClasses={speakingClasses()}
                          solvingClassBook={solvingClassBook}
                          handleEnrollNow={handleEnrollNow}
                          joinNow={joinNow}
                          isWithin5Minutes={isWithin5Minutes}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <SmallModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Speaking Practice class schedule"
      >
        <DateRange
          selectedRange={selectedDateRange}
          onChange={handleDateRangeChange}
        />
      </SmallModal>
    </>
  );
};

export default SpeakingPractice;
