import React, { useEffect, useState } from "react";
import AnswerCard from "../Exam-Answer/AnswerCard";
import ajaxCall from "../../helpers/ajaxCall";
import readingBandValues from "../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../utils/bandValues/listeningBandValues";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";

const Report = ({ paperId, testType }) => {
  const [band, setBand] = useState(0);
  const [examName, setExamName] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [writingAnswers, setWritingAnswers] = useState([]);
  const [assessment, setAssessment] = useState([]);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

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
            setAssessment(response?.data?.student_answers);
          }
          if (testType === "Writing") {
            setWritingAnswers(response?.data?.student_answers?.Writing);
          }
          setExamName(response?.data?.name);
          let studentAnswers;
          let correctAnswer = [];
          if (testType === "Reading") {
            studentAnswers = response?.data?.student_answers.Reading?.reduce(
              (acc, curr) => {
                return acc.concat(curr.answers);
              },
              []
            );
            correctAnswer.push(
              ...response.data?.correct_answers?.Reading?.reduce(
                (acc, curr) => {
                  return acc.concat(curr.answers);
                },
                []
              )
            );
          } else if (testType === "Listening") {
            studentAnswers = response.data?.student_answers?.Listening?.reduce(
              (acc, curr) => {
                return acc.concat(curr.answers);
              },
              []
            );

            correctAnswer.push(
              ...response.data?.correct_answers?.Listening?.reduce(
                (acc, curr) => {
                  return acc.concat(curr.answers);
                },
                []
              )
            );
          }
          setStudentAnswers(studentAnswers);
          setCorrectAnswer(correctAnswer);

          let correct = 0;
          let incorrect = 0;
          studentAnswers?.forEach((item, index) => {
            const correctAnswerText = correctAnswer[index]?.answer_text?.trim();
            const studentAnswerText = item?.answer_text?.trim();
            if (correctAnswerText?.includes(" OR ")) {
              const correctOptions = correctAnswerText
                .split(" OR ")
                .map((option) => option?.trim());
              if (correctOptions?.includes(studentAnswerText)) {
                correct++;
              } else {
                incorrect++;
              }
            } else if (correctAnswerText?.includes(" AND ")) {
              const correctOptions = correctAnswerText
                .split(" AND ")
                .map((option) => option?.trim());
              if (
                correctOptions?.every((option) =>
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
          if (testType === "Reading") {
            setBand(readingBandValues[correct]);
          } else if (testType === "Listening") {
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
  }, [testType, paperId]);

  return (
    <div className="col-xl-7 col-lg-7 AnswerCard">
      <div className="blog__details__content__wraper">
        <h4 className="sidebar__title">Solution For : {examName}</h4>
        {(testType === "Reading" || testType === "Listening") && (
          <AnswerCard
            totalQuestions={correctAnswer?.length}
            correctCount={correctCount}
            incorrectCount={incorrectCount}
            bandValue={band}
          />
        )}
        {testType === "Writing" && (
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
        {(testType === "Reading" || testType === "Listening") && (
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
                      {" "}
                      {correctAnswer?.map(
                        ({ id, question_number, answer_text }, index) => (
                          <tr
                            key={id}
                            className={`${
                              index % 2 === 0 ? "" : "dashboard__table__row"
                            }`}
                          >
                            <td className="text-dark">{question_number}.</td>
                            <td className="text-dark">
                              <div className="dashboard__table__star">
                                {answer_text}
                              </div>
                            </td>
                            <td className="text-dark">
                              {studentAnswers?.length > 0 &&
                                studentAnswers[index] &&
                                studentAnswers[index]?.answer_text}
                            </td>
                            <td className="text-dark">
                              {studentAnswers?.length > 0 &&
                              studentAnswers[index] &&
                              correctAnswer[index]?.answer_text?.includes(
                                " OR "
                              ) ? (
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
                                correctAnswer[index]?.answer_text?.includes(
                                  " AND "
                                ) ? (
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
                                studentAnswers[index]?.answer_text ===
                                  correctAnswer[index]?.answer_text ? (
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
                  {assessment?.Speaking?.map((item, index) => (
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
  );
};

export default Report;