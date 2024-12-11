import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import fullBanner from "../../img/herobanner/FView.png";
import mobileBanner from "../../img/herobanner/MView.jpeg";

const Banner = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [screenType, setScreenType] = useState("desktop");

  const handleCategory = (category) => {
    navigate("/courses", { state: { category } });
  };

  useEffect(() => {
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
          setCategory(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    })();

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
          <source media="(max-width: 1024px)" srcSet={mobileBanner} />
          <img
            src={fullBanner}
            alt="IELTS Examination"
            className="w-full h-auto object-cover"
          />
        </picture>
        {screenType === "desktop" && (
          <div className="absolute inset-0 flex items-center">
            <div className="text-left px-4 sm:px-8 md:px-16 lg:px-24">
              <h1 className="text-4xl font-bold leading-tight text-white">
                Achieve your dream of overseas <br />
                Education with StudyStreak.
              </h1>
              <p className="text-orange-400 text-lg mt-4">
                Focused courses to develop your potential to score high.
              </p>
              <div className="flex gap-4 mt-6">
                {category?.map(({ name }, index) => (
                  <button
                    key={index}
                    onClick={() => handleCategory(name)}
                    className="bg-orange-400 hover:bg-orange-600 font-bold text-white px-6 py-2 rounded-xl shadow-soft hover:shadow-hover transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;
