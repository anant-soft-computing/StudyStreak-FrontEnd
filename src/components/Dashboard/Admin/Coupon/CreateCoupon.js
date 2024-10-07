import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import ajaxCall from "../../../../helpers/ajaxCall";

const initialCouponData = {
  cupon_name: "",
  campaign_name: "",
  cupon_code: "",
  discount: 0,
  start_date: "",
  end_date: "",
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerCoupon = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialCouponData;
  }
  return { ...state, [action.type]: action.value };
};

const validateForm = (couponData, setFormError) => {
  if (!couponData.cupon_name) {
    setFormError("Coupon Name is Required");
    return false;
  }
  if (!couponData.campaign_name) {
    setFormError("Campaign Name is Required");
    return false;
  }
  if (!couponData.cupon_code) {
    setFormError("Cupon Code is Required");
    return false;
  }
  if (!couponData.discount) {
    setFormError("Discount is Required");
    return false;
  }
  if (!couponData.start_date) {
    setFormError("Start Date & Time is Required");
    return false;
  }
  if (!couponData.end_date) {
    setFormError("End Date & Time is Required");
    return false;
  }
  return true;
};

const CreateCoupon = ({ setActiveTab }) => {
  const [createCouponData, dispatchCoupon] = useReducer(
    reducerCoupon,
    initialCouponData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchCoupon({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createCoupon = async (e) => {
    e.preventDefault();
    if (!validateForm(createCouponData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    try {
      const response = await ajaxCall(
        "/cuponlistview/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(createCouponData),
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setActiveTab("View Coupon");
        toast.success("Coupon Created Successfully");
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    } finally {
      setFormStatus({ isError: false, errMsg: null, isSubmitting: false });
    }
  };

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="row">
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Coupon Name</label>
                <input
                  type="text"
                  placeholder="Coupon Name"
                  value={createCouponData.cupon_name}
                  onChange={(e) =>
                    dispatchCoupon({
                      type: "cupon_name",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Campaign Name</label>
                <input
                  type="text"
                  placeholder="Campaign Name"
                  value={createCouponData.campaign_name}
                  onChange={(e) =>
                    dispatchCoupon({
                      type: "campaign_name",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Coupon Code</label>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={createCouponData.cupon_code}
                  onChange={(e) =>
                    dispatchCoupon({
                      type: "cupon_code",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>
                  Discount (<i className="icofont-rupee"></i>)
                </label>
                <input
                  type="number"
                  placeholder="Coupon Code"
                  value={createCouponData.discount}
                  onChange={(e) =>
                    dispatchCoupon({ type: "discount", value: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Start Date & Time (UTC)</label>
                <input
                  type="datetime-local"
                  value={createCouponData.start_date}
                  min={new Date().toISOString().slice(0, 16)}
                  onChange={(e) =>
                    dispatchCoupon({
                      type: "start_date",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>End Date & Time (UTC)</label>
                <input
                  type="datetime-local"
                  value={createCouponData.end_date}
                  min={new Date().toISOString().slice(0, 16)}
                  onChange={(e) =>
                    dispatchCoupon({
                      type: "end_date",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="dashboard__form__button text-center mt-4">
              {formStatus.isError && (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              )}
              {formStatus.isSubmitting ? (
                <Spinner animation="border" style={{ color: "#01579b" }} />
              ) : (
                <button
                  className="default__button"
                  onClick={createCoupon}
                  disabled={formStatus.isSubmitting}
                >
                  Create Coupon
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
