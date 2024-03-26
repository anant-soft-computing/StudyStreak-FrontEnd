import React, { useState } from "react";
import LeaderBoard from "./LeaderBoard";
import PointHistory from "./PointHistory";

const DashboardContent = () => {
  const [activeTab, setActiveTab] = useState("leaderBoard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard__content__wraper common-background-color-across-app">
      <div className="row">
        <div className="col-xl-12 aos-init aos-animate" data-aos="fade-up">
          <ul
            className="nav  about__button__wrap dashboard__button__wrap"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className={`single__tab__link common-background-color-across-app ${
                  activeTab === "leaderBoard" ? "active" : ""
                }`}
                onClick={() => handleTabChange("leaderBoard")}
              >
                Leader Board
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`single__tab__link common-background-color-across-app ${
                  activeTab === "pointHistory" ? "active" : ""
                }`}
                onClick={() => handleTabChange("pointHistory")}
              >
                Point History
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
              activeTab === "leaderBoard" ? "show active" : ""
            }`}
            id="projects__one"
          >
            <div className="row">
              <LeaderBoard />
            </div>
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "pointHistory" ? "show active" : ""
            }`}
            id="projects__one"
          >
            <div className="row">
              <PointHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
