import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../../UI/Loading";
import SmallModal from "../../../../../UI/Modal";
import ajaxCall from "../../../../../../helpers/ajaxCall";

const instructions = {
  SWT: "Read the passage below and summarize it using one sentence. Type your response in the box at the bottom of the screen. You have 10 minutes to finish this task. Your response will be judged on the quality of your writing and on how well your response presents the key points in the passage.",
  WE: "You will have 20 minutes to plan, write and revise an essay about the topic below. Your response will be judged on how well you develop a position, organize your ideas, present supporting details, and control the elements of standard written English. You should write 200-300 words.",
};

const LivePTEWritingExam = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const examId = useLocation()?.pathname?.split("/")?.[5];
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const examSubcategory = useLocation()?.pathname?.split("/")?.[4];
  const [timer, setTimer] = useState(600);
  const [examData, setExamData] = useState({});
  const [fullPaper, setFullPaper] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // 0 means before start, 1 means after start, 2 means after finish
  const [next, setNext] = useState(0);
  const [linkAnswer, setLinkAnswer] = useState(false);
  const timeTaken = `${Math.floor(timer / 60)}:${timer % 60}`;
  const userData = JSON.parse(localStorage.getItem("loginInfo"));

  useEffect(() => {
    if (examSubcategory === "SWT") {
      setTimer(10 * 60);
    } else {
      setTimer(20 * 60);
    }
  }, [examSubcategory, next]);

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
      setExamData(examBlockWithNumbers[next]);
    }
  }, [examForm, examType, fullPaper, next]);

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
    if (examAnswer.length > 0) {
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
  }, [linkAnswer, next]);

  const fetchHtmlContent = async (paperData, index) => {
    let tempAnswer = {};

    if (paperData?.exam_type === "Writing") {
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
          let gptResponse = "";
          let scoreValue = null;

          const passage = examData?.passage
            ? examData?.passage?.replace(/<img[^>]*>/g, "")
            : "Passage not found";

          const gptBody = {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content:
                  "You are an expert evaluator for the PTE Writing Exam. Assess the student's written response based on official PTE criteria and provide a detailed score with explanations. Use strict evaluation and provide scores in 1-point increments (0-90).",
              },
              {
                role: "user",
                content: `Questions: ${passage}`,
              },
              {
                role: "user",
                content: `Answer: ${item.data[0].answer_text}
                      
                      Question Type: Essay`,
              },
              {
                role: "user",
                content: `Evaluate based on:
                      
                      Content: Does the response address the task completely and appropriately? Score: (0-90)
                      
                      Form: Is the response within the required word count and format? Score: (0-90)
                      
                      Grammar: Is a wide range of grammatical structures used accurately? Score: (0-90)
                      
                      Vocabulary: Is a wide range of vocabulary used with precision and accuracy? Score: (0-90)
                      
                      Spelling: Are spelling and word choice appropriate? Score: (0-90)
                    
                      Provide an Overall Band Score (0-90) based on the individual criteria.
      
                      Additionally, include detailed explanations for each score, outlining the **strengths**, **weaknesses**, and **areas for improvement**.
                      
                      #Evaluation Format:
                      Content: [Explanation]  
                      Score: X/90
      
                      Form: [Explanation]  
                      Score: X/90
      
                      Grammar: [Explanation]  
                      Score: X/90
      
                      Vocabulary: [Explanation]  
                      Score: X/90 
      
                      Spelling: [Explanation]  
                      Score: X/90
      
                      #Overall Band Score:X/90
      
                      Respond only with the evaluation up to the #Overall Band Score. Do not include any additional text or explanation beyond this point.`,
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

          const data = await res.json();

          if (data?.choices?.[0]?.message?.content) {
            gptResponse = data.choices[0].message.content;

            // Use regex to extract the score value
            const scoreMatch = gptResponse.match(/Overall Band Score:\s*(\d+)/);
            scoreValue = scoreMatch ? scoreMatch[1] : null;

            if (!scoreValue) {
              isError = true;
              toast.error(
                "Score value could not be extracted. Please try again."
              );
              return;
            }

            // Convert gptResponse to HTML format
            const formattedResponse = gptResponse
              .split("\n")
              .map((line) => `<p>${line}</p>`)
              .join("");

            newAnswersArray.push({
              exam_id: item.exam_id,
              band: scoreValue,
              AI_Assessment: formattedResponse,
              data: item.data,
            });
          } else {
            isError = true;
            toast.error("AI response is empty. Please try again.");
            return;
          }
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
        navigate(`/PTE/Assessment/Writing/${fullPaper[0].IELTS.id}`);
      } else if (response.status === 400) {
        toast.error("Please Submit Your Exam Answer");
      } else {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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

  const handleWritingAnswer = (e, next) => {
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
          <div className="lv-right-container" ref={containerRef}>
            <div className="lv-box-right">
              <div className="text-black" style={{ fontWeight: "bold" }}>
                {instructions[examSubcategory]}
              </div>
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
                  onChange={(e) => handleWritingAnswer(e, next)}
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
                <button
                  className="btn btn-success"
                  onClick={() => handleWritingSubmit()}
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

export default LivePTEWritingExam;
