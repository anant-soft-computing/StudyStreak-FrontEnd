import React from "react";
import {
  Users,
  Trophy,
  Target,
  CheckCircle,
  Globe,
  Clock,
  BarChart,
  BookOpen,
  ThumbsUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const WhyChooseUsPage = () => {
  const navigate = useNavigate();
  const statistics = [
    { number: "15,000+", label: "Students Trained", icon: Users },
    { number: "95%", label: "Success Rate", icon: Trophy },
    { number: "8.5+", label: "Average Band Score", icon: Target },
    { number: "100%", label: "Satisfaction Rate", icon: ThumbsUp },
  ];

  const keyFeatures = [
    {
      title: "Expert Instructors",
      description:
        "Learn from certified IELTS trainers with proven track records of helping students achieve band 8+",
      icon: Users,
      color: "primary",
    },
    {
      title: "Comprehensive Study Material",
      description:
        "Access our extensive library of practice tests, study guides, and mock exams",
      icon: BookOpen,
      color: "secondary",
    },
    {
      title: "Personalized Learning",
      description:
        "Get customized study plans based on your current level and target score",
      icon: Target,
      color: "accent",
    },
    {
      title: "Track Progress",
      description:
        "Monitor your improvement with detailed analytics and performance tracking",
      icon: BarChart,
      color: "success",
    },
    {
      title: "Flexible Schedule",
      description:
        "Choose from multiple batch timings that suit your availability",
      icon: Clock,
      color: "warning",
    },
    {
      title: "Global Recognition",
      description: "Our certificates are recognized by institutions worldwide",
      icon: Globe,
      color: "error",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      score: "8.5",
      university: "University of Toronto",
      image: "/student-1.jpg",
      quote:
        "StudyStreak's methodology and expert guidance helped me achieve my dream score in just 2 months!",
    },
  ];

  const guarantees = [
    "Band Score Improvement",
    "Money Back Guarantee",
    "Unlimited Practice Tests",
    "24/7 Support",
    "Free Demo Class",
    "Course Completion Certificate",
  ];

  const handleDemoClick = () => {
    navigate("/talk-to-us");
  };
  const handleCourseClick = () => {
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
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
              Why Choose <span className="text-accent-400">StudyStreak</span>?
            </h1>
            <p className="text-xl text-primary-100 mb-8 animate-fade-in-up delay-100">
              Join thousands of successful students who have achieved their
              dream scores with our expert guidance and proven methodology.
            </p>
            <div className="flex justify-center gap-4 animate-fade-in-up delay-200">
              <button
                onClick={handleDemoClick}
                className="bg-white text-primary-600 px-8 py-3 rounded-xl 
                hover:bg-primary-50 transition-all duration-300 font-medium"
              >
                Book Free Demo
              </button>
              <button
                onClick={handleCourseClick}
                className="bg-primary-700 text-white px-8 py-3 rounded-xl 
                hover:bg-primary-800 transition-all duration-300 font-medium 
                border border-primary-500"
              >
                View Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-2xl 
                  flex items-center justify-center group-hover:bg-primary-200 
                  transition-colors duration-300"
                >
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-neutral-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
            What Sets Us Apart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover 
                  transition-all duration-300 transform hover:-translate-y-1 
                  border border-neutral-200 hover:border-primary-200"
              >
                <div
                  className={`w-12 h-12 rounded-xl mb-4 
                  bg-${feature.color}-100 flex items-center justify-center`}
                >
                  <feature.icon
                    className={`w-6 h-6 text-${feature.color}-600`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
            Our Guarantees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {guarantees.map((guarantee, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-primary-50 
                  hover:bg-primary-100 transition-colors duration-300"
              >
                <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <span className="text-neutral-800 font-medium">
                  {guarantee}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
            Student Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover 
                  transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-neutral-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-primary-600 text-sm">
                      Band Score: {testimonial.score}
                    </p>
                    <p className="text-neutral-500 text-sm">
                      {testimonial.university}
                    </p>
                  </div>
                </div>
                <p className="text-neutral-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our next batch and take the first step towards achieving your
            target score.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/courses"
              className="bg-white text-primary-600 px-8 py-3 rounded-xl 
                hover:bg-primary-50 transition-all duration-300 font-medium"
            >
              Browse Courses
            </Link>
            <Link
              to="/contact"
              className="bg-primary-700 text-white px-8 py-3 rounded-xl 
                hover:bg-primary-800 transition-all duration-300 font-medium 
                border border-primary-500"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUsPage;
