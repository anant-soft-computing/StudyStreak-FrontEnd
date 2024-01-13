import React, { useState } from "react";
import logo from "../../img/logo/Logo.png";
import { Link } from "react-router-dom";

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
    link: "/dashboard/student-dashboard",
  },
  {
    name: "Contact Us",
    link: "/contactUs",
  },
];

export const MobileTopBar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const handleMobileMenu = () => setOpenMobileMenu(!openMobileMenu);

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
              <div className="headerarea__right">
                <div className="header__cart">
                  <a href="#">
                    {" "}
                    <i className="icofont-cart-alt"></i>
                  </a>
                  <div className="header__right__dropdown__wrapper">
                    <div className="header__right__dropdown__inner">
                      <div className="single__header__right__dropdown">
                        <div className="header__right__dropdown__img">
                          <a href="#">
                            <img
                              loading="lazy"
                              src="img/grid/cart1.jpg"
                              alt="photo"
                            />
                          </a>
                        </div>
                        <div className="header__right__dropdown__content">
                          <a href="shop-product.html">Web Directory</a>
                          <p>
                            1 x <span className="price">$ 80.00</span>
                          </p>
                        </div>
                        <div className="header__right__dropdown__close">
                          <a href="#">
                            <i className="icofont-close-line"></i>
                          </a>
                        </div>
                      </div>

                      <div className="single__header__right__dropdown">
                        <div className="header__right__dropdown__img">
                          <a href="#">
                            <img
                              loading="lazy"
                              src="img/grid/cart2.jpg"
                              alt="photo"
                            />
                          </a>
                        </div>
                        <div className="header__right__dropdown__content">
                          <a href="shop-product.html">Design Minois</a>
                          <p>
                            1 x <span className="price">$ 60.00</span>
                          </p>
                        </div>
                        <div className="header__right__dropdown__close">
                          <a href="#">
                            <i className="icofont-close-line"></i>
                          </a>
                        </div>
                      </div>

                      <div className="single__header__right__dropdown">
                        <div className="header__right__dropdown__img">
                          <a href="#">
                            <img
                              loading="lazy"
                              src="img/grid/cart3.jpg"
                              alt="photo"
                            />
                          </a>
                        </div>
                        <div className="header__right__dropdown__content">
                          <a href="shop-product.html">Crash Course</a>
                          <p>
                            1 x <span className="price">$ 70.00</span>
                          </p>
                        </div>
                        <div className="header__right__dropdown__close">
                          <a href="#">
                            <i className="icofont-close-line"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <p className="dropdown__price">
                      Total: <span>$1,100.00</span>
                    </p>
                    <div className="header__right__dropdown__button">
                      <a href="#" className="white__color">
                        VIEW CART
                      </a>
                      <a href="#" className="blue__color">
                        CHECKOUT
                      </a>
                    </div>
                  </div>
                </div>
              </div>

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
          <div className="mobile-search">
            <form className="search-form" action="#">
              <input type="text" placeholder="Search entire store…" />
              <button className="button-search">
                <i className="icofont icofont-search-2"></i>
              </button>
            </form>
          </div>
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
          <div className="mobile-curr-lang-wrap">
            <div className="single-mobile-curr-lang">
              <Link
                className="mobile-account-active"
                style={{ textDecoration: "auto" }}
              >
                My Account <i className="icofont-thin-down"></i>
              </Link>
              <div className="lang-curr-dropdown account-dropdown-active">
                <ul>
                  <li>
                    <Link to="/">
                      <i className="icofont-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="icofont-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.instagram.com/">
                      <i className="icofont-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="icofont-youtube-play"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mobile-social-wrap">
            <Link className="facebook" to="">
              <i className="icofont icofont-facebook"></i>
            </Link>
            <Link className="twitter" to="#">
              <i className="icofont icofont-twitter"></i>
            </Link>
            <Link className="pinterest" to="#">
              <i className="icofont icofont-pinterest"></i>
            </Link>
            <Link className="instagram" to="https://www.instagram.com">
              <i className="icofont icofont-instagram"></i>
            </Link>
            <Link className="google" to="#">
              <i className="icofont icofont-youtube-play"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
