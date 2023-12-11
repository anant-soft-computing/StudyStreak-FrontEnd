import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo/Logo.png";
import Dashboard from "./Dashboard";

const Navbar = () => {
  return (
    <>
      <header>
        <div className="container desktop__menu__wrapper">
          <div className="row">
            <div className="col-xl-2 col-lg-2 col-md-6">
              <div className="headerarea__left">
                <div className="headerarea__left__logo">
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
                      <Link className="headerarea__has__dropdown" to="/">
                        Tests
                      </Link>
                    </li>
                    <li className="mega__menu position-static">
                      <Link className="headerarea__has__dropdown" to="/blogs">
                        Blogs
                      </Link>
                    </li>
                    <Dashboard />
                    <li className="mega__menu position-static">
                      <Link className="headerarea__has__dropdown" to="/">
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
                  <Link to="/login">
                    <div>Login | Register</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
