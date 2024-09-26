import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import UpcomingClass from "../Classes/UpcomingClass";
import ClassList from "../Classes/ClassList";
import Tab from "../../../UI/Tab";
import { filterByDateRange } from "../Classes/filterByDateRange";

const tabs = [{ name: "Upcoming" }, { name: "Available Slot" }];

const GroupDoubtSolving = ({
  count,
  solvingClassBook,
  selectedDate,
  onDataFetch,
}) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    location?.state?.activeTab === "Group Doubt" ? "Available Slot" : "Upcoming"
  );
  const [groupDoubtSolvingClass, setGroupDoubtSolvingClass] = useState([]);

  const batchIds = JSON?.parse(localStorage.getItem("BatchIds"));
  const courseIds = JSON?.parse(localStorage.getItem("courses"));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        let gPClass = [];

        if (batchIds?.length) {
          for (let i = 0; i < batchIds.length; i++) {
            const batchId = batchIds[i];
            const response = await ajaxCall(
              `/liveclass_listwithid_view/${batchId}/?live_class_type=Group-Doubt Solving`,
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
              gPClass = [...gPClass, ...response?.data];
            }
          }
        }

        if (courseIds?.length) {
          for (let j = 0; j < courseIds.length; j++) {
            const courseId = courseIds[j];
            const response = await ajaxCall(
              `/liveclass-withcourseid/${courseId}/?live_class_type=Group-Doubt Solving`,
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
              gPClass = [...gPClass, ...response?.data];
            }
          }
        }

        onDataFetch(gPClass);
        setGroupDoubtSolvingClass(gPClass);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const groupDoubtSolvingClasses = () => {
    return groupDoubtSolvingClass?.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDate)
    );
  };

  const groupSolvingClasses = groupDoubtSolvingClasses()?.filter((item) => {
    return solvingClassBook?.some((index) => index.id === item.id);
  });

  const bookClass = solvingClassBook?.map((item) => item?.id);
  const groupClasses = groupDoubtSolvingClasses()?.filter(
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
              classes={groupSolvingClasses}
              message="No Upcoming Group Doubt Solving Classes Available !!, Please Schedule Your Classes"
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
              classes={groupClasses}
              classType="Group-Doubt Solving"
              message=" No Group Doubt Solving Classes Available !!, Please Schedule Your Classes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDoubtSolving;
