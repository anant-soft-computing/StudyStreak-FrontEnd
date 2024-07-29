import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import BandScoreCard from "./BandScoreCard";
import AnswerCard from "./AnswerCard";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";

const Answer = () => {
  const { examId } = useParams();
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
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
    let incorrect = 0;
    studentAnswers?.forEach((item, index) => {
      const correctAnswerText = correctAnswer[index]?.answer_text?.trim();
      const studentAnswerText = item.answer_text?.trim();

      if (correctAnswerText?.includes(" OR ")) {
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
                  {examType === "Writing" && (
                    <h4 className="sidebar__title">Band : {band}</h4>
                  )}
                  {examType !== "Writing" && (
                    <AnswerCard
                      totalQuestions={correctAnswer.length}
                      correctCount={correctCount}
                      incorrectCount={incorrectCount}
                      bandValue={band}
                      examType={examType}
                    />
                  )}
                  {examType === "Writing" && (
                    <div className="writing__exam">
                      <div className="dashboard__section__title">
                        <h4 className="sidebar__title">Assessment</h4>
                      </div>
                      <div className="gptResponse">{gptResponse}</div>
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
                                  ({ id, answer_text }, index) => (
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
                                          {answer_text}
                                        </div>
                                      </td>
                                      <td className="text-dark">
                                        {studentAnswers?.length > 0 &&
                                          studentAnswers[index] &&
                                          studentAnswers[index].answer_text}
                                      </td>
                                      <td className="text-dark">
                                        {studentAnswers?.length > 0 &&
                                        studentAnswers[index] &&
                                        correctAnswer[
                                          index
                                        ]?.answer_text.includes(" OR ") ? (
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
                                          correctAnswer[
                                            index
                                          ]?.answer_text.includes(" AND ") ? (
                                          correctAnswer[index]?.answer_text
                                            .split(" AND ")
                                            .map((option) =>
                                              option.trim()?.toLowerCase()
                                            )
                                            .every((option) =>
                                              studentAnswers[index]?.answer_text
                                                ?.toLowerCase()
                                                .includes(option)
                                            ) ? (
                                            <CheckIcon />
                                          ) : (
                                            <CancelIcon />
                                          )
                                        ) : studentAnswers?.length > 0 &&
                                          studentAnswers[index] &&
                                          studentAnswers[index].answer_text ===
                                            correctAnswer[index]
                                              ?.answer_text ? (
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
                </div>
              </div>
              <BandScoreCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;
