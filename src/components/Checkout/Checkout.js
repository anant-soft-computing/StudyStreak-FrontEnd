import React from "react";
import Footer from "../Footer/Footer";
import TopBar from "../TopBar/TopBar";
import NavBar from "../NavBar/NavBar";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { packageId, selectedBatchIds, courseName, packageName, packagePrice } =
    location.state || {};

    const handleEnrollButton = () => {
      console.log("--packageId, selectedBatchIds----->", packageId, selectedBatchIds);
    }
    
  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div>
            <div className="theme__shadow__circle"></div>
            <div className="theme__shadow__circle shadow__right"></div>
          </div>
          <div className="checkoutarea sp_bottom_100 sp_top_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-12"></div>
                <div className="col-lg-6 col-md-12 col-12">
                  <div className="checkoutarea__payment__wraper">
                    <div className="checkoutarea__total">
                      <h3>Your order</h3>
                      <div className="checkoutarea__table__wraper">
                        <table className="checkoutarea__table">
                          <thead>
                            <tr className="checkoutarea__item">
                              <td className="checkoutarea__ctg__type">
                                Course
                              </td>
                              <td className="checkoutarea__cgt__des">
                                {courseName}
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="checkoutarea__item prd-name">
                              <td className="checkoutarea__ctg__type">
                                Package
                              </td>
                              <td className="checkoutarea__cgt__des">
                                {packageName}
                              </td>
                            </tr>
                            <tr className="checkoutarea__item">
                              <td className="checkoutarea__ctg__type">Total</td>
                              <td className="checkoutarea__cgt__des">
                                <i className="icofont-rupee"></i>
                                {packagePrice}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="checkoutarea__payment clearfix">
                      <div className="checkoutarea__payment__toggle">
                        <div className="checkoutarea__payment__input__box">
                          <button
                            className="default__button"
                            onClick={handleEnrollButton}
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    </div>
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

export default Checkout;
