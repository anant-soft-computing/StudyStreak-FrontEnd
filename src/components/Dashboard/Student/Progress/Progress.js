import React, { useEffect, useState } from "react";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import listeningBandValues from "../../../../utils/bandValues/listeningBandValues";
import readingBandValues from "../../../../utils/bandValues/ReadingBandValues";
import PointHistory from "../PointHistory/PointHistory";
import LevelOfStudent from "./LevelOfStudent/LevelOfStudent";

const Progress = () => {
  const [band, setBand] = useState(0);
  const [fltBand, setFltBand] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [fltData, setFltData] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [miniTestData, setMiniTestData] = useState([]);
  const [studentLessons, setStudentLessons] = useState([]);
  const [practiceTestData, setPracticeTestData] = useState([]);
  const [expectedScore, setExpectedScore] = useState({});

  const category = localStorage.getItem("category");

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

    regularClassesJoin: 0,
    speakingPracticeJoin: 0,
    groupDoubtSolvingJoin: 0,
    oneToOneDoubtSolvingJoin: 0,
    tutorSupportJoin: 0,
    webinarJoin: 0,
    counsellingJoin: 0,
  });

  const examList =
    category === "IELTS"
      ? [
          {
            name: "Mini Test",
            lastScore: miniTestData[0]?.band,
            count: studentExams?.miniTest,
          },
          {
            name: "Practice Test",
            lastScore: band.toFixed(1),
            count: studentExams?.practiceTest,
          },
          {
            name: "Full Length Test",
            lastScore: fltBand,
            count: studentExams?.fullLengthTest,
          },
        ]
      : [
          {
            name: "Mini Test",
            lastScore: miniTestData[0]?.band,
            count: studentExams?.miniTest,
          },
          {
            name: "Practice Test",
            lastScore: band.toFixed(1),
            count: studentExams?.practiceTest,
          },
        ];

  const classList =
    category === "IELTS"
      ? [
          {
            name: "Regular Class",
            join: studentExams?.regularClassesJoin,
          },
          {
            name: "Speaking Practice",
            count: studentExams?.speakingPracticeClass,
            join: studentExams?.speakingPracticeJoin,
          },
          {
            name: "Group Doubt Solving",
            count: studentExams?.groupDoubtSolvingClass,
            join: studentExams?.groupDoubtSolvingJoin,
          },
          {
            name: "One To One Doubt Solving",
            count: studentExams?.oneToOneDoubtSolvingClass,
            join: studentExams?.oneToOneDoubtSolvingJoin,
          },
          {
            name: "Tutor Support",
            count: studentExams?.tutorSupport,
            join: studentExams?.tutorSupportJoin,
          },
          {
            name: "Webinar",
            count: studentExams?.webinar,
            join: studentExams?.webinarJoin,
          },
          {
            name: "Counselling",
            count: studentExams?.counselling,
            join: studentExams?.counsellingJoin,
          },
        ]
      : [
          {
            name: "Regular Class",
            join: studentExams?.regularClassesJoin,
          },
          {
            name: "Group Doubt Solving",
            count: studentExams?.groupDoubtSolvingClass,
            join: studentExams?.groupDoubtSolvingJoin,
          },
          {
            name: "One To One Doubt Solving",
            count: studentExams?.oneToOneDoubtSolvingClass,
            join: studentExams?.oneToOneDoubtSolvingJoin,
          },
          {
            name: "Tutor Support",
            count: studentExams?.tutorSupport,
            join: studentExams?.tutorSupportJoin,
          },
          {
            name: "Webinar",
            count: studentExams?.webinar,
            join: studentExams?.webinarJoin,
          },
          {
            name: "Counselling",
            count: studentExams?.counselling,
            join: studentExams?.counsellingJoin,
          },
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
    (async () => {
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
          setExpectedScore(
            response?.data.find((item) => item.course_category === category)
          );
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, [category]);

  useEffect(() => {
    fetchTestData("/gamification/badges/", setBadges);
  }, []);

  useEffect(() => {
    fetchTestData("/lesson-get/", setLessons);
  }, []);

  useEffect(() => {
    fetchTestData(
      "/test-submission/?test_type=exam_block&records=1",
      setMiniTestData
    );
  }, []);

  useEffect(() => {
    fetchTestData(
      "/test-submission/?test_type=practise_set&records=1",
      setPracticeTestData
    );
  }, []);

  useEffect(() => {
    fetchTestData("/test-submission/?test_type=flt&records=1", setFltData);
  }, []);

  useEffect(() => {
    const fetchPracticeAnswers = async () => {
      try {
        const response = await ajaxCall(
          `/practice-answers/${practiceTestData?.[0]?.practise_set}/`,
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
          const testType = practiceTestData?.[0].practise_set_type;
          const studentAnswers = response?.data?.student_answers[testType];

          if (testType === "Writing" || testType === "Speaking") {
            const totalBand = studentAnswers.reduce((sum, item) => {
              const bandValue = item.band !== null ? parseFloat(item.band) : 0;
              return sum + bandValue;
            }, 0);

            setBand(totalBand / studentAnswers.length);
          } else if (
            testType === "Reading" ||
            testType === "Listening" ||
            testType === "General"
          ) {
            handleReadingOrListening(response.data, testType);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const handleReadingOrListening = (data, type) => {
      const studentAnswers = data.student_answers[type].reduce(
        (acc, curr) =>
          acc.concat(
            curr.answers.sort((a, b) => a.question_number - b.question_number)
          ),
        []
      );
      const correctAnswer = data.correct_answers[type].reduce(
        (acc, curr) =>
          acc.concat(
            curr.answers.sort((a, b) => a.question_number - b.question_number)
          ),
        []
      );

      let correct = 0;
      studentAnswers.forEach((item, index) => {
        const correctAnswerText = correctAnswer[index]?.answer_text?.trim();
        const studentAnswerText = item.answer_text?.trim();

        if (type === "General") {
          if (correctAnswerText === studentAnswerText) {
            correct++;
          }
          return setBand(correct);
        }

        if (correctAnswerText?.includes(" OR ")) {
          const correctOptions = correctAnswerText
            .split(" OR ")
            .map((option) => option.trim());
          if (correctOptions.includes(studentAnswerText)) {
            correct++;
          }
        } else if (correctAnswerText?.includes(" AND ")) {
          const correctOptions = correctAnswerText
            .split(" AND ")
            .map((option) => option.trim());
          if (
            correctOptions.every((option) =>
              studentAnswerText?.includes(option)
            )
          ) {
            correct++;
          }
        } else {
          if (correctAnswerText === studentAnswerText) {
            correct++;
          }
        }
      });

      if (type === "Reading") {
        setBand(readingBandValues[correct]);
      } else if (type === "Listening") {
        setBand(listeningBandValues[correct]);
      }
    };

    if (practiceTestData?.[0]?.practise_set) {
      fetchPracticeAnswers();
    }
  }, [practiceTestData]);

  useEffect(() => {
    const fetchFullTestAnswers = async () => {
      try {
        const response = await ajaxCall(
          `/flt-answers/${fltData[0]?.flt}/`,
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
          const { writing_set, speaking_set, reading_set, listening_set } =
            response.data;

          const extractAnswers = (set) => ({
            studentAnswers: set?.student_answers || [],
            correctAnswers: set?.correct_answers || [],
          });

          const { studentAnswers: writingAnswers } =
            extractAnswers(writing_set);
          const { studentAnswers: speakingAnswers } =
            extractAnswers(speaking_set);

          let rStudentAnswers = [],
            rCorrectAnswers = [],
            lStudentAnswers = [],
            lCorrectAnswers = [];

          // Reading
          if (reading_set) {
            const { studentAnswers, correctAnswers } =
              extractAnswers(reading_set);
            if (studentAnswers.Reading && correctAnswers.Reading) {
              rStudentAnswers = studentAnswers.Reading.flatMap(
                (item) => item.answers
              );
              rCorrectAnswers = correctAnswers.Reading.flatMap(
                (item) => item.answers
              );
            }
          }

          // Listening
          if (listening_set) {
            const { studentAnswers, correctAnswers } =
              extractAnswers(listening_set);
            if (studentAnswers.Listening && correctAnswers.Listening) {
              lStudentAnswers = studentAnswers.Listening.flatMap(
                (item) => item.answers
              );
              lCorrectAnswers = correctAnswers.Listening.flatMap(
                (item) => item.answers
              );
            }
          }

          // Reading
          let rCorrect = 0;
          rStudentAnswers.forEach((item, index) => {
            const correctAnswerText =
              rCorrectAnswers[index]?.answer_text?.trim();
            const studentAnswerText = item?.answer_text?.trim();

            if (correctAnswerText?.includes(" OR ")) {
              const correctOptions = correctAnswerText
                .split(" OR ")
                .map((option) => option.trim());
              if (correctOptions.includes(studentAnswerText)) {
                rCorrect++;
              }
            } else if (correctAnswerText?.includes(" AND ")) {
              const correctOptions = correctAnswerText
                .split(" AND ")
                .map((option) => option.trim());
              if (
                correctOptions.every((option) =>
                  studentAnswerText.includes(option)
                )
              ) {
                rCorrect++;
              }
            } else {
              if (correctAnswerText === studentAnswerText) {
                rCorrect++;
              }
            }
          });

          // Listening
          let lCorrect = 0;
          lStudentAnswers.forEach((item, index) => {
            const correctAnswerText =
              lCorrectAnswers[index]?.answer_text?.trim();
            const studentAnswerText = item?.answer_text?.trim();

            if (correctAnswerText?.includes(" OR ")) {
              const correctOptions = correctAnswerText
                .split(" OR ")
                .map((option) => option.trim());
              if (correctOptions.includes(studentAnswerText)) {
                lCorrect++;
              }
            } else if (correctAnswerText?.includes(" AND ")) {
              const correctOptions = correctAnswerText
                .split(" AND ")
                .map((option) => option.trim());
              if (
                correctOptions.every((option) =>
                  studentAnswerText.includes(option)
                )
              ) {
                lCorrect++;
              }
            } else {
              if (correctAnswerText === studentAnswerText) {
                lCorrect++;
              }
            }
          });

          const readingBand = readingBandValues[rCorrect] || 0;
          const listeningBand = listeningBandValues[lCorrect] || 0;
          const writingBand =
            parseFloat(calculateAverageBand(writingAnswers?.Writing)) || 0;
          const speakingBand =
            parseFloat(calculateAverageBand(speakingAnswers?.Speaking)) || 0;

          // Convert bands to numbers and calculate average
          const bands = [
            readingBand,
            listeningBand,
            writingBand,
            speakingBand,
          ].map((band) => parseFloat(band) || 0);

          const sum = bands.reduce((acc, band) => acc + band, 0);
          const averageBand =
            bands.length > 0 ? (sum / bands.length).toFixed(1) : 0;

          setFltBand(averageBand);
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    if (fltData?.[0]?.flt) {
      fetchFullTestAnswers();
    }
  }, [fltData]);

  const calculateAverageBand = (answers) => {
    const bandScores = answers
      ?.map((item) => (item.band !== null ? parseFloat(item.band) : 0))
      .filter((band) => !isNaN(band));
    if (bandScores?.length > 0) {
      const sum = bandScores.reduce((a, b) => a + b, 0);
      return (sum / bandScores.length).toFixed(1);
    }
    return 0;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/student-stats/",
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

            regularClassesJoin: response?.data?.student_regular_join?.length,
            speakingPracticeJoin:
              response?.data?.student_speaking_practice_join?.length,
            groupDoubtSolvingJoin:
              response?.data?.student_group_doubt_solving_join?.length,
            oneToOneDoubtSolvingJoin:
              response?.data?.student_one_to_one_solving_join?.length,
            tutorSupportJoin:
              response?.data?.student_tutor_support_join?.length,
            webinarJoin: response?.data?.student_webinar_join?.length,
            counsellingJoin: response?.data?.student_counselling_join?.length,
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
                      {category && (
                        <h5>
                          Expected Score : {expectedScore?.expected_score}
                        </h5>
                      )}
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
                      {examList.map(({ name, count, lastScore }, index) => (
                        <div
                          key={index}
                          className="col-xl-3 col-lg-3 col-md-6 col-sm-6 column__custom__class"
                        >
                          <div className="gridarea__wraper text-center card-background">
                            <div className="gridarea__content p-2 m-2">
                              <div className="gridarea__heading">
                                <h3>No. of Given : {name}</h3>
                                <h3>{count}</h3>
                                <h3>Last Score : {lastScore}</h3>
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
                      {classList.map(({ name, count, join }, index) => (
                        <div
                          key={index}
                          className="col-xl-4 col-lg-4 col-md-6 col-sm-6 column__custom__class"
                        >
                          <div className="gridarea__wraper text-center card-background">
                            <div className="gridarea__content p-2 m-2">
                              <div className="gridarea__heading">
                                <h3>{name}</h3>
                                {name !== "Regular Class" && (
                                  <h3>No. of Attempt : {count}</h3>
                                )}
                                <h3>No. of Join : {join}</h3>
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
                        Assignment
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 column__custom__class">
                        <div className="gridarea__wraper text-center card-background">
                          <div className="gridarea__content p-2 m-2">
                            <div className="gridarea__heading">
                              <h3>No. of Given : Assignments </h3>
                              <h3>{studentExams?.assignments}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
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
