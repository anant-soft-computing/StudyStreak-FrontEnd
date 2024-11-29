import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, CheckCircle, Clock, LibraryBig } from "lucide-react";
import BatchSelection from "./BatchSelection";

const PackageDetails = ({ courseId, packages, courseName, courseType }) => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnroll = (packageId, packageName, packagePrice) => {
    if (courseType === "TAUGHT") {
      setIsModalOpen(true);
      setSelectedPackage(packageId);
      setPackageName(packageName);
      setPackagePrice(packagePrice);
    } else {
      navigate("/checkout", {
        state: {
          courseId,
          packageId,
          courseName,
          packageName,
          packagePrice,
          courseType,
        },
      });
    }
  };

  const onClose = () => {
    setSelectedPackage("");
    setIsModalOpen(false);
  };

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
              selectedPackage === pkg?.package_id
                ? "border-2 border-primary-600 shadow-elevated scale-[1.02]"
                : "border border-neutral-200 shadow-card hover:shadow-card-hover hover:scale-[1.01]"
            }`}
          >
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
                {selectedPackage === pkg?.package_id && (
                  <div className="bg-primary-100 p-2 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-primary-700" />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {pkg.duration && (
                  <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Clock size={14} />
                    Validity : {pkg.duration} Months
                  </div>
                )}
                {courseType === "TAUGHT" && (
                  <div className="inline-flex items-center gap-1.5 bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                    Live Classes Available
                  </div>
                )}
                <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  <BookOpen size={14} />
                  Interactive Lessons
                </div>
                <div className="inline-flex items-center gap-1.5 bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium">
                  <LibraryBig size={14} />
                  E-Librarary
                </div>
                {pkg.practice_test && (
                  <div className="inline-flex items-center gap-1.5 bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-medium">
                    <CheckCircle size={14} />
                    Free Practice Test
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6 mb-8">
              {[
                {
                  label: "Counselling",
                  count:
                    pkg.counselling_count !== -1 ? pkg.counselling_count : null,
                  enabled: pkg.counselling,
                },
                {
                  label: "Group Doubt Solving",
                  count:
                    pkg.group_doubt_solving_count !== -1
                      ? pkg.group_doubt_solving_count
                      : null,
                  enabled: pkg.group_doubt_solving,
                },
                {
                  label: "One-to-One Doubt Solving",
                  count:
                    pkg.one_to_one_doubt_solving_count !== -1
                      ? pkg.one_to_one_doubt_solving_count
                      : null,
                  enabled: pkg.one_to_one_doubt_solving,
                },
                {
                  label: "Practice Test",
                  count:
                    pkg.practice_test_count !== -1
                      ? pkg.practice_test_count
                      : null,
                  enabled: pkg.practice_test,
                },
                {
                  label: "Writing Evaluation",
                  count:
                    pkg.writing_evaluation_count !== -1
                      ? pkg.writing_evaluation_count
                      : null,
                  enabled: pkg.writing_evaluation,
                },
                {
                  label: "Speaking Practice",
                  count:
                    pkg.speaking_practice_count !== -1
                      ? pkg.speaking_practice_count
                      : null,
                  enabled: pkg.speaking_practice,
                },
                {
                  label: "Webinar",
                  count: pkg.webinar_count !== -1 ? pkg.webinar_count : null,
                  enabled: pkg.webinar,
                },
                {
                  label: "Tutor Support",
                  count:
                    pkg.tutor_support_count !== -1
                      ? pkg.tutor_support_count
                      : null,
                  enabled: pkg.tutor_support,
                },
              ].map(
                (feature, i) =>
                  feature.enabled && (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`p-1 rounded-full ${
                          selectedPackage === pkg?.package_id
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
                              selectedPackage === pkg?.package_id
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
                              selectedPackage === pkg?.package_id
                                ? "bg-primary-600"
                                : "bg-neutral-400"
                            }`}
                            style={{
                              width: `${Math.min(
                                (parseInt(feature.count) / 10) * 100,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>

            <button
              onClick={() => {
                handleEnroll(
                  pkg?.package_id,
                  pkg?.package_name,
                  pkg?.package_price
                );
              }}
              className={`w-full py-4 rounded-xl font-semibold transition-all duration-300
              ${
                selectedPackage === pkg?.package_id
                  ? "bg-primary-600 text-white hover:bg-primary-700 shadow-soft"
                  : "bg-primary-100 text-primary-700 hover:bg-primary-200"
              } transform hover:-translate-y-0.5`}
            >
              {selectedPackage === pkg?.package_id
                ? "Selected Package"
                : "Buy Package"}
            </button>

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
      <BatchSelection
        open={isModalOpen}
        onClose={onClose}
        courseId={courseId}
        courseName={courseName}
        courseType={courseType}
        packageName={packageName}
        packagePrice={packagePrice}
        packageId={selectedPackage}
      />
    </div>
  );
};

export default PackageDetails;
