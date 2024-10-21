import React, { useEffect, useState } from "react";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import PointHistory from "../PointHistory/PointHistory";
import LevelOfStudent from "./LevelOfStudent/LevelOfStudent";

const Progress = () => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [studentLessons, setStudentLessons] = useState([]);

  const completeLesson = lessons?.filter((item) =>
    studentLessons?.some((i) => i === item?.id)
  );

  const availableBadges = badges
    .filter((badge) => totalPoints >= badge.points_required)
    .sort((a, b) => a.points_required - b.points_required);

  const [studentExams, setStudentExams] = useState({
    miniTest: 0,
    practiceTest: 0,
    fullLengthTest: 0,
    assignments: 0,
    speakingPracticeClass: 0,
    groupDoubtSolvingClass: 0,
    oneToOneDoubtSolvingClass: 0,
    tutorSupport: 0,
    webinar: 0,
    counselling: 0,
  });

  const examList = [
    {
      name: "Assignments",
      count: studentExams?.assignments,
    },
    {
      name: "Mini Test",
      count: studentExams?.miniTest,
    },
    {
      name: "Practice Test",
      count: studentExams?.practiceTest,
    },
    {
      name: "Full Length Test",
      count: studentExams?.fullLengthTest,
    },
  ];

  const classList = [
    {
      name: "Speaking Practice",
      count: studentExams?.speakingPracticeClass,
    },
    {
      name: "Group Doubt Solving",
      count: studentExams?.groupDoubtSolvingClass,
    },
    {
      name: "One To One Doubt Solving",
      count: studentExams?.oneToOneDoubtSolvingClass,
    },
    { name: "Tutor Support", count: studentExams?.tutorSupport },
    { name: "Webinar", count: studentExams?.webinar },
    { name: "Counselling", count: studentExams?.counselling },
  ];

  const fetchTestData = async (url, setData) => {
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
      if (response.status === 200) {
        setData(response?.data);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchTestData("/gamification/badges/", setBadges);
  }, []);

  useEffect(() => {
    fetchTestData("/lesson-get/", setLessons);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/student-stats/`,
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
          setStudentLessons(response?.data?.student_lesson_list_of_id);
          setStudentExams({
            miniTest: [
              ...response?.data?.student_mock,
              ...response?.data?.student_speakingblock,
            ]?.length,
            practiceTest: response?.data?.student_pt?.length,
            fullLengthTest: response?.data?.student_flt?.length,
            assignments: response?.data?.student_assignment?.length,
            speakingPracticeClass:
              response?.data?.student_speaking_practice?.length,
            groupDoubtSolvingClass:
              response?.data?.student_group_doubt_solving?.length,
            oneToOneDoubtSolvingClass:
              response?.data?.student_one_to_one_solving?.length,
            tutorSupport: response?.data?.student_tutor_support?.length,
            webinar: response?.data?.student_webinar?.length,
            counselling: response?.data?.student_counselling?.length,
          });
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Progress Report</h4>
                    </div>
                    {availableBadges?.length > 0 && (
                      <div className="d-flex justify-content-center">
                        <div className="badge-list">
                          {availableBadges?.map((badge) => (
                            <div className="ribbon" key={badge.id}>
                              {badge.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <PointHistory
                      totalPoints={totalPoints}
                      setTotalPoints={setTotalPoints}
                    />
                    <LevelOfStudent />
                    <div className="dashboard__section__title">
                      <h4
                        className="sidebar__title"
                        style={{ marginTop: "20px" }}
                      >
                        Exams
                      </h4>
                    </div>
                    <div className="row">
                      {examList.map(({ name, count }, index) => (
                        <div
                          key={index}
                          className="col-xl-3 col-lg-3 col-md-6 col-sm-6 column__custom__class"
                        >
                          <div className="gridarea__wraper text-center card-background">
                            <div className="gridarea__content p-2 m-2">
                              <div className="gridarea__heading">
                                <h3>No. of Given : {name}</h3>
                                <h3>{count}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="dashboard__section__title">
                      <h4
                        className="sidebar__title"
                        style={{ marginBottom: "0px" }}
                      >
                        Live Classes
                      </h4>
                    </div>
                    <div className="row">
                      {classList.map(({ name, count }, index) => (
                        <div
                          key={index}
                          className="col-xl-4 col-lg-4 col-md-6 col-sm-6 column__custom__class"
                        >
                          <div className="gridarea__wraper text-center card-background">
                            <div className="gridarea__content p-2 m-2">
                              <div className="gridarea__heading">
                                <h3>No. of Attempt : {name}</h3>
                                <h3>{count}</h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="dashboard__section__title">
                      <h4
                        className="sidebar__title"
                        style={{ marginBottom: "0px" }}
                      >
                        Lessons
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 column__custom__class">
                        <div className="gridarea__wraper text-center card-background">
                          <div className="gridarea__content p-2 m-2">
                            <div className="gridarea__heading">
                              <h3>No. of Complete : Lessons</h3>
                              <h3>{completeLesson?.length}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
