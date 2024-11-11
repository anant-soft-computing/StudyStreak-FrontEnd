import React, { useState } from "react";

const BandCalculator = () => {
  const [scores, setScores] = useState({
    listening: 6,
    reading: 6,
    writing: 6,
    speaking: 6,
  });

  const [overallBand, setOverallBand] = useState(6);

  const calculateOverallBand = (newScores) => {
    const total = Object.values(newScores).reduce(
      (sum, score) => sum + score,
      0
    );
    const average = total / 4;
    return Math.round(average * 2) / 2;
  };

  const handleScoreChange = (skill, value) => {
    const newScores = { ...scores, [skill]: value };
    setScores(newScores);
    setOverallBand(calculateOverallBand(newScores));
  };

  const getScoreColor = (value) => {
    if (value >= 8) return "text-success-500";
    if (value >= 7) return "text-primary-500";
    if (value >= 6) return "text-warning-500";
    return "text-error-500";
  };

  const getProgressWidth = (value) => {
    return ((value - 4) / 5) * 100; // 4 is min, 9 is max, so range is 5
  };

  return (
    <div className="p-8 animate-fade-in-up">
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-2xl font-bold text-neutral-800 mb-2 transform hover:scale-105 transition-transform duration-300">
          IELTS Band Score Calculator
        </h2>
        <p className="text-neutral-600">
          Move the sliders to calculate your overall band score
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(scores).map(([skill, value]) => (
          <div
            key={skill}
            className="space-y-3 bg-neutral-50 p-4 rounded-xl hover:bg-primary-50 
              transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-center">
              <label className="font-medium text-neutral-700 capitalize flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></div>
                {skill}
              </label>
              <span
                className={`${getScoreColor(value)} font-bold text-lg
                transition-all duration-300 transform hover:scale-110`}
              >
                {value.toFixed(1)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-400 to-primary-600 
                  rounded-full transition-all duration-300"
                style={{ width: `${getProgressWidth(value)}%` }}
              ></div>
            </div>

            <input
              type="range"
              min="4"
              max="9"
              step="0.5"
              value={value}
              onChange={(e) =>
                handleScoreChange(skill, parseFloat(e.target.value))
              }
              className="w-full h-2 bg-transparent appearance-none cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2
                range-thumb:bg-primary-600 range-thumb:rounded-full range-thumb:border-none
                range-thumb:w-4 range-thumb:h-4 range-thumb:hover:bg-primary-700
                range-thumb:transition-all range-thumb:duration-300"
            />

            <div className="flex justify-between text-xs text-neutral-500">
              <span className="font-medium">4.0</span>
              <div className="flex gap-1">
                {[4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9].map((mark) => (
                  <div
                    key={mark}
                    className={`w-px h-2 ${
                      value >= mark ? "bg-primary-300" : "bg-neutral-300"
                    } 
                      transition-colors duration-300`}
                  ></div>
                ))}
              </div>
              <span className="font-medium">9.0</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-neutral-200">
        <div className="text-center transform hover:scale-105 transition-transform duration-300">
          <p className="text-sm text-neutral-600 mb-2">
            Your Overall Band Score
          </p>
          <div
            className={`text-5xl font-bold ${getScoreColor(overallBand)} 
            animate-bounce-soft transition-all duration-300`}
          >
            {overallBand.toFixed(1)}
          </div>
          <div className="mt-4 text-sm text-neutral-500">
            {overallBand >= 8
              ? "🎉 Excellent Score!"
              : overallBand >= 7
              ? "👍 Good Score!"
              : overallBand >= 6
              ? "💪 Keep Improving!"
              : "📚 More Practice Needed"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandCalculator;
