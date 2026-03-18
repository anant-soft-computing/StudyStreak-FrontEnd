import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Grid, List } from "lucide-react";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import EnhancedReadingTest from "./EnhancedReading";
import EnhancedListeningTest from "./EnhancedListening";
import EnhancedWritingTest from "./EnhancedWriting";
import EnhancedSpeakingTest from "./EnhancedSpeaking";
import "./EnhancedPracticeTest.css";

const EnhancedPracticeTestTable = ({
  pendingTest,
  testType,
  isLoading,
  testData,
  givenTest,
}) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "table"

  const handleClick = (data) => {
    if (pendingTest === 0) {
      toast.error(
        "You Do Not Have Any Test Available, Please Upgrade Package !!"
      );
      return;
    }

    const baseUrl =
      data?.exam_type === "Speaking"
        ? "/Speaking-PracticeLiveExam/IELTS"
        : "/PracticeLiveExam/IELTS";

    const url =
      data?.exam_type === "General"
        ? `/GENERAL-PracticeLiveExam/IELTS/${data.exam_type}/${data.id}`
        : `${baseUrl}/${data.exam_type}/${data.id}`;
    window.open(url, "_blank");
  };

  const handleTestTaken = (testId, testType) => {
    // You can add any additional logic here when a test is taken
    console.log(`Test ${testId} of type ${testType} was taken`);
  };

  const testButton = (params) => {
    const { id: examId, exam_type, IELTS } = params.data;
    const paperId = IELTS?.id;
    const isGiven = givenTest?.some((test) => test?.id === examId || test === examId);

    return isGiven ? (
      <button
        className="take-test"
        onClick={() => {
          const reviewUrl =
            exam_type === "Writing" || exam_type === "Speaking"
              ? `/PracticeTest/Assessment/${exam_type}/${paperId}`
              : `/PracticeTest/Answer/${
                  exam_type === "General" ? "GENERAL" : exam_type
                }/${paperId}`;
          navigate(reviewUrl);
        }}
        style={{ backgroundColor: "green", border: "1px solid green" }}
      >
        Review Test
      </button>
    ) : (
      <button className="take-test" onClick={() => handleClick(params.data)}>
        Take Test
      </button>
    );
  };

  const blockCount = (params) => {
    switch (testType) {
      case "Reading":
        return params.data.reading_block_count;
      case "Writing":
        return params.data.writing_block_count;
      case "Listening":
        return params.data.listening_block_count;
      case "Speaking":
        return params.data.speaking_block_count;
      default:
        return 0;
    }
  };

  const questionCount = (params) => {
    switch (testType) {
      case "Reading":
        return 40;
      case "Writing":
        return 2;
      case "Listening":
        return 40;
      case "Speaking":
        return 3;
      default:
        return 0;
    }
  };

  const timeTaken = (params) => {
    switch (testType) {
      case "Reading":
        return "60 Minutes";
      case "Writing":
        return "60 Minutes";
      case "Listening":
        return "30 Minutes";
      case "Speaking":
        return "11-14 Minutes";
      default:
        return "N/A";
    }
  };

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: testButton,
      width: 200,
    },
    {
      headerName: "Name",
      field: "Name",
      cellRenderer: (params) => {
        return <div>{params.data.IELTS?.Name}</div>;
      },
      filter: true,
      width: 250,
    },
    {
      headerName: "Blocks",
      field: "block_count",
      cellRenderer: blockCount,
      width: 120,
    },
    {
      headerName: "Questions",
      field: "questions",
      cellRenderer: questionCount,
      width: 120,
    },
    {
      headerName: "Time",
      field: "time",
      cellRenderer: timeTaken,
      width: 150,
    },
  ];

  const renderEnhancedCards = () => {
    const commonProps = {
      givenTest: givenTest || [],
      onTestTaken: handleTestTaken,
    };

    switch (testType) {
      case "Reading":
        return <EnhancedReadingTest readingData={testData} {...commonProps} />;
      case "Listening":
        return <EnhancedListeningTest listeningData={testData} {...commonProps} />;
      case "Writing":
        return <EnhancedWritingTest writingData={testData} {...commonProps} />;
      case "Speaking":
        return <EnhancedSpeakingTest speakingData={testData} {...commonProps} />;
      case "General":
        return <EnhancedReadingTest readingData={testData} {...commonProps} />;
      default:
        return <div>No tests available for this type.</div>;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="enhanced-practice-test-container">
      {/* View Mode Toggle */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="view-mode-toggle">
          <button
            className={`btn btn-sm ${viewMode === "cards" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setViewMode("cards")}
          >
            <Grid size={16} className="me-1" />
            Card View
          </button>
          <button
            className={`btn btn-sm ms-2 ${viewMode === "table" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setViewMode("table")}
          >
            <List size={16} className="me-1" />
            Table View
          </button>
        </div>
        
        <div className="test-stats-summary">
          <span className="badge bg-light text-dark me-2">
            Total Tests: {testData?.length || 0}
          </span>
          <span className="badge bg-success">
            Completed: {testData?.filter(test => givenTest?.some(givenTest => givenTest?.id === test.id || givenTest === test.id)).length || 0}
          </span>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === "cards" ? (
        <div className="enhanced-cards-view">
          {renderEnhancedCards()}
        </div>
      ) : (
        <div className="table-view">
          <Table rowData={testData} columnDefs={columns} />
        </div>
      )}
    </div>
  );
};

export default EnhancedPracticeTestTable;