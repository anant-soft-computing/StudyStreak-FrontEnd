import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Send, X } from "lucide-react";

const purposes = [
  "General Inquiry",
  "Technical Support",
  "Course Information",
  "Partnership",
  "Careers",
  "Other",
];

const educationLevels = [
  "12th or Equivalent",
  "Graduate",
  "Post Graduate",
  "Doctorate",
  "Other",
];

const studyDestinations = [
  "USA",
  "Canada",
  "UK",
  "Germany",
  "Australia",
  "New Zealand",
  "Other",
];

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  city: "",
  purpose: "General Inquiry",
  otherPurpose: "",
  education: "12th or Equivalent",
  otherEducation: "",
  studyDestination: "USA",
  otherDestination: "",
  message: "",
};

const ContactForm = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleClose = () => {
    setFormData(initialFormData);
    setFormErrors({});
    onClose();
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    if (formData.purpose === "Other" && !formData.otherPurpose.trim()) {
      errors.otherPurpose = "Please specify the purpose";
    }
    if (formData.education === "Other" && !formData.otherEducation.trim()) {
      errors.otherEducation = "Please specify the education";
    }
    if (
      formData.studyDestination === "Other" &&
      !formData.otherDestination.trim()
    ) {
      errors.otherDestination = "Please specify the destination";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formPayload.append(key, value);
    });

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzSSFrnz1fpuggr3_C5_lllZgB44TcmfcK6fJAo6J_zjMA-aZAMFQU8myv2dso8kNHy/exec",
        {
          method: "POST",
          body: formPayload,
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      setFormData(initialFormData);
      onClose();
      // Set flag to indicate valid form submission
      sessionStorage.setItem("formSubmitted", "true");
      navigate("/thank-you", { replace: true });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        "Failed to send message. Please try again later or contact us directly."
      );
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 md:p-8 relative transform transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-full p-1"
          aria-label="Close contact form"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">
            Get in Touch
          </h2>
          <p className="text-neutral-600">
            Fill out the form and we'll get back to you soon
          </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="modal_name"
                className="block text-sm font-medium text-neutral-700"
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="modal_name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  formErrors.name ? "border-red-500" : "border-neutral-300"
                } focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors`}
                placeholder="e.g. John Doe"
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
              )}
            </div>
            <div className="space-y-1">
              <label
                htmlFor="modal_email"
                className="block text-sm font-medium text-neutral-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="modal_email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  formErrors.email ? "border-red-500" : "border-neutral-300"
                } focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors`}
                placeholder="e.g. john.doe@example.com"
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="modal_phone"
                className="block text-sm font-medium text-neutral-700"
              >
                Phone Number
              </label>
              <input
                id="modal_phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  formErrors.phone ? "border-red-500" : "border-neutral-300"
                } focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors`}
                placeholder="e.g. +91 1234567890"
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
              )}
            </div>
            <div className="space-y-1">
              <label
                htmlFor="modal_city"
                className="block text-sm font-medium text-neutral-700"
              >
                City
              </label>
              <input
                id="modal_city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors"
                placeholder="e.g. Vadodara"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="modal_purpose"
              className="block text-sm font-medium text-neutral-700"
            >
              Purpose
            </label>
            <select
              id="modal_purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQ3NTU2NyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
            >
              {purposes.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
            {formData.purpose === "Other" && (
              <div className="mt-2">
                <input
                  type="text"
                  name="otherPurpose"
                  value={formData.otherPurpose}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    formErrors.otherPurpose
                      ? "border-red-500"
                      : "border-neutral-300"
                  } focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors`}
                  placeholder="Please specify your purpose"
                />
                {formErrors.otherPurpose && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.otherPurpose}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="modal_education"
              className="block text-sm font-medium text-neutral-700"
            >
              Education Level
            </label>
            <select
              id="modal_education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQ3NTU2NyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
            >
              {educationLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {formData.education === "Other" && (
              <div className="mt-2">
                <input
                  type="text"
                  name="otherEducation"
                  value={formData.otherEducation}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    formErrors.otherEducation
                      ? "border-red-500"
                      : "border-neutral-300"
                  } focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors`}
                  placeholder="Please specify your education"
                />
                {formErrors.otherEducation && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.otherEducation}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="modal_studyDestination"
              className="block text-sm font-medium text-neutral-700"
            >
              Study Destination
            </label>
            <select
              id="modal_studyDestination"
              name="studyDestination"
              value={formData.studyDestination}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQ3NTU2NyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
            >
              {studyDestinations.map((destination) => (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
            {formData.studyDestination === "Other" && (
              <div className="mt-2">
                <input
                  type="text"
                  name="otherDestination"
                  value={formData.otherDestination}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    formErrors.otherDestination
                      ? "border-red-500"
                      : "border-neutral-300"
                  } focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors`}
                  placeholder="Please specify your study destination"
                />
                {formErrors.otherDestination && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.otherDestination}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="modal_message"
              className="block text-sm font-medium text-neutral-700"
            >
              Your Message
            </label>
            <textarea
              id="modal_message"
              name="message"
              rows={2}
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 rounded-xl border ${
                formErrors.message ? "border-red-500" : "border-neutral-300"
              } focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors`}
              placeholder="Please tell us more (optional)..."
            />
            {formErrors.message && (
              <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition-colors duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
          >
            {isLoading ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  aria-label="Loading"
                />
                Sending...
              </>
            ) : (
              <>
                Send Message <Send size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
