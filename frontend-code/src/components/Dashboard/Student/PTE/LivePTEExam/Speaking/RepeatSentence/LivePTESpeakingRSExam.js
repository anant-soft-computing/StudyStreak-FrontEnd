import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { convert } from "html-to-text";
import RSRecorder from "./RSRecorder";
import Loading from "../../../../../../UI/Loading";
import ajaxCall from "../../../../../../../helpers/ajaxCall";
import { formatTime } from "../../../../../../../utils/timer/formateTime";

const initialState = {
  // 0 for incoming, 1 for instruction on screen, 2 for completed
  status: 0,
  filePath: "",
};

const LivePTESpeakingRSExam = () => {
  const synth = window.speechSynthesis;
  const navigate = useNavigate();
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const examId = useLocation()?.pathname?.split("/")?.[5];
  const [next, setNext] = useState(0);
  const [timer, setTimer] = useState(0);
  const [voices, setVoices] = useState([]);
  const [examData, setExamData] = useState({});
  const [fullPaper, setFullPaper] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [speaking, setSpeaking] = useState([initialState]);
  const [recordedFilePath, setRecordedFilePath] = useState("");

  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  // Reset preparation timer when moving to next question
  useEffect(() => {
    setIsSpeaking(false);
  }, [next]);

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

  const latestExamSubmit = async () => {
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
            practise_set: fullPaper?.IELTS?.id,
          }),
        },
        8000
      );
      if (response.status === 201) {
        console.log("Latest Practice Exam Submitted");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async () => {
    const data = {
      student_id: studentId,
      pt_id: parseInt(examId),
    };
    try {
      const response = await ajaxCall(
        "/student-pt-submit/",
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
      if (response.status === 200) {
        latestExamSubmit();
        setTimerRunning(false);
        navigate(`/PTE/Speaking/RS/${fullPaper?.IELTS?.id}`);
        toast.success("Your Exam Submitted Successfully");
      } else {
        toast.error("You Have Already Submitted This Exam");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

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
    const fetchVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    // Fetch voices when they are loaded
    synth.onvoiceschanged = fetchVoices;
    fetchVoices();
  }, [synth]);

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

  const speak = (speakingContent, id) => {
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
          const updatedSpeaking = speaking.map((item) =>
            item.id === id ? { ...item, status: 2 } : item
          );
          setSpeaking(updatedSpeaking);
        };
      }
    });
    // Update speaking state to reflect that the current question is being spoken
    const updatedSpeaking = speaking.map((item) =>
      item.id === id ? { ...item, status: 1 } : item
    );
    setSpeaking(updatedSpeaking);
  };

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

  // Automatically start countdown and speaking for the current question
  useEffect(() => {
    if (examData?.questions && examData.questions.length > 0) {
      setCountdown(3); // Start countdown from 3 seconds
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      const speakTimeout = setTimeout(() => {
        const currentQuestion = examData.questions[0]; // Assuming only one question per exam block
        speak(currentQuestion.question, currentQuestion.id);
        setIsSpeaking(true);
      }, 3000); // Start speaking after 3 seconds

      return () => {
        clearInterval(countdownInterval);
        clearTimeout(speakTimeout);
      };
    }
  }, [examData]);

  const recorderContainer = useCallback(
    (item) => {
      return (
        <RSRecorder
          setRecordedFilePath={setRecordedFilePath}
          next={next}
          exam={examData}
          question_number={item.question_number}
          user={userData.userId}
          recorderIndex={item.id}
          practice={fullPaper?.IELTS?.id}
          shouldStartRecording={isSpeaking}
        />
      );
    },
    [next, examData, userData.userId, fullPaper?.IELTS?.id, isSpeaking]
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
          {examData?.exam_category} / Repeat sentence
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
          You will hear a sentence. Please repeat the sentence exactly as you
          hear it. You will hear the sentence only once.
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {examData?.questions?.map((item, i) => {
            const speakingIndex = speaking.findIndex(
              (element) => element.id === item.id
            );
            return (
              <div key={item.id} style={{ marginBottom: "20px" }}>
                {countdown !== null && (
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
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      Beginning in {countdown} seconds
                    </div>
                  </div>
                )}
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
              <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePTESpeakingRSExam;
