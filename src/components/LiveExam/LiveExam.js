import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import AudioRecorder from "../Exam-Create/AudioRecorder";
import { useSelector } from "react-redux";
import readingBandValues from "../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../utils/bandValues/listeningBandValues";
const Cheerio = require("cheerio");

const LiveExam = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const examId = useLocation()?.pathname?.split("/")?.[2];
  const [examData, setExamData] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [linkAnswer, setLinkAnswer] = useState(false);
  const [uniqueIdArr, setUniqueIdArr] = useState([]);
  const [timer, setTimer] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(true);
  const [numberOfWord, setNumberOfWord] = useState(0);
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const authData = useSelector((state) => state.authStore);
  let highlightedElement = null;

  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  const stoppedTimeFormatted = `${minutes} : ${seconds}`;

  useEffect(() => {
    if (
      examData?.exam_type === "Reading" ||
      examData?.exam_type === "Writing"
    ) {
      setTimer(60 * 60);
    } else if (examData?.exam_type === "Listening") {
      setTimer(30 * 60);
    } else if (examData?.exam_type === "Speaking") {
      setTimer(15 * 60);
    }
  }, [examData]);

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
    (async () => {
      try {
        const response = await ajaxCall(
          `/exam-blocks/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          const examBlockWithNumbers = response?.data?.map(
            (examBlock, index) => ({
              ...examBlock,
              no: index + 1,
            })
          );
          const tempExamData = examBlockWithNumbers?.find(
            (examBlock) => examBlock?.id.toString() === examId
          );
          setExamData(tempExamData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examId]);

  const handleWritingAnswer = (e, next) => {
    const answer = e.target.value;
    const temp = [...examAnswer];
    temp[next].answers[0].answer = answer;
    setExamAnswer(temp);

    // Count the number of words
    const words = answer.split(" ");
    setNumberOfWord(words.length);
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
            "analyse the package for ielts writing task and give IELTS bands to the task.",
        },
        {
          role: "user",
          content: `Questions: ${examData?.question}`,
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
      let band;
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
        band = data?.choices?.[0]?.message?.content
          ?.split("#Band:")[1]
          .split(" ")[1];
        gptResponse = data?.choices?.[0]?.message?.content;
      } catch (error) {}

      const data = JSON.stringify({
        student_exam: answersArray,
        user: userData?.userId,
        exam: parseInt(examId),
        gpt_response: gptResponse,
        band: parseInt(band),
      });

      const response = await ajaxCall(
        `/studentanswerlistview/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: "POST",
          body: data,
        },
        8000
      );

      if (response.status === 201) {
        setTimerRunning(false);
        toast.success("Your Exam Submitted Successfully");
        navigate(`/eaxm-answere/${examData?.id}`, {
          state: { examAnswer, stoppedTimeFormatted },
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

    examAnswer[0].answers.forEach((answer, index) => {
      answersArray.push({
        question_number: index + 1,
        answer_text: answer.answer,
      });
    });

    let totalCorrect = 0;
    examAnswer[0].answers.forEach((answer, index) => {
      const correctAnswer = examData?.answers[index].answer_text;
      if (answer.answer === correctAnswer) {
        totalCorrect += 1;
      }
    });

    let bandValue = 0;

    if (examData?.exam_type === "Reading") {
      bandValue = readingBandValues[totalCorrect];
    } else if (examData?.exam_type === "Listening") {
      bandValue = listeningBandValues[totalCorrect];
    }

    try {
      const data = JSON.stringify({
        student_exam: answersArray,
        user: userData?.userId,
        exam: parseInt(examId),
        band: parseInt(bandValue),
      });

      const response = await ajaxCall(
        `/studentanswerlistview/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.accessToken}`,
          },
          method: "POST",
          body: data,
        },
        8000
      );

      if (response.status === 201) {
        setTimerRunning(false);
        toast.success("Your Exam Submitted Successfully");
        navigate(`/eaxm-answere/${examData?.id}`, {
          state: { examAnswer, stoppedTimeFormatted },
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
  const scrollToContent = (contentId) => {
    const container = containerRef.current;
    const contentElement = document.getElementById(contentId);

    if (highlightedElement) {
      highlightedElement.classList.remove("lv-highlight");
    }

    if (contentElement) {
      container.scrollTop = contentElement.offsetTop - container.offsetTop;
      contentElement.classList.add("lv-highlight");
      highlightedElement = contentElement;
    }
  };

  const renderAudio = (audio_file) => {
    // Replace this with your actual implementation
    if (audio_file) {
      return (
        <div>
          <audio controls autoPlay>
            <source src={audio_file} type="audio/mpeg" />
          </audio>
        </div>
      );
    } else {
      return <p></p>;
    }
  };

  const displayLeftContainer = (passage) => {
    // Replace this with your actual implementation
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: passage,
        }}
      ></div>
    );
  };

  const handleAnswerLinking = (e, questionId, next) => {
    const { value, id } = e.target;

    const elementId = id.split("_")[0];

    const temp = [...examAnswer];
    temp[next].answers.map((item) => {
      if (item.questionId === id && elementId === "InputText") {
        const trimedValue = value.trim();
        item.answer = trimedValue;
      } else if (item.questionId === id) {
        item.answer = value;
      }
    });
    setExamAnswer(temp);
  };

  useEffect(() => {
    if (linkAnswer && examAnswer[0] && examAnswer[0].answers.length > 0) {
      setTimeout(() => {
        examAnswer[0].answers.forEach((item) => {
          const contentElements = document.querySelectorAll(
            `[id="${item.questionId}"]`
          );
          if (item.answer !== "") {
            contentElements.forEach((element) => {
              element.value = item.answer;
            });
          }
          contentElements.forEach((element) => {
            element.addEventListener("change", (e) => {
              handleAnswerLinking(e, item.questionId, 0);
            });
          });
        });
        setLinkAnswer(false);
      }, 500);
    }
  }, [linkAnswer, examAnswer]);

  const htmlContent = useMemo(() => {
    const question = examData?.question;
    if (!question) return;
    const $ = Cheerio.load(question.toString());

    const questionTags = [
      "select",
      "textarea",
      "input[type='text'], input:not([type='radio'], [type='checkbox'])",
      "input[type='radio']",
      "input[type='checkbox']",
    ];

    const tagIds = ["Select", "Textarea", "InputText", "Radio", "Checkbox"];

    const temp = [];
    let questionPassage = "";

    questionTags.forEach((tag, tagIndex) => {
      // Find elements for current tag
      const elements = $(tag);
      const numberOfElements = elements.length;

      const radioCheckboxtypeQuestionsGroup = {};
      let uniqueId = "";

      if (numberOfElements !== 0) {
        let tagQuestions = {
          type: tagIds[tagIndex],
          paginationsIds: [],
        };
        elements.each((index, element) => {
          if (
            tag === "input[type='radio']" ||
            tag === "input[type='checkbox']"
          ) {
            const name = $(element).attr("name");
            if (!radioCheckboxtypeQuestionsGroup[name]) {
              radioCheckboxtypeQuestionsGroup[name] = [];
              uniqueId = `${tagIds[tagIndex]}_${index + 1}`;
              tagQuestions.paginationsIds.push(uniqueId);
            }
            $(element).attr("id", uniqueId);
            radioCheckboxtypeQuestionsGroup[name].push(element);
          } else {
            const uniqueId = `${tagIds[tagIndex]}_${index + 1}`;
            tagQuestions.paginationsIds.push(uniqueId);
            $(element).attr("id", uniqueId);
          }
        });
        temp.push(tagQuestions);
      }
    });

    if (examData?.exam_type === "Writing") {
      const uniqueId = `Textarea_1`;
      temp.push({
        type: "Textarea",
        paginationsIds: [uniqueId],
      });
    }

    let paginationsStrucutre = [];

    examData?.question_structure?.forEach((item, index) => {
      temp.forEach((element) => {
        if (element.type === item.type) {
          paginationsStrucutre.push(
            element.paginationsIds.splice(0, item.numberOfQuestions)
          );
        }
      });
    });

    paginationsStrucutre = paginationsStrucutre.flat();

    // Display questions for the first page initially
    questionPassage += `<div class="mainContainer">${$.html()}</div>`;

    const tempAnswer = paginationsStrucutre.map((item) => {
      return {
        questionId: item,
        answer: "",
      };
    });

    const tempAnswerArr = [...examAnswer];

    if (!tempAnswerArr[0] || tempAnswerArr[0]?.answers.length === 0) {
      tempAnswerArr[0] = {
        testId: examData?.id,
        answers: tempAnswer,
      };
      setExamAnswer(tempAnswerArr);
    }
    setLinkAnswer(true);

    setUniqueIdArr(paginationsStrucutre);
    return questionPassage;
  }, [examData?.question]);

  return (
    <>
      {/* Navbar */}
      <div className="lv-navbar">
        <div className="lv-navbar-title">
          <h2 style={{ color: "red", marginTop: "10px" }}>IELTS</h2>
          <div className="lv-userName">{userData?.username}</div>
        </div>
        <span>
          Time Left :
          <span className="lv-userName">
            {Math.floor(timer / 60)}:{timer % 60}
          </span>
        </span>
      </div>

      {/* Static Container */}
      <div className="lv-container">
        <div className="lv-container-title">{`${examData?.exam_type} / ${examData?.exam_name} / ${examData?.block_type} / ${examData?.difficulty_level}`}</div>
      </div>

      {/* Main Container */}
      <div>{renderAudio(examData?.audio_file)}</div>
      <div className="lv-main-container">
        {/* Left Container */}
        <div className="lv-left-container">
          {displayLeftContainer(examData?.passage)}
        </div>

        {/* Right Container */}
        <div
          className="lv-right-container"
          id="right-container"
          ref={containerRef}
        >
          <div className="lv-box-right">
            {/* Replace the following with your actual content */}
            {(examData?.exam_type === "Reading" ||
              examData?.exam_type === "Listening") && (
              <div
                dangerouslySetInnerHTML={{
                  __html: htmlContent,
                }}
              />
            )}
            {examData?.exam_type === "Writing" &&
              uniqueIdArr?.map((item, index) => {
                return (
                  <div className="lv-textarea">
                    <textarea
                      id={item}
                      style={{ width: "100%", height: "200px" }}
                      value={examAnswer[0]?.answers[0]?.answer || ""}
                      onChange={(e) => handleWritingAnswer(e, 0)}
                    />
                    <span>{numberOfWord} Words</span>
                  </div>
                );
              })}
            {examData?.exam_type === "Speaking" && <AudioRecorder />}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="d-flex justify-content-between">
        <div className="lv-question-pagination">
          {uniqueIdArr?.map((item, index) => {
            return (
              <div
                className={`lv-footer-item ${
                  examAnswer[0].answers.length > 0 &&
                  examAnswer[0].answers.find((val) => val.questionId === item)
                    ?.answer !== ""
                    ? "lv-completed-questions"
                    : ""
                }`}
                onClick={() => scrollToContent(item)}
                key={index}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <button
          className="lv-footer-button"
          onClick={() => {
            if (
              examData?.exam_type === "Reading" ||
              examData?.exam_type === "Listening"
            ) {
              handleRLSubmit();
            } else if (examData?.exam_type === "Writing") {
              doAnswerSubmit();
            }
          }}
        >
          <span>&#x2713;</span>
        </button>
      </div>
    </>
  );
};

export default LiveExam;
