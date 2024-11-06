import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Clock, Star, Calendar, ArrowRight } from "lucide-react";
import CourseList from "./CourseList";

const TestimonialCarousel = () => {
  const testimonials = [
    {
      name: "John Doe",
      exam: "IELTS",
      score: "8.5",
      quote:
        "StudyStreak's approach to IELTS prep is revolutionary. The instructors break down complex topics into easily digestible pieces.",
    },
    {
      name: "Jane Smith",
      exam: "GRE",
      score: "335",
      quote:
        "I was struggling with the Quantitative section, but StudyStreak's GRE course changed the game for me.",
    },
    {
      name: "Alex Johnson",
      exam: "GMAT",
      score: "760",
      quote:
        "The GMAT course at StudyStreak is intense but incredibly effective. The instructors don't just teach you the material, they teach you how to think.",
    },
    {
      name: "Emily Chen",
      exam: "TOEFL",
      score: "118",
      quote:
        "As a non-native English speaker, I was terrified of the TOEFL. StudyStreak's course not only prepared me for the exam but also improved my English skills.",
    },
    {
      name: "Mohammed Al-Fayed",
      exam: "PTE",
      score: "89",
      quote:
        "The PTE Academic course at StudyStreak is top-notch. The personalized feedback on speaking and writing tasks was particularly helpful.",
    },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.offsetWidth;

    const animateScroll = () => {
      setScrollPosition((prevPosition) => {
        if (prevPosition >= scrollWidth - containerWidth) {
          return 0;
        }
        return prevPosition + 1;
      });
    };

    const scrollInterval = setInterval(animateScroll, 50);
    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex transition-transform duration-1000 ease-linear"
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div key={index} className="w-[300px] flex-shrink-0 mx-3">
            <div
              className="group bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover 
              transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center
                  text-primary-600 font-bold text-lg mr-4 group-hover:bg-primary-200 transition-colors"
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-neutral-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-primary-600 text-sm">
                    {testimonial.exam} Score:{" "}
                    <span className="font-bold">{testimonial.score}</span>
                  </p>
                </div>
              </div>
              <p className="text-neutral-600 text-sm flex-grow">
                {testimonial.quote}
              </p>
              <div className="flex mt-4 justify-end">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-warning-400 fill-current"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CoursesPage = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const exams = ["All", "IELTS", "GRE", "GMAT", "TOEFL", "PTE", "GENERAL"];

  const webinars = [
    {
      title: "IELTS Writing Task 2 Strategies",
      date: "2024-10-15",
      time: "14:00 UTC",
      instructor: "Dr. Emma Watson",
    },
    {
      title: "GRE Quantitative Reasoning Tips",
      date: "2024-10-18",
      time: "18:00 UTC",
      instructor: "Prof. Robert Chen",
    },
    {
      title: "TOEFL Speaking Section Mastery",
      date: "2024-10-20",
      time: "16:00 UTC",
      instructor: "Michael Brown, PhD",
    },
  ];

  const blogPosts = [
    {
      title: "5 Essential IELTS Writing Tips",
      excerpt: "Improve your IELTS writing score with these expert tips...",
      author: "Dr. Emma Watson",
      date: "2024-09-30",
    },
    {
      title: "Mastering GRE Vocabulary",
      excerpt: "Effective strategies to build your GRE vocabulary quickly...",
      author: "Prof. Robert Chen",
      date: "2024-09-25",
    },
    {
      title: "TOEFL vs IELTS: Which Should You Take?",
      excerpt:
        "A comprehensive comparison to help you choose the right English proficiency test...",
      author: "Michael Brown, PhD",
      date: "2024-09-20",
    },
  ];

  // Handle assessment button click
  const handleAssessmentClick = () => {
    navigate("/english-test");
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 pb-6">
        <div className="container mx-auto px-4 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                Explore Our Courses
              </h1>
              <p className="text-lg text-primary-100">
                Find the perfect course to achieve your target score
              </p>
            </div>
            <div className="flex-shrink-0 flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full py-2.5 pl-4 pr-10 rounded-xl text-neutral-800 border-0 
                    focus:ring-2 focus:ring-primary-300 bg-white/90 backdrop-blur-lg"
                />
                <Search
                  className="absolute right-3 top-2.5 text-neutral-400"
                  size={20}
                />
              </div>
              <button
                onClick={handleAssessmentClick}
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2.5 
                  rounded-xl transition-all duration-300 shadow-soft hover:shadow-hover transform 
                  hover:-translate-y-0.5 whitespace-nowrap"
              >
                Take Assessment
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
              {exams.map((exam) => (
                <button
                  key={exam}
                  onClick={() => setSelectedExam(exam === "All" ? "" : exam)}
                  className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300
                    ${
                      selectedExam === exam
                        ? "bg-primary-500 text-white shadow-soft transform -translate-y-0.5"
                        : "bg-neutral-100 text-primary-600 hover:bg-primary-50 hover:-translate-y-0.5"
                    }`}
                >
                  {exam}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-8">
        {/* Course Grid */}
        <CourseList selectedCategory={selectedExam} searchTerm={searchTerm} />

        {/* Webinars Section */}
        <section className="container mx-auto px-4 mt-8">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8">
            Upcoming Webinars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-6">
            {webinars.map((webinar, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover 
                  transition-all duration-300 border border-neutral-200 
                  hover:border-primary-200 transform hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold text-neutral-800 mb-3">
                  {webinar.title}
                </h3>
                <p className="text-primary-600 mb-4">{webinar.instructor}</p>
                <div className="flex items-center text-sm text-neutral-600 mb-6 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(webinar.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{webinar.time}</span>
                  </div>
                </div>
                <button
                  className="w-full bg-primary-600 text-white py-2.5 rounded-xl 
                  hover:bg-primary-700 transition-colors duration-300"
                >
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-16 bg-neutral-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8 text-center">
              What Our Students Say
            </h2>
            <TestimonialCarousel />
          </div>
        </section>

        {/* Blog Section */}
        <section className="container mx-auto px-4 mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-800">
              Latest from Our Blog
            </h2>
            <Link
              to="/blogs"
              className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover 
                  transition-all duration-300 border border-neutral-200 hover:border-primary-200"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold text-neutral-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 mb-6">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-neutral-500">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="bg-primary-600 p-4 hover:bg-primary-700 transition-colors duration-300">
                  <Link
                    to="/blogs"
                    className="text-white flex items-center justify-center gap-2"
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CoursesPage;
