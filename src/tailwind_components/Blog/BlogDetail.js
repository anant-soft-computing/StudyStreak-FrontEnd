import React from "react";
import { Clock, User } from "lucide-react";

const BlogDetails = () => {
  const blog = {
    title: "The Ultimate Guide to Modern Learning Techniques",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Study Tips",
    image:
      "https://www.shutterstock.com/image-photo/blogging-blog-word-coder-coding-260nw-520314613.jpg",
    content: `
      <p class="mb-6">
        Learning effectively in the digital age requires a combination of traditional techniques and modern approaches. In this comprehensive guide, we'll explore the most effective learning strategies that have been proven to enhance retention and understanding.
      </p>

      <h2 class="text-2xl font-bold mb-4 text-neutral-800">1. Active Recall</h2>
      <p class="mb-6">
        Active recall is one of the most effective learning techniques. Instead of passively reading your notes, actively test yourself on the material. This strengthens neural connections and improves long-term retention.
      </p>

      <h2 class="text-2xl font-bold mb-4 text-neutral-800">2. Spaced Repetition</h2>
      <p class="mb-6">
        Rather than cramming all your study into one session, space it out over time. This technique takes advantage of how our brains process and store information, leading to better long-term retention.
      </p>

      <blockquote class="border-l-4 border-primary-600 pl-4 my-8 italic text-neutral-700">
        "The key to learning isn't just about studying harder, but studying smarter. Understanding how your brain works can help you optimize your learning strategy."
      </blockquote>

      <h2 class="text-2xl font-bold mb-4 text-neutral-800">3. The Pomodoro Technique</h2>
      <p class="mb-6">
        Breaking your study sessions into focused 25-minute intervals, followed by short breaks, can help maintain high levels of concentration and prevent mental fatigue.
      </p>

      <h2 class="text-2xl font-bold mb-4 text-neutral-800">4. Mind Mapping</h2>
      <p class="mb-6">
        Visual organization of information can help you understand relationships between concepts and remember information more effectively. Mind mapping is a powerful tool for both note-taking and revision.
      </p>

      <div class="bg-neutral-50 p-6 rounded-xl my-8">
        <h3 class="text-xl font-bold mb-4 text-neutral-800">Key Takeaways:</h3>
        <ul class="list-disc list-inside space-y-2 text-neutral-700">
          <li>Implement active recall in your study routine</li>
          <li>Use spaced repetition to improve retention</li>
          <li>Break study sessions into focused intervals</li>
          <li>Organize information visually using mind maps</li>
          <li>Combine multiple techniques for best results</li>
        </ul>
      </div>`,
    tags: ["Learning", "Study Tips", "Education", "Productivity"],
    likes: 234,
    comments: 45,
  };

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
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-8 mb-12">
          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-primary-600 mb-4">
              <span className="font-medium">{blog.category}</span>
            </div>
            <h1 className="text-4xl font-bold text-neutral-800 mb-6">
              {blog.title}
            </h1>
            <div className="flex items-center space-x-6 text-neutral-600">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-neutral-500" />
                </div>
                <div>
                  <p className="font-medium text-neutral-800">{blog.author}</p>
                  <p className="text-sm">{blog.date}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-sm">{blog.readTime}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-4">
            <img
              src={blog.image}
              alt="Blog featured image"
              className="w-full h-[300px] object-cover"
            />
          </div>

          {/* Article Content */}
          <article className="prose max-w-none mb-4">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogDetails;
