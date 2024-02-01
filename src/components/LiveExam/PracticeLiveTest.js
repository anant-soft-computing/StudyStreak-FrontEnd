import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AudioRecorder from "../Exam-Create/AudioRecorder";

const PracticeLiveExam = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const examId = useLocation()?.pathname?.split("/")?.[4];
  const [examData, setExamData] = useState([]);
  const [uniqueIdArr, setUniqueIdArr] = useState([]);
  const [timer, setTimer] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(true);
  const [fullPaper, setFullPaper] = useState([]);
  const [next, setNext] = useState(0);
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  let highlightedElement = null;

  useEffect(() => {
    console.log("userData", userData);
  }, [userData]);

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

  useEffect(() => {
    console.log("examData", examData);
  }, [examData]);

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

    setUniqueIdArr(temp);
    return questionPassage;
  }, [examData?.question]);

  return (
    <>
      {/* Navbar */}
      <div className="lv-navbar">
        <div className="lv-navbar-title">
          <h2 style={{ color: "red", marginTop: "10px" }}>IELTS</h2>
          <div className="lv-navbar-subtitle">{userData?.username}</div>
        </div>
        <div className="lv-navbar-right">
          <div>
            Time Left: {Math.floor(timer / 60)}:{timer % 60}
          </div>
        </div>
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
      <div className="lv-footer">
        <div className="lv-footer-text">
          <div className="lv-part-pagination"></div>
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
        </div>
        <button
          className="lv-footer-button"
          style={{
            display:
              next ===
              (fullPaper.length > 0 &&
                fullPaper?.[0][examType][examForm]?.length - 1)
                ? "none"
                : "block",
          }}
          onClick={() => {
            setNext(next + 1);
          }}
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
          }}
          onClick={() => {
            scrollToContent("yourContentId");
            toast.success("Your Exam Submit Successfully");
            navigate(`/eaxm-answere/${examData?.id}`);
          }}
        >
          <span className="lv-arrow">&#x2713;</span>
        </button>
      </div>
    </>
  );
};

export default PracticeLiveExam;
