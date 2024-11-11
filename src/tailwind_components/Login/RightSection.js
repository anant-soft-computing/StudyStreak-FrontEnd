import React from "react";

// Shared right side component
const RightSection = () => (
  <div className="hidden lg:flex flex-1 bg-primary-600 p-8 items-center justify-center">
    <div className="max-w-lg text-center text-white">
      <h2 className="text-3xl font-bold mb-4">
        Start Your Journey With StudyStreak
      </h2>
      <p className="text-primary-100 text-lg mb-4">
        Join thousands of students who have achieved their target scores with
        our innovative learning techniques.
      </p>
      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          ["45k+", "Active Students"],
          ["95%", "Success Rate"],
          ["4.9/5", "Student Rating"],
        ].map(([number, label], index) => (
          <div key={index}>
            <div className="text-3xl font-bold mb-2">{number}</div>
            <div className="text-primary-200 text-sm">{label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default RightSection;
