import React from "react";
import Curriculum from "./Curriculum";
import Description from "./Description";
import Requirement from "./Requirement";
import Outcomes from "./Outcomes";

const Content = ({ courseDetail }) => {
  return (
    <div className="course__details__tab__wrapper">
      <div className="row">
        <div className="col-xl-12">
          <ul className="nav course__tap__wrap" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="single__tab__link active"
                data-bs-toggle="tab"
                data-bs-target="#projects__two"
                type="button"
              >
                <i className="icofont-book-alt"></i>Curriculum
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="single__tab__link"
                data-bs-toggle="tab"
                data-bs-target="#projects__one"
                type="button"
              >
                <i className="icofont-paper"></i>Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="single__tab__link"
                data-bs-toggle="tab"
                data-bs-target="#projects__three"
                type="button"
              >
                <i className="icofont-newspaper"></i>
                Requirements
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="single__tab__link"
                data-bs-toggle="tab"
                data-bs-target="#projects__four"
                type="button"
              >
                <i className="icofont-outdent"></i>Outcomes
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content tab__content__wrapper" id="myTabContent">
        <Curriculum courseDetail={courseDetail} />
        <Description courseDetail={courseDetail} />
        <Requirement courseDetail={courseDetail} />
        <Outcomes courseDetail={courseDetail} />
      </div>
    </div>
  );
};

export default Content;