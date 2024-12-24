import React, { useState } from "react";
import ViewMT from "./ViewMT";
import ViewPT from "./ViewPT";
import ViewFLT from "./ViewFLT";
import Tab from "../../../UI/Tab";

const tabs = [{ name: "View MT" }, { name: "View PT" }, { name: "View FLT" }];

const ViewExam = () => {
  const [activeTab, setActiveTab] = useState("View MT");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Tab
        tabs={tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <div className="tab-content tab__content__wrapper aos-init aos-animate">
        <div
          className={`tab-pane fade ${
            activeTab === "View MT" ? "show active" : ""
          }`}
        >
          <ViewMT activeTab={activeTab} />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "View PT" ? "show active" : ""
          }`}
        >
          <ViewPT activeTab={activeTab} />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "View FLT" ? "show active" : ""
          }`}
        >
          <ViewFLT activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

export default ViewExam;
