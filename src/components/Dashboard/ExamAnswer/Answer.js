import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ajaxCall from "../../../helpers/ajaxCall";
import TopBar from "../../TopBar/TopBar";
import NavBar from "../../NavBar/NavBar";

const Answer = () => {
  const { examId } = useParams();
  const [answer, setAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const examName = answer[0]?.exam?.exam_name;
  const totalQuestions = answer[0]?.exam?.no_of_questions;

  const { examAnswer, stoppedTimeFormatted } = useLocation()?.state || {};

  const getAnswere = async () => {
    try {
      const response = await ajaxCall(
        `/answerslistview/${examId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response.status === 200) {
        setAnswer(response.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAnswere();
  }, [examId]);

  useEffect(() => {
    if (examAnswer) {
      setCorrectAnswers(examAnswer[0].answers);
    }
  }, [examAnswer]);

  useEffect(() => {
    let correct = 0;
    let incorrect = 0;
    correctAnswers.forEach((item, index) => {
      if (
        answer[index]?.answer_text.toLowerCase() === item.answer.toLowerCase()
      ) {
        correct++;
      } else {
        incorrect++;
      }
    });
    setCorrectCount(correct);
    setIncorrectCount(incorrect);
  }, [correctAnswers, answer]);

  return (
    <div>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div>
            <div className="theme__shadow__circle"></div>
            <div className="theme__shadow__circle shadow__right"></div>
          </div>
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8">
                  <div className="blog__details__content__wraper">
                    <h4 className="sidebar__title">
                      Solution For : {examName}
                    </h4>
                    <div className="course__details__wraper">
                      <ul className="answerContent">
                        <li className="text-dark">
                          Total Question :
                          <div className="scc__meta">
                            <strong className="answerCount">{totalQuestions}</strong>
                          </div>
                        </li>
                        <li className="text-dark">
                          Time Taken :
                          <div className="scc__meta">
                            <strong className="answerCount">
                              {stoppedTimeFormatted}
                            </strong>
                          </div>
                        </li>
                      </ul>
                      <ul className="answerContent">
                        <li className="text-dark">
                          Correct :
                          <div className="scc__meta">
                            <strong className="answerCount">{correctCount}</strong>
                          </div>
                        </li>
                        <li className="text-dark">
                          In Correct :
                          <div className="scc__meta">
                            <strong className="answerCount">{incorrectCount}</strong>
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
                            className="dashboard__table table-responsive"
                            style={{ maxHeight: "260px" }}
                          >
                            <table>
                              <thead>
                                <tr>
                                  <th>Question No.</th>
                                  <th>Correct Answer</th>
                                  <th>Your Answer</th>
                                </tr>
                              </thead>
                              <tbody>
                                {answer.map(
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
                                        <div className="dashboard__table__star">
                                          {answer_text}
                                        </div>
                                      </td>
                                      <td className="text-dark">
                                        {correctAnswers?.length > 0 &&
                                          correctAnswers[index] &&
                                          correctAnswers[index].answer}
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

export default Answer;
