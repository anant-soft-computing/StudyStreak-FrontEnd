import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../css/LiveExam.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import AudioRecorder from "../Exam-Create/AudioRecorder";
import Modal from "react-bootstrap/Modal";
import readingBandValues from "../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../utils/bandValues/listeningBandValues";
import SmallModal from "../UI/Modal";
const Cheerio = require("cheerio");

const FullLengthLiveExam = () => {
  const containerRef = useRef(null);
  const { examId } = useParams();
  const navigate = useNavigate();
  const examType = useLocation()?.pathname?.split("/")?.[4];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const [examData, setExamData] = useState([]);
  const [uniqueIdArr, setUniqueIdArr] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [timer, setTimer] = useState(3600);
  const [timerRunning, setTimerRunning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullPaper, setFullPaper] = useState([]);
  const [fullLengthId, setFullLengthId] = useState("");
  const [next, setNext] = useState(0);
  const [count, setCount] = useState(0);
  const [modalCounter, setModalCounter] = useState(0);
  const [displayWritingModal, setDisplayWritingModal] = useState(false);
  const [writingModalOpenOnce, setWritingModalOpenOnce] = useState(false);
  const [displayListeningModal, setDisplayListeningModal] = useState(false);
  const [listeningModalOpenOnce, setListeningModalOpenOnce] = useState(false);
  const [displaySpeakingModal, setDisplaySpeakingModal] = useState(false);
  const [speakingModalOpenOnce, setSpeakingModalOpenOnce] = useState(false);
  const [linkAnswer, setLinkAnswer] = useState(false);
  const [numberOfWord, setNumberOfWord] = useState(0);
  const [recordedFilePath, setRecordedFilePath] = useState("");
  const timeTaken = `${Math.floor(timer / 60)}:${timer % 60}`;
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));
  let highlightedElement = null;

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
          `/get/flt/?difficulty_level=Easy`,
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
          const filteredData = response?.data?.filter(
            (examBlock) => examBlock?.id.toString() === examId.toString()
          );
          let pappers = [];
          filteredData[0].reading_set.Reading.forEach((item) => {
            pappers.push({ ...item, paperId: filteredData[0].reading_set.id });
          });
          filteredData[0].writing_set.Writing.forEach((item) => {
            pappers.push({ ...item, paperId: filteredData[0].writing_set.id });
          });
          filteredData[0].listening_set.Listening.forEach((item) => {
            pappers.push({
              ...item,
              paperId: filteredData[0].listening_set.id,
            });
          });
          filteredData[0].speaking_set.Speaking.forEach((item) => {
            pappers.push({ ...item, paperId: filteredData[0].speaking_set.id });
          });
          filteredData[0].papers = pappers;
          setFullPaper(pappers);
          setFullLengthId(filteredData[0].id);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examId]);

  useEffect(() => {
    (async () => {
      try {
        if (
          examData?.exam_type === "Reading" ||
          examData?.exam_type === "Listening"
        ) {
          const correctAnswersAlready =
            correctAnswers.filter((item) => item.exam_id === examData?.id)
              .length > 0;
          if (correctAnswersAlready) return;

          const response = await ajaxCall(
            `/practice-answers/${examData?.paperId}`,
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
            let tempCorrectAnswers;
            if (examData.exam_type === "Reading") {
              tempCorrectAnswers = response.data?.correct_answers.Reading.map(
                (item) => ({
                  exam_id: item.block_id,
                  data: item.answers,
                })
              );
            } else if (examData?.exam_type === "Listening") {
              tempCorrectAnswers = response.data?.correct_answers.Listening.map(
                (item) => ({
                  exam_id: item.block_id,
                  data: item.answers,
                })
              );
            }
            tempCorrectAnswers = tempCorrectAnswers.filter(
              (item) => item.exam_id === examData?.id
            );

            setCorrectAnswers([...correctAnswers, ...tempCorrectAnswers]);
          } else {
            console.log("error");
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [examData]);

  useEffect(() => {
    if (fullPaper?.length !== 0) {
      let examBlockWithNumbers = fullPaper?.map((examBlock, index) => ({
        ...examBlock,
        no: index + 1,
      }));
      setExamData(examBlockWithNumbers[next]);
    }
  }, [fullPaper, next]);

  const handleAnswerLinking = (e, question_number, next) => {
    const { value, id } = e.target;

    const elementId = id.split("_")[0];

    const temp = [...examAnswer];
    temp[next].data.map((item) => {
      if (item.question_number === id && elementId === "InputText") {
        const trimedValue = value.trim();
        item.answer_text = trimedValue;
      } else if (item.question_number === id) {
        item.answer_text = value;
      }
    });
    setExamAnswer(temp);
  };

  useEffect(() => {
    if (linkAnswer && examAnswer[next] && examAnswer[next].data.length > 0) {
      setTimeout(() => {
        examAnswer[next].data.forEach((item) => {
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
              handleAnswerLinking(e, item.question_number, next);
            });
          });
        });
        setLinkAnswer(false);
      }, 500);
    }
  }, [linkAnswer, examAnswer]);

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

  const displayLeftContainer = (passage, image) => {
    // Replace this with your actual implementation
    return (
      <>
        {image && (
          <img
            className="mb-2"
            src={image}
            alt="Study Streak"
            height={250}
            width={250}
          />
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: passage,
          }}
        ></div>
      </>
    );
  };

  const htmlContent = useMemo(() => {
    const question = examData?.question;
    if (
      examData?.exam_type === "Writing" ||
      examData?.exam_type === "Speaking"
    ) {
      const temp = [...examAnswer];
      temp[next] = {
        exam_id: examData?.id,
        question: examData?.question,
        data: [
          {
            question_number:
              examData?.exam_type === "Writing"
                ? `textarea_${next}`
                : `speaking_${next}`,
            answer_text: (temp[next] && temp[next]?.data[0]?.answer_text) || "",
          },
        ],
        exam_type: examData?.exam_type,
      };
      setExamAnswer(temp);
      setLinkAnswer(true);
      if (examData?.exam_type === "Writing") {
        setUniqueIdArr([`textarea_${next}`]);
      } else {
        setUniqueIdArr([`speaking_${next}`]);
      }
    } else if (
      examData?.exam_type === "Reading" ||
      examData?.exam_type === "Listening"
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

      let questionPassage = "";
      const temp = [];

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
      questionPassage += `<div className="mainContainer">${$.html()}</div>`;

      const tempAnswer = paginationsStrucutre.map((item) => {
        return {
          question_number: item,
          answer_text: "",
        };
      });

      const tempAnswerArr = [...examAnswer];

      if (!tempAnswerArr[next] || tempAnswerArr[next]?.data.length === 0) {
        tempAnswerArr[next] = {
          exam_id: examData?.id,
          data: tempAnswer,
          exam_type: examData?.exam_type,
        };
        setExamAnswer(tempAnswerArr);
      }
      setUniqueIdArr(paginationsStrucutre);
      setLinkAnswer(true);
      return questionPassage;
    }
  }, [examData?.question]);

  const renderTime = useMemo(
    () => (
      <span>
        Time Left :<span className="lv-userName">{timeTaken}</span>
      </span>
    ),
    [timer]
  );

  const practiceTestSubmit = async () => {
    const data = {
      student_id: studentId,
      exam_id: parseInt(examId),
      typetest: "Practice",
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

  const handleRLSubmit = async () => {
    const answersArray = [];
    let isAllAnswered = true;
    let bandValue = 0;

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
        data: temp,
        exam_type: item.exam_type,
        question: item?.question,
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
      // Wait for all ChatGPT API calls to complete for writing only
      await Promise.all(
        answersArray.map(async (item) => {
          if (item.exam_type === "Writing") {
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
          } else if (
            item.exam_type === "Reading" ||
            item.exam_type === "Listening"
          ) {
            let totalCorrect = 0;
            const tempCorrectAnswers =
              correctAnswers?.find((val) => val.exam_id === item.exam_id)
                ?.data || [];

            item.data.forEach((answer, index) => {
              if (
                answer.answer_text === tempCorrectAnswers[index].answer_text
              ) {
                totalCorrect++;
              }
            });

            if (examForm === "Reading") {
              bandValue = readingBandValues[totalCorrect];
            } else if (examForm === "Listening") {
              bandValue = listeningBandValues[totalCorrect];
            }

            newAnswersArray.push({
              exam_id: item.exam_id,
              band: bandValue,
              data: item.data,
            });
          } else {
            newAnswersArray.push({
              exam_id: item.exam_id,
              band: 0,
              data: item.data,
            });
          }
        })
      );
    } catch (error) {
      isError = true;
      toast.error("Some Problem Occurred. Please try again.");
    }

    if (isError) return;

    try {
      const data = JSON.stringify({
        answer_data: newAnswersArray,
        user: userData?.userId,
        Full_Length_Exam: parseInt(fullLengthId),
        exam_type: "Reading",
      });

      const response = await ajaxCall(
        `/answer/full-length-test/`,
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
          state: { timeTaken, bandValue, examForm },
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

  const handleWritingAnswer = (e, next) => {
    const answer_text = e.target.value;
    const temp = [...examAnswer];
    temp[next].data[0].answer_text = answer_text;
    setExamAnswer(temp);

    // Count the number of words
    const words = answer_text.split(" ");
    setNumberOfWord(words.length);
  };

  useEffect(() => {
    if (recordedFilePath) {
      const tempExamAnswer = [...examAnswer];
      tempExamAnswer[next].data[0].answer_text = recordedFilePath;
      setExamAnswer(tempExamAnswer);
    }
  }, [recordedFilePath]);

  const handleBackSectionClicked = () => {
    setNext(next - 1);
    setCount((prev) => prev - 1);
  };
  const handleNextSectionClicked = () => {
    setNext(next + 1);
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (count === 3 && !writingModalOpenOnce) {
      setDisplayWritingModal(true);
      setWritingModalOpenOnce(true);
    } else if (count === 5 && !listeningModalOpenOnce) {
      setDisplayListeningModal(true);
      setListeningModalOpenOnce(true);
    } else if (count === 9 && !speakingModalOpenOnce) {
      setDisplaySpeakingModal(true);
      setSpeakingModalOpenOnce(true);
    }
  }, [count]);

  const displayReadingModalContent = () => {
    return (
      <div className="px-3">
        <p>There are four parts with related questions.</p>
        <div>
          <ul>
            <li>Three sections with tasks: </li>
            <br />
            <li>• Section 1: Two or three factual texts</li>
            <br />
            <li>• Section 2: Two short, work-related factual texts</li>
            <br />
            <li>
              • Section 3: One longer text on a topic of general interest.
            </li>
          </ul>
        </div>
        <p>
          A range of native-speaker accents is used. All standard varieties of
          English are accepted as responses in all parts of the test.
        </p>
        <p>
          Texts ranging from the descriptive and factual to the discursive and
          analytical.
        </p>
        <p>
          Text might include non-verbal material such as diagrams, graphs or
          illustrations.
        </p>
        <p>
          Texts are authentic and are sourced from books, journals and
          newspapers.
        </p>
      </div>
    );
  };

  const displayWritingModalContent = () => {
    return (
      <div className="px-3">
        <p>There are two tasks:</p>
        <ul>
          <li>
            Task 1 – summarise, describe or explain a table, graph, chart or
            diagram in 150 words.
          </li>

          <li>Task 2 – short essay task of at least 250 words.</li>
        </ul>
      </div>
    );
  };

  const displayListeningModalContent = () => {
    return (
      <div className="px-3">
        <p>Four long sections with tasks</p>
        <p>
          Texts ranging from the descriptive and factual to the discursive and
          analytical.
        </p>
      </div>
    );
  };

  const displaySpeakingModalContent = () => {
    return (
      <div className="px-3">
        <p>There are three parts:</p>
        <ul>
          <li>• Short questions </li>
          <br />
          <li>• Speaking at length about a familiar topic</li>
          <br />
          <li>• Structured discussion.</li>
        </ul>
        <p>
          The Speaking test is a face-to-face conversation with a real person
          making similar to a real-life situation.
        </p>
      </div>
    );
  };

  return (
    <>
      {/* Navbar */}
      <div className="lv-navbar">
        <div className="lv-navbar-title">
          <h2 style={{ color: "red", marginTop: "10px" }}>IELTS</h2>
          <div className="lv-userName">{userData?.username}</div>
        </div>
        {renderTime}
      </div>

      {/* Static Container */}
      <div className="lv-container">
        <div className="lv-container-title">{`${examData?.exam_name}`}</div>
      </div>

      <div>
        <SmallModal
          isOpen={displayWritingModal}
          onClose={() => setDisplayWritingModal(false)}
          title={"Writing Section"}
          children={displayWritingModalContent()}
        />

        <SmallModal
          isOpen={displayListeningModal}
          onClose={() => setDisplayListeningModal(false)}
          title={"Listening Section"}
          children={displayListeningModalContent()}
        />

        <SmallModal
          isOpen={displaySpeakingModal}
          onClose={() => setDisplaySpeakingModal(false)}
          title={"Speaking Section"}
          children={displaySpeakingModalContent()}
        />
      </div>

      {/* Main Container */}
      <div>{renderAudio(examData?.audio_file)}</div>
      <div className="lv-main-container">
        {/* Left Container */}
        <div className="lv-left-container">
          {displayLeftContainer(examData?.passage, examData?.passage_image)}
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
            {examData?.exam_type === "Writing" && (
              <div className="lv-textarea">
                <textarea
                  id={`textarea_${next}`}
                  style={{ width: "100%", height: "200px" }}
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
              />
            )}
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
                  examAnswer[next] &&
                  examAnswer[next].data.length > 0 &&
                  examAnswer[next].data.find(
                    (val) => val.question_number === item
                  )?.answer_text !== ""
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
        <div className="lv-footer-btn">
          {(examData?.exam_type === "Reading" ||
            examData?.exam_type === "Listening") && (
            <button
              className="lv-footer-button"
              style={{ fontSize: "20px" }}
              onClick={() => setIsModalOpen(true)}
            >
              Review
            </button>
          )}
          <button
            className="lv-footer-button"
            style={{
              display: next === 0 ? "none" : "block",
              cursor: linkAnswer ? "not-allowed" : "pointer",
              opacity: linkAnswer ? 0.5 : 1,
            }}
            onClick={handleBackSectionClicked}
            disabled={linkAnswer}
          >
            <span>Back</span>
          </button>
          <button
            className="lv-footer-button"
            style={{
              display: fullPaper.length === next + 1 ? "none" : "block",
              cursor: linkAnswer ? "not-allowed" : "pointer",
              opacity: linkAnswer ? 0.5 : 1,
            }}
            onClick={handleNextSectionClicked}
            disabled={linkAnswer}
          >
            <span>&#10152;</span>
          </button>
          <button
            className="lv-footer-button"
            style={{
              display: next !== (fullPaper.length > 0 ? "none" : "block"),
              cursor: linkAnswer ? "not-allowed" : "pointer",
              opacity: linkAnswer ? 0.5 : 1,
            }}
            onClick={handleRLSubmit}
            disabled={linkAnswer}
          >
            <span>&#x2713;</span>
          </button>
        </div>
      </div>
      {isModalOpen &&
        (examData?.exam_type === "Reading" ||
          examData?.exam_type === "Listening") && (
          <Modal
            size="lg"
            show={isModalOpen}
            onHide={() => setIsModalOpen(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Your Answers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {examAnswer.map((test, index) => (
                  <div key={index}>
                    <h4>Test : {index + 1}</h4>
                    <div className="card-container">
                      {test.data.map((answer, idx) => (
                        <div
                          key={idx}
                          className="card"
                          style={{ maxWidth: "30%" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Q. {idx + 1}</h6>
                            <h6 className="card-text">
                              Answer :{" "}
                              <span className="text-success">
                                {answer.answer_text}
                              </span>
                            </h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal>
        )}
    </>
  );
};

export default FullLengthLiveExam;
