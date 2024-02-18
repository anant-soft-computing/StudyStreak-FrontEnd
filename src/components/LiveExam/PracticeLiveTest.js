import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AudioRecorder from "../Exam-Create/AudioRecorder";
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
  const [timer, setTimer] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(true);
  const [fullPaper, setFullPaper] = useState([]);
  const [next, setNext] = useState(0);
  const [linkAnswer, setLinkAnswer] = useState(false);
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
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

  const handleAnswerLinking = (e, questionId, next) => {
    const { value, id } = e.target;

    const elementId = id.split("_")[0];

    const temp = [...examAnswer];
    temp[next].answers.map((item) => {
      if (item.questionId === id && elementId === "InputText") {
        const trimedValue = value.trim();
        item.answer = trimedValue;
      } else if (item.questionId === id) {
        item.answer = value;
      }
    });
    setExamAnswer(temp);
  };

  useEffect(() => {
    if (linkAnswer && examAnswer[next] && examAnswer[next].answers.length > 0) {
      setTimeout(() => {
        examAnswer[next].answers.forEach((item) => {
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
              handleAnswerLinking(e, item.questionId, next);
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

  const displayLeftContainer = (passage) => {
    // Replace this with your actual implementation
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: passage,
        }}
      ></div>
    );
  };

  const htmlContent = useMemo(() => {
    const question = examData?.question;
    if (!question) return;
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
        questionId: item,
        answer: "",
      };
    });

    const tempAnswerArr = [...examAnswer];

    if (!tempAnswerArr[next] || tempAnswerArr[next]?.answers.length === 0) {
      tempAnswerArr[next] = {
        testId: examData?.id,
        answers: tempAnswer,
      };
      setExamAnswer(tempAnswerArr);
    }
    setLinkAnswer(true);
    setUniqueIdArr(paginationsStrucutre);
    return questionPassage;
  }, [examData?.question]);

  const renderTime = useMemo(
    () => (
      <span>
        Time Left :
        <span className="lv-userName">
          {Math.floor(timer / 60)}:{timer % 60}
        </span>
      </span>
    ),
    [timer]
  );

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
        <div className="lv-container-title">{`${examData?.exam_type} / ${examData?.exam_name} / ${examData?.block_type} / ${examData?.difficulty_level}`}</div>
      </div>

      {/* Main Container */}
      <div>{renderAudio(examData?.audio_file)}</div>
      <div className="lv-main-container">
        {/* Left Container */}
        <div className="lv-left-container">
          {displayLeftContainer(examData?.passage)}
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
            {examData?.exam_type === "Speaking" && <AudioRecorder />}
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
                  examAnswer[next].answers.length > 0 &&
                  examAnswer[next].answers.find(
                    (val) => val.questionId === item
                  )?.answer !== ""
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
            onClick={() => {
              scrollToContent("yourContentId");
              toast.success("Your Exam Submit Successfully");
              navigate(`/eaxm-answere/${examData?.id}`);
            }}
            disabled={linkAnswer}
          >
            <span>&#x2713;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PracticeLiveExam;
