import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo/Logo.png";
import menuIcon from "../../img/icon/icon-menu.svg";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import DSSidebar from "../Dashboard/Student/DSSideBar/DSSideBar";
import { IconButton } from "@mui/material";

const NavBar = ({ handleDrawerToggle, showNavBar }) => {
  const { logoutUser } = useCheckAuth();
  const token = localStorage.getItem("loginInfo");
  const role = JSON.parse(localStorage.getItem("loginInfo"))?.user_role || "";

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  return (
    <header className='navbarWrap'>
      <div className='headerarea headerarea__3 header__sticky header__area'>
        <div className='container desktop__menu__wrapper'>
          <div className='row'>
            <div className='col-xl-2 col-lg-2 col-md-6'>
              <div className='headerarea__left'>
                <div className='headerarea__left__logo d-flex justify-content-center align-items-center'>
                  {showNavBar && token && (
                    <div className='headerarea__left'>
                      <IconButton
                        // color='inherit'
                        aria-label='open drawer'
                        onClick={handleDrawerToggle}
                        edge='start'
                        sx={{
                          marginRight: 2,
                          ":hover": {
                            border: "none",
                          },
                        }}
                        disableRipple
                      >
                        <img src={menuIcon} alt='menu' width='18px' />
                      </IconButton>
                    </div>
                  )}
                  <Link to='/'>
                    <img className='logoSize' src={logo} alt='logo' />
                  </Link>
                </div>
              </div>
            </div>

            {/* <div className='col-xl-2 col-lg-2 col-md-6'>
              <div className='headerarea__left'>
                <div className='headerarea__left__logo'>
                  <Link to='/'>
                    <img className='logoSize' src={logo} alt='logo' />
                  </Link>
                </div>
              </div>
            </div> */}
            <div className='col-xl-7 col-lg-7 main_menu_wrap'>
              <div className='headerarea__main__menu'>
                <nav>
                  <ul>
                    <li className='mega__menu position-static'>
                      <Link className='headerarea__has__dropdown' to='/'>
                        Home
                      </Link>
                    </li>
                    <li className='mega__menu position-static'>
                      <Link className='headerarea__has__dropdown' to='/courses'>
                        Courses
                      </Link>
                    </li>
                    <li className='mega__menu position-static'>
                      <Link
                        className='headerarea__has__dropdown'
                        to={
                          role === "admin"
                            ? "/admin-dashboard"
                            : "/studentDashboard"
                        }
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className='mega__menu position-static'>
                      <Link
                        className='headerarea__has__dropdown'
                        to='/contactUs'
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-6'>
              <div className='headerarea__right'>
                <div className='headerarea__login'>
                  {token ? (
                    <Link to='/login' onClick={logout}>
                      <div>Logout</div>
                    </Link>
                  ) : (
                    <Link to='/login'>
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
