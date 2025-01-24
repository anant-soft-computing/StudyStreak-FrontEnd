import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { convert } from "html-to-text";
import Loading from "../../../../UI/Loading";
import ajaxCall from "../../../../../helpers/ajaxCall";
import PTEAudioRecorder from "./PTEAudioRecorder/PTEAudioRecorder";
import { formatTime } from "../../../../../utils/timer/formateTime";

const instructions = {
  RA: "Look at the text below. In 30 seconds, you must read this text aloud as naturally and clearly as possible. You have 30 seconds to read aloud.",
  RS: "You will hear a sentence. Please repeat the sentence exactly as you hear it. You will hear the sentence only once.",
  DI: "Look at the picture below. In 25 seconds, please speak into microphone and describe in detail what the picture is showing. You will have 40 seconds to give your response.",
  RL: "You will hear a lecture. After listening to the lecture, in 10 seconds, please speak into the microphone and retell what you have just heard from the lecture in your own words. You will have 40 seconds to give your response.",
  ASQ: "You will hear a question. Please give a simple and short answer. Often just one or a few words is enough.",
  RTS: "Listen to and read a description of a situation. You will have 10 seconds to think about your answer. Then you will hear a beep. You will have 40 seconds to answer the question. Please answer as completely as you can.",
  SGD: "You will hear three people having a discussion. When you hear the beep, summarize the whole discussion. You will have 10 seconds to prepare and 2 minutes to give your response.",
};

const initialState = {
  // 0 for incoming, 1 for instruction on screen, 2 for completed
  status: 0,
  filePath: "",
};

const LivePTESpeakingExam = () => {
  const synth = window.speechSynthesis;
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const examId = useLocation()?.pathname?.split("/")?.[4];
  const [examData, setExamData] = useState({});
  const [voices, setVoices] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [fullPaper, setFullPaper] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRecordingIndex, setActiveRecordingIndex] = useState(null);
  const [speaking, setSpeaking] = useState([initialState]);
  const [next, setNext] = useState(0);
  const [recordedFilePath, setRecordedFilePath] = useState("");
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

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
  const practiceTestSubmit = async () => {
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

  const recorderContainer = useCallback(
    (item) => {
      return (
        <PTEAudioRecorder
          setRecordedFilePath={setRecordedFilePath}
          next={next}
          exam={examData}
          question_number={item.question_number}
          user={userData.userId}
          recorderIndex={item.id}
          practice={fullPaper?.IELTS?.id}
          setActiveRecordingIndex={setActiveRecordingIndex}
        />
      );
    },
    [next, examData, userData.userId, fullPaper?.IELTS?.id]
  );

  return isLoading ? (
    <div className="mt-4">
      <Loading />
    </div>
  ) : (
    <div
      style={{
        border: "1px solid #01579b",
        margin: "50px",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        maxWidth: "calc(100% - 100px)",
        overflow: "hidden",
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
        }}
      >
        <div>
          {examData?.exam_category} / {examData?.name}
        </div>
        <div>
          <i className="icofont-stopwatch mr-2"></i>
          <span>Timer :</span>
          <span className="ml-2">{formatTime(timer)}</span>
        </div>
      </div>
      <div
        style={{
          fontWeight: "bold",
          padding: "20px",
        }}
      >
        {instructions[examData.sub_category]}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
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
                }}
              >
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => speak(item.question, item.id)}
                  disabled={activeRecordingIndex !== null}
                  style={{
                    minWidth: "100px",
                    opacity: activeRecordingIndex !== null ? 0.5 : 1,
                    cursor:
                      activeRecordingIndex !== null ? "not-allowed" : "pointer",
                  }}
                >
                  Play
                </button>
              </div>
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
          borderTop: "1px solid #01579b",
          padding: "15px 20px",
          background: "#f9f9f9",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
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
          <button className="btn btn-primary btn-sm" onClick={practiceTestSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default LivePTESpeakingExam;
