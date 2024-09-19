import React, { useEffect, useState } from "react";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import listeningBandValues from "../../../../utils/bandValues/listeningBandValues";
import readingBandValues from "../../../../utils/bandValues/ReadingBandValues";
import PointHistory from "../PointHistory/PointHistory";

const exams = {
  miniTest: "Mini Exam",
  practiceTest: "Practice Exam",
  fullLengthTest: "Full Length Exam",
};

const assignments = {
  assignments: "Assignment",
};

const liveClasses = {
  speakingPracticeClass: "Speaking Practice Class",
  groupDoubtSolvingClass: "Group Doubt Solving Class",
  oneToOneDoubtSolvingClass: "One To One Doubt Solving Class",
  tutorSupport: "Tutor Support",
  webinar: "Webinar",
  counselling: "Counselling",
};

const Progress = () => {
  const [band, setBand] = useState(0);
  const [fltBand, setFltBand] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [fltData, setFltData] = useState([]);
  const [miniTestData, setMiniTestData] = useState([]);
  const [practiceTestData, setPracticeTestData] = useState([]);

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

  const latestScore = {
    mTLatestScore: miniTestData[0]?.band,
    pTLatestScore: band.toFixed(1),
    fltLatestScore: fltBand,
  };

  const availableBadges = badges
    .filter((badge) => totalPoints >= badge.points_required)
    .sort((a, b) => a.points_required - b.points_required);

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
                    {availableBadges.length > 0 && (
                      <div className="d-flex justify-content-center">
                        <ul>
                          {availableBadges.map((badge) => (
                            <li className="ribbon" key={badge.id}>
                              {badge.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="dashboard__content__wraper common-background-color-across-app">
                      <h4 className="sidebar__title">Assignment</h4>
                      <div className="dashboard__table table-responsive">
                        <table>
                          <thead>
                            <tr>
                              <th>Assignment Name</th>
                              <th>No Of Given Assignment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(assignments).map(
                              (assignmentKey, index) => (
                                <tr
                                  key={assignmentKey}
                                  className={`${
                                    index % 2 === 0
                                      ? ""
                                      : "dashboard__table__row"
                                  }`}
                                >
                                  <td>{assignments[assignmentKey]}</td>
                                  <td>{studentExams[assignmentKey]}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="dashboard__content__wraper common-background-color-across-app">
                      <h4 className="sidebar__title">Exam</h4>
                      <div className="dashboard__table table-responsive">
                        <table>
                          <thead>
                            <tr>
                              <th>Exam Type</th>
                              <th>No Of Given Exam</th>
                              <th>Latest Score / Band</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(exams).map((examKey, index) => (
                              <tr
                                key={examKey}
                                className={`${
                                  index % 2 === 0 ? "" : "dashboard__table__row"
                                }`}
                              >
                                <td>{exams[examKey]}</td>
                                <td>{studentExams[examKey]}</td>
                                <td>
                                  {examKey === "fullLengthTest"
                                    ? latestScore.fltLatestScore
                                    : examKey === "practiceTest"
                                    ? latestScore.pTLatestScore
                                    : latestScore.mTLatestScore}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="dashboard__content__wraper common-background-color-across-app">
                      <h4 className="sidebar__title">Live Classes</h4>
                      <div className="dashboard__table table-responsive">
                        <table>
                          <thead>
                            <tr>
                              <th>Live Class Type</th>
                              <th>No Of Attempt Class</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(liveClasses).map(
                              (liveClassesKey, index) => (
                                <tr
                                  key={liveClassesKey}
                                  className={`${
                                    index % 2 === 0
                                      ? ""
                                      : "dashboard__table__row"
                                  }`}
                                >
                                  <td>{liveClasses[liveClassesKey]}</td>
                                  <td>{studentExams[liveClassesKey]}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="dashboard__content__wraper common-background-color-across-app">
                      <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <h4 className="sidebar__title">Point History</h4>
                        <h4 className="">Total Points : {totalPoints}</h4>
                      </div>
                      <PointHistory setTotalPoints={setTotalPoints} />
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
