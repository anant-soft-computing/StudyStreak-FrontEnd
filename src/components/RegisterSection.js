import React from "react";
import { Link } from "react-router-dom";
import register1 from "../img/register/register__1.png";
import register2 from "../img/register/register__2.png";
import register3 from "../img/register/register__3.png";

const RegisterSection = () => {
  return (
    <div className="registerarea sp_top_90">
      <div className="container">
        <div className="row">
          <div
            className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12"
            data-aos="fade-up"
          >
            <div className="registerarea__wraper">
              <div className="section__title registerarea__section__title">
                <div className="section__title__button">
                  <div className="default__small__button">Course List</div>
                </div>
                <div className="section__title__heading heading__underline">
                  <h2>Register Now</h2>
                </div>
              </div>
              <div className="registerarea__content">
                <div className="registerarea__video">
                  <div className="registerarea__para">
                    <p>Study Towards Your Dream Destination</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12"
            data-aos="fade-up"
          >
            <div className="registerarea__form">
              <div className="registerarea__form__heading">
                <h4>Fill Your Registration</h4>
              </div>
              <form action="#">
                <input
                  className="register__input"
                  type="text"
                  placeholder="Your Name"
                />
                <div className="row">
                  <div className="col-xl-6">
                    <input
                      className="register__input"
                      type="text"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="col-xl-6">
                    <input
                      className="register__input"
                      type="text"
                      placeholder="Phone"
                    />
                  </div>
                </div>
                <input
                  className="register__input"
                  type="text"
                  placeholder="Address"
                />
                <textarea
                  className="register__input textarea"
                  name="#"
                  id="#"
                  cols="30"
                  rows="10"
                  placeholder="Comment"
                ></textarea>
                <div className="registerarea__button">
                  <Link className="default__button" to="#">
                    Sign Up
                    <i className="icofont-long-arrow-right"></i>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="registerarea__img">
        <img className="register__1" src={register1} alt="register" />
        <img className="register__2" src={register2} alt="register" />
        <img className="register__3" src={register3} alt="register" />
      </div>
    </div>
  );
};

export default RegisterSection;
