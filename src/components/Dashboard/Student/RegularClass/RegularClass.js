import React, { useEffect, useState } from "react";
import moment from "moment";
import ajaxCall from "../../../../helpers/ajaxCall";
import SmallModal from "../../../UI/Modal";
import DateRange from "../../../UI/DateRangePicker";
import RegularClassList from "./RegularClassList";
import Tab from "../../../UI/Tab";

const tabs = [{ name: "Regular" }, { name: "Recoded Class" }];

const RegularClass = () => {
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));
  const [regularClass, setRegularClass] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Regular");
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
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
            setIsLoading(false);
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
      <div>
        <div className="live__class__schedule_header">
          <h5>
            Your Regular Class Schedule{" "}
            <i
              className="icofont-calendar one_to_one_icon"
              onClick={() => setIsModalOpen(true)}
            ></i>
          </h5>
        </div>
        <div className="row">
          <Tab
            tabs={tabs}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />
          <div className="tab-content tab__content__wrapper aos-init aos-animate">
            <div
              className={`tab-pane fade ${
                activeTab === "Regular" ? "show active" : ""
              }`}
            >
              <div className="row">
                <RegularClassList
                  isLoading={isLoading}
                  regularClass={regularClasses()}
                  joinNow={joinNow}
                  isWithin5Minutes={isWithin5Minutes}
                />
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "Recoded Class" ? "show active" : ""
              }`}
            >
              <div className="row">
                <h5 className="text-center text-danger">Comming Soon....</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SmallModal
        size="lg"
        centered
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Regular class schedule"
        footer={
          <button
            className="default__button"
            onClick={() => setIsModalOpen(false)}
          >
            Apply
          </button>
        }
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
