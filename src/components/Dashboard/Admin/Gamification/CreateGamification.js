import React from "react";
import SingleSelection from "../../../UI/SingleSelect";

const CreateGamification = () => {
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Content Type</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Object ID</label>
                <input type="number" placeholder="Object ID" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Points</label>
                <input type="number" placeholder="Gamification Points" />
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__button">
              <button className="default__button">Create Gamification</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGamification;
