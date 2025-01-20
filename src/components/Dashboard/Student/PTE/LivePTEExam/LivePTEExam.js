import React, { useEffect, useMemo, useRef, useState } from "react";
import "../../../../../css/LiveExam.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import SmallModal from "../../../../UI/Modal";
import Loading from "../../../../UI/Loading";
import ajaxCall from "../../../../../helpers/ajaxCall";
import ReadingInstruction from "../../../../Instruction/ReadingInstruction";
import WritingInstruction from "../../../../Instruction/WritingInstruction";
import ListeningInstruction from "../../../../Instruction/ListeningInstruction";
const Cheerio = require("cheerio");

const LivePTEExam = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const examType = useLocation()?.pathname?.split("/")?.[2];
  const examForm = useLocation()?.pathname?.split("/")?.[3];
  const examId = useLocation()?.pathname?.split("/")?.[4];

  const [examData, setExamData] = useState([]);
  const [examBlock, setExamBlock] = useState([]);
  const [htmlContents, setHtmlContents] = useState([]);
  const [uniqueIdArr, setUniqueIdArr] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [fullPaper, setFullPaper] = useState([]);
  const [reRenderAudio, setReRenderAudio] = useState(false);
  const [instructionCompleted, setInstructionCompleted] = useState(false);
  // 0 means before start, 1 means after start, 2 means after finish
  const [next, setNext] = useState(0);
  const [numberOfWord, setNumberOfWord] = useState(0);
  const [linkAnswer, setLinkAnswer] = useState(false);
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  const handleCompleteInstruction = () => setInstructionCompleted(true);

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
      setExamBlock(examBlockWithNumbers);
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

  const renderAudio = (audio_file) => {
    if (audio_file && reRenderAudio) {
      return (
        <div className="mt-2 mb-2">
          <audio controls autoPlay>
            <source src={audio_file} type="audio/mpeg" />
          </audio>
        </div>
      );
    }
  };

  const renderPassage = (passage, image) => {
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

  const fetchHtmlContent = async (paperData, index, tempQuestions) => {
    const question = paperData?.question_other;
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
      if (paperData?.exam_type === "Writing") {
        const tempUniqueArr = {
          name: `${index + 1}`,
          paginationsIds: [`textarea_${index}_1`],
        };
        setUniqueIdArr((prev) => [...prev, tempUniqueArr]);
      } else {
        const tempUniqueArr = {
          name: `${index + 1}`,
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

      // Replace ♫ with unique symbols
      let serialNumber = tempQuestions;
      questionPassage = questionPassage.replaceAll(
        "++",
        () => `${serialNumber++}`
      );

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
        name: `${index + 1}`,
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
        setHtmlContents(tempHtmlContents);
        setExamAnswer(tempExamAnswer);
        setLinkAnswer(!linkAnswer);
      }
    })();
  }, [fullPaper]);

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
            practise_set: fullPaper[0].IELTS.id,
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

  const gamificationSubmit = async () => {
    const data = {
      model: "Practice Test",
      object_id: parseInt(fullPaper[0].IELTS.id),
    };
    try {
      const response = await ajaxCall(
        "/gamification/points/",
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
      if (response.status === 201) {
        toast.success("Points Updated Successfully");
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
        gamificationSubmit();
        toast.success("Your Exam Submitted Successfully");
      } else {
        toast.error("You Have Already Submitted This Exam");
      }
    } catch (error) {
      toast.error("Some Problem Occurred. Please try again.");
    }
  };

  const handleRLSubmit = async () => {
    const answersArray = [];
    let bandValue = 0;

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
        practiceTestSubmit();
        navigate(`/PracticeTest/Answer/${examForm}/${fullPaper[0]?.IELTS?.id}`);
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
          let gptResponse = "";
          let scoreValue = null;

          const examItem = examBlock.find((exam) => exam.id === item.exam_id);
          const passage = examItem
            ? examItem.passage?.replace(/<img[^>]*>/g, "")
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
        practiceTestSubmit();
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
    return uniqueIdArr?.map((item, index) => {
      return (
        <div className="lv-section" key={index}>
          {/*Pagination */}
          <button className="lv-footer-section" onClick={() => setNext(index)}>
            {item.name}
          </button>
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

  return isLoading ? (
    <div className="mt-4">
      <Loading />
    </div>
  ) : !instructionCompleted ? (
    <div className="test-instruction">
      {examData?.exam_type === "Reading" && (
        <ReadingInstruction
          testType="Practice"
          startTest={handleCompleteInstruction}
        />
      )}
      {examData?.exam_type === "Listening" && (
        <ListeningInstruction
          testType="Practice"
          startTest={handleCompleteInstruction}
        />
      )}
      {examData?.exam_type === "Writing" && (
        <WritingInstruction
          testType="Practice"
          startTest={handleCompleteInstruction}
        />
      )}
    </div>
  ) : (
    <>
      <div className="lv-navbar lv-navbar-responsive">
        <div className="lv-navbar-title">
          <h2>{examData?.exam_category}</h2>
          <div className="lv-userName">{userData?.username}</div>
          <div style={{ marginLeft: "10px" }}>/</div>
          <div className="lv-userName">{`${examData?.exam_name}`}</div>
        </div>
        <div className="lv-navbar-title-mobile">
          <div className="username-mobile">
            <h2>{examData?.exam_category}</h2>
            <div className="mobile-breadcumb">
              <div className="lv-userName">{userData?.username}</div>
              <div style={{ margin: "15px 0px 0 10px" }}>/</div>
              <div className="lv-userName">{`${examData?.exam_name}`}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="lv-container">
        {/* Main Container */}
        <div className="lv-main-container">
          {/* Left Container */}
          {examData?.passage && (
            <div className="lv-left-container">
              {renderPassage(examData?.passage, examData?.passage_image)}
            </div>
          )}
          {/* Right Container */}
          <div className="lv-right-container" ref={containerRef}>
            <div className="lv-box-right">
              {examData?.exam_type === "Listening" &&
                renderAudio(examData?.audio_file)}
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
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3 mt-2 flex-column flex-md-row">
          <div className="lv-question-pagination d-flex justify-content-between align-items-center pb-1 w-100 mb-2 mb-md-0">
            <div className="lv-section-pagination">{renderPagination}</div>
          </div>
          <div className="lv-footer-btn pb-1">
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
            size="lg"
            centered
            isOpen={isConfirmModalOpen}
            footer={
              <div className="d-flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    if (
                      examData?.exam_type === "Reading" ||
                      examData?.exam_type === "Listening"
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

export default LivePTEExam;
