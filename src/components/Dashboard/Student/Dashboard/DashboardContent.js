import React, { useState } from "react";
import LeaderBoard from "./LeaderBoard";
import PointHistory from "./PointHistory";
import Tab from "../../../UI/Tab";

const tabs = [{ name: "Leader Board" }, { name: "Point History" }];

const DashboardContent = ({ batchData }) => {
  const [activeTab, setActiveTab] = useState("Leader Board");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const batchId = batchData.map((batch) => batch?.id);

  return (
    <div className="dashboard__content__wraper common-background-color-across-app">
      <div className="row">
        <Tab
          tabs={tabs}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
        />
        <div className="tab-content tab__content__wrapper aos-init aos-animate">
          <div
            className={`tab-pane fade ${
              activeTab === "Leader Board" ? "show active" : ""
            }`}
          >
            <div className="row">
              <LeaderBoard batchId={batchId} activeTab={activeTab} />
            </div>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "Point History" ? "show active" : ""
            }`}
          >
            <div className="row">
              <PointHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
