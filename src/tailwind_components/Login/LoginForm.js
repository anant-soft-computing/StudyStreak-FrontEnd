import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { setToLocalStorage } from "../../helpers/helperFunction";
import { authAction } from "../../store/authStore";
import ajaxCall from "../../helpers/ajaxCall";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

const initialLoginData = {
  username: "",
  password: "",
};

const reducerLogin = (state, action) => {
  if (action.type === "reset") {
    return initialLoginData;
  }
  return { ...state, [action.type]: action.value };
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const LoginForm = () => {
  const [loginData, dispatchLogin] = useReducer(reducerLogin, initialLoginData);
  const controller = useRef(null);
  const [credentials, setCredentials] = useState(null);
  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector((state) => state.authStore);
  const { checkAuth } = useCheckAuth();

  const resetReducerForm = () => {
    dispatchLogin({ type: "reset" });
  };

  useEffect(() => {
    return () => {
      if (controller.current) {
        controller.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    checkAuth();
  }, [authData, checkAuth]);

  const setFormError = (errMsg) => {
    setFormStatus({
      isError: true,
      errMsg,
      isSubmitting: false,
    });
  };

  const validateForm = useCallback(() => {
    if (!loginData.username) {
      setFormError("Username is Required");
      return false;
    }
    if (!loginData.password) {
      setFormError("Password is Required");
      return false;
    }
    setFormStatus({
      isError: false,
      errMsg: null,
      isSubmitting: false,
    });
    return true;
  }, [loginData.password, loginData.username]);

  const handleLoginSuccess = useCallback(
    (response) => {
      const localObj = {
        accessToken: response.data?.token?.access,
        refreshToken: response.data?.token?.refresh,
        user_type: response.data?.user_status,
        userId: response.data?.userid,
        timeOfLogin: Date.now(),
        user_role: response.data?.user_role,
        username: loginData.username,
      };
      setToLocalStorage("loginInfo", localObj, true);
      dispatch(
        authAction.setAuthStatus({
          username: loginData.username,
          loggedIn: true,
          accessToken: response.data?.token?.access,
          refreshToken: response.data?.token?.refresh,
          user_type: response.data?.user_status,
          user_role: response.data?.user_role,
          userId: response.data?.userid,
          timeOfLogin: Date.now(),
          logInOperation: 1,
        })
      );
      setTimeout(
        () =>
          dispatch(
            authAction.setAuthStatus({
              username: "",
              loggedIn: false,
              accessToken: null,
              refreshToken: null,
              userId: null,
              user_type: null,
              user_role: null,
              timeOfLogin: null,
              logInOperation: -1,
            })
          ),
        1000 * 60 * 30
      );
      toast.success("Welcome To Study Streak");
      response.data.user_role === "admin"
        ? navigate("/admin-dashboard")
        : navigate("/studentDashboard");
    },
    [dispatch, loginData.username, navigate]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      resetReducerForm();
      if (!credentials && !validateForm()) return;

      setFormStatus({
        ...formStatus,
        isSubmitting: true,
      });

      const data = credentials
        ? {
            email: credentials.email,
            family_name: credentials.family_name,
            given_name: credentials.given_name,
            aud: credentials.aud,
          }
        : loginData;

      controller.current = new AbortController();
      const signal = controller.current.signal;

      const gotLate = setTimeout(() => {
        console.log("------->");
      }, 4000);

      const timeOutFunction = () => {
        controller.current.abort();
      };

      try {
        const response = await ajaxCall(
          credentials ? "/auth/google/" : "/login/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
            withCredentials: true,
            signal,
          },
          8000,
          timeOutFunction
        );
        clearTimeout(gotLate);
        if (response.status === 200) {
          toast.success(response.data?.msg);
          handleLoginSuccess(response);
        } else {
          setFormStatus({
            isError: true,
            errMsg: response.data?.errors,
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
    },
    [credentials, formStatus, handleLoginSuccess, loginData, validateForm]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatchLogin({ type: name, value });
  };

  useEffect(() => {
    if (credentials) {
      handleSubmit();
    }
  }, [credentials, handleSubmit]);

  if (authData.authLoading) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formStatus.isError && (
        <div className="p-3 bg-red-100 text-red-700 rounded-xl text-sm">
          {formStatus.errMsg}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">Username</label>
        <div className="relative">
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
              focus:ring-2 focus:ring-primary-300 focus:border-primary-300
              pl-10 transition-all duration-300 bg-white"
            placeholder="Enter your username"
          />
          <Mail
            className="absolute left-3 top-2.5 text-neutral-400"
            size={20}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-neutral-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
              focus:ring-2 focus:ring-primary-300 focus:border-primary-300
              pl-10 pr-10 transition-all duration-300 bg-white"
            placeholder="Enter your password"
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
      </div>

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-primary-600 hover:text-primary-700 
            font-medium transition-colors duration-300"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={formStatus.isSubmitting}
        className="w-full bg-primary-600 text-white py-3 rounded-xl
          hover:bg-primary-700 transition-all duration-300 font-medium
          flex items-center justify-center gap-2 group
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formStatus.isSubmitting ? "Logging in..." : "Login"}
        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-neutral-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6">
          <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                setCredentials(jwtDecode(credentialResponse.credential));
              }}
              onError={() => {
                toast.error("Login Failed");
              }}
            />
          </span>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
