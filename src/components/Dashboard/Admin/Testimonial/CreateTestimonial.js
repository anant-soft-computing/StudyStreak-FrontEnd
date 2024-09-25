import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import ajaxCall from "../../../../helpers/ajaxCall";

const initialTestimonialData = {
  name: "",
  image: null,
  position: "",
  description: "",
};

const initialSubmit = { isError: false, errMsg: null, isSubmitting: false };

const reducerTestimonial = (state, action) => {
  switch (action.type) {
    case "reset":
      return action.payload || initialTestimonialData;
    default:
      return { ...state, [action.type]: action.value };
  }
};

const validateForm = (testimonialData, setFormError) => {
  if (!testimonialData.name) {
    setFormError("Name is Required");
    return false;
  }
  if (!testimonialData.position) {
    setFormError("Position is Required");
    return false;
  }
  if (!testimonialData.description) {
    setFormError("Description is Required");
    return false;
  }
  if (!testimonialData.image) {
    setFormError("Image is Required");
    return false;
  }
  return true;
};

const CreateTestimonial = ({ setActiveTab }) => {
  const [testimonialData, dispatchTestimonial] = useReducer(
    reducerTestimonial,
    initialTestimonialData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const authData = useSelector((state) => state.authStore);

  const resetReducerForm = () => {
    dispatchTestimonial({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({ isError: true, errMsg, isSubmitting: false });
  };

  const createTestimonial = async (e) => {
    e.preventDefault();

    if (!validateForm(testimonialData, setFormError)) return;
    setFormStatus({ isError: false, errMsg: null, isSubmitting: true });

    const formData = new FormData();
    formData.append("name", testimonialData.name);
    formData.append("position", testimonialData.position);
    formData.append("description", testimonialData.description);
    formData.append("image", testimonialData.image);

    try {
      const response = await ajaxCall(
        "/testimonial-create/",
        {
          headers: {
            Authorization: `Bearer ${authData?.accessToken}`,
          },
          method: "POST",
          body: formData,
        },
        8000
      );
      if (response.status === 201) {
        resetReducerForm();
        setActiveTab("View Testimonial");
        toast.success("Testimonial Created Successfully");
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
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={testimonialData?.name}
                  onChange={(e) => {
                    dispatchTestimonial({
                      type: "name",
                      value: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="dashboard__form__wraper">
              <div className="dashboard__form__input">
                <label>Position</label>
                <input
                  type="text"
                  placeholder="Position"
                  value={testimonialData.position}
                  onChange={(e) =>
                    dispatchTestimonial({
                      type: "position",
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
                <label>Description</label>
                <textarea
                  type="text"
                  placeholder="Description"
                  value={testimonialData.description}
                  onChange={(e) =>
                    dispatchTestimonial({
                      type: "description",
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
                <label>Image</label>
                <input
                  type="file"
                  onChange={(e) =>
                    dispatchTestimonial({
                      type: "image",
                      value: e.target.files[0],
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
                  onClick={createTestimonial}
                  disabled={formStatus.isSubmitting}
                >
                  Create Testimonial
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTestimonial;
