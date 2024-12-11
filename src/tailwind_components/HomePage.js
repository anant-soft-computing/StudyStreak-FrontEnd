import React, { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  BookOpen,
  Target,
  GraduationCap,
  Mic2Icon,
  Laptop2Icon,
  PenBoxIcon,
} from "lucide-react";
import Banner from "./Banner/Banner";
import ajaxCall from "../helpers/ajaxCall";
import Packages from "./Packages/Packages";
import CourseList from "./Course/CourseList";
import TestimonialSection from "./Testimonial/TestimonialSection";
import Loading from "../components/UI/Loading";

const features = [
  {
    title: "All Major Test Preparations",
    description: "IELTS, GRE, GMAT, TOEFL, PTE",
    icon: BookOpen,
    iconBgColor: "bg-primary-50",
    iconColor: "text-primary-500",
  },
  {
    title: "Expert Instructor",
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

const HomePage = () => {
  const navigate = useNavigate();
  const [webinars, setWebinars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectWebinar, setSelectWebinar] = useState({
    name: "",
    link: "",
    start_time: "",
    end_time: "",
  });
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  const handleOpen = (webinarName) => {
    setSelectWebinar(webinarName);
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("webinarName", selectWebinar.name);
    data.append(
      "startDate",
      moment(selectWebinar.start_time).format("YYYY-MM-DD")
    );
    data.append("startTime", moment(selectWebinar.start_time).format("HH:mm"));
    data.append("endDate", moment(selectWebinar.end_time).format("YYYY-MM-DD"));
    data.append("endTime", moment(selectWebinar.end_time).format("HH:mm"));

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzHwV-ilWm2xjasK9NGPKanyt_fHBW5eY3UPJoMUP244MKXHyOkkgHoJJT5cLYbP7-4/exec",
        {
          method: "POST",
          body: data,
          muteHttpExceptions: true,
        }
      );
      if (response.ok) {
        setFormData({ name: "", email: "", phone: "" });
        toast.success("Form submitted successfully.");
        setOpen(false);
        window.open(selectWebinar.link, "_blank");
      } else {
        toast.error("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlestartJourney = () => {
    navigate("/login");
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/liveclass-webinar/",
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
          const now = moment();
          const data = response.data
            .filter((item) => moment(item.end_time).isAfter(now))
            .map((item) => ({
              ...item,
              meeting_title: item.meeting_title.replace(/Introduction\s?/i, ""),
            }))
            .sort((a, b) => moment(a.start_time).diff(moment(b.start_time)));
          setWebinars(data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="bg-neutral-50 min-h-screen">
        <Banner />
        <section className="py-8 md:py-8 bg-neutral-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-xl p-4 border border-neutral-200 shadow-card
                hover:shadow-card-hover hover:border-primary-200 transition-all duration-300
                transform hover:-translate-y-1"
                  >
                    <div className="flex items-start space-x-6">
                      <div
                        className={`${feature.iconBgColor} rounded-xl 
                    group-hover:scale-110 transition-all duration-300 mt-3`}
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
                        <p className="text-small text-neutral-700">
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

        <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have achieved their dream scores
              with StudyStreak.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-primary-600 px-8 py-3 rounded-xl hover:bg-primary-50
            transition-all duration-300 font-semibold shadow-elevated hover:shadow-hover
            transform hover:-translate-y-0.5 mt-3"
            >
              Free Mini Test
            </button>
            <button
              onClick={() => navigate("/english-test")}
              className="bg-white text-primary-600 px-8 py-3 rounded-xl hover:bg-primary-50
            transition-all duration-300 font-semibold shadow-elevated hover:shadow-hover
            transform hover:-translate-y-0.5 ml-2 mt-3"
            >
              Free English Test
            </button>
          </div>
        </section>

        <CourseList />

        <TestimonialSection />

        <Packages />

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

            {isLoading ? (
              <Loading />
            ) : webinars?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {webinars?.map((item) => {
                  return (
                    <div
                      key={item.id}
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
                          {item.meeting_title}
                        </h3>
                        <p className="text-neutral-600 mb-4">
                          <span className="font-medium">Description :</span>{" "}
                          {item.meeting_description}
                        </p>
                        <div className="flex items-center text-sm text-neutral-600 mb-3">
                          <Calendar size={16} className="mr-2" />
                          <span>
                            {moment(item.start_time).format("L")} -{" "}
                            {moment(item.end_time).format("L")}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-neutral-600 mb-3">
                          <Clock size={16} className="mr-2" />
                          <span>
                            {moment(item.start_time).format("LTS")} -{" "}
                            {moment(item.end_time).format("LTS")}
                          </span>
                        </div>
                        <button
                          className="w-full bg-primary-600 text-white py-3 rounded-xl
                    hover:bg-primary-700 transition-colors duration-300 font-medium
                    shadow-soft hover:shadow-hover transform hover:-translate-y-0.5"
                          onClick={() =>
                            handleOpen({
                              name: item?.meeting_title,
                              link: item?.join_url,
                              start_time: item?.start_time,
                              end_time: item?.end_time,
                            })
                          }
                        >
                          Join
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 text-center border border-neutral-200 shadow-card text-neutral-800">
                No Upcoming Webinars At The Moment. Please Check Back Later.
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have achieved their dream scores
              with StudyStreak.
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

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-elevated">
            <h2 className="text-2xl font-semibold mb-6">
              Join for {selectWebinar?.name}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-neutral-700 font-medium mb-2">
                  Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-neutral-700 font-medium mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-neutral-700 font-medium mb-2">
                  Phone
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 bg-neutral-300 hover:bg-neutral-400 rounded-full font-medium transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-colors duration-300"
                >
                  {isLoading ? "Submitting" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
