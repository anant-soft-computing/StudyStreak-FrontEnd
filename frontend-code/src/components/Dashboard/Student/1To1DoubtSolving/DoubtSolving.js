import React, { useEffect, useState } from "react";
import Tab from "../../../UI/Tab";
import ClassList from "../Classes/ClassList";
import ajaxCall from "../../../../helpers/ajaxCall";
import UpcomingClass from "../Classes/UpcomingClass";
import { filterByDateRange } from "../Classes/filterByDateRange";

const tabs = [{ name: "Upcoming" }, { name: "Available Slot" }];

const DoubtSolving = ({
  count,
  solvingClassBook,
  selectedDate,
  onDataFetch,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [doubtSolvingClass, setDoubtSolvingClass] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/liveclass/studentonly/?liveClassType=One-To-One-Doubt-Solving",
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
          onDataFetch(response?.data);
          setDoubtSolvingClass(response?.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const doubtSolvingClasses = () => {
    return doubtSolvingClass?.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDate)
    );
  };

  const oneToOneDoubtSolvingClasses = doubtSolvingClasses()?.filter((item) => {
    return solvingClassBook?.some((index) => index.id === item.id);
  });

  const bookClass = solvingClassBook?.map((item) => item?.id);
  const oToclasses = doubtSolvingClasses()?.filter(
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
              classes={oneToOneDoubtSolvingClasses}
              message="No Upcoming One To One Doubt Solving Classes Available !!, Please Schedule Your Classes"
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
              classes={oToclasses}
              classType="One-To-One-Doubt-Solving"
              message="No One To One Doubt Solving Classes Available !!, Please Schedule Your Classes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubtSolving;
