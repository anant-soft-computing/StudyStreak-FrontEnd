import React from "react";
import DASideBar from "../DASideBar/DASideBar";

const Profile = () => {
  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DASideBar />
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>My Profile</h4>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-4">
                        <div className="dashboard__form">
                          Registration Date:
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8">
                        <div className="dashboard__form">
                          20, January 2024 9:00 PM
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="dashboard__form dashboard__form__margin">
                          First Name:
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8">
                        <div className="dashboard__form dashboard__form__margin">
                          Michle
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="dashboard__form dashboard__form__margin">
                          Last Name:
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8">
                        <div className="dashboard__form dashboard__form__margin">
                          Obema
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="dashboard__form dashboard__form__margin">
                          Username:
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8">
                        <div className="dashboard__form dashboard__form__margin">
                          obema007
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="dashboard__form dashboard__form__margin">
                          Email:
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8">
                        <div className="dashboard__form dashboard__form__margin">
                          obema@example.com
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="dashboard__form dashboard__form__margin">
                          Phone Number:
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8">
                        <div className="dashboard__form dashboard__form__margin">
                          +55 669 4456 25987
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="dashboard__form dashboard__form__margin">
                          Expert:
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8">
                        <div className="dashboard__form dashboard__form__margin">
                          Graphics Design
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <div className="dashboard__form dashboard__form__margin">
                          Biography:
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-8">
                        <div className="dashboard__form dashboard__form__margin">
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Maiores veniam, delectus accusamus nesciunt
                          laborum repellat laboriosam, deserunt possimus itaque
                          iusto perferendis voluptatum quaerat cupiditate vitae.
                          Esse aut illum perferendis nulla, corporis impedit
                          quasi alias est!
                        </div>
                      </div>
                    </div>
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

export default Profile;
