import React from "react";
import Footer from "../../Footer";
import DarkNight from "../../DarkNight";
import TopBar from "../../Topbar";
import Navbar from "../../Navbar";
import DINavBar from "./DINavBar/DINavBar";
import DISidebar from "./DISidebar/DISidebar";

const InstructorOrderHistory = () => {
  return (
    <>
      <DarkNight />
      <TopBar />
      <Navbar />
      <div className="body__wrapper">
        <div className="theme__shadow__circle"></div>
        <div className="theme__shadow__circle shadow__right"></div>
        <div className="main_wrapper overflow-hidden">
          <div className="dashboardarea sp_bottom_100">
            <DINavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DISidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Order History</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="dashboard__table table-responsive">
                            <table>
                              <thead>
                                <tr>
                                  <th>Order ID</th>
                                  <th>Course Name</th>
                                  <th>Date</th>
                                  <th>Price</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>#5478</th>
                                  <td>App Development</td>
                                  <td>January 27, 2023</td>
                                  <td>$100.99</td>
                                  <td>
                                    <span className="dashboard__td">
                                      Success
                                    </span>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>#4585</th>
                                  <td>Graphic</td>
                                  <td>May 27, 2023</td>
                                  <td>$200.99</td>
                                  <td>
                                    <span className="dashboard__td dashboard__td__2">
                                      Processing
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>#9656</th>
                                  <td>App Development</td>
                                  <td>January 27, 2023</td>
                                  <td>$100.99</td>
                                  <td>
                                    <span className="dashboard__td">
                                      On Hold
                                    </span>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>#4585</th>
                                  <td>Graphic</td>
                                  <td>May 27, 2023</td>
                                  <td>$200.99</td>
                                  <td>
                                    <span className="dashboard__td dashboard__td__2">
                                      Canceled
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>#9656</th>
                                  <td>App Development</td>
                                  <td>January 27, 2023</td>
                                  <td>$100.99</td>
                                  <td>
                                    <span className="dashboard__td">
                                      On Hold
                                    </span>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>#4585</th>
                                  <td>Graphic</td>
                                  <td>May 27, 2023</td>
                                  <td>$200.99</td>
                                  <td>
                                    <span className="dashboard__td dashboard__td__2">
                                      Canceled
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>#9656</th>
                                  <td>App Development</td>
                                  <td>January 27, 2023</td>
                                  <td>$100.99</td>
                                  <td>
                                    <span className="dashboard__td">
                                      On Hold
                                    </span>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>#4585</th>
                                  <td>Graphic</td>
                                  <td>May 27, 2023</td>
                                  <td>$200.99</td>
                                  <td>
                                    <span className="dashboard__td dashboard__td__2">
                                      Canceled
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>#5478</th>
                                  <td>App Development</td>
                                  <td>January 27, 2023</td>
                                  <td>$100.99</td>
                                  <td>
                                    <span className="dashboard__td">
                                      Success
                                    </span>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>#4585</th>
                                  <td>Graphic</td>
                                  <td>May 27, 2023</td>
                                  <td>$200.99</td>
                                  <td>
                                    <span className="dashboard__td dashboard__td__2">
                                      Processing
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>#9656</th>
                                  <td>App Development</td>
                                  <td>January 27, 2023</td>
                                  <td>$100.99</td>
                                  <td>
                                    <span className="dashboard__td">
                                      On Hold
                                    </span>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>#4585</th>
                                  <td>Graphic</td>
                                  <td>May 27, 2023</td>
                                  <td>$200.99</td>
                                  <td>
                                    <span className="dashboard__td dashboard__td__2">
                                      Canceled
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>#9656</th>
                                  <td>App Development</td>
                                  <td>January 27, 2023</td>
                                  <td>$100.99</td>
                                  <td>
                                    <span className="dashboard__td">
                                      On Hold
                                    </span>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>#4585</th>
                                  <td>Graphic</td>
                                  <td>May 27, 2023</td>
                                  <td>$200.99</td>
                                  <td>
                                    <span className="dashboard__td dashboard__td__2">
                                      Canceled
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <th>#9656</th>
                                  <td>App Development</td>
                                  <td>January 27, 2023</td>
                                  <td>$100.99</td>
                                  <td>
                                    <span className="dashboard__td">
                                      On Hold
                                    </span>
                                  </td>
                                </tr>
                                <tr className="dashboard__table__row">
                                  <th>#4585</th>
                                  <td>Graphic</td>
                                  <td>May 27, 2023</td>
                                  <td>$200.99</td>
                                  <td>
                                    <span className="dashboard__td dashboard__td__2">
                                      Canceled
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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
      <Footer />
    </>
  );
};

export default InstructorOrderHistory;
