import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Loading from "../../../UI/Loading";
import ScoreCard from "./ScoreCard/ScoreCard";
import DSSidebar from "../DSSideBar/DSSideBar";
import NextLesson from "./NextLesson/NextLesson";
import ajaxCall from "../../../../helpers/ajaxCall";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import SpeakingSlots from "./SpeakingSlots/SpeakingSlots";
import UnPaidDashboard from "../UnPaidDashboard/UnPaidDashboard";
import UpcomingLiveClasses from "./UpcomingLiveClasses/UpcomingLiveClasses";
import UpcomingRegularLiveClass from "./UpcomingRegularLiveClass/UpCommingRegularLiveClass";
import {
  BookCheck,
  BookHeadphones,
  CassetteTape,
  ChartNoAxesColumnIncreasing,
  Film,
  Mic,
  NotepadTextDashed,
  PcCase,
  Pencil,
  Ribbon,
  Presentation,
  Proportions,
  Speaker,
  SquarePen,
  Users,
  Videotape,
} from "lucide-react";

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
  const [selectedCourse, setSelectedCourse] = useState({});

  const category = selectedCourse?.course_category;
  const batchIds = JSON?.parse(localStorage.getItem("BatchIds"));
  const userData = JSON?.parse(localStorage.getItem("loginInfo"));

  const cardList =
    category === "IELTS"
      ? [
          {
            name: "Speaking Slot",
            icon: <Speaker width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Speaking Practice" },
          },
          {
            name: "Practice Test",
            icon: <Pencil width={35} height={35} />,
            link: "/practiceTest",
            state: { count: count?.practice_test_count },
          },
          {
            name: "Full Length Test",
            icon: <PcCase width={35} height={35} />,
            link: "/fullLengthTest",
            state: { count: count?.full_length_test_count },
          },
          {
            name: "Counselling",
            icon: <Users width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Counselling" },
          },
          {
            name: "Regular Classes",
            icon: <Videotape width={35} height={35} />,
            link: "/studentLiveClasses",
          },
          {
            name: "Tutor Support",
            icon: <Users width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Tutor Support" },
          },
          {
            name: "Webinar",
            icon: <Film width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Webinar" },
          },
          {
            name: "Progress",
            icon: <ChartNoAxesColumnIncreasing width={35} height={35} />,
            link: "/progress",
          },
          {
            name: "Resources",
            icon: <Proportions width={35} height={35} />,
            link: "/resources",
          },
        ]
      : category === "PTE"
      ? [
          {
            name: "Speaking Slot",
            icon: <Speaker width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Speaking Practice" },
          },
          {
            name: "Free Mock Test",
            icon: <Ribbon width={35} height={35} />,
            link: "/PTE/FreeMockTest",
          },
          {
            name: "PTE Speaking",
            icon: <Mic width={35} height={35} />,
            link: "/PTE/Speaking/",
          },
          {
            name: "PTE Writing",
            icon: <SquarePen width={35} height={35} />,
            link: "/PTE/Writing/",
          },
          {
            name: "PTE Reading",
            icon: <PcCase width={35} height={35} />,
            link: "/PTE/Reading/",
          },
          {
            name: "PTE Listening",
            icon: <BookHeadphones width={35} height={35} />,
            link: "/PTE/Listening/",
          },
          {
            name: "Counselling",
            icon: <Users width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Counselling" },
          },
          {
            name: "Regular Classes",
            icon: <Videotape width={35} height={35} />,
            link: "/studentLiveClasses",
          },
          {
            name: "Tutor Support",
            icon: <Users width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Tutor Support" },
          },
          {
            name: "Webinar",
            icon: <Film width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Webinar" },
          },
          {
            name: "Progress",
            icon: <ChartNoAxesColumnIncreasing width={35} height={35} />,
            link: "/progress",
          },
          {
            name: "Resources",
            icon: <Proportions width={35} height={35} />,
            link: "/resources",
          },
        ]
      : [
          {
            name: "Mini Test",
            icon: <BookCheck width={35} height={35} />,
            link: "/mockTest",
          },
          {
            name: "Practice Test",
            icon: <Pencil width={35} height={35} />,
            link: "/practiceTest",
            state: { count: count?.practice_test_count },
          },
          {
            name: "Regular Classes",
            icon: <Videotape width={35} height={35} />,
            link: "/studentLiveClasses",
          },
          {
            name: "Counselling",
            icon: <Users width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Counselling" },
          },
          {
            name: "Webinar",
            icon: <Film width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Webinar" },
          },
          {
            name: "Tutor Support",
            icon: <Users width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Tutor Support" },
          },
          {
            name: "Group Doubt Solving",
            icon: <CassetteTape width={35} height={35} />,
            link: "/studentLiveClasses",
            state: { activeTab: "Group Doubt" },
          },
          {
            name: "Progress",
            icon: <ChartNoAxesColumnIncreasing width={35} height={35} />,
            link: "/progress",
          },
          {
            name: "Resources",
            icon: <Proportions width={35} height={35} />,
            link: "/resources",
          },
        ];

  const studentBatch = batchData?.filter((item) =>
    batchIds?.includes(item?.id)
  );

  const handleCourse = (course) => {
    setSelectedCourse(course);
    localStorage.setItem("course", JSON.stringify(course));
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
        fetchData("/student/course-enrollment/details/", (data) => {
          const givenPTCount = data?.student_details?.student_pt;
          const givenFLTCount = data?.student_details?.student_flt;
          const totalPracticeTests = data?.package_details?.reduce(
            (sum, pkg) => sum + pkg.practice_test_count,
            0
          );

          const totalFullLengthTests = data?.package_details?.reduce(
            (sum, pkg) => sum + pkg.full_length_test_count,
            0
          );
          setCount({
            count: data?.course_count,
            practice_test_count: totalPracticeTests - givenPTCount,
            full_length_test_count: totalFullLengthTests - givenFLTCount,
          });
          setStudentID(data?.student_details?.student_id);
        }),
      ]);
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchStudentCourses = async () => {
      setIsLoading(true);
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
          const courses_list = response?.data.map((item) => {
            return {
              course_id: item.course_id,
              package_id: item.package_id,
              course_category: item.course_category,
            };
          });
          setLesson(
            response?.data
              .filter((lesson) => lesson.course_category === category)
              .filter(
                (lesson, index, self) =>
                  self.findIndex((l) => l.course_id === lesson.course_id) ===
                  index
              )
          );
          setStudentCourses(courses_list);
          handleCourseSelection(courses_list);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    const handleCourseSelection = (courses) => {
      const savedCourse = JSON.parse(localStorage.getItem("course"));
      if (!savedCourse && courses.length > 0) {
        const defaultCourse = courses[0];
        setSelectedCourse(defaultCourse);
        localStorage.setItem("course", JSON.stringify(defaultCourse));
      } else {
        setSelectedCourse(savedCourse);
      }
    };

    fetchStudentCourses();
  }, [category]);

  if (isLoading) {
    return <Loading />;
  }

  return isLoading ? (
    <Loading />
  ) : count?.count !== 0 ? (
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
                    {(category === "IELTS" || category === "PTE") &&
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
                              |*|{" "}
                            </span>
                          ))}
                        </h5>
                      )}
                    {(category === "IELTS" || category === "GENERAL") && (
                      <div className="online__course__wrap mt-0">
                        <div className="row instructor__slider__active row__custom__class">
                          <ScoreCard course={category} />
                        </div>
                      </div>
                    )}
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
                                    <NotepadTextDashed
                                      width={35}
                                      height={35}
                                      color="black"
                                    />
                                    <h2 className="mt-2">
                                      {category === "IELTS" ||
                                      category === "PTE"
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
                                        <Presentation
                                          width={35}
                                          height={35}
                                          color="black"
                                        />
                                        <h2 className="mt-2">Start Lesson</h2>
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
                      {cardList.map(({ name, icon, link, state }, index) => (
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
                                state={state}
                                className="text-decoration-none"
                                style={{ color: "black" }}
                              >
                                <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                                  {icon}
                                  <h3>{name}</h3>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="col-xl-12 column__custom__class">
                        <div className="gridarea__wraper card-background">
                          <div className="gridarea__content">
                            <div className="gridarea__content p-2 m-2">
                              <Link
                                to="/recordedClasses"
                                className="text-decoration-none"
                              >
                                <div className="gridarea__heading d-flex justify-content-center align-items-center gap-4">
                                  <CassetteTape
                                    width={35}
                                    height={35}
                                    color="black"
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
                        aria-label="Select a course"
                        value={JSON.stringify(selectedCourse)}
                        onChange={(e) =>
                          handleCourse(JSON.parse(e.target.value))
                        }
                      >
                        {studentCourses?.map((item) => (
                          <option
                            key={item.course_id}
                            value={JSON.stringify(item)}
                          >
                            {item.course_category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <LeaderBoard studentID={studentID} />
                  <UpcomingRegularLiveClass />
                  <NextLesson />
                  {(category === "IELTS" || category === "PTE") && (
                    <SpeakingSlots />
                  )}
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
  );
};

export default Dashboard;
