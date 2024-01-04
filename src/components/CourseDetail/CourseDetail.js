import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import blog7 from "../../img/blog/blog_7.png";
import blog8 from "../../img/blog/blog_8.png";
import video from "../../img/icon/video.png";
import blogDetail7 from "../../img/blog-details/blog-details__7.png";
import TopBar from "../TopBar/TopBar";
import NavBar from "../NavBar/NavBar";
import ajaxCall from "../../helpers/ajaxCall";
import { useSelector } from "react-redux";

const CourseDetail = () => {
  const { courseId } = useParams();
  const authData = useSelector((state) => state.authStore);

  const [courseDetail, setCouresDetail] = useState();
  const [coursePackages, setCoursePackages] = useState();

  console.log("-----courseDetail----->", courseDetail);

  console.log("-----coursePackages----->", coursePackages);

  const getCourseDetail = async () => {
    try {
      const response = await ajaxCall(
        `/courseretupddelview/${courseId}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: "PATCH",
        },
        8000
      );
      if (response.status === 200) {
        setCouresDetail(response.data);
      } else {
        console.error("---error---->");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getCoursePackages = async () => {
    try {
      const response = await ajaxCall(
        `/course/${courseId}/packages/`,
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
        setCoursePackages(response.data);
      } else {
        console.error("---error---->");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCourseDetail();
    getCoursePackages();
  }, [courseId]);

  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8">
                  <div
                    className="blogarae__img__2 course__details__img__2"
                    data-aos="fade-up"
                  >
                    <img src={blog8} alt="blog" />
                    <div className="registerarea__content course__details__video">
                      <div className="registerarea__video">
                        <div className="video__pop__btn">
                          <Link
                            className="video-btn"
                            to="https://www.youtube.com/watch?v=vHdclsdkp28"
                          >
                            <img src={video} alt="" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="blog__details__content__wraper">
                    <div className="course__button__wraper" data-aos="fade-up">
                      <div className="course__button">
                        <Link to="">Featured</Link>
                        <Link className="course__2" to="">
                          Ux Design
                        </Link>
                      </div>
                      <div className="course__date">
                        <p>
                          Last Update:<span> Sep 29, 2023</span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="course__details__heading"
                      data-aos="fade-up"
                    >
                      <h3>{courseDetail?.Course_Title}</h3>
                    </div>
                    <div className="course__details__price" data-aos="fade-up">
                      <ul>
                        <li>
                          <div className="course__price">
                            $32.00 <del>/ $67.00</del>
                          </div>
                        </li>
                        <li>
                          <div className="course__details__date">
                            <i className="icofont-book-alt"></i> 23 Lesson
                          </div>
                        </li>
                        <li>
                          <div className="course__star">
                            <i className="icofont-star"></i>
                            <i className="icofont-star"></i>
                            <i className="icofont-star"></i>
                            <i className="icofont-star"></i>
                            <i className="icofont-star"></i>
                            <span>(44)</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="course__details__paragraph"
                      data-aos="fade-up"
                    >
                      <p>{courseDetail?.Short_Description}</p>
                    </div>
                    <h4 className="sidebar__title" data-aos="fade-up">
                      Course Details
                    </h4>
                    <div className="course__details__wraper" data-aos="fade-up">
                      <ul>
                        <li>
                          Instructor :
                          <span>
                            {courseDetail?.primary_instructor?.username}
                          </span>
                        </li>
                        <li>
                          Category :<span>{courseDetail?.Category?.name}</span>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          Course level :<span>{courseDetail?.Level?.name}</span>
                        </li>
                        <li>
                          Language : <span>{courseDetail?.Language?.name}</span>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="course__details__tab__wrapper"
                      data-aos="fade-up"
                    >
                      <div className="row">
                        <div className="col-xl-12">
                          <ul
                            className="nav  course__tap__wrap"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link active"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__two"
                                type="button"
                              >
                                <i className="icofont-book-alt"></i>Curriculum
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__one"
                                type="button"
                              >
                                <i className="icofont-paper"></i>Description
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="tab-content tab__content__wrapper"
                        id="myTabContent"
                      >
                        <div
                          className="tab-pane fade  active show"
                          id="projects__two"
                          role="tabpanel"
                          aria-labelledby="projects__two"
                        >
                          <div
                            className="accordion content__cirriculum__wrap"
                            id="accordionExample"
                          >
                            <div className="accordion-item">
                              <h2 className="accordion-header" id="headingOne">
                                <button
                                  className="accordion-button"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  Course content
                                </button>
                              </h2>
                              <div
                                id="collapseOne"
                                className="accordion-collapse collapse show"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  <div className="scc__wrap">
                                    <div className="scc__info">
                                      <i className="icofont-video-alt"></i>
                                      <h5>
                                        <span>Video :</span>
                                      </h5>
                                    </div>
                                    <div className="scc__meta">
                                      <Link
                                        to={courseDetail?.Course_Overview_URL}
                                      >
                                        <span className="question">
                                          <i className="icofont-eye"> </i>
                                          Preview
                                        </span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="projects__one"
                          role="tabpanel"
                          aria-labelledby="projects__one"
                        >
                          <div className="experence__heading">
                            <h5>Experience Description</h5>
                          </div>
                          <div className="experence__description">
                            <p className="description__1">
                              {courseDetail?.Description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="course__list__wraper" data-aos="fade-up">
                      <div className="blog__details__heading__2">
                        <h5>Why search Is Important ?</h5>
                      </div>
                      <div
                        className="aboutarea__list__2 blog__details__list__2"
                        data-aos="fade-up"
                      >
                        <ul>
                          <li>
                            <i className="icofont-check"></i>
                            <p>{courseDetail?.faqs}</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4">
                  <div className="course__details__sidebar">
                    <div className="event__sidebar__wraper" data-aos="fade-up">
                      <div
                        className="blogarae__img__2 course__details__img__2"
                        data-aos="fade-up"
                      >
                        <img src={blog7} alt="blog" />
                        <div className="registerarea__content course__details__video">
                          <div className="registerarea__video">
                            <div className="video__pop__btn">
                              <Link
                                className="video-btn"
                                to="https://www.youtube.com/watch?v=vHdclsdkp28"
                              >
                                <img src={video} alt="" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="event__price__wraper">
                        <div className="event__price">
                          $32.00 <del>/ $67.00</del>
                        </div>
                        <div className="event__Price__button">
                          <Link to="">68% OFF</Link>
                        </div>
                      </div>
                      <div className="course__summery__button">
                        <Link className="default__button">Enroll Now</Link>
                      </div>
                      <div className="course__summery__lists">
                        <ul>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Instructor:</span>
                              <span className="sb_content">
                                <Link>
                                  {courseDetail?.primary_instructor?.username}
                                </Link>
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Start Date</span>
                              <span className="sb_content">
                                {courseDetail?.EnrollmentStartDate}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">End Date</span>
                              <span className="sb_content">
                                {courseDetail?.EnrollmentEndDate}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Max Enroll</span>
                              <span className="sb_content">
                                {courseDetail?.max_enrollments}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Skill Level</span>
                              <span className="sb_content">
                                {courseDetail?.Level?.name}
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="course__summery__item">
                              <span className="sb_label">Language</span>
                              <span className="sb_content">
                                {courseDetail?.Language?.name}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    className="blogsidebar__content__wraper__2"
                    data-aos="fade-up"
                  >
                    <h4 className="sidebar__title">Packages</h4>
                    <ul className="course__details__populer__list">
                      {coursePackages?.packages?.map((name, index) => (
                        <li key={index}>
                          <div className="course__details__populer__img">
                            <img src={blogDetail7} alt="populer" />
                          </div>
                          <div className="course__details__populer__content">
                            <span>$32,000</span>
                            <h6>
                              <Link to="">{name}</Link>
                            </h6>
                          </div>
                        </li>
                      ))}
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

export default CourseDetail;
