import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import liveClass from "../../../../img/icon/liveClass.svg";
import assignment from "../../../../img/icon/assignment.svg";
import bookSpeakingSlot from "../../../../img/icon/assignment.svg";
import practice from "../../../../img/icon/practiceTest.svg";
import fullLengthTest from "../../../../img/icon/notebook.svg";
import regularClass from "../../../../img/icon/liveClass.svg";
import counselling from "../../../../img/icon/users.svg";
import progress from "../../../../img/icon/progress.svg";
import webinar from "../../../../img/icon/webinar.svg";
import support from "../../../../img/icon/support.svg";
import recordedClasses from "../../../../img/icon/gamification.svg";
import diagnosticTest from "../../../../img/icon/diagnosticTest.svg";
import Loading from "../../../UI/Loading";
import UpcomingLiveClasses from "./UpcomingLiveClasses/UpcomingLiveClasses";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import SpeakingSlots from "./SpeakingSlots/SpeakingSlots";
import ajaxCall from "../../../../helpers/ajaxCall";
import ScoreCard from "./ScoreCard/ScoreCard";
import DSSidebar from "../DSSideBar/DSSideBar";
import UnPaidDashboard from "../UnPaidDashboard/UnPaidDashboard";
import NextLesson from "./NextLesson/NextLesson";
import UpcomingRegularLiveClass from "./UpcomingRegularLiveClass/UpCommingRegularLiveClass";

