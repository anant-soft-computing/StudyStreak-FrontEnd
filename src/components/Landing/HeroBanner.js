import React from "react";
import about10 from "../../img/about/about_10.png";
import herobanner__1 from "../../img/herobanner/herobanner__1.png";
import herobanner__2 from "../../img/herobanner/herobanner__2.png";
import herobanner__3 from "../../img/herobanner/herobanner__3.png";
import herobanner__4 from "../../img/herobanner/herobanner__4.png";
import herobanner__5 from "../../img/herobanner/herobanner__5.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {
  const authData = useSelector((state) => state.authStore);
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (!authData.loggedIn) {
      navigate("/login");
    } else {
      navigate("/mockTest");
    }
  };
  return (
    <div className="herobannerarea herobannerarea__2">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="herobannerarea__content__wraper">
              <div className="herobannerarea__title">
                <div className="herobannerarea__small__title">
                  <span>Test Solution</span>
                </div>
                <div className="herobannerarea__title__heading__2 herobannerarea__title__heading__3">
                  <h2>Study Towards Your Dream Destination</h2>
                </div>
              </div>
              <div className="herobannerarea__text herobannerarea__text__2">
                <p>
                  Real-Time AI Based Results , Live Online Class Access
                  Thousands Of Tests To Practice{" "}
                </p>
              </div>
              <div>
                <button className="default__button" onClick={handleOnClick}>
                  Free Mini Test
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <div className="aboutarea__img__2" data-tilt>
              <img className="aboutimg__1" src={about10} alt="aboutimg" />
            </div>
          </div>
        </div>
      </div>
      <div className="herobannerarea__icon__2">
        <img
          className="herobanner__common__img herobanner__img__1"
          src={herobanner__1}
          alt="photoo"
        />
        <img
          className="herobanner__common__img herobanner__img__2"
          src={herobanner__2}
          alt="photoo"
        />
        <img
          className="herobanner__common__img herobanner__img__3"
          src={herobanner__3}
          alt="photoo"
        />
        <img
          className="herobanner__common__img herobanner__img__4"
          src={herobanner__4}
          alt="photoo"
        />
        <img
          className="herobanner__common__img herobanner__img__5"
          src={herobanner__5}
          alt="photoo"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
