import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import ajaxCall from "../../../../../../../helpers/ajaxCall";
import SmallModal from "../../../../../../UI/Modal";
import Loading from "../../../../../../UI/Loading";

const PTEHIWAnswer = () => {
  const { examId } = useParams();
  const [examData, setExamData] = useState({
    name: "",
    category: "",
    sub_category: "",
    practice_test_type: "",
  });
  const [blockID, setBlockID] = useState(0);
  const [blockData, setBlockData] = useState({
    answer: [],
    audio_file: "",
    sub_category: "",
    question_other: "",
    audio_transcript: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentExams, setStudentExams] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [highlightedText, setHighlightedText] = useState("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);
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
          const studentAnswers =
            response?.data?.student_answers?.Listening.filter(
              (item) => item.block_id === blockID
            ).map((item) => {
              return {
                studentAnswers: item?.answers,
              };
            });
          setExamData({
            name: response?.data?.name,
            category: response?.data?.category,
            sub_category: response?.data?.sub_category,
            practice_test_type: response?.data?.practice_test_type,
          });
          setStudentExams(response.data.student_answers?.Listening);
          setStudentAnswers(studentAnswers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [blockID, examId]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/exam/block/${blockID}/`,
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
          setBlockData({
            answer: response?.data?.answers,
            audio_file: response?.data?.audio_file,
            audio_transcript: response?.data?.passage,
            sub_category: response?.data?.sub_category,
            question_other: response?.data?.question_other,
          });
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [blockID]);

  const calculateScore = useCallback(() => {
    if (!blockData.answer.length || !studentAnswers.length) return 0;

    const studentAnswersList = studentAnswers[0]?.studentAnswers || [];
    let correctCount = 0;

    blockData.answer.forEach((correctAnswer) => {
      const studentAnswer = studentAnswersList.find(
        (answer) => answer.question_number === correctAnswer.question_number
      );

      if (
        studentAnswer &&
        studentAnswer.answer_text.toLowerCase() ===
          correctAnswer.answer_text.toLowerCase()
      ) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round(
      (correctCount / blockData.answer.length) * 90
    );
    setScore(calculatedScore);
    return calculatedScore;
  }, [blockData, studentAnswers]);

  const handleOpenModal = (blockID) => {
    setBlockID(blockID);
    setIsModalOpen(true);
  };

  const highlightStudentAnswers = useCallback(() => {
    if (!blockData.audio_transcript || !studentAnswers.length)
      return blockData.audio_transcript;

    const studentAnswersList = studentAnswers[0]?.studentAnswers || [];

    // If there's no transcript or no student answers, return original transcript
    if (!blockData.audio_transcript || !studentAnswersList.length) {
      return blockData.audio_transcript;
    }

    // Convert the transcript to plain text if it contains HTML
    const plainTranscript = blockData.audio_transcript.replace(/<[^>]*>/g, "");

    // Create a React fragment to build highlighted text
    const highlightedParts = [];
    let lastIndex = 0;

    // For each student answer, find it in the transcript and highlight it
    studentAnswersList.forEach((studentAnswer) => {
      if (!studentAnswer.answer_text) return;

      const word = studentAnswer.answer_text;
      const questionNumber = studentAnswer.question_number;

      // Case insensitive search with word boundaries
      const wordRegex = new RegExp(`\\b${word}\\b`, "i");
      const match = plainTranscript.match(wordRegex);

      if (match) {
        const startIndex = match.index;
        const endIndex = startIndex + match[0].length;

        // Add text before the match
        if (startIndex > lastIndex) {
          highlightedParts.push(
            <span key={`text-${lastIndex}`}>
              {plainTranscript.substring(lastIndex, startIndex)}
            </span>
          );
        }

        // Add highlighted word with yellow background
        highlightedParts.push(
          <span
            key={`highlight-${questionNumber}`}
            style={{
              backgroundColor: "#FFEB3B", // Yellow background
              padding: "0 3px",
              borderRadius: "3px",
              fontWeight: "bold",
            }}
          >
            {match[0]}
          </span>
        );

        lastIndex = endIndex;
      }
    });

    // Add any remaining text
    if (lastIndex < plainTranscript.length) {
      highlightedParts.push(
        <span key={`text-end`}>{plainTranscript.substring(lastIndex)}</span>
      );
    }

    return highlightedParts;
  }, [blockData.audio_transcript, studentAnswers]);

  useEffect(() => {
    if (isModalOpen) {
      calculateScore();
      setHighlightedText(highlightStudentAnswers());
    }
  }, [isModalOpen, calculateScore, highlightStudentAnswers]);

  return (
    <div>
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="blog__details__content__wraper">
                    <h4 className="sidebar__title">
                      Solution For : {examData.name}
                    </h4>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="dashboard__table table-responsive">
                          <table>
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>Exam Name</th>
                                <th>Exam Category</th>
                                <th>Exam Type</th>
                                <th>View Score</th>
                              </tr>
                            </thead>
                            <tbody>
                              {studentExams?.map((item, index) => (
                                <tr
                                  key={index}
                                  className={
                                    index % 2 === 0
                                      ? ""
                                      : "dashboard__table__row"
                                  }
                                >
                                  <td>{index + 1}</td>
                                  <td>{examData.name}</td>
                                  <td>{examData.category}</td>
                                  <td>{examData.practice_test_type}</td>
                                  <td>
                                    {item.block_id ? (
                                      <button
                                        className="take-test"
                                        onClick={() =>
                                          handleOpenModal(item.block_id)
                                        }
                                      >
                                        View
                                      </button>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SmallModal
        size="xl"
        centered
        title="Your Score"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {blockData.audio_file && (
              <div className="mb-2 flex justify-center">
                <audio controls>
                  <source src={blockData.audio_file} type="audio/mpeg" />
                </audio>
              </div>
            )}
            <h5>Student Answers:</h5>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                {highlightedText || blockData.audio_transcript}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                padding: "20px",
                marginTop: "20px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #ddd",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h5 style={{ width: "100%", marginBottom: "10px" }}>
                Correct Answers:
              </h5>
              {blockData?.answer &&
                blockData?.answer?.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      padding: "10px 15px",
                      border: "1px solid #01579b",
                      borderRadius: "5px",
                      backgroundColor: "#f9f9f9",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    <strong>A{item.question_number} : </strong>{" "}
                    {item.answer_text}
                  </div>
                ))}
            </div>
            <div className="progress-section mt-3">
              <h5>Your Total Score:</h5>
              <div className="mb-2">
                <div className="d-flex justify-content-between">
                  <span>Highlight incorrect words</span>
                  <span>
                    ({Math.round((score / 90) * blockData.answer.length)}/
                    {blockData.answer.length})&nbsp;[
                    {Math.round((score / 90) * 100)}]%
                  </span>
                </div>
                <ProgressBar
                  variant={
                    score >= 60 ? "success" : score >= 30 ? "warning" : "danger"
                  }
                  max={90}
                  now={score}
                />
              </div>
            </div>
          </div>
        )}
      </SmallModal>
    </div>
  );
};

export default PTEHIWAnswer;
