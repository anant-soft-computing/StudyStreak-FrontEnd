import React from "react";
import dashboard2 from "../../../../img/dashbord/dashbord__2.jpg";

const DANavBar = () => {
  return (
    <div className="dashboardarea__inner">
      <div className="dashboardarea__left">
        <div className="dashboardarea__left__img">
          <img src={dashboard2} alt="" />
        </div>
        <div className="dashboardarea__left__content">
          <h4>Admin</h4>
        </div>
      </div>
    </div>
  );
};

export default DANavBar;
