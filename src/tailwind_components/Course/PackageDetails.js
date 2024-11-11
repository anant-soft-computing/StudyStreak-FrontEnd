import { CheckCircle } from "lucide-react";
import React, { useState } from "react";

const PackageDetails = ({ courseType, courseId, packages, courseName }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-8">
        Choose Your Package
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`group bg-white rounded-3xl p-8 transition-all duration-300 relative
            ${
              selectedPackage === index
                ? "border-2 border-primary-600 shadow-elevated scale-[1.02]"
                : "border border-neutral-200 shadow-card hover:shadow-card-hover hover:scale-[1.01]"
            }`}
          >
            {/* Package Header */}
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-neutral-800">
                    {pkg.package_name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-primary-700">
                      ₹{pkg.package_price}
                    </span>
                    <span className="text-sm text-neutral-600">/package</span>
                  </div>
                </div>
                {selectedPackage === index && (
                  <div className="bg-primary-100 p-2 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-primary-700" />
                  </div>
                )}
              </div>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                {pkg.live_classes_membership && (
                  <div className="inline-flex items-center gap-1.5 bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                    Live Classes Available
                  </div>
                )}
                {pkg.practice_test && (
                  <div className="inline-flex items-center gap-1.5 bg-info-100 text-info-700 px-3 py-1 rounded-full text-sm font-medium">
                    <CheckCircle size={14} />
                    Free Practice Test
                  </div>
                )}
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-6 mb-8">
              {[
                {
                  label: "Counselling",
                  count: pkg.counselling_count,
                  enabled: pkg.counselling,
                },
                {
                  label: "Group Doubt Solving",
                  count: pkg.group_doubt_solving_count,
                  enabled: pkg.group_doubt_solving,
                },
                {
                  label: "One-to-One Doubt Solving",
                  count: pkg.one_to_one_doubt_solving_count,
                  enabled: pkg.one_to_one_doubt_solving,
                },
                {
                  label: "Practice Test",
                  count: pkg.practice_test_count,
                  enabled: pkg.practice_test,
                },
                {
                  label: "Writing Evaluation",
                  count: pkg.writing_evaluation_count,
                  enabled: pkg.writing_evaluation,
                },
                {
                  label: "Speaking Practice",
                  count: pkg.speaking_practice_count,
                  enabled: pkg.speaking_practice,
                },
                {
                  label: "Webinar",
                  count: pkg.webinar_count,
                  enabled: pkg.webinar,
                },
                {
                  label: "Tutor Support",
                  count: pkg.tutor_support_count,
                  enabled: pkg.tutor_support,
                },
              ].map(
                (feature, i) =>
                  feature.enabled && (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`p-1 rounded-full ${
                          selectedPackage === index
                            ? "bg-primary-200 text-primary-700"
                            : "bg-neutral-200 text-neutral-700"
                        }`}
                      >
                        <CheckCircle size={16} className="text-current" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-neutral-800 font-medium">
                            {feature.label}
                          </span>
                          <span
                            className={`font-semibold ${
                              selectedPackage === index
                                ? "text-primary-700"
                                : "text-neutral-700"
                            }`}
                          >
                            {feature.count}
                          </span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              selectedPackage === index
                                ? "bg-primary-600"
                                : "bg-neutral-400"
                            }`}
                            style={{
                              width: `${Math.max(
                                (parseInt(feature.count) / 10) * 100,
                                10
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={() => setSelectedPackage(index)}
              className={`w-full py-4 rounded-xl font-semibold transition-all duration-300
              ${
                selectedPackage === index
                  ? "bg-primary-600 text-white hover:bg-primary-700 shadow-soft"
                  : "bg-primary-100 text-primary-700 hover:bg-primary-200"
              } transform hover:-translate-y-0.5`}
            >
              {selectedPackage === index
                ? "Selected Package"
                : "Select Package"}
            </button>

            {/* Popular Badge */}
            {pkg.package_name === "IELTS Gold" && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageDetails;
