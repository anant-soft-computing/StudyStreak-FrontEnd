import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerm, setAcceptTerm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formStatus, setFormStatus] = useState({
    isError: false,
    errMsg: null,
    isSubmitting: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setFormError = (fieldName, errMsg) => {
    setFormStatus((prevState) => ({
      isError: true,
      errMsg: { ...prevState.errMsg, [fieldName]: [errMsg] },
      isSubmitting: false,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });

    if (!formData.firstName) {
      setFormError("firstName", "First Name is Required");
      isValid = false;
    }
    if (!formData.lastName) {
      setFormError("lastName", "Last Name is Required");
      isValid = false;
    }
    if (!formData.username) {
      setFormError("username", "Username is Required");
      isValid = false;
    }
    if (!formData.email) {
      setFormError("email", "Email is Required");
      isValid = false;
    }
    if (!formData.password) {
      setFormError("password", "Password is Required");
      isValid = false;
    }
    if (formData.password.length < 8) {
      setFormError("password", "Password must be at least 8 characters long");
      isValid = false;
    }
    if (!formData.confirmPassword) {
      setFormError("confirmPassword", "Confirm Password is Required");
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError("password", "Passwords Do Not Match");
      isValid = false;
    }
    if (!acceptTerm) {
      setFormError("acceptTerm", "Please Accept the Terms and Privacy Policy");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus((prevState) => ({
      ...prevState,
      isSubmitting: true,
    }));

    const submitData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password2: formData.confirmPassword,
    };

    try {
      const response = await ajaxCall("/registration/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.status === 201) {
        toast.success(data?.msg);
        setFormStatus({
          isError: false,
          errMsg: data?.msg,
          isSubmitting: false,
        });
        navigate("/login");
      } else if (response.status === 400) {
        setFormStatus({
          isError: true,
          errMsg: data,
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

  const renderError = (fieldName) => {
    return (
      formStatus?.errMsg?.[fieldName] && (
        <div className="text-red-500 text-sm mt-1">
          {formStatus.errMsg[fieldName][0] || formStatus.errMsg[fieldName]}
        </div>
      )
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            First Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border
                ${
                  formStatus.errMsg?.firstName
                    ? "border-red-500"
                    : "border-neutral-300"
                }
                focus:ring-2 focus:ring-primary-300 focus:border-primary-300
                pl-10 transition-all duration-300 bg-white`}
              placeholder="First name"
            />
            <User
              className="absolute left-3 top-2.5 text-neutral-400"
              size={20}
            />
          </div>
          {renderError("firstName")}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Last Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border
                ${
                  formStatus.errMsg?.lastName
                    ? "border-red-500"
                    : "border-neutral-300"
                }
                focus:ring-2 focus:ring-primary-300 focus:border-primary-300
                pl-10 transition-all duration-300 bg-white`}
              placeholder="Last name"
            />
            <User
              className="absolute left-3 top-2.5 text-neutral-400"
              size={20}
            />
          </div>
          {renderError("lastName")}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border
                ${
                  formStatus.errMsg?.username
                    ? "border-red-500"
                    : "border-neutral-300"
                }
                focus:ring-2 focus:ring-primary-300 focus:border-primary-300
                pl-10 transition-all duration-300 bg-white`}
              placeholder="Username"
            />
            <User
              className="absolute left-3 top-2.5 text-neutral-400"
              size={20}
            />
          </div>
          {renderError("username")}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border
                ${
                  formStatus.errMsg?.email
                    ? "border-red-500"
                    : "border-neutral-300"
                }
                focus:ring-2 focus:ring-primary-300 focus:border-primary-300
                pl-10 transition-all duration-300 bg-white`}
              placeholder="Email"
            />
            <Mail
              className="absolute left-3 top-2.5 text-neutral-400"
              size={20}
            />
          </div>
          {renderError("email")}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border
                ${
                  formStatus.errMsg?.password
                    ? "border-red-500"
                    : "border-neutral-300"
                }
                focus:ring-2 focus:ring-primary-300 focus:border-primary-300
                pl-10 pr-10 transition-all duration-300 bg-white`}
              placeholder="Password"
            />
            <Lock
              className="absolute left-3 top-2.5 text-neutral-400"
              size={20}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-neutral-400 
                hover:text-neutral-600 transition-colors duration-300"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {renderError("password")}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border
                ${
                  formStatus.errMsg?.confirmPassword
                    ? "border-red-500"
                    : "border-neutral-300"
                }
                focus:ring-2 focus:ring-primary-300 focus:border-primary-300
                pl-10 pr-10 transition-all duration-300 bg-white`}
              placeholder="Confirm password"
            />
            <Lock
              className="absolute left-3 top-2.5 text-neutral-400"
              size={20}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2.5 text-neutral-400 
                hover:text-neutral-600 transition-colors duration-300"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {renderError("confirmPassword")}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          checked={acceptTerm}
          onChange={(e) => setAcceptTerm(e.target.checked)}
          className="w-4 h-4 text-primary-600 rounded border-neutral-300
            focus:ring-primary-500"
        />
        <label htmlFor="terms" className="text-sm text-neutral-600">
          I accept the Terms and Privacy Policy
        </label>
      </div>
      {renderError("acceptTerm")}

      <button
        type="submit"
        disabled={formStatus.isSubmitting}
        className="w-full bg-primary-600 text-white py-3 rounded-xl
          hover:bg-primary-700 transition-all duration-300 font-medium
          flex items-center justify-center gap-2 group
          disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {formStatus.isSubmitting ? "Creating Account..." : "Create Account"}
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      {formStatus.isError && !formStatus.errMsg && (
        <div className="text-red-500 text-sm text-center">
          {formStatus.errMsg}
        </div>
      )}
    </form>
  );
};

export default SignUpForm;
