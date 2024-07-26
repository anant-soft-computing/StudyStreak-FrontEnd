import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import SingleSelection from "../../../UI/SingleSelect";
import Loading from "../../../UI/Loading";

const initialGamificationData = {
  model: "Flash Card",
  object_id: 0,
  points: 0,
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerGamification = (state, action) => {
  if (action.type === "reset") {
    return action.payload || initialGamificationData;
  }
  return { ...state, [action.type]: action.value };
};

const options = [
  "Flash Card",
  "Lesson",
  "Course",
  "Exam Block",
  "Full Length Test",
  "Practice Test",
  "Live Class",
];

const validateForm = (gamificationData, setFormError) => {
  if (!gamificationData.model) {
    setFormError("Content Type is Required");
    return false;
  }
  if (!gamificationData.points) {
    setFormError("Points is Required");
    return false;
  }
  return true;
};

const CreateGamification = ({ setActiveTab }) => {
  const [gamificationData, dispatchGamification] = useReducer(
    reducerGamification,
    initialGamificationData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchGamification({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createGamification = async (e) => {
    e.preventDefault();
    if (!validateForm(gamificationData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });
    try {
      const response = await ajaxCall(
        "/gamification/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(gamificationData),
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setActiveTab("View Gamification");
        toast.success("Gamification Created Successfully");
      } else if (response.status === 400) {
        toast.error(
          `This ${gamificationData.model} already exists.`
        );
      } else {
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
            <div className="dashboard__select__heading">
              <span>Content Type</span>
            </div>
            <div className="dashboard__selector">
              <select
                className="form-select"
                aria-label="Default select example"
                value={gamificationData.model}
                onChange={(e) => {
                  dispatchGamification({
                    type: "model",
                    value: e.target.value,
                  });
                }}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__select__heading">
              <span>Content</span>
            </div>
            <div className="dashboard__selector">
              <SingleSelection
                value={gamificationData?.object_id}
                onChange={(val) => {
                  dispatchGamification({
                    type: "object_id",
                    value: val,
                  });
                }}
                isSearch={true}
                url={`/gamification/objects/?model=${gamificationData.model}`}
                objKey={["rep_name"]}
              />
            </div>
          </div>
          <div className="col-xl-6 mt-4">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Points</label>
                <input
                  type="number"
                  placeholder="Gamification Points"
                  value={gamificationData.points}
                  onChange={(e) =>
                    dispatchGamification({
                      type: "points",
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
                <Loading color="primary" text="Creating Gamification..." />
              ) : (
                <button
                  className="default__button"
                  onClick={createGamification}
                  disabled={formStatus.isSubmitting}
                >
                  Create Gamification
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGamification;
