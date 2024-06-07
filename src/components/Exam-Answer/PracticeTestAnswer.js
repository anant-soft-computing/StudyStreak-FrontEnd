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
  const [studentAnswer, setStudentAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const { bandValue, examForm, fullPaper } = useLocation()?.state || {};
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
          setExamName(response?.data?.name);
          let studentAnswers;
          let correctAnswers = [];
          if (examForm === "Reading") {
            studentAnswers = response.data?.student_answers.Reading?.reduce(
              (acc, curr) => {
                return acc.concat(curr.answers);
              },
              []
            );
            correctAnswers.push(
              ...response.data?.correct_answers.Reading?.reduce((acc, curr) => {
                return acc.concat(curr.answers);
              }, [])
            );
          } else if (examForm === "Listening") {
            studentAnswers = response.data?.student_answers.Listening?.reduce(
              (acc, curr) => {
                return acc.concat(curr.answers);
              },
              []
            );

            correctAnswers.push(
              ...response.data?.correct_answers.Listening?.reduce(
                (acc, curr) => {
                  return acc.concat(curr.answers);
                },
                []
              )
            );
          }
          setStudentAnswer(studentAnswers);
          setCorrectAnswers(correctAnswers);

          let correct = 0;
          let incorrect = 0;
          studentAnswers?.forEach((studentAns, index) => {
            if (studentAns.answer_text === correctAnswers[index].answer_text) {
              correct++;
            } else {
              incorrect++;
            }
          });
          if (examForm === "Reading") {
            setBand(readingBandValues[correct * 3]);
          } else if (examForm === "Listening") {
            setBand(listeningBandValues[correct * 4]);
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
                  <AnswerCard
                    totalQuestions={correctAnswers.length}
                    correctCount={correctCount}
                    incorrectCount={incorrectCount}
                    bandValue={bandValue || band}
                  />
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
                              {studentAnswer?.map(
                                (
                                  { id, question_number, answer_text },
                                  index
                                ) => (
                                  <tr
                                    key={id}
                                    className={`${
                                      index % 2 === 0
                                        ? ""
                                        : "dashboard__table__row"
                                    }`}
                                  >
                                    <td className="text-dark">{index + 1}.</td>
                                    <td className="text-dark">
                                      {correctAnswers?.[index]?.answer_text}
                                    </td>
                                    <td
                                      className={`text-dark ${
                                        answer_text ===
                                        correctAnswers?.[index]?.answer_text
                                          ? "correct-answer"
                                          : "incorrect-answer"
                                      }`}
                                    >
                                      <div className="dashboard__table__star">
                                        {answer_text}
                                      </div>
                                    </td>
                                    <td>
                                      {answer_text ===
                                      correctAnswers?.[index]?.answer_text ? (
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
