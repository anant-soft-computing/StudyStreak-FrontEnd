import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import RegularClassList from "./RegularClassList";
import Tab from "../../../UI/Tab";
import RecordedClass from "../Classes/RecordedClass";
import { useLocation } from "react-router-dom";
import { filterByDateRange } from "../Classes/filterByDateRange";

const tabs = [{ name: "Regular" }, { name: "Recorded Class" }];

const RegularClass = ({ selectedDate, onDataFetch }) => {
  const location = useLocation();

  const [uuid, setUuid] = useState([]);
  const [regularClass, setRegularClass] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(
    location?.state?.activeTab === "Recorded Class"
      ? "Recorded Class"
      : "Regular"
  );

  const batchIds = JSON?.parse(localStorage.getItem("BatchIds"));
  const courseIds = JSON?.parse(localStorage.getItem("courses"));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        let regularClassData = [];
        let uuidData = [];

        if (batchIds?.length) {
          for (let i = 0; i < batchIds.length; i++) {
            const batchId = batchIds[i];
            const response = await ajaxCall(
              `/liveclass_listwithid_view/${batchId}/?live_class_type=Regular Class`,
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
              regularClassData = [...regularClassData, ...response?.data];
            }
          }
        }

        if (courseIds?.length) {
          for (let j = 0; j < courseIds.length; j++) {
            const courseId = courseIds[j];
            const response = await ajaxCall(
              `/liveclass-withcourseid/${courseId}/?live_class_type=Regular Class`,
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
              regularClassData = [...regularClassData, ...response?.data];
            }
          }
        }

        // Optionally: Remove duplicates based on unique identifiers
        regularClassData = [
          ...new Map(regularClassData.map((item) => [item.id, item])).values(),
        ];
        uuidData = [...new Set(uuidData)];

        setUuid(uuidData);
        onDataFetch(regularClassData);
        setRegularClass(regularClassData);
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const regularClasses = () => {
    return regularClass.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDate)
    );
  };

  return (
    <>
      <div>
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
                  classes={regularClasses()}
                  activeTab="Recorded Class"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegularClass;
