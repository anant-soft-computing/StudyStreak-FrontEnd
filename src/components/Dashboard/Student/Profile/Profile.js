import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../UI/Loading";
import CheckIcon from "../../../UI/CheckIcon";
import CancelIcon from "../../../UI/CancelIcon";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import SmallModal from "../../../UI/Modal";

const Profile = () => {
  const navigate = useNavigate();
  const category = localStorage.getItem("category");

  const [score, setScore] = useState({});
  const [course, setCourse] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [selectedCourse, setSelectedCourse] = useState("");
  const [expectedScore, setExpectedScore] = useState("");

  const updateProfile = () => {
    navigate("/studentSettings", { state: { profileData } });
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/studentview/",
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

  const fetchCourses = useCallback(async () => {
    try {
      const response = await ajaxCall(
        "/get-student-course/",
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
        setCourse(response?.data);
        setScore(
          response?.data.find((item) => item.course_category === category)
        );
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchCourses();
  }, [category, fetchCourses]);

  const addExpectedScore = async (e) => {
    e.preventDefault();

    if (!selectedCourse || !expectedScore) {
      toast.error("Please select a course and enter the expected score.");
      return;
    }

    const data = {
      expected_score: expectedScore,
    };

    try {
      const response = await ajaxCall(
        `/update-expected-course/${selectedCourse}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "PATCH",
          body: JSON.stringify(data),
        },
        8000
      );

      if (response.status === 200) {
        toast.success("Score Updated Successfully");
        await fetchCourses();
        setOpen(false);
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="dashboardarea sp_bottom_100">
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <div className="dashboard__content__wraper common-background-color-across-app">
                      <div className="dashboard__section__title">
                        <div className="d-flex align-items-center gap-2">
                          {profileData?.user_image ? (
                            <img
                              className="w-12 h-12 object-cover rounded-full"
                              src={profileData?.user_image}
                              alt={profileData?.user?.first_name}
                            />
                          ) : (
                            <div
                              class="rounded-circle bg-primary-100 d-flex align-items-center justify-content-center"
                              style={{
                                width: 48,
                                height: 48,
                                color: "#01579b",
                                fontWeight: "bold",
                                fontSize: "1.25rem",
                                border: "2px solid #01579b",
                              }}
                            >
                              {profileData?.user?.first_name.charAt(0) +
                                profileData?.user?.last_name.charAt(0)}
                            </div>
                          )}
                          <h4>
                            {profileData?.user?.first_name +
                              " " +
                              profileData?.user?.last_name}
                          </h4>
                        </div>
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
                            <div className="col-lg-4 col-md-4">
                              <div className="dashboard__form dashboard__form__margin">
                                Expected Score:
                              </div>
                            </div>
                            <div className="col-lg-8 col-md-8">
                              <div className="dashboard__form dashboard__form__margin">
                                {score?.expected_score === "0.0" ? (
                                  <button
                                    className="default__button"
                                    onClick={() => setOpen(true)}
                                  >
                                    Set Score
                                  </button>
                                ) : (
                                  score?.expected_score
                                )}
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
                                {profileData?.city}
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                              <div className="dashboard__form dashboard__form__margin">
                                State:
                              </div>
                            </div>
                            <div className="col-lg-8 col-md-8">
                              <div className="dashboard__form dashboard__form__margin">
                                {profileData?.state}
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                              <div className="dashboard__form dashboard__form__margin">
                                Country:
                              </div>
                            </div>
                            <div className="col-lg-8 col-md-8">
                              <div className="dashboard__form dashboard__form__margin">
                                {profileData?.country}
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
                            <div className="col-lg-4 col-md-4">
                              <div className="dashboard__form dashboard__form__margin">
                                Interested Country:
                              </div>
                            </div>
                            <div className="col-lg-8 col-md-8">
                              <div className="dashboard__form dashboard__form__margin">
                                {profileData?.country_interested_in?.name}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="dashboard__content__wraper common-background-color-across-app">
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
      <SmallModal
        size="lg"
        centered
        title="Add Expected Score"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="dashboard__select__heading">
              <span>Course</span>
            </div>
            <div className="dashboard__selector">
              <select
                className="form-select"
                aria-label="Default select example"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="" disabled>
                  Select a course
                </option>
                {course.map((item) => (
                  <option key={item.package_id} value={item.package_id}>
                    {item.course_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Expected Score</label>
                <input
                  type="text"
                  placeholder="Enter Expected Score"
                  value={expectedScore}
                  onChange={(e) => setExpectedScore(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end align-items-center gap-2">
            <button className="btn btn-success" onClick={addExpectedScore}>
              Save
            </button>
            <button className="btn btn-danger" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </SmallModal>
    </>
  );
};

export default Profile;
