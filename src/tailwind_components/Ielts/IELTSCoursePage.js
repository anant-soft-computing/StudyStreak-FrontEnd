import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, User, Award, Target } from "lucide-react";
import EnglishTest from "../EnglishTest/EnglishTest";
import IeltsList from "./IeltsList";

const IELTSPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const navigate = useNavigate();

  // IELTS-specific courses data
  const ieltsModules = ["All", "Listening", "Reading", "Writing", "Speaking"];

  const successStories = [
    {
      name: "John Smith",
      score: "8.5",
      country: "India",
      university: "University of Toronto",
      quote:
        "The IELTS course at StudyStreak helped me achieve my dream score. The personalized feedback was invaluable.",
    },
    // Add more success stories...
  ];

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

  const handleTakeTest = () => {
    navigate("/english-test");
  };
  const handleCourse = () => {
    navigate("/courses");
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
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

              {/* Quick Stats */}
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
                  Take Free Test
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              {/* Add an IELTS-specific illustration or image here */}
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
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

      {/* Course Filter and Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Module Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              {ieltsModules.map((module) => (
                <button
                  key={module}
                  onClick={() => setSelectedFilter(module)}
                  className={`px-6 py-2.5 rounded-xl transition-all duration-300 
                    ${
                      selectedFilter === module
                        ? "bg-primary-600 text-white shadow-soft"
                        : "bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600"
                    }`}
                >
                  {module}
                </button>
              ))}
            </div>
          </div>

          {/* Course Grid */}
          <IeltsList />
        </div>
      </section>

      <section className="py-4 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <EnglishTest />
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Success Stories
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Join thousands of students who have achieved their target IELTS
              scores with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-neutral-50 rounded-2xl p-6 shadow-card"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full bg-primary-100 flex items-center 
                    justify-center text-primary-600 font-bold text-lg"
                  >
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-800">
                      {story.name}
                    </h3>
                    <p className="text-sm text-primary-600">
                      Band Score: {story.score}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {story.university}
                    </p>
                  </div>
                </div>
                <p className="text-neutral-600 italic">"{story.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Resources */}
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

      {/* Call to Action */}
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
