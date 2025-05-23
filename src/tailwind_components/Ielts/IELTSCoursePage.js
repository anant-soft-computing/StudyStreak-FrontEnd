import React from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, User, Award, Target, BarChart2, Star } from "lucide-react";
import IeltsList from "./IeltsList";
import PopularPackages from "./PopularPackages";
import Testimonial from "../Testimonial/Testimonial";

const keyFeatures = [
  {
    icon: User,
    title: "Expert Instructors",
    description: "Learn from IELTS experts with proven track records",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Material",
    description: "Complete study material covering all IELTS modules",
  },
  {
    icon: Target,
    title: "Practice Tests",
    description: "Regular mock tests with detailed performance analysis",
  },
  {
    icon: Award,
    title: "Band Guarantee",
    description: "Guaranteed band improvement or your money back",
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
    <div>
      <Helmet>
        <title>
          Best IELTS Academic Self-Study Online Course | StudyStreak
        </title>
        <meta
          name="description"
          content="Boost your IELTS score with the best IELTS academic self-study online course. Study at your own pace with expert guidance. Start learning today!"
        />
        <meta
          name="keywords"
          content="IELTS Academic Self-Study Online Course"
        />
        <meta name="author" content="StudyStreak.in" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.studystreak.in/ielts" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Best IELTS Academic Self-Study Online Course | StudyStreak"
        />
        <meta
          property="og:description"
          content="Boost your IELTS score with the best IELTS academic self-study online course. Study at your own pace with expert guidance. Start learning today!"
        />
        <meta property="og:url" content="https://www.studystreak.in/ielts" />
        <meta
          property="og:image"
          content="https://www.studystreak.in/Logo1.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Best IELTS Academic Self-Study Online Course | StudyStreak"
        />
        <meta
          name="twitter:description"
          content="Boost your IELTS score with the best IELTS academic self-study online course. Study at your own pace with expert guidance. Start learning today!"
        />
        <meta
          name="twitter:image"
          content="https://www.studystreak.in/Logo1.png"
        />
        <meta name="twitter:url" content="https://www.studystreak.in/ielts" />
      </Helmet>
      <div className="bg-neutral-50 min-h-screen">
        <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 py-12 md:py-16 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
              <div className="w-full lg:w-1/2 space-y-4 text-white">
                <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-xs sm:text-sm backdrop-blur-sm border border-white/20">
                  <Star className="w-3 h-3 mr-1.5 text-yellow-300" />
                  #1 Rated IELTS Preparation Course
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Master IELTS with{" "}
                  <span className="text-accent-400">Confidence</span>
                </h1>
                <p className="text-primary-100 text-sm sm:text-base">
                  Comprehensive IELTS preparation designed to help you achieve
                  your target band score. Join thousands of successful students
                  who have achieved their dreams with us.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-3">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold flex items-center justify-center">
                      8.5+
                      <BarChart2 className="w-4 h-4 ml-0.5 text-accent-300" />
                    </div>
                    <div className="text-primary-200 text-xs uppercase tracking-wider">
                      Average Band Score
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold">15K+</div>
                    <div className="text-primary-200 text-xs uppercase tracking-wider">
                      Success Stories
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold">95%</div>
                    <div className="text-primary-200 text-xs uppercase tracking-wider">
                      Success Rate
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <button
                    onClick={handleCourse}
                    className="bg-white text-primary-700 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg 
                    hover:bg-primary-50 transition-all duration-300 font-medium text-sm sm:text-base"
                  >
                    Explore Courses
                  </button>
                  <button
                    className="bg-transparent text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg 
                    hover:bg-white/10 transition-all duration-300 font-medium border border-white/30 text-sm sm:text-base"
                    onClick={handleTakeTest}
                  >
                    Take Diagnostic Test
                  </button>
                </div>
              </div>
              <PopularPackages />
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

        <Testimonial />

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
                    Access free {resource.toLowerCase()} to boost your
                    preparation
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
              Join our comprehensive IELTS preparation program and take the
              first step towards achieving your target band score.
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
    </div>
  );
};

export default IELTSPage;
