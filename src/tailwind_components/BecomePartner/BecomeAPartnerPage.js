import React, { useState } from "react";
import {
  Users,
  Laptop,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Globe2,
  BookOpen,
  DollarSign,
  Handshake,
  School,
  Target,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const BecomeAPartnerPage = () => {
  const [formData, setFormData] = useState({
    instituteName: "",
    instituteType: "",
    contactPerson: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    websiteUrl: "",
    yearEstablished: "",
    currentStudents: "",
    message: "",
    acceptTerms: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqs = [
    {
      id: 1,
      q: "What are the requirements to become a partner?",
      a: "Partners should be registered educational institutions, test preparation centers, or licensed educational consultants with a proven track record in the education sector. We look for partners who share our commitment to quality education and student success.",
    },
    {
      id: 2,
      q: "How long does the application process take?",
      a: "The typical application review process takes 5-7 business days. Once approved, we'll schedule an onboarding call to get you started. During this call, we'll discuss your specific needs and create a customized partnership plan.",
    },
    {
      id: 3,
      q: "What support do partners receive?",
      a: "Partners receive comprehensive support including training, marketing materials, technical support, and a dedicated partnership manager. We also provide regular updates, performance analytics, and access to our partner success resources.",
    },
    {
      id: 4,
      q: "How is the revenue sharing structured?",
      a: "We offer competitive commission rates based on the partnership model and volume of enrollments. Specific details are discussed during the partnership discussion. Our tiered structure rewards higher performance with increased commission rates.",
    },
    {
      id: 5,
      q: "What marketing materials are provided?",
      a: "Partners receive access to professionally designed marketing materials, including brochures, social media assets, email templates, and presentation decks. We also provide customizable content for your specific market.",
    },
    {
      id: 6,
      q: "Is there a minimum commitment period?",
      a: "While we value long-term partnerships, there is no strict minimum commitment period. However, we recommend at least a 6-month initial engagement to fully implement and evaluate the partnership's success.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const benefits = [
    {
      icon: <DollarSign size={24} />,
      title: "Revenue Generation",
      description:
        "Earn competitive commissions on student enrollments and create additional revenue streams.",
    },
    {
      icon: <BookOpen size={24} />,
      title: "Premium Content Access",
      description:
        "Get exclusive access to our comprehensive study materials and teaching resources.",
    },
    {
      icon: <Laptop size={24} />,
      title: "Technology Platform",
      description:
        "Utilize our state-of-the-art learning management system and student tracking tools.",
    },
    {
      icon: <Users size={24} />,
      title: "Marketing Support",
      description:
        "Receive marketing materials, branding support, and lead generation assistance.",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Training & Development",
      description:
        "Access partner training programs and professional development opportunities.",
    },
    {
      icon: <Globe2 size={24} />,
      title: "Global Network",
      description:
        "Join our international network of educational institutions and industry experts.",
    },
  ];

  const partnerTypes = [
    {
      title: "Educational Institutions",
      icon: <School size={32} />,
      description:
        "Universities, colleges, and training centers looking to expand their test preparation offerings.",
      features: [
        "Integrate our courses into your curriculum",
        "Access branded learning materials",
        "Dedicated support team",
        "Custom pricing models",
      ],
    },
    {
      title: "Test Preparation Centers",
      icon: <Target size={32} />,
      description:
        "Established test prep centers wanting to enhance their program portfolio.",
      features: [
        "Comprehensive study materials",
        "Teacher training programs",
        "Performance tracking tools",
        "Marketing support",
      ],
    },
    {
      title: "Educational Consultants",
      icon: <Handshake size={32} />,
      description:
        "Independent consultants and agencies helping students with overseas education.",
      features: [
        "Flexible partnership models",
        "Commission-based structure",
        "Lead generation support",
        "Regular product updates",
      ],
    },
  ];

  const FloatingForm = () => (
    <div
      className={`fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 transition-opacity duration-300
      ${isFormOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl
        transform transition-transform duration-500 overflow-y-auto
        ${isFormOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Form Header */}
        <div
          className="sticky top-0 bg-white border-b border-neutral-200 px-8 py-4
          flex items-center justify-between z-10"
        >
          <div>
            <h3 className="text-xl font-bold text-neutral-800">
              Partner Application
            </h3>
            <p className="text-sm text-neutral-600">Step {currentStep} of 3</p>
          </div>
          <button
            onClick={() => setIsFormOpen(false)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors duration-300"
          >
            <X size={24} className="text-neutral-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-neutral-100">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Institute Name *
                    </label>
                    <input
                      type="text"
                      name="instituteName"
                      required
                      value={formData.instituteName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Institute Type *
                    </label>
                    <select
                      name="instituteType"
                      required
                      value={formData.instituteType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    >
                      <option value="">Select Type</option>
                      <option value="university">University</option>
                      <option value="college">College</option>
                      <option value="testPrep">Test Preparation Center</option>
                      <option value="consultant">Educational Consultant</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Contact Person Name *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      required
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Email Address *
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
              </>
            )}

            {/* Step 2: Additional Information */}
            {currentStep === 2 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Website URL
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                      placeholder="https://"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Final Details */}
            {currentStep === 3 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Year Established
                    </label>
                    <input
                      type="number"
                      name="yearEstablished"
                      value={formData.yearEstablished}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                      placeholder="YYYY"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Current Number of Students
                    </label>
                    <input
                      type="number"
                      name="currentStudents"
                      value={formData.currentStudents}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                        focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-300
                      focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    placeholder="Tell us more about your institution and partnership goals..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm text-neutral-600"
                  >
                    I agree to StudyStreak's partnership terms and conditions. I
                    understand and accept the partnership guidelines and
                    responsibilities.
                  </label>
                </div>
              </>
            )}

            {/* Form Navigation */}
            <div className="flex justify-between pt-6 border-t border-neutral-200">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev - 1)}
                  className="px-6 py-2.5 rounded-xl border border-neutral-300
                    text-neutral-700 hover:bg-neutral-50 transition-colors duration-300"
                >
                  Previous
                </button>
              )}
              <div className="flex-1" />
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="bg-primary-600 text-white px-6 py-2.5 rounded-xl
                    hover:bg-primary-700 transition-colors duration-300"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-8 py-2.5 rounded-xl
                    hover:bg-primary-700 transition-all duration-300 flex items-center gap-2"
                >
                  Submit Application
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Partner with StudyStreak
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Join forces with a leading educational technology platform and
              help shape the future of test preparation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("application-form")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-medium
                  hover:bg-primary-50 transition-all duration-300 shadow-elevated 
                  hover:shadow-hover transform hover:-translate-y-0.5"
              >
                Apply Now
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("benefits")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="bg-primary-700 text-white px-8 py-3 rounded-xl font-medium
                  hover:bg-primary-800 transition-all duration-300 border border-primary-500"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Partner Institutions" },
              { number: "50k+", label: "Students Enrolled" },
              { number: "95%", label: "Partner Satisfaction" },
              { number: "₹2Cr+", label: "Partner Earnings" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section id="benefits" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-neutral-600 text-lg">
              Join our partnership program and unlock a world of opportunities
              for your institution and students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-neutral-200 shadow-card
                  hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center
                  text-primary-600 mb-4"
                >
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="bg-neutral-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Choose Your Partnership Model
            </h2>
            <p className="text-neutral-600 text-lg">
              We offer flexible partnership models tailored to different types
              of institutions and organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnerTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl border border-neutral-200 shadow-card
                  hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center
                  text-primary-600 mb-6"
                >
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-3">
                  {type.title}
                </h3>
                <p className="text-neutral-600 mb-6">{type.description}</p>
                <ul className="space-y-3">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle
                        size={18}
                        className="text-primary-600 mt-1 flex-shrink-0"
                      />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-neutral-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 text-center mb-12">
              Everything you need to know about partnering with StudyStreak
            </p>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl overflow-hidden border border-neutral-200
                    hover:border-primary-300 transition-all duration-300"
                >
                  <button
                    onClick={() =>
                      setActiveQuestion(
                        activeQuestion === faq.id ? null : faq.id
                      )
                    }
                    className="w-full px-6 py-4 flex items-center justify-between text-left
                      hover:bg-neutral-50 transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-neutral-800">
                      {faq.q}
                    </h3>
                    {activeQuestion === faq.id ? (
                      <ChevronUp className="text-primary-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="text-neutral-400 flex-shrink-0" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300
                    ${
                      activeQuestion === faq.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="px-6 pb-4 text-neutral-600">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Form */}
      <FloatingForm />

      {/* Modified CTA buttons to open the floating form */}
      <button
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-8 right-8 bg-primary-600 text-white px-8 py-3 rounded-xl
          font-medium hover:bg-primary-700 transition-all duration-300 shadow-elevated
          hover:shadow-hover transform hover:-translate-y-0.5 flex items-center gap-2 z-40"
      >
        Apply Now
        <ArrowRight size={18} />
      </button>

      {/* FAQ Section */}
      {/* <section className="bg-neutral-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-800 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "What are the requirements to become a partner?",
                  a: "Partners should be registered educational institutions, test preparation centers, or licensed educational consultants with a proven track record in the education sector."
                },
                {
                  q: "How long does the application process take?",
                  a: "The typical application review process takes 5-7 business days. Once approved, we'll schedule an onboarding call to get you started."
                },
                {
                  q: "What support do partners receive?",
                  a: "Partners receive comprehensive support including training, marketing materials, technical support, and a dedicated partnership manager."
                },
                {
                  q: "How is the revenue sharing structured?",
                  a: "We offer competitive commission rates based on the partnership model and volume of enrollments. Specific details are discussed during the partnership discussion."
                }
              ].map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-card"
                >
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">{faq.q}</h3>
                  <p className="text-neutral-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Have More Questions?
            </h2>
            <p className="text-neutral-600 text-lg mb-8">
              Our partnership team is here to help you make the right decision
              for your institution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-primary-600 text-white px-8 py-3 rounded-xl font-medium
                hover:bg-primary-700 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Schedule a Call
                <ArrowRight size={18} />
              </button>
              <button
                className="bg-neutral-100 text-neutral-700 px-8 py-3 rounded-xl font-medium
                hover:bg-neutral-200 transition-all duration-300"
              >
                Email Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeAPartnerPage;
