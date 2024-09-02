import React, { useEffect, useState } from "react";
import ajaxCall from "../../helpers/ajaxCall";
import CourseListItem from "./CourseListItem";

const Courses = () => {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleCategory = ({ name, selected }) => {
    setCategory((prev) =>
      prev.map((category) =>
        category.name === name ? { ...category, selected: !selected } : category
      )
    );
    setSelectedCategory(selected ? "" : name);
  };

  const handleLevel = ({ name, selected }) => {
    setLevel((prev) =>
      prev.map((level) =>
        level.name === name ? { ...level, selected: !selected } : level
      )
    );
    setSelectedLevel(selected ? "" : name);
  };

  const fetchData = async (url, setter) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        setter(response.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData(`/categoryview/`, setCategory);
    fetchData(`/levelView/`, setLevel);
  }, []);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="theme__shadow__circle"></div>
        <div className="theme__shadow__circle shadow__right"></div>
        <div className="coursearea sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-4 col-12">
                <div className="course__sidebar__wraper">
                  <div className="course__heading">
                    <h5>Search</h5>
                  </div>
                  <div className="course__input">
                    <input
                      type="text"
                      placeholder="Search course here..."
                      value={search}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <div className="search__button">
                      <button>
                        <i className="icofont-search-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="course__sidebar__wraper">
                  <div className="categori__wraper">
                    <div className="course__heading">
                      <h5>Categories</h5>
                    </div>
                    <div className="course__tag__list">
                      <ul>
                        {category.map(({ id, name, selected }) => (
                          <li key={id}>
                            <label className="d-flex gap-2">
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={() =>
                                  handleCategory({ name, selected })
                                }
                              />
                              <span className={selected ? "active" : ""}>
                                {name}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="course__sidebar__wraper">
                  <div className="course__heading">
                    <h5>Skill's Level</h5>
                  </div>
                  <div className="course__tag__list">
                    <ul>
                      {level.map(({ id, name, selected }) => (
                        <li key={id}>
                          <label className="d-flex gap-2">
                            <input
                              type="checkbox"
                              checked={selected}
                              onChange={() => handleLevel({ name, selected })}
                            />
                            <span className={selected ? "active" : ""}>
                              {name}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-8 col-12">
                <div className="tab-content tab__content__wrapper with__sidebar__content">
                  <div>
                    <CourseListItem
                      search={search}
                      selectedCategory={selectedCategory}
                      selectedLevel={selectedLevel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Courses;
