import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import logo from "../../img/logo/Logo.png";
import menuIcon from "../../img/icon/icon-menu.svg";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { IconButton } from "@mui/material";

const encrypt = (text, key) => {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const encryptedChar = String.fromCharCode(
      text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
    result += encryptedChar;
  }
  const base64Result = btoa(result);
  return base64Result;
};

const NavBar = ({ showNavBar, handleMouseEnter, handleMouseLeave }) => {
  const { logoutUser } = useCheckAuth();
  const token = localStorage.getItem("loginInfo");
  const role = JSON.parse(localStorage.getItem("loginInfo"))?.user_role || "";
  const userId = JSON.parse(localStorage.getItem("loginInfo"))?.userId || "";
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  const secretKey = process.env.REACT_APP_SECRET_KEY;

  useEffect(() => {
    if (token && role === "student") {
      const encryptedUserId = encrypt(String(userId), secretKey);
      const eventSource = new EventSource(
        `https://studystreak.in/api/notification/streaming/${encryptedUserId}`
      );

      eventSource.onmessage = (event) => {
        const newNotification = JSON.parse(event.data);
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);
        setUnreadCount((prev) => prev + 1);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [role, secretKey, token, userId]);

  const readNotification = async (notificationIds) => {
    try {
      const response = await fetch(
        "https://studystreak.in/api/notification/mark-read/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          body: JSON.stringify({ ids: notificationIds }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.status === true) {
        toast.success("Notification Read Successfully");
      } else {
        toast.error("Something went wrong, please try again later");
      }
      return data;
    } catch (error) {
      console.error("error", error);
    }
  };

  const clearNotification = (index) => {
    const notificationId = notifications[index].id;
    readNotification([notificationId]);
    setNotifications((prev) => prev.filter((_, i) => i !== index));
    setUnreadCount((prev) => Math.max(prev - 1, 0));
  };

  const clearAllNotifications = () => {
    const notificationIds = notifications.map(
      (notification) => notification.id
    );
    readNotification(notificationIds);
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <div
      className="headerarea headerarea__3 header__sticky header__area"
      style={{ backgroundColor: "#ebf2f5" }}
    >
      <div className="container desktop__menu__wrapper">
        <div className="row">
          <div className="col-xl-2 col-lg-2 col-md-6">
            <div className="headerarea__left">
              <div className="headerarea__left__logo d-flex justify-content-center align-items-center">
                {showNavBar && token && (
                  <div className="headerarea__left">
                    <IconButton
                      aria-label="open drawer"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      edge="start"
                      sx={{
                        marginRight: 2,
                        ":hover": {
                          border: "none",
                        },
                      }}
                      disableRipple
                    >
                      <img src={menuIcon} alt="menu" width="18px" />
                    </IconButton>
                  </div>
                )}
                <Link to="/">
                  <img className="logoSize" src={logo} alt="logo" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-7 col-lg-7 main_menu_wrap">
            <div className="headerarea__main__menu">
              <nav>
                <ul>
                  <li className="mega__menu position-static">
                    <Link className="headerarea__has__dropdown" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="mega__menu position-static">
                    <Link className="headerarea__has__dropdown" to="/courses">
                      Courses
                    </Link>
                  </li>
                  {token && (
                    <li className="mega__menu position-static">
                      <Link
                        className="headerarea__has__dropdown"
                        to={
                          role === "admin"
                            ? "/admin-dashboard"
                            : role === "Tutor"
                            ? "/tutor-liveClass"
                            : "/studentDashboard"
                        }
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li className="mega__menu position-static">
                    <Link
                      className="headerarea__has__dropdown"
                      to="/talk-to-us"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6">
            <div className="headerarea__right">
              {token && role === "student" && (
                <div className="header__cart">
                  <Link className="text-decoration-none">
                    <i
                      className="icofont-notification"
                      style={{ color: "#01579b", fontSize: "22px" }}
                    />
                    {unreadCount > 0 && (
                      <span className="notification-badge">{unreadCount}</span>
                    )}
                  </Link>
                  <div className="header__right__dropdown__wrapper">
                    <div className="header__right__dropdown__inner">
                      {notifications.length > 0 ? (
                        <>
                          {notifications.map((notification, index) => (
                            <div
                              className="single__header__right__dropdown"
                              key={index}
                            >
                              <div className="header__right__dropdown__content">
                                <Link>{notification.title}</Link>
                                <p>
                                  {notification.description}
                                  <br />
                                  <span className="price">
                                    {moment(notification.created_at).fromNow()}
                                  </span>
                                </p>
                              </div>
                              <Link
                                className="text-decoration-none"
                                onClick={() => clearNotification(index)}
                              >
                                <i className="icofont-close-line" />
                              </Link>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="single__header__right__dropdown">
                          <div className="header__right__dropdown__content">
                            <h6 className="text-center text-danger">
                              No New Notifications
                            </h6>
                          </div>
                        </div>
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <div className="header__right__dropdown__button">
                        <Link
                          className="blue__color"
                          onClick={clearAllNotifications}
                        >
                          Clear All
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="headerarea__login">
                {token ? (
                  <Link to="/login" onClick={logout}>
                    <div>Logout</div>
                  </Link>
                ) : (
                  <Link to="/login">
                    <div>Login | Register</div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
