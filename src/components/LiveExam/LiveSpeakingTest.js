import React, { useCallback, useEffect, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import AudioRecorder from "../Exam-Create/AudioRecorder2";
import { convert } from "html-to-text";
import SpeakingMTInstruction from "../Instruction/MiniTestInstruction/SpeakingMTInstruction";
import { formatTime } from "../../utils/timer/formateTime";

const initialSpeakingSingleQuestionState = {
  // 0 for incoming, 1 for instruction on screen, 2 for completed
  status: 0,
  filePath: "",
};

const LiveSpeakingExam = () => {
  const navigate = useNavigate();
  const examId = useLocation()?.pathname?.split("/")?.[3];
  const [examData, setExamData] = useState({});
  const [voices, setVoices] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [recordedFilePath, setRecordedFilePath] = useState("");
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));
  const synth = window.speechSynthesis;
  const [speaking, setSpeaking] = useState([
    initialSpeakingSingleQuestionState,
  ]);
  const [activeRecordingIndex, setActiveRecordingIndex] = useState(null);
  const [instructionCompleted, setInstructionCompleted] = useState(false);
  const containerRef = useRef(null);
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
            speaking_block: examId,
          }),
        },
        8000
      );
      if (response.status === 201) {
        setTimerRunning(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const examSubmit = async () => {
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
          body: JSON.stringify({
            student_id: studentId,
            speakingblock_id: parseInt(examId),
          }),
        },
        8000
      );
      if (response.status === 201) {
        examLastSubmit();
        toast.success("Your Exam Submitted Successfully");
      } else {
        toast.error("You Have Already Submitted This Exam");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/speaking-block/${examId}/`,
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
          const tempSpeakingQuestions = Array.from(
            { length: response.data.questions.length || 0 },
            () => initialSpeakingSingleQuestionState
          );
          setSpeaking(tempSpeakingQuestions);
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

      // Mark current question as completed
      tempSpeaking[recorderIndex].status = 2;
      tempSpeaking[recorderIndex].filePath = filePath;

      // If there's a next question, prepare it for play
      if (recorderIndex + 1 < tempSpeaking.length) {
        tempSpeaking[recorderIndex + 1].status = 0;
      }

      setSpeaking(tempSpeaking);
      setRecordedFilePath(null);
    }
  }, [recordedFilePath]);

  const options = {
    wordwrap: false,
    ignoreHref: true,
    ignoreImage: true,
    preserveNewlines: true,
  };

  const extractVisibleText = (htmlContent) => {
    const text = convert(htmlContent, options);
    return text.replace(/\n+/g, ". ").trim();
  };

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    // Fetch voices when they are loaded
    synth.onvoiceschanged = fetchVoices;
    fetchVoices();
  }, [synth]);

  const speak = (speakingContent, i) => {
    const utterances = extractVisibleText(speakingContent).split(". ");
    utterances.forEach((text, index) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;

      // Select "Google UK English Male" voice
      const ukMaleVoice = voices.find(
        (voice) =>
          voice.name === "Google UK English Male" && voice.lang === "en-GB"
      );

      if (ukMaleVoice) {
        utterance.voice = ukMaleVoice;
      }

      synth.speak(utterance);

      if (index === utterances.length - 1) {
        utterance.onend = () => {
          const updatedSpeaking = speaking.map((item, idx) => {
            if (idx === i) {
              return { ...item, status: 2 }; // Mark as completed
            } else {
              return item;
            }
          });
          setSpeaking(updatedSpeaking);
        };
      }
    });

    // Update speaking state to reflect that the current question is being spoken
    const updatedSpeaking = speaking.map((item, index) => {
      if (index === i) {
        return { ...item, status: 1 };
      } else {
        return item;
      }
    });
    setSpeaking(updatedSpeaking);
  };

  const stopSpeaking = (questionId) => {
    if (synth.speaking) {
      synth.cancel();
    }
    // Update the status to stopped
    const updatedSpeaking = speaking.map((item, index) => {
      if (index === questionId) {
        return { ...item, status: 3 };
      } else {
        return item;
      }
    });
    setSpeaking(updatedSpeaking);
  };
  
  useEffect(() => {
    const isAllAnswered = speaking.every((item) => item.filePath !== "");
    if (isAllAnswered) {
      examSubmit();
      navigate(`/assessment/${examId}`, { state: { examType: "Speaking" } });
    }
  }, [speaking]);

  const handleReplay = (speakingContent, questionId) => {
    speak(speakingContent, questionId);
  };

  const scrollToQuestion = (index) => {
    if (containerRef.current) {
      const questionElement = containerRef.current.children[index];
      if (questionElement) {
        if (highlightedElement) {
          highlightedElement.style.backgroundColor = "";
        }
        questionElement.scrollIntoView({ behavior: "smooth", block: "start" });
        questionElement.style.backgroundColor = "#ffffcc";
        highlightedElement = questionElement;
      }
    }
  };

  const recorderContainer = useCallback(
    (item, i) => {
      return (
        <AudioRecorder
          setRecordedFilePath={setRecordedFilePath}
          next={0}
          exam={examData}
          enableRecording={
            speaking?.[i]?.status === 2 || speaking[i].status === 3
          }
          completed={speaking?.[i]?.filePath !== ""}
          question_number={item.question_number}
          user={userData.userId}
          recorderIndex={i}
          setActiveRecordingIndex={setActiveRecordingIndex}
          isActiveRecording={activeRecordingIndex === i}
        />
      );
    },
    [speaking, examData, userData, activeRecordingIndex]
  );

  // disable/enable play buttons based on status
  const renderPlayButton = (item, i) => {
    const isDisabled =
      speaking[i].status === 1 || // Currently speaking
      speaking.some((s, index) => index !== i && s.status === 1) || // Another question is speaking
      (i > 0 && speaking[i - 1].status !== 2) || // Previous question not completed
      activeRecordingIndex !== null; // Recording is active

    return (
      <button
        className="lv-footer-button lv-speaking-button"
        onClick={() =>
          speaking[i].status === 2
            ? handleReplay(item.question, i)
            : speak(item.question, i)
        }
        disabled={isDisabled}
        style={{
          opacity: isDisabled ? 0.5 : 1,
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
      >
        {speaking[i].status === 2 ? "Replay" : "Play"}
      </button>
    );
  };

  return !instructionCompleted ? (
    <div className="test-instruction">
      <SpeakingMTInstruction startTest={handleCompleteInstruction} />
    </div>
  ) : (
    <>
      <div className="lv-navbar lv-navbar-responsive">
        <div className="lv-navbar-title">
          <h2>{examData?.exam_category}</h2>
          <div className="lv-userName">{userData?.username}</div>
          <div style={{ marginLeft: "10px" }}>/</div>
          <div className="lv-userName">{examData?.name}</div>
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
              <div className="lv-userName">{examData?.name}</div>
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
        <div
          ref={containerRef}
          className="lv-left-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {Object.keys(examData).length > 0 &&
            examData.questions.map((item, i) => (
              <div className="lv-question-container" key={item?.id}>
                <div className="lv-speaking-question" style={{ flex: 1 }}>
                  <p> {i + 1} :</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.question,
                    }}
                  />
                </div>
                <div className="d-flex align-items-center lv-btn-mic-container">
                  {renderPlayButton(item, i)}
                  <button
                    className="lv-footer-button lv-speaking-button"
                    onClick={() => stopSpeaking(i)}
                    disabled={speaking?.[i]?.status !== 1}
                    style={{
                      opacity: speaking?.[i]?.status === 1 ? 1 : 0.5,
                      cursor:
                        speaking?.[i]?.status === 1 ? "pointer" : "not-allowed",
                    }}
                  >
                    Pause
                  </button>
                  <hr />
                  {recorderContainer(item, i)}
                </div>
              </div>
            ))}
        </div>
        <div className="d-flex justify-content-between align-items-center p-2">
          <div className="lv-section-pagination">
            {examData?.questions?.map((_, index) => {
              return (
                <div
                  className="lv-footer-item"
                  onClick={() => scrollToQuestion(index)}
                  key={index}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveSpeakingExam;
