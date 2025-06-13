import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../../../UI/Loading";
import SmallModal from "../../../../../../UI/Modal";
import ajaxCall from "../../../../../../../helpers/ajaxCall";
import { formatTime } from "../../../../../../../utils/timer/formateTime";
const Cheerio = require("cheerio");

const LivePTEROP = () => {
  const navigate = useNavigate();
  const examId = useLocation()?.pathname?.split("/")?.[5];
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const [timer, setTimer] = useState(0);
  const [examData, setExamData] = useState({});
  const [fullPaper, setFullPaper] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [htmlContents, setHtmlContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [next, setNext] = useState(0);
  const [linkAnswer, setLinkAnswer] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [droppedItems, setDroppedItems] = useState([]);

  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerRunning]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/ct/ielts/practice-test/${examId}/`,
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
          let filteredData = [response?.data];
          filteredData[0].IELTS[examForm] = filteredData[0].IELTS[
            examForm
          ].sort((a, b) => {
            const tempExamName1Array = a.exam_name.split(" ");
            const tempExamName2array = b.exam_name.split(" ");
            const tempExamName1 =
              tempExamName1Array[tempExamName1Array.length - 1];
            const tempExamName2 =
              tempExamName2array[tempExamName2array.length - 1];
            if (tempExamName1 > tempExamName2) {
              return 1;
            }
            if (tempExamName1 < tempExamName2) {
              return -1;
            }
            return 0;
          });
          setFullPaper(filteredData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [examForm, examId]);

  useEffect(() => {
    if (fullPaper?.length !== 0) {
      const examBlockWithNumbers = fullPaper?.[0][examType][examForm]?.map(
        (examBlock, index) => ({
          ...examBlock,
          no: index + 1,
        })
      );
      setExamData(examBlockWithNumbers[next]);
    }
  }, [examForm, examType, fullPaper, next]);

  useEffect(() => {
    const fetchCorrectAnswers = async () => {
      try {
        const response = await ajaxCall(
          `/practice-answers/${fullPaper?.[0]?.IELTS?.id}/`,
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

        if (
          response.status === 200 &&
          response.data?.correct_answers?.Reading
        ) {
          const currentCorrectAnswer =
            response.data.correct_answers.Reading.find(
              (item) => item.block_id === examData?.id
            )?.answers || [];
          setCorrectAnswer(currentCorrectAnswer);

          // Shuffle the answers for the current question
          const shuffled = [...currentCorrectAnswer].sort(
            () => Math.random() - 0.5
          );
          setShuffledAnswers(shuffled);

          // Reset dropped items for the new question
          setDroppedItems(Array(currentCorrectAnswer.length).fill(null));

          // Check if we have saved answers for this question
          if (examAnswer[next]?.data) {
            const savedDroppedItems = currentCorrectAnswer.map((_, idx) => {
              const savedAnswer = examAnswer[next].data.find(
                (item) => item.question_number === `para_${idx}`
              );
              return savedAnswer?.answer_text
                ? currentCorrectAnswer.find(
                    (ca) => ca.answer_text === savedAnswer.answer_text
                  )
                : null;
            });
            setDroppedItems(savedDroppedItems);

            // Update shuffled answers by removing the ones already dropped
            const remainingShuffled = shuffled.filter(
              (item) =>
                !savedDroppedItems.some(
                  (di) => di?.answer_text === item.answer_text
                )
            );
            setShuffledAnswers(remainingShuffled);
          }
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    if (fullPaper?.length && examData?.id) {
      fetchCorrectAnswers();
    }
  }, [examAnswer, examData?.id, fullPaper, next]);

  const fetchHtmlContent = async (paperData, index, tempQuestions) => {
    const question = paperData?.question_other;
    let tempAnswer = {};

    const $ = Cheerio.load(question.toString());

    // Extract paragraphs for re-order paragraphs
    const paragraphs = [];
    $("p").each((i, elem) => {
      paragraphs.push($(elem).text().trim());
    });

    const questionPassage = `<div className="mainContainer">${$.html()}</div>`;

    // Create answer structure for paragraphs
    const tempPaginationStructure = paragraphs.map((para, idx) => ({
      question_number: `para_${idx}`,
      answer_text: "",
      original_text: para,
    }));

    tempAnswer = {
      exam_id: paperData?.id,
      data: tempPaginationStructure,
    };

    return new Promise((resolve) => {
      resolve({ questionPassage, tempAnswer, paragraphs });
    });
  };

  useEffect(() => {
    (async () => {
      if (fullPaper?.length !== 0) {
        const examDataList = fullPaper?.[0][examType][examForm]?.map(
          (examBlock, index) => ({
            ...examBlock,
            no: index + 1,
          })
        );
        let tempHtmlContents = [];
        let tempExamAnswer = [];
        let tempQuestions = 1;
        for (let paper of examDataList) {
          const index = examDataList.indexOf(paper);
          const returnContent = await fetchHtmlContent(
            paper,
            index,
            tempQuestions
          );
          tempHtmlContents.push(returnContent.questionPassage);
          const tempUniqueArr = {
            name: `${index + 1}`,
            ...returnContent.tempAnswer,
          };
          tempExamAnswer.push(tempUniqueArr);
          tempQuestions =
            tempExamAnswer.map((item) => [...item.data]).flat().length + 1;
        }
        setHtmlContents(tempHtmlContents);
        setExamAnswer(tempExamAnswer);
        setLinkAnswer(!linkAnswer);
      }
    })();
  }, [fullPaper]);

  const handleDragStart = (e, answer, index) => {
    e.dataTransfer.setData("text/plain", answer);
    e.dataTransfer.setData("index", index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const answer = JSON.parse(e.dataTransfer.getData("text/plain"));
    const dragIndex = e.dataTransfer.getData("index");

    // If coming from source panel
    if (dragIndex) {
      const newShuffled = [...shuffledAnswers];
      const newDropped = [...droppedItems];

      // If dropping on an already filled slot, return that item to source
      if (newDropped[dropIndex]) {
        newShuffled.push(newDropped[dropIndex]);
      }

      // Remove from source and add to target
      newDropped[dropIndex] = newShuffled[dragIndex];
      newShuffled.splice(dragIndex, 1);

      setShuffledAnswers(newShuffled);
      setDroppedItems(newDropped);

      // Update exam answers
      updateExamAnswers(newDropped);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateExamAnswers = (newDropped) => {
    const updatedAnswers = [...examAnswer];
    updatedAnswers[next] = {
      ...updatedAnswers[next],
      data: newDropped.map((item, idx) => ({
        question_number: `para_${idx}`,
        answer_text: item ? item.answer_text : "",
        original_text: item ? item.original_text : "",
      })),
    };
    setExamAnswer(updatedAnswers);
  };

  const handleRemoveItem = (index) => {
    const newDropped = [...droppedItems];
    const itemToRemove = newDropped[index];

    if (itemToRemove) {
      const newShuffled = [...shuffledAnswers, itemToRemove];
      newDropped[index] = null;

      setShuffledAnswers(newShuffled);
      setDroppedItems(newDropped);
      updateExamAnswers(newDropped);
    }
  };

  const latestExamSubmit = async () => {
    try {
      const response = await ajaxCall(
        "/test-submission/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify({
            student: studentId,
            practise_set: fullPaper[0].IELTS.id,
          }),
        },
        8000
      );
      if (response.status === 201) {
        console.log("Latest Exam Submitted Successfully");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const submitExam = async () => {
    const data = {
      student_id: studentId,
      pt_id: parseInt(examId),
    };
    try {
      const response = await ajaxCall(
        "/student-pt-submit/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify(data),
        },
        8000
      );
      if (response.status === 200) {
        latestExamSubmit();
        toast.success("Your Exam Submitted Successfully");
      } else {
        toast.error("You Have Already Submitted This Exam");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  const handleSubmit = async () => {
    const answersArray = [];
    let bandValue = 0;

    examAnswer.forEach((item, index) => {
      const temp = item.data.map((answer, index2) => ({
        question_number: index2 + 1,
        answer_text: answer.answer_text,
      }));
      const tempObj = {
        exam_id: item.exam_id,
        data: temp,
      };
      answersArray.push(tempObj);
    });

    try {
      const data = JSON.stringify({
        answer_data: answersArray,
        user: userData?.userId,
        Practise_Exam: parseInt(fullPaper[0].IELTS.id),
        band: bandValue,
        exam_type: examForm,
      });

      const response = await ajaxCall(
        "/answer/practice-test/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: data,
        },
        8000
      );

      if (response.status === 201) {
        setTimerRunning(false);
        submitExam();
        navigate("/PTE/Reading");
      } else if (response.status === 400) {
        toast.error("Please Submit Your Exam Answer");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const reviewContent = () => (
    <div>
      {examAnswer.map((test, testIndex) => (
        <div>
          <h4>Test {testIndex + 1}</h4>
          <div className="card-container">
            {test.data.map((answer, answerIndex) => {
              return (
                <div key={answerIndex} className="card answer__width">
                  <div className="card-body">
                    <h6 className="card-text">
                      Paragraph {answerIndex + 1} :{" "}
                      <span className="text-success">
                        {answer?.answer_text}
                      </span>
                    </h6>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return isLoading ? (
    <div className="mt-4">
      <Loading />
    </div>
  ) : (
    <div
      style={{
        border: "1px solid #01579b",
        margin: "20px",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        maxWidth: "calc(100% - 40px)",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          borderBottom: "1px solid #01579b",
          padding: "20px",
          backgroundColor: "#01579b",
          color: "white",
          flexShrink: 0,
          borderRadius: "12px 12px 0 0",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "500" }}>
          {examData?.exam_category} / Re-order paragraphs
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <i className="icofont-stopwatch" style={{ fontSize: "20px" }}></i>
          <span>Timer:</span>
          <span style={{ fontWeight: "500" }}>{formatTime(timer)}</span>
        </div>
      </div>
      {/* Main content area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
          padding: "20px",
          gap: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "#333",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          The text boxes in the left panel have been placed in a random order.
          Restore the original order by dragging the text boxes from the left
          panel to the right panel.
        </div>
        {/* Responsive Source and Target containers */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
            gap: "20px",
            overflow: "hidden",
          }}
        >
          {/* Left panel - Source (shuffled paragraphs) */}
          <div
            style={{
              flex: 1,
              minHeight: "200px",
              overflowY: "auto",
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                fontWeight: "500",
                marginBottom: "15px",
                textAlign: "center",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              Source
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {shuffledAnswers.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "10px 15px",
                    border: "1px solid #01579b",
                    borderRadius: "5px",
                    cursor: "grab",
                    backgroundColor: "#f9f9f9",
                    transition: "background-color 0.3s ease",
                  }}
                  draggable="true"
                  onDragStart={(e) =>
                    handleDragStart(e, JSON.stringify(item), index)
                  }
                >
                  {item.answer_text}
                </div>
              ))}
            </div>
          </div>
          {/* Right panel - Target (drop zones) */}
          <div
            style={{
              flex: 1,
              minHeight: "200px",
              overflowY: "auto",
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              style={{
                fontWeight: "500",
                marginBottom: "15px",
                textAlign: "center",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              Target
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {correctAnswer.map((_, index) => (
                <div
                  key={index}
                  style={{
                    minHeight: "50px",
                    padding: "10px",
                    border: "2px dashed #01579b",
                    borderRadius: "5px",
                    backgroundColor: droppedItems[index]
                      ? "#e8f5e9"
                      : "#fff3e0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={handleDragOver}
                >
                  {droppedItems[index] ? (
                    <>
                      <span>{droppedItems[index].answer_text}</span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveItem(index)}
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <span style={{ color: "#9e9e9e" }}>
                      Drop paragraph here
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #ddd",
            borderBottom: "1px solid #ddd",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
            <div style={{ fontSize: "16px", fontWeight: "500" }}>
              Item {next + 1} of{" "}
              {fullPaper.length > 0
                ? fullPaper[0][examType][examForm]?.length
                : 0}
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                style={{
                  minWidth: "100px",
                  display: next === 0 ? "none" : "block",
                }}
                onClick={() => setNext(next - 1)}
              >
                <i className="icofont-arrow-left mr-2"></i>Previous
              </button>
              <button
                className="btn btn-primary btn-sm"
                style={{
                  minWidth: "100px",
                  display:
                    next ===
                    (fullPaper.length > 0 &&
                      fullPaper?.[0][examType][examForm]?.length - 1)
                      ? "none"
                      : "block",
                }}
                onClick={() => setNext(next + 1)}
              >
                Next
                <i className="icofont-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column flex-sm-row justify-content-between align-items-center"
          style={{
            padding: "20px",
            gap: "10px",
          }}
        >
          <button
            className="btn btn-primary btn-sm"
            style={{ minWidth: "100px" }}
            onClick={() => setIsModalOpen(true)}
          >
            <i className="icofont-eye-open mr-2"></i>
            Review
          </button>
          <button
            className="btn btn-primary btn-sm"
            style={{ minWidth: "100px" }}
            onClick={() => setIsConfirmModalOpen(true)}
          >
            Submit
          </button>
        </div>
      </div>
      {isConfirmModalOpen && (
        <SmallModal
          size="lg"
          centered
          isOpen={isConfirmModalOpen}
          footer={
            <div className="d-flex gap-2">
              <button className="btn btn-success" onClick={handleSubmit}>
                Yes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                No
              </button>
            </div>
          }
        >
          <h5>Are You Sure You Want To Submit?</h5>
          {reviewContent()}
        </SmallModal>
      )}
      {isModalOpen && (
        <SmallModal
          size="lg"
          centered
          title="Your Answers"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {reviewContent()}
        </SmallModal>
      )}
    </div>
  );
};

export default LivePTEROP;
