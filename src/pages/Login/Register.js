import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";

const intialSignUpData = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  password2: "",
};

const reduerSignUp = (state, action) => {
  if (action?.all) {
    return action.data;
  }
  if (action?.reset) {
    return intialSignUpData;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
  btnLabel: "Sign Up",
};

const Register = () => {
  const [signUpData, dispatchSignUp] = useReducer(
    reduerSignUp,
    intialSignUpData
  );
  const [formStatus, setFormStatus] = useState(initialSubmit);

  const navigate = useNavigate();

  const resetReducerForm = () => {
    dispatchSignUp({ type: "reset" });
  };

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const validateForm = () => {
    if (!signUpData.first_name) {
      setFormError("First Name is Required");
      return false;
    }
    if (!signUpData.last_name) {
      setFormError("Last Name is Required");
      return false;
    }
    if (!signUpData.username) {
      setFormError("User Name is Required");
      return false;
    }
    if (!signUpData.email) {
      setFormError("Email is Required");
      return false;
    }
    if (!signUpData.password) {
      setFormError("Password is Required");
      return false;
    }
    if (signUpData.password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return false;
    }
    if (!signUpData.password2) {
      setFormError("Re-Enter Password is Required");
      return false;
    }
    if (signUpData.password !== signUpData.password2) {
      setFormError("Password Does Not Match");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  };

  const doSignUp = async (e) => {
    e.preventDefault();
    resetReducerForm();
    if (!validateForm()) return;
    const data = JSON.stringify(signUpData);
    try {
      const response = await ajaxCall("/registration/", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      });
      if (response.status === 201) {
        setFormStatus({
          isError: true,
          errMsg: response.data?.msg,
          isSubmitting: false,
        });
        navigate("/");
      } else if (response.status === 400) {
        setFormStatus({
          isError: true,
          errMsg: response.data?.username,
          isSubmitting: false,
        });
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    }
  };

  return (
    <div>
      <form method="POST" onSubmit={doSignUp}>
        <div className="row">
          <div className="col-xl-6">
            <div className="login__form">
              <label className="form__label">First Name</label>
              <input
                className="common__login__input"
                type="text"
                placeholder="First Name"
                value={signUpData.first_name}
                onChange={(e) =>
                  dispatchSignUp({
                    type: "first_name",
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="login__form">
              <label className="form__label">Last Name</label>
              <input
                className="common__login__input"
                type="text"
                placeholder="Last Name"
                value={signUpData.last_name}
                onChange={(e) =>
                  dispatchSignUp({
                    type: "last_name",
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="login__form">
              <label className="form__label">Username</label>
              <input
                className="common__login__input"
                type="text"
                placeholder="Username"
                value={signUpData.username}
                onChange={(e) =>
                  dispatchSignUp({
                    type: "username",
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="login__form">
              <label className="form__label">Email</label>
              <input
                className="common__login__input"
                type="email"
                placeholder="Your Email"
                value={signUpData.email}
                onChange={(e) =>
                  dispatchSignUp({
                    type: "email",
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="login__form">
              <label className="form__label">Password</label>
              <input
                className="common__login__input"
                type="password"
                placeholder="Password"
                value={signUpData.password}
                onChange={(e) =>
                  dispatchSignUp({
                    type: "password",
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="login__form">
              <label className="form__label">Re-Enter Password</label>
              <input
                className="common__login__input"
                type="password"
                placeholder="Re-Enter Password"
                value={signUpData.password2}
                onChange={(e) =>
                  dispatchSignUp({
                    type: "password2",
                    value: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="login__form d-flex justify-content-between flex-wrap gap-2">
          <div className="form__check">
            <input type="checkbox" />{" "}
            <label>Accept the Terms and Privacy Policy</label>
          </div>
        </div>
        <div className="login__button">
          {formStatus.isError && (
            <div className="text-danger d-flex justify-content-center mb-2">
              {formStatus.errMsg}
            </div>
          )}
          <div className="d-flex justify-content-center">
            <button
              className="default__button"
              disabled={formStatus.isSubmitting}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
