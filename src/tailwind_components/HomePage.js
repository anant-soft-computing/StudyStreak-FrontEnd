import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  BookOpen,
  Target,
  GraduationCap,
  Mic2Icon,
  Laptop2Icon,
  PenBoxIcon,
} from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TestimonialSection from "./Testimonial/TestimonialSection";
import { Link, useNavigate } from "react-router-dom";
import CourseList from "./Course/CourseList";
import ajaxCall from "../helpers/ajaxCall";

const HomePage = () => {
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
  const navigate = useNavigate();
  const handleExplorecourses = () => {
    navigate("/courses");
  };

  const handlestartJourney = () => {
    navigate("/login");
  };

  const features = [
    {
      title: "All Major Test Preparations",
      description: "IELTS, GRE, GMAT, TOEFL, PTE",
      icon: BookOpen,
      iconBgColor: "bg-primary-50",
      iconColor: "text-primary-500",
    },
    {
      title: "Expert Instruction",
      description: "Learn from certified professionals",
      icon: GraduationCap,
      iconBgColor: "bg-secondary-50",
      iconColor: "text-secondary-500",
    },
    {
      title: "Guaranteed Results",
      description: "Improve your scores and Get your Dream Admission",
      icon: Target,
      iconColor: "text-accent-500",
      iconBgColor: "bg-accent-50",
    },
    {
      title: "Live Practice Sessions",
      description: "Improve your scores with Daily Practice with Our Experts",
      icon: Mic2Icon,
      iconColor: "text-accent-500",
      iconBgColor: "bg-accent-50",
    },
    {
      title: "Live Classes",
      description: "Learn about each Topic indepth with Our Experts",
      icon: Laptop2Icon,
      iconColor: "text-accent-500",
      iconBgColor: "bg-accent-50",
    },
    {
      title: "More than 100 Tests to Practice from",
      description: "Learn about each Topic indepth with Our Experts",
      icon: PenBoxIcon,
      iconColor: "text-accent-500",
      iconBgColor: "bg-accent-50",
    },
  ];

  const pteCourses = [
    {
      id: 5,
      title: "PTE Academic Exam Prep",
      icon: "pte",
      duration: "4 weeks",
      level: "All Levels",
      image:
        "http://localhost:3001/static/media/course.519b3df106ae19415253.jpg",
    },
    {
      id: 6,
      title: "PTE Speaking Mastery",
      icon: "pte-speaking",
      duration: "2 weeks",
      level: "Intermediate",
    },
    {
      id: 7,
      title: "PTE Writing Skills",
      icon: "pte-writing",
      duration: "2 weeks",
      level: "Advanced",
    },
    {
      id: 8,
      title: "PTE Reading Techniques",
      icon: "pte-reading",
      duration: "2 weeks",
      level: "Beginner",
    },
  ];

  const [webinars, setWebinars] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/courselistview/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginInfo?.accessToken}`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setWebinars(response.data);
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12 md:py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-grid-pattern opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Achieve your dream of overseas Education with ESPI.
              </h1>
              <p className="text-primary-100 text-lg">
                Focuses courses to develop your potential to score high.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleExplorecourses}
                  className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-xl 
                  shadow-soft hover:shadow-hover transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Explore Courses
                </button>
                <button
                  className="bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-xl 
                  border border-primary-500 hover:border-primary-600 transition-all duration-300"
                >
                  Free Practice Test
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
              <div className="w-full md:w-1/2 relative">
                <img
                  src="https://studystreak.in/static/media/about_10.c6fba820cc5e8886a5dd.png"
                  alt="Students studying"
                  className="rounded-2xl shadow-soft"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-12 md:py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-xl p-6 border border-neutral-200 shadow-card
                hover:shadow-card-hover hover:border-primary-200 transition-all duration-300
                transform hover:-translate-y-1"
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`${feature.iconBgColor} p-3 rounded-xl 
                    group-hover:scale-110 transition-all duration-300`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${feature.iconColor}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-lg text-neutral-800 
                      group-hover:text-primary-600 transition-colors duration-300"
                      >
                        {feature.title}
                      </h3>
                      <p className="text-neutral-600 mt-2">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Exam Courses Section */}
      <CourseList />
      {/* PTE Courses Section */}
      <section className="py-12 md:py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">
                PTE Academic Courses
              </h2>
              <p className="text-neutral-600 mt-2">
                Specialized courses for PTE success
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                className="p-2 rounded-full bg-white border border-neutral-200 hover:bg-primary-50 
                hover:border-primary-200 transition-colors duration-300 group shadow-soft hover:shadow-hover"
              >
                <ChevronLeft
                  size={20}
                  className="text-neutral-600 group-hover:text-primary-600"
                />
              </button>
              <button
                className="p-2 rounded-full bg-white border border-neutral-200 hover:bg-primary-50 
                hover:border-primary-200 transition-colors duration-300 group shadow-soft hover:shadow-hover"
              >
                <ChevronRight
                  size={20}
                  className="text-neutral-600 group-hover:text-primary-600"
                />
              </button>
            </div>
          </div>

          <Carousel
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
            className="pte-carousel"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pteCourses.map((course, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl overflow-hidden border border-neutral-200 
                  shadow-card hover:shadow-card-hover hover:border-primary-200 
                  transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div
                    className={`h-48 relative overflow-hidden ${
                      [
                        "bg-gradient-to-br from-primary-400 to-primary-600",
                        "bg-gradient-to-br from-accent-400 to-accent-600",
                        "bg-gradient-to-br from-secondary-400 to-secondary-600",
                        "bg-gradient-to-br from-success-400 to-success-600",
                      ][index]
                    }`}
                  >
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                    <img
                      src={`https://www.visasolutions4u.com/front_assets/images/icons/ielts-coaching.webp`}
                      alt={course.title}
                      className="w-full h-full object-cover absolute top-0 left-0 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <h3
                      className="font-semibold text-lg mb-3 text-neutral-800 group-hover:text-primary-600 
                      transition-colors duration-300"
                    >
                      {course.title}
                    </h3>
                    <div className="flex items-center text-sm text-neutral-600 mb-4">
                      <Clock size={16} className="mr-2" />
                      <span>{course.duration}</span>
                      <span className="mx-2">•</span>
                      <span>{course.level}</span>
                    </div>
                    <Link
                      to={`/course/${course.id}`}
                      className="block w-full text-center bg-primary-50 text-primary-600 py-2.5 rounded-xl
                      hover:bg-primary-100 transition-colors duration-300 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Carousel>
        </div>
      </section>
      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Webinars Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-3">
              Upcoming Free Webinars
            </h2>
            <p className="text-neutral-600">
              Join our expert instructors for free learning sessions
            </p>
          </div>

          {/* Check if webinars exist */}
          {Array.isArray(webinars) && webinars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webinars.slice(0, 3).map((webinar) => {
                const { date, time } = formatDateTime(webinar.start_time);
                const courseTitle = webinar.Course_Title || "N/A";

                return (
                  <div
                    key={webinar.id}
                    className="group bg-white rounded-xl border border-neutral-200 overflow-hidden
                  shadow-card hover:shadow-card-hover hover:border-primary-200 
                  transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="bg-primary-50 rounded-lg p-3 mb-4 w-fit">
                        <Clock size={24} className="text-primary-500" />
                      </div>
                      <h3
                        className="font-semibold text-xl mb-3 text-neutral-800 group-hover:text-primary-600 
                    transition-colors duration-300"
                      >
                        {webinar.meeting_title}
                      </h3>
                      <p className="text-neutral-600 mb-4">
                        <span className="font-medium">Course:</span>{" "}
                        {courseTitle}
                      </p>
                      <div className="flex items-center text-sm text-neutral-600 mb-3">
                        <Calendar size={16} className="mr-2" />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center text-sm text-neutral-600 mb-3">
                        <Clock size={16} className="mr-2" />
                        <span>
                          {time} ({webinar.other_fields?.duration || "N/A"}{" "}
                          minutes)
                        </span>
                      </div>
                      <div className="text-sm text-neutral-600 mb-6">
                        <span className="font-medium">Class Type:</span>{" "}
                        {webinar.liveclasstype || "N/A"}
                      </div>
                      <button
                        className="w-full bg-primary-600 text-white py-3 rounded-xl
                    hover:bg-primary-700 transition-colors duration-300 font-medium
                    shadow-soft hover:shadow-hover transform hover:-translate-y-0.5"
                      >
                        Join Webinar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Fallback if no webinars available
            <div className="text-center text-neutral-600">
              No upcoming webinars at the moment. Please check back later.
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-grid-pattern opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have achieved their dream scores with
            StudyStreak.
          </p>
          <button
            onClick={handlestartJourney}
            className="bg-white text-primary-600 px-8 py-3 rounded-xl hover:bg-primary-50
            transition-all duration-300 font-semibold shadow-elevated hover:shadow-hover
            transform hover:-translate-y-0.5"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
