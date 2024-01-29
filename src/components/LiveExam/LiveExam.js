import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AudioRecorder from "../Exam-Create/AudioRecorder";

const LiveExam = () => {
  const containerRef = useRef(null);
  const examId = useLocation()?.pathname?.split("/")?.[2];
  const [examData, setExamData] = useState([]);
  const [uniqueIdArr, setUniqueIdArr] = useState([]);
  let highlightedElement = null;

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/examlistfilterview/?block_type=Practice`,
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
              // exam_type: "Writing",
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
          <h2 style={{ color: "red" }}>IELTS</h2>
          <div className="lv-navbar-subtitle">
            <h4 style={{ marginTop: "5px", marginBottom: "5px" }}>
              Test taker ID
            </h4>
            <span>
              2 years, 11 months, 6 days, 3 hours, 40 minutes remaining
              Connected
            </span>
          </div>
        </div>
        <div className="lv-navbar-right">
          <h4>Wifi</h4>
          <h4>&#128276;</h4> {/* Notification Bell Icon */}
          <h4>&#9776;</h4> {/* Menu Icon */}
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
          onClick={() => {
            scrollToContent("yourContentId");
            toast.success("Your Exam Submit Successfully");
          }}
        >
          <span className="lv-arrow">&#x2713;</span>
        </button>
      </div>
    </>
  );
};

export default LiveExam;
