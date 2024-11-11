import React, { useState, useEffect } from "react";
import { Search, Clock, ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BlogsPage = () => {
  const navigate = useNavigate();
  const blogId = 1;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Sample categories
  const categories = [
    "All",
    "IELTS",
    "TOEFL",
    "GRE",
    "GMAT",
    "Study Abroad",
    "Test Preparation",
    "Student Life",
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Master IELTS Writing Task 2: A Comprehensive Guide",
      excerpt:
        "Learn the essential strategies and techniques to excel in IELTS Writing Task 2. This comprehensive guide covers everything from understanding the question types to structuring your essay effectively.",
      author: "Dr. Emma Watson",
      category: "IELTS",
      readTime: "8 min read",
      date: "2024-03-25",
      image:
        "https://www.shutterstock.com/image-photo/blogging-blog-word-coder-coding-260nw-520314613.jpg",
      tags: ["IELTS Writing", "Study Tips", "Essay Writing"],
    },
    {
      id: 2,
      title: "GRE vs GMAT: Which Test Should You Take?",
      excerpt:
        "A detailed comparison of GRE and GMAT to help you choose the right test for your graduate school journey. Understand the key differences, scoring systems, and university preferences.",
      author: "Prof. Robert Chen",
      category: "Test Preparation",
      readTime: "12 min read",
      date: "2024-03-22",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6zs5Noz8Xlz1aWOkwIZDKT1OHyD5wz31jvg&s",
      tags: ["GRE", "GMAT", "Graduate School"],
    },
    {
      id: 3,
      title: "5 Essential TOEFL Speaking Strategies",
      excerpt:
        "Improve your TOEFL Speaking score with these proven strategies. Learn how to manage your time effectively and deliver confident, structured responses.",
      author: "Sarah Johnson",
      category: "TOEFL",
      readTime: "6 min read",
      date: "2024-03-20",
      image:
        "https://img.freepik.com/free-photo/online-blog_53876-123696.jpg?semt=ais_hybrid",
      tags: ["TOEFL Speaking", "English Practice", "Test Tips"],
    },
    {
      id: 3,
      title: "5 Essential TOEFL Speaking Strategies",
      excerpt:
        "Improve your TOEFL Speaking score with these proven strategies. Learn how to manage your time effectively and deliver confident, structured responses.",
      author: "Sarah Johnson",
      category: "TOEFL",
      readTime: "6 min read",
      date: "2024-03-20",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqSqXhi28x5BbE898u8Wo4O-bM_TYaQ9KoXtJiYAujDrVE1QhydqEKB1BQSLM4vpRfAAU&usqp=CAU",
      tags: ["TOEFL Speaking", "English Practice", "Test Tips"],
    },
  ];

  useEffect(() => {
    const filtered = blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredPosts(filtered);
  }, [searchTerm, selectedCategory]);

  const handleBlogs = () => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
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

      {/* Category Filter */}
      <div className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center py-4 overflow-x-auto hide-scrollbar">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 transition-all 
                  duration-300 ${
                    selectedCategory === category
                      ? "bg-primary-600 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-primary-50"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-200 
                shadow-card hover:shadow-card-hover transition-all duration-300 
                transform hover:-translate-y-1"
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className="bg-primary-600 text-white px-3 py-1 rounded-full 
                    text-sm font-medium"
                  >
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <h2
                  className="text-xl font-bold text-neutral-800 mb-3 line-clamp-2 
                  hover:text-primary-600 transition-colors"
                >
                  {post.title}
                </h2>
                <p className="text-neutral-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-neutral-100 text-neutral-600 px-2 py-1 
                        rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta Information */}
                <div
                  className="flex items-center justify-between pt-4 
                  border-t border-neutral-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-neutral-500 text-sm">
                      <User size={16} className="mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center text-neutral-500 text-sm">
                      <Clock size={16} className="mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <button
                    className="text-primary-600 hover:text-primary-700 
                    flex items-center gap-1 text-sm font-medium"
                    onClick={handleBlogs}
                  >
                    Read More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16">
          <div
            className="bg-gradient-to-br from-primary-500 to-primary-700 
            rounded-2xl p-8 relative overflow-hidden"
          >
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
