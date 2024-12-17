import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import ajaxCall from "../../helpers/ajaxCall";
import "../../css/index.css";
import {
  MatchHeading,
  LocatingInformation,
  TrueFalse,
  SummarCompletion,
  DiagramLabling,
  MatchingSentenceEndings,
  MatchingFeatures,
  SentenceCompletion,
  ShortAnswerQue,
  FlowChartCompletion,
  NoteCompletion,
  YesNo,
  TableCompletion,
  MultipleChoiceQue,
  MultipleCheckboxChoiceQue,
} from "../../utils/HTMLContent";
import MultipleChoicesAnswer from "../../utils/HTMLContent/MultipleChoicesAnswer";

const Cheerio = require("cheerio");

const initialDivContents = {
  header1: ``,
  header2: MatchHeading,
  header3: LocatingInformation,
  header4: TrueFalse,
  header6: SummarCompletion,
  header7: DiagramLabling,
  header8: MatchingSentenceEndings,
  header9: MatchingFeatures,
  header10: SentenceCompletion,
  header11: ShortAnswerQue,
  header12: FlowChartCompletion,
  header13: NoteCompletion,
  header14: YesNo,
  header15: TableCompletion,
  header16: MultipleChoiceQue,
  header17: MultipleCheckboxChoiceQue,
  header18: MultipleChoicesAnswer,
};

const initialSubmit = {
  isError: false,
  errMsg: null,
  isSubmitting: false,
};

