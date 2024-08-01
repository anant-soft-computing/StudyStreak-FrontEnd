import React, { useEffect, useState } from "react";
import ajaxCall from "../../helpers/ajaxCall";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";
import SkipIcon from "../UI/SkipIcon";

const Report = ({ paperId, testType }) => {
  const [examName, setExamName] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [writingAnswers, setWritingAnswers] = useState([]);
  const [speakingAnswers, setSpeakingAnswers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/practice-answers/${paperId}/`,
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
          if (testType === "Speaking") {
            const studentAnswers = response?.data?.student_answers?.Speaking;
            setSpeakingAnswers(studentAnswers);
          }
          if (testType === "Writing") {
            const studentAnswers = response?.data?.student_answers?.Writing;
            setWritingAnswers(studentAnswers);
          }
          setExamName(response?.data?.name);

          let studentAnswers = [];
          let correctAnswer = [];

          if (
            testType === "Reading" &&
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
            testType === "Listening" &&
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
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [testType, paperId]);

  return (
    <div className="row mt-4">
      <div className="col-xl-12 col-lg-12 AnswerCard">
        <div className="blog__details__content__wraper">
          {testType === "Writing" && (
            <div>
              {writingAnswers?.some((item) => item?.ai_assessment) ? (
                <div className="writing__exam">
                  <div className="dashboard__section__title">
                    <h4 className="sidebar__title">AI Assessment</h4>
                  </div>
                  {writingAnswers.map(
                    (item, index) =>
                      item?.ai_assessment && (
                        <div>
                          <div key={index} className="gptResponse">
                            ({index + 1}). {item.ai_assessment}
                          </div>
                          <br />
                        </div>
                      )
                  )}
                </div>
              ) : (
                <h5 className="text-center text-danger">
                  No AI Assessment Available !!
                </h5>
              )}

              {writingAnswers?.some((item) => item?.tutor_assessment) ? (
                <div className="writing__exam">
                  <div className="dashboard__section__title">
                    <h4 className="sidebar__title">Tutor Assessment</h4>
                  </div>
                  {writingAnswers.map(
                    (item, index) =>
                      item?.tutor_assessment && (
                        <div>
                          <div key={index} className="gptResponse">
                            ({index + 1}). {item.tutor_assessment}
                          </div>
                          <br />
                        </div>
                      )
                  )}
                </div>
              ) : (
                <h5 className="text-center text-danger">
                  No Tutor Assessment Available !!
                </h5>
              )}
            </div>
          )}
          {(testType === "Reading" || testType === "Listening") && (
            <div>
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
                        {correctAnswer?.map(({ id, answer_text }, index) => {
                          let icon;
                          const studentAnswer =
                            studentAnswers?.[index]?.answer_text?.trim();
                          const correctAnswerText = answer_text?.trim();

                          if (!studentAnswer) {
                            icon = <SkipIcon />;
                          } else if (correctAnswerText.includes(" OR ")) {
                            const correctOptions = correctAnswerText
                              .split(" OR ")
                              .map((option) => option.trim().toLowerCase());
                            icon = correctOptions.includes(
                              studentAnswer.toLowerCase()
                            ) ? (
                              <CheckIcon />
                            ) : (
                              <CancelIcon />
                            );
                          } else if (correctAnswerText.includes(" AND ")) {
                            const correctOptions = correctAnswerText
                              .split(" AND ")
                              .map((option) => option.trim().toLowerCase());
                            icon = correctOptions.every((option) =>
                              studentAnswer.toLowerCase().includes(option)
                            ) ? (
                              <CheckIcon />
                            ) : (
                              <CancelIcon />
                            );
                          } else {
                            icon =
                              studentAnswer === correctAnswerText ? (
                                <CheckIcon />
                              ) : (
                                <CancelIcon />
                              );
                          }
                          return (
                            <tr
                              key={id}
                              className={`${
                                index % 2 === 0 ? "" : "dashboard__table__row"
                              }`}
                            >
                              <td className="text-dark">{index + 1}.</td>
                              <td className="text-dark">
                                <div className="dashboard__table__star">
                                  {correctAnswerText}
                                </div>
                              </td>
                              <td className="text-dark">{studentAnswer}</td>
                              <td className="text-dark">{icon}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {testType === "Speaking" && (
            <div className="col-xl-12">
              <div className="dashboard__table table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Question Number</th>
                      <th>Answer Audio</th>
                      <th>AI Assessment</th>
                      <th>Tutor Assessment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {speakingAnswers?.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "" : "dashboard__table__row"
                        }`}
                      >
                        <td>{index + 1}.</td>
                        <td>
                          <audio controls>
                            <source
                              src={`https://studystreak.in/${item?.answer_audio}`}
                              type="audio/mpeg"
                            />
                          </audio>
                        </td>
                        <td>{item?.ai_assessment || "-"}</td>
                        <td>{item?.tutor_assessment || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
