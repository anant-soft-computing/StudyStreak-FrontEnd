import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../../../UI/Loading";
import SmallModal from "../../../../../../UI/Modal";
import ajaxCall from "../../../../../../../helpers/ajaxCall";
import { formatTime } from "../../../../../../../utils/timer/formateTime";

const LivePTEHIWExam = () => {
  const navigate = useNavigate();
  const examId = useLocation()?.pathname?.split("/")?.[5];
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const [timer, setTimer] = useState(0);
  const [examData, setExamData] = useState({});
  const [fullPaper, setFullPaper] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [reRenderAudio, setReRenderAudio] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [next, setNext] = useState(0);
  const [allHighlightedWords, setAllHighlightedWords] = useState([]);

  const audioRef = useRef(null);
  const [countdown, setCountdown] = useState(10);
  const [audioStatus, setAudioStatus] = useState("not started");

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
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
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
          // Initialize allHighlightedWords array when data is loaded
          setAllHighlightedWords(
            Array(filteredData[0][examType][examForm]?.length || 0).fill([])
          );
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

  const handleWordClick = (word, index) => {
    setAllHighlightedWords((prev) => {
      const newHighlights = [...prev];
      // Check if word is already highlighted for current test
      const isAlreadyHighlighted = newHighlights[next]?.some(
        (w) => w.word === word && w.index === index
      );

      if (isAlreadyHighlighted) {
        // Remove the word if clicked again
        newHighlights[next] = newHighlights[next].filter(
          (w) => !(w.word === word && w.index === index)
        );
      } else {
        // Add the word if not already highlighted
        newHighlights[next] = [...(newHighlights[next] || []), { word, index }];
      }
      return newHighlights;
    });
  };

  // Process passage text and remove HTML tags
  const cleanPassage = (text) => {
    if (!text) return "";
    // Remove HTML tags
    return text.replace(/<[^>]*>/g, "");
  };

  // Split passage into words and render with clickable spans
  const renderPassageWithClickableWords = (passage) => {
    const cleanedPassage = cleanPassage(passage);
    if (!cleanedPassage) return null;

    // Split into words while preserving spaces and punctuation
    const wordRegex = /(\S+|\s)/g;
    const tokens = cleanedPassage.match(wordRegex) || [];

    return tokens.map((token, index) => {
      // Skip if it's just whitespace
      if (token.trim() === "") return token;

      const isHighlighted = allHighlightedWords[next]?.some(
        (w) => w.word === token && w.index === index
      );

      return (
        <span
          key={index}
          onClick={() => handleWordClick(token, index)}
          style={{
            backgroundColor: isHighlighted ? "#FFEB3B" : "transparent",
            cursor: "pointer",
            padding: "1px 2px",
            borderRadius: "3px",
            transition: "background-color 0.2s",
            display: "inline-block",
            margin: "1px 0",
          }}
        >
          {token}
        </span>
      );
    });
  };

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
            practise_set: fullPaper[0].IELTS.id,
          }),
        },
        8000
      );
      if (response.status === 201) {
        console.log("Lastest Exam Submitted Successfully");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const submitExam = async () => {
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
        toast.success("Your Exam Submitted Successfully");
      } else {
        toast.error("You Have Already Submitted This Exam");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  const handleSubmit = async () => {
    const answersArray = [];
    let bandValue = 0;

    // Prepare answer data for all tests
    allHighlightedWords.forEach((highlightedWords, index) => {
      if (fullPaper?.[0]?.[examType]?.[examForm]?.[index]) {
        const answerData = {
          exam_id: fullPaper[0][examType][examForm][index]?.id,
          data: highlightedWords.map((wordInfo, idx) => ({
            question_number: idx + 1,
            answer_text: wordInfo.word,
          })),
        };
        answersArray.push(answerData);
      }
    });

    try {
      const data = JSON.stringify({
        answer_data: answersArray,
        user: userData?.userId,
        Practise_Exam: parseInt(fullPaper[0].IELTS.id),
        band: bandValue,
        exam_type: examForm,
      });

      const response = await ajaxCall(
        "/answer/practice-test/",
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
        submitExam();
        navigate(`/PTE/Listening/HIW/${fullPaper[0]?.IELTS?.id}`);
      } else if (response.status === 400) {
        toast.error("Please Submit Your Exam Answer");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#f9f9f9",
            padding: "20px",
            border: "1px solid #01579b",
            borderRadius: "12px",
            width: "100%",
            maxWidth: "400px",
            margin: "20px auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: "500",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            Status:{" "}
            {audioStatus === "not started" &&
              `Beginning in ${countdown} seconds`}
            {audioStatus === "playing" && "Playing"}
            {audioStatus === "complete" && "Completed"}
          </div>
          <audio
            ref={audioRef}
            controls
            style={{ width: "100%" }}
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

  const reviewContent = () => (
    <div>
      {allHighlightedWords.map(
        (highlightedWords, testIndex) =>
          highlightedWords.length > 0 && (
            <div key={testIndex} className="mb-4">
              <h4>Test : {testIndex + 1}</h4>
              <div className="card-container">
                {highlightedWords.map((wordInfo, index) => (
                  <div key={index} className="card answer__width mb-2">
                    <div className="card-body">
                      <h6 className="card-text">
                        Answer {index + 1}:{" "}
                        <span className="text-success">{wordInfo.word}</span>
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
      )}
    </div>
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
          {examData?.exam_category} / {examData?.exam_name}
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
          You will hear a recording. Below is a transcription of the recording.
          Some words in the transcription differ from what the speaker(s) said.
          Please click on the words that are different.
        </div>
        {renderAudio(examData?.audio_file)}
        <div
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
            overflowY: "auto",
            lineHeight: "1.8",
            whiteSpace: "pre-wrap",
          }}
        >
          {renderPassageWithClickableWords(examData?.passage)}
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
              Item {next + 1} of{" "}
              {fullPaper.length > 0
                ? fullPaper[0][examType][examForm]?.length
                : 0}
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                style={{
                  minWidth: "100px",
                  display: next === 0 ? "none" : "block",
                }}
                onClick={() => {
                  setReRenderAudio(false);
                  setNext(next - 1);
                }}
              >
                <i className="icofont-arrow-left mr-2"></i>Previous
              </button>
              <button
                className="btn btn-primary btn-sm"
                style={{
                  minWidth: "100px",
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
                Next
                <i className="icofont-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column flex-sm-row justify-content-between align-items-center"
          style={{
            padding: "20px",
            gap: "10px",
          }}
        >
          <button
            className="btn btn-primary btn-sm"
            style={{ minWidth: "100px" }}
            onClick={() => setIsModalOpen(true)}
          >
            <i className="icofont-eye-open mr-2"></i>
            Review
          </button>
          <button
            className="btn btn-primary btn-sm"
            style={{ minWidth: "100px" }}
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
              <button className="btn btn-success" onClick={handleSubmit}>
                Yes
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                No
              </button>
            </div>
          }
        >
          <h5>Are You Sure You Want To Submit?</h5>
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
  );
};

export default LivePTEHIWExam;
