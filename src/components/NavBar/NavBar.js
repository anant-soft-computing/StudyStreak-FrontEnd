import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../img/logo/Logo.png";
import menuIcon from "../../img/icon/icon-menu.svg";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { IconButton } from "@mui/material";

const NavBar = ({
  showNavBar,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const { logoutUser } = useCheckAuth();
  const authData = useSelector((state) => state.authStore);

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  return (
    <header className="navbarWrap">
      <div className="headerarea headerarea__3 header__sticky header__area">
        <div className="container desktop__menu__wrapper">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6">
              <div className="headerarea__left">
                <div className="headerarea__left__logo d-flex justify-content-center align-items-center">
                  {showNavBar && authData?.accessToken && (
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
                    <li className="mega__menu position-static">
                      <Link
                        className="headerarea__has__dropdown"
                        to={
                          authData?.user_role === "admin"
                            ? "/admin-dashboard"
                            : "/studentDashboard"
                        }
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="mega__menu position-static">
                      <Link
                        className="headerarea__has__dropdown"
                        to="/contactUs"
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
                <div className="headerarea__login">
                  {authData?.accessToken ? (
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
    </header>
  );
};

export default NavBar;
