import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ClipboardCheck,
  Headset,
  BookUser,
  Check,
  Clock,
  Hourglass,
  AlarmClock,
  CalendarDays,
  ChevronUp,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import ContactForm from "./ContactForm";
import Testimonials from "../Testimonial/Testimonial";
import bannerImg from "../../img/herobanner/about_10.png";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-soft p-6 hover:shadow-card-hover transition-shadow duration-300 h-full">
    <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
    <p className="text-neutral-600">{description}</p>
  </div>
);

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-6 hover:bg-primary-50 transition-colors duration-300 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-lg mr-4 flex items-center justify-center ${
              isOpen
                ? "bg-primary-100 text-primary-600"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {index + 1}
          </div>
          <span className="font-medium text-neutral-800">{question}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-400" />
        )}
      </button>
      {isOpen && (
        <div className="bg-neutral-50 px-6 pb-6 pt-2 border-t border-neutral-200">
          <div className="pl-12 text-neutral-600">{answer}</div>
        </div>
      )}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }) => {
  const formatTime = (num) => num.toString().padStart(2, "0");

  return (
    <div className="bg-neutral-50 rounded-xl p-6 text-center shadow-sm border border-neutral-200 max-w-md mx-auto w-full">
      <p className="text-neutral-700 text-lg font-medium mb-4">Offer ends in</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white rounded-lg p-3 border border-neutral-200">
          <div className="flex items-center justify-center gap-1 text-neutral-500 mb-1">
            <CalendarDays className="w-4 h-4" />
            <span className="text-xs">Days</span>
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            {timeLeft.days}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-neutral-200">
          <div className="flex items-center justify-center gap-1 text-neutral-500 mb-1">
            <Hourglass className="w-4 h-4" />
            <span className="text-xs">Hours</span>
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            {formatTime(timeLeft.hours)}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-neutral-200">
          <div className="flex items-center justify-center gap-1 text-neutral-500 mb-1">
            <AlarmClock className="w-4 h-4" />
            <span className="text-xs">Minutes</span>
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            {formatTime(timeLeft.minutes)}
          </div>
        </div>
        <div className="bg-white rounded-lg p-3 border border-neutral-200">
          <div className="flex items-center justify-center gap-1 text-neutral-500 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-xs">Seconds</span>
          </div>
          <div className="text-2xl font-bold text-neutral-800">
            {formatTime(timeLeft.seconds)}
          </div>
        </div>
      </div>
    </div>
  );
};

const FloatingCoupon = ({ promoCode, originalPrice, discountedPrice }) => (
  <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl p-4 flex items-center animate-fade-in">
    <div>
      <p className="text-neutral-600 text-sm">Use code:</p>
      <p className="font-mono font-bold text-primary-700">{promoCode}</p>
    </div>
    <div className="ml-4 pl-4 border-l border-neutral-200">
      <div className="text-2xl font-bold text-primary-700">
        ₹{discountedPrice}
      </div>
      <div className="text-xs text-neutral-500 line-through">
        ₹{originalPrice}
      </div>
    </div>
  </div>
);

const faqs = [
  {
    question: "How do I access the study materials after purchase?",
    answer:
      "After completing your payment, you'll receive login credentials via email within 10 minutes. Simply log in to StudyStreak.in with these credentials to access all your study materials instantly.",
  },
  {
    question: "Is there a time limit for accessing the course?",
    answer:
      "Yes, you'll have full access to all study materials, practice tests, and resources for 6 months from the date of purchase. This gives you ample time to prepare thoroughly at your own pace.",
  },
  {
    question: "How do the doubt-clearing sessions work?",
    answer:
      "You can schedule your two doubt-clearing sessions anytime during your 6-month access period. Each session is 30 minutes long and conducted via Zoom with an IELTS expert who will address your specific questions and concerns.",
  },
  {
    question: "Can I access the materials on my mobile phone?",
    answer:
      "Absolutely! Our platform is fully responsive and works on smartphones, tablets, laptops, and desktop computers. You can study on any device with an internet connection.",
  },
  {
    question: "Do you offer a refund if I'm not satisfied?",
    answer:
      "We offer a 7-day money-back guarantee if you're not satisfied with the course materials. Simply email us at support@studystreak.in within 7 days of purchase, and we'll process your refund with no questions asked.",
  },
];

const features = [
  {
    icon: <ClipboardCheck className="text-primary-600 w-6 h-6" />,
    title: "4 Full Length Tests",
    description:
      "Complete mock exams that simulate the actual IELTS test environment and scoring.",
  },
  {
    icon: <BookOpen className="text-primary-600 w-6 h-6" />,
    title: "16 Practice Tests",
    description:
      "Focused section-wise practice to master each component of the IELTS exam.",
  },
  {
    icon: <Headset className="text-primary-600 w-6 h-6" />,
    title: "2 Doubt Sessions",
    description:
      "One-on-one virtual sessions with IELTS experts to resolve your specific questions.",
  },
  {
    icon: <BookUser className="text-primary-600 w-6 h-6" />,
    title: "E-Library Access",
    description:
      "Comprehensive resource library with study materials, tips, and strategies.",
  },
];

const benefits = [
  {
    title: "Flexible Learning Schedule",
    description:
      "Study at your own pace, any time of day or night, fitting IELTS prep around your busy schedule.",
  },
  {
    title: "Comprehensive Coverage",
    description:
      "Master all four IELTS modules: Reading, Writing, Listening, and Speaking with targeted practice.",
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor your improvement with detailed performance analytics after each practice test.",
  },
  {
    title: "Expert Guidance",
    description:
      "Get personalized advice during doubt sessions with instructors who know the exam inside out.",
  },
  {
    title: "Latest Exam Patterns",
    description:
      "Stay current with up-to-date materials reflecting the most recent IELTS exam patterns.",
  },
];