const Dashboard = () => {
  const [count, setCount] = useState({
    count: 0,
    practice_test_count: 0,
    full_length_test_count: 0,
  });
  const [lesson, setLesson] = useState([]);
  const [studentID, setStudentID] = useState(0);
  const [batchData, setBatchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [studentCourses, setStudentCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  const batchIds = JSON?.parse(localStorage.getItem("BatchIds"));
  const userData = JSON?.parse(localStorage.getItem("loginInfo"));

  const cardList =
    selectedCourse === "IELTS"
      ? [
          {
            name: "Speaking Slot",
            icon: bookSpeakingSlot,
            link: "/studentLiveClasses",
            state: { activeTab: "Speaking Practice" },
          },
          {
            name: "Practice Test",
            icon: practice,
            link: "/practiceTest",
            state: { count: count?.practice_test_count },
          },
          {
            name: "Full Length Test",
            icon: fullLengthTest,
            link: "/fullLengthTest",
            state: { count: count?.full_length_test_count },
          },
          {
            name: "Counselling",
            icon: counselling,
            link: "/studentLiveClasses",
            state: { activeTab: "Counselling" },
          },
          {
            name: "Regular Classes",
            icon: regularClass,
            link: "/studentLiveClasses",
          },
          {
            name: "Tutor Support",
            icon: counselling,
            link: "/studentLiveClasses",
            state: { activeTab: "Tutor Support" },
          },
          {
            name: "Webinar",
            icon: webinar,
            link: "/studentLiveClasses",
            state: { activeTab: "Webinar" },
          },
          { name: "Progress", icon: progress, link: "/progress" },
          { name: "Resources", icon: support, link: "/resources" },
        ]
      : [
          {
            name: "Mini Test",
            icon: assignment,
            link: "/mockTest",
          },
          {
            name: "Practice Test",
            icon: practice,
            link: "/practiceTest",
            state: { count: count?.practice_test_count },
          },
          {
            name: "Regular Classes",
            icon: regularClass,
            link: "/studentLiveClasses",
          },
          {
            name: "Counselling",
            icon: counselling,
            link: "/studentLiveClasses",
            state: { activeTab: "Counselling" },
          },
          {
            name: "Webinar",
            icon: webinar,
            link: "/studentLiveClasses",
            state: { activeTab: "Webinar" },
          },
          {
            name: "Tutor Support",
            icon: counselling,
            link: "/studentLiveClasses",
            state: { activeTab: "Tutor Support" },
          },
          {
            name: "Group Doubt Solving",
            icon: liveClass,
            link: "/studentLiveClasses",
            state: { activeTab: "Group Doubt" },
          },
          { name: "Progress", icon: progress, link: "/progress" },
          { name: "Resources", icon: support, link: "/resources" },
        ];

  const studentBatch = batchData?.filter((item) =>
    batchIds?.includes(item?.id)
  );

  const handleCourseCategory = (category) => {
    setSelectedCourse(category);
    localStorage.setItem("category", category);
  };

  const fetchData = async (url, dataes) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        dataes(response?.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchData("/batchview/", setBatchData),
        fetchData("/userwisepackagewithcourseid/", (data) => {
          const givenPTCount = data?.student[0]?.student_pt;
          const givenFLTCount = data?.student[0]?.student_flt;
          const totalPracticeTests = data?.package.reduce(
            (sum, pkg) => sum + pkg.practice_test_count,
            0
          );

          const totalFullLengthTests = data?.package.reduce(
            (sum, pkg) => sum + pkg.full_length_test_count,
            0
          );
          setCount({
            count: data?.count,
            practice_test_count: totalPracticeTests - givenPTCount,
            full_length_test_count: totalFullLengthTests - givenFLTCount,
          });
          setStudentID(data?.student[0]?.student_id);
        }),
      ]);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await ajaxCall(
          "/get-student-course/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );

        if (response.status === 200) {
          const courseData = response?.data || [];
          const courses = [
            ...new Set(courseData.map((item) => item.course_category)),
          ];

          setLesson(
            courseData
              .filter((lesson) => lesson.course_category === selectedCourse)
              .filter(
                (lesson, index, self) =>
                  self.findIndex((l) => l.course_id === lesson.course_id) ===
                  index
              )
          );

          setStudentCourses(courses);
          handleCourseSelection(courses);
        } else {
          console.error("Error fetching courses");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const handleCourseSelection = (courses) => {
      const savedCourse = localStorage.getItem("category");
      if (!savedCourse && courses.length > 0) {
        const defaultCourse = courses[0];
        setSelectedCourse(defaultCourse);
        localStorage.setItem("category", defaultCourse);
      } else if (savedCourse) {
        setSelectedCourse(savedCourse);
      }
    };

    fetchStudentCourses();
  }, [selectedCourse]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {count?.count !== 0 ? (
        <div className="body__wrapper">
          <div className="main_wrapper overflow-hidden">
            <div className="dashboardarea sp_bottom_100">
              <div className="dashboard">
                <div className="container-fluid full__width__padding">
                  <div className="row">
                    <DSSidebar />
                    <div className="col-xl-8 col-lg-8">
                      <div className="blog__details__content__wraper">
                        <div className="course__details__heading">
                          <h3>Welcome, {userData?.username}</h3>
                        </div>
                        {selectedCourse === "IELTS" &&
                          studentBatch?.length > 0 && (
                            <h5>
                              Batch :{" "}
                              {studentBatch?.map((batch) => (
                                <span key={batch.id}>
                                  {batch.batch_name} :{" "}
                                  {moment(
                                    batch.batch_start_timing,
                                    "HH:mm:ss"
                                  ).format("hh:mm A")}{" "}
                                  |{" "}
                                </span>
                              ))}
                            </h5>
                          )}
                        <div className="online__course__wrap mt-0">
                          <div className="row instructor__slider__active row__custom__class">
                            <ScoreCard course={selectedCourse} />
                          </div>
                        </div>
                        <div className="online__course__wrap mt-0">
                          <div className="row instructor__slider__active row__custom__class">
                            <div className="col-xl-6 column__custom__class">
                              <div className="gridarea__wraper card-background">
                                <div className="gridarea__content">
                                  <div className="gridarea__content p-2 m-2">
                                    <Link
                                      to="/diagnosticTest"
                                      className="text-decoration-none"
                                    >
                                      <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                                        <img
                                          src={diagnosticTest}
                                          alt="Recorded Classes"
                                          height={35}
                                          width={35}
                                        />
                                        <h2 className="mt-2">
                                          {selectedCourse === "IELTS"
                                            ? "Diagnostic Test"
                                            : "English Diagnostic Test"}
                                        </h2>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {lesson?.length > 0 &&
                              lesson.map((item, index) => (
                                <div
                                  key={index}
                                  className="col-xl-6 column__custom__class"
                                >
                                  <div className="gridarea__wraper card-background">
                                    <div className="gridarea__content">
                                      <div className="gridarea__content p-2 m-2">
                                        <Link
                                          to={`/courseLessons/${item.course_id}`}
                                          className="text-decoration-none"
                                        >
                                          <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                                            <img
                                              src={recordedClasses}
                                              alt="Start Lesson"
                                              height={35}
                                              width={35}
                                            />
                                            <h2 className="mt-2">
                                              Start Lesson
                                            </h2>
                                          </div>
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                        <div className="row">
                          {cardList.map(
                            ({ name, icon, link, state }, index) => (
                              <div
                                key={index}
                                className="col-xl-4 column__custom__class"
                              >
                                <div className="gridarea__wraper text-center card-background">
                                  <div
                                    className="gridarea__content p-3 m-2"
                                    style={{
                                      cursor: link ? "pointer" : "default",
                                    }}
                                  >
                                    <Link
                                      to={link}
                                      className="text-decoration-none"
                                      state={state}
                                    >
                                      <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                                        <img
                                          src={icon}
                                          alt={name}
                                          height={35}
                                          width={35}
                                        />
                                        <h3 className="mt-2">{name}</h3>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                          <div className="col-xl-12 column__custom__class">
                            <div className="gridarea__wraper card-background">
                              <div className="gridarea__content">
                                <div className="gridarea__content p-2 m-2">
                                  <Link
                                    to="/recordedClasses"
                                    className="text-decoration-none"
                                  >
                                    <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                                      <img
                                        src={recordedClasses}
                                        alt="Recorded Classes"
                                        height={35}
                                        width={35}
                                      />
                                      <h2 className="mt-2">Recorded Classes</h2>
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-4">
                      <div className="dashboard__form__wraper mb-3">
                        <div className="dashboard__form__input">
                          <h5>Course</h5>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={selectedCourse}
                            onChange={(e) =>
                              handleCourseCategory(e.target.value)
                            }
                          >
                            {studentCourses?.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <LeaderBoard studentID={studentID} />
                      <UpcomingRegularLiveClass />
                      <NextLesson />
                      {selectedCourse === "IELTS" && <SpeakingSlots />}
                      <UpcomingLiveClasses />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <UnPaidDashboard />
      )}
    </>
  );
};

export default Dashboard;
