import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { convert } from "html-to-text";
import Reading from "../Instruction/Reading";
import Loading from "../../../../../UI/Loading";
import SmallModal from "../../../../../UI/Modal";
import Instructions from "../Instruction/Instructions";
import ajaxCall from "../../../../../../helpers/ajaxCall";
import SpeakingAndWriting from "../Instruction/SpeakingAndWriting";
import PTEAudioRecorder from "../../LivePTEExam/PTEAudioRecorder/PTEAudioRecorder";
import readingBandValues from "../../../../../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../../../../../utils/bandValues/listeningBandValues";
const Cheerio = require("cheerio");

const intialInstructionState = {
  showInstruction: true,
  type: {
    // 0 for incoming, 1 for instruction on screen, 2 for completed
    reading: 0,
    writing: 0,
    listening: 1,
    speaking: 0,
  },
};

const MockTestLive = () => {
  const containerRef = useRef(null);
  const { examId } = useParams();
  const navigate = useNavigate();
  const [examData, setExamData] = useState([]);
  const [htmlContents, setHtmlContents] = useState([]);
  const [reRenderAudio, setReRenderAudio] = useState(false);
  const [uniqueIdArr, setUniqueIdArr] = useState([]);
  const [examAnswer, setExamAnswer] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [voices, setVoices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [fullPaper, setFullPaper] = useState([]);
  const [fullLengthId, setFullLengthId] = useState("");
  const [next, setNext] = useState(0);
  const [linkAnswer, setLinkAnswer] = useState(false);
  const [numberOfWord, setNumberOfWord] = useState(0);
  const [activeRecordingIndex, setActiveRecordingIndex] = useState(null);
  const [instructionCompleted, setInstructionCompleted] = useState(
    intialInstructionState
  );
  const synth = window.speechSynthesis;
  const [recordedFilePath, setRecordedFilePath] = useState("");
  const userData = JSON.parse(localStorage.getItem("loginInfo"));
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  const handleInstruction = (instruction) => {
    setInstructionCompleted((prev) => ({
      ...prev,
      showInstruction: false,
      type: {
        ...prev.type,
        [instruction]: 2,
      },
    }));
  };

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

  const sortPapers = (arr) => {
    return arr.sort((a, b) => {
      const tempExamName1Array = a.exam_name.split(" ");
      const tempExamName2array = b.exam_name.split(" ");
      const tempExamName1 = tempExamName1Array[tempExamName1Array.length - 1];
      const tempExamName2 = tempExamName2array[tempExamName2array.length - 1];
      return tempExamName1.localeCompare(tempExamName2);
    });
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/ct/flt/${examId}/`,
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
          const filteredData = response?.data;
          let pappers = [];
          sortPapers(filteredData.listening_set.Listening).forEach((item) => {
            pappers.push({
              ...item,
              paperId: filteredData.listening_set.id,
            });
          });
          sortPapers(filteredData.reading_set.Reading).forEach((item) => {
            pappers.push({ ...item, paperId: filteredData.reading_set.id });
          });
          sortPapers(filteredData.writing_set.Writing).forEach((item) => {
            pappers.push({ ...item, paperId: filteredData.writing_set.id });
          });
          sortPapers(
            filteredData.speaking_set.Speaking.map((item) => ({
              ...item,
              exam_name: item.name,
              exam_type: "Speaking",
              question: "",
              questions: item?.questions?.map((item) => ({
                ...item,
                id: generateRandomId(10),
              })),
            }))
          ).forEach((item) => {
            pappers.push({ ...item, paperId: filteredData.speaking_set.id });
          });
          filteredData.papers = pappers;
          setFullPaper(pappers);
          setFullLengthId(filteredData.id);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
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
            `/practice-answers/${examData?.paperId}/`,
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
            if (examData?.exam_type === "Reading") {
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
      setReRenderAudio(true);
      const newInstructionType =
        examBlockWithNumbers?.[next]?.exam_type?.toLowerCase();
      if (instructionCompleted.type[newInstructionType] === 0) {
        setInstructionCompleted((prev) => ({
          ...prev,
          showInstruction: true,
          type: {
            ...prev.type,
            [newInstructionType]: 1,
          },
        }));
      }
      setExamData(examBlockWithNumbers[next]);
    }
  }, [fullPaper, next]);

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
        exam_type: paperData?.exam_type,
        question: paperData?.question_other,
      };
      if (paperData?.exam_type === "Writing") {
        const tempUniqueArr = {
          name: `section-${index + 1}`,
          paginationsIds: [`textarea_${index}_1`],
          examType: paperData?.exam_type,
        };
        setUniqueIdArr((prev) => [...prev, tempUniqueArr]);
      } else {
        const tempUniqueArr = {
          name: `section-${index + 1}`,
          paginationsIds: [`speaking_${index}_1`],
          examType: paperData?.exam_type,
        };
        setUniqueIdArr((prev) => [...prev, tempUniqueArr]);
      }
      return new Promise((resolve) => {
        resolve({ questionPassage: "", tempAnswer });
      });
    } else if (paperData?.exam_type === "Speaking") {
      tempAnswer = {
        exam_id: paperData?.id,
        data: paperData.questions.map((element) => ({
          status: 0,
          answer_text: "",
          id: element.id,
        })),
      };
      const tempUniqueArr = {
        name: `section-${index + 1}`,
        paginationsIds: paperData.questions.map(
          (element) => `speaking_${index}_${element.id}`
        ),
        examType: paperData?.exam_type,
      };
      setUniqueIdArr((prev) => [...prev, tempUniqueArr]);
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
        exam_type: paperData?.exam_type,
      };
      const tempUniqueArr = {
        name: `section-${index + 1}`,
        paginationsIds: paginationsStrucutre,
        examType: paperData?.exam_type,
      };
      setUniqueIdArr((prev) => [...prev, tempUniqueArr]);
      return new Promise((resolve) => {
        resolve({ questionPassage, tempAnswer }); // resolve with the question passage once it's constructed
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (fullPaper?.length !== 0) {
        const examDataList = fullPaper?.map((examBlock, index) => ({
          ...examBlock,
          no: index + 1,
        }));
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
          tempHtmlContents.push(returnContent?.questionPassage);
          const tempUniqueArr = {
            name: `section-${index + 1}`,
            ...returnContent?.tempAnswer,
          };
          tempExamAnswer.push(tempUniqueArr);
          let totalLEngth = tempExamAnswer
            .map((item) => [...item.data])
            .flat().length;
          tempQuestions = totalLEngth + 1;
        }
        setHtmlContents(tempHtmlContents);
        setExamAnswer(tempExamAnswer);
        setLinkAnswer(!linkAnswer);
      }
    })();
  }, [fullPaper]);

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
          const trimmedValue = value.trim();
          item.answer_text = trimmedValue;
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
    if (!instructionCompleted.showInstruction && examAnswer.length > 0) {
      for (let tempExamAnswer of examAnswer) {
        if (!tempExamAnswer.data) return;
        let examIndex = examAnswer.indexOf(tempExamAnswer);
        // remove duplicate
        const filteredData = tempExamAnswer.data.filter(
          (item, index) =>
            index ===
            tempExamAnswer.data.findIndex(
              (element) => element.question_number === item.question_number
            )
        );
        filteredData.forEach((item) => {
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
      <div>
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
        />
      </div>
    );
  };

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
            flt: examId,
          }),
        },
        8000
      );
      if (response.status === 201) {
        console.log("Lastest Full Length Exam Submitted");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const gamificationSubmit = async () => {
    const data = {
      model: "Full Length Test",
      object_id: parseInt(fullLengthId),
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

  const fullLengthTestSubmit = async () => {
    const data = {
      student_id: studentId,
      flt_id: parseInt(examId),
    };
    try {
      const response = await ajaxCall(
        "/student-flt-submit/",
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
        exam_type: item?.exam_type,
        question: item?.question,
      };
      answersArray.push(tempObj);
    });

    let newAnswersArray = [];

    try {
      // Wait for all ChatGPT API calls to complete for writing only
      await Promise.all(
        answersArray.map(async (item) => {
          if (item?.exam_type === "Writing") {
            let gptResponse = "";
            let scoreValue = null;
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
                  content: `Questions: ${item?.question?.replace(
                    /<img[^>]*>/g,
                    ""
                  )}`,
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

            if (item.data[0].answer_text !== "") {
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

                // Use regex to extract the band value
                const scoreMatch = gptResponse.match(
                  /Overall Band Score:\s*(\d+)/
                );
                scoreValue = scoreMatch ? scoreMatch[1] : null;
              } else {
                toast.error("AI response is empty. Please try again.");
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
              newAnswersArray.push({
                exam_id: item.exam_id,
                band: 0,
                AI_Assessment: "",
                data: item.data,
              });
            }
          } else if (
            item?.exam_type === "Reading" ||
            item?.exam_type === "Listening"
          ) {
            let totalCorrect = 0;
            const tempCorrectAnswers =
              correctAnswers?.find((val) => val.exam_id === item.exam_id)
                ?.data || [];

            item.data.forEach((answer, index) => {
              if (
                answer.answer_text === tempCorrectAnswers?.[index]?.answer_text
              ) {
                totalCorrect++;
              }
            });

            if (item?.exam_type === "Reading") {
              bandValue = readingBandValues[totalCorrect * 3];
            } else if (item?.exam_type === "Listening") {
              bandValue = listeningBandValues[totalCorrect * 4];
            }

            newAnswersArray.push({
              exam_id: item.exam_id,
              band: bandValue,
              data: item.data,
            });
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
        Full_Length_Exam: parseInt(fullLengthId),
        exam_type: "Reading",
      });

      const response = await ajaxCall(
        "/answer/full-length-test/",
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
        fullLengthTestSubmit();
        navigate(`/FullLengthTest/Answer/${examId}`);
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

  const handleBackSectionClicked = () => {
    setReRenderAudio(false);
    setNext(next - 1);
  };
  const handleNextSectionClicked = () => {
    setReRenderAudio(false);
    setNext(next + 1);
  };

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
    // Split the speaking content into separate sentences
    const utterances = extractVisibleText(speakingContent).split(". ");
    const tempExamAnswer = [...examAnswer];

    // Iterate through each utterance (sentence)
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

      // Speak the current sentence
      synth.speak(utterance);

      // Handle the end of the last utterance
      if (index === utterances.length - 1) {
        utterance.onend = () => {
          // Update the status to '2' (completed) when speaking ends
          const updatedSpeaking = tempExamAnswer[next].data.map(
            (item, index) => {
              const tempId = item.id;
              if (tempId === id) {
                return { ...item, status: 2 }; // Mark as completed
              } else {
                return item;
              }
            }
          );
          tempExamAnswer[next].data = updatedSpeaking;
          setExamAnswer(tempExamAnswer);
        };
      }
    });

    // Set the status to '1' (in-progress) for the current speaking item
    const updatedSpeaking = tempExamAnswer[next].data.map((item, index) => {
      const tempId = item.id;
      if (tempId === id) {
        return { ...item, status: 1 }; // Mark as in-progress
      } else {
        return item;
      }
    });
    tempExamAnswer[next].data = updatedSpeaking;
    setExamAnswer(tempExamAnswer);
  };

  const stopSpeaking = (questionId) => {
    if (synth.speaking) {
      synth.cancel();
    }
    // Update the state to mark the specific question as stopped (status: 3)
    setExamAnswer((prev) => {
      const updatedAnswers = [...prev];
      const currentData = updatedAnswers[next].data.map((item) =>
        item.id === questionId ? { ...item, status: 3 } : item
      );
      updatedAnswers[next].data = currentData;
      return updatedAnswers;
    });

    // Optionally, clear the active recording index to allow new recordings
    setActiveRecordingIndex(null);
  };

  const handleReplay = (speakingContent, questionId) => {
    speak(speakingContent, questionId);
  };

  useEffect(() => {
    if (recordedFilePath) {
      const { recorderIndex, filePath } = recordedFilePath;
      const tempexamAnswer = [...examAnswer];
      const tempSpeaking = tempexamAnswer[next].data;
      const index = tempSpeaking.findIndex((item) => item.id === recorderIndex);
      tempSpeaking[index].status = 2;
      tempSpeaking[index].answer_text = filePath;
      setExamAnswer(tempexamAnswer);
      setRecordedFilePath(null);
    }
  }, [recordedFilePath]);

  const recorderContainer = useCallback(
    (item, index) => {
      if (examData?.exam_type !== "Speaking") return null;
      if (Object.keys(examData).length > 0) {
        return (
          <PTEAudioRecorder
            setRecordedFilePath={setRecordedFilePath}
            next={next}
            exam={examData}
            enableRecording={
              examAnswer[next].data?.[index]?.status === 2 ||
              examAnswer[next].data?.[index]?.status === 3
            }
            completed={examAnswer[next].data?.[index]?.answer_text !== ""}
            question_number={item.question_number}
            user={userData.userId}
            recorderIndex={item.id}
            Flt={examId}
            setActiveRecordingIndex={setActiveRecordingIndex}
            isActiveRecording={activeRecordingIndex === index}
          />
        );
      }
      return;
    },
    [examData, next, examAnswer, userData.userId, examId, activeRecordingIndex]
  );

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
    let tempSectionNumber = 0;
    return uniqueIdArr?.map((item, sectionIndex) => {
      if (item.examType !== examData.exam_type) {
        return null;
      }
      tempSectionNumber++;
      return (
        <div className="lv-section" key={item.name + sectionIndex}>
          <button
            className="lv-footer-section"
            onClick={() => setNext(sectionIndex)}
          >
            {tempSectionNumber}
          </button>
        </div>
      );
    });
  }, [uniqueIdArr, examAnswer, next, examData]);

  return instructionCompleted.showInstruction ? (
    <div className="test-instruction">
      {instructionCompleted.type.reading === 1 && (
        <Reading startTest={handleInstruction} />
      )}
      {instructionCompleted.type.writing === 1 && (
        <SpeakingAndWriting type="writing" startTest={handleInstruction} />
      )}
      {instructionCompleted.type.listening === 1 && (
        <Instructions startTest={handleInstruction} />
      )}
      {instructionCompleted.type.speaking === 1 && (
        <SpeakingAndWriting type="speaking" startTest={handleInstruction} />
      )}
    </div>
  ) : isLoading ? (
    <div className="mt-4">
      <Loading />
    </div>
  ) : (
    <div>
      <div className="lv-navbar lv-navbar-responsive">
        <div className="lv-navbar-title">
          <h2>{examData?.exam_category}</h2>
          <div className="lv-userName">{userData?.username}</div>
          <div style={{ margin: "15px 0px 0 10px" }}>/</div>
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
          {((examData?.passage &&
            examData?.passage_image &&
            examData?.exam_type === "Reading") ||
            examData?.exam_type === "Writing") && (
            <div className="lv-left-container">
              {renderPassage(examData?.passage, examData?.passage_image)}
            </div>
          )}
          {examData?.exam_type === "Speaking" && (
            <div className="lv-left-container">
              {Object.keys(examData).length > 0 &&
                examData.questions.map((item, i) => {
                  const speakingIndex = examAnswer[next].data.findIndex(
                    (element) => element.id === item.id
                  );
                  return (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        borderBottom: "1px solid #01579b",
                      }}
                    >
                      <div>
                        <p> {i + 1} :</p>
                      </div>
                      <div className="d-flex align-items-center lv-btn-mic-container">
                        <button
                          className="lv-speaking-button"
                          onClick={() =>
                            examAnswer[next].data?.[speakingIndex]?.status === 2
                              ? handleReplay(item.question, item.id)
                              : speak(item.question, item.id)
                          }
                          disabled={
                            examAnswer[next].data?.[speakingIndex]?.status ===
                              1 ||
                            examAnswer[next].data?.some(
                              (element, index) =>
                                index !== speakingIndex && element.status === 1
                            ) ||
                            activeRecordingIndex !== null
                          }
                          style={{
                            opacity:
                              examAnswer[next].data?.[speakingIndex]?.status ===
                                1 ||
                              examAnswer[next].data?.some(
                                (element, index) =>
                                  index !== speakingIndex &&
                                  element.status === 1
                              ) ||
                              activeRecordingIndex !== null
                                ? 0.5
                                : 1,
                            cursor:
                              examAnswer[next].data?.[speakingIndex]?.status ===
                                1 ||
                              examAnswer[next].data?.some(
                                (element, index) =>
                                  index !== speakingIndex &&
                                  element.status === 1
                              ) ||
                              activeRecordingIndex !== null
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          {examAnswer[next].data?.[speakingIndex]?.status === 2
                            ? "Replay"
                            : "Play"}
                        </button>
                        <button
                          className="lv-speaking-button"
                          onClick={() => stopSpeaking(item.id)}
                          disabled={
                            examAnswer[next].data?.[speakingIndex]?.status !== 1
                          }
                          style={{
                            opacity:
                              examAnswer[next].data?.[speakingIndex]?.status ===
                              1
                                ? 1
                                : 0.5,
                            cursor:
                              examAnswer[next].data?.[speakingIndex]?.status ===
                              1
                                ? "pointer"
                                : "not-allowed",
                          }}
                        >
                          Pause
                        </button>
                        <hr />
                        {recorderContainer(item, speakingIndex)}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Right Container */}
          {(examData?.exam_type === "Reading" ||
            examData?.exam_type === "Listening" ||
            examData?.exam_type === "Writing") && (
            <div
              className="lv-right-container"
              id="right-container"
              ref={containerRef}
            >
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
                      value={examAnswer[next]?.data?.[0]?.answer_text || ""}
                      onChange={(e) => handleWritingAnswer(e, next)}
                    />
                    <span>{numberOfWord} Words</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Paginaton - Footer */}
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
                Reviews
              </button>
            )}
            <button
              className="lv-footer-button"
              style={{
                display: next === 0 ? "none" : "block",
              }}
              onClick={handleBackSectionClicked}
            >
              <span>Back</span>
            </button>
            <button
              className="lv-footer-button"
              style={{
                display: fullPaper.length === next + 1 ? "none" : "block",
              }}
              onClick={handleNextSectionClicked}
            >
              <span>&#10152;</span>
            </button>
            <button
              className="lv-footer-button"
              style={{
                display: next !== (fullPaper.length > 0 ? "none" : "block"),
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
                <button className="btn btn-success" onClick={handleRLSubmit}>
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
    </div>
  );
};

export default MockTestLive;
