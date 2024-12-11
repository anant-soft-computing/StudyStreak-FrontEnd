import {
  BookOpen,
  CheckCircle,
  DollarSign,
  Globe2,
  GraduationCap,
  Laptop,
  Users,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Excellence in Education",
    role: "We are committed to delivering top-notch educational content and resources that meet the highest standards of quality and relevance.",
  },
  {
    name: "Empowering Students",
    role: "We aim to empower students with the knowledge, skill, and confidence they need to succeed in their international education pursuits.",
  },
  {
    name: "Innovation and Technology",
    role: "We leverage the latest advancements in technology to create an engaging, interactive, and effective learning experience for our students.",
  },
];

const benefits = [
  {
    icon: <DollarSign size={24} />,
    title: "Comprehensive Courses",
    description:
      "Our platform offers a wide range of courses tailored to help students excel in international exams like IELTS, PTE, TOEFL, OET, DUOLINGO, Skills for English, GRE, GMAT, SAT, and more. Each course is designed by experts to provide in-depth knowledge and practical skills",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Expert Instructors",
    description:
      "Our team of experienced and qualified instructors is dedicated to guiding students through every step of their preparation journey. They provide personalized feedback, support, and mentorship to ensure student success.",
  },
  {
    icon: <Laptop size={24} />,
    title: "Interactive Learning",
    description:
      "StudyStreak.in features interactive lessons, quizzes, and forums that make learning engaging and effective. Our platform encourages active participation and collaboration among students.",
  },
  {
    icon: <Users size={24} />,
    title: "Flexible Scheduling",
    description:
      "We understand that every student has a unique schedule. Our courses are designed to offer flexibility, allowing students to learn at their own pace and convenience.",
  },
  {
    icon: <GraduationCap size={24} />,
    title: "Supportive Community",
    description:
      "join a community of like-minded learners and professionals who share your goals and aspirations. Our platform fosters a supportive and collaborative environment where students can connect share experiences, and seek guidance.",
  },
];

const partnerTypes = [
  {
    title: "Proven Track Record",
    icon: <Globe2 className="w-8 h-8" />,
    features: [
      "Our students have consistently achieved outstanding results in their international exams and have successfully gained admission to top universities worldwide.",
    ],
  },
  {
    title: "Comprehensive Resources",
    icon: <BookOpen className="w-8 h-8" />,
    features: [
      "We provide a wealth of resources, including study materials, practice tests, and e-books, to enhance your learning experience",
    ],
  },
  {
    title: "Personalized Approach",
    icon: <Users className="w-8 h-8" />,
    features: [
      "Our platform tailors the learning experience to meet the individual needs and preferences of each student, ensuring optimal outcomes.",
    ],
  },
  {
    title: "Commitment to Excellence",
    icon: <GraduationCap className="w-8 h-8" />,
    features: [
      "We are dedicated to maintaining the highest standards of quality and excellence in everything we do.",
      "Join us at StudyStreak.in and embark on your journey to international education success. Together, we can turn your dreams into reality.",
    ],
  },
];

const AboutUsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About StudyStreak
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Empowering students to achieve their dreams through expert-led
              test preparation
            </p>
          </div>
        </div>
      </header>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-neutral-800 mb-4">
              About Us
            </h3>
            <div
              className="bg-white mb-4 p-6 rounded-xl border border-neutral-200 shadow-card
                  hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="text-neutral-600 text-lg">
                Welcome to StudyStreak.in, your dedicated partner in achieving
                your dreams of studying abroad. We are a premier Learning
                Management System (LMS) designed to help students prepare for
                various international courses and exams, including ielts, pte,
                toefl, oet, duolingo, gre, gmat, sat, and more.
              </p>
            </div>
            <div
              className="bg-white mb-4 p-6 rounded-xl border border-neutral-200 shadow-card
                  hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="text-neutral-600 text-lg">
                At StudyStreak.in, we understand the challenges and complexities
                involved in preparing for higher education abroad. Our mission
                is to simplify this journey by providing comprehensive,
                high-quality, and accessible learning resources that cater to
                the diverse needs of our students.
              </p>
            </div>
          </div>
          <div className="max-w-3xl mx-auto text-center mt-8">
            <h3 className="text-3xl font-bold text-neutral-800 mb-4">
              Our Vision
            </h3>
            <div
              className="bg-white mb-4 p-6 rounded-xl border border-neutral-200 shadow-card
                  hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
            >
              <p className="text-neutral-600 text-lg">
                To be the leading platform for international education
                preparation, empowering students to achieve their academic and
                career goals with confidence and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center font-bold text-neutral-800 mb-4">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white mb-4 p-6 rounded-xl border border-neutral-200 shadow-card
                  hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-neutral-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              What We Offer
            </h2>
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

      <section className="bg-neutral-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Why Choose StudyStreak.in?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have achieved their dreams
            with StudyStreak
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/courses"
              className="bg-white text-primary-600 px-8 py-3 rounded-xl 
                hover:bg-primary-50 transition-all duration-300 font-medium"
            >
              Explore Our Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
