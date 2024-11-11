import React, { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "John Doe",
      exam: "IELTS",
      score: "8.5",
      quote:
        "StudyStreak's approach to IELTS prep is revolutionary. The instructors break down complex topics into easily digestible pieces.",
    },
    {
      name: "Jane Smith",
      exam: "GRE",
      score: "335",
      quote:
        "I was struggling with the Quantitative section, but StudyStreak's GRE course changed the game for me. Their practice questions were invaluable.",
    },
    {
      name: "Alex Johnson",
      exam: "GMAT",
      score: "760",
      quote:
        "The GMAT course at StudyStreak is intense but incredibly effective. The instructors don't just teach you the material, they teach you how to think.",
    },
    {
      name: "Emily Chen",
      exam: "TOEFL",
      score: "118",
      quote:
        "As a non-native English speaker, I was terrified of the TOEFL. StudyStreak's course not only prepared me for the exam but also improved my English skills.",
    },
    {
      name: "Mohammed Al-Fayed",
      exam: "PTE",
      score: "89",
      quote:
        "The PTE Academic course at StudyStreak is top-notch. The personalized feedback on speaking and writing tasks was particularly helpful.",
    },
    {
      name: "Sophia Rodriguez",
      exam: "IELTS",
      score: "8.0",
      quote:
        "StudyStreak made IELTS preparation a breeze. Their speaking practice sessions were particularly helpful.",
    },
    {
      name: "Raj Patel",
      exam: "GRE",
      score: "328",
      quote:
        "The GRE verbal section was my weakness, but StudyStreak's techniques for tackling reading comprehension were game-changers.",
    },
    {
      name: "Lisa Wang",
      exam: "GMAT",
      score: "740",
      quote:
        "StudyStreak's GMAT course is comprehensive and challenging. It pushed me to achieve a score I didn't think was possible.",
    },
  ];

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.offsetWidth;

    const animateScroll = () => {
      setScrollPosition((prevPosition) => {
        if (prevPosition >= scrollWidth - containerWidth) {
          return 0;
        }
        return prevPosition + 1;
      });
    };

    const scrollInterval = setInterval(animateScroll, 50); // Adjust speed here (larger number = slower scroll)

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <section className="bg-gradient-to-r from-purple-50 to-indigo-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-purple-800">
          What Our Students Say
        </h2>
        <div className="relative overflow-hidden" style={{ height: "300px" }}>
          <div
            ref={scrollRef}
            className="flex absolute left-0 top-0 transition-transform duration-1000 ease-linear"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="w-[calc(25%-16px)] flex-shrink-0 mx-2"
              >
                <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <img
                      src={`https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=`}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-500 mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-purple-600 text-sm">
                        {testimonial.exam} Score:{" "}
                        <span className="font-bold">{testimonial.score}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm italic flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex mt-4 justify-end">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-current"
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
