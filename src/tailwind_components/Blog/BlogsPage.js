import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowRight,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../components/UI/Loading";

const BlogsPage = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

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

        if (response.status === 200) {
          setBlogs(
            response.data
              .filter((item) => item.status === "published")
              .sort(
                (a, b) => new Date(b.published_at) - new Date(a.published_at)
              )
          );
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const filtered = blogs?.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              StudyStreak Blog
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Stay updated with the latest tips, strategies, and news related to
              international exams and education.
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full py-3 pl-12 pr-4 rounded-xl text-neutral-800 
                  border-0 focus:ring-2 focus:ring-primary-300 bg-white/90 
                  backdrop-blur-lg"
              />
              <Search
                className="absolute left-4 top-3.5 text-neutral-400"
                size={20}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-4 overflow-x-auto hide-scrollbar">
            {category?.map(({ name }, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(name)}
                className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 transition-all 
                  duration-300 ${
                    selectedCategory === name
                      ? "bg-primary-600 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-primary-50"
                  }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {isLoading ? (
          <Loading />
        ) : currentBlogs?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-8">
            {currentBlogs?.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-200 
                shadow-card hover:shadow-card-hover transition-all duration-300 
                transform hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog?.featured_image}
                    alt={blog?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="bg-primary-600 text-white px-3 py-1 rounded-full 
                    text-sm font-medium"
                    >
                      {blog?.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2
                    className="text-xl font-bold text-neutral-800 mb-3 line-clamp-2 
                  hover:text-primary-600 transition-colors cursor-pointer"
                    onClick={() => navigate(`/blogs/${blog?.slug}`)}
                  >
                    {blog?.title}
                  </h2>
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {blog?.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-neutral-100 text-neutral-600 px-2 py-1 
                        rounded-lg text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    className="flex items-center justify-between pt-4 
                  border-t border-neutral-100"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-neutral-500 text-sm">
                        <User size={16} className="mr-1" />
                        <span>{blog?.author}</span>
                      </div>
                    </div>
                    <button
                      className="text-primary-600 hover:text-primary-700 
                    flex items-center gap-1 text-sm font-medium"
                      onClick={() => navigate(`/blogs/${blog?.slug}`)}
                    >
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 text-center border border-neutral-200 shadow-card text-neutral-800">
            No Blogs Available !!
          </div>
        )}

        {filteredBlogs.length > blogsPerPage && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-10 h-10 rounded-full ${
                    currentPage === index + 1
                      ? "bg-primary-600 text-white"
                      : "bg-white text-gray-600 hover:bg-primary-50"
                  } shadow-md`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-white shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        )}

        <div className="mt-8">
          <div
            className="bg-gradient-to-br from-primary-500 to-primary-700 
            rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Subscribe to Our Newsletter
                </h2>
                <p className="text-primary-100 mb-8">
                  Get the latest articles, study tips, and exam strategies
                  delivered right to your inbox.
                </p>

                <form className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 rounded-xl bg-white/10 
                      text-white placeholder-primary-200 border border-primary-400 
                      focus:border-white focus:ring-2 focus:ring-white/20
                      transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="bg-white text-primary-600 px-8 py-3 rounded-xl 
                      font-medium hover:bg-primary-50 transition-all duration-300 
                      shadow-elevated hover:shadow-hover transform 
                      hover:-translate-y-0.5"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogsPage;
