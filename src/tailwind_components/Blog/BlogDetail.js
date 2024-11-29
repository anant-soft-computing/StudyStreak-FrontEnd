import React, { useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Clock, User } from "lucide-react";
import ajaxCall from "../../helpers/ajaxCall";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/blog-list/${slug}/`,
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
          setBlog(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [slug]);

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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-8 mb-12">
          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-primary-600 mb-4">
              <span className="font-medium">{blog?.category}</span>
            </div>
            <h1 className="text-4xl font-bold text-neutral-800 mb-6">
              {blog?.title}
            </h1>
            <div className="flex items-center justify-between space-x-6 text-neutral-600">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-neutral-500" />
                </div>
                <p className="font-medium text-neutral-800">{blog?.author}</p>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-sm">
                  {moment(blog?.published_at).format("lll")}
                </span>
              </div>
            </div>
          </header>

          <div className="rounded-2xl overflow-hidden mb-4">
            <img
              src={blog?.featured_image}
              alt={blog?.title}
              className="w-full h-[300px] object-cover"
            />
          </div>

          <article className="prose max-w-none mb-4">
            <div
              className="bg-neutral-50 p-6 rounded-xl my-8"
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            />
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogDetails;
