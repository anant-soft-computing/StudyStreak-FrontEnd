import React from "react";
import TopBar from "../../TopBar/TopBar";
import { Navbar } from "react-bootstrap";
import Footer from "../../Footer/Footer";
import DSNavBar from "./DSNavBar/DSNavBar";
import DSSidebar from "./DSSideBar/DSSideBar";
import { useNavigate } from "react-router-dom";
import { cancelIcon, checkIcon } from "../../CourseDetail/PackageDetails";

const Profile = () => {
  const navigate = useNavigate();
  const updateProfile = () => {
    navigate("/dashboard/student-settings");
  };

  return (
    <div>
      <TopBar />
      <Navbar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="dashboardarea sp_bottom_100">
            <DSNavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>My Profile</h4>
                        <button
                          className="default__button"
                          onClick={updateProfile}
                        >
                          Update Profile
                        </button>
                      </div>
                      <div className="d-flex">
                        <div className="row">
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              First Name
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              Michle
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Last Name
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              Obema
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Username
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              obema007
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Email
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              obema@example.com
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Phone No
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              +55 669 4456 25987
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Whatsapp No
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              +91 982 589 2258
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Last Education
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              10 Jan 2024
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Bio
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              I am ReactJS Developer
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Gender
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              Male
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              City
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              Vadodara
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              State
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              Gujarat
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Country
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              India
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Country Interested
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              India
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Remark
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              I am Student
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Reference By
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              Annat Soft Computing
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Interested In Visa Counselling
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {cancelIcon()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Exam Taken Before</h4>
                      </div>
                      <div className="col-xl-12">
                        <div className="dashboard__table table-responsive">
                          <table>
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Yes / No</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th>
                                  <div>1.</div>
                                </th>
                                <td>IELTS</td>
                                <td>
                                  <div className="dashboard__table__star">
                                    {checkIcon()}
                                  </div>
                                </td>
                              </tr>
                              <tr className="dashboard__table__row">
                                <th>
                                  <div>2.</div>
                                </th>
                                <td>Duolingo</td>
                                <td>
                                  <div className="dashboard__table__star">
                                    {cancelIcon()}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th>
                                  <div>3.</div>
                                </th>
                                <td>TOFEL</td>
                                <td>
                                  <div className="dashboard__table__star">
                                    {checkIcon()}
                                  </div>
                                </td>
                              </tr>
                              <tr className="dashboard__table__row">
                                <th>
                                  <div>4.</div>
                                </th>
                                <td>GRE</td>
                                <td>
                                  <div className="dashboard__table__star">
                                    {cancelIcon()}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <th>
                                  <div>5.</div>
                                </th>
                                <td>GMAT</td>
                                <td>
                                  <div className="dashboard__table__star">
                                    {checkIcon()}
                                  </div>
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
      <Footer />
    </div>
  );
};

export default Profile;
