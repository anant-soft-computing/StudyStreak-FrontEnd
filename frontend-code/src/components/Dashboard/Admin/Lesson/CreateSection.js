import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";

const initialData = {
  name: "",
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerData = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || reducerData;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const validateForm = (sectionData, setFormError) => {
  if (!sectionData.name) {
    setFormError("Section Name is Required");
    return false;
  }
  return true;
};

const CreateSection = () => {
  const [sectionData, dispatchSectionData] = useReducer(
    reducerData,
    initialData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createSection = async (e) => {
    e.preventDefault();
    if (!validateForm(sectionData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });

    try {
      const response = await ajaxCall(
        "/section/create/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: JSON.stringify(sectionData),
        },
        8000
      );

      if (response.status === 201) {
        toast.success("Section Created Successfully");
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
      <div className="col-xl-6 col-lg-6 col-md-6 col-12">
        <div className="dashboard__form__wraper">
          <div className="dashboard__form__input">
            <label>Section Name</label>
            <input
              type="text"
              value={sectionData.name}
              placeholder="Section Name"
              onChange={(e) =>
                dispatchSectionData({ type: "name", value: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="col-xl-12 text-center">
        <div className="dashboard__form__button text-center">
          {formStatus.isError && (
            <div className="text-danger mb-2">{formStatus.errMsg}</div>
          )}
          {formStatus.isSubmitting ? (
            <Spinner animation="border" style={{ color: "#01579b" }} />
          ) : (
            <button
              className="default__button"
              onClick={createSection}
              disabled={formStatus.isSubmitting}
            >
              Create Section
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateSection;
