import React, { useEffect, useState } from "react";
import moment from "moment";
import ajaxCall from "../../../../helpers/ajaxCall";
import RegularClassList from "./RegularClassList";
import Tab from "../../../UI/Tab";
import RecordedClass from "../Classes/RecordedClass";

const tabs = [{ name: "Regular" }, { name: "Recorded Class" }];

const RegularClass = ({ selectedDateRange }) => {
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));
  const [uuid, setUuid] = useState([]);
  const [regularClass, setRegularClass] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Regular");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const regularClassData = [];
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
            const classData = response?.data?.filter(
              (item) => item?.liveclasstype?.name === "Regular Class"
            );
            const id = response?.data.map((item) => item?.other_fields?.id);
            uuidData.push(...id);
            regularClassData.push(...classData);
            setIsLoading(false);
          } else {
            console.log("error");
            setIsLoading(false);
          }
        }
        setUuid(uuidData);
        setRegularClass(regularClassData);
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      }
    })();
  }, []);

  const regularClasses = () => {
    return regularClass.filter(({ start_time }) => {
      const classDate = moment(start_time).format("YYYY-MM-DD");
      const { startDate, endDate } = selectedDateRange?.[0];
      if (startDate && !endDate) {
        return classDate === moment(startDate).format("YYYY-MM-DD");
      }
      return (
        (!startDate || classDate >= moment(startDate).format("YYYY-MM-DD")) &&
        (!endDate || classDate <= moment(endDate).format("YYYY-MM-DD"))
      );
    });
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
                  activeTab={activeTab}
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
