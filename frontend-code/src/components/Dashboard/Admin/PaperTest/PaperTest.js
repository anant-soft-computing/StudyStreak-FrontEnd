import React, { useState } from "react";
import DASideBar from "../DASideBar/DASideBar";
import Tab from "../../../UI/Tab";
import ViewPaperTest from "./ViewPaperTest";
import CreatePaperTest from "./CreatePaperTest";

const tabs = [{ name: "View Paper Test" }, { name: "Create Paper Test" }];

const PaperTest = () => {
  const [activeTab, setActiveTab] = useState("View Paper Test");

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
                      <h4>Paper Test</h4>
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
                            activeTab === "View Paper Test" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <ViewPaperTest
                              key={activeTab}
                              activeTab={activeTab}
                            />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "Create Paper Test"
                              ? "show active"
                              : ""
                          }`}
                        >
                          <div className="row">
                            <CreatePaperTest setActiveTab={setActiveTab} />
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

export default PaperTest;
