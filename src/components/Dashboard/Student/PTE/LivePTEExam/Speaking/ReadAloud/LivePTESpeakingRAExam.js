import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RARecorder from "./RARecorder";
import Loading from "../../../../../../UI/Loading";
import ajaxCall from "../../../../../../../helpers/ajaxCall";
import { formatTime } from "../../../../../../../utils/timer/formateTime";

const initialState = {
  // 0 for incoming, 1 for instruction on screen, 2 for completed
  status: 0,
  filePath: "",
};

const LivePTESpeakingRAExam = () => {
  const navigate = useNavigate();
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const examId = useLocation()?.pathname?.split("/")?.[5];

  const [next, setNext] = useState(0);
  const [timer, setTimer] = useState(0);
  const [examData, setExamData] = useState({});
  const [fullPaper, setFullPaper] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const timerRunning = true;
  const [speaking, setSpeaking] = useState([initialState]);
  const [recordedFilePath, setRecordedFilePath] = useState("");

  const [isPreparing, setIsPreparing] = useState(true);
  const [preparationTimer, setPreparationTimer] = useState(40);

  const userData = JSON.parse(localStorage.getItem("loginInfo"));

  // Preparation countdown timer
  useEffect(() => {
    let interval;
    if (isPreparing && preparationTimer > 0) {
      interval = setInterval(() => {
        setPreparationTimer((prev) => prev - 1);
      }, 1000);
    } else if (preparationTimer === 0) {
      setIsPreparing(false);
    }
    return () => clearInterval(interval);
  }, [isPreparing, preparationTimer]);

  // Reset preparation timer when moving to next question
  useEffect(() => {
    setPreparationTimer(40);
    setIsPreparing(true);
  }, [next]);

  // Original timer logic
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
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/speaking/practice-test/${examId}/`,
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

          const tempSpeakingQuestions = tempSpeaking.IELTS.Speaking.map(
            (item) =>
              item.questions.map((question) => ({
                ...initialState,
                id: question.id,
              }))
          );
          setSpeaking(tempSpeakingQuestions.flat());
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
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
  }, [examForm, examType, fullPaper, next]);

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
  }, [recordedFilePath, speaking]);

  const recorderContainer = useCallback(
    (item) => {
      return (
        <RARecorder
          next={next}
          exam={examData}
          user={userData.userId}
          recorderIndex={item.id}
          practice={fullPaper?.IELTS?.id}
          preparationTimer={preparationTimer}
          shouldStartRecording={!isPreparing}
          question_number={item.question_number}
          setRecordedFilePath={setRecordedFilePath}
        />
      );
    },
    [
      examData,
      fullPaper?.IELTS?.id,
      isPreparing,
      next,
      preparationTimer,
      userData.userId,
    ]
  );

  return isLoading ? (
    <div className="mt-4">
      <Loading />
    </div>
  ) : (
    <div
      style={{
        border: "1px solid #01579b",
        margin: "20px",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        maxWidth: "calc(100% - 40px)",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          borderBottom: "1px solid #01579b",
          padding: "20px",
          backgroundColor: "#01579b",
          color: "white",
          flexShrink: 0,
          borderRadius: "12px 12px 0 0",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "500" }}>
          {examData?.exam_category} / {examData?.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <i className="icofont-stopwatch" style={{ fontSize: "20px" }}></i>
          <span>Timer:</span>
          <span style={{ fontWeight: "500" }}>{formatTime(timer)}</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
          padding: "20px",
          gap: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "#333",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          Look at the text below. In 40 seconds, you must read this text aloud
          as naturally and clearly as possible. You have 40 seconds to Read
          Aloud.
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {examData?.questions?.map((item, i) => {
            const speakingIndex = speaking.findIndex(
              (element) => element.id === item.id
            );
            return (
              <div key={item.id} style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f9f9f9",
                    padding: "15px",
                    border: "1px solid #01579b",
                    borderRadius: "8px",
                    width: "100%",
                    maxWidth: "400px",
                    margin: "0 auto",
                    marginTop: "15px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {recorderContainer(item, speakingIndex)}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "15px",
                    borderTop: "1px solid #ddd",
                    borderBottom: "1px solid #ddd",
                    padding: "20px",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: item.question,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div
          style={{
            borderTop: "1px solid #ddd",
            borderBottom: "1px solid #ddd",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
            <div style={{ fontSize: "16px", fontWeight: "500" }}>
              Item {next + 1} of {fullPaper?.[examType].Speaking?.length}
            </div>
            <div className="d-flex gap-2">
              {next > 0 && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setNext(next - 1)}
                >
                  <i className="icofont-arrow-left mr-2"></i>Previous
                </button>
              )}
              {next < fullPaper?.[examType].Speaking?.length - 1 && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setNext(next + 1)}
                >
                  Next
                  <i className="icofont-arrow-right ml-2"></i>
                </button>
              )}
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  navigate(`/PTE/Speaking/${fullPaper?.IELTS?.id}`)
                }
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePTESpeakingRAExam;
