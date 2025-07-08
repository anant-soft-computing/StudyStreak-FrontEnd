import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ajaxCall from "../../../../../../../helpers/ajaxCall";
import Loading from "../../../../../../UI/Loading";
import SmallModal from "../../../../../../UI/Modal";

const instructions = {
  SST: "You will hear a short lecture. Write a summary for a fellow student who was not present at the lecture. You should write 50-70 words. You have 10 minutes to finish this task. Your response will be judged on the Quality of Your writing and on how well your response presents the key points presented in the lecture.",
  WFD: "You will hear a sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.",
};

const LivePTESSTWFDExam = () => {
  const navigate = useNavigate();
  const examId = useLocation()?.pathname?.split("/")?.[6];
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const [timer, setTimer] = useState(600);
  const [examData, setExamData] = useState({});
  const [fullPaper, setFullPaper] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [reRenderAudio, setReRenderAudio] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // 0 means before start, 1 means after start, 2 means after finish
  const [next, setNext] = useState(0);
  const [linkAnswer, setLinkAnswer] = useState(false);

  const audioRef = useRef(null);
  const [countdown, setCountdown] = useState(10);
  const [audioStatus, setAudioStatus] = useState("not started");
  const timeTaken = `${Math.floor(timer / 60)}:${timer % 60}`;

  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  useEffect(() => {
    setTimer(10 * 60);
  }, [next]);

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
      setReRenderAudio(true);
      setExamData(examBlockWithNumbers[next]);
    }
  }, [examForm, examType, fullPaper, next]);

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

  const fetchHtmlContent = async (paperData, index) => {
    let tempAnswer = {};

    if (paperData?.exam_type === "Listening") {
      tempAnswer = {
        exam_id: paperData?.id,
        data: [
          {
            question_number:
              paperData?.exam_type === "Listening" && `textarea_${index}_1`,
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
        console.log("Latest Exam Submitted Successfully");
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
    const answersArray = examAnswer.map((item) => {
      const data = item.data.map((answer, index) => ({
        question_number: index + 1,
        answer_text: answer.answer_text,
      }));
      return {
        exam_id: item.exam_id,
        question: item.question,
        data,
      };
    });

    let newAnswersArray = [];

    try {
      await Promise.all(
        answersArray.map(async (item) => {
          let gptResponse = "";
          let scoreValue = 0;

          // Skip if the answer is empty
          if (!item.data[0].answer_text) {
            newAnswersArray.push({
              exam_id: item.exam_id,
              band: 0,
              AI_Assessment: "",
              data: item.data,
            });
            return;
          }

          const transcript =
            examData?.passage && examData?.passage?.replace(/<img[^>]*>/g, "");

          // Prompts are configured to request plain-text formatting
          const gptBody =
            examData?.sub_category === "WFD"
              ? {
                  model: "gpt-3.5-turbo",
                  messages: [
                    {
                      role: "user",
                      content:
                        "You are an expert evaluator for the PTE Listening Write From Dictation. Assess the student's written response based on official PTE criteria and provide a detailed score with explanations. Use strict evaluation. Follow the instructions below precisely:",
                    },
                    {
                      role: "user",
                      content: `Audio Transcript: ${transcript}`,
                    },
                    {
                      role: "user",
                      content: `Answer: ${item.data[0].answer_text}\nQuestion Type: Write From Dictation`,
                    },
                    {
                      role: "user",
                      content: `Evaluate based on: Write From Dictation:

                      Correct Words (0-N):
                      - +1 point for each correctly transcribed word (including punctuation and capitalization).
                      - 0 points for incorrect or missing words.

                      Provide:
                      1. Detailed explanations with strengths, weaknesses, and improvements.
                      2. Number of correct words
                      3. Overall Score (0-N) based on the number of correct words

                      #Evaluation Format:

                      Correct Words: [Explanation]
                      Score: X/N

                      Overall Score: X/N

                      Respond only with the evaluation up to the Overall Score. Do not include any additional text or explanation beyond this point.`,
                    },
                  ],
                }
              : {
                  model: "gpt-3.5-turbo",
                  messages: [
                    {
                      role: "user",
                      content:
                        "You are an expert evaluator for the PTE Listening Summarize Spoken Text. Assess the student's written response based on official PTE criteria and provide a detailed score with explanations. Use strict evaluation. Follow the instructions below precisely:",
                    },
                    {
                      role: "user",
                      content: `Audio Transcript: ${transcript}`,
                    },
                    {
                      role: "user",
                      content: `Answer: ${item.data[0].answer_text}\nQuestion Type: Summarize Spoken Text`,
                    },
                    {
                      role: "user",
                      content: `Evaluate based on: Summarize Spoken Text
      
                        Content (0-2):
                        - 2: Includes all relevant key points and ideas from the spoken text.
                        - 1: Includes only some key points or ideas but misses others.
                        - 0: Fails to include any relevant key points or is off-topic.
      
                        Form (0-2):
                        - 2: The response is one sentence, within the 50–70 word limit.
                        - 1: The response is over or under the word limit or includes multiple sentences.
                        - 0: The response does not meet the task requirements.
      
                        Grammar (0-2):
                        - 2: The response has no grammatical errors and demonstrates complex sentence structures.
                        - 1: The response has minor grammatical errors that do not affect meaning.
                        - 0: Major grammatical errors that interfere with understanding.
      
                        Vocabulary (0-2):
                        - 2: Demonstrates appropriate word choice and variety, with correct collocations.
                        - 1: Limited vocabulary or minor errors in word choice.
                        - 0: Frequent vocabulary errors that interfere with meaning.
      
                        Spelling (0-2):
                        - 2: No spelling errors.
                        - 1: One or two spelling errors.
                        - 0: Frequent spelling errors.
      
                        Provide:
                        1. Detailed explanations with strengths, weaknesses, and improvements.
                        2. Individual criterion scores.
                        3. Total Score using the exact format below:

                        Total Score: X/10

                        - The calculation must always be formatted exactly as above.
                        - Do not simplify the fraction (e.g., display 8/10).

                        #Evaluation Format:
      
                        Content: [Explanation]
                        Score: X/2
      
                        Form: [Explanation]
                        Score: X/2
      
                        Grammar: [Explanation]
                        Score: X/2
      
                        Vocabulary: [Explanation]
                        Score: X/2
      
                        Spelling: [Explanation]
                        Score: X/2
      
                        Total Score: X/10`,
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

            // ⭐ Refined score extraction logic
            const scoreRegex =
              examData?.sub_category === "WFD"
                ? /Overall Score:\s*(\d+)\/\d+/
                : /Total Score:\s*(\d+)\/\d+/;

            const scoreMatch = gptResponse.match(scoreRegex);

            // Directly assign the captured score (group 1)
            scoreValue = scoreMatch ? scoreMatch[1] : null;

            // Convert AI response to HTML format
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
        navigate(
          `/PTE/Listening/${examData?.sub_category === "WFD" ? "WFD" : "SST"}/${
            fullPaper[0].IELTS.id
          }`
        );
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

  const handleListeningAnswer = (e, next) => {
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
          {examData?.exam_category} /{" "}
          {examData?.sub_category === "SST"
            ? "Summarize spoken text"
            : "Write from diction"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <i className="icofont-stopwatch" style={{ fontSize: "20px" }}></i>
          <span>Timer:</span>
          <span style={{ fontWeight: "500" }}>{timeTaken}</span>
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
          {instructions[examData?.sub_category]}
        </div>
        {renderAudio(examData?.audio_file)}
        <div
          style={{
            padding: "20px",
            overflow: "auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <textarea
            id={`textarea_${next}`}
            className="writing__textarea"
            value={examAnswer[next]?.data[0]?.answer_text || ""}
            onChange={(e) => handleListeningAnswer(e, next)}
            style={{
              width: "100%",
              padding: "15px",
              border: "1px solid #01579b",
              borderRadius: "8px",
              resize: "none",
              fontSize: "16px",
              lineHeight: "1.5",
              backgroundColor: "#f9f9f9",
              transition: "border-color 0.3s ease",
            }}
          />
          <div
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "#333",
              marginTop: "10px",
            }}
          >
            Total Word Count: {examAnswer[next]?.wordCount || 0}
          </div>
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

export default LivePTESSTWFDExam;
