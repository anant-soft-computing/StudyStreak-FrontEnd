import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import ScoreCard from "./ScoreCard/ScoreCard";
import { getBackgroundColor } from "../../utils/background/background";
import AnswerTable from "./AnswerTable/AnswerTable";
import { writingAssessment } from "../../utils/assessment/writingAssessment";

const Answer = () => {
  const { examId } = useParams();
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [band, setBand] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [skipCount, setSkipCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [examName, setExamName] = useState("");
  const [examType, setExamType] = useState("");
  const [gptResponse, setGPTResponse] = useState("");

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
          setExamName(response.data?.exam_name);
          setBand(response.data?.band);
          setExamType(response.data?.exam_type);
          setGPTResponse(response.data?.AI_Assessment);
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
          correctOptions.every((option) => studentAnswerText?.includes(option))
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
    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    setSkipCount(skipped);

    if (correctAnswer?.length > 0) {
      const percentage = (correct / correctAnswer?.length) * 100;
      setPercentage(percentage.toFixed(2));
    }
  }, [studentAnswers, correctAnswer]);

  const aiAssessment = gptResponse ? writingAssessment(gptResponse) : {};

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="blogarea__2 sp_top_100 sp_bottom_100">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-8 AnswerCard">
                <div className="blog__details__content__wraper">
                  <h4 className="sidebar__title">Solution For: {examName}</h4>
                  {examType === "Writing" && (
                    <h4 className="sidebar__title">Score : {band}</h4>
                  )}
                  {examType !== "Writing" && (
                    <div className="d-flex flex-wrap gap-3">
                      <div className="flt-question-card">
                        Correct Answer : <span>{correctCount}</span>
                      </div>
                      <div className="flt-question-card">
                        Incorrect Answer : <span>{incorrectCount}</span>
                      </div>
                      <div className="flt-question-card">
                        Skip Answer : <span>{skipCount}</span>
                      </div>
                      <div
                        className="flt-question-card"
                        style={{
                          backgroundColor: getBackgroundColor(correctCount),
                        }}
                      >
                        Marks :{" "}
                        <span>
                          {correctCount} / {correctAnswer?.length}
                        </span>
                      </div>
                      <div className="flt-question-card">
                        Percentage : <span>{percentage} %</span>
                      </div>
                    </div>
                  )}
                  {examType === "Writing" && (
                    <div className="writing__exam" style={{ marginTop: "0px" }}>
                      <div className="dashboard__section__title">
                        <h4 className="sidebar__title">Assessment</h4>
                      </div>
                      <div className="gptResponse">
                        {Object.keys(aiAssessment)?.length > 0 && (
                          <>
                            <h4>#Explanation:</h4>
                            {Object.keys(aiAssessment)?.map(
                              (section, index) => (
                                <div key={index}>
                                  <br />
                                  <strong>{section}</strong>
                                  <div>{aiAssessment[section]}</div>
                                </div>
                              )
                            )}
                          </>
                        )}
                      </div>
                    </div>
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

export default Answer;
