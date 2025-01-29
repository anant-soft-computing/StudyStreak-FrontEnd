import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../../UI/Loading";
import SmallModal from "../../../../../UI/Modal";
import ajaxCall from "../../../../../../helpers/ajaxCall";

const instructions = {
  SWT: "Read the passage below and summarize it using one sentence. Type your response in the box at the bottom of your screen. You have 10 minutes to finish your task. Your response will be judged on the quality of your writing and how well your response presents the key points in the passage. Your response must be between 5 and 75 words.",
  WE: "You will have 20 minutes to plan, write and revise an essay about the topic below. Your response will be judged on how well you develop a position, organize your ideas, present Supporting details, and control the elements of standard written English.",
};

const LivePTEWritingExam = () => {
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
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

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

  const fetchHtmlContent = async (paperData, index) => {
    let tempAnswer = {};

    if (paperData?.exam_type === "Writing") {
      tempAnswer = {
        exam_id: paperData?.id,
        data: [
          {
            question_number:
              paperData?.exam_type === "Writing" && `textarea_${index}_1`,
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

    try {
      // Wait for all ChatGPT API calls to complete
      await Promise.all(
        answersArray.map(async (item) => {
          let gptResponse = "";
          let scoreValue = null;

          const passage = examData?.passage
            ? examData?.passage?.replace(/<img[^>]*>/g, "")
            : "Passage not found";

          const questionTypeMap = {
            SWT: "Summarize Written Text",
            WE: "Write Essay",
          };

          const questionType = questionTypeMap[examData?.sub_category];

          const gptBody = {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content:
                  "You are an expert evaluator for the PTE Writing Exam. Assess the student's written response based on official PTE criteria and provide a detailed score with explanations. Use strict evaluation.",
              },
              {
                role: "user",
                content: `Questions: ${passage}`,
              },
              {
                role: "user",
                content: `Answer: ${item.data[0].answer_text}
                          Question Type: ${questionType}`,
              },
              {
                role: "user",
                content: `Evaluate based on:${
                  questionType === "Summarize Written Text"
                    ? `
                  
                  Content (0-2): Does it capture all key points?
                  Form (0-1): Single sentence within word limit?
                  Grammar (0-2): Error-free sentence?
                  Vocabulary (0-2): Appropriate word choice?
                  Spelling (0-2): No spelling errors?`
                    : `
                  
                  Content (0-3): Complete topic coverage?
                  Form (0-2): Proper length & structure?
                  Development (0-2): Logical organization?
                  Grammar (0-2): Grammatical accuracy?
                  Vocabulary (0-2): Precise word choice?
                  Spelling (0-2): No spelling errors?`
                }
          
                  Provide:
                  1. Detailed explanations with strengths, *weaknesses, and **improvements*
                  2. Individual criterion scores
                  3. Overall Band Score (0-90) using PTE conversion
          
                  #Evaluation Format:
                  ${
                    questionType === "Summarize Written Text"
                      ? `
                  Content: [Explanation]  
                  Score: X/2
          
                  Form: [Explanation]  
                  Score: X/1
          
                  Grammar: [Explanation]  
                  Score: X/2
          
                  Vocabulary: [Explanation]  
                  Score: X/2
          
                  Spelling: [Explanation]  
                  Score: X/2`
                      : `
                  Content: [Explanation]  
                  Score: X/3
          
                  Form: [Explanation]  
                  Score: X/2
          
                  Development: [Explanation]  
                  Score: X/2
          
                  Grammar: [Explanation]  
                  Score: X/2
          
                  Vocabulary: [Explanation]  
                  Score: X/2
          
                  Spelling: [Explanation]  
                  Score: X/2`
                  }
          
                  #Overall Band Score: ${
                    questionType === "Summarize Written Text"
                      ? "(Sum × 10)"
                      : "(Sum × 6)"
                  }/90
          
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

            const scoreMatch = gptResponse.match(
              /Overall Band Score:\s*.*?=\s*(\d+)/
            );
            scoreValue = scoreMatch ? scoreMatch[1] : null;

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
            toast.error("AI response is empty. Please try again.");
          }
        })
      );
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
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
        submitExam();
        navigate(`/PTE/Writing/${fullPaper[0].IELTS.id}`);
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
          {examData?.exam_category} / {examData?.exam_name}
        </div>
        <div>
          <i className="icofont-stopwatch mr-2"></i>
          <span>Time Remaining :</span>
          <span className="ml-2">{timeTaken}</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            padding: "20px",
          }}
        >
          {instructions[examSubcategory]}
        </div>
        <div
          style={{
            padding: "20px",
            overflow: "auto",
          }}
        >
          {examData?.passage && (
            <div
              dangerouslySetInnerHTML={{
                __html: examData?.passage,
              }}
            />
          )}
          <div>
            <textarea
              id={`textarea_${next}`}
              className="writing__textarea"
              value={examAnswer[next]?.data[0]?.answer_text || ""}
              onChange={(e) => handleWritingAnswer(e, next)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #01579b",
                resize: "none",
              }}
            />
            <div>Total Word Count: {examAnswer[next]?.wordCount || 0}</div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #01579b",
            borderBottom: "1px solid #01579b",
            padding: "20px",
          }}
        >
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center">
            <div className="mb-2 mb-sm-0">
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
                onClick={() => setNext(next - 1)}
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
                onClick={() => setNext(next + 1)}
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
            justifyContent: "space-between",
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
  );
};

export default LivePTEWritingExam;
