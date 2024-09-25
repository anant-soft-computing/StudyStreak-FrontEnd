import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import ajaxCall from "../../../../helpers/ajaxCall";

const initialBadgeData = {
  title: "",
  points_required: 0,
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerBadge = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || initialBadgeData;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const validateForm = (badgeData, setFormError) => {
  if (!badgeData.title) {
    setFormError("Badge Name is Required");
    return false;
  }
  if (!badgeData.points_required) {
    setFormError("Points is Required");
    return false;
  }
  return true;
};

const CreateBadge = ({ setActiveTab }) => {
  const [badgeData, dispatchBadge] = useReducer(reducerBadge, initialBadgeData);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchBadge({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createBadge = async (e) => {
    e.preventDefault();
    if (!validateForm(badgeData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    const data = {
      title: badgeData.title,
      points_required: badgeData.points_required,
    };
    try {
      const response = await ajaxCall(
        "/gamification/badges/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setActiveTab("View Badge");
        toast.success("Badge Created Successfully");
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
                <label>Badge Name</label>
                <input
                  type="text"
                  placeholder="Badge Name"
                  value={badgeData.title}
                  onChange={(e) =>
                    dispatchBadge({ type: "title", value: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Badge Points</label>
                <input
                  type="number"
                  placeholder="Badge Points"
                  value={badgeData.points_required}
                  onChange={(e) =>
                    dispatchBadge({
                      type: "points_required",
                      value: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-xl-12 text-center">
            <div className="dashboard__form__button text-center mt-4">
              {formStatus.isError && (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              )}
              {formStatus.isSubmitting ? (
                <Spinner animation="border" style={{ color: "#01579b" }} />
              ) : (
                <button
                  className="default__button"
                  onClick={createBadge}
                  disabled={formStatus.isSubmitting}
                >
                  Create Badge
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBadge;