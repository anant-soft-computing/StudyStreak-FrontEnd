import React from "react";

const Tab = ({ tabs, activeTab, handleTabChange }) => {
  return (
    <div className="col-xl-12 aos-init aos-animate">
      <ul
        className="nav about__button__wrap dashboard__button__wrap"
        id="myTab"
        role="tablist"
      >
        {tabs.map((tab, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`single__tab__link common-background-color-across-app ${
                activeTab === tab.name ? "active" : ""
              }`}
              onClick={() => handleTabChange(tab.name)}
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tab;
