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
import diagnosticTest from "../../../../img/icon/diagnosticTest.svg";
import liveClass from "../../../../img/icon/liveClass.svg";
import recordedClass from "../../../../img/icon/webinar.svg";
import flashcard from "../../../../img/icon/flashCard.svg";
import resources from "../../../../img/icon/support.svg";
import report from "../../../../img/icon/coupon.svg";
import paperTest from "../../../../img/icon/paperTest.svg";
import settings from "../../../../img/icon/settings.svg";
import logOut from "../../../../img/icon/logout.svg";
import NoticeBoard from "../Dashboard/NoticeBoard/NoticeBoard";

const DSSidebar = () => {
  const location = useLocation().pathname;
  const category = localStorage.getItem("category");
  const { logoutUser } = useCheckAuth();

  const [count, setCount] = useState({
    count: 0,
    all_pt_count: 0,
    practice_test_count: 0,
    all_flt_count: 0,
    full_length_test_count: 0,
  });
  const [givenPTCount, setGivenPTCount] = useState(0);
  const [givenFLTCount, setGivenFLTCount] = useState(0);

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [showMobileNavBtn, setShowMobileNavBtn] = useState(true);
  const userData = JSON.parse(localStorage.getItem("loginInfo"));

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  const menuList =
    category === "IELTS" || count?.count === 0
      ? [
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
            name: "Paper Test",
            icon: <img src={paperTest} alt="My Course" />,
            link: "/paperTest",
            state: { packageCount: count?.count },
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
            state: {
              count: count?.practice_test_count,
              packageCount: count?.count,
            },
          },
          {
            name: "Full Length Test",
            icon: <img src={fullLengthTest} alt="Full Length Test" />,
            link: "/fullLengthTest",
            state: {
              count: count?.full_length_test_count,
              packageCount: count?.count,
            },
          },
          {
            name: "Diagnostic Test",
            icon: <img src={diagnosticTest} alt="Diagnostic Test" />,
            link: "/diagnosticTest",
            state: {
              packageCount: count?.count,
            },
          },
          {
            name: "Live Classes",
            icon: <img src={liveClass} alt="Live Classes" />,
            link: "/studentLiveClasses",
            state: { packageCount: count?.count },
          },
          {
            name: "Recorded Classes",
            icon: (
              <img
                src={recordedClass}
                alt="Recorded Classes"
                height={18}
                width={18}
              />
            ),
            link: "/recordedClasses",
            state: { packageCount: count?.count },
          },
          {
            name: "Flash Card",
            icon: <img src={flashcard} alt="Flash Card" />,
            link: "/flashCard",
            state: { packageCount: count?.count },
          },
          {
            name: "Resources",
            icon: (
              <img src={resources} alt="Resources" height={20} width={20} />
            ),
            link: "/resources",
            state: { packageCount: count?.count },
          },
          {
            name: "Reports",
            icon: <img src={report} alt="Reports" />,
            link: "/reports",
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
        ]
      : [
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
            name: "Paper Test",
            icon: <img src={paperTest} alt="My Course" />,
            link: "/paperTest",
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
            state: {
              count: count?.practice_test_count,
              packageCount: count?.count,
            },
          },
          {
            name: "Diagnostic Test",
            icon: <img src={diagnosticTest} alt="Diagnostic Test" />,
            link: "/diagnosticTest",
            state: {
              packageCount: count?.count,
            },
          },
          {
            name: "Live Classes",
            icon: <img src={liveClass} alt="Live Classes" />,
            link: "/studentLiveClasses",
          },
          {
            name: "Recorded Classes",
            icon: (
              <img
                src={recordedClass}
                alt="Recorded Classes"
                height={18}
                width={18}
              />
            ),
            link: "/recordedClasses",
          },
          {
            name: "Flash Card",
            icon: <img src={flashcard} alt="Flash Card" />,
            link: "/flashCard",
          },
          {
            name: "Resources",
            icon: (
              <img src={resources} alt="Resources" height={20} width={20} />
            ),
            link: "/resources",
          },
          {
            name: "Reports",
            icon: <img src={report} alt="Reports" />,
            link: "/reports",
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
          const batchIds = data?.batch?.map((item) => item);
          const courseIds = data?.course?.map((item) => item);

          const givenPTCount = data?.student[0]?.student_pt;
          const givenFLTCount = data?.student[0]?.student_flt;

          setGivenPTCount(givenPTCount);
          setGivenFLTCount(givenFLTCount);

          const totalPracticeTests = data?.package.reduce(
            (sum, pkg) => sum + pkg.practice_test_count,
            0
          );

          const totalFullLengthTests = data?.package.reduce(
            (sum, pkg) => sum + pkg.full_length_test_count,
            0
          );

          setCount({
            count: data?.count,
            all_pt_count: totalPracticeTests,
            practice_test_count: totalPracticeTests - givenPTCount,
            all_flt_count: totalFullLengthTests,
            full_length_test_count: totalFullLengthTests - givenFLTCount,
          });

          localStorage.setItem("StudentID", data?.student[0]?.student_id);
          localStorage.setItem("BatchIds", JSON.stringify(batchIds));
          localStorage.setItem("courses", JSON.stringify(courseIds));
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [givenFLTCount, givenPTCount]);

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
    <div
      className="col-xl-3 col-lg-3 col-md-12"
      style={{ display: showMobileNavBtn ? "block" : "none" }}
    >
      <div className="dashboard__inner sticky-top">
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
                    count?.practice_test_count === -1 ? (
                      <span className="dashboard__label bg-success">All</span>
                    ) : givenPTCount ===
                      count?.practice_test_count + givenPTCount ? (
                      <span className="dashboard__label bg-danger">N/A</span>
                    ) : (
                      <span className="dashboard__label">
                        {count?.practice_test_count}
                      </span>
                    )
                  ) : item.name === "Full Length Test" ? (
                    count?.full_length_test_count === -1 ? (
                      <span className="dashboard__label bg-success">All</span>
                    ) : givenFLTCount ===
                      count?.full_length_test_count + givenFLTCount ? (
                      <span className="dashboard__label bg-danger">N/A</span>
                    ) : (
                      <span className="dashboard__label">
                        {count?.full_length_test_count}
                      </span>
                    )
                  ) : (
                    <span className="dashboard__label">
                      {
                        count[
                          item.name.replace(/ /g, "_").toLowerCase() + "_count"
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
  );
};

export default DSSidebar;
