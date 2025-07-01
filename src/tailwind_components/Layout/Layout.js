import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { User, Menu, X, LogOut } from "lucide-react";
import "../tailwind.css";
import logo from "../../img/logo/Logo.png";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import Footer from "../Footer/Footer";

const hideFooterPaths = ["/login", "/forgot-password"];

const navigationItems = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "IELTS", path: "/ielts" },
  { name: "Why Choose Us", path: "/why-choose-us" },
  { name: "Blogs", path: "/blogs" },
  { name: "Podcast", path: "/podcast" },
  { name: "Contact Us", path: "/talk-to-us" },
  { name: "Become a Partner", path: "/become-a-partner" },
  { name: "Talk to Us", path: "/talk-to-us" },
];

const Layout = () => {
  const location = useLocation();
  const { logoutUser } = useCheckAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem("loginInfo");
  const role = JSON.parse(localStorage.getItem("loginInfo"))?.user_role || "";

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      <nav className="sticky top-0 z-50">
        <div className="bg-primary-900 text-primary-100 py-1.5">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-4">
                <a
                  className="hover:text-white transition-colors duration-300"
                  style={{ color: "white" }}
                  href="mailto:reachus@studystreak.io"
                >
                  📧 reachus@studystreak.io
                </a>
                <a
                  className="hover:text-white transition-colors duration-300"
                  style={{ color: "white" }}
                  href="tel:+918849650924"
                >
                  📞 +91 88496 50924
                </a>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/talk-to-us"
                  className="hover:text-white transition-colors duration-300"
                  style={{ color: "white" }}
                >
                  Talk to Us
                </Link>
                <span>|</span>
                <Link
                  to="/become-a-partner"
                  className="hover:text-white transition-colors duration-300"
                  style={{ color: "white" }}
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
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="StudyStreak"
                  className="h-20 object-contain"
                />
              </Link>

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
              {token ? (
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    to={
                      role === "admin"
                        ? "/admin-dashboard"
                        : role === "Tutor"
                        ? "/tutor-liveClass"
                        : "/studentDashboard"
                    }
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:text-white hover:bg-primary-700 transition-all duration-300 text-sm font-medium"
                  >
                    <User size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:text-white hover:bg-primary-700 transition-all duration-300 text-sm font-medium"
                    onClick={logout}
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Link>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:text-white hover:bg-primary-700 transition-all duration-300 text-sm font-medium"
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
                      to={
                        role === "admin"
                          ? "/admin-dashboard"
                          : role === "Tutor"
                          ? "/tutor-liveClass"
                          : "/studentDashboard"
                      }
                      className="flex items-center justify-center gap-2 bg-primary-600 text-white mt-2 px-4 py-2 rounded-xl hover:bg-primary-700 transition-all duration-300"
                    >
                      <User size={16} />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      className="flex items-center justify-center gap-2 bg-primary-600 text-white mt-2 px-4 py-2 rounded-xl hover:bg-primary-700 transition-all duration-300"
                      onClick={logout}
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
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
      <main className="flex-grow">
        <Outlet />
      </main>
      {!hideFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default Layout;
