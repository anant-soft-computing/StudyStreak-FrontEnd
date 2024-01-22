import React from "react";
import SingleSelection from "../../../UI/SingleSelect";

const CreateBatch = () => {
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Package</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Batch Name</label>
                <input type="text" placeholder="Batch Name" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Start Date</label>
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Start Time</label>
                <input type="time" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">End Date</label>
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">End Time</label>
                <input type="time" />
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__button">
              <button className="default__button">Create Batch</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBatch;
