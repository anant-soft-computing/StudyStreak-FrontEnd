import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AudioRecorder from "../Exam-Create/AudioRecorder";
import Modal from "react-bootstrap/Modal";
import readingBandValues from "../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../utils/bandValues/listeningBandValues";
const Cheerio = require("cheerio");

const PracticeLiveExam = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const examId = useLocation()?.pathname?.split("/")?.[4];
  const [examData, setExamData] = useState([]);
  const [uniqueIdArr, setUniqueIdArr] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [timer, setTimer] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullPaper, setFullPaper] = useState([]);
  const [next, setNext] = useState(0);
  const [linkAnswer, setLinkAnswer] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState("");
  const timeTaken = `${Math.floor(timer / 60)}:${timer % 60}`;
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));
  let highlightedElement = null;

  useEffect(() => {
    if (
      examData?.exam_type === "Reading" ||
      examData?.exam_type === "Writing"
    ) {
      setTimer(60 * 60);
    } else if (examData?.exam_type === "Listening") {
      setTimer(30 * 60);
    } else if (examData?.exam_type === "Speaking") {
      setTimer(15 * 60);
    }
  }, [examId]);

  useEffect(() => {
    let interval;

    if (timerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerRunning]);

  useEffect(() => {
    if (timer === 0) {
      setTimerRunning(false);
      toast.error("Time's up! Your exam has ended.");
    }
  }, [timer]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/createexamview/`,
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
          const filteredData = response?.data?.filter(
            (examBlock) => examBlock?.id.toString() === examId.toString()
          );
          setFullPaper(filteredData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examId]);

  useEffect(() => {
    (async () => {
      if (
        (examForm === "Reading" || examForm === "Listening") &&
        fullPaper?.length !== 0
      ) {
        try {
          const response = await ajaxCall(
            `/practice-answers/${fullPaper[0].IELTS.id}`,
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
            let correctAnswers;
            if (examForm === "Reading") {
              correctAnswers = response.data?.correct_answers.Reading.map(
                (item) => ({
                  exam_id: item.block_id,
                  data: item.answers,
                })
              );
            } else if (examForm === "Listening") {
              correctAnswers = response.data?.correct_answers.Listening.map(
                (item) => ({
                  exam_id: item.block_id,
                  data: item.answers,
                })
              );
            }

            setCorrectAnswers(correctAnswers);
          } else {
            console.log("error");
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    })();
  }, [fullPaper]);

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
  }, [fullPaper, next]);

  const handleAnswerLinking = (e, question_number, next) => {
    const { value, id } = e.target;

    const elementId = id.split("_")[0];

    const temp = [...examAnswer];
    temp[next].data.map((item) => {
      if (item.question_number === id && elementId === "InputText") {
        const trimedValue = value.trim();
        item.answer_text = trimedValue;
      } else if (item.question_number === id) {
        item.answer_text = value;
      }
    });
    setExamAnswer(temp);
  };

  useEffect(() => {
    if (linkAnswer && examAnswer[next] && examAnswer[next].data.length > 0) {
      setTimeout(() => {
        examAnswer[next].data.forEach((item) => {
          const contentElements = document.querySelectorAll(
            `[id="${item.question_number}"]`
          );
          if (item.answer_text !== "") {
            contentElements.forEach((element) => {
              element.value = item.answer_text;
            });
          }
          contentElements.forEach((element) => {
            element.addEventListener("change", (e) => {
              handleAnswerLinking(e, item.question_number, next);
            });
          });
        });
        setLinkAnswer(false);
      }, 500);
    }
  }, [linkAnswer, examAnswer]);

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
    // Replace this with your actual implementation
    if (audio_file) {
      return (
        <div>
          <audio controls autoPlay>
            <source src={audio_file} type="audio/mpeg" />
          </audio>
        </div>
      );
    } else {
      return <p></p>;
    }
  };

  const displayLeftContainer = (passage, image) => {
    // Replace this with your actual implementation
    return (
      <>
        {image && (
          <img
            className="mb-2"
            src={image}
            alt="Study Streak"
            height={250}
            width={250}
          />
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: passage,
          }}
        ></div>
      </>
    );
  };

  const htmlContent = useMemo(() => {
    const question = examData?.question;
    if (
      examData?.exam_type === "Writing" ||
      examData?.exam_type === "Speaking"
    ) {
      const temp = [...examAnswer];
      temp[next] = {
        exam_id: examData?.id,
        data: [
          {
            question_number:
              examData?.exam_type === "Writing"
                ? `textarea_${next}`
                : `speaking_${next}`,
            answer_text: (temp[next] && temp[next]?.data[0]?.answer_text) || "",
          },
        ],
      };
      setExamAnswer(temp);
      setLinkAnswer(true);
      if (examData?.exam_type === "Writing") {
        setUniqueIdArr([`textarea_${next}`]);
      } else {
        setUniqueIdArr([`speaking_${next}`]);
      }
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
            paginationsStrucutre.push(
              element.paginationsIds.splice(0, item.numberOfQuestions)
            );
          }
        });
      });

      paginationsStrucutre = paginationsStrucutre.flat();

      // Display questions for the first page initially
      questionPassage += `<div class="mainContainer">${$.html()}</div>`;

      const tempAnswer = paginationsStrucutre.map((item) => {
        return {
          question_number: item,
          answer_text: "",
        };
      });

      const tempAnswerArr = [...examAnswer];

      if (!tempAnswerArr[next] || tempAnswerArr[next]?.data.length === 0) {
        tempAnswerArr[next] = {
          exam_id: examData?.id,
          data: tempAnswer,
        };
        setExamAnswer(tempAnswerArr);
      }
      setLinkAnswer(true);
      setUniqueIdArr(paginationsStrucutre);
      return questionPassage;
    }
  }, [examData?.question]);

  const renderTime = useMemo(
    () => (
      <span>
        Time Left :<span className="lv-userName">{timeTaken}</span>
      </span>
    ),
    [timer]
  );

  const practiceTestSubmit = async () => {
    const data = {
      student_id: studentId,
      exam_id: parseInt(examId),
      typetest: "Practice",
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
        toast.success("Your Exam Submitted Successfully");
      } else {
        toast.error("You Have All Ready Submitted This Exam");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  const handleRLSubmit = async () => {
    const answersArray = [];
    let bandValue = null;
    let isAllAnswered = true;

    examAnswer.forEach((item, index) => {
      const temp = item.data.map((answer, index2) => {
        if (answer.answer_text === "") isAllAnswered = false;

        return {
          question_number: index2 + 1,
          answer_text: answer.answer_text,
        };
      });
      const tempObj = {
        exam_id: item.exam_id,
        data: temp,
      };
      answersArray.push(tempObj);
    });

    if (!isAllAnswered) {
      toast.error("Please answer all the questions before submitting.");
      return;
    }
    if (examForm === "Reading" || examForm === "Listening") {
      let totalCorrect = 0;
      correctAnswers.forEach((correctAns, index) => {
        const tempExamAnswer = examAnswer[index];
        correctAns.data.forEach((correct, idx) => {
          if (correct.answer_text === tempExamAnswer.data[idx].answer_text) {
            totalCorrect += 1;
          }
        });
      });

      if (examForm === "Reading") {
        bandValue = readingBandValues[totalCorrect];
      } else if (examForm === "Listening") {
        bandValue = listeningBandValues[totalCorrect];
      }
    }

    try {
      const data = JSON.stringify({
        answer_data: answersArray,
        user: userData?.userId,
        Practise_Exam: parseInt(fullPaper[0].IELTS.id),
        band: bandValue,
        exam_type: examForm,
      });

      const response = await ajaxCall(
        `/answer/practice-test/`,
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
        practiceTestSubmit();
        navigate(`/eaxm-practice-test-answere/${examId}`, {
          state: { timeTaken, bandValue, examForm },
        });
      } else if (response.status === 400) {
        toast.error("Please Submit Your Exam Answer");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (recordedFilePath) {
      const tempExamAnswer = [...examAnswer];
      tempExamAnswer[next].data[0].answer_text = recordedFilePath;
      setExamAnswer(tempExamAnswer);
    }
  }, [recordedFilePath]);

  return (
    <>
      {/* Navbar */}
      <div className="lv-navbar">
        <div className="lv-navbar-title">
          <h2 style={{ color: "red", marginTop: "10px" }}>IELTS</h2>
          <div className="lv-userName">{userData?.username}</div>
        </div>
        {renderTime}
      </div>

      {/* Static Container */}
      <div className="lv-container">
        <div className="lv-container-title">{`${examData?.exam_type} / ${examData?.exam_name} / Practice Test / ${examData?.difficulty_level}`}</div>
      </div>

      {/* Main Container */}
      <div>{renderAudio(examData?.audio_file)}</div>
      <div className="lv-main-container">
        {/* Left Container */}
        <div className="lv-left-container">
          {displayLeftContainer(examData?.passage, examData?.passage_image)}
        </div>

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
            {examData?.exam_type === "Writing" && (
              <CKEditor
                editor={ClassicEditor}
                data=""
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
              />
            )}
            {examData?.exam_type === "Speaking" && (
              <AudioRecorder
                setRecordedFilePath={setRecordedFilePath}
                next={next}
                exam_id={examData?.id}
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="d-flex justify-content-between">
        <div className="lv-question-pagination">
          {uniqueIdArr?.map((item, index) => {
            return (
              <div
                className={`lv-footer-item ${
                  examAnswer[next] &&
                  examAnswer[next].data.length > 0 &&
                  examAnswer[next].data.find(
                    (val) => val.question_number === item
                  )?.answer_text !== ""
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
        <div className="lv-footer-btn">
          {(examData?.exam_type === "Reading" ||
            examData?.exam_type === "Listening") && (
            <button
              className="lv-footer-button"
              style={{ fontSize: "20px" }}
              onClick={() => setIsModalOpen(true)}
            >
              Review
            </button>
          )}
          <button
            className="lv-footer-button"
            style={{
              display: next === 0 ? "none" : "block",
              cursor: linkAnswer ? "not-allowed" : "pointer",
              opacity: linkAnswer ? 0.5 : 1,
            }}
            onClick={() => {
              setNext(next - 1);
            }}
            disabled={linkAnswer}
          >
            <span>Back</span>
          </button>
          <button
            className="lv-footer-button"
            style={{
              display:
                next ===
                (fullPaper.length > 0 &&
                  fullPaper?.[0][examType][examForm]?.length - 1)
                  ? "none"
                  : "block",
              cursor: linkAnswer ? "not-allowed" : "pointer",
              opacity: linkAnswer ? 0.5 : 1,
            }}
            onClick={() => {
              setNext(next + 1);
            }}
            disabled={linkAnswer}
          >
            <span>&#10152;</span>
          </button>
          <button
            className="lv-footer-button"
            style={{
              display:
                next !==
                (fullPaper.length > 0 &&
                  fullPaper?.[0][examType][examForm]?.length - 1)
                  ? "none"
                  : "block",
              cursor: linkAnswer ? "not-allowed" : "pointer",
              opacity: linkAnswer ? 0.5 : 1,
            }}
            onClick={handleRLSubmit}
            disabled={linkAnswer}
          >
            <span>&#x2713;</span>
          </button>
        </div>
      </div>
      {isModalOpen &&
        (examData?.exam_type === "Reading" ||
          examData?.exam_type === "Listening") && (
          <Modal
            size="lg"
            show={isModalOpen}
            onHide={() => setIsModalOpen(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Your Answers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {examAnswer.map((test, index) => (
                  <div key={index}>
                    <h4>Test : {index + 1}</h4>
                    <div className="card-container">
                      {test.data.map((answer, idx) => (
                        <div
                          key={idx}
                          className="card"
                          style={{ maxWidth: "30%" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Q. {idx + 1}</h6>
                            <h6 className="card-text">
                              Answer :{" "}
                              <span className="text-success">
                                {answer.answer_text}
                              </span>
                            </h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal>
        )}
    </>
  );
};

export default PracticeLiveExam;
