import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  Globe,
  Users,
  Clock,
  Trophy,
  Target,
  BookOpen,
  ThumbsUp,
  BarChart,
  CheckCircle,
} from "lucide-react";
import ajaxCall from "../../helpers/ajaxCall";

const statistics = [
  { icon: Users, number: "15,000+", label: "Students Trained" },
  { icon: Trophy, number: "95%", label: "Success Rate" },
  { icon: Target, number: "8.5+", label: "Average Band Score" },
  { icon: ThumbsUp, number: "100%", label: "Satisfaction Rate" },
];

const keyFeatures = [
  {
    icon: Users,
    title: "Expert Instructors",
    description:
      "Learn from certified IELTS trainers with proven track records of helping students achieve band 8+",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Study Material",
    description:
      "Access our extensive library of practice tests, study guides, and mock exams",
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description:
      "Get customized study plans based on your current level and target score",
  },
  {
    icon: BarChart,
    title: "Track Progress",
    description:
      "Monitor your improvement with detailed analytics and performance tracking",
  },
  {
    icon: Clock,
    title: "Flexible Schedule",
    description:
      "Choose from multiple batch timings that suit your availability",
  },
  {
    icon: Globe,
    title: "Global Recognition",
    description: "Our certificates are recognized by institutions worldwide",
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

const WhyChooseUsPage = () => {
  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/testimonial/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          },
          8000
        );
        if (response?.status === 200) {
          setTestimonials(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth / 2;

    const animateScroll = () => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 1;
        if (newPosition >= scrollWidth) {
          return 0;
        }
        return newPosition;
      });
    };

    const scrollInterval = setInterval(animateScroll, 50);
    return () => clearInterval(scrollInterval);
  }, [testimonials]);

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
                onClick={() => navigate("/talk-to-us")}
                className="bg-white text-primary-600 px-8 py-3 rounded-xl 
                hover:bg-primary-50 transition-all duration-300 font-medium"
              >
                Book Free Demo
              </button>
              <button
                onClick={() => navigate("/courses")}
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
                <div className="mb-4 bg-primary-100 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-primary-600" />
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
            Our Guarantees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {guarantees.map((guarantee, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors duration-300"
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
      <section className="py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-neutral-800 mb-12">
            Student Success Stories
          </h2>
          <div className="relative overflow-hidden rounded-2xl">
            <div
              ref={scrollRef}
              className="flex transition-transform duration-1000 ease-linear"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="w-[300px] flex-shrink-0 mx-3">
                  <div
                    className="bg-white p-6 rounded-xl shadow-card hover:shadow-card-hover 
              transition-all duration-300 h-full flex flex-col"
                  >
                    <div className="flex items-center mb-4">
                      {testimonial?.image ? (
                        <div
                          className="w-12 h-12 rounded-full bg-primary-100 flex items-center 
                  justify-center text-primary-600 font-bold text-lg mr-4"
                        >
                          <img
                            className="w-full h-full object-cover rounded-full"
                            src={testimonial?.image}
                            alt={testimonial.name}
                          />
                        </div>
                      ) : (
                        <div
                          className="w-12 h-12 rounded-full bg-primary-100 flex items-center 
                  justify-center text-primary-600 font-bold text-lg mr-4"
                        >
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-lg text-neutral-800">
                          {testimonial.name}
                        </h4>
                      </div>
                    </div>
                    <p className="text-neutral-600 text-sm flex-grow">
                      {testimonial.description}
                    </p>
                    <div className="flex mt-4 justify-end">
                      {[1, 2, 3, 4, 5].map((_, i) => (
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
        </div>
      </section>
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
              to="/talk-to-us"
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
