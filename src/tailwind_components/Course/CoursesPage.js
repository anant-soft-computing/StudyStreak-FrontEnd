import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { Search, Clock, Calendar, ArrowRight } from "lucide-react";
import CourseList from "./CourseList";
import TestimonialSection from "../Testimonial/TestimonialSection";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../components/UI/Loading";

const CoursesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [blogs, setBlogs] = useState([]);
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

  const handleOpen = ({ name, link }) => {
    setSelectWebinar({ name, link });
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
      console.error("Error submitting survey:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssessmentClick = () => {
    navigate("/english-test");
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/categoryview/",
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
          setCategory([{ id: 0, name: "All" }, ...response.data]);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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

        if (response?.status === 200) {
          const now = moment();
          const data = response?.data
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

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/blog-list/",
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
          setBlogs(
            response?.data
              .filter((item) => item.status === "published")
              .sort(
                (a, b) => new Date(b.published_at) - new Date(a.published_at)
              )
              .slice(0, 3)
          );
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

        <div className="sticky top-0 bg-white border-b border-neutral-200 shadow-soft">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                {category?.map(({ name }, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedCategory(name === "All" ? " " : name)
                    }
                    className={`px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300
                    ${
                      selectedCategory === name
                        ? "bg-primary-500 text-white shadow-soft transform -translate-y-0.5"
                        : "bg-neutral-100 text-primary-600 hover:bg-primary-50 hover:-translate-y-0.5"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <main className="py-8">
          <CourseList
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
          />

          <section className="container mx-auto px-4 mt-8 mb-8">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">
              Upcoming Webinars
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loading />
              </div>
            ) : webinars?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {webinars?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover 
          transition-all duration-300 border border-neutral-200 
          hover:border-primary-200 transform hover:-translate-y-1"
                  >
                    <h3 className="text-lg font-bold text-neutral-800 mb-3">
                      {item?.meeting_title}
                    </h3>
                    <p className="text-primary-600 mb-4">
                      <span className="font-medium">Description :</span>{" "}
                      {item?.meeting_description}
                    </p>
                    <div className="flex items-center text-sm text-neutral-600 mb-6 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {moment(item?.start_time).format("L")} -{" "}
                        {moment(item?.end_time).format("L")}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        {moment(item?.start_time).format("LTS")} -{" "}
                        {moment(item?.end_time).format("LTS")}
                      </div>
                    </div>
                    <button
                      className="w-full bg-primary-600 text-white py-2.5 rounded-xl 
            hover:bg-primary-700 transition-colors duration-300"
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
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 text-center border border-neutral-200 shadow-card text-neutral-800">
                No Upcoming Webinars At The Moment. Please Check Back Later.
              </div>
            )}
          </section>

          <TestimonialSection />

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
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <Loading />
              </div>
            ) : blogs?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover 
                  transition-all duration-300 border border-neutral-200 hover:border-primary-200"
                  >
                    <div className="p-6">
                      <h3
                        className="text-lg font-bold text-neutral-800 mb-3 cursor-pointer"
                        onClick={() => navigate(`/blogs/${item?.slug}`)}
                      >
                        {item?.title}
                      </h3>
                      <p className="text-neutral-600 mb-6">
                        {item?.excerpt.length > 100
                          ? `${item?.excerpt.substring(0, 100)}...`
                          : item?.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-sm text-neutral-500">
                        <span>{item?.author}</span>
                        <span>{moment(item?.published_at).format("lll")}</span>
                      </div>
                    </div>
                    <div className="bg-primary-600 p-4 hover:bg-primary-700 transition-colors duration-300">
                      <div
                        className="text-white flex items-center justify-center gap-2 cursor-pointer"
                        onClick={() => navigate(`/blogs/${item?.slug}`)}
                      >
                        Read More <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 text-center border border-neutral-200 shadow-card text-neutral-800">
                No Blogs Available !!
              </div>
            )}
          </section>
        </main>
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

export default CoursesPage;
