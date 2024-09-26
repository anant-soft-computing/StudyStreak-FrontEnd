import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";
import readingBandValues from "../../../../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../../../../utils/bandValues/listeningBandValues";

const ScoreCard = ({ course }) => {
  const navigate = useNavigate();
  const [band, setBand] = useState(0);
  const [fltBand, setFltBand] = useState(0);
  const [fltData, setFltData] = useState([]);
  const [miniTestData, setMiniTestData] = useState([]);
  const [practiceTestData, setPracticeTestData] = useState([]);

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
    if (course === "GENERAL")
      fetchTestData(
        "/test-submission/?test_type=exam_block&records=1",
        setMiniTestData
      );
  }, [course]);

  useEffect(() => {
    fetchTestData(
      "/test-submission/?test_type=practise_set&records=1",
      setPracticeTestData
    );
  }, []);

  useEffect(() => {
    if (course === "IELTS") {
      fetchTestData("/test-submission/?test_type=flt&records=1", setFltData);
    }
  }, [course]);

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
    if (course === "IELTS") {
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
    }
  }, [course, fltData]);

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

  return (
    <>
      {course === "GENERAL" && (
        <div className="col-xl-6 column__custom__class">
          <div className="gridarea__wraper card-background">
            <div className="gridarea__content">
              <div className="gridarea__heading">
                <h6>Your Latest Given Mini Test</h6>
              </div>
              {miniTestData?.length > 0 ? (
                <div>
                  <div className="gridarea__price d-flex align-items-center gap-2 mb-0">
                    <h4>
                      {miniTestData?.[0]?.exam_name}, Score :{" "}
                      {miniTestData?.[0]?.band}.0
                    </h4>
                  </div>
                  <div
                    className="gridarea__bottom"
                    onClick={() => {
                      if (
                        miniTestData[0]?.exam_type === "Speaking" ||
                        miniTestData[0]?.exam_type === "Writing"
                      ) {
                        navigate(`/assessment/${miniTestData[0]?.exam_block}`, {
                          state: { examType: miniTestData[0]?.exam_type },
                        });
                      } else if (miniTestData[0]?.exam_type === "General") {
                        navigate(
                          `/general-exam-answer/${miniTestData[0]?.exam_block}`
                        );
                      } else {
                        navigate(`/exam-answer/${miniTestData[0]?.exam_block}`);
                      }
                    }}
                  >
                    <div className="gridarea__small__content">
                      <Link>
                        <h6>View Full Report {">>"}</h6>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <h6 className="text-center text-danger">
                  Not Given Any Mini Test !!
                </h6>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="col-xl-6 column__custom__class">
        <div className="gridarea__wraper card-background">
          <div className="gridarea__content">
            <div className="gridarea__heading">
              <h6>Your Latest Given Practice Test</h6>
            </div>
            {practiceTestData?.length > 0 ? (
              <div>
                <div className="gridarea__price d-flex align-items-center gap-2 mb-0">
                  <h4>
                    {practiceTestData?.[0]?.practise_set_name},
                    {practiceTestData?.[0]?.practise_set_type === "General"
                      ? " Score :"
                      : " Band :"}{" "}
                    {band.toFixed(1)}
                  </h4>
                </div>
                <div
                  className="gridarea__bottom"
                  onClick={() => {
                    if (
                      practiceTestData[0]?.practise_set_type === "Writing" ||
                      practiceTestData[0]?.practise_set_type === "Speaking"
                    ) {
                      navigate(
                        `/practice-assessment/${practiceTestData[0]?.practise_set}`,
                        {
                          state: {
                            examType: practiceTestData[0]?.practise_set_type,
                          },
                        }
                      );
                    } else if (
                      practiceTestData[0]?.practise_set_type === "General"
                    ) {
                      navigate(
                        `/general-practice-test-answer/${practiceTestData[0]?.practise_set}`,
                        {
                          state: {
                            fullPaper: practiceTestData[0]?.practise_set,
                            examForm: practiceTestData[0]?.practise_set_type,
                          },
                        }
                      );
                    } else {
                      navigate(
                        `/exam-practice-test-answer/${practiceTestData[0]?.practise_set}`,
                        {
                          state: {
                            fullPaper: practiceTestData[0]?.practise_set,
                            examForm: practiceTestData[0]?.practise_set_type,
                          },
                        }
                      );
                    }
                  }}
                >
                  <div className="gridarea__small__content">
                    <Link>
                      <h6>View Full Report {">>"}</h6>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <h6 className="text-center text-danger">
                Not Given Any Practice Test !!
              </h6>
            )}
          </div>
        </div>
      </div>
      {course === "IELTS" && (
        <div className="col-xl-6 column__custom__class">
          <div className="gridarea__wraper card-background">
            <div className="gridarea__content">
              <div className="gridarea__heading">
                <h6>Your Latest Full Length Test</h6>
              </div>
              {fltData?.length > 0 ? (
                <div>
                  <div className="gridarea__price d-flex gap-2 mb-0">
                    <h4>
                      {fltData?.[0]?.flt_set_name}, Band : {fltBand}
                    </h4>
                  </div>
                  <div
                    className="gridarea__bottom"
                    onClick={() => {
                      navigate(`/exam-fulllength-answer/${fltData[0]?.flt}`);
                    }}
                  >
                    <div className="gridarea__small__content">
                      <Link>
                        <h6>View Full Report {">>"}</h6>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <h6 className="text-center text-danger">
                  Not Given Any Latest Full Length Test !!
                </h6>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScoreCard;
