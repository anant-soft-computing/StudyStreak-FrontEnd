import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Tab from "../../../UI/Tab";
import ClassList from "../Classes/ClassList";
import ajaxCall from "../../../../helpers/ajaxCall";
import UpcomingClass from "../Classes/UpcomingClass";
import { filterByDateRange } from "../Classes/filterByDateRange";

const tabs = [{ name: "Upcoming" }, { name: "Available Slot" }];

const SpeakingPractice = ({
  count,
  solvingClassBook,
  selectedDate,
  onDataFetch,
}) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    location?.state?.activeTab === "Speaking Practice"
      ? "Available Slot"
      : "Upcoming"
  );
  const [speakingSolvingClass, setSpeakingSolvingClass] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/liveclass/studentonly/?liveClassType=Speaking-Practice",
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
          onDataFetch(response?.data);
          setSpeakingSolvingClass(response?.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const speakingClasses = () => {
    return speakingSolvingClass?.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDate)
    );
  };

  const speackingClasses = speakingClasses()?.filter((item) =>
    solvingClassBook?.some((index) => index.id === item.id)
  );

  const bookClass = solvingClassBook?.map((item) => item?.id);
  const speakingPracticeClasses = speakingClasses()?.filter(
    (item) => !bookClass?.includes(item?.id)
  );

  return (
    <div className="row">
      <Tab
        tabs={tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <div className="tab-content tab__content__wrapper aos-init aos-animate">
        <div
          className={`tab-pane fade ${
            activeTab === "Upcoming" ? "show active" : ""
          }`}
        >
          <div className="row">
            <UpcomingClass
              isLoading={isLoading}
              classes={speackingClasses}
              message="No Upcoming Speaking Practice Classes Available !!, Please Schedule Your Classes"
            />
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Available Slot" ? "show active" : ""
          }`}
        >
          <div className="row">
            <ClassList
              count={count}
              isLoading={isLoading}
              classes={speakingPracticeClasses}
              classType="Speaking-Practice"
              message="No Speaking Practice Classes Available !!, Please Schedule Your Classes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingPractice;
