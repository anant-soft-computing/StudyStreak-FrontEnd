import React, { useState } from "react";
import Tab from "../../UI/Tab";
import CreatePTEPT from "./CreatePTEPT/CreatePTEPT";
import CreateMock from "./CreateMock/CreateMock";

const tabs = [{ name: "Create PT" }, { name: "Create Mock" }];

const PTEMockTest = ({ primaryTab }) => {
  const [activeTab, setActiveTab] = useState("Create PT");

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
            activeTab === "Create PT" ? "show active" : ""
          }`}
        >
          <CreatePTEPT activeTab={activeTab} setActiveTab={setActiveTab} category="PTE" />
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Create Mock" ? "show active" : ""
          }`}
        >
          <CreateMock activeTab={activeTab} primaryTab={primaryTab} />
        </div>
      </div>
    </div>
  );
};

export default PTEMockTest;
