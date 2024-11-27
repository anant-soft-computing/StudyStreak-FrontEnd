import React, { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";
import ajaxCall from "../../helpers/ajaxCall";

const TestimonialSection = () => {
  const scrollRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/testimonial/",
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
          setTestimonials(response?.data);
        } else {
          console.error("Error");
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    })();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth / 2;

    const animateScroll = () => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 1;
        if (newPosition >= scrollWidth) {
          return 0;
        }
        return newPosition;
      });
    };

    const scrollInterval = setInterval(animateScroll, 50);
    return () => clearInterval(scrollInterval);
  }, [testimonials]);

  return (
    <section className="bg-neutral-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-neutral-800 mb-12 text-center">
          What Our Students Say
        </h2>
        <div className="relative overflow-hidden rounded-2xl">
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
                    {testimonial?.image ? (
                      <div
                        className="w-12 h-12 rounded-full bg-primary-100 flex items-center 
                  justify-center text-primary-600 font-bold text-lg mr-4"
                      >
                        <img
                          className="w-full h-full object-cover rounded-full"
                          src={testimonial?.image}
                          alt={testimonial.name}
                        />
                      </div>
                    ) : (
                      <div
                        className="w-12 h-12 rounded-full bg-primary-100 flex items-center 
                  justify-center text-primary-600 font-bold text-lg mr-4"
                      >
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-lg text-neutral-800">
                        {testimonial.name}
                      </h4>
                    </div>
                  </div>
                  <p className="text-neutral-600 text-sm flex-grow">
                    {testimonial.description}
                  </p>
                  <div className="flex mt-4 justify-end">
                    {[1, 2, 3, 4, 5].map((_, i) => (
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
      </div>
    </section>
  );
};

export default TestimonialSection;
