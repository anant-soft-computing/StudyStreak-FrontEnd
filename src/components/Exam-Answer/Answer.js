import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SmallModal from "../UI/Modal";
import SkipIcon from "../UI/SkipIcon";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";
import ScoreCard from "./ScoreCard/ScoreCard";
import ajaxCall from "../../helpers/ajaxCall";
import { getBackgroundColor } from "../../utils/background/background";
// Enhanced UI Components
import SkeletonLoader from "../UI/SkeletonLoader";
import ErrorBoundary from "../UI/ErrorBoundary";
import ErrorDisplay from "../UI/ErrorDisplay";
import ExportFeatures from "../UI/ExportFeatures";
import ComparisonView from "../UI/ComparisonView";
import "../UI/ComparisonModal.css";
import "./Answer.css";
import { Eye, BarChart3, X } from "lucide-react";

const Answer = () => {
  const { examId } = useParams();
  const [examData, setExamData] = useState({
    name: "",
    type: "",
    band: 0,
    gptResponse: "",
    correctAnswers: [],
    studentAnswers: [],
  });
  const [examPaperData, setExamPaperData] = useState({
    audio: "",
    passage: "",
    passageImage: "",
    question: "",
  });
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
    percentage: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Enhanced state management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [showComparisonView, setShowComparisonView] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Handle ESC key to close modal and manage body scroll
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showComparisonView) {
        setShowComparisonView(false);
      }
    };

    if (showComparisonView) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [showComparisonView]);

  const handleViewExam = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Enhanced handler functions
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleShowComparison = () => {
    setShowComparisonView(true);
  };

  const handleCloseComparison = () => {
    setShowComparisonView(false);
  };

  const handleQuestionChange = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Helper function to extract individual questions from exam paper HTML
  const extractQuestionsFromHTML = (htmlContent) => {
    if (!htmlContent) return [];
    
    try {
      // Create a temporary DOM element to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      // Try to find questions with common patterns
      const questions = [];
      
      // Look for numbered questions (1., 2., etc.)
      const numberedQuestions = tempDiv.querySelectorAll('p, div, li');
      numberedQuestions.forEach((element, index) => {
        const text = element.textContent?.trim();
        if (text && /^\d+\.\s/.test(text)) {
          questions.push({
            number: parseInt(text.match(/^(\d+)\./)[1]),
            text: text,
            html: element.outerHTML
          });
        }
      });
      
      // If no numbered questions found, try to split by common delimiters
      if (questions.length === 0) {
        const allText = tempDiv.textContent || '';
        const possibleQuestions = allText.split(/(?=\d+\.\s)|(?=Question\s+\d+)/i);
        possibleQuestions.forEach((q, index) => {
          if (q.trim()) {
            questions.push({
              number: index + 1,
              text: q.trim(),
              html: `<p>${q.trim()}</p>`
            });
          }
        });
      }
      
      return questions;
    } catch (error) {
      console.warn('Error extracting questions from HTML:', error);
      return [];
    }
  };

  // Prepare comparison data
  const getComparisonQuestions = () => {
    // For Speaking and Writing exams, show AI assessment with questions
    if (examData.type === "Speaking" || examData.type === "Writing") {
      const extractedQuestions = extractQuestionsFromHTML(examPaperData?.question);
      const mainQuestion = extractedQuestions.length > 0 ? 
        extractedQuestions[0]?.text || extractedQuestions[0]?.html : 
        examPaperData?.question || `${examData.type} Task`;
      
      return [{
        questionNumber: 1,
        question: mainQuestion,
        userAnswer: examData.type === "Speaking" ? "Audio Response Submitted" : "Written Response Submitted",
        correctAnswer: "AI Assessment Provided",
        isCorrect: true, // Speaking/Writing are not right/wrong but assessed
        explanation: examData.gptResponse || "No assessment available",
        questionId: "assessment",
        hasMultipleCorrectAnswers: false,
        answerType: "ASSESSMENT",
        examType: examData.type,
        band: examData.band,
        fullQuestion: examPaperData?.question // Keep full question for modal display
      }];
    }
    
    if (!examData.correctAnswers || !examData.studentAnswers) return [];
    
    // Extract questions from exam paper if available
    const extractedQuestions = extractQuestionsFromHTML(examPaperData?.question);
    
    return examData.correctAnswers.map((correctAnswer, index) => {
      const studentAnswer = examData.studentAnswers[index];
      const studentAnswerText = studentAnswer?.answer_text?.trim() || 'No answer provided';
      const correctAnswerText = correctAnswer?.answer_text?.trim() || 'No correct answer available';
      
      // Determine if answer is correct based on the same logic as the table
      let isCorrect = false;
      if (studentAnswerText && studentAnswerText !== 'No answer provided') {
        if (correctAnswerText?.includes(" OR ")) {
          const correctOptions = correctAnswerText
            .split(" OR ")
            .map((option) => option.trim().toLowerCase());
          isCorrect = correctOptions.includes(studentAnswerText.toLowerCase());
        } else if (correctAnswerText?.includes(" AND ")) {
          const correctOptions = correctAnswerText
            .split(" AND ")
            .map((option) => option.trim().toLowerCase());
          isCorrect = correctOptions.every((option) =>
            studentAnswerText.toLowerCase().includes(option)
          );
        } else {
          isCorrect = studentAnswerText.toLowerCase() === correctAnswerText.toLowerCase();
        }
      }

      // Try to get the specific question text
      let questionText = correctAnswer?.question_text || correctAnswer?.question;
      
      // If no question text, try to get from extracted questions
      if (!questionText && extractedQuestions.length > index) {
        questionText = extractedQuestions[index]?.text || extractedQuestions[index]?.html;
      }
      
      // Fallback message
      if (!questionText) {
        questionText = `Question ${index + 1} - Please check the exam paper for details`;
      }

      return {
        questionNumber: index + 1,
        question: questionText,
        userAnswer: studentAnswerText,
        correctAnswer: correctAnswerText,
        isCorrect: isCorrect,
        explanation: correctAnswer?.explanation || null,
        questionId: correctAnswer?.id,
        // Add additional context
        hasMultipleCorrectAnswers: correctAnswerText?.includes(" OR ") || correctAnswerText?.includes(" AND "),
        answerType: correctAnswerText?.includes(" OR ") ? "OR" : 
                   correctAnswerText?.includes(" AND ") ? "AND" : "EXACT"
      };
    });
  };

  // Prepare export data
  const getExportData = () => {
    // For Speaking and Writing exams, focus on band score and assessment
    if (examData.type === "Speaking" || examData.type === "Writing") {
      return {
        stats: {
          totalQuestions: 1,
          correctAnswers: 1, // Assessment completed
          incorrectAnswers: 0,
          skippedAnswers: 0,
          accuracy: "N/A",
          totalScore: examData.band || 0,
          maxScore: 9, // IELTS band scale
          timeTaken: 'N/A',
          examType: examData.type,
          band: examData.band
        },
        questions: getComparisonQuestions()
      };
    }
    
    return {
      stats: {
        totalQuestions: examData.correctAnswers?.length || 0,
        correctAnswers: stats.correct,
        incorrectAnswers: stats.incorrect,
        skippedAnswers: stats.skipped,
        accuracy: stats.percentage,
        totalScore: stats.correct,
        maxScore: examData.correctAnswers?.length || 0,
        timeTaken: 'N/A',
      },
      questions: getComparisonQuestions()
    };
  };

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await ajaxCall(
          `/exam-block-answers/${examId}/`,
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
          const { data } = response;
          setExamData({
            name: data?.exam_name || null,
            type: data?.exam_type || null,
            band: data?.band && data?.band !== 'null' && data?.band !== 'undefined' ? data.band : null,
            gptResponse: data?.AI_Assessment || null,
            correctAnswers: data?.correct_answers?.sort(
              (a, b) => a.question_number - b.question_number
            ) || [],
            studentAnswers: data?.student_answers?.sort(
              (a, b) => a.question_number - b.question_number
            ) || [],
          });
        } else {
          throw new Error(`Failed to load exam data: ${response.statusText || 'Unknown error'}`);
        }
      } catch (error) {
        console.error("Exam data fetch error:", error);
        setError({
          type: 'api',
          message: error.message || 'Failed to load exam results',
          details: error
        });
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [examId, retryCount]);

  useEffect(() => {
    const fetchExamPaper = async () => {
      try {
        const response = await ajaxCall(
          `/exam/block/${examId}/`,
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
          const { data } = response;
          setExamPaperData({
            audio: data?.audio_file,
            passage: data?.passage,
            passageImage: data?.passage_image,
            question: data?.question_other,
          });
        } else {
          console.warn("Failed to load exam paper data:", response.statusText);
        }
      } catch (error) {
        console.error("Exam paper fetch error:", error);
        // Don't set main error state for exam paper as it's secondary data
      }
    };

    if (!loading && !error) {
      fetchExamPaper();
    }
  }, [examId, loading, error]);

  useEffect(() => {
    // For Speaking and Writing exams, we don't calculate traditional stats
    if (examData.type === "Speaking" || examData.type === "Writing") {
      setStats({
        correct: 0,
        incorrect: 0,
        skipped: 0,
        percentage: 0,
      });
      return;
    }

    if (
      examData.correctAnswers.length === 0 ||
      examData.studentAnswers.length === 0
    )
      return;

    let correct = 0;
    let skipped = 0;
    let incorrect = 0;

    examData.studentAnswers.forEach((item, index) => {
      const correctAnswerText =
        examData.correctAnswers[index]?.answer_text?.trim();
      const studentAnswerText = item.answer_text?.trim();

      if (!studentAnswerText) {
        skipped++;
      } else if (correctAnswerText?.includes(" OR ")) {
        const correctOptions = correctAnswerText
          .split(" OR ")
          .map((option) => option.trim());
        if (correctOptions?.includes(studentAnswerText)) {
          correct++;
        } else {
          incorrect++;
        }
      } else if (correctAnswerText?.includes(" AND ")) {
        const correctOptions = correctAnswerText
          .split(" AND ")
          .map((option) => option.trim());
        if (
          correctOptions.every((option) => studentAnswerText?.includes(option))
        ) {
          correct++;
        } else {
          incorrect++;
        }
      } else {
        if (correctAnswerText === studentAnswerText) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    const percentage = (correct / examData.correctAnswers.length) * 100;

    setStats({
      correct,
      incorrect,
      skipped,
      percentage: percentage.toFixed(2),
    });
  }, [examData.correctAnswers, examData.studentAnswers]);

  // Show loading state
  if (loading) {
    return (
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8">
                  <SkeletonLoader type="assessment" />
                </div>
                <div className="col-xl-4 col-lg-4">
                  <SkeletonLoader type="stats" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <ErrorDisplay
                    error={error}
                    type={error.type || 'general'}
                    onRetry={handleRetry}
                    title="Failed to Load Exam Results"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no meaningful data available, show fallback
  if (!loading && !examData.type && !examData.name) {
    return (
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="alert alert-warning text-center">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <strong>No Exam Data Available</strong>
                    <p className="mt-2 mb-3">The exam results could not be loaded. This might be because:</p>
                    <ul className="text-start" style={{ maxWidth: "400px", margin: "0 auto" }}>
                      <li>The exam is still being processed</li>
                      <li>You may not have completed this exam</li>
                      <li>There was an issue with data retrieval</li>
                    </ul>
                    <div className="mt-3">
                      <button className="btn btn-primary me-2" onClick={handleRetry}>
                        <i className="fas fa-redo me-2"></i>
                        Try Again
                      </button>
                      <button className="btn btn-secondary" onClick={() => window.history.back()}>
                        <i className="fas fa-arrow-left me-2"></i>
                        Go Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if we have minimal data for Speaking exams
  const hasMinimalData = examData.type && (examData.name || examData.band || examData.gptResponse);
  
  return (
    <ErrorBoundary>
      <div className="body__wrapper exam-results-container">
        <div className="main_wrapper overflow-hidden">
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              {/* Navigation Breadcrumb */}
              <div className="row mb-3">
                <div className="col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-light p-3 rounded">
                      <li className="breadcrumb-item">
                        <button 
                          className="btn btn-link p-0 text-decoration-none"
                          onClick={() => window.history.back()}
                        >
                          <i className="fas fa-arrow-left me-2"></i>
                          Exam Results
                        </button>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        <i className="fas fa-file-alt me-2"></i>
                        {examData.name || `${examData.type || 'Unknown'} Exam`} Review
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              
              <div className="row">
                <div className="col-xl-8 col-lg-8 AnswerCard">
                  <div className="blog__details__content__wraper">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h4 className="sidebar__title">
                        Solution For: {examData.name || `${examData.type || 'Unknown'} Exam`}
                      </h4>
                      <div className="d-flex gap-2">
                        <button
                          onClick={handleShowComparison}
                          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                        >
                          <Eye size={16} />
                          Detailed Comparison
                        </button>
                        
                        {/* Share button for all exam types */}
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            if (navigator.share) {
                              navigator.share({
                                title: `${examData.name} - Exam Results`,
                                text: `Check out my ${examData.type} exam results!`,
                                url: url
                              });
                            } else {
                              navigator.clipboard.writeText(url);
                              alert('Link copied to clipboard!');
                            }
                          }}
                          className="btn btn-outline-success btn-sm d-flex align-items-center gap-2"
                        >
                          <i className="fas fa-share-alt"></i>
                          Share
                        </button>
                        
                        {/* View Exam button for all types */}
                        <button
                          onClick={handleViewExam}
                          className="btn btn-outline-info btn-sm d-flex align-items-center gap-2"
                        >
                          <i className="fas fa-eye"></i>
                          View Exam
                        </button>
                        
                        {/* Back to List button */}
                        <button
                          onClick={() => window.history.back()}
                          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
                        >
                          <i className="fas fa-arrow-left"></i>
                          Back
                        </button>
                      </div>
                    </div>

                    {/* Export Features - Moved to top for better visibility */}
                    <div className="mb-4">
                      <ExportFeatures
                        data={getExportData()}
                        examTitle={examData.name}
                        studentName="Student"
                        examDate={new Date().toLocaleDateString()}
                      />
                    </div>

                    {/* Quick Summary Section */}
                    <div className="mb-4">
                      <div className="card border-0 shadow-sm">
                        <div className="card-header bg-light">
                          <h5 className="card-title mb-0 d-flex align-items-center">
                            <i className="fas fa-chart-bar text-primary me-2"></i>
                            Quick Summary
                          </h5>
                        </div>
                        <div className="card-body">
                          {examData.type === "Writing" || examData.type === "Speaking" ? (
                            <div className="row">
                              <div className="col-md-6">
                                <div className="summary-item">
                                  <i className="fas fa-clipboard-check text-success me-2"></i>
                                  <strong>Exam Type:</strong> {examData.type} Assessment
                                </div>
                                <div className="summary-item">
                                  <i className="fas fa-calendar text-info me-2"></i>
                                  <strong>Date:</strong> {new Date().toLocaleDateString()}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="summary-item">
                                  <i className="fas fa-award text-warning me-2"></i>
                                  <strong>Score:</strong> {
                                    examData.band && examData.band !== 'null' && examData.band !== 'undefined' && !isNaN(examData.band) 
                                      ? `Band ${examData.band}` 
                                      : "Assessment Pending"
                                  }
                                </div>
                                <div className="summary-item">
                                  <i className="fas fa-robot text-secondary me-2"></i>
                                  <strong>AI Assessment:</strong> {examData.gptResponse ? "Available" : "Processing"}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="row">
                              <div className="col-md-3">
                                <div className="summary-item">
                                  <i className="fas fa-check-circle text-success me-2"></i>
                                  <strong>Correct:</strong> {stats.correct}
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="summary-item">
                                  <i className="fas fa-times-circle text-danger me-2"></i>
                                  <strong>Incorrect:</strong> {stats.incorrect}
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="summary-item">
                                  <i className="fas fa-minus-circle text-warning me-2"></i>
                                  <strong>Skipped:</strong> {stats.skipped}
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div className="summary-item">
                                  <i className="fas fa-percentage text-primary me-2"></i>
                                  <strong>Accuracy:</strong> {stats.percentage}%
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {(examData.type === "Writing" || examData.type === "Speaking") && (
                      <h4 className="sidebar__title">
                        Score : {
                          examData.band && examData.band !== 'null' && examData.band !== 'undefined' && !isNaN(examData.band) 
                            ? `Band ${examData.band}` 
                            : "Assessment Pending"
                        }
                      </h4>
                    )}
                    {(examData.type !== "Writing" && examData.type !== "Speaking") && (
                      <div className="d-flex flex-wrap gap-3">
                        <div className="flt-question-card">
                          Correct Answer : <span>{stats.correct}</span>
                        </div>
                        <div className="flt-question-card">
                          Incorrect Answer : <span>{stats.incorrect}</span>
                        </div>
                        <div className="flt-question-card">
                          Skip Answer : <span>{stats.skipped}</span>
                        </div>
                        <div
                          className="flt-question-card"
                          style={{
                            backgroundColor: getBackgroundColor(stats.correct),
                          }}
                        >
                          Marks :{" "}
                          <span>
                            {stats.correct} / {examData.correctAnswers.length}
                          </span>
                        </div>
                        <div className="flt-question-card">
                          Percentage : <span>{stats.percentage} %</span>
                        </div>
                      </div>
                    )}
                    {(examData.type === "Writing" || examData.type === "Speaking") && (
                      <div
                        className="writing__exam"
                        style={{ marginTop: "0px" }}
                      >
                        <div className="dashboard__section__title">
                          <h4 className="sidebar__title">
                            {examData.type === "Speaking" ? "Speaking Assessment" : "Assessment"}
                          </h4>
                        </div>
                        
                        {/* Show basic info even if no assessment */}
                        {examData.type === "Speaking" && !examData.gptResponse && !examData.band && (
                          <div className="alert alert-info">
                            <div className="d-flex align-items-center mb-2">
                              <i className="fas fa-microphone text-primary me-2"></i>
                              <strong>Speaking Test Completed</strong>
                            </div>
                            <p className="mb-2">Your speaking responses have been recorded successfully.</p>
                            <div className="mt-3">
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={handleViewExam}
                              >
                                <i className="fas fa-eye me-2"></i>
                                View Speaking Tasks
                              </button>
                            </div>
                          </div>
                        )}
                        {examData.gptResponse &&
                        examData.gptResponse.trim() !== "<p></p>" && 
                        examData.gptResponse.trim() !== "" ? (
                          <div>
                            <div
                              className="gptResponse"
                              dangerouslySetInnerHTML={{
                                __html: examData.gptResponse,
                              }}
                            ></div>
                            
                            {/* Action buttons for Writing/Speaking with assessment */}
                            <div className="mt-4 d-flex flex-wrap gap-2 justify-content-center">
                              <button
                                className="btn btn-primary"
                                onClick={handleViewExam}
                              >
                                <i className="fas fa-eye me-2"></i>
                                View {examData.type} Task
                              </button>
                              <button
                                onClick={handleShowComparison}
                                className="btn btn-outline-primary"
                              >
                                <i className="fas fa-balance-scale me-2"></i>
                                Detailed Analysis
                              </button>
                              <button
                                onClick={() => window.history.back()}
                                className="btn btn-outline-secondary"
                              >
                                <i className="fas fa-arrow-left me-2"></i>
                                Back to Results
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            {examData.type === "Speaking" ? (
                              <div>
                                <div className="alert alert-info">
                                  <i className="fas fa-microphone me-2"></i>
                                  <strong>Speaking Assessment Status</strong>
                                </div>
                                <div className="mb-3">
                                  <p className="text-muted">
                                    Your speaking responses have been submitted for evaluation.
                                  </p>
                                  {examData.band ? (
                                    <div className="mt-3">
                                      <h6>Assessment Score:</h6>
                                      <span className="badge bg-primary fs-5 px-3 py-2">
                                        Band {examData.band}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="mt-3">
                                      <div className="spinner-border spinner-border-sm me-2"></div>
                                      Assessment in progress...
                                    </div>
                                  )}
                                </div>
                                <div className="d-flex flex-wrap gap-2 justify-content-center">
                                  <button
                                    className="btn btn-primary"
                                    onClick={handleViewExam}
                                  >
                                    <i className="fas fa-eye me-2"></i>
                                    View Speaking Tasks
                                  </button>
                                  <button
                                    onClick={() => window.history.back()}
                                    className="btn btn-outline-secondary"
                                  >
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Back to Results
                                  </button>
                                </div>
                              </div>
                            ) : examData.type === "Writing" ? (
                              <div>
                                <div className="alert alert-warning">
                                  <i className="fas fa-hourglass-half me-2"></i>
                                  <strong>Writing Assessment Processing</strong>
                                </div>
                                <div className="mb-3">
                                  <p className="text-muted">
                                    Your writing response is being evaluated by our AI assessment system.
                                  </p>
                                  {examData.band ? (
                                    <div className="mt-3">
                                      <h6>Current Score:</h6>
                                      <span className="badge bg-primary fs-5 px-3 py-2">
                                        Band {examData.band}
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="mt-3">
                                      <div className="spinner-border spinner-border-sm me-2"></div>
                                      Assessment in progress...
                                    </div>
                                  )}
                                </div>
                                <div className="d-flex flex-wrap gap-2 justify-content-center">
                                  <button
                                    className="btn btn-primary"
                                    onClick={handleViewExam}
                                  >
                                    <i className="fas fa-eye me-2"></i>
                                    View Writing Task
                                  </button>
                                  <button
                                    onClick={handleShowComparison}
                                    className="btn btn-outline-primary"
                                  >
                                    <i className="fas fa-balance-scale me-2"></i>
                                    Detailed Analysis
                                  </button>
                                  <button
                                    onClick={() => window.history.back()}
                                    className="btn btn-outline-secondary"
                                  >
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Back to Results
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <h5 className="text-center text-danger mb-3">
                                  No Assessment Available !!
                                </h5>
                                <div className="d-flex gap-2 justify-content-center">
                                  <button
                                    onClick={() => window.history.back()}
                                    className="btn btn-outline-secondary"
                                  >
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Back to Results
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {(examData.type === "Reading" ||
                      examData.type === "Listening") && (
                      <div className="writing__exam">
                        <div className="dashboard__section__title">
                          <h4 className="sidebar__title">Answer Table</h4>
                          <button
                            className="take-test"
                            onClick={handleViewExam}
                          >
                            View Exam
                          </button>
                        </div>
                        <div className="row">
                          <div className="col-xl-12">
                            <div className="dashboard__table table-responsive">
                              <table>
                                <thead>
                                  <tr>
                                    <th>Question No.</th>
                                    <th>Correct Answer</th>
                                    <th>Your Answer</th>
                                    <th>Result</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {examData.correctAnswers?.map(
                                    ({ id, answer_text }, index) => {
                                      let icon;
                                      const studentAnswerText =
                                        examData.studentAnswers?.[
                                          index
                                        ]?.answer_text?.trim();
                                      const correctAnswerText =
                                        answer_text?.trim();

                                      if (!studentAnswerText) {
                                        icon = <SkipIcon />;
                                      } else if (
                                        correctAnswerText?.includes(" OR ")
                                      ) {
                                        const correctOptions = correctAnswerText
                                          .split(" OR ")
                                          .map((option) =>
                                            option.trim().toLowerCase()
                                          );
                                        icon = correctOptions.includes(
                                          studentAnswerText.toLowerCase()
                                        ) ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        );
                                      } else if (
                                        correctAnswerText?.includes(" AND ")
                                      ) {
                                        const correctOptions = correctAnswerText
                                          .split(" AND ")
                                          .map((option) =>
                                            option.trim().toLowerCase()
                                          );
                                        icon = correctOptions.every((option) =>
                                          studentAnswerText
                                            .toLowerCase()
                                            .includes(option)
                                        ) ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        );
                                      } else {
                                        icon =
                                          studentAnswerText ===
                                          correctAnswerText ? (
                                            <CheckIcon />
                                          ) : (
                                            <CancelIcon />
                                          );
                                      }
                                      return (
                                        <tr
                                          key={id}
                                          className={`${
                                            index % 2 === 0
                                              ? ""
                                              : "dashboard__table__row"
                                          }`}
                                        >
                                          <td className="text-dark">
                                            {index + 1}.
                                          </td>
                                          <td className="text-dark">
                                            <div className="dashboard__table__star">
                                              {correctAnswerText}
                                            </div>
                                          </td>
                                          <td className="text-dark">
                                            {studentAnswerText}
                                          </td>
                                          <td className="text-dark">{icon}</td>
                                        </tr>
                                      );
                                    }
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <ScoreCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SmallModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        size="xl"
        centered
        title="Exam Review"
        footer={
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        }
      >
        <div className="container-fluid">
          {examData.type === "Reading" ? (
            <div className="row">
              <div
                className="col-md-6"
                style={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div className="mb-3">
                  <h5 className="text-primary mb-3">
                    <i className="fas fa-book-open me-2"></i>
                    Reading Passage
                  </h5>
                </div>
                {examPaperData?.passageImage && (
                  <div className="mb-4 text-center">
                    <img
                      src={examPaperData?.passageImage}
                      alt="Passage"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "300px",
                        height: "auto",
                        borderRadius: "5px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                  </div>
                )}
                {examPaperData?.passage && (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      lineHeight: "1.6",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: examPaperData?.passage,
                    }}
                  />
                )}
              </div>
              <div
                className="col-md-6"
                style={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div className="mb-3">
                  <h5 className="text-success mb-3">
                    <i className="fas fa-question-circle me-2"></i>
                    Reading Questions
                  </h5>
                </div>
                {examPaperData?.question && (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      lineHeight: "1.6",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: examPaperData?.question,
                    }}
                  />
                )}
                
                {/* Show individual questions with answers */}
                {examData.correctAnswers?.length > 0 && (
                  <div className="mt-4">
                    <h6 className="text-info mb-3">
                      <i className="fas fa-list-ol me-2"></i>
                      Question-Answer Overview
                    </h6>
                    <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "5px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                      {examData.correctAnswers.slice(0, 5).map((item, index) => (
                        <div key={item.id} className="mb-3 pb-3" style={{ borderBottom: index < 4 ? "1px solid #eee" : "none" }}>
                          <div className="d-flex align-items-start">
                            <span className="badge bg-primary me-2 mt-1">{index + 1}</span>
                            <div className="flex-grow-1">
                              <div className="mb-2">
                                <strong className="text-dark">Answer:</strong>
                                <span className="ms-2 text-success">{item.answer_text}</span>
                              </div>
                              <div>
                                <strong className="text-dark">Your Answer:</strong>
                                <span className="ms-2 text-primary">
                                  {examData.studentAnswers?.[index]?.answer_text || "Not answered"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {examData.correctAnswers.length > 5 && (
                        <div className="text-center mt-3">
                          <small className="text-muted">
                            Showing first 5 of {examData.correctAnswers.length} questions
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : examData.type === "Speaking" ? (
            <div style={{ padding: "10px" }}>
              {examPaperData?.audio && (
                <div className="mb-4 text-center">
                  <h5 className="text-primary mb-3">
                    <i className="fas fa-microphone me-2"></i>
                    Speaking Audio Instructions
                  </h5>
                  <audio
                    controls
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      margin: "0 auto",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <source src={examPaperData?.audio} type="audio/mpeg" />
                  </audio>
                </div>
              )}
              
              <div className="row">
                <div className="col-md-6">
                  <div
                    style={{
                      maxHeight: "60vh",
                      overflowY: "auto",
                      padding: "15px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "15px",
                        borderRadius: "5px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      <h5 className="text-success mb-3">
                        <i className="fas fa-comments me-2"></i>
                        Speaking Questions & Tasks
                      </h5>
                      
                      {examPaperData?.question ? (
                        <div
                          style={{ lineHeight: "1.6" }}
                          dangerouslySetInnerHTML={{
                            __html: examPaperData?.question,
                          }}
                        />
                      ) : (
                        <div className="alert alert-info">
                          <h6><i className="fas fa-info-circle me-2"></i>Speaking Assessment</h6>
                          <p className="mb-2">This was a speaking assessment where you provided audio responses to speaking prompts.</p>
                          <div className="mt-3">
                            <h6 className="text-dark">Typical Speaking Tasks Include:</h6>
                            <ul className="mb-0">
                              <li>Personal introduction and familiar topics</li>
                              <li>Describing experiences, events, or situations</li>
                              <li>Expressing opinions and providing explanations</li>
                              <li>Discussing abstract topics and complex ideas</li>
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {/* Show exam name if available */}
                      {examData.name && (
                        <div className="mt-3">
                          <h6 className="text-secondary">
                            <i className="fas fa-tag me-2"></i>
                            Exam: {examData.name}
                          </h6>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div
                    style={{
                      maxHeight: "60vh",
                      overflowY: "auto",
                      padding: "15px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "15px",
                        borderRadius: "5px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      <h5 className="text-info mb-3">
                        <i className="fas fa-chart-line me-2"></i>
                        Speaking Assessment Results
                      </h5>
                      
                      {/* Always show assessment status */}
                      <div className="mb-3">
                        <div className="alert alert-success">
                          <i className="fas fa-check-circle me-2"></i>
                          Speaking assessment completed successfully
                        </div>
                      </div>
                      
                      {examData.band ? (
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold">Overall Band Score:</span>
                            <span className="badge bg-primary fs-6">{examData.band}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <div className="alert alert-info">
                            <i className="fas fa-clock me-2"></i>
                            Assessment results are being processed
                          </div>
                        </div>
                      )}
                      
                      {examData.gptResponse ? (
                        <div className="mt-3">
                          <h6 className="text-warning mb-2">
                            <i className="fas fa-robot me-2"></i>
                            AI Assessment Feedback
                          </h6>
                          <div 
                            style={{ 
                              backgroundColor: "#f8f9fa", 
                              padding: "12px", 
                              borderRadius: "5px",
                              border: "1px solid #dee2e6",
                              lineHeight: "1.5"
                            }}
                            dangerouslySetInnerHTML={{
                              __html: examData.gptResponse,
                            }}
                          />
                        </div>
                      ) : (
                        <div className="mt-3">
                          <h6 className="text-warning mb-2">
                            <i className="fas fa-robot me-2"></i>
                            AI Assessment Feedback
                          </h6>
                          <div 
                            style={{ 
                              backgroundColor: "#fff3cd", 
                              padding: "12px", 
                              borderRadius: "5px",
                              border: "1px solid #ffeaa7",
                              lineHeight: "1.5"
                            }}
                          >
                            <p className="mb-2 text-dark">
                              <i className="fas fa-hourglass-half me-2"></i>
                              Your speaking assessment is being evaluated by our AI system.
                            </p>
                            <p className="mb-0 text-muted small">
                              Detailed feedback including band scores for fluency, vocabulary, grammar, and pronunciation will be available shortly.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-3">
                        <h6 className="text-secondary mb-2">
                          <i className="fas fa-info-circle me-2"></i>
                          Assessment Details
                        </h6>
                        <div className="small text-muted">
                          <p className="mb-1">• Fluency and Coherence</p>
                          <p className="mb-1">• Lexical Resource</p>
                          <p className="mb-1">• Grammatical Range and Accuracy</p>
                          <p className="mb-0">• Pronunciation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : examData.type === "Listening" ? (
            <div style={{ padding: "10px" }}>
              {examPaperData?.audio && (
                <div className="mb-4 text-center">
                  <h5 className="text-primary mb-3">
                    <i className="fas fa-headphones me-2"></i>
                    Listening Audio
                  </h5>
                  <audio
                    controls
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      margin: "0 auto",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <source src={examPaperData?.audio} type="audio/mpeg" />
                  </audio>
                </div>
              )}
              
              <div className="row">
                <div className="col-md-6">
                  <div
                    style={{
                      maxHeight: "60vh",
                      overflowY: "auto",
                      padding: "15px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                    }}
                  >
                    {examPaperData?.question && (
                      <div
                        style={{
                          backgroundColor: "white",
                          padding: "15px",
                          borderRadius: "5px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                      >
                        <h5 className="text-success mb-3">
                          <i className="fas fa-question-circle me-2"></i>
                          Listening Questions
                        </h5>
                        <div
                          style={{ lineHeight: "1.6" }}
                          dangerouslySetInnerHTML={{
                            __html: examPaperData?.question,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div
                    style={{
                      maxHeight: "60vh",
                      overflowY: "auto",
                      padding: "15px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                    }}
                  >
                    {examData.correctAnswers?.length > 0 && (
                      <div
                        style={{
                          backgroundColor: "white",
                          padding: "15px",
                          borderRadius: "5px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                      >
                        <h5 className="text-info mb-3">
                          <i className="fas fa-list-ol me-2"></i>
                          Answer Review
                        </h5>
                        
                        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                          {examData.correctAnswers.slice(0, 8).map((item, index) => {
                            const studentAnswer = examData.studentAnswers?.[index];
                            const isCorrect = studentAnswer?.answer_text?.trim() === item.answer_text?.trim();
                            
                            return (
                              <div key={item.id} className="mb-3 pb-3" style={{ borderBottom: index < Math.min(7, examData.correctAnswers.length - 1) ? "1px solid #eee" : "none" }}>
                                <div className="d-flex align-items-start">
                                  <span className="badge bg-primary me-2 mt-1">{index + 1}</span>
                                  <div className="flex-grow-1">
                                    <div className="mb-2">
                                      <strong className="text-dark">Correct Answer:</strong>
                                      <span className="ms-2 text-success">{item.answer_text}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                      <strong className="text-dark">Your Answer:</strong>
                                      <span className={`ms-2 ${isCorrect ? 'text-success' : 'text-danger'}`}>
                                        {studentAnswer?.answer_text || "Not answered"}
                                      </span>
                                      {isCorrect ? (
                                        <i className="fas fa-check-circle text-success ms-2"></i>
                                      ) : (
                                        <i className="fas fa-times-circle text-danger ms-2"></i>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {examData.correctAnswers.length > 8 && (
                            <div className="text-center mt-3">
                              <small className="text-muted">
                                Showing first 8 of {examData.correctAnswers.length} questions
                              </small>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : examData.type === "Writing" ? (
            <div style={{ padding: "10px" }}>
              <div className="row">
                <div className="col-md-6">
                  <div
                    style={{
                      maxHeight: "70vh",
                      overflowY: "auto",
                      padding: "15px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                    }}
                  >
                    {examPaperData?.question && (
                      <div
                        style={{
                          backgroundColor: "white",
                          padding: "15px",
                          borderRadius: "5px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                      >
                        <h5 className="text-success mb-3">
                          <i className="fas fa-edit me-2"></i>
                          Writing Task & Instructions
                        </h5>
                        <div
                          style={{ lineHeight: "1.6" }}
                          dangerouslySetInnerHTML={{
                            __html: examPaperData?.question,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div
                    style={{
                      maxHeight: "70vh",
                      overflowY: "auto",
                      padding: "15px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "15px",
                        borderRadius: "5px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                    >
                      <h5 className="text-info mb-3">
                        <i className="fas fa-chart-line me-2"></i>
                        Writing Assessment
                      </h5>
                      
                      {examData.band && (
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-bold">Overall Band Score:</span>
                            <span className="badge bg-primary fs-6">{examData.band}</span>
                          </div>
                        </div>
                      )}
                      
                      {examData.gptResponse && (
                        <div className="mt-3">
                          <h6 className="text-warning mb-2">
                            <i className="fas fa-robot me-2"></i>
                            AI Assessment Feedback
                          </h6>
                          <div 
                            style={{ 
                              backgroundColor: "#f8f9fa", 
                              padding: "12px", 
                              borderRadius: "5px",
                              border: "1px solid #dee2e6",
                              lineHeight: "1.5",
                              maxHeight: "300px",
                              overflowY: "auto"
                            }}
                            dangerouslySetInnerHTML={{
                              __html: examData.gptResponse,
                            }}
                          />
                        </div>
                      )}
                      
                      <div className="mt-3">
                        <h6 className="text-secondary mb-2">
                          <i className="fas fa-info-circle me-2"></i>
                          Assessment Criteria
                        </h6>
                        <div className="small text-muted">
                          <p className="mb-1">• Task Achievement/Response</p>
                          <p className="mb-1">• Coherence and Cohesion</p>
                          <p className="mb-1">• Lexical Resource</p>
                          <p className="mb-0">• Grammatical Range and Accuracy</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: "10px" }}>
              {examPaperData?.audio && (
                <div className="mb-4 text-center">
                  <h5 className="text-primary mb-3">
                    <i className="fas fa-volume-up me-2"></i>
                    Audio Content
                  </h5>
                  <audio
                    controls
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      margin: "0 auto",
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    <source src={examPaperData?.audio} type="audio/mpeg" />
                  </audio>
                </div>
              )}
              <div
                style={{
                  maxHeight: "60vh",
                  overflowY: "auto",
                  padding: "15px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              >
                {examPaperData?.question && (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <h5 className="text-success mb-3">
                      <i className="fas fa-question-circle me-2"></i>
                      Questions
                    </h5>
                    <div
                      style={{ lineHeight: "1.6" }}
                      dangerouslySetInnerHTML={{
                        __html: examPaperData?.question,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </SmallModal>

      {/* Comparison View Modal */}
      {showComparisonView && (
        <div 
          className="comparison-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseComparison();
            }
          }}
        >
          <div className="comparison-modal-dialog">
            <div className="comparison-modal-content">
              <div className="comparison-modal-header">
                <h5 className="modal-title mb-0">Detailed Answer Comparison</h5>
                <button
                  type="button"
                  className="comparison-modal-close"
                  onClick={handleCloseComparison}
                  aria-label="Close Modal"
                  title="Close (ESC)"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="comparison-modal-body">
                <ComparisonView
                  questions={getComparisonQuestions()}
                  currentQuestionIndex={currentQuestionIndex}
                  onQuestionChange={handleQuestionChange}
                  examTitle={examData.name}
                  onViewExamPaper={handleViewExam}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </ErrorBoundary>
  );
};

export default Answer;
