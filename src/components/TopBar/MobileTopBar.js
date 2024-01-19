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
    link: "/contactUs",
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
                <ul className="mobile-menu" style={{ paddingLeft: 0 }}>
                  {menu.map((item, index) => (
                    <li className="menu-item-has-children" key={index + 1}>
                      <Link to={item.link} style={{ textDecoration: "auto" }}>
                        {item.name}
                      </Link>
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