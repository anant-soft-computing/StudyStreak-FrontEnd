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

const SpeakingPractice = ({
  count,
  solvingClassBook,
  selectedDate,
  onDataFetch,
}) => {
  const location = useLocation();
  const [uuid, setUuid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    location?.state?.activeTab === "Speaking Practice"
      ? "Available Slot"
      : "Upcoming"
  );
  const batchIds = JSON?.parse(localStorage.getItem("BatchIds")) || [];
  const courseIds =
    JSON?.parse(localStorage.getItem("courses"))?.map((item) => item?.id) || [];
  const [speakingSolvingClass, setSpeakingSolvingClass] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        let speakingClass = [];
        let uuidData = [];

        if (batchIds?.length) {
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
              uuidData = [...uuidData, ...id];
              speakingClass = [...speakingClass, ...response?.data];
            }
          }
        }

        if (courseIds?.length) {
          for (let j = 0; j < courseIds.length; j++) {
            const courseId = courseIds[j];
            const response = await ajaxCall(
              `/liveclass-withcourseid/${courseId}/?live_class_type=Speaking-Practice`,
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
              uuidData = [...uuidData, ...id];
              speakingClass = [...speakingClass, ...response?.data];
            }
          }
        }

        // Optionally: Remove duplicates based on unique identifiers
        speakingClass = [
          ...new Map(speakingClass.map((item) => [item.id, item])).values(),
        ];
        uuidData = [...new Set(uuidData)];

        setUuid(uuidData);
        onDataFetch(speakingClass);
        setSpeakingSolvingClass(speakingClass);
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
    <div>
      {count === undefined ? (
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
