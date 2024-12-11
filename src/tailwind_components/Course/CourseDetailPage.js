import React, { useState, useEffect } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  Users,
  Globe,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import ajaxCall from "../../helpers/ajaxCall";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import PackageDetails from "./PackageDetails";
import CourseBanner from "./CourseBanner";

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { checkAuth } = useCheckAuth();

  const [batchData, setBatchData] = useState([]);
  const [openSection, setOpenSection] = useState("");
  const [courseDetail, setCourseDetail] = useState();
  const [coursePackages, setCoursePackages] = useState();

  const [requirements, setRequirements] = useState([]);
  const [openRequirements, setOpenRequirements] = useState(false);

  const [outcomes, setOutcomes] = useState([]);
  const [openOutcomes, setOpenOutcomes] = useState(false);

  const authData = useSelector((state) => state.authStore);

  const packageIds = coursePackages?.packages?.map((item) => item?.package_id);

  const batches = batchData.filter((batch) =>
    packageIds?.includes(batch?.add_package?.id)
  );

  const handleOpenRequirement = (requirement) => {
    setRequirements(requirement);
    setOpenRequirements(true);
  };

  const handleOpenOutcome = (outcome) => {
    setOutcomes(outcome);
    setOpenOutcomes(true);
  };

  useEffect(() => {
    checkAuth();
  }, [authData, checkAuth]);

  useEffect(() => {
    (async () => {
      if (!courseId || isNaN(courseId)) {
        toast.error("Please select a valid course");
        navigate("/");
        return;
      }
      try {
        const response = await ajaxCall(
          `/courseretupddel/${courseId}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "PATCH",
          },
          8000
        );
        if (response.status === 200) {
          const section = [];
          response.data?.lessons?.forEach((lesson) => {
            const isSessionExist = section.find(
              (item) => item.id === lesson?.section.id
            );
            if (!isSessionExist) {
              section.push(lesson?.section);
            }
          });
          const updatedData = {
            ...response.data,
            section,
          };
          section.forEach((sectionItem) => {
            const lessons = response.data?.lessons?.filter(
              (lesson) => lesson?.section.id === sectionItem.id
            );
            sectionItem.lessons = lessons;
          });
          setCourseDetail(updatedData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [courseId, navigate]);

  useEffect(() => {
    (async () => {
      if (!courseId || isNaN(courseId)) {
        toast.error("Please select a valid course");
        navigate("/");
        return;
      }
      try {
        const response = await ajaxCall(
          `/course/${courseId}/packages/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setCoursePackages(response.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [courseId, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/batchview/",
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
          setBatchData(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <>
      <div className="bg-neutral-50 min-h-screen relative">
        <CourseBanner courseDetail={courseDetail} />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-card border border-neutral-200 p-8 mb-12">
            <div className="flex flex-wrap items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-neutral-800">
                Course Details
              </h2>
              <div>
                {courseDetail?.Requirements.length > 0 && (
                  <button
                    type="button"
                    className="bg-primary-600 text-white mr-2 px-4 py-2 rounded-xl hover:bg-primary-700 transition-all duration-300"
                    onClick={() =>
                      handleOpenRequirement(courseDetail?.Requirements)
                    }
                  >
                    Requirements
                  </button>
                )}
                {courseDetail?.Outcome.length > 0 && (
                  <button
                    type="button"
                    className="bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-all duration-300"
                    onClick={() => handleOpenOutcome(courseDetail?.Outcome)}
                  >
                    Outcomes
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-50 p-3 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Instructor</p>
                    <p className="text-neutral-800 font-medium">
                      {courseDetail?.primary_instructor?.username}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary-50 p-3 rounded-xl">
                    <BookOpen className="w-6 h-6 text-secondary-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">
                      Course Level
                    </p>
                    <p className="text-neutral-800 font-medium">
                      {courseDetail?.Level?.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-accent-50 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-accent-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">
                      {" "}
                      Batch Time :{" "}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {batches.map(
                        ({ batch_start_timing, batch_end_timing }) => (
                          <span className="bg-accent-50 text-accent-600 px-3 py-1 rounded-lg text-sm">
                            {moment(batch_start_timing, "HH:mm:ss").format(
                              "hh:mm A"
                            )}{" "}
                            -{" "}
                            {moment(batch_end_timing, "HH:mm:ss").format(
                              "hh:mm A"
                            )}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-success-50 p-3 rounded-xl">
                    <Calendar className="w-6 h-6 text-success-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Duration</p>
                    <p className="text-neutral-800 font-medium">
                      {courseDetail?.course_identifier}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-warning-50 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-warning-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Batch</p>
                    {batches?.map(({ batch_name }) => {
                      return (
                        <p className="text-neutral-800 font-medium">
                          {batch_name}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-error-50 p-3 rounded-xl">
                    <Globe className="w-6 h-6 text-error-500" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Language</p>
                    <p className="text-neutral-800 font-medium">
                      {courseDetail?.Language?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {coursePackages?.packages?.length >= 1 ? (
            <PackageDetails
              courseId={courseId}
              packages={coursePackages?.packages}
              courseName={courseDetail?.Course_Title}
              courseType={courseDetail?.course_delivery}
            />
          ) : (
            <div>
              <h5 className="text-danger sp_20 col--30">
                No Packages Available For This Course !!
              </h5>
            </div>
          )}

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-neutral-800 mb-8">
              Course Curriculum
            </h2>
            <div className="bg-white rounded-2xl shadow-card border border-neutral-200 overflow-hidden">
              {courseDetail?.section?.length > 0 ? (
                courseDetail.section
                  .sort((a, b) => {
                    const nameA = a?.name?.toLowerCase();
                    const nameB = b?.name?.toLowerCase();
                    if (nameA < nameB) return -1;
                    if (nameA > nameB) return 1;
                    return 0;
                  })
                  .map((sectionItem, index) => (
                    <div
                      key={index}
                      className="border-b border-neutral-200 last:border-b-0"
                    >
                      <button
                        className="flex justify-between items-center w-full p-6 hover:bg-primary-50 
                            transition-colors duration-300 text-left"
                        onClick={() =>
                          setOpenSection(
                            openSection === sectionItem.name
                              ? null
                              : sectionItem.name
                          )
                        }
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-lg mr-4 flex items-center justify-center
                        ${
                          openSection === sectionItem.name
                            ? "bg-primary-100 text-primary-600"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                          >
                            {index + 1}
                          </div>
                          <span className="font-medium text-neutral-800">
                            {sectionItem.name}
                          </span>
                        </div>
                        {openSection === sectionItem.name ? (
                          <ChevronUp
                            className={`w-5 h-5 transform transition-transform duration-300 
                        ${
                          openSection === sectionItem.name
                            ? "text-primary-600"
                            : "text-neutral-400"
                        }`}
                          />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-neutral-400" />
                        )}
                      </button>
                      {openSection === sectionItem.name && (
                        <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200">
                          <ul className="space-y-3">
                            {sectionItem.lessons
                              ?.sort((a, b) => {
                                const lessonA = parseInt(
                                  a?.Lesson_Title.match(/\d+/)?.[0]
                                );
                                const lessonB = parseInt(
                                  b?.Lesson_Title.match(/\d+/)?.[0]
                                );
                                return lessonA - lessonB;
                              })
                              .map((lessonItem, i) => (
                                <li
                                  key={i}
                                  className="flex items-center justify-between text-neutral-600"
                                >
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-primary-300 mr-3"></div>
                                    <span>{lessonItem.Lesson_Title}</span>
                                  </div>
                                  <span className="text-neutral-400">
                                    <svg
                                      className="w-4 h-4"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m0 0v2m0-2h2m-2 0H8"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z"
                                      />
                                    </svg>
                                  </span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div className="p-6 text-center text-neutral-600">
                  No Curriculum Available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {openRequirements && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-elevated">
            <h2 className="text-2xl font-semibold mb-6">Requirements</h2>
            <form>
              <ul className="space-y-3 mb-6">
                {requirements?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-neutral-600 text-base"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-500 mr-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item?.description}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpenRequirements(false);
                    setRequirements([]);
                  }}
                  className="px-6 py-2 bg-neutral-300 hover:bg-neutral-400 rounded-full font-medium transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {openOutcomes && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-elevated">
            <h2 className="text-2xl font-semibold mb-6">Outcomes</h2>
            <form>
              <ul className="space-y-3 mb-6">
                {outcomes?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-neutral-600 text-base"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-500 mr-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item?.description}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpenOutcomes(false);
                    setOutcomes([]);
                  }}
                  className="px-6 py-2 bg-neutral-300 hover:bg-neutral-400 rounded-full font-medium transition-colors duration-300"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetailPage;
