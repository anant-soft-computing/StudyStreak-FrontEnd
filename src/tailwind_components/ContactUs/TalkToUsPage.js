import React, { useState } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  CheckCircle,
} from "lucide-react";

const TalkToUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    purpose: "general",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactOptions = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Talk to our team",
      info: "+91-91069 95326",
      action: "call",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Send us an email",
      info: "reachus@studystreak.io",
      action: "email",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with support",
      info: "Available 24/7",
      action: "chat",
    },
  ];

  const purposes = [
    "General Inquiry",
    "Technical Support",
    "Course Information",
    "Partnership",
    "Careers",
    "Other",
  ];

  const offices = [
    {
      city: "Vadodara",
      address:
        "1st and 2nd Floor, Galav Chambers, Dairy Den Circle, Sayajigunj, Vadodara, Gujarat, India - 390020",
      phone: "+91-91069 95326",
      email: "reachus@studystreak.io",
      timing: "Mon-Sat: 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <img
              src="https://studystreak.in/static/media/Logo.d84254f8c0966763bb8d.png"
              alt="StudyStreak Logo"
              className="h-20 object-contain mx-auto mb-8"
            />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-100">
              We're here to help and answer any question you might have
            </p>
          </div>
        </div>
      </header>

      {/* Contact Options */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover
          transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Flex container for icon and title */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="bg-primary-100 w-12 h-12 rounded-xl flex items-center 
            justify-center text-primary-600"
                >
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-800">
                  {option.title}
                </h3>
              </div>

              <p className="text-neutral-600 mb-4">{option.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary-600">
                  {option.info}
                </span>
                <button className="text-primary-600 hover:text-primary-700 flex items-center gap-2">
                  Contact <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-card p-8">
              <h2 className="text-2xl font-bold text-neutral-800 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Purpose
                    </label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    >
                      {purposes.map((purpose) => (
                        <option key={purpose} value={purpose.toLowerCase()}>
                          {purpose}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                      focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                      focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 rounded-xl
                    hover:bg-primary-700 transition-all duration-300 font-medium
                    flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      Message Sent
                      <CheckCircle size={18} />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Office Locations */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              Visit Our Office
            </h2>
            <div className="space-y-6">
              {offices.map((office, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover
                    transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">
                    {office.city}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary-600 flex-shrink-0 mt-1" />
                      <p className="text-neutral-600">{office.address}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="text-primary-600 flex-shrink-0" />
                      <p className="text-neutral-600">{office.phone}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="text-primary-600 flex-shrink-0" />
                      <p className="text-neutral-600">{office.email}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="text-primary-600 flex-shrink-0" />
                      <p className="text-neutral-600">{office.timing}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="text-lg font-bold text-neutral-800 mb-4">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                {[
                  { icon: <Linkedin size={24} />, name: "LinkedIn" },
                  { icon: <Facebook size={24} />, name: "Facebook" },
                  { icon: <Instagram size={24} />, name: "Instagram" },
                  { icon: <Twitter size={24} />, name: "Twitter" },
                ].map((social, index) => (
                  <button
                    key={index}
                    className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center
                      text-neutral-600 hover:bg-primary-100 hover:text-primary-600
                      transition-all duration-300"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-neutral-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">
              Find Us on Map
            </h2>
            <p className="text-neutral-600">
              Visit our offices or get in touch with us for any queries. We're
              always here to help.
            </p>
          </div>

          {/* Placeholder for Map */}
          <div className="bg-white rounded-2xl overflow-hidden h-60 shadow-card">
            <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3691.178103895951!2d73.184352!3d22.309103!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf528ca0b7af%3A0xe8357fb32b2b0e91!2sESPI%20Visa%20Consultant%20Pvt.%20Ltd%20Vadodara!5e0!3m2!1sen!2sin!4v1729833370272!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pramesh Wealth Pvt Ltd Location"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkToUsPage;
