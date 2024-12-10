import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, User, Award, Target } from "lucide-react";
import IeltsList from "./IeltsList";
import TestimonialSection from "../Testimonial/TestimonialSection";

const keyFeatures = [
  {
    title: "Expert Instructors",
    description: "Learn from IELTS experts with proven track records",
    icon: User,
  },
  {
    title: "Comprehensive Material",
    description: "Complete study material covering all IELTS modules",
    icon: BookOpen,
  },
  {
    title: "Practice Tests",
    description: "Regular mock tests with detailed performance analysis",
    icon: Target,
  },
  {
    title: "Band Guarantee",
    description: "Guaranteed band improvement or your money back",
    icon: Award,
  },
];

const IELTSPage = () => {
  const navigate = useNavigate();

  const handleTakeTest = () => {
    navigate("/login");
  };
  const handleCourse = () => {
    navigate("/courses");
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-grid-pattern opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 space-y-6 text-white">
              <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm backdrop-blur-sm">
                #1 Rated IELTS Preparation Course
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Master IELTS with{" "}
                <span className="text-accent-400">Confidence</span>
              </h1>
              <p className="text-lg text-primary-100">
                Comprehensive IELTS preparation designed to help you achieve
                your target band score. Join thousands of successful students
                who have achieved their dreams with us.
              </p>

              <div className="grid grid-cols-3 gap-8 pt-8">
                <div>
                  <div className="text-3xl font-bold">8.5+</div>
                  <div className="text-primary-200 text-sm">
                    Average Band Score
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold">15K+</div>
                  <div className="text-primary-200 text-sm">
                    Success Stories
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-primary-200 text-sm">Success Rate</div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleCourse}
                  className="bg-white text-primary-600 px-6 py-3 rounded-xl 
                  hover:bg-primary-50 transition-all duration-300 font-medium"
                >
                  Explore Courses
                </button>
                <button
                  className="bg-primary-700 text-white px-6 py-3 rounded-xl 
                  hover:bg-primary-800 transition-all duration-300 font-medium border border-primary-500"
                  onClick={handleTakeTest}
                >
                  Take Diagnostic Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Why Choose Our IELTS Program?
            </h2>
            <p className="text-neutral-600">
              Our comprehensive IELTS preparation program is designed to give
              you the best possible chance of success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-neutral-50 rounded-2xl p-6 hover:bg-primary-50 
                  transition-all duration-300 cursor-pointer"
              >
                <div
                  className="mb-4 bg-primary-100 w-12 h-12 rounded-xl flex items-center 
                  justify-center group-hover:bg-primary-200 transition-colors duration-300"
                >
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
                Popular IELTS Courses
              </h2>
            </div>
          </div>
          <IeltsList />
        </div>
      </section>

      <TestimonialSection />

      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-neutral-800 mb-12 text-center">
            Free Study Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Practice Tests",
              "Sample Essays",
              "Vocabulary Lists",
              "Tips & Tricks",
            ].map((resource, index) => (
              <Link
                key={index}
                to={`/resources/${resource.toLowerCase().replace(" ", "-")}`}
                className="bg-white rounded-xl p-6 text-center hover:bg-primary-50 
                  transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-full bg-primary-100 mx-auto mb-4 
                  flex items-center justify-center group-hover:bg-primary-200 
                  transition-colors duration-300"
                >
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">
                  {resource}
                </h3>
                <p className="text-sm text-neutral-600">
                  Access free {resource.toLowerCase()} to boost your preparation
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your IELTS Journey?
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our comprehensive IELTS preparation program and take the first
            step towards achieving your target band score.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-white text-primary-600 px-8 py-3 rounded-xl 
              hover:bg-primary-50 transition-all duration-300 font-medium"
            >
              Get Started Now
            </button>
            <button
              className="bg-primary-700 text-white px-8 py-3 rounded-xl 
              hover:bg-primary-800 transition-all duration-300 font-medium 
              border border-primary-500"
              onClick={() => navigate("/")}
            >
              Schedule Free Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IELTSPage;