const packageIncludes = [
  "4 Full Length Tests",
  "16 Practice Tests",
  "2 Doubt Sessions",
  "Complete E-Library Access",
  "Performance Analytics",
  "Mobile & Desktop Access",
  "Downloadable Resources",
  "24/7 Technical Support",
];

const PackagePageOne = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);
  const [wasManuallyClosed, setWasManuallyClosed] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Package details
  const packageDetails = {
    title: "Self-Study Success: Academic IELTS",
    duration: "6 Months",
    originalPrice: 999,
    discountedPrice: 49,
    promoCode: "STUDYSMART49",
    discountPercentage: "95% OFF",
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const { days, hours, minutes, seconds } = prev;

        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        if (minutes > 0) return { ...prev, minutes: minutes - 1, seconds: 59 };
        if (hours > 0)
          return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 };
        if (days > 0)
          return {
            ...prev,
            days: days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };

        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Coupon visibility effect
  useEffect(() => {
    const manuallyClosed =
      sessionStorage.getItem("couponManuallyClosed") === "true";
    setWasManuallyClosed(manuallyClosed);

    if (!manuallyClosed) {
      const handleScroll = () => {
        setShowCoupon(window.scrollY > 1000);
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  if (wasManuallyClosed) return null;

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-100 to-primary-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="lg:w-1/2 flex flex-col order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-4">
              <BadgeCheck className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-primary-700 bg-primary-50 px-3 py-1 rounded-full">
                Limited Time Offer
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight tracking-tight">
              {packageDetails.title} for Just{" "}
              <span className="text-primary-600">
                {" "}
                ₹{packageDetails.discountedPrice}
              </span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-neutral-600 max-w-2xl">
              {packageDetails.duration} Access -{" "}
              {packageDetails.discountPercentage} Today!
            </p>

            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-neutral-200 inline-block">
              <div className="flex items-baseline">
                <span className="text-neutral-500 line-through text-lg">
                  ₹{packageDetails.originalPrice}
                </span>
                <span className="ml-3 text-3xl font-bold text-primary-700">
                  ₹{packageDetails.discountedPrice}
                </span>
                <span className="ml-2 text-sm font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
                  {packageDetails.discountPercentage}
                </span>
              </div>
              <div className="text-sm text-neutral-500 mt-1">
                Offer ends soon
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => setIsModalOpen(true)}
              >
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center bg-white border border-neutral-200 rounded-lg px-4 py-3 shadow-sm">
                <span className="text-neutral-600 text-sm sm:text-base">
                  Use code:{" "}
                  <span className="font-mono font-bold bg-primary-50 text-primary-700 px-2 py-1 rounded">
                    {packageDetails.promoCode}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-sm text-neutral-600">
              {[
                `${packageDetails.duration} access`,
                "15+ practice tests",
                "Expert feedback",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2">
            <img src={bannerImg} alt="IELTS Success" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Complete Self-Study Package
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Everything you need to prepare for Academic IELTS success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Our Program
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our self-study package is designed to give you the edge in your
              IELTS preparation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center text-white">
                    <Check className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-primary-600 text-white text-center py-3">
              <p className="text-lg font-bold text-white mb-0">
                Special Practice Package Offer -{" "}
                {packageDetails.discountPercentage} Today!
              </p>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                  {packageDetails.title}
                </h2>
                <div className="flex items-center justify-center text-neutral-600 mb-4">
                  <Clock className="mr-2" />{" "}
                  <span>{packageDetails.duration} Access</span>
                </div>

                <CountdownTimer timeLeft={timeLeft} />

                <div className="flex items-center justify-center mt-6">
                  <div className="text-neutral-500 line-through text-2xl mr-3">
                    ₹{packageDetails.originalPrice}
                  </div>
                  <div className="text-4xl font-bold text-primary-700">
                    ₹{packageDetails.discountedPrice}
                  </div>
                </div>
              </div>

              <div className="border-t border-b border-neutral-200 py-6 mb-6">
                <h3 className="text-xl font-bold text-neutral-800 mb-4 text-center">
                  Package Includes:
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {packageIncludes.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="text-primary-600 w-4 h-4 mt-1 flex-shrink-0" />
                      <p className="ml-3 text-neutral-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 text-xl"
                  onClick={() => navigate("/login")}
                >
                  Get Started for Just ₹{packageDetails.discountedPrice}
                </button>
                <div className="mt-4 text-neutral-600">
                  Use Promo Code:{" "}
                  <span className="font-mono font-bold bg-primary-100 text-primary-700 px-3 py-1 rounded">
                    {packageDetails.promoCode}
                  </span>
                </div>
                <p className="mt-6 text-sm text-neutral-500">
                  Limited time offer. Regular price will resume soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Everything you need to know about our IELTS preparation package.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-neutral-200 overflow-hidden">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-neutral-200">
              <MessageSquare className="w-5 h-5 text-primary-600" />
              <p className="text-neutral-700 mb-0">
                Still have questions?{" "}
                <a
                  href="talk-to-us"
                  className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Coupon */}
      {showCoupon && (
        <FloatingCoupon
          promoCode={packageDetails.promoCode}
          originalPrice={packageDetails.originalPrice}
          discountedPrice={packageDetails.discountedPrice}
        />
      )}

      {/* Contact Form Modal */}
      {isModalOpen && (
        <ContactForm
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default PackagePageOne;
