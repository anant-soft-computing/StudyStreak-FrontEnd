import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AudioRecorder from "../Exam-Create/AudioRecorder";
const Cheerio = require("cheerio");

const LiveExam = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const examId = useLocation()?.pathname?.split("/")?.[2];
  const [examData, setExamData] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [linkAnswer, setLinkAnswer] = useState(false);
  const [uniqueIdArr, setUniqueIdArr] = useState([]);
  const [timer, setTimer] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(true);
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  let highlightedElement = null;

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  const stoppedTimeFormatted = `${minutes} : ${seconds}`;

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
  }, [examData]);

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
          `/exam-blocks/`,
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
  }, [examId]);

  const handleExamSubmit = () => {
    setTimerRunning(false);
    toast.success("Your Exam Submitted Successfully");
    navigate(`/eaxm-answere/${examData?.id}`, {
      state: { examAnswer, stoppedTimeFormatted },
    });
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

  const handleAnswerLinking = (e, questionId, next) => {
    const answer = e.target.value;
    const temp = [...examAnswer];
    temp[next].answers.map((item) => {
      if (item.questionId === questionId) {
        item.answer = answer;
      }
    });
    setExamAnswer(temp);
  };

  useEffect(() => {
    if (linkAnswer && examAnswer[0] && examAnswer[0].answers.length > 0) {
      setTimeout(() => {
        examAnswer[0].answers.forEach((item) => {
          const contentElement = document.getElementById(item.questionId);
          if (item.answer !== "") {
            document.getElementById(item.questionId).value = item.answer;
          }
          contentElement.addEventListener("change", (e) => {
            handleAnswerLinking(e, item.questionId, 0);
          });
        });
        setLinkAnswer(false);
      }, 500);
    }
  }, [linkAnswer, examAnswer]);

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

      if (numberOfElements !== 0) {
        elements.each((index, element) => {
          if (
            tag === "input[type='radio']" ||
            tag === "input[type='checkbox']"
          ) {
            const name = $(element).attr("name");
            if (!radioCheckboxtypeQuestionsGroup[name]) {
              radioCheckboxtypeQuestionsGroup[name] = [];
              const uniqueId = `${tagIds[tagIndex]}_${index + 1}`;
              temp.push(uniqueId);
              $(element).attr("id", uniqueId);
            }
            radioCheckboxtypeQuestionsGroup[name].push(element);
          } else {
            const uniqueId = `${tagIds[tagIndex]}_${index + 1}`;
            temp.push(uniqueId);
            $(element).attr("id", uniqueId);
          }
        });
      }
    });

    // Pagination logic
    const pageSize = 5; // Set your desired page size here
    const totalPages = Math.ceil(temp.length / pageSize);

    // Generate pagination markup
    let paginationHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<button onclick="goToPage(${i})">${i}</button>`;
    }

    // Display questions for the first page initially
    questionPassage += `<div class="mainContainer">${$.html()}</div>`;
    questionPassage += `<div class="pagination">${paginationHTML}</div>`;

    const tempAnswer = temp.map((item) => {
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
    setLinkAnswer(true);

    setUniqueIdArr(temp);
    return questionPassage;
  }, [examData?.question]);

  return (
    <>
      {/* Navbar */}
      <div className="lv-navbar">
        <div className="lv-navbar-title">
          <h2 style={{ color: "red", marginTop: "10px" }}>IELTS</h2>
          <div className="lv-userName">{userData?.username}</div>
        </div>
        <span>
          Time Left :
          <span className="lv-userName">
            {Math.floor(timer / 60)}:{timer % 60}
          </span>
        </span>
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
                className="lv-footer-item"
                onClick={() => scrollToContent(item)}
                key={index}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <button className="lv-footer-button" onClick={handleExamSubmit}>
          <span>&#x2713;</span>
        </button>
      </div>
    </>
  );
};

export default LiveExam;
