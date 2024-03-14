import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";
import ajaxCall from "../../../helpers/ajaxCall";
import { cancelIcon, checkIcon } from "../../CourseDetail/PackageDetails";

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
    <div>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8">
                  <div className="blog__details__content__wraper">
                    <h4 className="sidebar__title">
                      Solution For : Sagar Ramani
                    </h4>
                    <div className="course__details__wraper">
                      <ul className="answerContent">
                        <li className="text-dark">
                          Time Taken :
                          <div className="scc__meta">
                            <strong className="answerCount">{timeTaken}</strong>
                          </div>
                        </li>
                        <li className="text-dark">
                          Band Score :
                          <div className="scc__meta">
                            <strong className="answerCount">{bandValue}</strong>
                          </div>
                        </li>
                      </ul>
                      <ul className="answerContent">
                        <li className="text-dark">
                          Correct :
                          <div className="scc__meta">
                            <strong className="answerCount">
                              {correctCount}
                            </strong>
                          </div>
                        </li>
                        <li className="text-dark">
                          In Correct :
                          <div className="scc__meta">
                            <strong className="answerCount">
                              {incorrectCount}
                            </strong>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div style={{ marginTop: "50px" }}>
                      <div className="dashboard__section__title">
                        <h4 className="sidebar__title">Answer Table</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div
                            className="dashboard__table table-responsive Sagar"
                            style={{ maxHeight: "270px" }}
                          >
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
                <div className="col-xl-4 col-lg-4">
                  <div className="course__details__sidebar">
                    <div className="event__sidebar__wraper">
                      <h5 className="sidebar__title">Band Score</h5>
                      <hr></hr>
                      <div className="course__summery__lists">
                        <ul>
                          <div className="course__summery__item d-flex justify-content-between">
                            <span>Level</span>
                            <span>Band</span>
                          </div>
                          <hr></hr>
                          <div
                            style={{
                              backgroundColor: "#86e9a9",
                              padding: "10px",
                            }}
                          >
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Expert</span>
                                <span className="sb_content">9</span>
                              </div>
                            </li>
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Very Good</span>
                                <span className="sb_content">8.5</span>
                              </div>
                            </li>
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Very Good</span>
                                <span className="sb_content">8</span>
                              </div>
                            </li>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#f7cb5e",
                              padding: "10px",
                              marginTop: "5px",
                            }}
                          >
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Good</span>
                                <span className="sb_content">7.5</span>
                              </div>
                            </li>
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Good</span>
                                <span className="sb_content">7</span>
                              </div>
                            </li>
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Competent</span>
                                <span className="sb_content">6.5</span>
                              </div>
                            </li>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#ff4d4d",
                              padding: "10px",
                              marginTop: "5px",
                            }}
                          >
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Competent</span>
                                <span className="sb_content">6.5</span>
                              </div>
                            </li>
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Competent</span>
                                <span className="sb_content">6</span>
                              </div>
                            </li>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#24d9d9",
                              marginTop: "5px",
                              padding: "10px",
                            }}
                          >
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Modest</span>
                                <span className="sb_content">5.5</span>
                              </div>
                            </li>
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Modest</span>
                                <span className="sb_content">5</span>
                              </div>
                            </li>
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Limited</span>
                                <span className="sb_content">4.5</span>
                              </div>
                            </li>
                          </div>
                          <div
                            style={{
                              backgroundColor: "#DCDCDC",
                              padding: "10px",
                              marginTop: "5px",
                            }}
                          >
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">Limited</span>
                                <span className="sb_content">4</span>
                              </div>
                            </li>
                            <li>
                              <div className="course__summery__item text-dark">
                                <span className="sb_label">
                                  Extremely Limited
                                </span>
                                <span className="sb_content"> 3.5</span>
                              </div>
                            </li>
                          </div>
                        </ul>
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

export default PracticeTestAnswer;
