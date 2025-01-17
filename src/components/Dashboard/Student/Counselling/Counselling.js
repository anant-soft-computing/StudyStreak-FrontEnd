import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import ClassList from "../Classes/ClassList";
import Tab from "../../../UI/Tab";
import { filterByDateRange } from "../Classes/filterByDateRange";
import UpcomingClass from "../Classes/UpcomingClass";

const tabs = [{ name: "Upcoming" }, { name: "Counselling" }];

const Counselling = ({
  count,
  solvingClassBook,
  selectedDate,
  onDataFetch,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [counselling, setCounselling] = useState([]);
  const [activeTab, setActiveTab] = useState("Counselling");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/liveclass/studentonly/?liveClassType=Counselling",
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
          setCounselling(response?.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const counsellingData = () => {
    return counselling.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDate)
    );
  };

  const counsellinges = counsellingData()?.filter((item) =>
    solvingClassBook?.some((index) => index.id === item.id)
  );

  const bookClass = solvingClassBook?.map((item) => item?.id);
  const counsellingClasses = counsellingData()?.filter(
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
              classes={counsellinges}
              message="No Upcoming Counselling Available !!, Please Schedule Your Counselling"
            />
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Counselling" ? "show active" : ""
          }`}
        >
          <div className="row">
            <ClassList
              count={count}
              isLoading={isLoading}
              classes={counsellingClasses}
              classType="Counselling"
              message="No Counselling Available !!, Please Schedule Your Counselling"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counselling;
