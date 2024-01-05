import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gridImg1 from "../../img/grid/grid_1.png";
import ajaxCall from "../../helpers/ajaxCall";
import { useSelector } from "react-redux";

const Courses = () => {
  const [courseList, setCouresList] = useState([]);
  const [level, setLevel] = useState([]);
  const [category, setCategory] = useState([]);

  const authData = useSelector((state) => state.authStore);

  const getCourses = async () => {
    try {
      const response = await ajaxCall(
        `/courselistview/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: "GET",
        },
        8000
      );

      if (response.status === 200) {
        setCouresList(response.data);
      } else {
        console.log("---error---->");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await ajaxCall(
        `/categoryview/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: "GET",
        },
        8000
      );

      if (response.status === 200) {
        setCategory(response.data);
      } else {
        console.log("---error---->");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getLevels = async () => {
    try {
      const response = await ajaxCall(
        `/levelView/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        setLevel(response.data);
      } else {
        console.log("---error---->");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getCourses();
    getCategories();
    getLevels();
  }, []);

  return (
    <>
      <div className="coursearea sp_top_100 sp_bottom_100">
        <div className="container">
          <div className="row">
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
                  <div className="course__tag__list">
                    <ul>
                      {category.map(({ name }) => (
                        <li>
                          <Link>
                            <div
                              className={`course__check__box ${
                                name.selected ? "active" : ""
                              }`}
                            ></div>
                            <span className={name.selected ? "active" : ""}>
                              {name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="course__sidebar__wraper" data-aos="fade-up">
                <div className="course__heading">
                  <h5>Skill Level</h5>
                </div>
                <div className="course__tag__list">
                  <ul>
                    {level.map(({ name }) => (
                      <li>
                        <Link>
                          <div
                            className={`course__check__box ${
                              name.selected ? "active" : ""
                            }`}
                          ></div>
                          <span className={name.selected ? "active" : ""}>
                            {name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-9 col-md-8 col-12">
              <div className="tab-content tab__content__wrapper with__sidebar__content">
                <div>
                  <div className="row">
                    {courseList.map((course) => (
                      <div
                        className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12"
                        data-aos="fade-up"
                        key={course.id}
                      >
                        <div className="gridarea__wraper gridarea__wraper__2">
                          <div className="gridarea__img">
                            <Link to={`/course-detail/${course?.id}`}>
                              <img src={gridImg1} alt="gridImg1" />
                            </Link>
                          </div>
                          <div className="gridarea__content">
                            <div className="gridarea__list">
                              <ul>
                                <li>
                                  <i className="icofont-book-alt"></i>{" "}
                                  {course?.lessons?.length} Lessons
                                </li>
                                <li>
                                  <i className="icofont-clock-time"></i>{" "}
                                  {course?.lessons.reduce(
                                    (totalDuration, lesson) =>
                                      totalDuration +
                                      parseInt(lesson?.Lesson_Duration),
                                    0
                                  )}{" "}
                                  Mins
                                </li>
                              </ul>
                            </div>
                            <div className="gridarea__heading">
                              <h3>
                                <Link to="/course-detail">
                                  {course?.Course_Title}
                                </Link>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
                    <Link className="active" to="">
                      1
                    </Link>
                  </li>
                  <li>
                    <Link to="">2</Link>
                  </li>
                  <li>
                    <Link to="">3</Link>
                  </li>
                  <li>
                    <Link to="">
                      <i className="icofont-double-right"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Courses;
