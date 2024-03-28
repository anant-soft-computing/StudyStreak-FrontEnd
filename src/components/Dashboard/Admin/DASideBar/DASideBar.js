import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCheckAuth } from "../../../../hooks/useCheckAuth";
import dashBoard from "../../../../img/icon/dashboard.svg";
import student from "../../../../img/icon/profile.svg";
import packageIcon from "../../../../img/icon/package.svg";
import course from "../../../../img/icon/course.svg";
import exam from "../../../../img/icon/assignment.svg";
import liveClass from "../../../../img/icon/liveClass.svg";
import batch from "../../../../img/icon/batch.svg";
import badges from "../../../../img/icon/badges.svg";
import gamification from "../../../../img/icon/gamification.svg";
import flashCard from "../../../../img/icon/flashCard.svg";
import settings from "../../../../img/icon/settings.svg";
import logOut from "../../../../img/icon/logout.svg";

const DASideBar = () => {
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
      link: "/admin-dashboard",
    },
    {
      name: "Student",
      icon: <img src={student} alt="Student" />,
      link: "/admin-student",
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
      name: "Badges",
      icon: <img src={badges} alt="Badges" />,
      link: "/admin-badges",
    },
    {
      name: "Flash Card",
      icon: <img src={flashCard} alt="Flash Card" />,
      link: "/admin-flashCard",
    },
    {
      name: "Gamification",
      icon: <img src={gamification} alt="Gamification" />,
      link: "/admin-gamification",
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

  return (
    <>
      <div className="col-xl-3 col-lg-3 col-md-12">
        <div className="dashboard__inner sticky-top common-background-color-across-app">
          <div className="dashboard__nav__title">
            <h6>Welcome, Admin</h6>
          </div>
          <div className="dashboard__nav">
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
    </>
  );
};

export default DASideBar;
