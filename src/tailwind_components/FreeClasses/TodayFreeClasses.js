import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { BookOpen, Globe, GraduationCap } from "lucide-react";

const packagesDetails = [
  {
    package_name: "IELTS/PTE/TOEFL/DUOLINGO - Demo",
    image:
      "https://ieltsonlinetests.com/sites/default/files/styles/webinar_375x215/public/2020-11/shutterstock_583424317.jpg",
    exam_options: ["IELTS", "PTE", "TOEFL"],
    badge: "Orientation",
    icon: <BookOpen className="w-6 h-6 text-primary-600" />,
    description:
      "Free demo classes for English language proficiency exams including IELTS, PTE, and more.",
  },
  {
    package_name: "IELTS Master Class - 7-Point Strategy",
    image:
      "https://ieltsonlinetests.com/sites/default/files/styles/webinar_375x215/public/2020-10/charts-data-desk-669615.jpg",
    additional_options: ["IELTS Master Class"],
    badge: "Master Class",
    icon: <GraduationCap className="w-6 h-6 text-primary-600" />,
    description:
      "Master high-level IELTS strategies and techniques to score 7 and above.",
  },
  {
    package_name: "UK/Canada/USA/Aus/NZ",
    image:
      "https://ieltsonlinetests.com/sites/default/files/styles/webinar_375x215/public/2020-11/shutterstock_583424317.jpg",
    country_options: ["UK", "NZ", "USA", "Canada", "Australia", "Europe"],
    badge: "Study Abroad Counselling",
    icon: <Globe className="w-6 h-6 text-primary-600" />,
    description:
      "Get expert counselling for studying abroad in your preferred country.",
  },
];

const TodayFreeClasses = () => {
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
    setSelectedPackage("");
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
      console.log("error", error);
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
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-neutral-800">
            Join Our Free Expert-led Live Classes
          </h2>
          <p className="mt-2 text-lg text-neutral-800">
            Boost your confidence and prepare for success with daily sessions
            from industry mentors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packagesDetails.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-6 shadow-md border transition-transform duration-300 hover:scale-[1.02] ${
                selectedPackage === pkg.package_name
                  ? "border-primary-600 shadow-lg"
                  : "border-neutral-200"
              }`}
            >
              {pkg.badge && (
                <span className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {pkg.badge}
                </span>
              )}
              <img
                src={pkg.image}
                alt={pkg.package_name}
                className="rounded-lg mb-4 h-40 object-cover w-full"
              />
              <div className="flex gap-2 mb-2">
                {pkg.icon}
                <h3 className="text-xl font-semibold text-primary-600">
                  {pkg.package_name}
                </h3>
              </div>
              <p className="text-neutral-800 mb-4 text-sm">{pkg.description}</p>
              <button
                onClick={() => handleJoinClick(pkg.package_name)}
                className="w-full py-2 rounded-full text-white bg-primary-600 hover:bg-primary-700 transition-colors font-medium"
              >
                Join For Free Today
              </button>
            </div>
          ))}
        </div>

        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white max-w-md w-full rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Join {selectedPackage}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Name", name: "name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                  { label: "Phone", name: "phone", type: "tel" },
                ].map(({ label, name, type }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-neutral-800">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    />
                  </div>
                ))}

                {selectedPackage === "IELTS/PTE/TOEFL/DUOLINGO - Demo" && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-800">
                      Exam
                    </label>
                    <select
                      name="exam"
                      value={formData.exam}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    >
                      <option value="">Select Exam</option>
                      {packagesDetails[0].exam_options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedPackage ===
                  "IELTS Master Class - 7-Point Strategy" && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-800">
                      Additional Option
                    </label>
                    <select
                      name="additional"
                      value={formData.additional}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    >
                      <option value="">Select Option</option>
                      {packagesDetails[1].additional_options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedPackage === "UK/Canada/USA/Aus/NZ" && (
                  <div>
                    <label className="block text-sm font-medium text-neutral-800">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 border-neutral-300"
                    >
                      <option value="">Select Country</option>
                      {packagesDetails[2].country_options.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full"
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

export default TodayFreeClasses;
