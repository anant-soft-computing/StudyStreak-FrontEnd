import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import gridImg1 from "../../img/grid/grid_1.png";
import gridImg2 from "../../img/grid/grid_2.png";
import gridImg3 from "../../img/grid/grid_3.png";
import gridImg4 from "../../img/grid/grid_4.png";
import gridImg5 from "../../img/grid/grid_5.png";
import TopBar from "../../components/TopBar/TopBar";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";

const Courses = () => {
  const [category, setCategory] = useState([
    {
      name: "Mobile Handset",
      count: 3,
    },
    {
      name: "Americano Dish",
      count: 7,
    },
    {
      name: "Raxila Dish nonyte",
      count: 9,
    },
    {
      name: "Fresh Vegetable",
      count: 1,
    },
    {
      name: "Fruites",
      count: 0,
    },
  ]);
  const [tags, setTags] = useState([
    {
      name: "Mechanic",
      selected: true,
    },
    {
      name: "English",
      selected: false,
    },
    {
      name: "Computer Science",
      selected: false,
    },
    {
      name: "Data & Tech",
      selected: false,
    },
    {
      name: "Ux Desgin",
      selected: false,
    },
  ]);
  const [skillLevel, setSkillLevel] = useState([
    {
      name: "All",
      selected: true,
      link: " ",
    },
    {
      name: "Fullstack",
      selected: false,
      link: " ",
    },
    {
      name: "English Learn",
      selected: false,
      link: " ",
    },
    {
      name: "Intermediate",
      selected: false,
      link: " ",
    },
    {
      name: "Wordpress",
      selected: false,
      link: " ",
    },
  ]);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    (async () => {
      await axios
        .get("http://65.20.73.247/api/courselistview")
        .then((res) => {
          setCourseList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  }, []);

  return (
    <>
      <TopBar />
      <NavBar />
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
                          {category.map((cat) => (
                            <li>
                              <Link to=" ">
                                {cat.name}
                                <span>{cat.count}</span>
                              </Link>
                            </li>
                          ))}
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
                        {tags.map((tag) => (
                          <li>
                            <Link to=" ">
                              <div
                                className={`course__check__box ${
                                  tag.selected ? "active" : ""
                                }`}
                              ></div>
                              <span className={tag.selected ? "active" : ""}>
                                {tag.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="course__sidebar__wraper" data-aos="fade-up">
                    <div className="course__heading">
                      <h5>Skill Level</h5>
                    </div>
                    <div className="course__skill__list">
                      <ul>
                        {skillLevel.map((skill) => (
                          <li>
                            <Link to={skill.link}>{skill.name}</Link>
                          </li>
                        ))}
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
                        {courseList.map((course) => (
                          <div
                            className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                            data-aos="fade-up"
                          >
                            <div className="gridarea__wraper gridarea__wraper__2">
                              <div className="gridarea__img">
                                <Link to="/course-detail">
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
                                      <i className="icofont-clock-time"></i> 1
                                      hr 30 min
                                    </li>
                                  </ul>
                                </div>
                                <div className="gridarea__heading">
                                  <h3>
                                    <Link to="/course-detail">
                                      {course.Course_Title}
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
                        ))}
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
                          <Link to="/course-detail">
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
                              <Link to="/course-detail">
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
                              <Link to="/course-detail">
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
                          <Link to="/course-detail">
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
                              <Link to="/course-detail">
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
                          <Link to="/course-detail">
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
                              <Link to="/course-detail">
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
                          <Link to="/course-detail">
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
                              <Link to="/course-detail">
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
