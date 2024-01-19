import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ajaxCall from "../../helpers/ajaxCall";

const GridSection = () => {
  const [courseList, setCourseList] = useState([]);
  const [screenType, setScreenType] = useState({
    mobile: false,
    tablet: false,
    desktop: true,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setScreenType({ mobile: true, tablet: false, desktop: false });
      } else if (window.innerWidth <= 991) {
        setScreenType({ mobile: false, tablet: true, desktop: false });
      } else {
        setScreenType({ mobile: false, tablet: false, desktop: true });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    speed: 2000,
    slidesToShow:
      (screenType.mobile && 1) ||
      (screenType.tablet && 2) ||
      (screenType.desktop && 3),
    slidesToScroll: 1,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const getCourses = async () => {
    try {
      const response = await ajaxCall(
        `/courselistview/`,
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
        setCourseList(response.data);
      } else {
        console.log("---error---->");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="gridarea gridarea__2">
      <div className="container">
        <Slider {...settings}>
          {courseList.length > 0 &&
            courseList.map((course) => (
              <div key={course.id} className="gridarea__wraper">
                <div className="gridarea__img">
                  <Link to={`/courseDetail/${course?.id}`}>
                    <img
                      src={course?.Course_Thumbnail}
                      alt={course?.Course_Title}
                    />
                  </Link>
                </div>
                <div className="gridarea__content">
                  <div className="gridarea__list">
                    <ul className="ps-0">
                      <li>
                        <i className="icofont-book-alt"></i>{" "}
                        {course?.lessons?.length} Lessons
                      </li>
                      <li>
                        <i className="icofont-clock-time"></i>{" "}
                        {course?.lessons.reduce(
                          (totalDuration, lesson) =>
                            totalDuration + parseInt(lesson?.Lesson_Duration),
                          0
                        )}{" "}
                        Minutes
                      </li>
                    </ul>
                  </div>
                  <div className="gridarea__heading">
                    <h3 className="gridarea_link">
                      <Link to={`/courseDetail/${course.id}`}>
                        {course?.Course_Title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default GridSection;
