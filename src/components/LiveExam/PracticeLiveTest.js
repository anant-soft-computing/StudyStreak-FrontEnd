import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import AudioRecorder from "../Exam-Create/AudioRecorder";
import SmallModal from "../UI/Modal";
import readingBandValues from "../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../utils/bandValues/listeningBandValues";
import { htmlToText } from "html-to-text";
import ReadingInstruction from "./Instruction/ReadingInstruction";
import WritingInstruction from "./Instruction/WritingInstruction";
import ListeningInstruction from "./Instruction/ListeningInstruction";
import SpeakingInstruction from "./Instruction/SpeakingInstruction";
const Cheerio = require("cheerio");

const PracticeLiveExam = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const examId = useLocation()?.pathname?.split("/")?.[4];
  const synth = window.speechSynthesis;
  const [examData, setExamData] = useState([]);
  const [htmlContents, setHtmlContents] = useState([]);
  const [uniqueIdArr, setUniqueIdArr] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [timer, setTimer] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [fullPaper, setFullPaper] = useState([]);
  const [reRenderAudio, setReRenderAudio] = useState(false);
  const [instructionCompleted, setInstructionCompleted] = useState(false);
  // 0 means before start, 1 means after start, 2 means after finish
  const [speaking, setSpeaking] = useState(0);
  const [next, setNext] = useState(0);
  const [linkAnswer, setLinkAnswer] = useState(false);
  const [recordedFilePath, setRecordedFilePath] = useState("");
  const timeTaken = `${Math.floor(timer / 60)}:${timer % 60}`;
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));
  const [numberOfWord, setNumberOfWord] = useState(0);
  let highlightedElement = null;

  const handleCompleteInstruciton = () => setInstructionCompleted(true);

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

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/createexamview/`,
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
          let filteredData = response?.data?.filter(
            (examBlock) => examBlock?.id.toString() === examId.toString()
          );
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
      }
    })();
  }, [examId]);

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
  }, [fullPaper, next]);

  const extractVisibleText = (htmlContent) => {
    return htmlToText(htmlContent);
  };

  const speak = () => {
    setTimerRunning(true);
    const utterance = new SpeechSynthesisUtterance(
      extractVisibleText(examData?.passage)
    );
    synth.speak(utterance);
    setSpeaking(1);
    utterance.onstart = () => {
      setSpeaking(1);
    };
    utterance.onend = () => {
      setSpeaking(2);
    };
  };

  const stopSpeaking = () => {
    if (synth.speaking) {
      synth.cancel();
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", stopSpeaking);
    setSpeaking(0);

    return () => {
      window.removeEventListener("beforeunload", stopSpeaking);
      stopSpeaking(0);
    };
  }, [next]);

  const handleAnswerLinking = (e, questionId, next) => {
    const { value, id, name, checked } = e.target;

    const elementId = id.split("_")[0];

    const temp = [...examAnswer];
    let conditionSatisfied = false; // Initialize a flag to track if any condition is satisfied

    // is this a multipleTypeQuestions
    const isMultiQuestions = examAnswer[next].data.filter(
      (item) => item.question_number === id
    );

    if (isMultiQuestions?.length <= 1) {
      temp[next].data.forEach((item) => {
        if (conditionSatisfied) return; // If a condition is already satisfied, exit the loop
        if (item.question_number === id && elementId === "InputText") {
          const trimedValue = value.trim();
          item.answer_text = trimedValue;
          conditionSatisfied = true; // Set the flag to true
        } else if (item.question_number === id && elementId === "Checkbox") {
          item.answer_text = checked ? value : "";
          conditionSatisfied = true; // Set the flag to true
        } else if (item.question_number === id) {
          item.answer_text = value;
          conditionSatisfied = true; // Set the flag to true
        }
      });

      setExamAnswer(temp);
    } else {
      const multipleTypeQuestions = checked
        ? examAnswer[next].data.findIndex(
            (item) => item.question_number === id && item.answer_text === ""
          )
        : examAnswer[next].data.findIndex(
            (item) => item.question_number === id && item.answer_text !== ""
          );
      if (multipleTypeQuestions !== -1) {
        temp[next].data[multipleTypeQuestions].answer_text = checked
          ? value
          : "";
        setExamAnswer(temp);
      } else {
        const contentElements = document.querySelectorAll(`[id="${id}"]`);
        contentElements.forEach((element) => {
          const isAlreadyAnswered = isMultiQuestions.findIndex(
            (a) => a.answer_text === element.value
          );

          if (isAlreadyAnswered === -1) element.checked = false;
        });
      }
    }
  };

  useEffect(() => {
    if (instructionCompleted && examAnswer.length > 0) {
      for (let tempExamAnswer of examAnswer) {
        let examIndex = examAnswer.indexOf(tempExamAnswer);
        // remove duplicate
        const filteredExamAnswer = tempExamAnswer.data.filter(
          (item, index) =>
            index ===
            tempExamAnswer.data.findIndex(
              (i) => i.question_number === item.question_number
            )
        );
        filteredExamAnswer.forEach((item) => {
          const contentElements = document.querySelectorAll(
            `[id="${item.question_number}"]`
          );
          if (item.answer_text !== "") {
            contentElements.forEach((element) => {
              element.value = item.answer_text;
            });
          }
          contentElements.forEach((element) => {
            element.addEventListener("change", (e) => {
              handleAnswerLinking(e, item.question_number, examIndex);
            });
          });
        });
      }
    }
  }, [linkAnswer, next, instructionCompleted]);

  // Function to scroll to content
  const scrollToContent = (contentId, sectionIndex) => {
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
    if (audio_file && reRenderAudio) {
      return (
        <div>
          <audio controls autoPlay controlsList="nodownload">
            <source src={audio_file} type="audio/mpeg" />
          </audio>
        </div>
      );
    } else {
      return <p></p>;
    }
  };

  const displayLeftContainer = (passage, image) => {
    // Replace this with your actual implementation
    return (
      <>
        {image && (
          <div className="text-center">
            <img
              className="mb-2"
              src={image}
              alt="Study Streak"
              height={250}
              width={250}
            />
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: passage,
          }}
        ></div>
      </>
    );
  };

  const fetchHtmlContent = async (paperData, index) => {
    const question = paperData?.question;
    let tempAnswer = {};

    if (
      paperData?.exam_type === "Writing" ||
      paperData?.exam_type === "Speaking"
    ) {
      tempAnswer = {
        exam_id: paperData?.id,
        data: [
          {
            question_number:
              paperData?.exam_type === "Writing"
                ? `textarea_${index}_1`
                : `speaking_${index}_1`,
            answer_text: "",
          },
        ],
      };
      if (paperData?.exam_type === "Writing") {
        const tempUniqueArr = {
          name: `section-${index + 1}`,
          paginationsIds: [`textarea_${index}_1`],
        };
        setUniqueIdArr((prev) => [...prev, tempUniqueArr]);
      } else {
        const tempUniqueArr = {
          name: `section-${index + 1}`,
          paginationsIds: [`speaking_${index}_1`],
        };
        setUniqueIdArr((prev) => [...prev, tempUniqueArr]);
      }
      return new Promise((resolve) => {
        resolve({ questionPassage: "", tempAnswer });
      });
    } else if (
      paperData?.exam_type === "Reading" ||
      paperData?.exam_type === "Listening"
    ) {
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
          elements.each((j, element) => {
            if (
              tag === "input[type='radio']" ||
              tag === "input[type='checkbox']"
            ) {
              const name = $(element).attr("name");
              if (!radioCheckboxtypeQuestionsGroup[name]) {
                radioCheckboxtypeQuestionsGroup[name] = [];
                uniqueId = `${tagIds[tagIndex]}_${index}_${j + 1}`;
                tagQuestions.paginationsIds.push(uniqueId);
              }
              $(element).attr("id", uniqueId);
              radioCheckboxtypeQuestionsGroup[name].push(element);
            } else {
              const uniqueId = `${tagIds[tagIndex]}_${index}_${j + 1}`;
              tagQuestions.paginationsIds.push(uniqueId);
              $(element).attr("id", uniqueId);
            }
          });
          temp.push(tagQuestions);
        }
      });

      let paginationsStrucutre = [];

      paperData?.question_structure?.forEach((item, index) => {
        temp.forEach((element) => {
          if (element.type === item.type) {
            if (element.type === "Checkbox" && item?.isMultiQuestions) {
              const multipleTypeQuestionsGroup = element.paginationsIds.splice(
                0,
                1
              );
              paginationsStrucutre = [
                ...paginationsStrucutre,
                ...Array.from(
                  { length: item.numberOfQuestions },
                  () => multipleTypeQuestionsGroup
                ),
              ];
            } else if (element.type === item.type) {
              paginationsStrucutre.push(
                element.paginationsIds.splice(0, item.numberOfQuestions)
              );
            }
          }
        });
      });

      paginationsStrucutre = paginationsStrucutre.flat();

      // Display questions for the first page initially
      questionPassage += `<div className="mainContainer">${$.html()}</div>`;

      const tempPaginationStructure = paginationsStrucutre.map((item) => {
        return {
          question_number: item,
          answer_text: "",
        };
      });

      tempAnswer = {
        exam_id: paperData?.id,
        data: tempPaginationStructure,
      };
      const tempUniqueArr = {
        name: `section-${index + 1}`,
        paginationsIds: paginationsStrucutre,
      };
      setUniqueIdArr((prev) => [...prev, tempUniqueArr]);
      // return questionPassage;
      return new Promise((resolve) => {
        resolve({ questionPassage, tempAnswer }); // resolve with the question passage once it's constructed
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
        for (let paper of examDataList) {
          const index = examDataList.indexOf(paper);
          const returnContent = await fetchHtmlContent(paper, index);
          tempHtmlContents.push(returnContent.questionPassage);
          const tempUniqueArr = {
            name: `section-${index + 1}`,
            ...returnContent.tempAnswer,
          };
          tempExamAnswer.push(tempUniqueArr);
        }
        setHtmlContents(tempHtmlContents);
        setExamAnswer(tempExamAnswer);
        setLinkAnswer(!linkAnswer);
        if (examForm !== "Speaking") {
          setTimerRunning(true);
        }

        // fetch correct answers
        try {
          const response = await ajaxCall(
            `/practice-answers/${fullPaper[0].IELTS.id}/`,
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
            let correctAnswers;
            if (examForm === "Reading") {
              correctAnswers = response.data?.correct_answers.Reading.map(
                (item) => ({
                  exam_id: item.block_id,
                  data: item.answers,
                })
              );
            } else if (examForm === "Listening") {
              correctAnswers = response.data?.correct_answers.Listening.map(
                (item) => ({
                  exam_id: item.block_id,
                  data: item.answers,
                })
              );
            }

            setCorrectAnswers(correctAnswers);
          } else {
            console.log("error");
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    })();
  }, [fullPaper]);

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
        toast.error("You Have All Ready Submitted This Exam");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  const handleRLSubmit = async () => {
    const answersArray = [];
    let bandValue = null;

    examAnswer.forEach((item, index) => {
      const temp = item.data.map((answer, index2) => ({
        question_number: index2 + 1,
        answer_text: answer.answer_text,
      }));
      const tempObj = {
        exam_id: item.exam_id,
        data: temp,
      };
      answersArray.push(tempObj);
    });

    if (examForm === "Reading" || examForm === "Listening") {
      let totalCorrect = 0;
      correctAnswers.forEach((correctAns, index) => {
        const tempExamAnswer = answersArray.find(
          (answer) => answer.exam_id === correctAns.exam_id
        );
        correctAns.data.forEach((correct, idx) => {
          if (correct.answer_text === tempExamAnswer.data[idx].answer_text) {
            totalCorrect += 1;
          }
        });
      });

      if (examForm === "Reading") {
        bandValue = readingBandValues[totalCorrect * 3];
      } else if (examForm === "Listening") {
        bandValue = listeningBandValues[totalCorrect * 4];
      }
    } else if (examForm === "Speaking") {
      let tempBandValueArr = [];
      examAnswer.forEach((item, index) => {
        item.data.forEach((answer, index2) => {
          tempBandValueArr.push(
            answer.answer_text?.split("#Band:")[1].split(" ")[1]
          );
        });
      });
      bandValue =
        tempBandValueArr.reduce((a, b) => a + b, 0) / tempBandValueArr.length;
    }

    try {
      const data = JSON.stringify({
        answer_data: answersArray,
        user: userData?.userId,
        Practise_Exam: parseInt(fullPaper[0].IELTS.id),
        band: bandValue,
        exam_type: examForm,
      });

      const response = await ajaxCall(
        `/answer/practice-test/`,
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
        practiceTestSubmit();
        navigate(`/eaxm-practice-test-answere/${examId}`, {
          state: {
            timeTaken,
            bandValue,
            examForm,
            fullPaper: fullPaper[0].IELTS.id,
          },
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

  const handleWritingSubmit = async () => {
    const answersArray = [];
    let isAllAnswered = true;

    examAnswer.forEach((item, index) => {
      const temp = item.data.map((answer, index2) => {
        if (answer.answer_text === "") isAllAnswered = false;
        return {
          question_number: index2 + 1,
          answer_text: answer.answer_text,
        };
      });
      const tempObj = {
        exam_id: item.exam_id,
        question: item.question,
        data: temp,
      };
      answersArray.push(tempObj);
    });

    if (!isAllAnswered) {
      toast.error("Please answer all the questions before submitting.");
      return;
    }

    let newAnswersArray = [];
    let isError = false;
    try {
      // Wait for all ChatGPT API calls to complete
      await Promise.all(
        answersArray.map(async (item) => {
          let gptResponse;
          let bandValue;
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
                content: `Questions: ${item.question}`,
              },
              {
                role: "user",
                content: `Answers: ${item.data[0].answer_text} `,
              },
              {
                role: "user",
                content:
                  "Give band explanation as #Explanation: exaplanationValue  and band as #Band:bandValue",
              },
            ],
          };

          const res = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_SECRET}`,
              },
              body: JSON.stringify(gptBody),
            }
          );

          if (!res.ok)
            throw new Error("Some Problem Occurred. Please try again.");
          const data = await res.json();
          bandValue = data?.choices?.[0]?.message?.content
            ?.split("#Band:")[1]
            .split(" ")[1];
          gptResponse = data?.choices?.[0]?.message?.content;
          newAnswersArray.push({
            exam_id: item.exam_id,
            band: bandValue,
            AI_Assessment: gptResponse,
            data: item.data,
          });
        })
      );
    } catch (error) {
      isError = true;
      toast.error("Some Problem Occurred. Please try again.");
    }

    if (isError) {
      return;
    }

    try {
      const data = JSON.stringify({
        answer_data: newAnswersArray,
        user: userData?.userId,
        Practise_Exam: parseInt(fullPaper[0].IELTS.id),
        band: null,
      });

      const response = await ajaxCall(
        `/answer/practice-test/`,
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
        practiceTestSubmit();
        navigate(`/eaxm-answere/${examData?.id}`, {
          state: { examAnswer, timeTaken, bandValue: 0, examData },
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

  useEffect(() => {
    if (recordedFilePath) {
      const tempExamAnswer = [...examAnswer];
      tempExamAnswer[next].data[0].answer_text = recordedFilePath;
      setExamAnswer(tempExamAnswer);
    }
  }, [recordedFilePath]);

  const reviewContent = () =>
    examAnswer.map((test, index) => (
      <div key={index}>
        <h4>Test : {index + 1}</h4>
        <div className="card-container">
          {test.data.map((answer, idx) => (
            <div key={idx} className="card answer__width">
              <div className="card-body">
                <h6 className="card-title">Q. {idx + 1}</h6>
                <h6 className="card-text">
                  Answer :{" "}
                  <span className="text-success">{answer.answer_text}</span>
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));

  const renderPagination = useMemo(() => {
    if (uniqueIdArr.length === 0 && examAnswer.length === 0) {
      return null;
    }
    let tempQuestionNumber = 0;
    return uniqueIdArr?.map((item, sectionIndex) => {
      return (
        <div className="lv-section" key={sectionIndex}>
          {/* Section name */}
          <button
            className="lv-footer-section"
            onClick={() => setNext(sectionIndex)}
          >
            {item.name}
          </button>
          {/* Section pagination */}
          {item.paginationsIds?.map((pagination, paginationIndex) => {
            tempQuestionNumber = tempQuestionNumber + 1;
            return (
              <div
                className={`lv-footer-item ${
                  examAnswer[sectionIndex] &&
                  examAnswer[sectionIndex].data.length > 0 &&
                  examAnswer[sectionIndex].data[paginationIndex].answer_text !==
                    ""
                    ? "lv-completed-questions"
                    : ""
                }`}
                onClick={() => {
                  if (next !== sectionIndex) setNext(sectionIndex);
                  setTimeout(() => {
                    scrollToContent(pagination, sectionIndex);
                  }, 100);
                }}
                key={paginationIndex}
              >
                {tempQuestionNumber}
              </div>
            );
          })}
        </div>
      );
    });
  }, [uniqueIdArr, examAnswer, next]);

  const handleWritingAnswer = (e, next) => {
    const answer_text = e.target.value;
    const temp = [...examAnswer];
    temp[next].data[0].answer_text = answer_text;
    setExamAnswer(temp);

    // Count the number of words
    const words = answer_text.split(" ");
    setNumberOfWord(words.length);
  };

  return !instructionCompleted ? (
    <div className="test-instruction">
      {examData.exam_type === "Reading" && (
        <ReadingInstruction
          testType="Practice"
          startTest={handleCompleteInstruciton}
        />
      )}
      {examData.exam_type === "Listening" && (
        <ListeningInstruction
          testType="Practice"
          startTest={handleCompleteInstruciton}
        />
      )}
      {examData.exam_type === "Writing" && (
        <WritingInstruction
          testType="Practice"
          startTest={handleCompleteInstruciton}
        />
      )}
      {examData.exam_type === "Speaking" && (
        <SpeakingInstruction
          testType="Practice"
          startTest={handleCompleteInstruciton}
        />
      )}
    </div>
  ) : (
    <>
      <div className="lv-navbar">
        <div className="lv-navbar-title">
          <h2>{examData?.exam_category}</h2>
          <div className="lv-userName">{userData?.username}</div>
          <div style={{ marginLeft: "10px" }}>/</div>
          <div className="lv-userName">{`${examData?.exam_name}`}</div>
        </div>
        <span className="lv-navbar-title">
          Time Taken :<span className="lv-userName">{timeTaken}</span>
        </span>
        <div className="lv-navbar-title-mobile">
          <div className="username-mobile">
            <h2>{examData?.exam_category}</h2>
            <div className="mobile-breadcumb">
              <div className="lv-userName">{userData?.username}</div>
              <div style={{ margin: "15px 0px 0 10px" }}>/</div>
              <div className="lv-userName">{`${examData?.exam_name}`}</div>
            </div>
          </div>
          <div className="lv-navbar-footer">
            <span>
              Time Taken :<span className="lv-userName">{timeTaken}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="lv-container">
        {/* Main Container */}
        {renderAudio(examData?.audio_file)}
        <div className="lv-main-container">
          {/* Left Container */}
          {(examData?.exam_type === "Reading" ||
            examData?.exam_type === "Listening" ||
            examData?.exam_type === "Writing") && (
            <div className="lv-left-container">
              {displayLeftContainer(examData?.passage, examData?.passage_image)}
            </div>
          )}
          {examData?.exam_type === "Speaking" && (
            <div className="lv-left-container">
              <button
                className="lv-footer-button"
                onClick={speak}
                disabled={speaking === 1}
                style={{
                  opacity: speaking === 1 ? 0.5 : 1,
                  cursor: speaking === 1 ? "not-allowed" : "pointer",
                }}
              >
                {speaking ? "Replay" : "Start"}
              </button>
            </div>
          )}

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
                    __html: htmlContents?.[next],
                  }}
                />
              )}
              {examData?.exam_type === "Writing" && (
                <div className="lv-textarea">
                  <textarea
                    id={`textarea_${next}`}
                    className="writing__textarea"
                    value={examAnswer[next]?.data[0]?.answer_text || ""}
                    onChange={(e) => handleWritingAnswer(e, next)}
                  />
                  <span>{numberOfWord} Words</span>
                </div>
              )}
              {examData?.exam_type === "Speaking" && (
                <AudioRecorder
                  setRecordedFilePath={setRecordedFilePath}
                  next={next}
                  exam_id={examData?.id}
                  enableRecording={speaking === 2}
                />
              )}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <div className="lv-question-pagination">
            <div className="lv-section-pagination">{renderPagination}</div>
          </div>
          <div className="lv-footer-btn">
            {(examData?.exam_type === "Reading" ||
              examData?.exam_type === "Listening") && (
              <button
                className="lv-footer-button review_size"
                onClick={() => setIsModalOpen(true)}
              >
                Review
              </button>
            )}
            <button
              className="lv-footer-button"
              style={{
                display: next === 0 ? "none" : "block",
              }}
              onClick={() => {
                setReRenderAudio(false);
                setNext(next - 1);
              }}
            >
              <span>Back</span>
            </button>
            <button
              className="lv-footer-button"
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
              <span>&#10152;</span>
            </button>
            <button
              className="lv-footer-button"
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
                      handleWritingSubmit();
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

export default PracticeLiveExam;
