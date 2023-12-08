import React from "react";
import { Link } from "react-router-dom";
import DarkNight from "../../DarkNight";
import TopBar from "../../Topbar";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import DSNavBar from "./DSNavbar/DSNavbar";
import grid2 from "../../../img/grid/grid_2.png";
import grid3 from "../../../img/grid/grid_3.png";
import grids2 from "../../../img/grid/grid_small_2.jpg";
import grids3 from "../../../img/grid/grid_small_3.jpg";
import DSSidebar from "./DSSidebar/DSSidebar";

const Wishlist = () => {
  return (
    <>
      <DarkNight />
      <TopBar />
      <Navbar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="dashboardarea sp_bottom_100">
            <DSNavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Wishlist</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="gridarea__wraper">
                            <div className="gridarea__img">
                              <img src={grid2} alt="grid" />
                              <div className="gridarea__small__button">
                                <div className="grid__badge blue__color">
                                  Mechanical
                                </div>
                              </div>
                              <div className="gridarea__small__icon">
                                <Link to="#">
                                  <i className="icofont-heart-alt"></i>
                                </Link>
                              </div>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 29
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 2 hr
                                    10 min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link to="#">
                                    Nidnies course to under stand about softwere
                                  </Link>
                                </h3>
                              </div>
                              <div className="gridarea__price green__color">
                                $32.00<del>/$67.00</del>
                                <span>.Free</span>
                              </div>
                              <div className="gridarea__bottom">
                                <Link to="/instructor-details">
                                  <div className="gridarea__small__img">
                                    <img src={grids2} alt="grid" />
                                    <div className="gridarea__small__content">
                                      <h6>Rinis Jhon</h6>
                                    </div>
                                  </div>
                                </Link>
                                <div className="gridarea__star">
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <span>(44)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="gridarea__wraper">
                            <div className="gridarea__img">
                              <Link to="/course-details">
                                <img src={grid3} alt="grid" />
                              </Link>
                              <div className="gridarea__small__button">
                                <div className="grid__badge pink__color">
                                  Development
                                </div>
                              </div>
                              <div className="gridarea__small__icon">
                                <Link to="#">
                                  <i className="icofont-heart-alt"></i>
                                </Link>
                              </div>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 25
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 1 hr
                                    40 min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link to="/course-details">
                                    Minws course to under stand about solution
                                  </Link>
                                </h3>
                              </div>
                              <div className="gridarea__price">
                                $40.00 <del>/ $67.00</del>
                                <span>
                                  {" "}
                                  <del className="del__2">Free</del>
                                </span>
                              </div>
                              <div className="gridarea__bottom">
                                <Link to="/instructor-details">
                                  <div className="gridarea__small__img">
                                    <img src={grids3} alt="grid" />
                                    <div className="gridarea__small__content">
                                      <h6>Micle Jhon</h6>
                                    </div>
                                  </div>
                                </Link>
                                <div className="gridarea__star">
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <span>(44)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                          <div className="gridarea__wraper">
                            <div className="gridarea__img">
                              <Link to="/course-details">
                                <img src={grid3} alt="grid" />
                              </Link>
                              <div className="gridarea__small__button">
                                <div className="grid__badge pink__color">
                                  Development
                                </div>
                              </div>
                              <div className="gridarea__small__icon">
                                <Link to="#">
                                  <i className="icofont-heart-alt"></i>
                                </Link>
                              </div>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 25
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 1 hr
                                    40 min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link to="/course-details">
                                    Minws course to under stand about solution
                                  </Link>
                                </h3>
                              </div>
                              <div className="gridarea__price">
                                $40.00 <del>/ $67.00</del>
                                <span>
                                  {" "}
                                  <del className="del__2">Free</del>
                                </span>
                              </div>
                              <div className="gridarea__bottom">
                                <Link to="/instructor-details">
                                  <div className="gridarea__small__img">
                                    <img src={grids3} alt="grid" />
                                    <div className="gridarea__small__content">
                                      <h6>Micle Jhon</h6>
                                    </div>
                                  </div>
                                </Link>
                                <div className="gridarea__star">
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <span>(44)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
