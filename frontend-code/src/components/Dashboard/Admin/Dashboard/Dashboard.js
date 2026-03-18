import React from "react";
import DASideBar from "../DASideBar/DASideBar";
import counter1 from "../../../../img/counter/counter__1.png";
import counter2 from "../../../../img/counter/counter__2.png";
import counter3 from "../../../../img/counter/counter__3.png";
import counter4 from "../../../../img/counter/counter__4.png";

const Dashboard = () => {
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
                      <h4>Dashboard</h4>
                    </div>
                    <div className="row">
                      <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                        <div className="dashboard__single__counter">
                          <div className="counterarea__text__wraper">
                            <div className="counter__img">
                              <img src={counter1} alt="counter" />
                            </div>
                            <div className="counter__content__wraper">
                              <div className="counter__number">
                                <span className="counter">900</span>+
                              </div>
                              <p>Enrolled Courses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                        <div className="dashboard__single__counter">
                          <div className="counterarea__text__wraper">
                            <div className="counter__img">
                              <img src={counter2} alt="counter" />
                            </div>
                            <div className="counter__content__wraper">
                              <div className="counter__number">
                                <span className="counter">500</span>+
                              </div>
                              <p>Active Courses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                        <div className="dashboard__single__counter">
                          <div className="counterarea__text__wraper">
                            <div className="counter__img">
                              <img src={counter3} alt="counter" />
                            </div>
                            <div className="counter__content__wraper">
                              <div className="counter__number">
                                <span className="counter">300</span>k
                              </div>
                              <p>Complete Courses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                        <div className="dashboard__single__counter">
                          <div className="counterarea__text__wraper">
                            <div className="counter__img">
                              <img src={counter4} alt="counter" />
                            </div>
                            <div className="counter__content__wraper">
                              <div className="counter__number">
                                <span className="counter">1500</span>+
                              </div>
                              <p>Total Courses</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                        <div className="dashboard__single__counter">
                          <div className="counterarea__text__wraper">
                            <div className="counter__img">
                              <img src={counter3} alt="counter" />
                            </div>
                            <div className="counter__content__wraper">
                              <div className="counter__number">
                                <span className="counter">30</span>k
                              </div>
                              <p>Total Students</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                        <div className="dashboard__single__counter">
                          <div className="counterarea__text__wraper">
                            <div className="counter__img">
                              <img src={counter4} alt="counter" />
                            </div>
                            <div className="counter__content__wraper">
                              <div className="counter__number">
                                <span className="counter">90,000</span>K+
                              </div>
                              <p>Total Earning</p>
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
      </div>
    </div>
  );
};

export default Dashboard;
