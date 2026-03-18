import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import ClassList from "../Classes/ClassList";
import Tab from "../../../UI/Tab";
import { filterByDateRange } from "../Classes/filterByDateRange";
import UpcomingClass from "../Classes/UpcomingClass";

const tabs = [{ name: "Upcoming" }, { name: "Webinar" }];

const Webinar = ({ count, solvingClassBook, selectedDate, onDataFetch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Webinar");
  const [webinar, setWebinar] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/liveclass/studentonly/?liveClassType=Webinar",
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
          setWebinar(response?.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const webinarData = () => {
    return webinar.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDate)
    );
  };

  const webinarClass = webinarData()?.filter((item) =>
    solvingClassBook?.some((index) => index.id === item.id)
  );

  const bookClass = solvingClassBook?.map((item) => item?.id);
  const webinarClasses = webinarData()?.filter(
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
              classes={webinarClass}
              message="No Upcoming Webinar Available !!, Please Schedule Your Webinar"
            />
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Webinar" ? "show active" : ""
          }`}
        >
          <div className="row">
            <ClassList
              count={count}
              isLoading={isLoading}
              classes={webinarClasses}
              classType="Webinar"
              message="No Webinar Available !!, Please Schedule Your Webinar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webinar;
