import React from "react";
import facultyImg from "../../../img/faculty/faculty.png";

const Faculty = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
          Meet Your Instructor
        </h2>
        <p className="text-xl text-neutral-600 mb-12">
          Learn from the best in the field with years of experience and proven
          success.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={facultyImg}
            alt="Faculty | Anand Shemrudkar"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-lg"
          />
          <div className="text-left md:text-left">
            <h3 className="text-2xl font-bold text-neutral-900">
              Anand Shemrudkar
            </h3>
            <p className="text-primary-500 font-semibold mb-2">
              Certified Coach - IDP | British Council | Skills for English
              (SELT) | ETS - TOEFL
            </p>
            <p className="text-neutral-600">
              Anand Shemrudkar has over 15+ years of experience in English
              language training, helping thousands of students excel in IELTS,
              PTE, and TOEFL.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faculty;
