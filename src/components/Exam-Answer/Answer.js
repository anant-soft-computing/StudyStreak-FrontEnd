import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import ScoreCard from "./ScoreCard/ScoreCard";
import AnswerCard from "./AnswerCard";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";
import SkipIcon from "../UI/SkipIcon";

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

  const parseAssessment = (assessment) => {
    const sections = {};
    const regex =
      /(?:Task Achievement:|Coherence and Cohesion:|Lexical Resource:|Grammatical Range and Accuracy:)/g;
    const matches = assessment?.split(regex);
    const titles = assessment?.match(regex);

    if (titles && matches) {
      titles?.forEach((title, index) => {
        sections[title.trim()] = matches[index + 1]?.trim() || "No data";
      });
    }
    return sections;
  };

  const aiAssessmentSections = gptResponse ? parseAssessment(gptResponse) : {};

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
                      totalQuestions={correctAnswer.length}
                      correctCount={correctCount}
                      incorrectCount={incorrectCount}
                      skipCount={skipCount}
                      bandValue={band}
                      examType={examType}
                    />
                  )}
                  {examType === "Writing" && (
                    <div className="writing__exam">
                      <div className="dashboard__section__title">
                        <h4 className="sidebar__title">Assessment</h4>
                      </div>
                      <div className="gptResponse">
                        {Object.keys(aiAssessmentSections)?.length > 0 && (
                          <>
                            <h4>#Explanation:</h4>
                            {Object.keys(aiAssessmentSections)?.map(
                              (section, index) => (
                                <div key={index}>
                                  <br />
                                  <strong>{section}</strong>
                                  <div>{aiAssessmentSections[section]}</div>
                                </div>
                              )
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                  {(examType === "Reading" || examType === "Listening") && (
                    <div className="writing__exam">
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
                                {correctAnswer.map(
                                  ({ id, answer_text }, index) => {
                                    let icon;
                                    const studentAnswer =
                                      studentAnswers?.[
                                        index
                                      ]?.answer_text?.trim();
                                    const correctAnswerText =
                                      answer_text?.trim();

                                    if (!studentAnswer) {
                                      icon = <SkipIcon />;
                                    } else if (
                                      correctAnswerText.includes(" OR ")
                                    ) {
                                      const correctOptions = correctAnswerText
                                        .split(" OR ")
                                        .map((option) =>
                                          option.trim().toLowerCase()
                                        );
                                      icon = correctOptions.includes(
                                        studentAnswer.toLowerCase()
                                      ) ? (
                                        <CheckIcon />
                                      ) : (
                                        <CancelIcon />
                                      );
                                    } else if (
                                      correctAnswerText.includes(" AND ")
                                    ) {
                                      const correctOptions = correctAnswerText
                                        .split(" AND ")
                                        .map((option) =>
                                          option.trim().toLowerCase()
                                        );
                                      icon = correctOptions.every((option) =>
                                        studentAnswer
                                          .toLowerCase()
                                          .includes(option)
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
                                          {studentAnswer}
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

export default Answer;
