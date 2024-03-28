import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ajaxCall from "../../../helpers/ajaxCall";
import { cancelIcon, checkIcon } from "../../CourseDetail/PackageDetails";
import BandScoreCard from "./BandScoreCard";
import AnswerCard from "./AnswerCard";

const PracticeTestAnswer = () => {
  const { examId } = useParams();
  const [studentAnswer, setStudentAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const { timeTaken, bandValue, examForm } = useLocation()?.state || {};
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/practice-answers/50`,
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
        console.log("Response", response);
        if (response.status === 200) {
          let studentAnswers;
          if (examForm === "Reading") {
            studentAnswers = response.data?.student_answers.Reading?.reduce(
              (acc, curr) => {
                return acc.concat(curr.answers);
              },
              []
            );
          } else if (examForm === "Listening") {
            studentAnswers = response.data?.student_answers.Listening?.reduce(
              (acc, curr) => {
                return acc.concat(curr.answers);
              },
              []
            );
          }
          const correctAnswers = response.data?.correct_answers.Reading?.reduce(
            (acc, curr) => {
              return acc.concat(curr.answers);
            },
            []
          );
          setStudentAnswer(studentAnswers);
          setCorrectAnswers(correctAnswers);

          let correct = 0;
          let incorrect = 0;
          studentAnswers.forEach((studentAns, index) => {
            if (studentAns.answer_text === correctAnswers[index].answer_text) {
              correct++;
            } else {
              incorrect++;
            }
          });
          setCorrectCount(correct);
          setIncorrectCount(incorrect);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examId]);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8">
                <div className="blog__details__content__wraper">
                  <h4 className="sidebar__title">Solution For :</h4>
                  <AnswerCard
                    timeTaken={timeTaken}
                    correctCount={correctCount}
                    incorrectCount={incorrectCount}
                    bandValue={bandValue}
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
                                    <td className="text-dark">
                                      {question_number}.
                                    </td>
                                    <td className="text-dark">
                                      {correctAnswers[index]?.answer_text}
                                    </td>
                                    <td
                                      className={`text-dark ${
                                        answer_text ===
                                        correctAnswers[index]?.answer_text
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
                                      correctAnswers[index]?.answer_text
                                        ? checkIcon()
                                        : cancelIcon()}
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
