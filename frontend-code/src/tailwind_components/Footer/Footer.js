import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram } from "lucide-react";

const quickLinks = [
  ["Home", "/"],
  ["Courses", "/courses"],
  ["About Us", "/about-us"],
  ["Contact", "/talk-to-us"],
  ["Blog", "/blogs"],
];

const exams = [
  ["IELTS", "/ielts"],
  ["GRE", "/"],
  ["GMAT", "/"],
  ["TOEFL", "/"],
  ["PTE", "/"],
];

const companyPolicies = [
  ["Privacy Policy", "/privacy-policy"],
  ["Terms & Conditions", "/terms-and-conditions"],
  ["Refund & Cancellation Policy", "/refund-policy"],
];

const socialIcons = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61569408541625",
    icon: <Facebook size={20} />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/studystreak_coaching/",
    icon: <Instagram size={20} />,
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/studystreak/",
    icon: <Linkedin size={20} />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="space-y-4 col-span-1">
            <h3
              className="text-xl font-heading font-bold"
              style={{ color: "white" }}
            >
              StudyStreak
            </h3>
            <p className="text-neutral-400 leading-relaxed">
              Empowering students worldwide to achieve their academic goals
              through expert-led courses and innovative learning techniques.
            </p>
          </div>
          <div className="space-y-4">
            <h3
              className="text-xl font-heading font-bold"
              style={{ color: "white" }}
            >
              Exams We Cover
            </h3>
            <ul className="space-y-2">
              {exams.map(([exam, path], index) => (
                <li key={index} style={{ display: "block" }}>
                  <Link
                    to={path}
                    className="text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    {exam}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3
              className="text-xl font-heading font-bold"
              style={{ color: "white" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(([name, path], index) => (
                <li key={index} style={{ display: "block" }}>
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
          <div className="space-y-4">
            <h3
              className="text-xl font-heading font-bold"
              style={{ color: "white" }}
            >
              Company
            </h3>
            <ul className="space-y-2">
              {companyPolicies.map(([name, path], index) => (
                <li key={index} style={{ display: "block" }}>
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
          <div className="space-y-4">
            <h3
              className="text-xl font-heading font-bold"
              style={{ color: "white" }}
            >
              Contact Us
            </h3>
            <address className="not-italic space-y-2 text-neutral-400">
              <p className="text-neutral-400">
                1st & 2nd Floor, Galav Chambers, Dairy Den Circle, Sayajigunj,
                Vadodara, Gujarat, India - 390020
              </p>
              <p className="text-neutral-400">
                Phone:{" "}
                <a
                  href="tel:+918849650924"
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  (+91) 88496 50924
                </a>
              </p>
              <p className="text-neutral-400">
                Email:{" "}
                <a
                  href="mailto:noreply@studystreak.in"
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  noreply@studystreak.in
                </a>
              </p>
            </address>
            <div className="flex space-x-3 pt-2">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors duration-300">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} StudyStreak. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
