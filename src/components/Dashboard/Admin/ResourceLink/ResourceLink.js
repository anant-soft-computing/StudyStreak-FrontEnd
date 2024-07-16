import React, { useState } from "react";
import DASideBar from "../DASideBar/DASideBar";
import Tab from "../../../UI/Tab";
import CreateResourceLink from "./CreateResourceLink";
import ViewResourceLink from "./ViewResourceLink";

const tabs = [{ name: "View Resource Link" }, { name: "Create Resource Link" }];

const ResourceLink = () => {
  const [activeTab, setActiveTab] = useState("View Resource Link");

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
                      <h4>Resource Link</h4>
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
                            activeTab === "Create Resource Link"
                              ? "show active"
                              : ""
                          }`}
                        >
                          <div className="row">
                            <CreateResourceLink setActiveTab={setActiveTab} />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "View Resource Link"
                              ? "show active"
                              : ""
                          }`}
                        >
                          <div className="row">
                            <ViewResourceLink
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

export default ResourceLink;
