import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  BarChart,
  Star,
  Calendar,
  ChevronDown,
  ChevronUp,
  Users,
  Globe,
  BookOpen,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import { useSelector } from "react-redux";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import PackageDetails from "./PackageDetails";

// Separate Testimonials Component
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
        "I was struggling with the Quantitative section, but StudyStreak's GRE course changed the game for me. Their practice questions were invaluable.",
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
              className="bg-white p-6 rounded-xl shadow-card hover:shadow-card-hover 
              transition-all duration-300 h-full flex flex-col"
            >
              <div className="flex items-center mb-4">
                <div
                  className="w-12 h-12 rounded-full bg-primary-100 flex items-center 
                  justify-center text-primary-600 font-bold text-lg mr-4"
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

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { checkAuth } = useCheckAuth();
  const authData = useSelector((state) => state.authStore);
  const [courseDetail, setCourseDetail] = useState();
  const [batchData, setBatchData] = useState([]);
  const [coursePackages, setCoursePackages] = useState();
  const [openSection, setOpenSection] = useState(
    "Section 1: Introduction to IELTS"
  );
  const packageIds = coursePackages?.packages?.map((item) => item?.package_id);
  console.log(courseDetail);
  const batches = batchData.filter((batch) =>
    packageIds?.includes(batch?.add_package?.id)
  );

  useEffect(() => {
    checkAuth();
  }, [authData, checkAuth]);

  useEffect(() => {
    (async () => {
      if (!courseId || isNaN(courseId)) {
        toast.error("Please select a valid course");
        navigate("/");
        return;
      }
      try {
        const response = await ajaxCall(
          `/courseretupddel/${courseId}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "PATCH",
          },
          8000
        );
        if (response.status === 200) {
          const section = [];
          response.data?.lessons?.forEach((lesson) => {
            const isSessionExist = section.find(
              (item) => item.id === lesson?.section.id
            );
            if (!isSessionExist) {
              section.push(lesson?.section);
            }
          });
          const updatedData = {
            ...response.data,
            section,
          };
          section.forEach((sectionItem) => {
            const lessons = response.data?.lessons?.filter(
              (lesson) => lesson?.section.id === sectionItem.id
            );
            sectionItem.lessons = lessons;
          });
          setCourseDetail(updatedData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [courseId, navigate]);

  useEffect(() => {
    (async () => {
      if (!courseId || isNaN(courseId)) {
        toast.error("Please select a valid course");
        navigate("/");
        return;
      }
      try {
        const response = await ajaxCall(
          `/course/${courseId}/packages/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setCoursePackages(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [courseId, navigate]);
  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/batchview/",
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
          setBatchData(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const relatedCourses = [
    {
      title: "GRE Comprehensive Prep",
      instructor: "Prof. Robert Chen",
      duration: "8 weeks",
      level: "Advanced",
      rating: 4.8,
      students: 10300,
      price: 249,
    },
    {
      title: "GMAT Intensive Program",
      instructor: "Sarah Johnson, MBA",
      duration: "10 weeks",
      level: "Intermediate",
      rating: 4.7,
      students: 9200,
      price: 299,
    },
    {
      title: "TOEFL iBT Success Course",
      instructor: "Michael Brown, PhD",
      duration: "6 weeks",
      level: "Beginner",
      rating: 4.9,
      students: 11400,
      price: 179,
    },
  ];

  const startDate = courseDetail?.EnrollmentStartDate
    ? moment(courseDetail?.EnrollmentStartDate).format("DD-MMM-YYYY")
    : "";

  const endDate = courseDetail?.EnrollmentEndDate
    ? moment(courseDetail?.EnrollmentEndDate).format("DD-MMM-YYYY")
    : "";

  return (
    <div className="bg-neutral-50 min-h-screen relative">
      {/* Course Banner */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${courseDetail?.Course_Thumbnail})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-primary-900/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div
                className="text-primary-100 mb-4 inline-flex items-center 
                bg-primary-800/30 rounded-full px-4 py-1"
              >
                {courseDetail?.Category?.name}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {courseDetail?.Course_Title}
              </h1>
              <p className="text-primary-100 text-lg mb-8 max-w-2xl">
                <div
                  dangerouslySetInnerHTML={{
                    __html: courseDetail?.Short_Description,
                  }}
                ></div>
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center text-white">
                  <Users size={20} className="mr-2" />
                  <span>
                    Max Enrollment : {courseDetail?.max_enrollments || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Course Information */}
        <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8">
            Course Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-50 p-3 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Instructor</p>
                  <p className="text-neutral-800 font-medium">
                    {courseDetail?.primary_instructor?.username}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-secondary-50 p-3 rounded-xl">
                  <BookOpen className="w-6 h-6 text-secondary-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Course Level</p>
                  <p className="text-neutral-800 font-medium">
                    {courseDetail?.Level?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-accent-50 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-accent-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">
                    {" "}
                    Batch Start Time :{" "}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {batches.map(({ batch_start_timing }) => (
                      <span className="bg-accent-50 text-accent-600 px-3 py-1 rounded-lg text-sm">
                        {moment(batch_start_timing, "HH:mm:ss").format(
                          "hh:mm A"
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-success-50 p-3 rounded-xl">
                  <Calendar className="w-6 h-6 text-success-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Duration</p>
                  <p className="text-neutral-800 font-medium">
                    {startDate} - {endDate}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-warning-50 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-warning-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Batch Type</p>
                  {batches?.map(({ batch_name }) => {
                    return (
                      <p className="text-neutral-800 font-medium">
                        {batch_name}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-error-50 p-3 rounded-xl">
                  <Globe className="w-6 h-6 text-error-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Language</p>
                  <p className="text-neutral-800 font-medium">
                    {courseDetail?.Language?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Packages */}
        {coursePackages?.packages?.length >= 1 ? (
          <PackageDetails
            packages={coursePackages?.packages}
            courseId={courseId}
            courseName={courseDetail?.Course_Title}
            courseType={courseDetail?.course_delivery}
          />
        ) : (
          <div>
            <h5 className="text-danger sp_20 col--30">
              No Packages Available For This Course !!
            </h5>
          </div>
        )}

        {/* Curriculum Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8">
            Course Curriculum
          </h2>
          <div className="bg-white rounded-2xl shadow-card border border-neutral-200 overflow-hidden">
            {courseDetail?.section?.length > 0 ? (
              courseDetail.section
                .sort((a, b) => {
                  const nameA = a?.name?.toLowerCase();
                  const nameB = b?.name?.toLowerCase();
                  if (nameA < nameB) return -1;
                  if (nameA > nameB) return 1;
                  return 0;
                })
                .map((sectionItem, index) => (
                  <div
                    key={index}
                    className="border-b border-neutral-200 last:border-b-0"
                  >
                    <button
                      className="flex justify-between items-center w-full p-6 hover:bg-primary-50 
                            transition-colors duration-300 text-left"
                      onClick={() =>
                        setOpenSection(
                          openSection === sectionItem.name
                            ? null
                            : sectionItem.name
                        )
                      }
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-lg mr-4 flex items-center justify-center
                        ${
                          openSection === sectionItem.name
                            ? "bg-primary-100 text-primary-600"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                        >
                          {index + 1}
                        </div>
                        <span className="font-medium text-neutral-800">
                          {sectionItem.name}
                        </span>
                      </div>
                      {openSection === sectionItem.name ? (
                        <ChevronUp
                          className={`w-5 h-5 transform transition-transform duration-300 
                        ${
                          openSection === sectionItem.name
                            ? "text-primary-600"
                            : "text-neutral-400"
                        }`}
                        />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-400" />
                      )}
                    </button>
                    {openSection === sectionItem.name && (
                      <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200">
                        <ul className="space-y-3">
                          {sectionItem.lessons
                            ?.sort((a, b) => {
                              const lessonA = parseInt(
                                a?.Lesson_Title.match(/\d+/)?.[0]
                              );
                              const lessonB = parseInt(
                                b?.Lesson_Title.match(/\d+/)?.[0]
                              );
                              return lessonA - lessonB;
                            })
                            .map((lessonItem, i) => (
                              <li
                                key={i}
                                className="flex items-center justify-between text-neutral-600"
                              >
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full bg-primary-300 mr-3"></div>
                                  <span>{lessonItem.Lesson_Title}</span>
                                </div>
                                <span className="text-neutral-400">
                                  <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 15v2m0 0v2m0-2h2m-2 0H8"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
            ) : (
              <div className="p-6 text-center text-neutral-600">
                No curriculum available
              </div>
            )}
          </div>
        </div>

        {/* Related Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8">
            Related Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((course, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden border border-neutral-200
                shadow-card hover:shadow-card-hover transition-all duration-300
                transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <h3
                    className="text-xl font-bold text-neutral-800 mb-3 group-hover:text-primary-600 
                    transition-colors duration-300"
                  >
                    {course.title}
                  </h3>
                  <p className="text-primary-600 mb-4">{course.instructor}</p>

                  <div className="flex items-center text-sm text-neutral-600 mb-4">
                    <div className="flex items-center mr-4">
                      <Clock size={16} className="mr-2" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart size={16} className="mr-2" />
                      <span>{course.level}</span>
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(course.rating)
                              ? "text-warning-400 fill-current"
                              : "text-neutral-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-neutral-700">
                      {course.rating}
                    </span>
                    <span className="text-sm text-neutral-500 ml-2">
                      ({course.students.toLocaleString()} students)
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                    <span className="text-2xl font-bold text-primary-600">
                      ${course.price}
                    </span>
                    <button
                      className="bg-primary-50 text-primary-600 px-4 py-2 rounded-xl
                      hover:bg-primary-100 transition-colors duration-300 font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12 bg-neutral-100 py-12 -mx-4 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8 text-center">
              What Our Students Say
            </h2>
            <div className="relative overflow-hidden rounded-2xl">
              <TestimonialCarousel />
            </div>
          </div>
        </div>

        {/* Webinar Registration */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Register for Free Webinar
                </h2>
                <p className="text-primary-100 mb-8">
                  Join our free webinar to learn more about IELTS preparation
                  strategies and tips.
                </p>

                <form className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="flex-grow px-4 py-3 rounded-xl bg-white/10 text-white placeholder-primary-200
                    border border-primary-400 focus:border-white focus:ring-2 focus:ring-white/20
                    transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="flex-grow px-4 py-3 rounded-xl bg-white/10 text-white placeholder-primary-200
                    border border-primary-400 focus:border-white focus:ring-2 focus:ring-white/20
                    transition-all duration-300"
                  />
                  <button
                    className="bg-white text-primary-600 px-8 py-3 rounded-xl font-medium
                    hover:bg-primary-50 transition-all duration-300 shadow-elevated hover:shadow-hover
                    transform hover:-translate-y-0.5"
                  >
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
