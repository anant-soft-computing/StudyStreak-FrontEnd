import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const packagesDetails = [
  {
    package_name: "IELTS/PTE/TOEFL/DUOLINGO - Demo",
    image:
      "https://ieltsonlinetests.com/sites/default/files/styles/webinar_375x215/public/2020-11/shutterstock_583424317.jpg",
    exam_options: ["IELTS", "PTE", "TOEFL"],
    features: [
      "All Modules",
      "Exam Fees & Test Date",
      "Certified Faculties",
      "Test Prep Overview",
      "On-Demand Demo Sessions",
      "Available in English/Hindi",
      "Absolutely Free Demo",
    ],
    badge: "Orientation",
  },
  {
    package_name: "IELTS Master Class - 7-Point Strategy",
    image:
      "https://ieltsonlinetests.com/sites/default/files/styles/webinar_375x215/public/2020-10/charts-data-desk-669615.jpg",
    additional_options: ["IELTS Master Class"],

    features: [
      "Listening Strategy",
      "Reading Strategy",
      "Writing Strategy",
      "Speaking Strategy",
      "Mock Test Insights",
      "Personalized Feedback",
      "Free Master Class",
    ],
    badge: "Master Class",
  },
  {
    package_name: "UK/Canada/USA/Aus/NZ",
    image:
      "https://ieltsonlinetests.com/sites/default/files/styles/webinar_375x215/public/2020-11/shutterstock_583424317.jpg",
    country_options: ["UK", "NZ", "USA", "Canada", "Australia", "Europe"],

    features: [
      "Eligibility Assessment",
      "Admission Process",
      "About Country",
      "Documents Required",
      "Upcoming Intakes",
      "Costs and Scholarships",
      "English/Gujarati/Hindi",
      "Free",
    ],
    badge: "Study Abroad Counselling",
  },
];

const Packages = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    exam: "",
    country: "",
    additional: "",
  });

  const handleJoinClick = (packageName) => {
    setSelectedPackage(packageName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMail = async (formDetails) => {
    try {
      await emailjs.send(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
        process.env.REACT_APP_EMAIL_JS_TEMPLATE_ID,
        {
          name: formDetails.name,
          email: formDetails.email,
          phone: formDetails.phone,
          message: formDetails.selectedPackage,
        },
        process.env.REACT_APP_EMAIL_JS_PUBLIC_KEY
      );
    } catch (error) {
      console.error("Email sending failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    let url = "";
    let resetFields = {};

    if (selectedPackage === "IELTS/PTE/TOEFL/DUOLINGO - Demo") {
      url =
        "https://script.google.com/macros/s/AKfycbxyvun_eByGcO5Q4Nj9Rs8kItU68su9Ih-xJpP0elOVtuV7t1-jYYGeOQQTWAcKWkT9/exec";
      resetFields = { name: "", email: "", phone: "", exam: "" };
      data.append("exam", formData.exam);
    } else if (selectedPackage === "IELTS Master Class - 7-Point Strategy") {
      url =
        "https://script.google.com/macros/s/AKfycbyWq8gMKEZt3TzDNAuqHAXTXJ01oYYwPVadBFnNYB9mWilBsxHRlovJC3mUmllJ_x9nfQ/exec";
      resetFields = { name: "", email: "", phone: "", additional: "" };
      data.append("additional", formData.additional);
    } else {
      url =
        "https://script.google.com/macros/s/AKfycbyyUWxbUSFL-WSD843PxKajllKCaOFz6eACr7SCXAkvCf3ZiQG0jk01YPLA084QQdGW/exec";
      resetFields = { name: "", email: "", phone: "", country: "" };
      data.append("country", formData.country);
    }

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: data,
        muteHttpExceptions: true,
      });

      if (response.ok) {
        await handleSendMail({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          selectedPackage,
        });

        setFormData(resetFields);
        toast.success("Form submitted successfully.");
        setOpen(false);
        navigate("/login");
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
              Join our live lessons for advice from the experts
            </h2>
            <p className="text-neutral-800 mt-2">
              Build your confidence in all IELTS skills and prepare for studying
              abroad with our daily live lessons
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-12 p-8">
        {packagesDetails.map((pkg, index) => (
          <div
            key={index}
            className="w-96 bg-white border border-neutral-200 rounded-xl shadow-soft p-6 hover:shadow-hover transition-shadow duration-300 relative"
          >
            {pkg.badge && (
              <div className="absolute top-4 left-4 bg-primary-600 text-white py-1 px-3 rounded-full text-sm font-medium">
                {pkg.badge}
              </div>
            )}

            <img
              src={pkg.image}
              alt={pkg.package_name}
              className="rounded-t-xl mb-4"
            />

            <h3 className="text-2xl font-semibold mb-4 text-primary-600">
              {pkg.package_name}
            </h3>

            <ul className="space-y-3 mb-6">
              {pkg.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center text-neutral-600 text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-primary-500 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleJoinClick(pkg.package_name)}
              className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 w-full rounded-full font-medium transition-colors duration-300"
            >
              Join
            </button>
          </div>
        ))}
        {open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-elevated">
              <h2 className="text-2xl font-semibold mb-6">
                Join {selectedPackage}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-neutral-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-neutral-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-neutral-700 font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                {selectedPackage === "IELTS/PTE/TOEFL/DUOLINGO - Demo" && (
                  <div className="mb-6">
                    <label className="block text-neutral-700 font-medium mb-2">
                      Exam
                    </label>
                    <select
                      name="exam"
                      value={formData.exam}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select Exam</option>
                      {packagesDetails[0].exam_options.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {selectedPackage ===
                  "IELTS Master Class - 7-Point Strategy" && (
                  <div className="mb-6">
                    <label className="block text-neutral-700 font-medium mb-2">
                      Additional Options
                    </label>
                    <select
                      name="additional"
                      value={formData.additional}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select Additional Option</option>
                      {packagesDetails[1].additional_options.map(
                        (option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
                {selectedPackage === "UK/Canada/USA/Aus/NZ" && (
                  <div className="mb-6">
                    <label className="block text-neutral-700 font-medium mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="">Select Country</option>
                      {packagesDetails[2].country_options.map((option, i) => (
                        <option key={i} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2 bg-neutral-300 hover:bg-neutral-400 rounded-full font-medium transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors duration-300"
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Packages;
