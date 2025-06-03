import { Check } from "lucide-react";
import React from "react";

const benefits = [
  {
    title: "Flexible Learning Schedule",
    description:
      "Study at your own pace, any time of day or night, fitting IELTS prep around your busy schedule.",
  },
  {
    title: "Comprehensive Coverage",
    description:
      "Master all four IELTS modules: Reading, Writing, Listening, and Speaking with targeted practice.",
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor your improvement with detailed performance analytics after each practice test.",
  },
  {
    title: "Expert Guidance",
    description:
      "Get personalized advice during doubt sessions with instructors who know the exam inside out.",
  },
  {
    title: "Latest Exam Patterns",
    description:
      "Stay current with up-to-date materials reflecting the most recent IELTS exam patterns.",
  },
];

const Benefits = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Why Choose Our Program
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our self-study package is designed to give you the edge in your
            IELTS preparation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center text-white">
                  <Check className="w-3 h-3" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-neutral-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
