import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";

const CourseBanner = ({ courseDetail }) => {
  const [screenType, setScreenType] = useState("desktop");

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setScreenType("mobile");
      } else if (width <= 1024) {
        setScreenType("tablet");
      } else {
        setScreenType("desktop");
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className="relative w-full">
      <div className="relative w-full overflow-hidden">
        <picture>
          <source
            media="(max-width: 1024px)"
            srcSet={courseDetail?.Course_Thumbnail}
          />
          <img
            src={courseDetail?.course_banner}
            alt={courseDetail?.Course_Title}
            className="w-full h-auto object-cover"
          />
        </picture>
        {screenType === "desktop" && (
          <div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-primary-900/50"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl">
                  <div className="text-primary-800 mb-4 inline-flex items-center bg-white rounded-full px-4 py-1">
                    {courseDetail?.Category?.name}
                  </div>
                  <h1 className="font-bold text-white mb-6 text-5xl">
                    {courseDetail?.Course_Title}
                  </h1>
                  <p className="text-primary-100 mb-8 max-w-2xl text-lg">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: courseDetail?.Short_Description,
                      }}
                    ></div>
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center text-white">
                      <Users size={20} className="mr-2" />
                      <span className="text-base">
                        Max Enrollment : {courseDetail?.max_enrollments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseBanner;
