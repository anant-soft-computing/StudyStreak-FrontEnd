import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import Tab from "../../../UI/Tab";
import ajaxCall from "../../../../helpers/ajaxCall";

const tabs = [
  { name: "Personal Information" },
  { name: "Contact Information" },
  { name: "Education Information" },
  { name: "Others Information" },
];

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [activeTab, setActiveTab] = useState("Personal Information");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryInterests, setCountryInterests] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    setSelectedCountry(countryName);

    setProfileData((prevData) => ({
      ...prevData,
      country: countryName,
    }));

    const country = countries.find((c) => c.name === countryName);
    if (country) {
      const states = State.getStatesOfCountry(country.isoCode);
      setStates(states);
    } else {
      setStates([]);
    }
    setCities([]);
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);

    setProfileData((prevData) => ({
      ...prevData,
      state: stateName,
    }));

    const state = states.find((s) => s.name === stateName);
    const country = countries.find((c) => c.name === selectedCountry);
    if (state && country) {
      const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
      setCities(cities);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;

    setProfileData((prevData) => ({
      ...prevData,
      city: cityName,
    }));
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

  const getStudentId = async () => {
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
        setUserId(response?.data?.id);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUpdateInfo = async () => {
    if (!profileData.user_image) {
      toast.error("Profile image is required.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("first_name", profileData.user.first_name);
      formData.append("last_name", profileData.user.last_name);
      formData.append("phone_no", profileData.phone_no);
      formData.append("whatsapp_no", profileData.whatsapp_no);
      formData.append("country", profileData.country);
      formData.append("state", profileData.state);
      formData.append("city", profileData.city);
      formData.append(
        "country_interested_in",
        profileData?.country_interested_in?.id ||
          profileData?.country_interested_in
      );
      formData.append("last_education", profileData.last_education);
      formData.append(
        "interested_in_visa_counselling",
        profileData.interested_in_visa_counselling
      );
      formData.append("ielts_taken_before", profileData.ielts_taken_before);
      formData.append(
        "duolingo_taken_before",
        profileData.duolingo_taken_before
      );
      formData.append("pte_taken_before", profileData.pte_taken_before);
      formData.append("toefl_taken_before", profileData.toefl_taken_before);
      formData.append("gre_taken_before", profileData.gre_taken_before);
      formData.append("gmat_taken_before", profileData.gmat_taken_before);
      formData.append("biography", profileData.biography);
      formData.append("reference_by", profileData.reference_by);
      formData.append("remark", profileData.remark);

      if (
        typeof profileData.user_image === "string" &&
        profileData.user_image.startsWith("http")
      ) {
        const response = await fetch(profileData.user_image);
        if (!response.ok) throw new Error("Failed to fetch the profile image.");
        const blob = await response.blob();
        formData.append("user_image", blob, "profile_image.png");
      } else if (profileData.user_image instanceof File) {
        formData.append("user_image", profileData.user_image);
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
        toast.success("Profile updated successfully.");
        navigate("/studentProfile");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfileData = useCallback(async () => {
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
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  }, [userId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/country-list/",
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
          setCountryInterests(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    getStudentId();
  }, []);

  useEffect(() => {
    if (userId) {
      getProfileData();
    }
  }, [getProfileData, userId]);

  return (
    <div className="row">
      <Tab
        tabs={tabs}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />
      <div className="tab-content tab__content__wrapper aos-init aos-animate">
        <div
          className={`tab-pane fade ${
            activeTab === "Personal Information" ? "show active" : ""
          }`}
        >
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
                    disabled
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
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Image</label>
                  <input
                    type="file"
                    name="user_image"
                    onChange={handleInputChange}
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
                    name="gender"
                    value={profileData?.gender}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Contact Information" ? "show active" : ""
          }`}
        >
          <div className="row">
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
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Education Information" ? "show active" : ""
          }`}
        >
          <div className="row">
            <div className="col-xl-6">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Country</label>
                  <select
                    className="form-select"
                    onChange={handleCountryChange}
                    value={selectedCountry}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.isoCode} value={country.name}>
                        {country.name}
                      </option>
                    ))}
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
                    onChange={handleStateChange}
                    value={selectedState}
                    disabled={!states.length}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.isoCode} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-xl-6  mt-4">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>City</label>
                  <select
                    className="form-select"
                    value={profileData.city || ""}
                    onChange={handleCityChange}
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
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
                    name="country_interested_in"
                    value={
                      profileData?.country_interested_in?.id ||
                      profileData?.country_interested_in
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      setProfileData((prev) => ({
                        ...prev,
                        country_interested_in: { id: value },
                      }));
                    }}
                  >
                    {countryInterests.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
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
                    name="interested_in_visa_counselling"
                    value={profileData?.interested_in_visa_counselling}
                    onChange={handleInputChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
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
          </div>
        </div>
        <div
          className={`tab-pane fade ${
            activeTab === "Others Information" ? "show active" : ""
          }`}
        >
          <div className="row">
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
            <div className="col-xl-12 mt-4 text-center">
              <div className="dashboard__form__button">
                <button className="default__button" onClick={handleUpdateInfo}>
                  Update Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
