import React, { useState } from "react";
import DASideBar from "../DASideBar/DASideBar";
import Tab from "../../../UI/Tab";
import UploadLesson from "./UploadLesson";
import ViewLesson from "./ViewLesson";
import CreateSection from "./CreateSection";
import CreateLesson from "./CreateLesson";

const tabs = [
  { name: "Upload Lesson" },
  { name: "View Lesson" },
  { name: "Create Section" },
  { name: "Create Lesson" },
];

const Lesson = () => {
  const [activeTab, setActiveTab] = useState("Upload Lesson");

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
                      <h4>Lesson</h4>
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
                            activeTab === "Upload Lesson" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <UploadLesson />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "View Lesson" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <ViewLesson activeTab={activeTab} />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "Create Section" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <CreateSection />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "Create Lesson" ? "show active" : ""
                          }`}
                        >
                          <div className="row">
                            <CreateLesson
                              parentActiveTab={activeTab}
                              parentSetActiveTab={setActiveTab}
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

export default Lesson;
