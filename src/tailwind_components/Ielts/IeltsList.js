import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../components/UI/Loading";

const IeltsList = () => {
  const [courseList, setCouresList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/courselistview/?Category__name=IELTS",
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
          setCouresList(
            response.data?.filter(({ course_type }) => course_type === "PUBLIC")
          );
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const getGradientClass = (index) => {
    const gradients = [
      "bg-gradient-to-br from-primary-400 to-primary-600",
      "bg-gradient-to-br from-secondary-400 to-secondary-600",
      "bg-gradient-to-br from-accent-400 to-accent-600",
      "bg-gradient-to-br from-success-400 to-success-600",
    ];
    return gradients[index % gradients.length];
  };

  const formatDuration = (totalMinutes) => {
    if (!totalMinutes) return "Invalid Duration";

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    if (hours > 0) {
      return `${hours} Hrs, ${minutes} Minutes`;
    } else {
      return `${minutes} Minutes`;
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <section className="py-8 md:py-2">
      <div className="container mx-auto px-4">
        {courseList && courseList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseList.map((course, index) => (
              <div
                key={course.id}
                className="group bg-white rounded-xl overflow-hidden border border-neutral-200 shadow-card hover:shadow-card-hover hover:border-primary-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`h-48 relative overflow-hidden ${getGradientClass(
                    index
                  )}`}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                  <img
                    src={course?.Course_Thumbnail}
                    alt={course?.Course_Title}
                    className="w-full h-full object-cover absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-3 text-neutral-800 group-hover:text-primary-600 transition-colors duration-300">
                    {course?.Course_Title}
                  </h3>
                  <div className="flex items-center text-sm text-neutral-600 mb-3">
                    <Clock size={16} className="mr-2" />
                    <span>{formatDuration(course?.total_duration)}</span>
                    <span className="mx-2">•</span>
                    <span>{course?.total_lesson} Lessons</span>
                  </div>

                  <div className="flex items-center mb-4 pt-3 border-t border-neutral-100">
                    <span className="text-sm text-neutral-600 ml-2">
                      Language: {course.Language?.name}
                    </span>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Link
                      to={`/course/${course.id}`}
                      className="block w-full text-center bg-primary-50 text-primary-600 py-2.5 rounded-xl hover:bg-primary-100 transition-colors duration-300 font-medium border border-primary-600"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-lg font-semibold text-red-600">
            No Courses Available !!
          </div>
        )}
      </div>
    </section>
  );
};

export default IeltsList;
