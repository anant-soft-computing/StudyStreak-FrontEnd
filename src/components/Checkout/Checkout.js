import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Package, Tag, User, Cpu } from "lucide-react";
import { Spinner } from "react-bootstrap";
import logo from "../../img/logo/Logo.png";
import ajaxCall from "../../helpers/ajaxCall";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    packageId,
    courseType,
    courseName,
    packageName,
    packagePrice,
    selectedBatch,
  } = location.state || {};

  const [discount, setDiscount] = useState(0);
  const [noCoupon, setNoCoupon] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoading, setIsScriptLoading] = useState(false);

  const authData = useSelector((state) => state.authStore);
  const package_amount = discount ? packagePrice - discount : packagePrice;

  const loadScript = (src) => {
    return new Promise((resolve) => {
      setIsScriptLoading(true);
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        setIsScriptLoading(false);
        resolve(true);
      };
      script.onerror = () => {
        setIsScriptLoading(false);
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

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

  const handleEnrollButton = async () => {
    if (!authData.loggedIn) {
      toast.error("Please login to enroll in this course");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      setIsLoading(false);
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const body =
      courseType === "TAUGHT"
        ? {
            amount: package_amount,
            currency: "INR",
            product_type: "batch",
            product_id: selectedBatch,
          }
        : {
            amount: package_amount,
            currency: "INR",
            product_type: "package",
            product_id: packageId,
          };

    try {
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
        setIsLoading(false);
        alert("Server error. Are you online?");
        return;
      }

      // Getting the order details back
      const { amount, id: order_id, currency } = response.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount?.toString(),
        currency: currency,
        name: `${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`,
        description: `Payment for ${courseName} - ${packageName}`,
        image: logo,
        order_id: order_id,
        handler: async function (response) {
          const data = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature_id: response.razorpay_signature,
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
            navigate("/studentDashboard");
          }
        },
        prefill: {
          name: `${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`,
          email: userDetails?.user?.email,
          contact: userDetails?.phone_no,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error("Payment process failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
                          Coupon Discount
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
                <div className="flex flex-col md:flex-row gap-4">
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
                    Coupon Applied Successfully! You saved ₹{discount}
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
                          {userDetails.user.last_name}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {userDetails.user.email}
                        </p>
                        {userDetails.phone_no && (
                          <p className="text-sm text-neutral-600">
                            Phone: {userDetails.phone_no}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="pt-6 space-y-4">
                <button
                  onClick={handleEnrollButton}
                  disabled={isLoading || isScriptLoading}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 shadow-soft disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading || isScriptLoading ? (
                    <Spinner animation="border" style={{ color: "white" }} />
                  ) : (
                    `Pay ${package_amount}`
                  )}
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
