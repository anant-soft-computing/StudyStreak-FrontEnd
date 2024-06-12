import React, { useCallback, useEffect, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import AudioRecorder from "../Exam-Create/AudioRecorder2";
import { htmlToText } from "html-to-text";
import SpeakingInstruction from "./Instruction/SpeakingInstruction";

const initialSpeakingSingleQuesionState = {
  // 0 for incoming, 1 for instruction on screen, 2 for completed
  status: 0,
  filePath: "",
};

const LiveSpeakingExam = () => {
  const navigate = useNavigate();
  const examId = useLocation()?.pathname?.split("/")?.[3];
  const [examData, setExamData] = useState({});
  const [timer, setTimer] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(true);
  const [recordedFilePath, setRecordedFilePath] = useState("");
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));
  const synth = window.speechSynthesis;
  const [speaking, setSpeaking] = useState([initialSpeakingSingleQuesionState]);
  const [instructionCompleted, setInstructionCompleted] = useState(false);

  const handleCompleteInstruciton = () => setInstructionCompleted(true);

  useEffect(() => {
    setTimer(15 * 60);
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

  const examSubmit = async () => {
    const data = {
      student_id: studentId,
      speakingblock_id: parseInt(examId),
    };
    try {
      const response = await ajaxCall(
        "/student-speakingblock-submit/",
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
      if (response.status === 201) {
        toast.success("Your Exam Submitted Successfully");
      } else {
        toast.error("You Have All Ready Submitted This Exam");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/speaking-block/${examId}`,
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
          setExamData(response.data);
          const tempSepakinQuesitons = Array.from(
            { length: response.data.questions.length || 0 },
            () => initialSpeakingSingleQuesionState
          );
          setSpeaking(tempSepakinQuesitons);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examId]);

  useEffect(() => {
    if (recordedFilePath) {
      const { recorderIndex, filePath } = recordedFilePath;
      const tempSpeaking = [...speaking];
      tempSpeaking[recorderIndex].status = 1;
      tempSpeaking[recorderIndex].filePath = filePath;
      setSpeaking(tempSpeaking);
      setRecordedFilePath(null);
    }
  }, [recordedFilePath]);

  const extractVisibleText = (htmlContent) => {
    return htmlToText(htmlContent);
  };

  const speak = (speakingContent, i) => {
    const utterance = new SpeechSynthesisUtterance(
      extractVisibleText(speakingContent)
    );
    synth.speak(utterance);
    const updatedSpeaking = speaking.map((item, index) => {
      if (index === i) {
        return { ...item, status: 1 };
      } else {
        return item;
      }
    });
    setSpeaking(updatedSpeaking);

    utterance.onend = () => {
      const updatedSpeaking = speaking.map((item, index) => {
        if (index === i) {
          return { ...item, status: 2 };
        } else {
          return item;
        }
      });
      setSpeaking(updatedSpeaking);
    };
  };

  const stopSpeaking = () => {
    if (synth.speaking) {
      synth.cancel();
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", stopSpeaking);
    let tempSpeaking = [...speaking];
    tempSpeaking = tempSpeaking.map((item) => {
      return { ...item, status: 0 };
    });
    setSpeaking(tempSpeaking);

    return () => {
      window.removeEventListener("beforeunload", stopSpeaking);
      stopSpeaking(0);
    };
  }, []);

  useEffect(() => {
    const isAllAnswered = speaking.every((item) => item.filePath !== "");
    if (isAllAnswered) {
      examSubmit();
      setTimeout(() => navigate(`/mockTest`), 3000);
    }
  }, [speaking]);

  const recorderContainer = useCallback(
    (item, i) => {
      return (
        <AudioRecorder
          setRecordedFilePath={setRecordedFilePath}
          next={0}
          exam={examData}
          enableRecording={speaking?.[i]?.status === 2}
          completed={speaking?.[i]?.filePath !== ""}
          question_number={item.question_number}
          user={userData.userId}
          recorderIndex={i}
        />
      );
    },
    [speaking, examData, userData]
  );

  return !instructionCompleted ? (
    <div className="test-instruction">
      <SpeakingInstruction
        testType="Mini"
        startTest={handleCompleteInstruciton}
      />
    </div>
  ) : (
    <>
      <div className="lv-navbar lv-navbar-responsive">
        <div className="lv-navbar-title">
          <h2>{examData?.exam_category}</h2>
          <div className="lv-userName">{userData?.username}</div>
          <div style={{ marginLeft: "10px" }}>/</div>
          <div className="lv-userName">{`${examData?.name}`}</div>
        </div>
        <span className="lv-navbar-title">
          Time Taken :
          <span className="lv-userName">
            {Math.floor(timer / 60)} : {timer % 60}
          </span>
        </span>
        <div className="lv-navbar-title-mobile">
          <div className="username-mobile">
            <h2>{examData?.exam_category}</h2>
            <div className="mobile-breadcumb">
              <div className="lv-userName">{userData?.username}</div>
              <div style={{ margin: "15px 0px 0 10px" }}>/</div>
              <div className="lv-userName">{`${examData?.name}`}</div>
            </div>
          </div>
          <div className="lv-navbar-footer">
            <span>
              Time Taken :
              <span className="lv-userName">
                {Math.floor(timer / 60)} : {timer % 60}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="lv-container">
        {/* Main Container */}
        <div className="lv-main-container" style={{ maxHeight: "max-content" }}>
          {/* Left Container */}
          <div
            className="lv-left-container"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {Object.keys(examData).length > 0 &&
              examData.questions.map((item, i) => (
                <div className="lv-question-container">
                  <div className="lv-speaking-question">
                    <p> {i + 1} : </p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.question,
                      }}
                    ></div>
                  </div>
                  <div className="d-flex align-items-center lv-btn-mic-container">
                    <button
                      className="lv-footer-button lv-speaking-button"
                      onClick={() => speak(item.question, i)}
                      disabled={speaking?.[i]?.status === 1}
                      style={{
                        opacity: speaking?.[i]?.status === 1 ? 0.5 : 1,
                        cursor:
                          speaking?.[i]?.status === 1
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      {speaking?.[i]?.status === 2 ? "Replay" : "Start"}
                    </button>
                    <hr />
                    {recorderContainer(item, i)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveSpeakingExam;
