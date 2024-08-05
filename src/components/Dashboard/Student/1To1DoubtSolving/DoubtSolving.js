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

const DoubtSolving = ({ count, solvingClassBook, selectedDateRange }) => {
  const [uuid, setUuid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [doubtSolvingClass, setDoubtSolvingClass] = useState([]);
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const oToclass = [];
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
            setIsLoading(false);
            const oToclassData = response?.data?.filter(
              (item) => item?.liveclasstype?.name === "One-To-One-Doubt-Solving"
            );
            const id = oToclassData?.map((item) => item?.other_fields?.id);
            uuidData.push(...id);
            oToclass.push(...oToclassData);
          } else {
            setIsLoading(false);
            console.log("error");
          }
        }
        setUuid(uuidData);
        setDoubtSolvingClass(oToclass);
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      }
    })();
  }, []);

  const doubtSolvingClasses = () => {
    return doubtSolvingClass?.filter(({ start_time, end_time }) =>
      filterByDateRange(start_time, end_time, selectedDateRange)
    );
  };

  const oneToOneDoubtSolvingClasses = doubtSolvingClasses()?.filter((item) => {
    return solvingClassBook?.some((index) => index.id === item.id);
  });

  const bookClass = solvingClassBook?.map((item) => item?.id);
  const oToclasses = doubtSolvingClasses()?.filter(
    (item) => !bookClass?.includes(item?.id)
  );

  return (
    <div>
      {count === 0 ? (
        <BuyCourse message="No One To One Doubt Solving Class Available , Please Buy a Course !!" />
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
                  classes={oneToOneDoubtSolvingClasses}
                  message="No Upcomming One To One Doubt Solving Classes Available Today !! , Please Schedule Your Classes."
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
                  isLoading={isLoading}
                  classes={oToclasses}
                  message=" No One To One Doubt Solving Classes Available Today !! , Please Schedule Your Classes."
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
                  classes={oneToOneDoubtSolvingClasses}
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

export default DoubtSolving;
