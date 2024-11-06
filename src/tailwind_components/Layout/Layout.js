import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import "../tailwind.css";
import TidioChat from "../ChatBot/TidioChat";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
                  src="https://studystreak.in/static/media/Logo.d84254f8c0966763bb8d.png"
                  alt="StudyStreak Logo"
                  className="h-20 object-contain" // Adjusted height for navbar
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
              <div className="hidden lg:flex items-center gap-3">
                {/* Login/Register Button */}
                <Link
                  to="/login"
                  className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl 
              hover:bg-primary-700 transition-all duration-300 text-sm font-medium"
                >
                  <User size={16} />
                  <span>Login / Register</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 
            transition-colors duration-300 text-neutral-600"
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
                <div className="pt-4 mt-2 border-t border-neutral-200">
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 bg-primary-600 text-white 
                px-4 py-2 rounded-xl hover:bg-primary-700 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>Login / Register</span>
                  </Link>
                </div>
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
        <footer className="bg-neutral-900 text-white py-16">
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
                    ["Contact", "/contact"],
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
                  <p>Phone: (+91) 91069 95326</p>
                  <p>Email: reachus@studystreak.io</p>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 pt-4">
                  {["facebook", "twitter", "linkedin"].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-neutral-400 hover:text-white transition-colors duration-300 
                    transform hover:-translate-y-1"
                    >
                      <div
                        className="w-10 h-10 rounded-full bg-neutral-800 flex items-center 
                      justify-center hover:bg-neutral-700 transition-colors duration-300"
                      >
                        <svg
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          {/* SVG paths would go here */}
                        </svg>
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
