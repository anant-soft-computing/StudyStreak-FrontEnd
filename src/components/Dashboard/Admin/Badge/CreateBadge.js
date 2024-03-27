import React from "react";
import SingleSelection from "../../../UI/SingleSelect";
import SelectionBox from "../../../UI/SelectionBox";

const CreateBadge = () => {
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Badge Name</label>
                <input type="text" placeholder="Badge Name" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Badge Points</label>
                <input type="number" placeholder="Badge Points" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Gamification</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection />
            </div>
          </div>
          <div className="col-xl-6 mb-4">
            <div className="dashboard__select__heading">
              <span>Next Badge</span>
            </div>
            <div className="dashboard__selector">
              <SelectionBox multiple={true} />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Description</label>
                <textarea type="text" placeholder="Description" />
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__button">
              <button className="default__button">Create Badge</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBadge;