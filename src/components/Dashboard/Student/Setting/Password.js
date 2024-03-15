import React from "react";
import { Link } from "react-router-dom";

const Password = () => {
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Current Password</label>
            <input type="text" placeholder="Current password" />
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>New Password</label>
            <input type="text" placeholder="New Password" />
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Re-Type New Password</label>
            <input type="text" placeholder="Re-Type New Password" />
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="dashboard__form__button">
          <Link className="default__button" to="#">
            Update Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Password;
