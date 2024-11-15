import React, { useState } from "react";
import Tab from "../../../UI/Tab";
import DSSidebar from "../DSSideBar/DSSideBar";
import MiniTestReport from "./MiniTestReport/MiniTestReport";
import PracticeTestReport from "./PracticeTestReport/PracticeTestReport";
import FullLengthTestReport from "./FullLengthTestReport/FullLengthTestReport";

const Report = () => {
  const category = localStorage.getItem("category");
  const [activeTab, setActiveTab] = useState("Mini Test");

  const tabs =
    category === "GENERAL"
      ? [{ name: "Mini Test" }, { name: "Practice Test" }]
      : [
          { name: "Mini Test" },
          { name: "Practice Test" },
          { name: "Full Length Test" },
        ];

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
                <DSSidebar />
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Reports</h4>
                      {category && <h5>Course : {category}</h5>}
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
                            activeTab === "Mini Test" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <MiniTestReport activeTab={activeTab} />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "Practice Test" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <PracticeTestReport activeTab={activeTab} />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "Full Length Test"
                              ? "show active"
                              : ""
                          }`}
                        >
                          <div className="row">
                            <FullLengthTestReport activeTab={activeTab} />
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

export default Report;
