import React from "react";
import dashboard2 from "../../../../img/dashbord/dashbord__2.jpg";

const DANavBar = () => {
  return (
    <div className="container-fluid full__width__padding">
      <div className="row">
        <div className="col-xl-12 mt-4">
          <div className="dashboardarea__wraper">
            <div className="dashboardarea__img">
              <div className="dashboardarea__inner">
                <div className="dashboardarea__left">
                  <div className="dashboardarea__left__img">
                    <img src={dashboard2} alt="" />
                  </div>
                  <div className="dashboardarea__left__content">
                    <h5>Hello</h5>
                    <h4>Admin</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DANavBar;
