import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Package, Tag, User, Cpu } from "lucide-react";
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
    <div
      className="min-h-screen bg-neutral-50 py-12"
      style={{ marginTop: "-70px" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-card animate-fade-in-up">
            <div className="border-b border-neutral-200 p-6">
              <h1 className="text-2xl font-heading font-semibold text-neutral-900">
                Checkout
              </h1>
            </div>
            <div className="p-6 space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-heading font-medium text-neutral-800">
                  Order Summary
                </h2>
                <div className="bg-neutral-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-primary-500" />
                      <span className="text-sm font-medium text-neutral-700">
                        Course
                      </span>
                    </div>
                    <span className="text-sm text-neutral-900">
                      {courseName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-primary-500" />
                      <span className="text-sm font-medium text-neutral-700">
                        Package
                      </span>
                    </div>
                    <span className="text-sm text-neutral-900">
                      {packageName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Cpu className="w-5 h-5 text-primary-500" />
                      <span className="text-sm font-medium text-neutral-700">
                        Package Price
                      </span>
                    </div>
                    <span className="text-sm text-neutral-900">
                      ₹ {packagePrice}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Tag className="w-5 h-5 text-primary-500" />
                        <span className="text-sm font-medium text-neutral-700">
                          Coupon Price
                        </span>
                      </div>
                      <span className="text-sm text-neutral-900">
                        ₹ {discount}
                      </span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium text-neutral-900">
                        Total Amount
                      </span>
                      <span className="text-lg font-semibold text-primary-600">
                        ₹{package_amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4 space-y-4">
                <h2 className="text-xl font-heading font-medium text-neutral-800">
                  Apply Coupon
                </h2>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm transition-all duration-200"
                      />
                    </div>
                    {noCoupon && (
                      <div className="mt-4 bg-error-50 text-error-500 px-4 py-2 rounded-lg text-sm animate-fade-in">
                        {noCoupon}
                      </div>
                    )}
                  </div>
                </div>
                {discount > 0 && (
                  <div className="bg-success-50 text-success-700 px-4 py-2 rounded-lg text-sm animate-fade-in">
                    Coupon Applied Successfully! You Saved ₹{discount}
                  </div>
                )}
              </div>
              {userDetails?.user && (
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-medium text-neutral-800">
                    User Details
                  </h2>
                  <div className="bg-neutral-50 rounded-xl p-6 space-y-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-primary-500" />
                      <div>
                        <p className="text-sm font-medium text-neutral-900">
                          {userDetails.user.first_name}{" "}
                          {userDetails.user.last_name} -{" "}
                          {userDetails.user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="pt-6">
                <button
                  onClick={handleEnrollButton}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-soft"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
