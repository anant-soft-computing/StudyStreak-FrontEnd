import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCheckAuth } from "../../../../hooks/useCheckAuth";
import {
  Award,
  Bell,
  BookCopy,
  BookOpenCheck,
  CassetteTape,
  Dices,
  EthernetPort,
  GraduationCap,
  LayoutPanelLeft,
  LogOut,
  Package,
  Presentation,
  Proportions,
  Scroll,
  Settings,
  Tags,
  TicketsPlane,
  User,
  Users,
  WalletCards,
  Podcast,
} from "lucide-react";

const menuList = [
  {
    name: "Dashboard",
    icon: <LayoutPanelLeft />,
    link: "/admin-dashboard",
  },
  {
    name: "Users",
    icon: <Users />,
    link: "/admin-users",
  },
  {
    name: "Student",
    icon: <User />,
    link: "/admin-student",
  },
  {
    name: "Live Class Report",
    icon: <TicketsPlane />,
    link: "/admin-live-class-report",
  },
  {
    name: "Package",
    icon: <Package />,
    link: "/admin-package",
  },
  {
    name: "Course",
    icon: <BookCopy />,
    link: "/admin-course",
  },
  {
    name: "Exam",
    icon: <BookOpenCheck />,
    link: "/admin-exam",
  },
  {
    name: "Live Class",
    icon: <CassetteTape />,
    link: "/admin-liveClass",
  },
  {
    name: "Batch",
    icon: <GraduationCap />,
    link: "/admin-batch",
  },
  {
    name: "Flash Card",
    icon: <WalletCards />,
    link: "/admin-flashCard",
  },
  {
    name: "Paper Test",
    icon: <Scroll />,
    link: "/admin-paperTest",
  },
  {
    name: "Badges",
    icon: <Award />,
    link: "/admin-badges",
  },
  {
    name: "Gamification",
    icon: <Dices />,
    link: "/admin-gamification",
  },
  {
    name: "Notice",
    icon: <Bell />,
    link: "/admin-notice",
  },
  {
    name: "Resources",
    icon: <Proportions />,
    link: "/admin-resources",
  },
  {
    name: "Lesson",
    icon: <Presentation />,
    link: "/admin-lesson",
  },
  {
    name: "Coupon",
    icon: <Tags />,
    link: "/admin-coupon",
  },
  { name: "Podcast", icon: <Podcast />, link: "/admin-podcast" },
  {
    name: "Testimonial",
    icon: <EthernetPort />,
    link: "/admin-testimonial",
  },
  {
    name: "Settings",
    icon: <Settings />,
    link: "/admin-profile",
  },
  {
    name: "Logout",
    icon: <LogOut />,
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
