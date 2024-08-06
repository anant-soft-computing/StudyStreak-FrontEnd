import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useCheckAuth } from "../../../../hooks/useCheckAuth";
import dashBoard from "../../../../img/icon/dashboard.svg";
import profile from "../../../../img/icon/profile.svg";
import myCourse from "../../../../img/icon/myCourse.svg";
import assignment from "../../../../img/icon/assignment.svg";
import practiceTest from "../../../../img/icon/practiceTest.svg";
import fullLengthTest from "../../../../img/icon/notebook.svg";
import liveClass from "../../../../img/icon/liveClass.svg";
import flashcard from "../../../../img/icon/flashCard.svg";
import resources from "../../../../img/icon/support.svg";
import webinars from "../../../../img/icon/webinar.svg";
import settings from "../../../../img/icon/settings.svg";
import logOut from "../../../../img/icon/logout.svg";
import NoticeBoard from "../Dashboard/NoticeBoard/NoticeBoard";

const DSSidebar = () => {
  const [count, setCount] = useState({
    practice_test_count: 0,
    full_length_test_count: 0,
  });
  const [givenPTCount, setGivenPTCount] = useState(0);
  const [givenFLTCount, setGivenFLTCount] = useState(0);

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [showMobileNavBtn, setShowMobileNavBtn] = useState(true);

  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const location = useLocation().pathname;
  const { logoutUser } = useCheckAuth();

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  const menuList = [
    {
      name: "Dashboard",
      icon: <img src={dashBoard} alt="Dashboard" />,
      link: "/studentDashboard",
    },
    {
      name: "My Profile",
      icon: <img src={profile} alt="Profile" />,
      link: "/studentProfile",
    },
    {
      name: "My Course",
      icon: <img src={myCourse} alt="My Course" />,
      link: "/studentMyCourse",
    },
    {
      name: "Mini Test",
      icon: <img src={assignment} alt="Mini Test" />,
      link: "/mockTest",
    },
    {
      name: "Practice Test",
      icon: <img src={practiceTest} alt="Practice Test" />,
      link: "/practiceTest",
      state: { count: count?.practice_test_count },
    },
    {
      name: "Full Length Test",
      icon: <img src={fullLengthTest} alt="Full Length Test" />,
      link: "/fullLengthTest",
      state: { count: count?.full_length_test_count },
    },
    {
      name: "Live Classes",
      icon: <img src={liveClass} alt="Live Classes" />,
      link: "/studentLiveClasses",
    },
    {
      name: "Flash Card",
      icon: <img src={flashcard} alt="Flash Card" />,
      link: "/flashCard",
    },
    {
      name: "Webinars",
      icon: <img src={webinars} alt="Webinars" height={20} width={20} />,
      link: "/webinars",
    },
    {
      name: "Resources",
      icon: <img src={resources} alt="Resources" height={20} width={20} />,
      link: "/resources",
    },
    {
      name: "Settings",
      icon: <img src={settings} alt="Settings" />,
      link: "/studentSettings",
    },
    {
      name: "Logout",
      icon: <img src={logOut} alt="Logout" />,
      link: "/login",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/student-stats/`,
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
          setGivenPTCount(response?.data?.student_pt?.length);
          setGivenFLTCount(response?.data?.student_flt?.length);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/userwisepackagewithcourseid/",
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
          const { data } = response;
          const studentPackage = data?.student_packages?.[0];
          const packageDetails = studentPackage?.package;

          const batchIds = data?.student_packages.map((item) => item.batch_id);
          const courses = data.student_packages?.map(({ course }) => course);

          setCount({
            practice_test_count:
              packageDetails?.practice_test_count === -1
                ? packageDetails?.practice_test_count
                : packageDetails?.practice_test_count - givenPTCount,
            full_length_test_count:
              packageDetails?.full_length_test_count === -1
                ? packageDetails?.full_length_test_count
                : packageDetails?.full_length_test_count - givenFLTCount,
          });
          localStorage.setItem("StudentID", studentPackage?.student_id);
          localStorage.setItem("BatchIds", JSON.stringify(batchIds));
          localStorage.setItem("courses", JSON.stringify(courses));
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [openMobileMenu]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 990) {
        setOpenMobileMenu(true);
        setShowMobileNavBtn(false);
      } else {
        setOpenMobileMenu(false);
        setShowMobileNavBtn(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div
        className="col-xl-3 col-lg-3 col-md-12"
        style={{
          marginTop: "70px",
          display: showMobileNavBtn ? "block" : "none",
        }}
      >
        <div className="dashboard__inner sticky-top common-background-color-across-app">
          <div className="dashboard__nav__title">
            <h6>Welcome, {userData?.username}</h6>
            {showMobileNavBtn && (
              <button
                className="mobile-aside-button"
                onClick={() => setOpenMobileMenu(!openMobileMenu)}
              >
                <i className="icofont-navigation-menu"></i>
              </button>
            )}
          </div>
          <div className={`dashboard__nav ${openMobileMenu && "active"}`}>
            <ul>
              {menuList.map((item, index) => (
                <li key={index}>
                  <Link
                    className={
                      location === item.link
                        ? "active admin__menu"
                        : "admin__menu"
                    }
                    to={item.link}
                    onClick={item.name === "Logout" ? logout : () => {}}
                    state={item?.state}
                  >
                    <div className="admin__menu__icon">{item.icon}</div>
                    <div className="side-navbar-rexr-color-common admin__menu__title">
                      {item.name}
                    </div>
                    {item.name === "Practice Test" ? (
                      count.practice_test_count === -1 ? (
                        <span className="dashboard__label">All</span>
                      ) : givenPTCount >=
                        count?.practice_test_count + givenPTCount ? (
                        <i className="icofont-ui-press text-danger" />
                      ) : (
                        <span className="dashboard__label">
                          {count.practice_test_count}
                        </span>
                      )
                    ) : item.name === "Full Length Test" ? (
                      count?.full_length_test_count === -1 ? (
                        <span className="dashboard__label">All</span>
                      ) : givenFLTCount >=
                        count?.full_length_test_count + givenFLTCount ? (
                        <i className="icofont-ui-press text-danger" />
                      ) : (
                        <span className="dashboard__label">
                          {count?.full_length_test_count}
                        </span>
                      )
                    ) : (
                      <span className="dashboard__label">
                        {
                          count[
                            item.name.replace(/ /g, "_").toLowerCase() +
                              "_count"
                          ]
                        }
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <NoticeBoard />
          </div>
        </div>
      </div>
    </>
  );
};

export default DSSidebar;
