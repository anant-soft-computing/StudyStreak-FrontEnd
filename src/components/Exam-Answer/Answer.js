import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SmallModal from "../UI/Modal";
import SkipIcon from "../UI/SkipIcon";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";
import ScoreCard from "./ScoreCard/ScoreCard";
import ajaxCall from "../../helpers/ajaxCall";
import { getBackgroundColor } from "../../utils/background/background";

const Answer = () => {
  const { examId } = useParams();
  const [examData, setExamData] = useState({
    name: "",
    type: "",
    band: 0,
    gptResponse: "",
    correctAnswers: [],
    studentAnswers: [],
  });
  const [examPaperData, setExamPaperData] = useState({
    audio: "",
    passage: "",
    passageImage: "",
    question: "",
  });
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
    percentage: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewExam = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchExamData = async () => {
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
          const { data } = response;
          setExamData({
            name: data?.exam_name,
            type: data?.exam_type,
            band: data?.band,
            gptResponse: data?.AI_Assessment,
            correctAnswers: data?.correct_answers?.sort(
              (a, b) => a.question_number - b.question_number
            ),
            studentAnswers: data?.student_answers?.sort(
              (a, b) => a.question_number - b.question_number
            ),
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchExamData();
  }, [examId]);

  useEffect(() => {
    const fetchExamPaper = async () => {
      try {
        const response = await ajaxCall(
          `/exam/block/${examId}/`,
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
          const { data } = response;
          setExamPaperData({
            audio: data?.audio_file,
            passage: data?.passage,
            passageImage: data?.passage_image,
            question: data?.question_other,
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchExamPaper();
  }, [examId]);

  useEffect(() => {
    if (
      examData.correctAnswers.length === 0 ||
      examData.studentAnswers.length === 0
    )
      return;

    let correct = 0;
    let skipped = 0;
    let incorrect = 0;

    examData.studentAnswers.forEach((item, index) => {
      const correctAnswerText =
        examData.correctAnswers[index]?.answer_text?.trim();
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

    const percentage = (correct / examData.correctAnswers.length) * 100;

    setStats({
      correct,
      incorrect,
      skipped,
      percentage: percentage.toFixed(2),
    });
  }, [examData.correctAnswers, examData.studentAnswers]);

  return (
    <>
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8 AnswerCard">
                  <div className="blog__details__content__wraper">
                    <h4 className="sidebar__title">
                      Solution For: {examData.name}
                    </h4>
                    {examData.type === "Writing" && (
                      <h4 className="sidebar__title">
                        Score : {examData.band}
                      </h4>
                    )}
                    {examData.type !== "Writing" && (
                      <div className="d-flex flex-wrap gap-3">
                        <div className="flt-question-card">
                          Correct Answer : <span>{stats.correct}</span>
                        </div>
                        <div className="flt-question-card">
                          Incorrect Answer : <span>{stats.incorrect}</span>
                        </div>
                        <div className="flt-question-card">
                          Skip Answer : <span>{stats.skipped}</span>
                        </div>
                        <div
                          className="flt-question-card"
                          style={{
                            backgroundColor: getBackgroundColor(stats.correct),
                          }}
                        >
                          Marks :{" "}
                          <span>
                            {stats.correct} / {examData.correctAnswers.length}
                          </span>
                        </div>
                        <div className="flt-question-card">
                          Percentage : <span>{stats.percentage} %</span>
                        </div>
                      </div>
                    )}
                    {examData.type === "Writing" && (
                      <div
                        className="writing__exam"
                        style={{ marginTop: "0px" }}
                      >
                        <div className="dashboard__section__title">
                          <h4 className="sidebar__title">Assessment</h4>
                        </div>
                        {examData.gptResponse &&
                        examData.gptResponse.trim() !== "<p></p>" ? (
                          <div
                            className="gptResponse"
                            dangerouslySetInnerHTML={{
                              __html: examData.gptResponse,
                            }}
                          ></div>
                        ) : (
                          <h5 className="text-center text-danger">
                            No Assessment Available !!
                          </h5>
                        )}
                      </div>
                    )}
                    {(examData.type === "Reading" ||
                      examData.type === "Listening") && (
                      <div className="writing__exam">
                        <div className="dashboard__section__title">
                          <h4 className="sidebar__title">Answer Table</h4>
                          <button
                            className="take-test"
                            onClick={handleViewExam}
                          >
                            View Exam
                          </button>
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
                                    <th>Result</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {examData.correctAnswers?.map(
                                    ({ id, answer_text }, index) => {
                                      let icon;
                                      const studentAnswerText =
                                        examData.studentAnswers?.[
                                          index
                                        ]?.answer_text?.trim();
                                      const correctAnswerText =
                                        answer_text?.trim();

                                      if (!studentAnswerText) {
                                        icon = <SkipIcon />;
                                      } else if (
                                        correctAnswerText?.includes(" OR ")
                                      ) {
                                        const correctOptions = correctAnswerText
                                          .split(" OR ")
                                          .map((option) =>
                                            option.trim().toLowerCase()
                                          );
                                        icon = correctOptions.includes(
                                          studentAnswerText.toLowerCase()
                                        ) ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        );
                                      } else if (
                                        correctAnswerText?.includes(" AND ")
                                      ) {
                                        const correctOptions = correctAnswerText
                                          .split(" AND ")
                                          .map((option) =>
                                            option.trim().toLowerCase()
                                          );
                                        icon = correctOptions.every((option) =>
                                          studentAnswerText
                                            .toLowerCase()
                                            .includes(option)
                                        ) ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        );
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
      <SmallModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="xl"
        centered
        title="Exam Review"
        footer={
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        }
      >
        <div className="container-fluid">
          {examData.type === "Reading" ? (
            <div className="row">
              <div
                className="col-md-6"
                style={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {examPaperData?.passageImage && (
                  <div className="mb-4 text-center">
                    <img
                      src={examPaperData?.passageImage}
                      alt="Passage"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "300px",
                        height: "auto",
                        borderRadius: "5px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                  </div>
                )}
                {examPaperData?.passage && (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: examPaperData?.passage,
                    }}
                  />
                )}
              </div>
              <div
                className="col-md-6"
                style={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                {examPaperData?.question && (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: examPaperData?.question,
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            <div style={{ padding: "10px" }}>
              {examPaperData?.audio && (
                <div className="mb-4 text-center">
                  <audio
                    controls
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      margin: "0 auto",
                    }}
                  >
                    <source src={examPaperData?.audio} type="audio/mpeg" />
                  </audio>
                </div>
              )}
              <div
                style={{
                  maxHeight: "60vh",
                  overflowY: "auto",
                  padding: "15px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              >
                {examPaperData?.question && (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: examPaperData?.question,
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </SmallModal>
    </>
  );
};

export default Answer;
