import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AudioRecorder from "../Exam-Create/AudioRecorder";

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
    const parser = new DOMParser();
    const doc = parser.parseFromString(question, "text/html");

    const questionTags = ["select", "input", "textarea"];

    const temp = [];
    let questionPassage = "";

    // First tag
    const questionElements = doc.querySelectorAll(questionTags[0]);
    const numberOfElements = questionElements.length;

    if (numberOfElements !== 0) {
      questionElements.forEach((selectElements, index) => {
        const uniqueId = `${questionTags[0]}_${index + 1}`;
        temp.push(uniqueId);
        selectElements.id = uniqueId;
      });
    }

    // Second tag
    const inputElements = doc.querySelectorAll(questionTags[1]);
    const numberOfInputElements = inputElements.length;

    if (numberOfInputElements !== 0) {
      inputElements.forEach((inputElement, index) => {
        const uniqueId = `${questionTags[1]}_${index + 1}`;
        temp.push(uniqueId);
        inputElement.id = uniqueId;
      });
    }

    // Third tag
    const textareaElements = doc.querySelectorAll(questionTags[2]);
    const numberOfTextareaElements = textareaElements.length;

    if (numberOfTextareaElements !== 0) {
      textareaElements.forEach((textareaElement, index) => {
        const uniqueId = `${questionTags[2]}_${index + 1}`;
        temp.push(uniqueId);
        textareaElement.id = uniqueId;
      });
    }

    questionPassage += `<div class="mainContainer">${doc.documentElement.outerHTML}</div>`;

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
