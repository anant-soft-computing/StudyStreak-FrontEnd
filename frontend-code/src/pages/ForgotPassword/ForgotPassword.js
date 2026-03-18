import React, { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import ajaxCall from "../../helpers/ajaxCall";

const intialData = {
  email_id: "",
};

const reducerForgotPassword = (state, action) => {
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const ForgotPassword = () => {
  const [forgotPasswordData, dispatchLogin] = useReducer(
    reducerForgotPassword,
    intialData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const validateForm = () => {
    if (!forgotPasswordData.email_id) {
      setFormError("Email is required");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const doForgot = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setFormStatus({
      ...formStatus,
      isSubmitting: true,
    });

    const data = JSON.stringify(forgotPasswordData);

    try {
      const response = await ajaxCall(
        "/resetpassword/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: data,
          withCredentials: true,
        },
        8000
      );
      if (response.status === 200) {
        dispatchLogin({
          type: "email_id",
          value: "",
        });

        setFormStatus({
          isError: false,
          errMsg: null,
          isSubmitting: false,
        });

        toast.success(response.data?.msg);
      } else if (response.status === 400 || response.status === 404) {
        setFormStatus({
          isError: true,
          errMsg: response.data?.errors?.non_field_errors[0],
          isSubmitting: false,
        });
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Enter a valid email address",
        isSubmitting: false,
      });
    }
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="loginarea sp_top_100 sp_bottom_100">
          <div className="container mt-4">
            <div className="row">
              <div className="tab-content tab__content__wrapper">
                <div className="col-xl-8 col-md-8 offset-md-2">
                  <div className="loginarea__wraper">
                    <div className="login__heading">
                      <h5 className="login__title">Forgot Password</h5>
                    </div>
                    <form method="POST" onSubmit={doForgot}>
                      <div className="login__form">
                        <label className="form__label">Email</label>
                        <input
                          className={`common__login__input ${
                            formStatus?.errMsg && "error-border"
                          }`}
                          type="email"
                          placeholder="Enter Your Registered Email"
                          value={forgotPasswordData.email_id}
                          onChange={(e) =>
                            dispatchLogin({
                              type: "email_id",
                              value: e.target.value,
                            })
                          }
                        />
                        {formStatus.isError && (
                          <div className="text-danger mt-2">
                            {formStatus.errMsg}
                          </div>
                        )}
                      </div>
                      <div className="login__button">
                        <div className="d-flex justify-content-center">
                          <button
                            className="default__button"
                            disabled={formStatus?.isSubmitting}
                          >
                            {formStatus.isSubmitting && (
                              <Spinner
                                animation="border"
                                role="status"
                                size="sm"
                                className="me-2"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </Spinner>
                            )}
                            Send
                          </button>
                        </div>
                      </div>
                    </form>
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

export default ForgotPassword;
