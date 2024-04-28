import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import AudioRecorder from "../Exam-Create/AudioRecorder2";
import readingBandValues from "../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../utils/bandValues/listeningBandValues";
import SmallModal from "../UI/Modal";
import { htmlToText } from "html-to-text";
import SpeakingInstruction from "./Instruction/SpeakingInstruction";

const initialSpeakingSingleQuesionState = {
  // 0 for incoming, 1 for instruction on screen, 2 for completed
  status: 0,
  filePath: "",
};

const LiveSpeakingExam = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const examId = useLocation()?.pathname?.split("/")?.[2];
  const [examData, setExamData] = useState({});
  const [examAnswer, setExamAnswer] = useState([]);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState("");
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));
  const synth = window.speechSynthesis;
  const [speaking, setSpeaking] = useState([initialSpeakingSingleQuesionState]);
  const [instructionCompleted, setInstructionCompleted] = useState(false);
  const timeTaken = `${Math.floor(timer / 60)}:${timer % 60}`;

  const handleCompleteInstruciton = () => setInstructionCompleted(true);

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

  const examSubmit = async () => {
    const data = {
      student_id: studentId,
      exam_id: parseInt(examId),
      typetest: "Mock Test",
    };
    try {
      const response = await ajaxCall(
        "/student-mocktest-submit/",
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
        toast.error("You Have All Ready Submitted This Exam");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  const doAnswerSubmit = async () => {
    const answersArray = [];

    examAnswer[0].answers.forEach((answer, index) => {
      answersArray.push({
        question_number: index + 1,
        answer_text: answer.answer,
      });
    });

    // Call ChaGpt API for checking the answer
    const gptBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Analyse The Package For IELTS Writing Task With Following Criteria TASK RESPONSE, COHERENCE AND COHESION, LEXICAL RESOURCE AND Grammatical Range and Accuracy and Give IELTS Bands To The Task",
        },
        {
          role: "user",
          content: `Questions: ${examData?.passage}`,
        },
        {
          role: "user",
          content: `Answers: ${examAnswer[0].answers[0].answer} `,
        },
        {
          role: "user",
          content:
            "Give band explanation as #Explanation: exaplanationValue  and band as #Band:bandValue",
        },
      ],
    };

    try {
      let gptResponse;
      let bandValue;
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_SECRET}`,
          },
          body: JSON.stringify(gptBody),
        });
        const data = await res.json();
        bandValue = data?.choices?.[0]?.message?.content
          ?.split("#Band:")[1]
          .split(" ")[1];
        gptResponse = data?.choices?.[0]?.message?.content;
      } catch (error) {}

      const data = JSON.stringify({
        student_exam: answersArray,
        user: userData?.userId,
        exam: parseInt(examId),
        gpt_response: gptResponse,
        band: bandValue,
      });

      const response = await ajaxCall(
        `/studentanswerlistview/`,
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
        examSubmit();
        navigate(`/eaxm-answere/${examData?.id}`, {
          state: { examAnswer, timeTaken, bandValue, gptResponse, examData },
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

  const handleRLSubmit = async () => {
    const answersArray = [];
    let bandValue = 0;

    examAnswer[0].answers.forEach((answer, index) => {
      answersArray.push({
        question_number: index + 1,
        answer_text: answer.answer,
      });
    });

    if (
      examData?.exam_type === "Reading" ||
      examData?.exam_type === "Listening"
    ) {
      let totalCorrect = 0;
      examAnswer[0]?.answers?.forEach((answer, index) => {
        const correctAnswer = examData?.answers[index]?.answer_text.trim();
        const studentAnswer = answer.answer.trim();

        if (correctAnswer?.includes(" OR ")) {
          const correctOptions = correctAnswer
            .split(" OR ")
            .map((option) => option.trim());
          if (correctOptions.includes(studentAnswer)) {
            totalCorrect++;
          }
        } else if (correctAnswer?.includes(" AND ")) {
          const correctOptions = correctAnswer
            .split(" AND ")
            .map((option) => option.trim());
          if (
            correctOptions.every((option) => studentAnswer.includes(option))
          ) {
            totalCorrect++;
          }
        } else {
          const correctAnswer = examData?.answers[index]?.answer_text;
          if (answer.answer === correctAnswer) {
            totalCorrect++;
          }
        }
      });

      if (examData?.exam_type === "Reading") {
        bandValue = readingBandValues[totalCorrect];
      } else if (examData?.exam_type === "Listening") {
        bandValue = listeningBandValues[totalCorrect];
      }
    } else if (examData?.exam_type === "Speaking") {
      bandValue = examAnswer[0]?.answers?.[0]?.answer
        ?.split("#Band:")[1]
        .split(" ")[1];
    }

    try {
      const data = JSON.stringify({
        student_exam: answersArray,
        user: userData?.userId,
        exam: parseInt(examId),
        band: bandValue,
      });

      const response = await ajaxCall(
        `/studentanswerlistview/`,
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
        examSubmit();
        navigate(`/eaxm-answere/${examData?.id}`, {
          state: { examAnswer, timeTaken, bandValue, examData },
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

  // Function to scroll to content

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

  const reviewContent = () => (
    <div className="card-container">
      {examAnswer[0]?.answers.map((answer, index) => (
        <div key={index} className="card answer__width">
          <div className="card-body">
            <h6 className="card-title">Q. {index + 1}</h6>
            <h6 className="card-text">
              Answer : <span className="text-success">{answer.answer}</span>
            </h6>
          </div>
        </div>
      ))}
    </div>
  );

  useEffect(() => {
    const isAllAnswered = speaking.every((item) => item.filePath !== "");
    if (isAllAnswered) {
      navigate(`/studentDashboard`);
    }
  }, [speaking]);

  const recorderContainer = useMemo(() => {
    if (
      Object.keys(examData).length > 0 &&
      speaking.length === examData.questions.length
    ) {
      return examData.questions.map((item, i) => (
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
      ));
    }
    return;
  }, [speaking, examData]);

  return !instructionCompleted ? (
    <div className="test-instruction">
      <SpeakingInstruction
        testType="Mini"
        startTest={handleCompleteInstruciton}
      />
    </div>
  ) : (
    <>
      <div className="lv-navbar">
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
        <div className="lv-main-container">
          {/* Left Container */}
          <div
            className="lv-left-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {Object.keys(examData).length > 0 &&
              examData.questions.map((item, i) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "grey 1px solid",
                    paddingBottom: "20px",
                    marginTop: "15px",
                  }}
                >
                  <div className="lv-speaking-question">
                    <p> {i + 1} :</p>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.question,
                      }}
                    ></div>
                  </div>
                  <button
                    className="lv-footer-button"
                    onClick={() => speak(item.question, i)}
                    disabled={speaking?.[i]?.status === 1}
                    style={{
                      opacity: speaking?.[i]?.status === 1 ? 0.5 : 1,
                      cursor:
                        speaking?.[i]?.status === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    {speaking?.[i]?.status === 2 ? "Replay" : "Start"}
                  </button>
                </div>
              ))}
          </div>

          {/* Right Container */}
          <div
            className="lv-right-container"
            id="right-container"
            ref={containerRef}
          >
            <div className="lv-box-right">{recorderContainer}</div>
          </div>
        </div>
        {isConfirmModalOpen && (
          <SmallModal
            size="md"
            centered
            isOpen={isConfirmModalOpen}
            footer={
              <div className="d-flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    if (
                      examData?.exam_type === "Reading" ||
                      examData?.exam_type === "Listening" ||
                      examData?.exam_type === "Speaking"
                    ) {
                      handleRLSubmit();
                    } else if (examData?.exam_type === "Writing") {
                      doAnswerSubmit();
                    }
                  }}
                >
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
            <h5>Are You Sure You Want To Submit ?</h5>
            {reviewContent()}
          </SmallModal>
        )}
        {isModalOpen &&
          (examData?.exam_type === "Reading" ||
            examData?.exam_type === "Listening") && (
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
    </>
  );
};

export default LiveSpeakingExam;
