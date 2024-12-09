import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCheckAuth } from "../../../../hooks/useCheckAuth";
import dashBoard from "../../../../img/icon/dashboard.svg";
import users from "../../../../img/icon/users.svg";
import student from "../../../../img/icon/profile.svg";
import report from "../../../../img/icon/coupon.svg";
import packageIcon from "../../../../img/icon/package.svg";
import course from "../../../../img/icon/course.svg";
import exam from "../../../../img/icon/assignment.svg";
import liveClass from "../../../../img/icon/liveClass.svg";
import batch from "../../../../img/icon/batch.svg";
import badges from "../../../../img/icon/badges.svg";
import gamification from "../../../../img/icon/gamification.svg";
import flashCard from "../../../../img/icon/flashCard.svg";
import paperTest from "../../../../img/icon/practiceTest.svg";
import settings from "../../../../img/icon/settings.svg";
import logOut from "../../../../img/icon/logout.svg";
import notice from "../../../../img/icon/notice.svg";
import resource from "../../../../img/icon/support.svg";
import testimonial from "../../../../img/icon/support.svg";
import coupon from "../../../../img/icon/coupon.svg";
import lesson from "../../../../img/icon/lesson.svg";

const menuList = [
  {
    name: "Dashboard",
    icon: <img src={dashBoard} alt="Dashboard" />,
    link: "/admin-dashboard",
  },
  {
    name: "Users",
    icon: <img src={users} alt="Users" height={20} width={20} />,
    link: "/admin-users",
  },
  {
    name: "Student",
    icon: <img src={student} alt="Student" />,
    link: "/admin-student",
  },
  {
    name: "Live Class Report",
    icon: <img src={report} alt="Live Class Report" />,
    link: "/admin-live-class-report",
  },
  {
    name: "Package",
    icon: <img src={packageIcon} alt="Package" />,
    link: "/admin-package",
  },
  {
    name: "Course",
    icon: <img src={course} alt="Course" />,
    link: "/admin-course",
  },
  {
    name: "Exam",
    icon: <img src={exam} alt="Exam" />,
    link: "/admin-exam",
  },
  {
    name: "Live Class",
    icon: <img src={liveClass} alt="Live Class" />,
    link: "/admin-liveClass",
  },
  {
    name: "Batch",
    icon: <img src={batch} alt="Batch" />,
    link: "/admin-batch",
  },
  {
    name: "Flash Card",
    icon: <img src={flashCard} alt="Flash Card" />,
    link: "/admin-flashCard",
  },
  {
    name: "Paper Test",
    icon: <img src={paperTest} alt="Paper Test" />,
    link: "/admin-paperTest",
  },
  {
    name: "Badges",
    icon: <img src={badges} alt="Badges" />,
    link: "/admin-badges",
  },
  {
    name: "Gamification",
    icon: <img src={gamification} alt="Gamification" />,
    link: "/admin-gamification",
  },
  {
    name: "Notice",
    icon: <img src={notice} alt="Notice" />,
    link: "/admin-notice",
  },
  {
    name: "Resources",
    icon: <img src={resource} alt="Resources" height={20} width={20} />,
    link: "/admin-resources",
  },
  {
    name: "Lesson",
    icon: <img src={lesson} alt="Lesson" height={20} width={20} />,
    link: "/admin-lesson",
  },
  {
    name: "Coupon",
    icon: <img src={coupon} alt="Coupon" />,
    link: "/admin-coupon",
  },
  {
    name: "Testimonial",
    icon: <img src={testimonial} alt="Testimonial" />,
    link: "/admin-testimonial",
  },
  {
    name: "Settings",
    icon: <img src={settings} alt="Settings" />,
    link: "/admin-profile",
  },
  {
    name: "Logout",
    icon: <img src={logOut} alt="Logout" />,
    link: "/login",
  },
];

const DASideBar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [showMobileNavBtn, setShowMobileNavBtn] = useState(true);
  const location = useLocation().pathname;
  const { logoutUser } = useCheckAuth();

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

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
          <h6>Welcome, Admin</h6>
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
                  <div className="admin__menu__title">{item.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DASideBar;
