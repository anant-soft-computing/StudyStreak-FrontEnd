import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../helpers/ajaxCall";
import AnswerTable from "../../Exam-Answer/AnswerTable/AnswerTable";

const GeneralPTAnswer = () => {
  const [examName, setExamName] = useState("");
  const [percentage, setPercentage] = useState(0);

  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);

  const { examForm, fullPaper } = useLocation()?.state || {};

  const [skipCount, setSkipCount] = useState(0);
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

          let studentAnswers = [];
          let correctAnswer = [];

          if (
            examForm === "General" &&
            response.data?.student_answers?.General &&
            response.data?.correct_answers?.General
          ) {
            response.data.student_answers.General.forEach((block) => {
              studentAnswers = studentAnswers.concat(
                block.answers.sort(
                  (a, b) => a.question_number - b.question_number
                )
              );
            });

            response.data.correct_answers.General.forEach((block) => {
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
          let skip = 0;

          studentAnswers?.forEach((item, index) => {
            const correctAnswerText = correctAnswer[index]?.answer_text?.trim();
            const studentAnswerText = item.answer_text?.trim();

            if (!studentAnswerText) {
              skip++;
            } else if (correctAnswerText === studentAnswerText) {
              correct++;
            } else {
              incorrect++;
            }
          });

          setSkipCount(skip);
          setCorrectCount(correct);
          setIncorrectCount(incorrect);

          if (correctAnswer?.length > 0) {
            const percentage = (correct / correctAnswer?.length) * 100;
            setPercentage(percentage.toFixed(2));
          }
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
              <div className="col-xl-12 col-lg-12 AnswerCard">
                <div className="blog__details__content__wraper">
                  <h4 className="sidebar__title">Solution For : {examName}</h4>
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
                  <AnswerTable
                    correctAnswer={correctAnswer}
                    studentAnswer={studentAnswers}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralPTAnswer;
