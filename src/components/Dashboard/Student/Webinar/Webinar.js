import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import List from "../Classes/List";
import Tab from "../../../UI/Tab";
import RecordedClass from "../Classes/RecordedClass";
import { filterByDateRange } from "../Classes/filterByDateRange";

const tabs = [{ name: "Webinar" }, { name: "Recorded Class" }];

const Webinar = ({ selectedDateRange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [uuid, setUuid] = useState([]);
  const [webinar, setWebinar] = useState([]);
  const [activeTab, setActiveTab] = useState("Webinar");
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const uuidData = [];
        const webinarData = [];
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
            const data = response?.data?.filter(
              (item) => item?.liveclasstype?.name === "Webinar"
            );
            const id = data?.map((item) => item?.other_fields?.id);
            uuidData.push(...id);
            webinarData.push(...data);
            setIsLoading(false);
          } else {
            console.log("error");
            setIsLoading(false);
          }
        }
        setUuid(uuidData);
        setWebinar(webinarData);
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const webinarData = () => {
    return webinar.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDateRange)
    );
  };

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
            activeTab === "Webinar" ? "show active" : ""
          }`}
        >
          <div className="row">
            <List
              isLoading={isLoading}
              classes={webinarData()}
              message="No Webinar Available Today !! , Please Schedule Your Webinar."
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
              classes={webinarData()}
              activeTab={activeTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webinar;
