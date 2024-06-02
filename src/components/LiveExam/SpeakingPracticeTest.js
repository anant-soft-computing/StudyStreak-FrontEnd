import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

const PracticeSpeakingLiveExam = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const examId = useLocation()?.pathname?.split("/")?.[4];
  const synth = window.speechSynthesis;
  const [examData, setExamData] = useState([]);
  const [timer, setTimer] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(false);
  const [fullPaper, setFullPaper] = useState([]);
  const [instructionCompleted, setInstructionCompleted] = useState(false);
  // 0 means before start, 1 means after start, 2 means after finish
  const [speaking, setSpeaking] = useState([initialSpeakingSingleQuesionState]);
  const [next, setNext] = useState(0);
  const [recordedFilePath, setRecordedFilePath] = useState("");
  const timeTaken = `${Math.floor(timer / 60)}:${timer % 60}`;
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  let highlightedElement = null;

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

  function generateRandomId(length) {
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";
    for (let i = 0; i < length; i++) {
      randomId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomId;
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/speaking/practice-test/${examId}`,
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
          let filteredSpeaking = response.data.IELTS.Speaking.sort((a, b) => {
            const tempExamName1Array = a.name.split(" ");
            const tempExamName2array = b.name.split(" ");
            const tempExamName1 =
              tempExamName1Array[tempExamName1Array.length - 1];
            const tempExamName2 =
              tempExamName2array[tempExamName2array.length - 1];
            if (tempExamName1 > tempExamName2) {
              return 1;
            }
            if (tempExamName1 < tempExamName2) {
              return -1;
            }
            return 0;
          });
          const tempSpeaking = response.data;
          tempSpeaking.IELTS.Speaking = filteredSpeaking.map((item) => ({
            ...item,
            questions: item.questions.map((question) => ({
              ...question,
              id: generateRandomId(10),
            })),
          }));
          setFullPaper(tempSpeaking);

          const tempSepakinQuesitons = tempSpeaking.IELTS.Speaking.map((item) =>
            item.questions.map((question) => ({
              ...initialSpeakingSingleQuesionState,
              id: question.id,
            }))
          );
          setSpeaking(tempSepakinQuesitons.flat());
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
      const examBlockWithNumbers = fullPaper?.[examType][examForm]?.map(
        (examBlock, index) => ({
          ...examBlock,
          no: index + 1,
        })
      );
      setExamData(examBlockWithNumbers[next]);
    }
  }, [fullPaper, next]);

  const extractVisibleText = (htmlContent) => {
    return htmlToText(htmlContent);
  };

  const speak = (speakingContent, id) => {
    const utterance = new SpeechSynthesisUtterance(
      extractVisibleText(speakingContent)
    );
    synth.speak(utterance);
    const updatedSpeaking = speaking.map((item, index) => {
      const tempId = item.id;
      if (tempId === id) {
        return { ...item, status: 1 };
      } else {
        return item;
      }
    });
    setSpeaking(updatedSpeaking);

    utterance.onend = () => {
      const updatedSpeaking = speaking.map((item, index) => {
        const tempId = item.id;
        if (tempId === id) {
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

    return () => {
      window.removeEventListener("beforeunload", stopSpeaking);
      stopSpeaking(0);
    };
  }, [next]);

  useEffect(() => {
    if (recordedFilePath) {
      const { recorderIndex, filePath } = recordedFilePath;
      const tempSpeaking = [...speaking];
      const index = tempSpeaking.findIndex((item) => item.id === recorderIndex);
      tempSpeaking[index].status = 2;
      tempSpeaking[index].filePath = filePath;
      setSpeaking(tempSpeaking);
      setRecordedFilePath(null);
    }
  }, [recordedFilePath]);

  useEffect(() => {
    const isAllAnswered = speaking.every((item) => item.filePath !== "");
    if (isAllAnswered) {
      setTimeout(() => navigate(`/practiceTest`), 3000);
    }
  }, [speaking]);

  const recorderContainer = useCallback(
    (item, index) => {
      return (
        <AudioRecorder
          setRecordedFilePath={setRecordedFilePath}
          next={next}
          exam={examData}
          enableRecording={speaking?.[index]?.status === 2}
          completed={speaking?.[index]?.filePath !== ""}
          question_number={item.question_number}
          user={userData.userId}
          recorderIndex={item.id}
        />
      );
    },
    [speaking, examData, userData, next]
  );

  return !instructionCompleted ? (
    <div className='test-instruction'>
      <SpeakingInstruction
        testType='Practice'
        startTest={handleCompleteInstruciton}
      />
    </div>
  ) : (
    <>
      <div className='lv-navbar lv-navbar-responsive'>
        <div className='lv-navbar-title'>
          <h2>{examData?.exam_category}</h2>
          <div className='lv-userName'>{userData?.username}</div>
          <div style={{ marginLeft: "10px" }}>/</div>
          <div className='lv-userName'>{`${examData?.name}`}</div>
        </div>
        <span className='lv-navbar-title'>
          Time Taken :<span className='lv-userName'>{timeTaken}</span>
        </span>
        <div className='lv-navbar-title-mobile'>
          <div className='username-mobile'>
            <h2>{examData?.exam_category}</h2>
            <div className='mobile-breadcumb'>
              <div className='lv-userName'>{userData?.username}</div>
              <div style={{ margin: "15px 0px 0 10px" }}>/</div>
              <div className='lv-userName'>{`${examData?.name}`}</div>
            </div>
          </div>
          <div className='lv-navbar-footer'>
            <span>
              Time Taken :<span className='lv-userName'>{timeTaken}</span>
            </span>
          </div>
        </div>
      </div>
      <div className='lv-container'>
        {/* Main Container */}
        {/* <div className='lv-main-container'> */}
        <div>
          {/* Left Container */}
          <div
            className='lv-left-container'
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {Object.keys(examData).length > 0 &&
              examData.questions.map((item, i) => {
                const speakingIndex = speaking.findIndex(
                  (element) => element.id === item.id
                );
                return (
                  <div className='lv-question-container'>
                    <div
                      className='lv-speaking-question'
                      style={{
                        flex: 1,
                      }}
                    >
                      <p> {i + 1} :</p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.question,
                        }}
                      ></div>
                    </div>
                    <div className='d-flex align-items-center lv-btn-mic-container'>
                      <button
                        className='lv-speaking-button'
                        onClick={() => speak(item.question, item.id)}
                        disabled={speaking?.[speakingIndex]?.status === 1}
                        style={{
                          opacity:
                            speaking?.[speakingIndex]?.status === 1 ? 0.5 : 1,
                          cursor:
                            speaking?.[speakingIndex]?.status === 1
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        {speaking?.[speakingIndex]?.status === 2
                          ? "Replay"
                          : "Start"}
                      </button>
                      <hr />
                      {recorderContainer(item, speakingIndex)}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Right Container */}
          {/* <div
            className='lv-right-container'
            id='right-container'
            ref={containerRef}
          >
            <div className='lv-box-right'>{recorderContainer}</div>
          </div> */}
        </div>
        <div className='d-flex justify-content-between mb-2'>
          <div className='lv-question-pagination' />
          <div className='lv-footer-btn'>
            <button
              className='lv-footer-button'
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
              className='lv-footer-button'
              style={{
                display:
                  next === fullPaper?.[examType].Speaking?.length - 1
                    ? "none"
                    : "block",
              }}
              onClick={() => {
                setNext(next + 1);
              }}
            >
              <span>&#10152;</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PracticeSpeakingLiveExam;
