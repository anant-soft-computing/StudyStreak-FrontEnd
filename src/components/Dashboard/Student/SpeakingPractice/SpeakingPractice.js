import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

const SpeakingPractice = ({ count, solvingClassBook, selectedDateRange }) => {
  const location = useLocation();
  const [uuid, setUuid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    location?.state?.activeTab === "Speaking Practice"
      ? "Available Slot"
      : "Upcoming"
  );
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));
  const [speakingSolvingClass, setSpeakingSolvingClass] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const speakingClass = [];
        const uuidData = [];
        for (let i = 0; i < batchIds.length; i++) {
          const batchId = batchIds[i];
          const response = await ajaxCall(
            `/liveclass_listwithid_view/${batchId}/?live_class_type=Speaking-Practice`,
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
            const id = response?.data?.map((item) => item?.other_fields?.id);
            uuidData.push(...id);
            speakingClass.push(...response?.data);
            setIsLoading(false);
          } else {
            console.log("error");
            setIsLoading(false);
          }
        }
        setUuid(uuidData);
        setSpeakingSolvingClass(speakingClass);
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      }
    })();
  }, []);

  const speakingClasses = () => {
    return speakingSolvingClass?.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDateRange)
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
    <div>
      {count === 0 ? (
        <BuyCourse message="No Speaking Practice Class Available, Please Buy a Course !!" />
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
                  classes={speackingClasses}
                  message="No Upcomming Speaking Practice Classes Available Today !! , Please Schedule Your Classes."
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
                  message="No Speaking Practice Classes Available Today !! , Please Schedule Your Classes."
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
                  classes={speackingClasses}
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

export default SpeakingPractice;
