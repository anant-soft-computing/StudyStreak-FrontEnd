import React from "react";
import { Link } from "react-router-dom";
import DarkNight from "../DarkNight";
import Footer from "../Footer";
import Navbar from "../Navbar";
import TopBar from "../Topbar";
// import img1 from "../../img/herobanner/herobanner__1.png";
// import img2 from "../../img/herobanner/herobanner__2.png";
// import img3 from "../../img/herobanner/herobanner__3.png";
// import img4 from "../../img/herobanner/herobanner__5.png";
import gridImg1 from "../../img/grid/grid_1.png";
// import gridImg1Small from "../../img/grid/grid_small_1.jpg";
import gridImg2 from "../../img/grid/grid_2.png";
// import gridImg2Small from "../../img/grid/grid_small_2.jpg";
import gridImg3 from "../../img/grid/grid_3.png";
// import gridImg3Small from "../../img/grid/grid_small_3.jpg";
import gridImg4 from "../../img/grid/grid_4.png";
// import gridImg4Small from "../../img/grid/grid_small_4.jpg";
import gridImg5 from "../../img/grid/grid_5.png";
// import gridImg5Small from "../../img/grid/grid_small_5.jpg";
import gridImg6 from "../../img/grid/grid_6.png";


const Courses = () => {
  return (
    <>
      <DarkNight />
      <TopBar />
      <Navbar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="coursearea sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="course__text__wraper" data-aos="fade-up">
                    <div className="course__text">
                      <p>Showing 1 - 12 of 54 Results</p>
                    </div>
                    <div className="course__icon">
                      <ul
                        className="nav property__team__tap"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <Link
                            to=" "
                            className="single__tab__link active"
                            data-bs-toggle="tab"
                            data-bs-target="#projects__one"
                          >
                            <i className="icofont-layout"></i>
                          </Link>
                        </li>
                        <li className="nav-item" role="presentation">
                          <Link
                            to=" "
                            className="single__tab__link"
                            data-bs-toggle="tab"
                            data-bs-target="#projects__two"
                          >
                            <i className="icofont-listine-dots"></i>
                          </Link>
                        </li>
                        <li className="short__by__new">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option selected>Short by New</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-4 col-12">
                  <div className="course__sidebar__wraper" data-aos="fade-up">
                    <div className="course__heading">
                      <h5>Search here</h5>
                    </div>
                    <div className="course__input">
                      <input type="text" placeholder="Search product" />
                      <div className="search__button">
                        <button>
                          <i className="icofont-search-1"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="course__sidebar__wraper" data-aos="fade-up">
                    <div className="categori__wraper">
                      <div className="course__heading">
                        <h5>Categories</h5>
                      </div>
                      <div className="course__categories__list">
                        <ul>
                          <li>
                            <Link to=" ">
                              Mobile Handset
                              <span>03</span>
                            </Link>
                          </li>
                          <li>
                            <Link to=" ">
                              Americano Dish
                              <span>07</span>
                            </Link>
                          </li>
                          <li>
                            <Link to=" ">
                              Raxila Dish nonyte
                              <span>09</span>
                            </Link>
                          </li>
                          <li>
                            <Link to=" ">
                              Fresh Vegetable
                              <span>01</span>
                            </Link>
                          </li>
                          <li>
                            <Link to=" ">
                              Fruites
                              <span>00</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="course__sidebar__wraper" data-aos="fade-up">
                    <div className="course__heading">
                      <h5>Tag</h5>
                    </div>
                    <div className="course__tag__list">
                      <ul>
                        <li>
                          <Link to=" ">
                            <div className="course__check__box active "></div>
                            <span className="active">Mechanic</span>
                          </Link>
                        </li>
                        <li>
                          <Link to=" ">
                            <div className="course__check__box  "></div>
                            <span>English</span>
                          </Link>
                        </li>
                        <li>
                          <Link to=" ">
                            <div className="course__check__box  "></div>
                            <span>Computer Science</span>
                          </Link>
                        </li>
                        <li>
                          <Link to=" ">
                            <div className="course__check__box  "></div>
                            <span>Data & Tech</span>
                          </Link>
                        </li>
                        <li>
                          <Link to=" ">
                            <div className="course__check__box  "></div>
                            <span>Ux Desgin</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="course__sidebar__wraper" data-aos="fade-up">
                    <div className="course__heading">
                      <h5>Skill Level</h5>
                    </div>
                    <div className="course__skill__list">
                      <ul>
                        <li>
                          <Link to=" ">All</Link>
                        </li>
                        <li>
                          <Link to=" ">Fullstack</Link>
                        </li>
                        <li>
                          <Link to=" ">English Learn</Link>
                        </li>
                        <li>
                          <Link to=" ">Intermediate</Link>
                        </li>
                        <li>
                          <Link to=" ">Wordpress</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-9 col-md-8 col-12">
                  <div
                    className="tab-content tab__content__wrapper with__sidebar__content"
                    id="myTabContent"
                  >
                    <div
                      className="tab-pane fade  active show"
                      id="projects__one"
                      role="tabpanel"
                      aria-labelledby="projects__one"
                    >
                      <div className="row">
                        <div
                          className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2">
                            <div className="gridarea__img">
                              <Link to="/course-details">
                                <img src={gridImg1} alt="gridImg1" />
                              </Link>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 23
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 1 hr
                                    30 min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link to="/course-details">
                                    Foundation course to under stand about
                                    softwere
                                  </Link>
                                </h3>
                              </div>
                              <div className="gridarea__price">
                                $32.00 <del>/ $67.00</del>
                                <span>
                                  {" "}
                                  <del className="del__2">Free</del>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2">
                            <div className="gridarea__img">
                              <img src={gridImg2} alt="grid" />
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
                                  <Link to=" ">
                                    Nidnies course to under stand about softwere
                                  </Link>
                                </h3>
                              </div>
                              <div className="gridarea__price green__color">
                                $32.00<del>/$67.00</del>
                                <span>.Free</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2">
                            <div className="gridarea__img">
                              <Link to="/course-details">
                                <img src={gridImg3} alt="grid" />
                              </Link>
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
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2">
                            <div className="gridarea__img">
                              <Link to="/course-details">
                                <img src={gridImg4} alt="grid" />
                              </Link>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 36
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 3 hr
                                    40 min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link to="/course-details">
                                    Design course to under stand about solution
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
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2">
                            <div className="gridarea__img">
                              <Link to="/course-details">
                                <img src={gridImg5} alt="grid" />
                              </Link>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 36
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 3 hr
                                    40 min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link to="/course-details">
                                    Data course to under stand about solution
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
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2">
                            <div className="gridarea__img">
                              <Link to="/course-details">
                                <img src={gridImg6} alt="grid" />
                              </Link>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 30
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 3 hr
                                    40 min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link to="/course-details">
                                    Big data to under stand about solution
                                    pacage
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
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2">
                            <div className="gridarea__img">
                              <Link to="/course-details">
                                <img src={gridImg1} alt="grid" />
                              </Link>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 23
                                    Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 1 hr
                                    30 min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <Link to="/course-details">
                                    Foundation course to under stand about
                                    softwere
                                  </Link>
                                </h3>
                              </div>
                              <div className="gridarea__price">
                                $32.00 <del>/ $67.00</del>
                                <span>
                                  {" "}
                                  <del className="del__2">Free</del>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12 "
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2">
                            <div className="gridarea__img">
                              <img src={gridImg2} alt="grid" />
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
                                  <Link to=" ">
                                    Nidnies course to under stand about softwere
                                  </Link>
                                </h3>
                              </div>
                              <div className="gridarea__price green__color">
                                $32.00<del>/$67.00</del>
                                <span>.Free</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                          data-aos="fade-up"
                        >
                          <div className="gridarea__wraper gridarea__wraper__2">
                            <div className="gridarea__img">
                              <Link to="/course-details">
                                <img src={gridImg3} alt="grid" />
                              </Link>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="projects__two"
                      role="tabpanel"
                      aria-labelledby="projects__two"
                    >
                      <div
                        className="gridarea__wraper gridarea__wraper__2 gridarea__course__list"
                        data-aos="fade-up"
                      >
                        <div className="gridarea__img">
                          <Link to="/course-details">
                            <img src={gridImg1} alt="grid" />
                          </Link>
                        </div>
                        <div className="gridarea__content">
                          <div className="gridarea__list">
                            <ul>
                              <li>
                                <i className="icofont-book-alt"></i> 23 Lesson
                              </li>
                              <li>
                                <i className="icofont-clock-time"></i> 1 hr 30
                                min
                              </li>
                            </ul>
                          </div>
                          <div className="gridarea__heading">
                            <h3>
                              <Link to="/course-details">
                                Become a product Manager learn the skills & job.
                              </Link>
                            </h3>
                          </div>
                          <div className="gridarea__price">
                            $32.00 <del>/ $67.00</del>
                            <span>Free.</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="gridarea__wraper gridarea__wraper__2 gridarea__course__list"
                        data-aos="fade-up"
                      >
                        <div className="gridarea__img">
                          <img src={gridImg2} alt="grid" />
                        </div>
                        <div className="gridarea__content">
                          <div className="gridarea__list">
                            <ul>
                              <li>
                                <i className="icofont-book-alt"></i> 23 Lesson
                              </li>
                              <li>
                                <i className="icofont-clock-time"></i> 1 hr 30
                                min
                              </li>
                            </ul>
                          </div>
                          <div className="gridarea__heading">
                            <h3>
                              <Link to="/course-details">
                                Foundation course to under stand about softwere
                              </Link>
                            </h3>
                          </div>
                          <div className="gridarea__price">
                            $32.00 <del>/ $67.00</del>
                            <span>Free.</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="gridarea__wraper gridarea__wraper__2 gridarea__course__list"
                        data-aos="fade-up"
                      >
                        <div className="gridarea__img">
                          <Link to="/course-details">
                            <img src={gridImg3} alt="grid" />
                          </Link>
                        </div>
                        <div className="gridarea__content">
                          <div className="gridarea__list">
                            <ul>
                              <li>
                                <i className="icofont-book-alt"></i> 23 Lesson
                              </li>
                              <li>
                                <i className="icofont-clock-time"></i> 1 hr 30
                                min
                              </li>
                            </ul>
                          </div>
                          <div className="gridarea__heading">
                            <h3>
                              <Link to="/course-details">
                                Strategy law and with for organization
                                Foundation
                              </Link>
                            </h3>
                          </div>
                          <div className="gridarea__price">
                            $32.00 <del>/ $67.00</del>
                            <span>Free.</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="gridarea__wraper gridarea__wraper__2 gridarea__course__list"
                        data-aos="fade-up"
                      >
                        <div className="gridarea__img">
                          <Link to="/course-details">
                            <img src={gridImg4} alt="grid" />
                          </Link>
                        </div>
                        <div className="gridarea__content">
                          <div className="gridarea__list">
                            <ul>
                              <li>
                                <i className="icofont-book-alt"></i> 23 Lesson
                              </li>
                              <li>
                                <i className="icofont-clock-time"></i> 1 hr 30
                                min
                              </li>
                            </ul>
                          </div>
                          <div className="gridarea__heading">
                            <h3>
                              <Link to="/course-details">
                                The business Intelligence analyst with Course &
                                2023
                              </Link>
                            </h3>
                          </div>
                          <div className="gridarea__price">
                            $32.00 <del>/ $67.00</del>
                            <span>Free.</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="gridarea__wraper gridarea__wraper__2 gridarea__course__list"
                        data-aos="fade-up"
                      >
                        <div className="gridarea__img">
                          <Link to="/course-details">
                            <img src={gridImg5} alt="grid" />
                          </Link>
                        </div>
                        <div className="gridarea__content">
                          <div className="gridarea__list">
                            <ul>
                              <li>
                                <i className="icofont-book-alt"></i> 23 Lesson
                              </li>
                              <li>
                                <i className="icofont-clock-time"></i> 1 hr 30
                                min
                              </li>
                            </ul>
                          </div>
                          <div className="gridarea__heading">
                            <h3>
                              <Link to="/course-details">
                                Become a product Manager learn the skills & job.
                              </Link>
                            </h3>
                          </div>
                          <div className="gridarea__price">
                            $32.00 <del>/ $67.00</del>
                            <span>Free.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main__pagination__wrapper" data-aos="fade-up">
                    <ul className="main__page__pagination">
                      <li>
                        <Link className="disable" to=" ">
                          <i className="icofont-double-left"></i>
                        </Link>
                      </li>
                      <li>
                        <Link className="active" to=" ">
                          1
                        </Link>
                      </li>
                      <li>
                        <Link to=" ">2</Link>
                      </li>
                      <li>
                        <Link to=" ">3</Link>
                      </li>
                      <li>
                        <Link to=" ">
                          <i className="icofont-double-right"></i>
                        </Link>
                      </li>
                    </ul>
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
export default Courses;
