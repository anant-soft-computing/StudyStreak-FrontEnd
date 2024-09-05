import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import ScoreCard from "./ScoreCard/ScoreCard";
import AnswerCard from "./AnswerCard";
import AnswerTable from "./AnswerTable/AnswerTable";
import { writingAssessment } from "../../utils/assessment/writingAssessment";

const Answer = () => {
  const { examId } = useParams();
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [skipCount, setSkipCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [examName, setExamName] = useState("");
  const [examType, setExamType] = useState("");
  const [gptResponse, setGPTResponse] = useState("");
  const [band, setBand] = useState(0);

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
          setCorrectAnswer(response.data?.correct_answers);
          setStudentAnswers(response.data?.student_answers);
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
                    <div className="writing__exam">
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
