import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import SmallModal from "../UI/Modal";
import ajaxCall from "../../helpers/ajaxCall";
import DisplayLeftContainer from "../UI/DisplayPassage";
import { formatTime } from "../../utils/timer/formateTime";
import ReadingMTInstruction from "../Instruction/MiniTestInstruction/ReadingMTInstruction";
import ListeningMTInstruction from "../Instruction/MiniTestInstruction/ListeningMTInstruction";
import WritingMTInstruction from "../Instruction/MiniTestInstruction/WritingMTInstruction";
const Cheerio = require("cheerio");

const LiveExam = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const examId = useLocation()?.pathname?.split("/")?.[3];
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const [examData, setExamData] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [uniqueIdArr, setUniqueIdArr] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [numberOfWord, setNumberOfWord] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));
  const [instructionCompleted, setInstructionCompleted] = useState(false);
  let highlightedElement = null;

  const handleCompleteInstruction = () => setInstructionCompleted(true);

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
    (async () => {
      try {
        const response = await ajaxCall(
          `/exam-blocks/?exam_type=${examType}`,
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
          const examBlockWithNumbers = response?.data?.map(
            (examBlock, index) => ({
              ...examBlock,
              no: index + 1,
            })
          );
          const tempExamData = examBlockWithNumbers?.find(
            (examBlock) => examBlock?.id.toString() === examId
          );
          setExamData(tempExamData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examId, examType]);

  const examLastSubmit = async () => {
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
            exam_block: examId,
          }),
        },
        8000
      );
      if (response.status === 201) {
        console.log("Lastest Exam Submitted");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const gamificationSubmit = async () => {
    try {
      const response = await ajaxCall(
        "/gamification/points/",
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
            model: "Exam Block",
            object_id: parseInt(examId),
          }),
        },
        8000
      );
      if (response.status === 201) {
        toast.success("Points Updated Successfully 🚀 !!");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const examSubmit = async () => {
    const data = {
      student_id: studentId,
      exam_id: parseInt(examId),
      typetest: "Mock Test",
    };
    try {
      const response = await ajaxCall(
        "/student-mocktest-submit/",
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
        examLastSubmit();
        gamificationSubmit();
        toast.success("Your Exam Submitted Successfully");
      } else {
        toast.error("You Have Already Submitted This Exam");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  const handleWritingAnswer = (e, next) => {
    const answer = e.target.value;
    const temp = [...examAnswer];
    temp[next].answers[0].answer = answer;
    setExamAnswer(temp);

    // Count the number of words
    const words = answer.split(" ");
    setNumberOfWord(words.length);
  };

  const handleWritingSubmit = async () => {
    const answersArray = [];

    examAnswer[0].answers.forEach((answer, index) => {
      answersArray.push({
        question_number: index + 1,
        answer_text: answer.answer,
      });
    });

    // Call ChaGpt API for checking the answer
    const gptBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Analyze the following IELTS Writing Task 1 response according to the official IELTS assessment criteria. Be strict in your evaluation, and provide band scores in .5 increments (e.g., 3, 3.5, 4, 4.5, etc.)
  
          Assessment Criteria:
  
          Task 1:
  
          Task Achievement: Does the response fully address all parts of the task with a clear overview and well-developed details?
  
          Coherence and Cohesion: Is the information logically organized? Are a range of cohesive devices used appropriately and accurately?
  
          Lexical Resource: Is a wide range of vocabulary used accurately and appropriately, including less common lexical items?
  
          Grammatical Range and Accuracy: Are a variety of complex grammatical structures used accurately? Is punctuation used correctly?`,
        },
        {
          role: "user",
          content: `Questions: ${examData?.passage?.replace(
            /<img[^>]*>/g,
            ""
          )}`,
        },
        {
          role: "user",
          content: `Answers: ${examAnswer[0].answers[0].answer}`,
        },
        {
          role: "user",
          content: `Give band explanation as #Explanation:  
            
            Task Achievement: 
  
            Coherence and Cohesion:
  
            Lexical Resource:
  
            Grammatical Range and Accuracy:
            
            as #Band:bandValue`,
        },
      ],
    };

    try {
      let gptResponse;
      let bandValue;

      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_SECRET}`,
          },
          body: JSON.stringify(gptBody),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch from OpenAI API");
        }

        const data = await res.json();
        gptResponse = data?.choices?.[0]?.message?.content || "";

        // Extract band value using regex
        const bandMatch = gptResponse.match(/#Band:\s*(\d+(\.\d+)?)/);
        bandValue = bandMatch ? bandMatch[1] : null;
      } catch (error) {
        toast.error(
          "Error occurred while fetching data from AI. Please try again."
        );
        return;
      }

      const data = JSON.stringify({
        student_exam: answersArray,
        user: userData?.userId,
        exam: parseInt(examId),
        AI_Assessment: gptResponse,
        band: bandValue,
        exam_type: examData?.exam_type,
      });

      try {
        const response = await ajaxCall(
          `/studentanswerlistview/`,
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
          examSubmit();
          navigate(`/exam-answer/${examData?.id}`);
        } else if (response.status === 400) {
          toast.error("Please Submit Your Exam Answer");
        } else {
          toast.error("Some Problem Occurred. Please try again.");
        }
      } catch (error) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleRLSubmit = async () => {
    const answersArray = [];
    let bandValue = 0;

    examAnswer[0].answers.forEach((answer, index) => {
      answersArray.push({
        question_number: index + 1,
        answer_text: answer.answer,
      });
    });

    if (
      examData?.exam_type === "Reading" ||
      examData?.exam_type === "Listening"
    ) {
      let totalCorrect = 0;
      examAnswer[0]?.answers?.forEach((answer, index) => {
        const correctAnswer = examData?.answers[index]?.answer_text.trim();
        const studentAnswer = answer.answer.trim();

        if (correctAnswer?.includes(" OR ")) {
          const correctOptions = correctAnswer
            .split(" OR ")
            .map((option) => option.trim());
          if (correctOptions.includes(studentAnswer)) {
            totalCorrect++;
          }
        } else if (correctAnswer?.includes(" AND ")) {
          const correctOptions = correctAnswer
            .split(" AND ")
            .map((option) => option.trim());
          if (
            correctOptions.every((option) => studentAnswer.includes(option))
          ) {
            totalCorrect++;
          }
        } else {
          const correctAnswer = examData?.answers[index]?.answer_text;
          if (answer.answer === correctAnswer) {
            totalCorrect++;
          }
        }
      });

      if (
        examData?.exam_type === "Reading" ||
        examData?.exam_type === "Listening"
      ) {
        bandValue = totalCorrect;
      }
    }

    try {
      const data = JSON.stringify({
        student_exam: answersArray,
        user: userData?.userId,
        exam: parseInt(examId),
        band: bandValue,
        exam_type: examData?.exam_type,
      });

      const response = await ajaxCall(
        `/studentanswerlistview/`,
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
        examSubmit();
        navigate(`/exam-answer/${examData?.id}`);
      } else if (response.status === 400) {
        toast.error("Please Submit Your Exam Answer");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // Function to scroll to content
  const scrollToContent = (contentId) => {
    const container = containerRef.current;
    const contentElement = document.getElementById(contentId);

    if (highlightedElement) {
      highlightedElement.classList.remove("lv-highlight");
    }

    if (contentElement) {
      container.scrollTop = contentElement.offsetTop - container.offsetTop;
      contentElement.classList.add("lv-highlight");
      highlightedElement = contentElement;
    }
  };

  const renderAudio = (audio_file) => {
    if (audio_file) {
      return (
        <div className="m-2">
          <audio controls autoPlay controlsList="nodownload">
            <source src={audio_file} type="audio/mpeg" />
          </audio>
        </div>
      );
    } else {
      return <p></p>;
    }
  };

  const handleAnswerLinking = (e, questionId, next) => {
    const { value, id, name, checked } = e.target;

    const elementId = id.split("_")[0];

    const temp = [...examAnswer];
    let conditionSatisfied = false; // Initialize a flag to track if any condition is satisfied

    // is this a multipleTypeQuestions
    const isMultiQuestions = examAnswer[next]?.answers?.filter(
      (item) => item.questionId === id
    );

    if (isMultiQuestions?.length <= 1) {
      temp[next].answers.forEach((item) => {
        if (conditionSatisfied) return; // If a condition is already satisfied, exit the loop
        if (item.questionId === id && elementId === "InputText") {
          const trimedValue = value.trim();
          item.answer = trimedValue;
          conditionSatisfied = true; // Set the flag to true
        } else if (item.questionId === id && elementId === "Checkbox") {
          item.answer = checked ? value : "";
          conditionSatisfied = true; // Set the flag to true
        } else if (item.questionId === id) {
          item.answer = value;
          conditionSatisfied = true; // Set the flag to true
        }
      });

      setExamAnswer(temp);
    } else {
      const multipleTypeQuestions = checked
        ? examAnswer[next].answers.findIndex(
            (item) => item.questionId === id && item.answer === ""
          )
        : examAnswer[next].answers.findIndex(
            (item) => item.questionId === id && item.answer !== ""
          );
      if (multipleTypeQuestions !== -1) {
        temp[next].answers[multipleTypeQuestions].answer = checked ? value : "";
        setExamAnswer(temp);
      } else {
        const contentElements = document.querySelectorAll(`[id="${id}"]`);
        contentElements.forEach((element) => {
          const isAlreadyAnswered = isMultiQuestions.findIndex(
            (a) => a.answer === element.value
          );

          if (isAlreadyAnswered === -1) element.checked = false;
        });
      }
    }
  };

  useEffect(() => {
    if (
      instructionCompleted &&
      examAnswer[0] &&
      examAnswer[0].answers.length > 0
    ) {
      setTimeout(() => {
        // remove duplicate answers
        const uniqueAnswers = examAnswer[0].answers.filter((item, index) => {
          return (
            examAnswer[0].answers.findIndex(
              (obj) => obj.questionId === item.questionId
            ) === index
          );
        });
        uniqueAnswers.forEach((item) => {
          const contentElements = document.querySelectorAll(
            `[id="${item.questionId}"]`
          );
          if (item.answer !== "") {
            contentElements.forEach((element) => {
              element.value = item.answer;
            });
          }
          contentElements.forEach((element) => {
            element.addEventListener("change", (e) => {
              handleAnswerLinking(e, item.questionId, 0);
            });
          });
        });
      }, 500);
    }
  }, [instructionCompleted]);

  const htmlContent = useMemo(() => {
    const question = examData?.question_other || examData?.passage;
    if (!question) return;
    if (examData?.exam_type === "Writing") {
      const temp = [];
      temp.push({
        type: examData?.exam_type === "Writing" ? "Textarea" : "speaking_1",
        questionId:
          examData?.exam_type === "Writing" ? "Textarea_1" : "speaking_1",
      });

      const paginationsStrucutre = temp.flat();

      // Create questionPassage
      let questionPassage = `<div className="mainContainer">${question}</div>`;

      // Replace ♫ with unique symbols
      let serialNumber = 1;
      questionPassage = questionPassage.replaceAll(
        "++",
        () => `${serialNumber++}`
      );

      setUniqueIdArr(paginationsStrucutre);

      const tempAnswer = paginationsStrucutre.map((item) => {
        return {
          questionId: item,
          answer: "",
        };
      });

      const tempAnswerArr = [...examAnswer];

      if (!tempAnswerArr[0] || tempAnswerArr[0]?.answers.length === 0) {
        tempAnswerArr[0] = {
          testId: examData?.id,
          answers: tempAnswer,
        };
        setExamAnswer(tempAnswerArr);
      }

      return questionPassage;
    } else if (
      examData?.exam_type === "Reading" ||
      examData?.exam_type === "Listening"
    ) {
      const $ = Cheerio.load(question.toString());

      const questionTags = [
        "select",
        "textarea",
        "input[type='text'], input:not([type='radio'], [type='checkbox'])",
        "input[type='radio']",
        "input[type='checkbox']",
      ];

      const tagIds = ["Select", "Textarea", "InputText", "Radio", "Checkbox"];

      const temp = [];
      let questionPassage = "";

      questionTags.forEach((tag, tagIndex) => {
        // Find elements for current tag
        const elements = $(tag);
        const numberOfElements = elements.length;

        const radioCheckboxtypeQuestionsGroup = {};
        let uniqueId = "";

        if (numberOfElements !== 0) {
          let tagQuestions = {
            type: tagIds[tagIndex],
            paginationsIds: [],
          };
          elements.each((index, element) => {
            if (
              tag === "input[type='radio']" ||
              tag === "input[type='checkbox']"
            ) {
              const name = $(element).attr("name");
              if (!radioCheckboxtypeQuestionsGroup[name]) {
                radioCheckboxtypeQuestionsGroup[name] = [];
                uniqueId = `${tagIds[tagIndex]}_${index + 1}`;
                tagQuestions.paginationsIds.push(uniqueId);
              }
              $(element).attr("id", uniqueId);
              radioCheckboxtypeQuestionsGroup[name].push(element);
            } else {
              const uniqueId = `${tagIds[tagIndex]}_${index + 1}`;
              tagQuestions.paginationsIds.push(uniqueId);
              $(element).attr("id", uniqueId);
            }
          });
          temp.push(tagQuestions);
        }
      });

      let paginationsStrucutre = [];

      examData?.question_structure?.forEach((item, index) => {
        temp.forEach((element) => {
          if (element.type === item.type) {
            if (element.type === "Checkbox" && item?.isMultiQuestions) {
              const multipleTypeQuestionsGroup = element.paginationsIds.splice(
                0,
                1
              );
              paginationsStrucutre = [
                ...paginationsStrucutre,
                ...Array.from(
                  { length: item.numberOfQuestions },
                  () => multipleTypeQuestionsGroup
                ),
              ];
            } else if (element.type === item.type) {
              paginationsStrucutre.push(
                element.paginationsIds.splice(0, item.numberOfQuestions)
              );
            }
          }
        });
      });

      paginationsStrucutre = paginationsStrucutre.flat();

      // Create questionPassage
      questionPassage += `<div className="mainContainer">${$.html()}</div>`;

      // Replace ♫ with unique symbols
      let serialNumber = 1;
      questionPassage = questionPassage.replaceAll(
        "++",
        () => `${serialNumber++}`
      );

      const tempAnswer = paginationsStrucutre.map((item) => {
        return {
          questionId: item,
          answer: "",
        };
      });

      const tempAnswerArr = [...examAnswer];

      if (!tempAnswerArr[0] || tempAnswerArr[0]?.answers.length === 0) {
        tempAnswerArr[0] = {
          testId: examData?.id,
          answers: tempAnswer,
        };
        setExamAnswer(tempAnswerArr);
      }

      setUniqueIdArr(paginationsStrucutre);
      return questionPassage;
    }
  }, [examData?.question_other]);

  const reviewContent = () => (
    <div className="card-container">
      {examAnswer[0]?.answers.map((answer, index) => (
        <div key={index} className="card answer__width">
          <div className="card-body">
            <h6 className="card-title">Q. {index + 1}</h6>
            <h6 className="card-text">
              Answer : <span className="text-success">{answer.answer}</span>
            </h6>
          </div>
        </div>
      ))}
    </div>
  );

  return !instructionCompleted ? (
    <div className="test-instruction">
      {examData.exam_type === "Reading" && (
        <ReadingMTInstruction startTest={handleCompleteInstruction} />
      )}
      {examData.exam_type === "Listening" && (
        <ListeningMTInstruction startTest={handleCompleteInstruction} />
      )}
      {examData.exam_type === "Writing" && (
        <WritingMTInstruction startTest={handleCompleteInstruction} />
      )}
    </div>
  ) : (
    <>
      <div className="lv-navbar lv-navbar-responsive">
        <div className="lv-navbar-title">
          <h2>{examData?.exam_category}</h2>
          <div className="lv-userName">{userData?.username}</div>
          <div style={{ marginLeft: "10px" }}>/</div>
          <div className="lv-userName">{`${examData?.exam_name}`}</div>
        </div>
        <span className="lv-navbar-title">
          Time Taken :<span className="lv-userName">{formatTime(timer)}</span>
        </span>
        <div className="lv-navbar-title-mobile">
          <div className="username-mobile">
            <h2>{examData?.exam_category}</h2>
            <div className="mobile-breadcumb">
              <div className="lv-userName">{userData?.username}</div>
              <div style={{ margin: "15px 0px 0 10px" }}>/</div>
              <div className="lv-userName">{`${examData?.exam_name}`}</div>
            </div>
          </div>
          <div className="lv-navbar-footer">
            <span>
              Time Taken :
              <span className="lv-userName">{formatTime(timer)}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="lv-container">
        {/* Main Container */}
        {renderAudio(examData?.audio_file)}
        <div className="lv-main-container">
          {/* Left Container */}
          {(examData?.exam_type === "Reading" ||
            examData?.exam_type === "Writing") && (
            <div className="lv-left-container">
              <DisplayLeftContainer
                passage={examData?.passage}
                image={examData?.passage_image}
              />
            </div>
          )}
          {/* Right Container */}
          <div
            className="lv-right-container"
            id="right-container"
            ref={containerRef}
          >
            <div className="lv-box-right">
              {/* Replace the following with your actual content */}
              {(examData?.exam_type === "Reading" ||
                examData?.exam_type === "Listening") && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: htmlContent,
                  }}
                />
              )}
              {examData?.exam_type === "Writing" &&
                uniqueIdArr?.map((item, index) => {
                  return (
                    <div className="lv-textarea" key={index}>
                      <textarea
                        className="writing__textarea"
                        id={item}
                        value={examAnswer[0]?.answers[0]?.answer || ""}
                        onChange={(e) => handleWritingAnswer(e, 0)}
                      />
                      <span>Word Count : {numberOfWord}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center justify-content-md-between align-items-center mb-3 mt-2 flex-column flex-md-row">
          <div className="lv-question-pagination  justify-content-center d-flex justify-content-md-between align-items-center pb-1 w-100 mb-2 mb-md-0">
            <div className="lv-section-pagination">
              {uniqueIdArr?.map((item, index) => {
                return (
                  <div
                    className={`lv-footer-item ${
                      examAnswer[0].answers.length > 0 &&
                      examAnswer[0].answers[index].answer !== ""
                        ? "lv-completed-questions"
                        : ""
                    }`}
                    onClick={() => scrollToContent(item)}
                    key={index}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="lv-footer-btn">
            {(examData?.exam_type === "Reading" ||
              examData?.exam_type === "Listening") && (
              <button
                className="lv-footer-button review_size"
                onClick={() => setIsModalOpen(true)}
              >
                Review
              </button>
            )}
            <button
              className="lv-footer-button"
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
                <button
                  className="btn btn-success"
                  onClick={() => {
                    if (
                      examData?.exam_type === "Reading" ||
                      examData?.exam_type === "Listening"
                    ) {
                      handleRLSubmit();
                    } else if (examData?.exam_type === "Writing") {
                      handleWritingSubmit();
                    }
                  }}
                >
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
            <h5>Are You Sure You Want To Submit ?</h5>
            {reviewContent()}
          </SmallModal>
        )}
        {isModalOpen &&
          (examData?.exam_type === "Reading" ||
            examData?.exam_type === "Listening") && (
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
    </>
  );
};

export default LiveExam;
