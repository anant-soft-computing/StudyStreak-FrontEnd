import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import BuyCourse from "../BuyCourse/BuyCourse";
import UpcomingClass from "../Classes/UpcomingClass";
import ClassList from "../Classes/ClassList";
import Tab from "../../../UI/Tab";
import RecordedClass from "../Classes/RecordedClass";
import { filterByDateRange } from "../Classes/filterByDateRange";

const tabs = [
  { name: "Upcoming" },
  { name: "Available Slot" },
  { name: "Recorded Class" },
];

const GroupDoubtSolving = ({ count, solvingClassBook, selectedDateRange }) => {
  const [uuid, setUuid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));
  const [groupDoubtSolvingClass, setGroupDoubtSolvingClass] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const gPClass = [];
        const uuidData = [];
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
            const groupDoubtData = response?.data?.filter(
              (item) => item?.liveclasstype?.name === "Group-Doubt Solving"
            );
            const id = groupDoubtData?.map((item) => item?.other_fields?.id);
            uuidData.push(...id);
            gPClass.push(...groupDoubtData);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            console.log("error");
          }
        }
        setUuid(uuidData);
        setGroupDoubtSolvingClass(gPClass);
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      }
    })();
  }, []);

  const groupDoubtSolvingClasses = () => {
    return groupDoubtSolvingClass?.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDateRange)
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
    <div>
      {count === 0 ? (
        <BuyCourse message="No Group Doubt Solving Class Available , Please Buy a Course !!" />
      ) : (
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
                  message="No Upcomming Group Doubt Solving Classes Available Today !! , Please Schedule Your Classes."
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
                  message=" No Group Doubt Solving Classes Available Today !! , Please Schedule Your Classes."
                />
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "Recorded Class" ? "show active" : ""
              }`}
            >
              <div className="row">
                <RecordedClass
                  uuid={uuid}
                  classes={groupSolvingClasses}
                  activeTab={activeTab}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDoubtSolving;
