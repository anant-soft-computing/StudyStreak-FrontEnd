import React, { useState } from "react";
import CreateFlashCard from "./CreateFlashCard";
import ViewFlashCard from "./ViewFlashCard";
import DASideBar from "../DASideBar/DASideBar";
import Tab from "../../../UI/Tab";

const tabs = [{ name: "View FlashCard" }, { name: "Create FlashCard" }];

const FlashCard = () => {
  const [activeTab, setActiveTab] = useState("View FlashCard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DASideBar />
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Flash Card</h4>
                    </div>
                    <div className="row">
                      <Tab
                        tabs={tabs}
                        activeTab={activeTab}
                        handleTabChange={handleTabChange}
                      />
                      <div className="tab-content tab__content__wrapper aos-init aos-animate">
                        <div
                          className={`tab-pane fade ${
                            activeTab === "Create FlashCard"
                              ? "show active"
                              : ""
                          }`}
                        >
                          <div className="row">
                            <CreateFlashCard setActiveTab={setActiveTab} />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "View FlashCard" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <ViewFlashCard
                              key={activeTab}
                              activeTab={activeTab}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
