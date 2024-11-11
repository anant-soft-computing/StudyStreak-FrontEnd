import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import "../tailwind.css";
import TidioChat from "../ChatBot/TidioChat";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import logo from "../../img/logo/Logo.png";

const Layout = () => {
  const { logoutUser } = useCheckAuth();
  const token = localStorage.getItem("loginInfo");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  const hideFooterPaths = ["/login"];

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "IELTS", path: "/ielts" },

    // { name: 'About Us', path: '/about-us' },
    { name: "Why Choose Us", path: "/why-choose-us" },
    { name: "Blogs", path: "/blogs" },
    { name: "Podcast", path: "/podcast" },
    { name: "Contact Us", path: "/talk-to-us" },
    { name: "Become a Partner", path: "/become-a-partner" },
    { name: "Talk to Us", path: "/talk-to-us" },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <nav className="sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-primary-900 text-primary-100 py-1.5">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-4">
                <span>📧 reachus@studystreak.io</span>
                <span>📞 +91 91069 95326</span>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/talk-to-us"
                  className="hover:text-white transition-colors duration-300"
                >
                  Talk to Us
                </Link>
                <span>|</span>
                <Link
                  to="/become-a-partner"
                  className="hover:text-white transition-colors duration-300"
                >
                  Become a Partner
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-neutral-200 shadow-soft">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="StudyStreak"
                  className="h-20 object-contain"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center">
                {navigationItems.slice(0, 7).map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`px-5 py-2 text-sm font-medium transition-all duration-300 relative
                ${
                  isActivePath(item.path)
                    ? "text-primary-600"
                    : "text-neutral-600 hover:text-primary-600"
                }
                before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5
                before:bg-primary-600 before:transform before:scale-x-0
                before:transition-transform before:duration-300
                ${
                  isActivePath(item.path)
                    ? "before:scale-x-100"
                    : "hover:before:scale-x-100"
                }
              `}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              {token ? (
                <div className="hidden lg:flex items-center gap-3">
                  {/* Login/Register Button */}
                  <Link
                    to="/studentDashboard"
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-all duration-300 text-sm font-medium"
                  >
                    <User size={16} />
                    <span>Dashboard</span>
                  </Link>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  {/* Login/Register Button */}
                  <Link
                    to="/login"
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-all duration-300 text-sm font-medium"
                  >
                    <User size={16} />
                    <span>Login / Register</span>
                  </Link>
                </div>
              )}

              <button
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-300 text-neutral-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-neutral-200">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navigationItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                      isActivePath(item.path)
                        ? "bg-primary-50 text-primary-600"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {token ? (
                  <div className="pt-4 mt-2 border-t border-neutral-200">
                    <Link
                      to="/studentDashboard"
                      className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-all duration-300"
                      onClick={logout}
                    >
                      <User size={16} />
                      <span>Dashboard</span>
                    </Link>
                  </div>
                ) : (
                  <div className="pt-4 mt-2 border-t border-neutral-200">
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={16} />
                      <span>Login / Register</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      {!hideFooterPaths.includes(location.pathname) && (
        <footer className="bg-primary-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* About */}
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-bold">
                  About StudyStreak
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  Empowering students worldwide to achieve their academic goals
                  through expert-led courses and innovative learning techniques.
                </p>
              </div>

              {/* Exams */}
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-bold">
                  Exams We Cover
                </h3>
                <ul className="space-y-3">
                  {["IELTS", "GRE", "GMAT", "TOEFL", "PTE Academic"].map(
                    (exam, index) => (
                      <li key={index}>
                        <Link
                          to={`/courses/${exam.toLowerCase()}`}
                          className="text-neutral-400 hover:text-white transition-colors duration-300"
                        >
                          {exam}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-bold">Quick Links</h3>
                <ul className="space-y-3">
                  {[
                    ["Home", "/"],
                    ["Courses", "/courses"],
                    ["About Us", "/about-us"],
                    ["Contact", "/talk-to-us"],
                    ["Blog", "/blog"],
                  ].map(([name, path], index) => (
                    <li key={index}>
                      <Link
                        to={path}
                        className="text-neutral-400 hover:text-white transition-colors duration-300"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-bold">Contact Us</h3>
                <div className="space-y-3 text-neutral-400">
                  <p>
                    1st and 2nd Floor, Galav Chambers, Dairy Den Circle,
                    Sayajigunj, Vadodara, Gujarat, India - 390020
                  </p>
                  <p>Phone: (+91) 8849650924</p>
                  <p>Email: reachus@studystreak.io</p>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 pt-4">
                  {[
                    {
                      name: "facebook",
                      url: "https://www.facebook.com",
                      icon: (
                        <svg
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.065 3.766 9.26 8.625 9.897v-6.99H8.1v-2.907h2.525v-2.202c0-2.5 1.492-3.876 3.777-3.876 1.094 0 2.236.195 2.236.195v2.475h-1.259c-1.241 0-1.628.772-1.628 1.562v1.846h2.771l-.442 2.907h-2.329v6.99C18.234 21.26 22 17.065 22 12z" />
                        </svg>
                      ),
                    },
                    {
                      name: "twitter",
                      url: "https://www.twitter.com",
                      icon: (
                        <svg
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557a9.953 9.953 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.184A4.918 4.918 0 0 0 16.846 3c-2.728 0-4.941 2.213-4.941 4.942 0 .39.043.766.128 1.129-4.104-.206-7.744-2.173-10.179-5.165a4.916 4.916 0 0 0-.669 2.481 4.925 4.925 0 0 0 2.188 4.1A4.903 4.903 0 0 1 1.67 9.72v.062a4.942 4.942 0 0 0 3.957 4.837 4.937 4.937 0 0 1-2.22.085 4.946 4.946 0 0 0 4.604 3.417A9.868 9.868 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.054 0 14.002-7.496 14.002-13.986 0-.213-.004-.426-.014-.637A10.016 10.016 0 0 0 24 4.557z" />
                        </svg>
                      ),
                    },
                    {
                      name: "linkedin",
                      url: "https://www.linkedin.com",
                      icon: (
                        <svg
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.983 3.5C3.34 3.5 2 4.815 2 6.423c0 1.587 1.311 2.923 3.011 2.923h.033C6.66 9.346 8 8.01 8 6.423 8 4.815 6.66 3.5 4.983 3.5zM2.49 21.5h5.019V9.625H2.49V21.5zM18.852 9.5c-2.237 0-3.249 1.207-3.811 2.057V9.625h-5.016c.067 1.55 0 11.875 0 11.875h5.016v-6.6c0-.357.025-.71.131-.963.287-.707.94-1.437 2.034-1.437 1.435 0 2.007 1.085 2.007 2.675v6.325h5.015v-6.787c0-3.626-1.935-5.313-4.476-5.313z" />
                        </svg>
                      ),
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-white transition-colors duration-300 transform hover:-translate-y-1"
                    >
                      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors duration-300">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-400">
              <p>© 2024 StudyStreak. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}

      <TidioChat />
    </div>
  );
};

export default Layout;
