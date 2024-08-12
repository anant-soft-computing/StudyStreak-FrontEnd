import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import ClassList from "../Classes/ClassList";
import Tab from "../../../UI/Tab";
import RecordedClass from "../Classes/RecordedClass";
import { filterByDateRange } from "../Classes/filterByDateRange";
import UpcomingClass from "../Classes/UpcomingClass";
import BuyCourse from "../BuyCourse/BuyCourse";

const tabs = [
  { name: "Upcoming" },
  { name: "Tutor Support" },
  { name: "Recorded Class" },
];

const TutorSupport = ({
  count,
  solvingClassBook,
  selectedDate,
  onDataFetch,
}) => {
  const [uuid, setUuid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Tutor Support");
  const batchIds = JSON?.parse(localStorage.getItem("BatchIds")) || [];
  const courseIds =
    JSON?.parse(localStorage.getItem("courses"))?.map((item) => item?.id) || [];
  const [tutorSupportClass, setTutorSupportClass] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        let uuidData = [];
        let tutorSupportClassData = [];

        if (batchIds?.length) {
          for (let i = 0; i < batchIds.length; i++) {
            const batchId = batchIds[i];
            const response = await ajaxCall(
              `/liveclass_listwithid_view/${batchId}/?live_class_type=Tutor Support`,
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
              tutorSupportClassData = [
                ...tutorSupportClassData,
                ...response?.data,
              ];
            }
          }
        }

        if (courseIds?.length) {
          for (let i = 0; i < courseIds.length; i++) {
            const courseId = courseIds[i];
            const response = await ajaxCall(
              `/liveclass-withcourseid/${courseId}/?live_class_type=Tutor Support`,
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
              tutorSupportClassData = [
                ...tutorSupportClassData,
                ...response?.data,
              ];
            }
          }
        }

        // Optionally: Remove duplicates based on unique identifiers
        tutorSupportClassData = [
          ...new Map(
            tutorSupportClassData.map((item) => [item.id, item])
          ).values(),
        ];
        uuidData = [...new Set(uuidData)];

        setUuid(uuidData);
        onDataFetch(tutorSupportClassData);
        setTutorSupportClass(tutorSupportClassData);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const tutorData = () => {
    return tutorSupportClass.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDate)
    );
  };

  const tutorClasses = tutorData()?.filter((item) =>
    solvingClassBook?.some((index) => index.id === item.id)
  );

  const bookClass = solvingClassBook?.map((item) => item?.id);
  const tutorSupportClasses = tutorData()?.filter(
    (item) => !bookClass?.includes(item?.id)
  );

  return (
    <div>
      {count === undefined ? (
        <BuyCourse message="No Tutor Support Class Available, Please Buy a Course !!" />
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
                  classes={tutorClasses}
                  message="No Upcoming Tuotor Support Classes Available !!, Please Schedule Your Tuotor Support Classes"
                />
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "Tutor Support" ? "show active" : ""
              }`}
            >
              <div className="row">
                <ClassList
                  count={count}
                  isLoading={isLoading}
                  classes={tutorSupportClasses}
                  classType="Tutor Support"
                  message="No Tuotor Support Classes Available !!, Please Schedule Your Classes"
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
                  classes={tutorClasses}
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

export default TutorSupport;
