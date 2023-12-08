import React from "react";
import { Link } from "react-router-dom";
import price1 from "../img/icon/price__1.png";
import price2 from "../img/icon/price__2.png";
import price3 from "../img/icon/price__3.png";

const PricingArea = () => {
  return (
    <div className="pricingarea sp_bottom_100">
      <div className="container">
        <div className="row" data-aos="fade-up">
          <div className="section__title text-center">
            <div className="section__title__button">
              <div className="default__small__button">Pricing Plan</div>
            </div>
            <div className="section__title__heading">
              <h2>
                Choose The Best Package
                <br />
                For your Learning
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
            data-aos="fade-up"
          >
            <div className="pricingarea__content__wraper">
              <div className="pricingarea__heading">
                <div className="pricingarea__plan__type">
                  <h6>FREE</h6>
                  <img src={price1} alt="" />
                </div>

                <div className="pricingarea__number">
                  <h1>
                    <span className="price__currency">$</span>0
                    <span className="price__durition">/ month</span>
                  </h1>
                </div>
                <p>Perfect for startup</p>
              </div>
              <div className="pricingarea__list">
                <ul>
                  <li>
                    <i className="icofont-check"></i> 2 user
                  </li>
                  <li>
                    <i className="icofont-check"></i> Learning Scope
                  </li>
                  <li>
                    <i className="icofont-close close__button"></i> Team
                    collaboration
                  </li>
                  <li>
                    <i className="icofont-check dark__color__2"></i> Export HTML
                    code
                  </li>
                  <li>
                    <i className="icofont-check"></i> Upload Your Logo
                  </li>
                </ul>
              </div>
              <div className="pricingarea__button">
                <Link className="default__button" to="#">
                  Get Started
                </Link>
              </div>
              <div className="pricingarea__text">
                <p>No credit card required</p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
            data-aos="fade-up"
          >
            <div className="pricingarea__content__wraper">
              <div className="pricingarea__heading">
                <div className="pricingarea__plan__type">
                  <h6>BASIC</h6>
                  <img src={price2} alt="" />
                </div>

                <div className="pricingarea__number">
                  <h1>
                    <span className="price__currency">$</span>29
                    <span className="price__durition">/ month</span>
                  </h1>
                </div>
                <p>Perfect for startup</p>
              </div>
              <div className="pricingarea__list">
                <ul>
                  <li>
                    <i className="icofont-check"></i> 5 user
                  </li>
                  <li>
                    <i className="icofont-check"></i> Learning Scope
                  </li>
                  <li>
                    <i className="icofont-close close__button"></i> Team
                    collaboration
                  </li>
                  <li>
                    <i className="icofont-check dark__color__2"></i> Export HTML
                    code
                  </li>
                  <li>
                    <i className="icofont-check"></i> Upload Your Logo
                  </li>
                </ul>
              </div>
              <div className="pricingarea__button pricingarea__button__2">
                <Link className="default__button" to="#">
                  Get Started
                </Link>
              </div>
              <div className="pricingarea__text">
                <p>No credit card required</p>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
            data-aos="fade-up"
          >
            <div className="pricingarea__content__wraper">
              <div className="pricingarea__heading">
                <div className="pricingarea__plan__type">
                  <h6>PRO</h6>
                  <img src={price3} alt="" />
                </div>

                <div className="pricingarea__number">
                  <h1>
                    <span className="price__currency">$</span>59
                    <span className="price__durition">/ month</span>
                  </h1>
                </div>
                <p>Perfect for startup</p>
              </div>
              <div className="pricingarea__list">
                <ul>
                  <li>
                    <i className="icofont-check"></i> 2 user
                  </li>
                  <li>
                    <i className="icofont-check"></i> Learning Scope
                  </li>
                  <li>
                    <i className="icofont-close close__button"></i> Team
                    collaboration
                  </li>
                  <li>
                    <i className="icofont-check dark__color__2"></i> Export HTML
                    code
                  </li>
                  <li>
                    <i className="icofont-check"></i> Upload Your Logo
                  </li>
                </ul>
              </div>
              <div className="pricingarea__button">
                <Link className="default__button" to="#">
                  Get Started
                </Link>
              </div>
              <div className="pricingarea__text">
                <p>No credit card required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingArea;
