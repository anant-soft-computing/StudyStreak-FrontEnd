import React, { useState } from "react";
import logo from "../../img/logo/Logo.png";
import { Link } from "react-router-dom";
import { useCheckAuth } from "../../hooks/useCheckAuth";

const menu = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Courses",
    link: "/courses",
  },
  {
    name: "Dashboard",
    link: "/studentDashboard",
  },
  {
    name: "Contact Us",
    link: "/talk-to-us",
  },
];

const MobileTopBar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const handleMobileMenu = () => setOpenMobileMenu(!openMobileMenu);

  const token = localStorage.getItem("loginInfo");
  const { logoutUser } = useCheckAuth();
  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  return (
    <>
      <div className="container-fluid mob_menu_wrapper">
        <div className="row align-items-center">
          <div className="col-6">
            <div className="mobile-logo">
              <Link to="/">
                <img className="logoSize" src={logo} alt="logo" />
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="header-right-wrap">
              {token && (
                <div className="headerarea__right">
                  <div className="header__cart">
                    <Link className="text-decoration-none">
                      <i
                        className="icofont-notification"
                        style={{ color: "#01579b", fontSize: "22px" }}
                      />
                      <span className="notification-badge">{1}</span>
                    </Link>
                    <div className="header__right__dropdown__wrapper">
                      <div className="header__right__dropdown__inner">
                        <h6 className="text-center text-danger">
                          Coming Soon !!
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="mobile-off-canvas">
                <button
                  className="mobile-aside-button"
                  onClick={handleMobileMenu}
                >
                  <i className="icofont-navigation-menu"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`mobile-off-canvas-active ${openMobileMenu && "inside"}`}>
        <button className="mobile-aside-close" onClick={handleMobileMenu}>
          <i className="icofont  icofont-close-line"></i>
        </button>
        <div className="header-mobile-aside-wrap">
          <div className="mobile-menu-wrap headerarea">
            <div className="mobile-navigation">
              <nav>
                <ul className="mobile-menu mobile_menu_left">
                  {menu.map((item, index) => (
                    <li
                      className="menu-item-has-children mobile_menu_name"
                      key={index + 1}
                    >
                      <Link to={item.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
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
    </>
  );
};

export default MobileTopBar;
