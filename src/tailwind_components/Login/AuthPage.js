import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RightSection from "./RightSection";
import SignUpForm from "./SignUpForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col lg:flex-row">
      <div className="flex-1 flex align-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-2 flex justify-center">
            <img
              src="https://studystreak.in/static/media/Logo.d84254f8c0966763bb8d.png"
              alt="StudyStreak Logo"
              className="h-20 object-contain"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-neutral-800 mb-1">
                {isLogin ? "Welcome Back!" : "Create Account"}
              </h1>
              <p className="text-neutral-600">
                {isLogin
                  ? "Enter your credentials to access your account"
                  : "Sign up to get started with StudyStreak"}
              </p>
            </div>

            <div className="flex bg-neutral-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300
                  ${
                    isLogin
                      ? "bg-white text-primary-600 shadow-soft"
                      : "text-neutral-600 hover:text-primary-600"
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300
                  ${
                    !isLogin
                      ? "bg-white text-primary-600 shadow-soft"
                      : "text-neutral-600 hover:text-primary-600"
                  }`}
              >
                Sign Up
              </button>
            </div>

            {isLogin ? <LoginForm /> : <SignUpForm />}
          </div>
        </div>
      </div>
      <RightSection />
    </div>
  );
};

export default AuthPage;
