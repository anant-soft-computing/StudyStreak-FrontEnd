import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../UI/Loading";
import CheckIcon from "../../UI/CheckIcon";
import CancelIcon from "../../UI/CancelIcon";
import DSSidebar from "./DSSideBar/DSSideBar";
import ajaxCall from "../../../helpers/ajaxCall";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();
  const updateProfile = () => {
    navigate("/studentSettings", { state: { profileData } });
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/studentview/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setProfileData(response?.data);
        }
      } catch (error) {
        console.log("error:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                <div className="col-xl-12 col-lg-12 col-md-12">
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
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <div className="d-flex">
                        <div className="row">
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              First Name:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.user?.first_name}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Last Name:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.user?.last_name}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Username:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.user?.username}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Email:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.user?.email}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Phone No.:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.phone_no}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Whatsapp No.:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.whatsapp_no}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Last Education:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.last_education}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Biography:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.biography}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Gender:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.gender}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              City:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.city?.name}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              State:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.state?.name}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Country:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.country?.name}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Remark:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.remark}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Reference By:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.reference_by}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Referal Code:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.referal_code}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Interested In Visa Counselling:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.interested_in_visa_counselling ===
                              "Yes" ? (
                                <CheckIcon />
                              ) : (
                                <CancelIcon />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="dashboard__content__wraper">
                    <div className="dashboard__section__title">
                      <h4>Exam Taken Before</h4>
                    </div>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <div className="d-flex">
                        <div className="row">
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              IELTS:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.ielts_taken_before ? (
                                <CheckIcon />
                              ) : (
                                <CancelIcon />
                              )}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              Duolingo:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.duolingo_taken_before ? (
                                <CheckIcon />
                              ) : (
                                <CancelIcon />
                              )}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              PTE:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.pte_taken_before ? (
                                <CheckIcon />
                              ) : (
                                <CancelIcon />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              TOFEL:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.toefl_taken_before ? (
                                <CheckIcon />
                              ) : (
                                <CancelIcon />
                              )}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              GRE:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.gre_taken_before ? (
                                <CheckIcon />
                              ) : (
                                <CancelIcon />
                              )}
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-4">
                            <div className="dashboard__form dashboard__form__margin">
                              GMAT:
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-8">
                            <div className="dashboard__form dashboard__form__margin">
                              {profileData?.gmat_taken_before ? (
                                <CheckIcon />
                              ) : (
                                <CancelIcon />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
