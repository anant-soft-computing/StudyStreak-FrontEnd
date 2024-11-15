import React, { useState } from "react";
import DASideBar from "../DASideBar/DASideBar";
import CreateGamification from "./CreateGamification";
import ViewGamification from "./ViewGamification";
import Tab from "../../../UI/Tab";

const tabs = [{ name: "View Gamification" }, { name: "Create Gamification" }];

const options = [
  { value: "Flash Card", label: "Flash Card" },
  { value: "Lesson", label: "Lesson" },
  { value: "Exam Block", label: "Mock Test" },
  { value: "Full Length Test", label: "Full Length Test" },
  { value: "Practice Test", label: "Practice Test" },
  { value: "Live Class", label: "Live Class" },
];

const Gamification = () => {
  const [activeTab, setActiveTab] = useState("View Gamification");
  const [content, setContent] = useState("Flash Card");

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
                      <h4>Gamification</h4>
                      {activeTab === "View Gamification" && (
                        <div className="col-xl-2">
                          <div className="dashboard__form__wraper">
                            <div className="dashboard__form__input">
                              <label>Content</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                              >
                                {options.map((option) => (
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
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
                            activeTab === "Create Gamification"
                              ? "show active"
                              : ""
                          }`}
                        >
                          <div className="row">
                            <CreateGamification setActiveTab={setActiveTab} />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "View Gamification"
                              ? "show active"
                              : ""
                          }`}
                        >
                          <div className="row">
                            <ViewGamification
                              key={activeTab}
                              content={content}
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

export default Gamification;
