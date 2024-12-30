import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { convert } from "html-to-text";
import "../../../../../css/LiveExam.css";
import Loading from "../../../../UI/Loading";
import ajaxCall from "../../../../../helpers/ajaxCall";
import PTEAudioRecorder from "./PTEAudioRecorder/PTEAudioRecorder";
import SpeakingInstruction from "../../../../Instruction/SpeakingInstruction";

const initialState = {
  // 0 for incoming, 1 for instruction on screen, 2 for completed
  status: 0,
  filePath: "",
};

const LivePTESpeakingExam = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const synth = window.speechSynthesis;
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const examId = useLocation()?.pathname?.split("/")?.[4];
  const [examData, setExamData] = useState([]);
  const [voices, setVoices] = useState([]);
  const [fullPaper, setFullPaper] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRecordingIndex, setActiveRecordingIndex] = useState(null);
  const [instructionCompleted, setInstructionCompleted] = useState(false);
  // 0 means before start, 1 means after start, 2 means after finish
  const [speaking, setSpeaking] = useState([initialState]);
  const [next, setNext] = useState(0);
  const [recordedFilePath, setRecordedFilePath] = useState("");
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  const handleCompleteInstruction = () => setInstructionCompleted(true);

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

  const examLatestSubmit = async () => {
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
        console.log("Lastest Practice Exam Submitted");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
        examLatestSubmit();
        navigate(`/PTE/Assessment/Speaking/${fullPaper?.IELTS?.id}`);
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
          const updatedSpeaking = speaking.map((item, index) => {
            const tempId = item.id;
            if (tempId === id) {
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
      const tempId = item.id;
      if (tempId === id) {
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
    setSpeaking((prev) =>
      prev.map((item) =>
        item.id === questionId ? { ...item, status: 3 } : item
      )
    );
  };

  const handleReplay = (speakingContent, questionId) => {
    speak(speakingContent, questionId);
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
    (item, index) => {
      return (
        <PTEAudioRecorder
          setRecordedFilePath={setRecordedFilePath}
          next={next}
          exam={examData}
          enableRecording={
            speaking?.[index]?.status === 2 || speaking?.[index]?.status === 3
          }
          completed={speaking?.[index]?.filePath !== ""}
          question_number={item.question_number}
          user={userData.userId}
          recorderIndex={item.id}
          practice={fullPaper?.IELTS?.id}
          setActiveRecordingIndex={setActiveRecordingIndex}
          isActiveRecording={activeRecordingIndex === index}
        />
      );
    },
    [
      next,
      examData,
      speaking,
      userData.userId,
      fullPaper?.IELTS?.id,
      activeRecordingIndex,
    ]
  );

  return isLoading ? (
    <div className="mt-4">
      <Loading />
    </div>
  ) : !instructionCompleted ? (
    <div className="test-instruction">
      <SpeakingInstruction
        testType="Practice"
        startTest={handleCompleteInstruction}
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
        <div className="lv-navbar-title-mobile">
          <div className="username-mobile">
            <h2>{examData?.exam_category}</h2>
            <div className="mobile-breadcumb">
              <div className="lv-userName">{userData?.username}</div>
              <div style={{ margin: "15px 0px 0 10px" }}>/</div>
              <div className="lv-userName">{`${examData?.name}`}</div>
            </div>
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
            examData.questions.map((item, i) => {
              const speakingIndex = speaking.findIndex(
                (element) => element.id === item.id
              );
              return (
                <div key={item.id} className="p-4">
                  <div className="d-flex justify-content-center">
                    <button
                      className="lv-speaking-button"
                      onClick={() =>
                        speaking?.[speakingIndex]?.status === 2
                          ? handleReplay(item.question, item.id)
                          : speak(item.question, item.id)
                      }
                      disabled={
                        speaking?.[speakingIndex]?.status === 1 ||
                        speaking.some(
                          (element, index) =>
                            index !== speakingIndex && element.status === 1
                        ) ||
                        activeRecordingIndex !== null
                      }
                      style={{
                        opacity:
                          speaking?.[speakingIndex]?.status === 1 ||
                          speaking.some(
                            (element, index) =>
                              index !== speakingIndex && element.status === 1
                          ) ||
                          activeRecordingIndex !== null
                            ? 0.5
                            : 1,
                        cursor:
                          speaking?.[speakingIndex]?.status === 1 ||
                          speaking.some(
                            (element, index) =>
                              index !== speakingIndex && element.status === 1
                          ) ||
                          activeRecordingIndex !== null
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      {speaking?.[speakingIndex]?.status === 2
                        ? "Replay"
                        : "Play"}
                    </button>
                    <button
                      className="lv-speaking-button lv-speaking-button"
                      onClick={() => stopSpeaking(item.id)}
                      disabled={speaking?.[speakingIndex]?.status !== 1}
                      style={{
                        opacity:
                          speaking?.[speakingIndex]?.status === 1 ? 1 : 0.5,
                        cursor:
                          speaking?.[speakingIndex]?.status === 1
                            ? "pointer"
                            : "not-allowed",
                      }}
                    >
                      Pause
                    </button>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-center">
                    {recorderContainer(item, speakingIndex)}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="d-flex justify-content-between mb-2">
          <div className="lv-question-pagination" />
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
            <button
              className="lv-footer-button"
              style={{
                display:
                  next === fullPaper?.[examType].Speaking?.length - 1
                    ? "block"
                    : "none",
              }}
              onClick={practiceTestSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LivePTESpeakingExam;
