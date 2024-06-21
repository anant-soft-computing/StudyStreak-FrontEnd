import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState();
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();

  const getStudentId = async () => {
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
        setUserId(response?.data?.id);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setProfileData((prevData) => {
      if (type === "file") {
        return {
          ...prevData,
          [name]: files[0],
        };
      }
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleUpdateInfo = async () => {
    try {
      const formData = new FormData();

      Object.entries(profileData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (profileData.imageFile) {
        formData.append("user_image", profileData.imageFile);
      }

      const response = await ajaxCall(
        `/studentretupddelview/${userId}/`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "PATCH",
          body: formData,
        },
        8000
      );
      if (response.status === 200) {
        toast.success("Profile Updated Successfully");
        navigate("/studentProfile");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getProfileData = async () => {
    try {
      const response = await ajaxCall(
        `/studentretupddelview/${userId}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "PATCH",
        },
        8000
      );
      if (response.status === 200) {
        setProfileData(response?.data);
      } else {
        console.log("---error---->");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getStudentId();
  }, []);

  useEffect(() => {
    if (userId) {
      getProfileData();
    }
  }, [userId]);

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={profileData?.user?.first_name}
                  name="user.first_name"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={profileData?.user?.last_name}
                  onChange={handleInputChange}
                  name="user.last_name"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>User Name</label>
                <input
                  type="text"
                  placeholder="User Name"
                  value={profileData?.user?.username}
                  onChange={handleInputChange}
                  name="user.username"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Phone No</label>
                <input
                  type="text"
                  placeholder="Phone No"
                  value={profileData?.phone_no}
                  onChange={handleInputChange}
                  name="phone_no"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Whatsapp No</label>
                <input
                  type="text"
                  placeholder="Whatsapp No"
                  value={profileData?.whatsapp_no}
                  onChange={handleInputChange}
                  name="whatsapp_no"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Gender</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>City</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Vadodara">Vadodara</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Surat">Surat</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>State</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Country</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Country Interested In</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Last Education</label>
                <input
                  type="text"
                  placeholder="Last Education"
                  value={profileData?.last_education}
                  onChange={handleInputChange}
                  name="last_education"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Interested In Visa Counselling</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Image</label>
                <input
                  type="file"
                  name="imageFile"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <strong>Exams Taken Before</strong>
            <div className="d-flex flex-wrap gap-4">
              <div className="form__check mt-2">
                <label>IETLS</label>{" "}
                <input
                  type="checkbox"
                  checked={profileData?.ielts_taken_before}
                  onChange={handleInputChange}
                  name="ielts_taken_before"
                />
              </div>
              <div className="form__check mt-2">
                <label>Duolingo</label>{" "}
                <input
                  type="checkbox"
                  checked={profileData?.duolingo_taken_before}
                  onChange={handleInputChange}
                  name="duolingo_taken_before"
                />
              </div>
              <div className="form__check mt-2">
                <label>PTE</label>{" "}
                <input
                  type="checkbox"
                  checked={profileData?.pte_taken_before}
                  onChange={handleInputChange}
                  name="pte_taken_before"
                />
              </div>
              <div className="form__check mt-2">
                <label>TOEFL</label>{" "}
                <input
                  type="checkbox"
                  checked={profileData?.toefl_taken_before}
                  onChange={handleInputChange}
                  name="toefl_taken_before"
                />
              </div>
              <div className="form__check mt-2">
                <label>GRE</label>{" "}
                <input
                  type="checkbox"
                  checked={profileData?.gre_taken_before}
                  onChange={handleInputChange}
                  name="gre_taken_before"
                />
              </div>
              <div className="form__check mt-2">
                <label>GMAT</label>{" "}
                <input
                  type="checkbox"
                  checked={profileData?.gmat_taken_before}
                  onChange={handleInputChange}
                  name="gmat_taken_before"
                />
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Reference By</label>
                <textarea
                  id=""
                  cols="10"
                  rows="3"
                  value={profileData?.reference_by}
                  onChange={handleInputChange}
                  name="reference_by"
                >
                  Reference By
                </textarea>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Remark</label>
                <textarea
                  id=""
                  cols="10"
                  rows="3"
                  value={profileData?.remark}
                  onChange={handleInputChange}
                  name="remark"
                >
                  Remark
                </textarea>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Biography</label>
                <textarea
                  id=""
                  cols="10"
                  rows="3"
                  value={profileData?.biography}
                  onChange={handleInputChange}
                  name="biography"
                >
                  Biography
                </textarea>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__button">
              <button className="default__button" onClick={handleUpdateInfo}>
                Update Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
