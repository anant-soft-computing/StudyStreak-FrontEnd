import React, { useState } from "react";
import img1 from "../../img/education/hero_shape2.png";
import img2 from "../../img/education/hero_shape3.png";
import img3 from "../../img/education/hero_shape4.png";
import img4 from "../../img/education/hero_shape5.png";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const [otp, setOtp] = useState(false);
  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="loginarea sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div
                  className="col-xl-8 col-md-8 offset-md-2"
                  data-aos="fade-up"
                >
                  <ul
                    className="nav tab__button__wrap text-center"
                    id="myTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="single__tab__link active"
                        data-bs-toggle="tab"
                        data-bs-target="#projects__one"
                        type="button"
                      >
                        Login
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="single__tab__link"
                        data-bs-toggle="tab"
                        data-bs-target="#projects__two"
                        type="button"
                      >
                        Sign up
                      </button>
                    </li>
                  </ul>
                </div>
                <div
                  className="tab-content tab__content__wrapper"
                  id="myTabContent"
                  data-aos="fade-up"
                >
                  <div
                    className="tab-pane fade active show"
                    id="projects__one"
                    role="tabpanel"
                    aria-labelledby="projects__one"
                  >
                    <div className="col-xl-8 col-md-8 offset-md-2">
                      <div className="loginarea__wraper">
                        <div className="login__heading">
                          <h5 className="login__title">Login</h5>
                          <p className="login__description">
                            Don't have an account yet?{" "}
                            <Link to="/login">Sign up for free</Link>
                          </p>
                        </div>
                        {otp ? (
                          <form action="#">
                            <div className="login__form">
                              <label className="form__label">
                                Username or email
                              </label>
                              <input
                                className="common__login__input"
                                type="text"
                                placeholder="Your username or email"
                              />
                            </div>
                            <div className="col-xl-6">
                              <div className="login__form">
                                <label className="form__label">OTP</label>
                                <div className="otp-input-container d-flex">
                                  <input
                                    className="common__login__input"
                                    type="number"
                                    maxLength="1"
                                  />
                                  <input
                                    className="common__login__input"
                                    type="number"
                                    maxLength="1"
                                  />
                                  <input
                                    className="common__login__input"
                                    type="number"
                                    maxLength="1"
                                  />
                                  <input
                                    className="common__login__input"
                                    type="number"
                                    maxLength="1"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="login__button">
                              <Link className="default__button">Log In</Link>
                            </div>
                          </form>
                        ) : (
                          <form action="#">
                            <div className="login__form">
                              <label className="form__label">
                                Username or email
                              </label>
                              <input
                                className="common__login__input"
                                type="text"
                                placeholder="Your username or email"
                              />
                            </div>
                            <div className="login__form">
                              <label className="form__label">Password</label>
                              <input
                                className="common__login__input"
                                type="password"
                                placeholder="Password"
                              />
                            </div>
                            <div className="login__form d-flex justify-content-between flex-wrap gap-2">
                              <div className="form__check">
                                <input id="forgot" type="checkbox" />
                                <label for="forgot">Remember me</label>
                              </div>
                              <div className="text-end login__form__link">
                                <Link to="">Forgot your password?</Link>
                              </div>
                            </div>
                            <div className="login__button">
                              <Link className="default__button">Log In</Link>
                            </div>
                          </form>
                        )}

                        <div className="login__social__option">
                          {otp ? (
                            <Link onClick={() => setOtp(false)}>
                              Log In with Username or Email
                            </Link>
                          ) : (
                            <Link onClick={() => setOtp(true)}>
                              Log In with Username or OTP
                            </Link>
                          )}
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
                    <div className="col-xl-8 offset-md-2">
                      <div className="loginarea__wraper">
                        <div className="login__heading">
                          <h5 className="login__title">Sing Up</h5>
                          <p className="login__description">
                            Already have an account?{" "}
                            <Link to="/login">Log In</Link>
                          </p>
                        </div>
                        <form action="#">
                          <div className="row">
                            <div className="col-xl-6">
                              <div className="login__form">
                                <label className="form__label">
                                  First Name
                                </label>
                                <input
                                  className="common__login__input"
                                  type="text"
                                  placeholder="First Name"
                                />
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="login__form">
                                <label className="form__label">Last Name</label>
                                <input
                                  className="common__login__input"
                                  type="password"
                                  placeholder="Last Name"
                                />
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="login__form">
                                <label className="form__label">Username</label>
                                <input
                                  className="common__login__input"
                                  type="password"
                                  placeholder="Username"
                                />
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="login__form">
                                <label className="form__label">Email</label>
                                <input
                                  className="common__login__input"
                                  type="password"
                                  placeholder="Your Email"
                                />
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="login__form">
                                <label className="form__label">Password</label>
                                <input
                                  className="common__login__input"
                                  type="password"
                                  placeholder="Password"
                                />
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="login__form">
                                <label className="form__label">Phone No.</label>
                                <input
                                  className="common__login__input"
                                  type="number"
                                  placeholder="Your Phone No."
                                />
                              </div>
                            </div>
                            <div className="col-xl-6">
                              <div className="login__form">
                                <label className="form__label">OTP</label>
                                <div className="otp-input-container d-flex">
                                  <input
                                    className="common__login__input"
                                    type="number"
                                    maxLength="1"
                                  />
                                  <input
                                    className="common__login__input"
                                    type="number"
                                    maxLength="1"
                                  />
                                  <input
                                    className="common__login__input"
                                    type="number"
                                    maxLength="1"
                                  />
                                  <input
                                    className="common__login__input"
                                    type="number"
                                    maxLength="1"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="login__form d-flex justify-content-between flex-wrap gap-2">
                            <div className="form__check">
                              <input id="accept_pp" type="checkbox" />
                              <label for="accept_pp">
                                Accept the Terms and Privacy Policy
                              </label>
                            </div>
                          </div>
                          <div className="login__button">
                            <Link className="default__button">Sign Up</Link>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="login__shape__img educationarea__shape_image">
                <img
                  className="hero__shape hero__shape__1"
                  src={img1}
                  alt="Shape"
                />
                <img
                  className="hero__shape hero__shape__2"
                  src={img2}
                  alt="Shape"
                />
                <img
                  className="hero__shape hero__shape__3"
                  src={img3}
                  alt="Shape"
                />
                <img
                  className="hero__shape hero__shape__4"
                  src={img4}
                  alt="Shape"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
