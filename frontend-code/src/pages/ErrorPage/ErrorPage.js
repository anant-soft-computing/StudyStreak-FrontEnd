import React from "react";
import error from "../../img/icon/error__1.png";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div>
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
        </div>
        <div className="errorarea sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-10 col-sm-12 col-12 m-auto">
                <div className="errorarea__inner">
                  <div className="error__img">
                    <img src={error} alt="error" />
                  </div>
                  <div className="error__text">
                    <h3>Oops... It looks like you ‘re lost !</h3>
                    <p>
                      Oops! The page you are looking for does not exist. It
                      might have been moved or deleted
                    </p>
                  </div>
                  <div className="error__button">
                    <button className="default__button" onClick={handleOnClick}>
                      Back To Home
                      <i className="icofont-simple-right"></i>
                    </button>
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

export default ErrorPage;
