import React from "react";
import { Link } from "react-router-dom";
import blog1 from "../img/blog/blog_1.png";
import blog2 from "../img/blog/blog_2.png";
import blog3 from "../img/blog/blog_3.png";
import blog4 from "../img/blog/blog_4.png";

const BlogSection = () => {
  return (
    <div className="blogarea sp_bottom_70 sp_top_100">
      <div className="container">
        <div className="row" data-aos="fade-up">
          <div className="col-xl-12">
            <div className="section__title text-center">
              <div className="section__title__button">
                <div className="default__small__button">News & Blogs</div>
              </div>
              <div className="section__title__heading">
                <h2>Latest News & Blog</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-8" data-aos="fade-up">
            <div className="blogarea__content__wraper">
              <div className="blogarea__img">
                <img src={blog1} alt="blog" />
                <div className="blogarea__date">
                  20
                  <span>Oct</span>
                </div>
              </div>
              <div className="blogarea__text__wraper">
                <h3>
                  <Link to="#">
                    It is a long established fact that a reader will be Standard
                    Part
                  </Link>
                </h3>
                <div className="blogarea__para">
                  <p>
                    A wonderful serenity has taken possession of my entire soul,
                    like these sweet morning spring which I enjoy with my whole
                    heart. I am alone, and feel the charm of existence in this
                    spot, which was created for the bliss of souls like mine. I
                    am so happy, my dear friend, so absorbed in the exquisite
                    sense of mere. A wonderful serenity has taken possession of
                    my entire soul, like these sweet mornings spring which I
                    enjoy …
                  </p>
                </div>
                <div className="blogarea__icon">
                  <div className="blogarea__person">
                    <div className="blogarea__img">
                      <img src={blog2} alt="" />
                    </div>
                    <div className="blogarea__name">
                      <span>By</span>: Mirnsdo Jons
                    </div>
                  </div>
                  <div className="blogarea__list">
                    <ul>
                      <li>
                        <Link to="#">
                          <i className="icofont-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icofont-youtube-play"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icofont-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icofont-twitter"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4" data-aos="fade-up">
            <div className="blogarea__content__wraper">
              <div className="blogarea__img">
                <img src={blog3} alt="blog" />
                <div className="blogarea__date small__date">
                  20
                  <span>Oct</span>
                </div>
              </div>
              <div className="blogarea__text__wraper blogarea__text__wraper__2">
                <h3>
                  <Link to="#">
                    It is a long established fact that a reader will be Standard
                    Part
                  </Link>
                </h3>
              </div>
            </div>
            <div className="blogarea__content__wraper">
              <div className="blogarea__img">
                <img src={blog4} alt="blog" />
                <div className="blogarea__date small__date">
                  20
                  <span>Oct</span>
                </div>
              </div>
              <div className="blogarea__text__wraper blogarea__text__wraper__2">
                <h3>
                  <Link to="#">
                    It is a long established fact that a reader will be Standard
                    Part
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
