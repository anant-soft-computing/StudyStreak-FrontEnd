import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import SkipIcon from "../UI/SkipIcon";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";
import ScoreCard from "../Exam-Answer/ScoreCard/ScoreCard";

const LiveAssignmentAnswer = () => {
  const { examId } = useParams();
  const [examName, setExamName] = useState("");
  const [examType, setExamType] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [skipCount, setSkipCount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/exam-block-answers/${examId}/`,
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
          setExamName(response.data?.exam_name);
          setCorrectAnswer(
            response.data?.correct_answers?.sort(
              (a, b) => a.question_number - b.question_number
            )
          );
          setStudentAnswers(
            response.data?.student_answers?.sort(
              (a, b) => a.question_number - b.question_number
            )
          );
          setExamType(response.data?.exam_type);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examId]);

  useEffect(() => {
    let correct = 0;
    let skipped = 0;
    let incorrect = 0;

    studentAnswers?.forEach((item, index) => {
      const correctAnswerText = correctAnswer[index]?.answer_text?.trim();
      const studentAnswerText = item.answer_text?.trim();

      if (!studentAnswerText) {
        skipped++;
      } else if (correctAnswerText === studentAnswerText) {
        correct++;
      } else {
        incorrect++;
      }
    });
    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    setSkipCount(skipped);

    if (correctAnswer?.length > 0) {
      const percentage = (correct / correctAnswer?.length) * 100;
      setPercentage(percentage.toFixed(2));
    }
  }, [studentAnswers, correctAnswer]);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8 AnswerCard">
                <div className="blog__details__content__wraper">
                  <h4 className="sidebar__title">Solution For: {examName}</h4>
                  <div>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                      <div className="flt-question-card">
                        Correct Answer : <span>{correctCount}</span>
                      </div>
                      <div className="flt-question-card">
                        Incorrect Answer : <span>{incorrectCount}</span>
                      </div>
                      <div className="flt-question-card">
                        Skip Answer : <span>{skipCount}</span>
                      </div>
                      <div className="flt-question-card">
                        Marks / Percentage :{" "}
                        <span>
                          {correctCount} / {correctAnswer?.length}, (
                          {percentage}) %
                        </span>
                      </div>
                    </div>
                  </div>
                  {examType === "General" && (
                    <div className="writing__exam">
                      <div className="dashboard__section__title">
                        <h4 className="sidebar__title">Answer Table</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="dashboard__table table-responsive">
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
                                  ({ id, answer_text }, index) => {
                                    let icon;
                                    const studentAnswerText =
                                      studentAnswers?.[
                                        index
                                      ]?.answer_text?.trim();
                                    const correctAnswerText =
                                      answer_text?.trim();

                                    if (!studentAnswerText) {
                                      icon = <SkipIcon />;
                                    } else {
                                      icon =
                                        studentAnswerText ===
                                        correctAnswerText ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        );
                                    }

                                    return (
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
                                            {correctAnswerText}
                                          </div>
                                        </td>
                                        <td className="text-dark">
                                          {studentAnswerText}
                                        </td>
                                        <td className="text-dark">{icon}</td>
                                      </tr>
                                    );
                                  }
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
              <ScoreCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveAssignmentAnswer;
