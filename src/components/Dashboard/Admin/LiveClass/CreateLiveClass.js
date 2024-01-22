import React from "react";
import SingleSelection from "../../../UI/SingleSelect";

const CreateLiveClass = () => {
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Batch</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Meeting Title</label>
                <input type="text" placeholder="Meeting Title" />
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
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Meeting ID</label>
                <input type="text" placeholder="Meeting ID" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Meeting Password</label>
                <input type="text" placeholder="Meeting Password" />
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label for="#">Meeting Description</label>
                <textarea id="" cols="10" rows="3">
                  Meeting Description
                </textarea>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__button">
              <button className="default__button">Create LiveClass</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLiveClass;
