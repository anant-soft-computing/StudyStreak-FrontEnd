import React, { useEffect, useState } from "react";
import moment from "moment";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import SmallModal from "../../../UI/Modal";
import DateRange from "../../../UI/DateRangePicker";
import RegularClassList from "./RegularClassList";
import { useLocation } from "react-router";

const RegularClass = () => {
  const { pathname } = useLocation();
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));
  const [regularClass, setRegularClass] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const regularClassData = [];

        for (let i = 0; i < batchIds.length; i++) {
          const batchId = batchIds[i];
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
            const data = response?.data?.filter(
              (item) => item?.liveclasstype?.name === "Regular Class"
            );
            regularClassData.push(...data);
          } else {
            console.log("error");
          }
        }
        setRegularClass(regularClassData);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

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

  const regularClasses = () => {
    return regularClass.filter(({ start_time }) => {
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
      {pathname === "/regularClasses" ? (
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
                          <h4>Regular Class</h4>
                          <h6>
                            Your Regular Class Schedule{" "}
                            <i
                              className="icofont-calendar one_to_one_icon"
                              onClick={() => setIsModalOpen(true)}
                            ></i>
                          </h6>
                        </div>
                        <RegularClassList
                          regularClass={regularClasses()}
                          joinNow={joinNow}
                          isWithin5Minutes={isWithin5Minutes}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="live__class__schedule_header">
            <h6>
              Your Regular Class Schedule{" "}
              <i
                className="icofont-calendar one_to_one_icon"
                onClick={() => setIsModalOpen(true)}
              ></i>
            </h6>
          </div>
          <div>
            <RegularClassList
              regularClass={regularClasses()}
              joinNow={joinNow}
              isWithin5Minutes={isWithin5Minutes}
            />
          </div>
        </div>
      )}
      <SmallModal
        size="lg"
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Regular class schedule"
      >
        <DateRange
          selectedRange={selectedDateRange}
          onChange={handleDateRangeChange}
        />
      </SmallModal>
    </>
  );
};

export default RegularClass;
