import React from "react";
import DarkNight from "../../DarkNight";
import TopBar from "../../Topbar";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import img1 from "../../../img/herobanner/herobanner__1.png";
import img2 from "../../../img/herobanner/herobanner__2.png";
import img3 from "../../../img/herobanner/herobanner__3.png";
import img4 from "../../../img/herobanner/herobanner__5.png";
import team4 from '../../../img/team/team__4.png';
import about4 from '../../../img/about/about_4.png';
import grid1 from "../../../img/grid/grid_1.png";
import grid1Small from "../../../img/grid/grid_small_1.jpg";
import grid2 from "../../../img/grid/grid_2.png";
import grid2Small from "../../../img/grid/grid_small_2.jpg";
import { Link } from "react-router-dom";

const InstructorDetails = () => {
  return (
    <>
      <DarkNight />
      <TopBar />
      <Navbar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="breadcrumbarea">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="breadcrumb__content__wraper" data-aos="fade-up">
                    <div className="breadcrumb__title">
                      <h2 className="heading">instructor page</h2>
                    </div>
                    <div className="breadcrumb__inner">
                      <ul>
                        <li>
                          <Link to="/"/>
                        </li>
                        <li>Blog page</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="shape__icon__2">
              <img
                className="shape__icon__img shape__icon__img__1"
                src={img1}
                alt=""
              />
              <img
                className="shape__icon__img shape__icon__img__2"
                src={img2}
                alt=""
              />
              <img
                className="shape__icon__img shape__icon__img__3"
                src={img3}
                alt=""
              />
              <img
                className="shape__icon__img shape__icon__img__4"
                src={img4}
                alt=""
              />
            </div>
          </div>
          <div className="instructor sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                  <div className="instructor__sidebar" data-tilt>
                    <div className="instructor__sidebar__img" data-aos="fade-up">
                      <img src={team4} alt="team" />
                      <div className="instructor__sidebar__small__img">
                        <img src={about4} alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                  <div className="instructor__inner__wraper">
                    <div className="instructor__list">
                      <ul>
                        <li data-aos="fade-up">
                          <div className="instructor__heading">
                            <h3>Hiliary Ouse</h3>
                            <p>Teches Interior marketer</p>
                          </div>
                        </li>
                        <li data-aos="fade-up">
                          <div className="instructor__review">
                            <span>Review:</span>
                            <div className="instructor__star">
                              <i className="icofont-star"></i>
                              <i className="icofont-star"></i>
                              <i className="icofont-star"></i>
                              <i className="icofont-star"></i>
                              <i className="icofont-star"></i>
                              <span>(44)</span>
                            </div>
                          </div>
                        </li>
                        <li data-aos="fade-up">
                          <div className="instructor__follow">
                            <span>Follow Us:</span>
                            <div className="instructor__icon">
                              <ul>
                                <li>
                                  <a href=" ">
                                    <i className="icofont-facebook"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href=" ">
                                    <i className="icofont-twitter"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href=" ">
                                    <i className="icofont-instagram"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href=" ">
                                    <i className="icofont-youtube-play"></i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        <li data-aos="fade-up">
                          <div className="instructor__button">
                            <a className="default__button" href=" ">
                              Follow
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="instructor__content__wraper" data-aos="fade-up">
                      <h6>Short Bio</h6>
                      <p>
                        Only a quid me old mucker squiffy tomfoolery grub cheers
                        ruddy cor blimey guvnor in my flat, up the duff Eaton
                        car boot up the kyver pardon you A bit of how's your
                        father David skive off sloshed, don't get shirty with me
                        chip shop vagabond crikey bugger Queen's English chap.
                        Matie boy nancy boy bite your arm off up the kyver old
                        no biggie fantastic boot, David have it show off show
                        off pick your nose and blow off lost the plot porkies
                        bits and bobs only a quid bugger all mate, absolutely
                        bladdered bamboozled it's your round don't get shirty
                        with me down the pub well.
                      </p>
                    </div>
                    <div className="online__course__wrap">
                      <div className="instructor__heading__2" data-aos="fade-up">
                        <h3>Online Course</h3>
                      </div>
                      <div
                        className="row instructor__slider__active row__custom__class"
                        data-aos="fade-up"
                      >
                        <div className="col-xl-6 column__custom__class">
                          <div className="gridarea__wraper">
                            <div className="gridarea__img">
                              <Link to="/course-details">
                                <img src={grid1} alt="grid" />
                              </Link>
                              <div className="gridarea__small__button">
                                <div className="grid__badge">Data &amp; Tech</div>
                              </div>
                              <div className="gridarea__small__icon">
                                <a href=" ">
                                  <i className="icofont-heart-alt"></i>
                                </a>
                              </div>
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
                              <div className="gridarea__bottom">
                                <Link to="/instructor-details">
                                  <div className="gridarea__small__img">
                                    <img
                                      src={grid1Small}
                                      alt="grid"
                                    />
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
                        <div className="col-xl-6 column__custom__class">
                          <div className="gridarea__wraper">
                            <div className="gridarea__img">
                              <img src={grid2} alt="grid" />
                              <div className="gridarea__small__button">
                                <div className="grid__badge blue__color">
                                  Mechanical
                                </div>
                              </div>
                              <div className="gridarea__small__icon">
                                <a href=" ">
                                  <i className="icofont-heart-alt"></i>
                                </a>
                              </div>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 29 Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 2 hr 10
                                    min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <a href=" ">
                                    Nidnies course to under stand about softwere
                                  </a>
                                </h3>
                              </div>
                              <div className="gridarea__price green__color">
                                $32.00<del>/$67.00</del>
                                <span>.Free</span>
                              </div>
                              <div className="gridarea__bottom">
                                <Link to="/instructor-details">
                                  <div className="gridarea__small__img">
                                    <img
                                      src={grid2Small}
                                      alt="grid"
                                    />
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
                        <div className="col-xl-6 column__custom__class">
                          <div className="gridarea__wraper">
                            <div className="gridarea__img">
                              <Link to="/course-details">
                                <img src={grid1} alt="grid" />
                              </Link>
                              <div className="gridarea__small__button">
                                <div className="grid__badge">Data &amp; Tech</div>
                              </div>
                              <div className="gridarea__small__icon">
                                <a href=" ">
                                  <i className="icofont-heart-alt"></i>
                                </a>
                              </div>
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
                              <div className="gridarea__bottom">
                                <Link to="/instructor-details">
                                  <div className="gridarea__small__img">
                                    <img
                                      src={grid1Small}
                                      alt="grid"
                                    />
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
                        <div className="col-xl-6 column__custom__class">
                          <div className="gridarea__wraper">
                            <div className="gridarea__img">
                              <img src={grid2} alt="grid" />
                              <div className="gridarea__small__button">
                                <div className="grid__badge blue__color">
                                  Mechanical
                                </div>
                              </div>
                              <div className="gridarea__small__icon">
                                <a href=" ">
                                  <i className="icofont-heart-alt"></i>
                                </a>
                              </div>
                            </div>
                            <div className="gridarea__content">
                              <div className="gridarea__list">
                                <ul>
                                  <li>
                                    <i className="icofont-book-alt"></i> 29 Lesson
                                  </li>
                                  <li>
                                    <i className="icofont-clock-time"></i> 2 hr 10
                                    min
                                  </li>
                                </ul>
                              </div>
                              <div className="gridarea__heading">
                                <h3>
                                  <a href=" ">
                                    Nidnies course to under stand about softwere
                                  </a>
                                </h3>
                              </div>
                              <div className="gridarea__price green__color">
                                $32.00<del>/$67.00</del>
                                <span>.Free</span>
                              </div>
                              <div className="gridarea__bottom">
                                <Link to="/instructor-details">
                                  <div className="gridarea__small__img">
                                    <img
                                      src={grid2Small}
                                      alt="grid"
                                    />
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

export default InstructorDetails;
