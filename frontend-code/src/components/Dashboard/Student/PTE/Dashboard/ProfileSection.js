import React, { useEffect, useState } from "react";
import { UserCircle, Edit2, Star, Clock, Award } from "lucide-react";
import ajaxCall from "../../../../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({});

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

  // Color palette based on #01569b
  const primaryColor = "#01569b";
  const lightPrimary = "#e6f0f7";
  const lighterPrimary = "#f5f9fc";
  const darkPrimary = "#014a82";

  if (isLoading) {
    return (
      <div
        className="card mb-4"
        style={{
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle bg-light"
              style={{
                width: "64px",
                height: "64px",
                marginRight: "16px",
              }}
            ></div>
            <div style={{ flex: 1 }}>
              <div
                className="bg-light"
                style={{
                  height: "20px",
                  width: "60%",
                  marginBottom: "8px",
                }}
              ></div>
              <div
                className="bg-light"
                style={{
                  height: "16px",
                  width: "40%",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card mb-4"
      style={{
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div className="card-body">
        <div className="row align-items-center mb-3">
          <div className="col-md-2 col-4">
            {profileData?.user_image ? (
              <img
                src={profileData.user_image}
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  border: `2px solid ${lightPrimary}`,
                }}
              />
            ) : (
              <UserCircle
                size={80}
                style={{
                  color: primaryColor,
                  borderRadius: "50%",
                  border: `2px solid ${lightPrimary}`,
                  padding: "4px",
                }}
              />
            )}
          </div>

          <div className="col-md-6 col-8">
            <h4
              style={{
                color: "#333",
                fontWeight: "600",
                marginBottom: "4px",
              }}
            >
              {profileData?.user?.first_name +
                " " +
                profileData?.user?.last_name}
            </h4>
            <p
              style={{
                color: "#666",
                marginBottom: "4px",
                fontSize: "14px",
              }}
            >
              {profileData?.user?.email}
            </p>
            <p
              style={{
                color: "#777",
                fontSize: "13px",
                marginBottom: "0",
              }}
            >
              {profileData?.city}, {profileData?.state}, {profileData?.country}
            </p>
          </div>

          <div className="col-md-4 col-12 mt-3 mt-md-0">
            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-outline-primary d-flex align-items-center"
                style={{
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "14px",
                }}
                onClick={() =>
                  navigate("/studentSettings", {
                    state: { profileData },
                  })
                }
              >
                <Edit2 size={14} style={{ marginRight: "6px" }} />
                Edit Profile
              </button>
              <button
                className="btn text-white d-flex align-items-center"
                style={{
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "14px",
                  backgroundColor: primaryColor,
                  borderColor: darkPrimary,
                }}
              >
                <Star size={14} style={{ marginRight: "6px" }} />
                Upgrade to VIP
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-3 pt-3" style={{ borderTop: "1px solid #eee" }}>
          <div className="col-6 col-md-3 mb-3 mb-md-0">
            <div
              className="p-3 rounded"
              style={{
                backgroundColor: lighterPrimary,
                border: `1px solid ${lightPrimary}`,
              }}
            >
              <div
                className="d-flex align-items-center"
                style={{ color: primaryColor }}
              >
                <Clock size={16} style={{ marginRight: "8px" }} />
                <span style={{ fontSize: "12px", fontWeight: "500" }}>
                  Remaining Days
                </span>
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#333",
                  marginTop: "4px",
                }}
              >
                +23
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3 mb-3 mb-md-0">
            <div
              className="p-3 rounded"
              style={{
                backgroundColor: lighterPrimary,
                border: `1px solid ${lightPrimary}`,
              }}
            >
              <div
                className="d-flex align-items-center"
                style={{ color: primaryColor }}
              >
                <Award size={16} style={{ marginRight: "8px" }} />
                <span style={{ fontSize: "12px", fontWeight: "500" }}>
                  Mock Tests
                </span>
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#333",
                  marginTop: "4px",
                }}
              >
                0
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div
              className="p-3 rounded"
              style={{
                backgroundColor: lighterPrimary,
                border: `1px solid ${lightPrimary}`,
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: primaryColor,
                  marginBottom: "4px",
                }}
              >
                Last Education
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#333",
                }}
              >
                {profileData?.last_education || "N/A"}
              </div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div
              className="p-3 rounded"
              style={{
                backgroundColor: lighterPrimary,
                border: `1px solid ${lightPrimary}`,
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: primaryColor,
                  marginBottom: "4px",
                }}
              >
                Interested In
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#333",
                }}
              >
                {profileData?.country_interested_in?.name || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
