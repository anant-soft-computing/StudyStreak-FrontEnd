import React, { useState } from "react";
import DASideBar from "../DASideBar/DASideBar";
import CreateBadge from "./CreateBadge";
import ViewBadges from "./ViewBadges";

const Badge = () => {
  const [activeTab, setActiveTab] = useState("viewBadge");

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
                <div className="col-xl-9 col-lg-9 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Badge</h4>
                    </div>
                    <div className="row">
                      <div
                        className="col-xl-12 aos-init aos-animate"
                        data-aos="fade-up"
                      >
                        <ul
                          className="nav  about__button__wrap dashboard__button__wrap"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              className={`single__tab__link common-background-color-across-app ${
                                activeTab === "viewBadge" ? "active" : ""
                              }`}
                              onClick={() => handleTabChange("viewBadge")}
                            >
                              View Badge
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={`single__tab__link common-background-color-across-app ${
                                activeTab === "createBadge" ? "active" : ""
                              }`}
                              onClick={() => handleTabChange("createBadge")}
                            >
                              Create Badge
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="tab-content tab__content__wrapper aos-init aos-animate"
                        id="myTabContent"
                        data-aos="fade-up"
                      >
                        <div
                          className={`tab-pane fade ${
                            activeTab === "createBadge" ? "show active" : ""
                          }`}
                          id="projects__one"
                        >
                          <div className="row">
                            <CreateBadge />
                          </div>
                        </div>
                        <div
                          className={`tab-pane fade ${
                            activeTab === "viewBadge" ? "show active" : ""
                          }`}
                          id="projects__one"
                        >
                          <div className="row">
                            <ViewBadges key={activeTab} />
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

export default Badge;