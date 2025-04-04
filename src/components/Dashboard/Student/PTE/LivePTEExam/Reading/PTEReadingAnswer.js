import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import Loading from "../../../../../UI/Loading";
import SmallModal from "../../../../../UI/Modal";
import ajaxCall from "../../../../../../helpers/ajaxCall";

const PTEReadingAnswer = () => {
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
    sub_category: "",
    question_other: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentExams, setStudentExams] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [score, setScore] = useState(0);

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
            response?.data?.student_answers?.Reading.filter(
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
          setStudentExams(response.data.student_answers?.Reading);
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

  const renderQuestionWithAnswers = () => {
    if (!blockData.question_other || studentAnswers.length === 0) {
      return (
        <div dangerouslySetInnerHTML={{ __html: blockData?.question_other }} />
      );
    }

    // RWFIB (Reading & Writing: Fill in the Blanks)
    if (blockData.sub_category === "RWFIB") {
      const studentAnswersList = studentAnswers[0]?.studentAnswers || [];
      let modifiedHtml = blockData.question_other;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = modifiedHtml;
      const selectElements = tempDiv.querySelectorAll("select");

      selectElements.forEach((select, index) => {
        const questionNumber =
          parseInt(select.id.replace("blank", "")) || index + 1;

        const studentAnswer =
          studentAnswersList.find(
            (answer) => answer.question_number === questionNumber
          )?.answer_text || "";

        const correctAnswer =
          blockData.answer.find(
            (answer) => answer.question_number === questionNumber
          )?.answer_text || "";

        const isCorrect =
          studentAnswer.toLowerCase() === correctAnswer.toLowerCase();
        const backgroundColor = isCorrect ? "#e6f7e6" : "#ffebee";
        const textColor = isCorrect ? "#2e7d32" : "#c62828";

        const answerSpan = document.createElement("span");
        answerSpan.style.marginLeft = "5px";
        answerSpan.style.padding = "5px 5px";
        answerSpan.style.backgroundColor = backgroundColor;
        answerSpan.style.color = textColor;
        answerSpan.style.borderRadius = "3px";
        answerSpan.style.fontSize = "0.99em";
        answerSpan.style.display = "inline-block";
        answerSpan.textContent = `${studentAnswer}`;

        select.parentNode.insertBefore(answerSpan, select.nextSibling);

        Array.from(select.options).forEach((option) => {
          if (option.value.toLowerCase() === studentAnswer.toLowerCase()) {
            option.selected = true;
          }
        });
      });

      return <div dangerouslySetInnerHTML={{ __html: tempDiv.innerHTML }} />;
    }

    // CSA (Choose Single Answer)
    if (blockData.sub_category === "CSA") {
      const studentAnswersList = studentAnswers[0]?.studentAnswers || [];
      let modifiedHtml = blockData.question_other;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = modifiedHtml;
      const radioInputs = tempDiv.querySelectorAll("input[type='radio']");

      // Get answers
      const studentAnswer = studentAnswersList[0]?.answer_text || "";
      const correctAnswer = blockData.answer[0]?.answer_text || "";
      const isCorrect =
        studentAnswer.toLowerCase() === correctAnswer.toLowerCase();

      radioInputs.forEach((radio) => {
        const optionValue = radio.value.toLowerCase();
        const optionElement = radio.closest("p"); // Get the parent paragraph of the radio

        // Mark student's selected answer
        if (optionValue === studentAnswer.toLowerCase()) {
          radio.checked = true;

          // Style the selected option
          const backgroundColor = isCorrect ? "#e6f7e6" : "#ffebee";
          const textColor = isCorrect ? "#2e7d32" : "#c62828";

          optionElement.style.backgroundColor = backgroundColor;
          optionElement.style.color = textColor;
          optionElement.style.borderRadius = "4px";
          optionElement.style.padding = "2px 5px";

          // Add correct/incorrect text after the option
          const answerIndicator = document.createElement("span");
          answerIndicator.style.marginLeft = "8px";
          answerIndicator.style.fontWeight = "bold";
          optionElement.appendChild(answerIndicator);
        }
      });

      return <div dangerouslySetInnerHTML={{ __html: tempDiv.innerHTML }} />;
    }

    // CMA (Choose Multiple Answers)
    if (blockData.sub_category === "CMA") {
      const studentAnswersList = studentAnswers[0]?.studentAnswers || [];
      let modifiedHtml = blockData.question_other;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = modifiedHtml;
      const checkboxInputs = tempDiv.querySelectorAll("input[type='checkbox']");

      // Get correct answers
      const correctAnswers = blockData.answer.map((answer) =>
        answer.answer_text.toUpperCase().trim()
      );

      // Get student selected answers
      const studentSelections = studentAnswersList.map((answer) =>
        answer.answer_text.toUpperCase().trim()
      );

      checkboxInputs.forEach((checkbox) => {
        const optionValue = checkbox.value.toUpperCase(); // A, B, C etc.
        const optionElement = checkbox.closest("p");

        // Check if this option is correct
        const isCorrectAnswer = correctAnswers.includes(optionValue);
        // Check if this option was selected by student
        const isSelected = studentSelections.includes(optionValue);

        if (isSelected) {
          checkbox.checked = true;

          if (isCorrectAnswer) {
            // Correctly selected option (green)
            optionElement.style.backgroundColor = "#e6f7e6";
            optionElement.style.color = "#2e7d32";
          } else {
            // Incorrectly selected option (red)
            optionElement.style.backgroundColor = "#ffebee";
            optionElement.style.color = "#c62828";
          }
          optionElement.style.borderRadius = "4px";
          optionElement.style.padding = "2px 5px";
        }
      });

      return <div dangerouslySetInnerHTML={{ __html: tempDiv.innerHTML }} />;
    }

    // Default return if sub_category doesn't match
    return (
      <div dangerouslySetInnerHTML={{ __html: blockData?.question_other }} />
    );
  };

  useEffect(() => {
    if (isModalOpen) {
      calculateScore();
    }
  }, [isModalOpen, blockData, studentAnswers, calculateScore]);

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
            {renderQuestionWithAnswers()}
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
                  <span>
                    {blockData?.sub_category === "CMA"
                      ? "MC, choose multiple answers [CMA]"
                      : blockData?.sub_category === "CSA"
                      ? "MC, choose single answers [CSA]"
                      : "R&W: Fill In The Blanks [RWFIB]"}
                  </span>
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

export default PTEReadingAnswer;
