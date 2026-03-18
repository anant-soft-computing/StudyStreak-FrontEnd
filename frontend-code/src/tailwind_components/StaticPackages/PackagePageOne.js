import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ClipboardCheck,
  Headset,
  BookUser,
  Check,
  MessageSquare,
  BadgeInfo,
  Newspaper,
} from "lucide-react";
import Faqs from "./components/Faqs";
import Faculty from "./components/Faculty";
import Benefits from "./components/Benefits";
import ajaxCall from "../../helpers/ajaxCall";
import ContactForm from "./components/ContactForm";
import Testimonials from "../Testimonial/Testimonial";
import FloatingCoupon from "./components/FloatingCoupon";
import bannerImg from "../../img/herobanner/selfStudyMode.png";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-soft p-6 hover:shadow-card-hover transition-shadow duration-300 h-full">
    <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
    <p className="text-neutral-600">{description}</p>
  </div>
);

const PackagePageOne = () => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageDetails, setPackageDetails] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/package/noauth/31/",
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
          setPackageDetails(response.data);
        } else if (
          (response?.status === 400 || response?.status === 404) &&
          response.isError
        ) {
          setPackageDetails({});
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const features = [
    packageDetails?.full_length_test && {
      icon: <ClipboardCheck className="text-primary-600 w-6 h-6" />,
      title: `${packageDetails?.full_length_test_count} Full Length Tests`,
      description:
        "Complete full length tests that simulate the actual IELTS test environment and scoring.",
    },
    packageDetails?.practice_test && {
      icon: <BookOpen className="text-primary-600 w-6 h-6" />,
      title: `${packageDetails?.practice_test_count} Practice Tests`,
      description:
        "Reading, Listening, Writing, and Speaking Tests with Band Score estimates",
    },
    packageDetails?.group_doubt_solving && {
      icon: <Headset className="text-primary-600 w-6 h-6" />,
      title: `${packageDetails?.group_doubt_solving_count} Doubt Sessions`,
      description:
        "One-on-one virtual sessions with IELTS experts to resolve your specific questions.",
    },
    {
      icon: <Newspaper className="text-primary-600 w-6 h-6" />,
      title: "Free Unlimited Mock Tests",
      description:
        "Access to unlimited mock tests to practice and improve your scores.",
    },
    {
      icon: <BookUser className="text-primary-600 w-6 h-6" />,
      title: "E-Library Access",
      description:
        "Comprehensive resource library with study materials, tips, and strategies.",
    },
    {
      icon: <BadgeInfo className="text-primary-600 w-6 h-6" />,
      title: "Ideal For",
      description:
        "Repeat test-takers, Self-paced learners, Budget-conscious aspirants",
    },
  ].filter(Boolean);

  const packageIncludes = [
    packageDetails?.full_length_test &&
      `${packageDetails?.full_length_test_count} Full Length Tests`,
    packageDetails?.practice_test &&
      `${packageDetails?.practice_test_count} Practice Tests`,
    packageDetails?.group_doubt_solving &&
      `${packageDetails?.group_doubt_solving_count} Doubt Sessions`,
    "Complete E-Library Access",
    "Performance Analytics",
    "Mobile & Desktop Access",
    "Downloadable Resources",
    "24/7 Technical Support",
  ].filter(Boolean);

  useEffect(() => {
    const handleScroll = () => {
      setShowCoupon(window.scrollY > 1000);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="overflow-hidden">
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
              {packageDetails?.package_name} for Just{" "}
              <span className="text-primary-600">
                ₹
                {packageDetails?.package_price &&
                packageDetails?.coupon_code?.discount
                  ? packageDetails?.package_price -
                    packageDetails?.coupon_code?.discount
                  : packageDetails?.package_price}
              </span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-neutral-900 max-w-2xl">
              {packageDetails?.duration} Months Access -{" "}
              {packageDetails?.package_price &&
              packageDetails?.coupon_code?.discount
                ? Math.round(
                    (packageDetails?.coupon_code?.discount /
                      packageDetails?.package_price) *
                      100
                  )
                : 0}
              % OFF Today!
            </p>

            <p className="text-neutral-900">
              A fully-equipped exam simulator at just ₹49. Ideal for those who
              already know the IELTS structure and want to self-assess with
              high-quality material.
            </p>
            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-neutral-200 inline-block">
              <div className="flex items-baseline">
                <span className="text-neutral-500 line-through text-lg">
                  ₹{packageDetails?.package_price}
                </span>
                <span className="ml-3 text-3xl font-bold text-primary-700">
                  ₹
                  {packageDetails?.package_price &&
                  packageDetails?.coupon_code?.discount
                    ? packageDetails?.package_price -
                      packageDetails?.coupon_code?.discount
                    : packageDetails?.package_price}
                </span>
                {packageDetails?.coupon_code?.discount && (
                  <span className="ml-2 text-sm font-medium text-white bg-red-500 px-2 py-0.5 rounded-full">
                    {Math.round(
                      (packageDetails?.coupon_code?.discount /
                        packageDetails?.package_price) *
                        100
                    )}
                    % OFF
                  </span>
                )}
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
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-neutral-600">
              {[
                `${packageDetails?.duration} months access`,
                `${packageDetails?.practice_test_count}+ practice tests`,
                "Expert feedback",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                  <span className="text-primary-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2">
            <img src={bannerImg} alt="IELTS Success" />
          </div>
        </div>
      </div>
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Complete Self-Study Package
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Everything you need to prepare for{" "}
              {packageDetails?.select_course?.Course_Title} success.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      <Faculty />
      <Benefits />
      <Testimonials />
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-primary-600 text-white text-center py-3">
              <p className="text-lg font-bold text-white mb-0">
                Special Practice Package Offer -{" "}
                {packageDetails?.package_price &&
                packageDetails?.coupon_code?.discount
                  ? Math.round(
                      (packageDetails?.coupon_code?.discount /
                        packageDetails?.package_price) *
                        100
                    )
                  : 0}
                % Today!
              </p>
            </div>
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                  {packageDetails?.package_name}
                </h2>
              </div>
              <div className="border-t border-b border-neutral-200 py-6 mb-6">
                <h3 className="text-xl font-bold text-neutral-800 mb-4 text-center">
                  Package Includes
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
                  onClick={() => setIsModalOpen(true)}
                >
                  Get Started for Just ₹
                  {packageDetails?.package_price &&
                  packageDetails?.coupon_code?.discount
                    ? packageDetails?.package_price -
                      packageDetails?.coupon_code?.discount
                    : packageDetails?.package_price}
                </button>
                <p className="mt-6 text-sm text-neutral-500">
                  Limited time offer. Regular price will resume soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Everything you need to know about our{" "}
              {packageDetails?.PackageType?.name} preparation package.
            </p>
          </div>
          <Faqs />
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
      {showCoupon && (
        <FloatingCoupon
          originalPrice={packageDetails?.package_price}
          discountedPrice={
            packageDetails?.package_price &&
            packageDetails?.coupon_code?.discount
              ? packageDetails?.package_price -
                packageDetails?.coupon_code?.discount
              : packageDetails?.package_price
          }
          setIsModalOpen={setIsModalOpen}
        />
      )}
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
