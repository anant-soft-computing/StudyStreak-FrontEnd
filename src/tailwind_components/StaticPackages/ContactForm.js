import { useState } from "react";
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

const ContactForm = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "General Inquiry",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("purpose", formData.purpose);
    data.append("subject", formData.subject);
    data.append("message", formData.message);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzr8CCq6szvobVy0_aVTVijZTzI_YBQAsbv8ZiPY5Pp3ZKFHwwx_xM4kvYRHZ4TrJJf/exec",
        {
          method: "POST",
          body: data,
          muteHttpExceptions: true,
        }
      );
      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          purpose: "General Inquiry",
          subject: "",
          message: "",
        });
        toast.success("Form submitted successfully.");
        onClose();
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-elevated w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-700 transition-colors z-10"
          aria-label="Close contact form"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl md:text-3xl font-bold font-heading text-neutral-800 mb-6 text-center">
          Get in Touch
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="modal_name"
                className="text-sm font-medium text-neutral-700 font-sans"
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="modal_name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 font-sans"
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="modal_email"
                className="text-sm font-medium text-neutral-700 font-sans"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="modal_email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 font-sans"
                placeholder="e.g. john.doe@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label
                htmlFor="modal_phone"
                className="text-sm font-medium text-neutral-700 font-sans"
              >
                Phone Number (Optional)
              </label>
              <input
                id="modal_phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 font-sans"
                placeholder="e.g. +91 XXXXX XXXXX"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="modal_purpose"
                className="text-sm font-medium text-neutral-700 font-sans"
              >
                Purpose
              </label>
              <select
                id="modal_purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 font-sans appearance-none bg-white"
              >
                {purposes.map((purpose) => (
                  <option key={purpose} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="modal_subject"
              className="text-sm font-medium text-neutral-700 font-sans"
            >
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="modal_subject"
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 font-sans"
              placeholder="Briefly, what is this about?"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="modal_message"
              className="text-sm font-medium text-neutral-700 font-sans"
            >
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="modal_message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-primary-300 focus:border-primary-300 font-sans"
              placeholder="Please tell us more..."
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-600 text-white py-3 rounded-xl hover:bg-primary-700 transition-colors duration-300 font-medium font-sans flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                  aria-label="Loading"
                ></div>
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
