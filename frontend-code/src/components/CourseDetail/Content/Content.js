import React from "react";
import Curriculum from "./Curriculum";
import Description from "./Description";
import Requirement from "./Requirement";
import Outcomes from "./Outcomes";

const tabs = [
  {
    title: "Curriculum",
    icon: "icofont-ebook",
    target: "projects__one",
    active: true,
  },
  {
    title: "Description",
    icon: "icofont-paper",
    target: "projects__two",
    active: false,
  },
  {
    title: "Requirements",
    icon: "icofont-newspaper",
    target: "projects__three",
    active: false,
  },
  {
    title: "Outcomes",
    icon: "icofont-outdent",
    target: "projects__four",
    active: false,
  },
];

const Content = ({ courseDetail }) => {
  return (
    <div className="course__details__tab__wrapper">
      <div className="row">
        <div className="col-xl-12">
          <ul className="nav course__tap__wrap" id="myTab" role="tablist">
            {tabs.map((tab, index) => (
              <li className="nav-item" role="presentation" key={index}>
                <button
                  className={`single__tab__link ${tab.active ? "active" : ""}`}
                  data-bs-toggle="tab"
                  data-bs-target={`#${tab.target}`}
                  type="button"
                >
                  <i className={tab.icon}></i> {tab.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="tab-content tab__content__wrapper">
        <Curriculum courseDetail={courseDetail} />
        <Description courseDetail={courseDetail} />
        <Requirement courseDetail={courseDetail} />
        <Outcomes courseDetail={courseDetail} />
      </div>
    </div>
  );
};

export default Content;