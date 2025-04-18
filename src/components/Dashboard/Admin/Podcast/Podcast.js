import React, { useState } from "react";
import Tab from "../../../UI/Tab";
import ViewPodcast from "./ViewPodcast";
import CreatePodcast from "./CreatePodcast";
import DASideBar from "../DASideBar/DASideBar";

const tabs = [{ name: "View Podcast" }, { name: "Create Podcast" }];

const Podcast = () => {
  const [activeTab, setActiveTab] = useState("View Podcast");

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
                      <h4>Podcast</h4>
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
                            activeTab === "Create Podcast" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <CreatePodcast setMainTab={setActiveTab} />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "View Podcast" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <ViewPodcast
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

export default Podcast;
