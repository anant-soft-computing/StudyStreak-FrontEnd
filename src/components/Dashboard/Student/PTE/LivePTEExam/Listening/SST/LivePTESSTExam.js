import React, { useState, useEffect, useRef } from "react";
import "../../../../../../../css/LiveExam.css";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../../../../../helpers/ajaxCall";
import Loading from "../../../../../../UI/Loading";
import SmallModal from "../../../../../../UI/Modal";

const LivePTESSTExam = () => {
  const examId = useLocation()?.pathname?.split("/")?.[5];
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const [timer, setTimer] = useState(600);
  const [examData, setExamData] = useState({});
  const [fullPaper, setFullPaper] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [reRenderAudio, setReRenderAudio] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // 0 means before start, 1 means after start, 2 means after finish
  const [next, setNext] = useState(0);
  const [linkAnswer, setLinkAnswer] = useState(false);

  const audioRef = useRef(null);
  const [countdown, setCountdown] = useState(10);
  const [audioStatus, setAudioStatus] = useState("not started");
  const timeTaken = `${Math.floor(timer / 60)}:${timer % 60}`;

  useEffect(() => {
    setTimer(10 * 60);
  }, [next]);

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
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/ct/ielts/practice-test/${examId}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
                }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          let filteredData = [response?.data];
          filteredData[0].IELTS[examForm] = filteredData[0].IELTS[
            examForm
          ].sort((a, b) => {
            const tempExamName1Array = a.exam_name.split(" ");
            const tempExamName2array = b.exam_name.split(" ");
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
          setFullPaper(filteredData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [examForm, examId]);

  useEffect(() => {
    if (fullPaper?.length !== 0) {
      const examBlockWithNumbers = fullPaper?.[0][examType][examForm]?.map(
        (examBlock, index) => ({
          ...examBlock,
          no: index + 1,
        })
      );
      setReRenderAudio(true);
      setExamData(examBlockWithNumbers[next]);
    }
  }, [examForm, examType, fullPaper, next]);

  useEffect(() => {
    let countdownInterval;
    if (audioStatus === "not started") {
      countdownInterval = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(countdownInterval);
            setAudioStatus("playing");
            audioRef.current.play();
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }
    return () => clearInterval(countdownInterval);
  }, [audioStatus]);

  const renderAudio = (audio_file) => {
    if (audio_file && reRenderAudio) {
      return (
        <div className="audio-container">
          <div className="audio-status mb-2">
            Status :{" "}
            {audioStatus === "not started" &&
              `Beginning in ${countdown} seconds`}
            {audioStatus === "playing" && "Playing"}
            {audioStatus === "complete" && "Completed"}
          </div>
          <audio
            ref={audioRef}
            controls
            onLoadedMetadata={() => {
              setAudioStatus("not started");
              setCountdown(10);
            }}
            onEnded={() => {
              setAudioStatus("complete");
            }}
          >
            <source src={audio_file} type="audio/mpeg" />
          </audio>
        </div>
      );
    }
  };

  const fetchHtmlContent = async (paperData, index) => {
    let tempAnswer = {};

    if (paperData?.exam_type === "Listening") {
      tempAnswer = {
        exam_id: paperData?.id,
        data: [
          {
            question_number:
              paperData?.exam_type === "Listening" && `textarea_${index}_1`,
            answer_text: "",
          },
        ],
      };
      return new Promise((resolve) => {
        resolve({ questionPassage: "", tempAnswer });
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (fullPaper?.length !== 0) {
        const examDataList = fullPaper?.[0][examType][examForm]?.map(
          (examBlock, index) => ({
            ...examBlock,
            no: index + 1,
          })
        );
        let tempHtmlContents = [];
        let tempExamAnswer = [];
        let tempQuestions = 1;
        for (let paper of examDataList) {
          const index = examDataList.indexOf(paper);
          const returnContent = await fetchHtmlContent(
            paper,
            index,
            tempQuestions
          );
          tempHtmlContents.push(returnContent.questionPassage);
          const tempUniqueArr = {
            name: `${index + 1}`,
            ...returnContent.tempAnswer,
          };
          tempExamAnswer.push(tempUniqueArr);
          tempQuestions =
            tempExamAnswer.map((item) => [...item.data]).flat().length + 1;
        }
        setExamAnswer(tempExamAnswer);
        setLinkAnswer(!linkAnswer);
      }
    })();
  }, [fullPaper]);

  const reviewContent = () =>
    examAnswer.map((test, index) => (
      <div key={index}>
        <h4>Test : {index + 1}</h4>
        <div className="card-container">
          {test.data.map((answer, idx) => (
            <div key={idx} className="card answer__width">
              <div className="card-body">
                <h6 className="card-text">
                  Answer ({idx + 1}) :{" "}
                  <span className="text-success">{answer.answer_text}</span>
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));

  const handleListeningAnswer = (e, next) => {
    const answer_text = e.target.value;
    const temp = [...examAnswer];

    // Update the answer text
    temp[next].data[0].answer_text = answer_text;

    // Update the word count for this exam
    const words =
      answer_text.trim() === "" ? 0 : answer_text.trim().split(/\s+/).length;
    temp[next].wordCount = words;

    setExamAnswer(temp);
  };

  return isLoading ? (
    <div className="mt-4">
      <Loading />
    </div>
  ) : (
    <div>
      <div className="lv-navbar">
        <div className="lv-navbar-title">
          <h2>{examData?.exam_category}</h2>
          <div style={{ marginLeft: "10px", marginRight: "10px" }}>/</div>
          <h2>{examData?.exam_name}</h2>
        </div>
        <span
          className="lv-navbar-title"
          style={{ backgroundColor: "#01579b", color: "white", padding: "5px" }}
        >
          <i className="icofont-stopwatch mr-2"></i>
          <span>Time Remaining :</span>
          <span className="ml-2">{timeTaken}</span>
        </span>
      </div>
      <div className="lv-container">
        <div className="lv-main-container">
          <div className="lv-right-container">
            <div className="lv-box-right">
              <div className="text-black" style={{ fontWeight: "bold" }}>
                You will hear a short lecture. Write a summary for a fellow
                student who was not present at the lecture. You should write
                50-70 words. You have 10 minutes to finish this task. Your
                response will be judged on the Quality of Your writing and on
                how well your response presents the key points presented in the
                lecture.
              </div>
              {renderAudio(examData?.audio_file)}
              <div
                className="mt-3"
                dangerouslySetInnerHTML={{
                  __html: examData?.passage,
                }}
              />
              <div className="lv-textarea mt-3">
                <textarea
                  id={`textarea_${next}`}
                  className="writing__textarea"
                  value={examAnswer[next]?.data[0]?.answer_text || ""}
                  onChange={(e) => handleListeningAnswer(e, next)}
                />
                <span>
                  Total Word Count: {examAnswer[next]?.wordCount || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 mt-2 flex-column flex-md-row">
          <div className="lv-question-pagination d-flex justify-content-between align-items-center pb-1 w-100 mb-2 mb-md-0">
            <div>
              Item {next + 1} of{" "}
              {fullPaper.length > 0
                ? fullPaper[0][examType][examForm]?.length
                : 0}
            </div>
          </div>
          <div className="lv-footer-btn pb-1">
            <button
              className="btn btn-primary m-2"
              onClick={() => setIsModalOpen(true)}
            >
              Review
            </button>
            <button
              className="btn btn-primary m-2"
              style={{
                display: next === 0 ? "none" : "block",
              }}
              onClick={() => {
                setReRenderAudio(false);
                setNext(next - 1);
              }}
            >
              <span>Previous</span>
            </button>
            <button
              className="btn btn-primary m-2"
              style={{
                display:
                  next ===
                    (fullPaper.length > 0 &&
                      fullPaper?.[0][examType][examForm]?.length - 1)
                    ? "none"
                    : "block",
              }}
              onClick={() => {
                setReRenderAudio(false);
                setNext(next + 1);
              }}
            >
              <span>Next</span>
            </button>
            <button
              className="btn btn-primary m-2"
              style={{
                display:
                  next !==
                    (fullPaper.length > 0 &&
                      fullPaper?.[0][examType][examForm]?.length - 1)
                    ? "none"
                    : "block",
              }}
              onClick={() => setIsConfirmModalOpen(true)}
            >
              Submit
            </button>
          </div>
        </div>
        {isConfirmModalOpen && (
          <SmallModal
            size="lg"
            centered
            isOpen={isConfirmModalOpen}
            footer={
              <div className="d-flex gap-2">
                <button className="btn btn-success">Yes</button>
                <button
                  className="btn btn-danger"
                  onClick={() => setIsConfirmModalOpen(false)}
                >
                  No
                </button>
              </div>
            }
          >
            <h5>Are You Sure You Want To Submit ?</h5>
            {reviewContent()}
          </SmallModal>
        )}
        {isModalOpen && (
          <SmallModal
            size="lg"
            centered
            title="Your Answers"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            {reviewContent()}
          </SmallModal>
        )}
      </div>
    </div>
  );
};

export default LivePTESSTExam;
