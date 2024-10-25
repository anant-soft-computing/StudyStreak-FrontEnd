import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../img/logo/Logo.png";
import ajaxCall from "../../helpers/ajaxCall";

const Checkout = () => {
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [noCoupon, setNoCoupon] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const authData = useSelector((state) => state.authStore);

  const location = useLocation();
  const {
    courseId,
    courseType,
    packageId,
    selectedBatchIds,
    courseName,
    packageName,
    packagePrice,
  } = location.state || {};

  const navigate = useNavigate();

  const package_amount = discount ? packagePrice - discount : packagePrice;

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  useEffect(() => {
    if (!couponCode) {
      setDiscount(0);
      setNoCoupon("");
      return;
    }
    (async () => {
      try {
        const response = await ajaxCall(
          `/cuponview/?cupon_code=${couponCode}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );

        if (response?.status === 200) {
          setNoCoupon("");
          setDiscount(response.data[0].discount);
        } else if (
          (response?.status === 400 || response?.status === 404) &&
          response.isError
        ) {
          setDiscount(0);
          setNoCoupon("Invalid Coupon Code");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [couponCode]);

  const handlePackgaeAdd = async () => {
    const data = JSON.stringify({
      package: packageId,
    });
    try {
      const response = await ajaxCall(
        "/student/enrollment/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: data,
        },
        8000
      );
      if (response.status === 201) {
        console.log("success");
      } else if (response.status === 400 && response.isError) {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  };

  const handleEnroll = async () => {
    const data = JSON.stringify({
      package_ids: [packageId],
      course_ids: [parseInt(courseId)],
    });
    try {
      const response = await ajaxCall(
        "/enrollpackagestudentview/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: data,
        },
        8000
      );
      if (response.status === 201) {
        navigate("/studentDashboard");
        toast.success(response?.data?.detail);
        handlePackgaeAdd();
      } else if (response.status === 400 && response.isError) {
        toast.error(response?.data?.detail);
      } else {
        toast.error("Something went wrong, please try again later");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleEnrollNow = async () => {
    const data = JSON.stringify({
      package_id: packageId,
      batch_ids: selectedBatchIds,
      course_id: parseInt(courseId),
    });
    try {
      const response = await ajaxCall(
        "/enroll-package/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: data,
        },
        8000
      );
      if (response.status === 201) {
        navigate("/studentDashboard");
        toast.success(response?.data?.detail);
        handlePackgaeAdd();
      } else if (response.status === 400 && response.isError) {
        toast.error(response?.data?.detail);
      } else {
        toast.error("Something went wrong, please try again later");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };

  const handleEnrollButton = async () => {
    if (!authData.loggedIn) {
      toast.error("Please Do Login For Enroll Course");
      navigate("/login");
      return;
    }
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order

    const body = {
      amount: package_amount,
      currency: "INR",
    };

    // const result = await axios.post("http://localhost:5000/payment/orders");

    const response = await ajaxCall(
      "/create/order/",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
          }`,
        },
        method: "POST",
        body: JSON.stringify(body),
      },
      8000
    );

    if (!response) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = response.data;

    const userData = JSON.parse(localStorage.getItem("loginInfo"));

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount?.toString(),
      currency: currency,
      name: `${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`,
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          amount,
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          signature_id: response.razorpay_signature,
          user: userData?.userId,
          product: [packageId],
        };

        const result = await ajaxCall(
          "/confirm/order/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "POST",
            body: JSON.stringify(data),
          },
          8000
        );

        if (result?.status === 200) {
          toast.success("Payment Successful");
          courseType === "TAUGHT" ? handleEnrollNow() : handleEnroll();
        }
      },
      prefill: {
        name: userData?.username,
        email: userDetails?.user?.email,
        contact: userDetails?.phone_no,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/studentview/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setUserDetails(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
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
                            <td className="checkoutarea__ctg__type">Course</td>
                            <td className="checkoutarea__cgt__des">
                              {courseName}
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="checkoutarea__item prd-name">
                            <td className="checkoutarea__ctg__type">Package</td>
                            <td className="checkoutarea__cgt__des">
                              {packageName}
                            </td>
                          </tr>
                          <tr className="checkoutarea__item">
                            <td className="checkoutarea__ctg__type">Total</td>
                            <td className="checkoutarea__cgt__des">
                              <i className="icofont-rupee"></i>
                              {package_amount}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="col-xl-6">
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label>Have a Coupon Code ?</label>
                            <input
                              type="text"
                              placeholder="Coupon Code"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="text-danger">{noCoupon}</div>
                      </div>
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
  );
};

export default Checkout;