const DragDrop = () => {
  const location = useLocation();
  const category = location.state?.category || {};
  const examType = location.state?.examType || {};
  const readingData = location.state?.readingData || {};
  const listeningData = location.state?.listeningData || {};
  const [audioLink, setAudioLink] = useState();
  const [answer, setAnswer] = useState([]);
  const [questionStructure, setQuestionStructure] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAudio = async () => {
      if (listeningData.audio_file) {
        try {
          const audioSource = await readFile(listeningData.audio_file);
          // Do something with audioSource, for example, set it in state
          setAudioLink(audioSource);
        } catch (error) {
          console.error("Error reading audio file:", error);
        }
      }
    };

    loadAudio();
  }, []);

  const [formStatus, setFormStatus] = useState(initialSubmit);
  const [divContents, setDivContents] = useState(initialDivContents);

  const [selectedDivs, setSelectedDivs] = useState([]);

  const handleAnswerChange = (e, parentIndex, childIndex) => {
    const updatedAnswer = [...answer];
    updatedAnswer[parentIndex].answers[childIndex].answer_text = e.target.value;
    setAnswer(updatedAnswer);
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // Set up an event listener for the 'load' event
      reader.onload = (event) => {
        // Resolve the Promise with the result, which is the data URL of the file
        resolve(event.target.result);
      };

      // Set up an event listener for the 'error' event
      reader.onerror = (event) => {
        // Reject the Promise with the error
        reject(event.target.error);
      };

      // Initiate the file reading operation as a data URL
      reader.readAsDataURL(file);
    });
  };

  const generateAnswerField = (
    htmlContents,
    index = null,
    type = "",
    id = 0,
    isMultiQuestions = false
  ) => {
    let tag = null;
    const $ = Cheerio.load(htmlContents);

    // Find all elements that could represent questions
    const selectElements = $("select");
    const textareaElements = $("textarea");
    const textInputElements = $(
      "input[type='text'], input:not([type='radio'], [type='checkbox'])"
    );

    // Group radio buttons by their 'name' attribute
    const radioElements = $("input[type='radio']");
    const radioGroups = {};
    radioElements.each((index, element) => {
      const name = $(element).attr("name");
      if (!radioGroups[name]) {
        radioGroups[name] = [];
      }
      radioGroups[name].push(element);
    });

    // Group checkbox buttons by their 'name' attribute
    const checkboxElements = $("input[type='checkbox']");
    const checkboxGroups = {};
    checkboxElements.each((index, element) => {
      const name = $(element).attr("name");
      if (!checkboxGroups[name]) {
        checkboxGroups[name] = [];
      }
      checkboxGroups[name].push(element);
    });

    // Count the number of questions based on different elements
    const numberOfSelectQuestions = selectElements.length;
    const numberOfTextareaQuestions = textareaElements.length;
    const numberOfTextInputQuestions = textInputElements.length;
    const numberOfRadioGroups = Object.keys(radioGroups).length;
    const numberOfCheckboxGroups = Object.keys(checkboxGroups).length;

    if (
      numberOfSelectQuestions > numberOfTextareaQuestions &&
      numberOfSelectQuestions > numberOfTextInputQuestions &&
      numberOfSelectQuestions > numberOfRadioGroups &&
      numberOfSelectQuestions > numberOfCheckboxGroups
    ) {
      if (index === null)
        setQuestionStructure((prev) => [
          ...prev,
          {
            type: "Select",
            id,
            numberOfQuestions: numberOfSelectQuestions,
            isMultiQuestions,
          },
        ]);
      else {
        const newQuestionStructure = [...questionStructure];
        newQuestionStructure[index] = {
          type: "Select",
          id,
          numberOfQuestions: numberOfSelectQuestions,
          isMultiQuestions,
        };
        setQuestionStructure(newQuestionStructure);
      }
    } else if (
      numberOfTextareaQuestions > numberOfSelectQuestions &&
      numberOfTextareaQuestions > numberOfTextInputQuestions &&
      numberOfTextareaQuestions > numberOfRadioGroups &&
      numberOfTextareaQuestions > numberOfCheckboxGroups
    ) {
      if (index === null)
        setQuestionStructure((prev) => [
          ...prev,
          {
            type: "Textarea",
            id,
            numberOfQuestions: numberOfTextareaQuestions,
            isMultiQuestions,
          },
        ]);
      else {
        const newQuestionStructure = [...questionStructure];
        newQuestionStructure[index] = {
          type: "Textarea",
          id,
          numberOfQuestions: numberOfTextareaQuestions,
          isMultiQuestions,
        };
        setQuestionStructure(newQuestionStructure);
      }
    } else if (
      numberOfTextInputQuestions > numberOfSelectQuestions &&
      numberOfTextInputQuestions > numberOfTextareaQuestions &&
      numberOfTextInputQuestions > numberOfRadioGroups &&
      numberOfTextInputQuestions > numberOfCheckboxGroups
    ) {
      if (index === null)
        setQuestionStructure((prev) => [
          ...prev,
          {
            type: "InputText",
            id,
            numberOfQuestions: numberOfTextInputQuestions,
            isMultiQuestions,
          },
        ]);
      else {
        const newQuestionStructure = [...questionStructure];
        newQuestionStructure[index] = {
          type: "InputText",
          id,
          numberOfQuestions: numberOfTextInputQuestions,
          isMultiQuestions,
        };
        setQuestionStructure(newQuestionStructure);
      }
    } else if (
      numberOfRadioGroups > numberOfSelectQuestions &&
      numberOfRadioGroups > numberOfTextareaQuestions &&
      numberOfRadioGroups > numberOfTextInputQuestions &&
      numberOfRadioGroups > numberOfCheckboxGroups
    ) {
      if (index === null)
        setQuestionStructure((prev) => [
          ...prev,
          {
            type: "Radio",
            id,
            numberOfQuestions: numberOfRadioGroups,
            isMultiQuestions,
          },
        ]);
      else {
        const newQuestionStructure = [...questionStructure];
        newQuestionStructure[index] = {
          type: "Radio",
          id,
          numberOfQuestions: numberOfRadioGroups,
          isMultiQuestions,
        };
        setQuestionStructure(newQuestionStructure);
      }
    } else if (
      numberOfCheckboxGroups > numberOfSelectQuestions &&
      numberOfCheckboxGroups > numberOfTextareaQuestions &&
      numberOfCheckboxGroups > numberOfTextInputQuestions &&
      numberOfCheckboxGroups > numberOfRadioGroups
    ) {
      if (index === null)
        setQuestionStructure((prev) => [
          ...prev,
          {
            type: "Checkbox",
            id,
            numberOfQuestions: numberOfCheckboxGroups,
            isMultiQuestions,
          },
        ]);
      else {
        const newQuestionStructure = [...questionStructure];
        newQuestionStructure[index] = {
          type: "Checkbox",
          id,
          numberOfQuestions: numberOfCheckboxGroups,
          isMultiQuestions,
        };
        setQuestionStructure(newQuestionStructure);
      }
    }

    const totalQuestions =
      numberOfSelectQuestions +
      numberOfTextareaQuestions +
      numberOfTextInputQuestions +
      numberOfRadioGroups +
      numberOfCheckboxGroups;

    let totalAnswers = [];
    let lastQuestionNumber = 0;

    if (index === null && answer.length > 0) {
      let lastAnswer = answer[answer.length - 1];
      lastQuestionNumber =
        lastAnswer.answers[lastAnswer.answers.length - 1].question_number;
    }

    // Generate answers for each question
    for (let i = 0; i < totalQuestions; i++) {
      const tempAnswer = {
        question_number: lastQuestionNumber + i + 1,
        answer_text: "",
        error: "",
      };
      totalAnswers.push(tempAnswer);
    }

    const temp = {
      title: type,
      id: id,
      answers: totalAnswers,
    };

    // Update answer array based on index
    if (index !== null) {
      const updatedAnswer = [...answer];
      updatedAnswer[index] = temp;

      let questionNumber = 0;
      updatedAnswer.forEach((item) => {
        item.answers.forEach((answer, index) => {
          questionNumber = questionNumber + 1;
          answer.question_number = questionNumber;
        });
      });

      setAnswer(updatedAnswer);
    } else {
      setAnswer((prev) => [...prev, temp]);
    }

    // Determine the tag representing the type of questions found
    if (numberOfSelectQuestions > 0) {
      tag = "select";
    } else if (numberOfTextareaQuestions > 0) {
      tag = "textarea";
    } else if (numberOfTextInputQuestions > 0) {
      tag = "input[type='text']";
    } else if (numberOfRadioGroups > 0) {
      tag = "input[type='radio']";
    } else if (numberOfCheckboxGroups > 0) {
      tag = "input[type='checkbox']";
    } else {
      tag = "input";
    }

    return tag;
  };

  const handleClick = async (header, type) => {
    const randomNumbers = Array.from(
      { length: 1 },
      () => Math.floor(Math.random() * 10000000) + 1
    );

    const tag = await generateAnswerField(
      divContents[header],
      null,
      type,
      randomNumbers[0],
      type === "Multiple Questions"
    );

    setSelectedDivs((prev) => [
      ...prev,
      { header, passage: divContents[header], tag, type, id: randomNumbers[0] },
    ]);

    // Generate answer field
  };

  const handleNumberOfQuestionsChange = (e, index) => {
    const { value } = e.target;
    const newQuestionStructure = [...questionStructure];
    newQuestionStructure[index].numberOfQuestions = parseInt(value, 10);
    setQuestionStructure(newQuestionStructure);
    const tempAnswer = [...answer];
    tempAnswer[index].answers = Array.from(
      { length: parseInt(value, 10) },
      (_, i) => ({
        question_number: i + 1,
        answer_text: "",
        error: "",
      })
    );
    setAnswer(tempAnswer);
  };

  const handleNumberOfQuestionsChangeBlur = (index) => {
    const value = 1;
    const newQuestionStructure = [...questionStructure];
    if (newQuestionStructure[index].numberOfQuestions > 0) return;
    newQuestionStructure[index].numberOfQuestions = parseInt(value, 10);
    setQuestionStructure(newQuestionStructure);
    const tempAnswer = [...answer];
    tempAnswer[index].answers = Array.from(
      { length: parseInt(value, 10) },
      (_, i) => ({
        question_number: i + 1,
        answer_text: "",
        error: "",
      })
    );
    setAnswer(tempAnswer);
  };

  const renderAudio = () => {
    if (listeningData.audio_file) {
      return `<div>
      <audio controls autoplay>
       <source src = ${audioLink} type="audio/mpeg">
      </audio>
      </div>`;
    } else {
      return `<p></p>`;
    }
  };

  const displayLeftContainer = () => {
    if (listeningData.audio_file || readingData.passage) {
      return `${readingData.passage || listeningData.passage}`;
    } else {
      return `<p></p>`;
    }
  };

  const handleContentChange = (event, header, divIndex) => {
    event.preventDefault();
    if (
      event.target.localName === "select" ||
      event.target.localName === "textarea" ||
      event.target.localName === "input"
    )
      return;
    const tempSelectedDivs = [...selectedDivs];
    tempSelectedDivs[divIndex].passage = event.target.innerHTML;
    setSelectedDivs(tempSelectedDivs);

    if (header.type !== "Multiple Questions")
      generateAnswerField(
        event.target.innerHTML,
        divIndex,
        header.type,
        header.id,
        false
      );
  };

  const handleReset = () => {
    const shouldReset = window.confirm("Are you sure you want to reset?");
    if (shouldReset) {
      setSelectedDivs([]);
      setAnswer([]);
      setDivContents(initialDivContents);
      setFormStatus(initialSubmit);
    }
  };

  const handleDelete = (header) => {
    setSelectedDivs((prev) => prev?.filter((item) => item.id !== header.id));
    const tempFilters = answer.filter((item) => item.id !== header.id);

    // Rearrange the question numbers
    let questionNumber = 0;
    tempFilters.forEach((item) => {
      item.answers.forEach((answer) => {
        questionNumber = questionNumber + 1;
        answer.question_number = questionNumber;
      });
    });
    setAnswer(tempFilters);

    // Remove the question structure
    const tempQuestionStructure = questionStructure.filter(
      (item) => item.id !== header.id
    );
    setQuestionStructure(tempQuestionStructure);
  };

  const htmlContent = selectedDivs
    .map((header) => {
      return `<div className="${
        header === "header1" ? "header21Class" : "header2Class"
      }">${header.passage}</div>`;
    })
    .join("");

  const generateHTMLContent = () => {
    const uniqueIdArr = [];
    let questionNumber = 0;
    const htmlContent = selectedDivs
      .map((header) => {
        // Parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(header.passage, "text/html");

        // Find all select elements
        const selectElements = doc.querySelectorAll(header.tag);

        // Add a unique ID to each select element
        selectElements.forEach((selectElement, index) => {
          const uniqueId = `${header.tag}_${questionNumber + 1}`;
          questionNumber = questionNumber + 1;
          uniqueIdArr.push(uniqueId);
          selectElement.id = uniqueId;
        });

        return `<div className="${
          header.header === "header1" ? "header21Class" : "header2Class"
        }">${doc.documentElement.outerHTML}</div>`;
      })
      .join("");

    const paginationContent = uniqueIdArr.map((item, index) => {
      return `<div className="footer-item" onclick="scrollToContent('${item}')">${
        index + 1
      }</div>`;
    });

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #fff;
        }
    
        .navbar {
          color: black;
          padding-left: 15px;
          padding-right: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ddd;
        }

        .navbar-title {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }

        .navbar-subtitle {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          margin-left: 15px;
        }

        .navbar-right{
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 10%;
        }

    
        .container {
          background-color: #f1f2ec;
          padding: 20px;
          margin: 20px;
          border-radius: 8px;
          overflow: hidden;
        }

        .scrollable-content {
          overflow-y: auto; /* Enable vertical scrollbar if content overflows vertically */
          height: 100%; /* Take up 100% of the container height */
          padding: 10px; /* Add padding to make it look better */
        }
    
        .container-title {
          color: #333;
          font-size: 24px;
          margin-bottom: 10px;
        }
    
        .container-subtitle {
          color: #666;
          font-size: 18px;
        }
    
        .main-container {
          display: flex;
          height: calc(100vh - 250px);
        }
    
        .left-container,
        .right-container {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin: 10px;
        }
    
        .footer {
          color: black;
          position: fixed;
          bottom: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
    
        .footer-text {
          font-size: 16px;
          padding: 0px 20px;
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          overflow: hidden;
        }

        .question-pagination, .part-pagination {
          width: 50%;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          overflow-x: auto;
        }

    
        .footer-button {
          width: 80px;
          padding: 10px 20px;
          background-color: #efefef;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 25px;
          font-weight: bold;
        }

        .footer-item {
          cursor: pointer;
          padding: 5px 10px;
          margin-right: 20px;
        }
    
        .footer-item:hover {
          text-decoration: underline;
          border: 1px solid #418ec8;
          font-weight: bold;
        }

        .highlight {
          background-color: #ffffcc;
        }

      </style>
      <title>Your Page Title</title>
    </head>
    <body>
    
      <!-- Navbar -->
      <div className="navbar">
        <div className="navbar-title">
          <h2 style="color:red">IELTS</h2>
          <div className="navbar-subtitle">
            <h4 style="margin-top:5px; margin-bottom:5px">Test taker ID</h4>
            <span>2 years, 11 months, 6 days, 3 hours, 40 minutes remaining Connected</span>
          </div>
        </div>
        <div className="navbar-right">
          <h4>Wifi</h4>
          <h4>&#128276;</h4> <!-- Notification Bell Icon -->
          <h4>&#9776;</h4> <!-- Menu Icon -->
        </div>
      </div>
    
      <!-- Static Container -->
      <div className="container">
        <div className="container-title">${
          readingData.exam_type || listeningData.exam_type
        } / ${readingData.exam_name || listeningData.exam_name} / ${
      readingData.block_type || listeningData.block_type
    } / ${
      readingData.difficulty_level || listeningData.difficulty_level
    }  </div>
      </div>
    
      <!-- Main Container -->
      <div>
      ${renderAudio()}
      
      </div>
      <div className="main-container">
        <!-- Left Container -->
        <div className="left-container">
          ${displayLeftContainer()}
        </div>
    
        <!-- Right Container -->
        <div className="right-container" id="right-container">
          <div className="box-right">
            ${htmlContent}
          </div>
        </div>
      </div>
    
      <!-- Footer -->
      <div className="footer">
        <div className="footer-text">
        <div className="part-pagination">
        </div>
        <div className="question-pagination">
        ${paginationContent.join("")}
        </div>
        </div>
        <button className="footer-button"><span className="arrow">&#x2713;</span></button>
      </div>

      <script>
      let highlightedElement = null;
    function scrollToContent(contentId) {
      const container = document.getElementById('right-container');
      const contentElement = document.getElementById(contentId);

      if (highlightedElement) {
        highlightedElement.classList.remove('highlight');
      }
      
      if (contentElement) {
        container.scrollTop = contentElement.offsetTop - container.offsetTop;
        contentElement.classList.add('highlight');
        highlightedElement = contentElement;
      }
    }
  </script>
    
    </body>
    </html>    
    `;
  };

  const downloadHTMLFile = () => {
    const htmlContent = generateHTMLContent();
    const blob = new Blob([htmlContent], { type: "text/html" });
    saveAs(blob, "file.html");
  };

  const handleAnswerValdiation = () => {
    let isValid = true;
    const updatedAnswer = [...answer];
    updatedAnswer.forEach((item) => {
      item.answers.forEach((answer) => {
        if (answer.answer_text === "") {
          answer.error = "Please enter answer";
          isValid = false;
        } else {
          answer.error = "";
        }
      });
    });
    setAnswer(updatedAnswer);
    return isValid;
  };

  const doReading = async (e) => {
    e.preventDefault();
    const isValid = handleAnswerValdiation();
    if (!isValid) return;

    const tempAnswer = [];
    answer.forEach((item) => {
      tempAnswer.push(...item.answers);
    });

    const formData = new FormData();

    formData.append("block_threshold", readingData.block_threshold);
    formData.append("block_type", readingData.block_type);
    formData.append("difficulty_level", readingData.difficulty_level);
    formData.append("exam_name", readingData.exam_name);
    formData.append("exam_type", examType);
    formData.append("no_of_questions", readingData.no_of_questions);
    formData.append("passage", readingData.passage);
    formData.append(
      "passage_image",
      readingData.passage_image ? readingData.passage_image : ""
    );
    formData.append("question", htmlContent);
    formData.append("question_other", htmlContent);
    tempAnswer.forEach((item, index) => {
      formData.append(`answers[${index}]question_number`, item.question_number);
      formData.append(`answers[${index}]answer_text`, item.answer_text);
    });
    formData.append("question_structure", JSON.stringify(questionStructure));
    formData.append("exam_category", category);

    try {
      const response = await ajaxCall(
        "/exam-blocks/",
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: formData,
        },
        8000
      );
      if (response.status === 201) {
        toast.success("Reading Exam Create SuccessFully");
        navigate("/admin-exam");
      } else if (response.status === 400) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    }
  };

  const doListening = async (e) => {
    e.preventDefault();
    const isValid = handleAnswerValdiation();
    if (!isValid) return;

    const tempAnswer = [];
    answer.forEach((item) => {
      tempAnswer.push(...item.answers);
    });

    const formData = new FormData();

    formData.append("block_threshold", listeningData.block_threshold);
    formData.append("block_type", listeningData.block_type);
    formData.append("difficulty_level", listeningData.difficulty_level);
    formData.append("exam_name", listeningData.exam_name);
    formData.append("exam_type", listeningData.exam_type);
    formData.append("no_of_questions", listeningData.no_of_questions);
    formData.append("passage", listeningData.passage);
    formData.append("question", htmlContent);
    formData.append("question_other", htmlContent);
    tempAnswer.forEach((item, index) => {
      formData.append(`answers[${index}]question_number`, item.question_number);
      formData.append(`answers[${index}]answer_text`, item.answer_text);
    });
    formData.append("audio_file", listeningData.audio_file);
    formData.append("question_structure", JSON.stringify(questionStructure));
    formData.append("exam_category", category);
    try {
      const response = await ajaxCall(
        "/exam-blocks/",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
        },
        8000
      );
      if (response.status === 201) {
        toast.success("Listening Exam Create SuccessFully");
        navigate("/admin-exam");
      } else if (response.status === 400 || response.status === 401) {
        toast.error("Some Problem Occurred. Please try again.");
      }
    } catch (error) {
      setFormStatus({
        isError: true,
        errMsg: "Some Problem Occurred. Please try again.",
        isSubmitting: false,
      });
    }
  };

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="theme__shadow__circle"></div>
        <div className="theme__shadow__circle shadow__right"></div>
        <div className="container-fluid full__width__padding">
          <div className="d-flex">
            <div>
              <div className="box-left">
                {[
                  { id: "header2", title: "Matching Headings" },
                  { id: "header3", title: "Locating Information" },
                  { id: "header4", title: "True False Not Given" },
                  { id: "header6", title: "Summary Completion" },
                  { id: "header7", title: "Diagram Labling" },
                  { id: "header8", title: "Matching Sentence Endings" },
                  { id: "header9", title: "Matching Features" },
                  { id: "header10", title: "Sentence Completion" },
                  { id: "header11", title: "Short Answer Que" },
                  { id: "header12", title: "Flow Chart Completion" },
                  { id: "header13", title: "Note Completion" },
                  { id: "header14", title: "Yes No Not Given" },
                  { id: "header15", title: "Table Completion" },
                  { id: "header16", title: "Radio Choice Questions" },
                  { id: "header17", title: "Checkbox Choice Questions" },
                  { id: "header18", title: "Multiple Questions" },
                ].map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleClick(item.id, item.title)}
                  >
                    {item.title}
                  </div>
                ))}
                <div className="d-flex gap-3 align-items-center justify-content-center">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={downloadHTMLFile}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="box-right">
              {selectedDivs.map((header, index) => (
                <div>
                  <div key={index} className="header2Class">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5>{header.type}</h5>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(header)}
                      >
                        <i className="icofont-ui-delete" />
                      </button>
                    </div>
                    <div
                      contentEditable
                      dangerouslySetInnerHTML={{
                        __html: header.passage,
                      }}
                      onBlur={(event) =>
                        handleContentChange(event, header, index)
                      }
                    />
                  </div>
                  {header.type === "Multiple Questions" && (
                    <div style={{ display: "flex", marginBottom: "20px" }}>
                      <h5>Number Of Questions:</h5>
                      <input
                        type="number"
                        value={questionStructure[index].numberOfQuestions}
                        onChange={(e) =>
                          handleNumberOfQuestionsChange(e, index)
                        }
                        onBlur={() => handleNumberOfQuestionsChangeBlur(index)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-12 box-right">
              {answer.map((answer, parentIndex) => (
                <div className="row" key={parentIndex}>
                  <h5>{answer.title}</h5>
                  {answer.answers.map((item, childIndex) => (
                    <div className="col-xl-8 col-lg-6 col-md-6 col-12">
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>Question No. {item.question_number}</label>
                          <input
                            type="text"
                            placeholder="Answer"
                            value={answer.answer_text}
                            onChange={(e) =>
                              handleAnswerChange(e, parentIndex, childIndex)
                            }
                            style={{
                              borderColor: item.error === "" ? "" : "red",
                            }}
                          />
                          {item.error !== "" && (
                            <label style={{ color: "red" }}>Required</label>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              {formStatus.isError ? (
                <div className="text-danger mb-2">{formStatus.errMsg}</div>
              ) : (
                <div className="text-success mb-2">{formStatus.errMsg}</div>
              )}
              {answer.length > 0 && (
                <button
                  className="default__button"
                  disabled={formStatus.isSubmitting}
                  onClick={
                    listeningData.exam_type === "Listening"
                      ? doListening
                      : doReading
                  }
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
