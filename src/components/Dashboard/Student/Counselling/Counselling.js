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
  { name: "Counselling" },
  { name: "Recorded Class" },
];

const Counselling = ({ count, solvingClassBook, selectedDateRange }) => {
  const [uuid, setUuid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Counselling");
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));
  const [counselling, setCounselling] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const uuidData = [];
        const counsellingData = [];
        for (let i = 0; i < batchIds.length; i++) {
          const batchId = batchIds[i];
          const response = await ajaxCall(
            `/liveclass_listwithid_view/${batchId}/?live_class_type=Counselling`,
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
            counsellingData.push(...response?.data);
            setIsLoading(false);
          } else {
            console.log("error");
            setIsLoading(false);
          }
        }
        setUuid(uuidData);
        setCounselling(counsellingData);
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const counsellingData = () => {
    return counselling.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDateRange)
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
    <div>
      {count === 0 ? (
        <BuyCourse message="No Counselling Available, Please Buy a Course !!" />
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
                  classes={counsellinges}
                  message="No Upcoming Counselling Available Today !! , Please Schedule Your Counselling."
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
                  message="No Counselling Available Today !! , Please Schedule Your Counselling."
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
                  classes={counsellinges}
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

export default Counselling;
