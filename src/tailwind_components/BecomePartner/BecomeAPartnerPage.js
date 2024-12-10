import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Users,
  Laptop,
  GraduationCap,
  CheckCircle,
  Globe2,
  BookOpen,
  DollarSign,
  Handshake,
  Send,
} from "lucide-react";

const purposes = [
  "Be a Counselor",
  "Be an IELTS, PTE, or TOEFL Faculty",
  "Be a Study Abroad Consultant",
  "Be a StudyStreak Partner",
];

const stats = [
  { number: "500+", label: "Partner Institutions" },
  { number: "50k+", label: "Students Enrolled" },
  { number: "95%", label: "Partner Satisfaction" },
  { number: "₹2Cr+", label: "Partner Earnings" },
];
const partnerTypes = [
  {
    title: "Be a Counselor",
    icon: <Users className="w-8 h-8" />,
    features: [
      "Student Guidance: Shape students' career paths with informed counseling",
      "Rewarding Impact: Help students realize their study abroad dreams",
      "Expert Training: Access in-depth training and resources",
      "Visa Insights: Gain expertise in international education systems",
      "Diverse Interaction: Work with students from varied backgrounds",
      "Team Collaboration: Be part of a supportive team",
      "End-to-End Support: Offer comprehensive assistance",
      "Global Expertise: Specialize in top study destinations",
    ],
  },
  {
    title: "Be an IELTS, PTE, or TOEFL Faculty",
    icon: <GraduationCap className="w-8 h-8" />,
    features: [
      "Structured Curriculum: Teach with certified syllabus",
      "Interactive Sessions: Engage in live teaching",
      "Resource Access: Utilize extensive test prep resources",
      "Skill Development: Continuously upskill with training",
      "Passionate Community: Join language education experts",
      "Certified Materials: Use British Council certified content",
      "Practice-Driven Learning: 100+ mock tests available",
      "Flexible Sessions: Offer live and recorded classes",
    ],
  },
  {
    title: "Be a Study Abroad Consultant",
    icon: <Globe2 className="w-8 h-8" />,
    features: [
      "Global Specialization: Focus on major study destinations",
      "Comprehensive Support: Guide through admissions to visas",
      "Access to Resources: Use vast counseling tools",
      "Trusted Advisor Role: Guide through critical decisions",
      "Career Impact: Build a fulfilling career",
      "Streamlined Processes: Simplify complexities",
      "Funding Guidance: Offer scholarship support",
      "Post-Admission Support: Prepare for integration abroad",
    ],
  },
  {
    title: "Be a StudyStreak Partner",
    icon: <Handshake className="w-8 h-8" />,
    features: [
      "High-Quality Courses: Offer structured learning modules",
      "Comprehensive Resources: Access tests and video lessons",
      "Earn Revenue: Benefit from student progress",
      "Professional Network: Connect with institutions",
      "Business Growth: Build with education services",
      "Extensive Content: 60+ hours of content available",
      "Progress Tracking: Advanced monitoring tools",
      "Flexible Partnership: Customizable resources",
    ],
  },
];
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

const BecomeAPartnerPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "Be a Counselor",
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
    data.append("message", formData.message);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzE3sXvwXTNFUp6lAL1ymgVihVSMgk-rtg3sbPNchti7sZ9zgbsIQa_AoDKV5YfBUjE_g/exec",
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
          purpose: "Be a Counselor",
          message: "",
        });
        toast.success("Form submitted successfully.");
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
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
                className="bg-white text-primary-600 px-8 py-3 rounded-xl font-medium
                  hover:bg-primary-50 transition-all duration-300 shadow-elevated 
                  hover:shadow-hover transform hover:-translate-y-0.5"
              >
                Apply Now
              </button>
              <button
                className="bg-primary-700 text-white px-8 py-3 rounded-xl font-medium
                  hover:bg-primary-800 transition-all duration-300 border border-primary-500"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ number, label }, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {number}
                </div>
                <div className="text-neutral-600">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            {benefits.map(({ icon, title, description }, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-neutral-200 shadow-card
                  hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className="bg-primary-100 w-12 h-12 rounded-lg flex items-center justify-center
                  text-primary-600 mb-4"
                >
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">
                  {title}
                </h3>
                <p className="text-neutral-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 py-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerTypes.map(
              ({ icon, title, description, features }, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl border border-neutral-200 shadow-card
                  hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div
                    className="bg-primary-100 w-16 h-16 rounded-xl flex items-center justify-center
                  text-primary-600 mb-4"
                  >
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">
                    {title}
                  </h3>
                  <p className="text-neutral-600 mb-6">{description}</p>
                  <ul className="space-y-3">
                    {features.map((feature, i) => (
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
              )
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-4">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-6">
              Become a Partner
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
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </div>
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
                {isLoading ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeAPartnerPage;
