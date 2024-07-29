import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import BandScoreCard from "./BandScoreCard";
import AnswerCard from "./AnswerCard";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";
import readingBandValues from "../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../utils/bandValues/listeningBandValues";

const PracticeTestAnswer = () => {
  const [examName, setExamName] = useState("");
  const [band, setBand] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [writingAnswers, setWritingAnswers] = useState([]);
  const { examForm, fullPaper } = useLocation()?.state || {};
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/practice-answers/${fullPaper}/`,
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
          if (examForm === "Writing") {
            const studentAnswers = response?.data?.student_answers?.Writing;
            const totalBand = studentAnswers?.reduce(
              (sum, item) => sum + parseFloat(item.band),
              0
            );
            setBand(totalBand / studentAnswers?.length);
            setWritingAnswers(studentAnswers);
          }
          setExamName(response?.data?.name);

          let studentAnswers = [];
          let correctAnswer = [];

          if (
            examForm === "Reading" &&
            response.data?.student_answers?.Reading &&
            response.data?.correct_answers?.Reading
          ) {
            response.data.student_answers.Reading.forEach((block) => {
              studentAnswers = studentAnswers.concat(
                block.answers.sort(
                  (a, b) => a.question_number - b.question_number
                )
              );
            });

            response.data.correct_answers.Reading.forEach((block) => {
              correctAnswer = correctAnswer.concat(
                block.answers.sort(
                  (a, b) => a.question_number - b.question_number
                )
              );
            });
          } else if (
            examForm === "Listening" &&
            response.data?.student_answers?.Listening &&
            response.data?.correct_answers?.Listening
          ) {
            response.data.student_answers.Listening.forEach((block) => {
              studentAnswers = studentAnswers.concat(
                block.answers.sort(
                  (a, b) => a.question_number - b.question_number
                )
              );
            });

            response.data.correct_answers.Listening.forEach((block) => {
              correctAnswer = correctAnswer.concat(
                block.answers.sort(
                  (a, b) => a.question_number - b.question_number
                )
              );
            });
          }
          setStudentAnswers(studentAnswers);
          setCorrectAnswer(correctAnswer);

          let correct = 0;
          let incorrect = 0;

          studentAnswers?.forEach((item, index) => {
            const correctAnswerText = correctAnswer[index]?.answer_text?.trim();
            const studentAnswerText = item.answer_text?.trim();
            if (correctAnswerText?.includes(" OR ")) {
              const correctOptions = correctAnswerText
                .split(" OR ")
                .map((option) => option.trim());
              if (correctOptions?.includes(studentAnswerText)) {
                correct++;
              } else {
                incorrect++;
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
              } else {
                incorrect++;
              }
            } else {
              if (correctAnswerText === studentAnswerText) {
                correct++;
              } else {
                incorrect++;
              }
            }
          });

          if (examForm === "Reading") {
            setBand(readingBandValues[correct]);
          } else if (examForm === "Listening") {
            setBand(listeningBandValues[correct]);
          }

          setCorrectCount(correct);
          setIncorrectCount(incorrect);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examForm, fullPaper]);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8 AnswerCard">
                <div className="blog__details__content__wraper">
                  <h4 className="sidebar__title">Solution For : {examName}</h4>
                  {examForm === "Writing" && (
                    <h4 className="sidebar__title">Band : {band}</h4>
                  )}
                  {examForm !== "Writing" && (
                    <AnswerCard
                      totalQuestions={correctAnswer.length}
                      correctCount={correctCount}
                      incorrectCount={incorrectCount}
                      bandValue={band}
                    />
                  )}
                  {examForm === "Writing" && (
                    <div className="writing__exam">
                      <div className="dashboard__section__title">
                        <h4 className="sidebar__title">AI Assessment</h4>
                      </div>
                      {writingAnswers.map((item, index) => {
                        return (
                          <div>
                            <div key={index} className="gptResponse">
                              ({index + 1}). {item?.ai_assessment}
                            </div>
                            <br />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {(examForm === "Reading" || examForm === "Listening") && (
                    <div style={{ marginTop: "50px" }}>
                      <div className="dashboard__section__title">
                        <h4 className="sidebar__title">Answer Table</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="dashboard__table table-responsive table__height">
                            <table>
                              <thead>
                                <tr>
                                  <th>Question No.</th>
                                  <th>Correct Answer</th>
                                  <th>Your Answer</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {correctAnswer.map(
                                  ({ id, answer_text }, index) => (
                                    <tr
                                      key={id}
                                      className={`${
                                        index % 2 === 0
                                          ? ""
                                          : "dashboard__table__row"
                                      }`}
                                    >
                                      <td className="text-dark">
                                        {index + 1}.
                                      </td>
                                      <td className="text-dark">
                                        <div className="dashboard__table__star">
                                          {answer_text}
                                        </div>
                                      </td>
                                      <td className="text-dark">
                                        {studentAnswers?.length > 0 &&
                                          studentAnswers[index] &&
                                          studentAnswers[index].answer_text}
                                      </td>
                                      <td className="text-dark">
                                        {studentAnswers?.length > 0 &&
                                        studentAnswers[index] &&
                                        correctAnswer[
                                          index
                                        ]?.answer_text.includes(" OR ") ? (
                                          correctAnswer[index]?.answer_text
                                            .split(" OR ")
                                            .map((option) =>
                                              option?.trim()?.toLowerCase()
                                            )
                                            .includes(
                                              studentAnswers[
                                                index
                                              ]?.answer_text?.toLowerCase()
                                            ) ? (
                                            <CheckIcon />
                                          ) : (
                                            <CancelIcon />
                                          )
                                        ) : studentAnswers?.length > 0 &&
                                          studentAnswers[index] &&
                                          correctAnswer[
                                            index
                                          ]?.answer_text.includes(" AND ") ? (
                                          correctAnswer[index]?.answer_text
                                            .split(" AND ")
                                            .map((option) =>
                                              option?.trim()?.toLowerCase()
                                            )
                                            .every((option) =>
                                              studentAnswers[index]?.answer_text
                                                ?.toLowerCase()
                                                ?.includes(option)
                                            ) ? (
                                            <CheckIcon />
                                          ) : (
                                            <CancelIcon />
                                          )
                                        ) : studentAnswers?.length > 0 &&
                                          studentAnswers[index] &&
                                          studentAnswers[index].answer_text ===
                                            correctAnswer[index]
                                              ?.answer_text ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        )}
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <BandScoreCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTestAnswer;
