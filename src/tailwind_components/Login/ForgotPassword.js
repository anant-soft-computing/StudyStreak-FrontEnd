import React, { useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import RightSection from "./RightSection";
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
  isSubmitted: false,
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
      isSubmitted: false,
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
      isSubmitted: false,
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
          isSubmitted: true,
        });

        toast.success(response.data?.msg);
      } else if (response.status === 400 || response.status === 404) {
        setFormStatus({
          isError: true,
          errMsg: response.data?.errors?.non_field_errors[0],
          isSubmitting: false,
          isSubmitted: false,
        });
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Enter a valid email address",
        isSubmitting: false,
        isSubmitted: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-2 flex justify-center">
            <img
              src="https://studystreak.in/static/media/Logo.d84254f8c0966763bb8d.png"
              alt="StudyStreak Logo"
              className="h-20 object-contain"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8">
            <Link
              to="/login"
              className="inline-flex items-center text-sm text-neutral-600 
                hover:text-primary-600 mb-8 group"
            >
              <ArrowLeft
                size={16}
                className="mr-2 transition-transform duration-300 
                group-hover:-translate-x-1"
              />
              Back to Login
            </Link>

            {!formStatus.isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-neutral-800 mb-2">
                    Forgot Password?
                  </h1>
                  <p className="text-neutral-600">
                    Enter your email address and we'll send you instructions to
                    reset your password
                  </p>
                </div>

                <form onSubmit={doForgot} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={forgotPasswordData.email_id}
                        onChange={(e) =>
                          dispatchLogin({
                            type: "email_id",
                            value: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                          focus:ring-2 focus:ring-primary-300 focus:border-primary-300
                          pl-10 transition-all duration-300 bg-white"
                        placeholder="Enter your email"
                        required
                      />
                      <Mail
                        className="absolute left-3 top-2.5 text-neutral-400"
                        size={20}
                      />
                    </div>
                  </div>

                  {formStatus.isError && (
                    <p className="p-3 bg-red-100 text-red-700 rounded-xl text-sm">
                      {formStatus.errMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-primary-600 text-white py-3 rounded-xl
                      hover:bg-primary-700 transition-all duration-300 font-medium
                      flex items-center justify-center gap-2 group"
                  >
                    Send Reset Instructions
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 bg-primary-100 rounded-full flex items-center 
                  justify-center mx-auto mb-6"
                >
                  <Mail className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-800 mb-2">
                  Check Your Email
                </h2>
                <p className="text-neutral-600 mb-8">
                  We have sent password reset instructions to your email address
                </p>
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <RightSection />
    </div>
  );
};

export default ForgotPassword;
