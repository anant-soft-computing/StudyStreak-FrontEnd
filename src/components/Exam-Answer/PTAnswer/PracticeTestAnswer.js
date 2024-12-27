import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ajaxCall from "../../../helpers/ajaxCall";
import ScoreCard from "../ScoreCard/ScoreCard";
import AnswerCard from "../AnswerCard";
import AnswerTable from "../AnswerTable/AnswerTable";
import WritingAnswerTable from "../AnswerTable/WritingAnswerTable";
import readingBandValues from "../../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../../utils/bandValues/listeningBandValues";

const PracticeTestAnswer = () => {
  const { examId, examType } = useParams();
  const [band, setBand] = useState(0);
  const [examName, setExamName] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [writingAnswers, setWritingAnswers] = useState([]);

  const [skipCount, setSkipCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/practice-answers/${examId}/`,
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
          if (examType === "Writing") {
            const studentAnswers = response?.data?.student_answers?.Writing;
            const totalBand = studentAnswers?.reduce((sum, item) => {
              const bandValue = item.band !== null ? parseFloat(item.band) : 0;
              return sum + bandValue;
            }, 0);
            setBand(totalBand / studentAnswers?.length);
            setWritingAnswers(studentAnswers);
          }
          setExamName(response?.data?.name);

          let studentAnswers = [];
          let correctAnswer = [];

          if (
            examType === "Reading" &&
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
            examType === "Listening" &&
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
          let skip = 0;

          studentAnswers?.forEach((item, index) => {
            const correctAnswerText = correctAnswer[index]?.answer_text?.trim();
            const studentAnswerText = item.answer_text?.trim();

            if (!studentAnswerText) {
              skip++;
            } else if (correctAnswerText?.includes(" OR ")) {
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

          if (examType === "Reading") {
            setBand(readingBandValues[correct]);
          } else if (examType === "Listening") {
            setBand(listeningBandValues[correct]);
          }

          setSkipCount(skip);
          setCorrectCount(correct);
          setIncorrectCount(incorrect);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examType, examId]);

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8 AnswerCard">
                <div className="blog__details__content__wraper">
                  <h4 className="sidebar__title">Solution For : {examName}</h4>
                  {examType === "Writing" && (
                    <h4 className="sidebar__title">Band : {band}</h4>
                  )}
                  {examType !== "Writing" && (
                    <AnswerCard
                      band={band}
                      skipCount={skipCount}
                      correctCount={correctCount}
                      incorrectCount={incorrectCount}
                    />
                  )}
                  {examType === "Writing" && (
                    <WritingAnswerTable data={writingAnswers} />
                  )}
                  {(examType === "Reading" || examType === "Listening") && (
                    <AnswerTable
                      correctAnswer={correctAnswer}
                      studentAnswer={studentAnswers}
                    />
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

export default PracticeTestAnswer;
