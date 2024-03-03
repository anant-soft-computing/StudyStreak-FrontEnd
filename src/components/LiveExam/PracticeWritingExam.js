import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";

const PracticeLiveExam = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const examId = useLocation()?.pathname?.split("/")?.[4];
  const [examData, setExamData] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [timer, setTimer] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(true);
  const [fullPaper, setFullPaper] = useState([]);
  const [next, setNext] = useState(0);
  const [numberOfWord, setNumberOfWord] = useState(0);
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const timeTaken = `${Math.floor(timer / 60)}:${timer % 60}`;

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

  const renderTime = useMemo(
    () => (
      <span>
        Time Left :<span className="lv-userName">{timeTaken}</span>
      </span>
    ),
    [timer]
  );

  useEffect(() => {
    const temp = [...examAnswer];
    temp[next] = {
      exam_id: examData?.id,
      data: [
        {
          question_number: `textarea_${next}`,
          answer_text: (temp[next] && temp[next]?.data[0]?.answer_text) || "",
        },
      ],
    };
    setExamAnswer(temp);

    const words = temp[next]?.data[0]?.answer_text.split(" ");
    setNumberOfWord(words.length);
  }, [next]);

  const handleWritingAnswer = (e, next) => {
    const answer_text = e.target.value;
    const temp = [...examAnswer];
    temp[next].data[0].answer_text = answer_text;
    setExamAnswer(temp);

    // Count the number of words
    const words = answer_text.split(" ");
    setNumberOfWord(words.length);
  };

  const handleWritingSubmit = async () => {
    const answersArray = [];
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

    try {
      const data = JSON.stringify({
        answer_data: answersArray,
        user: userData?.userId,
        Practise_Exam: parseInt(fullPaper[0].IELTS.id),
        band: null,
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
        navigate(`/eaxm-answere/${examData?.id}`, {
          state: { examAnswer, timeTaken, bandValue: 0, examData },
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
            {examData?.exam_type === "Writing" && (
              <div className="lv-textarea">
                <textarea
                  id={`textarea_${next}`}
                  style={{ width: "100%", height: "200px" }}
                  value={examAnswer[next]?.data[0]?.answer_text || ""}
                  onChange={(e) => handleWritingAnswer(e, next)}
                />
                <span>{numberOfWord} Words</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="d-flex justify-content-between">
        <div className="lv-question-pagination"></div>
        <div className="lv-footer-btn">
          <button
            className="lv-footer-button"
            style={{
              display: next === 0 ? "none" : "block",
            }}
            onClick={() => {
              setNext(next - 1);
            }}
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
            onClick={handleWritingSubmit}
          >
            <span>&#x2713;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PracticeLiveExam;
