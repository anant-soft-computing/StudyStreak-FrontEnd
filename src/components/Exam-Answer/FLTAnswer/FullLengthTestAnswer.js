import React, { useEffect, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { useParams, useNavigate } from "react-router-dom";
import listeningBandValues from "../../../utils/bandValues/listeningBandValues";
import readingBandValues from "../../../utils/bandValues/ReadingBandValues";
// Components
import TopBar from "../../TopBar/TopBar";
// Enhanced UI Components
import SkeletonLoader from "../../UI/SkeletonLoader";
import ErrorBoundary from "../../UI/ErrorBoundary";
import ErrorDisplay from "../../UI/ErrorDisplay";
import ExportFeatures from "../../UI/ExportFeatures";
import ComparisonView from "../../UI/ComparisonView";
import SmallModal from "../../UI/Modal";
import "../../UI/ComparisonModal.css";
import "../Answer.css";
import { 
  Eye, BarChart3, X, BookOpen, Headphones, Edit3, Mic, 
  Award, TrendingUp, CheckCircle, XCircle, MinusCircle,
  Play, FileText, Calendar, Clock
} from "lucide-react";

const FullLengthTestAnswer = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  // Core data state
  const [examData, setExamData] = useState({
    name: "",
    reading: {
      studentAnswers: [],
      correctAnswers: [],
      questions: [],
      stats: { correct: 0, incorrect: 0, skipped: 0, band: 0, percentage: 0 }
    },
    listening: {
      studentAnswers: [],
      correctAnswers: [],
      questions: [],
      stats: { correct: 0, incorrect: 0, skipped: 0, band: 0, percentage: 0 }
    },
    writing: {
      answers: [],
      questions: [],
      stats: { band: 0, tasks: 0 }
    },
    speaking: {
      answers: [],
      questions: [],
      stats: { band: 0, tasks: 0 }
    },
    overall: {
      band: 0,
      sections: 4,
      completedSections: 0
    }
  });
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [activeTab, setActiveTab] = useState("reading");
  const [selectedModule, setSelectedModule] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });
  const [showComparisonView, setShowComparisonView] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isExamPaperModalOpen, setIsExamPaperModalOpen] = useState(false);
  const [selectedSectionExam, setSelectedSectionExam] = useState(null);
  const [isSectionExamModalOpen, setIsSectionExamModalOpen] = useState(false);

  // Enhanced handler functions
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setActiveTab("details");
  };

  const handleShowModal = (title, content) => {
    setModalContent({ title, content });
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setModalContent({ title: "", content: "" });
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

  const handleViewExamPaper = () => {
    setIsExamPaperModalOpen(true);
  };

  const handleCloseExamPaper = () => {
    setIsExamPaperModalOpen(false);
  };

  const handleViewSectionExam = (section) => {
    setSelectedSectionExam(section);
    setIsSectionExamModalOpen(true);
  };

  const handleCloseSectionExam = () => {
    setIsSectionExamModalOpen(false);
    setSelectedSectionExam(null);
  };

  const handleSectionComparison = (section) => {
    setSelectedSectionExam(section);
    setShowComparisonView(true);
  };

  // Prepare comparison data for all sections
  const getComparisonQuestions = () => {
    const questions = [];
    let questionIndex = 1;

    // Reading Questions
    if (examData?.reading?.correctAnswers && Array.isArray(examData.reading.correctAnswers)) {
      examData.reading.correctAnswers.forEach((correctAnswer, index) => {
      const studentAnswer = examData.reading.studentAnswers[index];
      const studentAnswerText = studentAnswer?.answer_text?.trim() || 'No answer provided';
      const correctAnswerText = correctAnswer?.answer_text?.trim() || 'No correct answer available';
      
      let isCorrect = false;
      if (studentAnswerText && studentAnswerText !== 'No answer provided' && correctAnswerText && correctAnswerText !== 'No correct answer available') {
        if (correctAnswerText.includes(" OR ")) {
          const correctOptions = correctAnswerText.split(" OR ").map((option) => option.trim().toLowerCase());
          isCorrect = correctOptions.includes(studentAnswerText.toLowerCase());
        } else if (correctAnswerText.includes(" AND ")) {
          const correctOptions = correctAnswerText.split(" AND ").map((option) => option.trim().toLowerCase());
          isCorrect = correctOptions.every((option) => studentAnswerText.toLowerCase().includes(option));
        } else {
          isCorrect = studentAnswerText.toLowerCase() === correctAnswerText.toLowerCase();
        }
      }

      questions.push({
        questionNumber: questionIndex++,
        section: 'Reading',
        question: `Reading Question ${index + 1}`,
        userAnswer: studentAnswerText,
        correctAnswer: correctAnswerText,
        isCorrect: isCorrect,
        explanation: correctAnswer?.explanation || null,
        questionId: correctAnswer?.id,
        hasMultipleCorrectAnswers: correctAnswerText?.includes(" OR ") || correctAnswerText?.includes(" AND "),
        answerType: correctAnswerText?.includes(" OR ") ? "OR" : 
                   correctAnswerText?.includes(" AND ") ? "AND" : "EXACT"
      });
      });
    }

    // Listening Questions
    if (examData?.listening?.correctAnswers && Array.isArray(examData.listening.correctAnswers)) {
      examData.listening.correctAnswers.forEach((correctAnswer, index) => {
      const studentAnswer = examData.listening.studentAnswers[index];
      const studentAnswerText = studentAnswer?.answer_text?.trim() || 'No answer provided';
      const correctAnswerText = correctAnswer?.answer_text?.trim() || 'No correct answer available';
      
      let isCorrect = false;
      if (studentAnswerText && studentAnswerText !== 'No answer provided' && correctAnswerText && correctAnswerText !== 'No correct answer available') {
        if (correctAnswerText.includes(" OR ")) {
          const correctOptions = correctAnswerText.split(" OR ").map((option) => option.trim().toLowerCase());
          isCorrect = correctOptions.includes(studentAnswerText.toLowerCase());
        } else if (correctAnswerText.includes(" AND ")) {
          const correctOptions = correctAnswerText.split(" AND ").map((option) => option.trim().toLowerCase());
          isCorrect = correctOptions.every((option) => studentAnswerText.toLowerCase().includes(option));
        } else {
          isCorrect = studentAnswerText.toLowerCase() === correctAnswerText.toLowerCase();
        }
      }

      questions.push({
        questionNumber: questionIndex++,
        section: 'Listening',
        question: `Listening Question ${index + 1}`,
        userAnswer: studentAnswerText,
        correctAnswer: correctAnswerText,
        isCorrect: isCorrect,
        explanation: correctAnswer?.explanation || null,
        questionId: correctAnswer?.id,
        hasMultipleCorrectAnswers: correctAnswerText?.includes(" OR ") || correctAnswerText?.includes(" AND "),
        answerType: correctAnswerText?.includes(" OR ") ? "OR" : 
                   correctAnswerText?.includes(" AND ") ? "AND" : "EXACT"
      });
      });
    }

    // Writing Assessment
    if (examData.writing.answers && examData.writing.answers.length > 0) {
      examData.writing.answers.forEach((writing, index) => {
        questions.push({
          questionNumber: questionIndex++,
          section: 'Writing',
          question: `Writing Task ${index + 1}`,
          userAnswer: "Written Response Submitted",
          correctAnswer: "AI Assessment Provided",
          isCorrect: true,
          explanation: writing.ai_assessment?.feedback || "No assessment available",
          questionId: `writing-${index}`,
          hasMultipleCorrectAnswers: false,
          answerType: "ASSESSMENT",
          examType: "Writing",
          band: writing.ai_assessment?.overall_band || examData.writing.stats.band
        });
      });
    }

    // Speaking Assessment
    if (examData.speaking.answers && examData.speaking.answers.length > 0) {
      examData.speaking.answers.forEach((speaking, index) => {
        questions.push({
          questionNumber: questionIndex++,
          section: 'Speaking',
          question: `Speaking Task ${index + 1}`,
          userAnswer: "Audio Response Submitted",
          correctAnswer: "AI Assessment Provided",
          isCorrect: true,
          explanation: speaking.ai_assessment?.feedback || "No assessment available",
          questionId: `speaking-${index}`,
          hasMultipleCorrectAnswers: false,
          answerType: "ASSESSMENT",
          examType: "Speaking",
          band: speaking.ai_assessment?.overall_band || examData.speaking.stats.band
        });
      });
    }

    return questions;
  };

  // Prepare export data
  const getExportData = () => {
    return {
      stats: {
        totalQuestions: examData.reading.studentAnswers.length + 
                       examData.listening.studentAnswers.length + 
                       examData.writing.stats.tasks + 
                       examData.speaking.stats.tasks,
        reading: {
          correctAnswers: examData.reading.stats.correct,
          incorrectAnswers: examData.reading.stats.incorrect,
          skippedAnswers: examData.reading.stats.skipped,
          band: examData.reading.stats.band,
          totalQuestions: examData.reading.studentAnswers.length
        },
        listening: {
          correctAnswers: examData.listening.stats.correct,
          incorrectAnswers: examData.listening.stats.incorrect,
          skippedAnswers: examData.listening.stats.skipped,
          band: examData.listening.stats.band,
          totalQuestions: examData.listening.studentAnswers.length
        },
        writing: {
          band: examData.writing.stats.band,
          totalTasks: examData.writing.stats.tasks
        },
        speaking: {
          band: examData.speaking.stats.band,
          totalTasks: examData.speaking.stats.tasks
        },
        overallBand: examData.overall.band,
        examDate: new Date().toLocaleDateString(),
        examType: "Full Length Test"
      },
      questions: getComparisonQuestions()
    };
  };



  // Calculate statistics for traditional Q&A modules
  const calculateStats = (studentAnswers, correctAnswers) => {
    let correct = 0, incorrect = 0, skipped = 0;
    
    studentAnswers.forEach((studentAnswer, index) => {
      const correctAnswer = correctAnswers[index];
      const studentText = studentAnswer?.answer_text?.trim();
      const correctText = correctAnswer?.answer_text?.trim();
      
      if (!studentText) {
        skipped++;
      } else if (!correctText) {
        incorrect++;
      } else if (correctText.includes(" OR ")) {
        const options = correctText.split(" OR ").map(opt => opt.trim().toLowerCase());
        if (options.includes(studentText.toLowerCase())) {
          correct++;
        } else {
          incorrect++;
        }
      } else if (correctText.includes(" AND ")) {
        const options = correctText.split(" AND ").map(opt => opt.trim().toLowerCase());
        if (options.every(opt => studentText.toLowerCase().includes(opt))) {
          correct++;
        } else {
          incorrect++;
        }
      } else {
        if (studentText.toLowerCase() === correctText.toLowerCase()) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });
    
    const total = studentAnswers.length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    const isAttempted = correct > 0 || incorrect > 0;
    
    return { correct, incorrect, skipped, percentage, total, isAttempted };
  };

  // Calculate average band for assessment modules
  const calculateAverageBand = (answers) => {
    if (!answers || answers.length === 0) return 0;
    const validBands = answers
      .map(item => parseFloat(item.band))
      .filter(band => !isNaN(band) && band > 0);
    
    if (validBands.length === 0) return 0;
    return (validBands.reduce((sum, band) => sum + band, 0) / validBands.length).toFixed(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await ajaxCall(
          `/flt-answers/${examId}/`,
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
          const { writing_set, speaking_set, reading_set, listening_set } = response.data;
          
          // Process Reading data
          let readingStudentAnswers = [];
          let readingCorrectAnswers = [];
          let readingQuestions = [];
          if (reading_set?.student_answers?.Reading && reading_set?.correct_answers?.Reading) {
            readingStudentAnswers = reading_set.student_answers.Reading.reduce(
              (acc, curr) => acc.concat(
                curr.answers.sort((a, b) => a.question_number - b.question_number)
              ), []
            ).sort((a, b) => a.question_number - b.question_number);
            readingCorrectAnswers = reading_set.correct_answers.Reading.reduce(
              (acc, curr) => acc.concat(
                curr.answers.sort((a, b) => a.question_number - b.question_number)
              ), []
            ).sort((a, b) => a.question_number - b.question_number);
          }
          
          // Extract reading exam questions
          if (reading_set?.Reading && Array.isArray(reading_set.Reading)) {
            readingQuestions = reading_set.Reading.map(exam => ({
              id: exam?.id || 'unknown',
              name: exam?.exam_name || 'Reading Exam',
              passage: exam?.passage || '',
              question: exam?.question || '',
              exam_type: exam?.exam_type || 'Reading',
              passage_image: exam?.passage_image || null
            }));
          }
          
          // Process Listening data
          let listeningStudentAnswers = [];
          let listeningCorrectAnswers = [];
          let listeningQuestions = [];
          if (listening_set?.student_answers?.Listening && listening_set?.correct_answers?.Listening) {
            listeningStudentAnswers = listening_set.student_answers.Listening.reduce(
              (acc, curr) => acc.concat(
                curr.answers.sort((a, b) => a.question_number - b.question_number)
              ), []
            ).sort((a, b) => a.question_number - b.question_number);
            listeningCorrectAnswers = listening_set.correct_answers.Listening.reduce(
              (acc, curr) => acc.concat(
                curr.answers.sort((a, b) => a.question_number - b.question_number)
              ), []
            ).sort((a, b) => a.question_number - b.question_number);
          }
          
          // Extract listening exam questions
          if (listening_set?.Listening && Array.isArray(listening_set.Listening)) {
            listeningQuestions = listening_set.Listening.map(exam => ({
              id: exam?.id || 'unknown',
              name: exam?.exam_name || 'Listening Exam',
              passage: exam?.passage || '',
              question: exam?.question || '',
              exam_type: exam?.exam_type || 'Listening',
              audio_file: exam?.audio_file || null
            }));
          }
          
          // Calculate Reading stats
          const readingStats = calculateStats(readingStudentAnswers, readingCorrectAnswers);
          
          // Calculate Listening stats
          const listeningStats = calculateStats(listeningStudentAnswers, listeningCorrectAnswers);
          
          // Process Writing data
          const writingAnswers = writing_set?.student_answers?.Writing || [];
          const writingBand = calculateAverageBand(writingAnswers);
          
          // Extract writing exam questions
          const writingQuestions = (writing_set?.Writing && Array.isArray(writing_set.Writing)) ? writing_set.Writing.map(exam => ({
            id: exam?.id || 'unknown',
            name: exam?.exam_name || 'Writing Task',
            prompt: exam?.question || '',
            exam_type: exam?.exam_type || 'Writing',
            requirements: exam?.question_other ? [exam.question_other] : []
          })) : [];
          
          // Process Speaking data
          const speakingAnswers = speaking_set?.student_answers?.Speaking || [];
          const speakingBand = calculateAverageBand(speakingAnswers);
          
          // Extract speaking exam questions
          const speakingQuestions = (speaking_set?.Speaking && Array.isArray(speaking_set.Speaking)) ? speaking_set.Speaking.map(exam => ({
            id: exam?.id || 'unknown',
            name: exam?.name || 'Speaking Task',
            instructions: exam?.question || "Speaking assessment",
            questions: exam?.questions || [],
            exam_type: "Speaking"
          })) : [];
          
          // Calculate overall stats
          const completedSections = [
            readingCorrectAnswers.length > 0 ? 1 : 0,
            listeningCorrectAnswers.length > 0 ? 1 : 0,
            writingAnswers.length > 0 ? 1 : 0,
            speakingAnswers.length > 0 ? 1 : 0
          ].reduce((sum, val) => sum + val, 0);
          
          const allBands = [];
          
          // Only include sections that were actually attempted
          if (readingStats.isAttempted) {
            allBands.push(readingBandValues[readingStats.correct] || 0);
          }
          if (listeningStats.isAttempted) {
            allBands.push(listeningBandValues[listeningStats.correct] || 0);
          }
          if (writingAnswers.length > 0 && parseFloat(writingBand) > 0) {
            allBands.push(parseFloat(writingBand));
          }
          if (speakingAnswers.length > 0 && parseFloat(speakingBand) > 0) {
            allBands.push(parseFloat(speakingBand));
          }
          
          const overallBand = allBands.length > 0 
            ? (allBands.reduce((sum, band) => sum + band, 0) / allBands.length).toFixed(1)
            : 0;
          

          
          // Update state with new structure
          setExamData({
            name: response?.data?.name || "Full Length Test",
            reading: {
              studentAnswers: readingStudentAnswers,
              correctAnswers: readingCorrectAnswers,
              questions: readingQuestions,
              stats: {
                ...readingStats,
                band: readingStats.isAttempted ? (readingBandValues[readingStats.correct] || 0) : 0
              }
            },
            listening: {
              studentAnswers: listeningStudentAnswers,
              correctAnswers: listeningCorrectAnswers,
              questions: listeningQuestions,
              stats: {
                ...listeningStats,
                band: listeningStats.isAttempted ? (listeningBandValues[listeningStats.correct] || 0) : 0
              }
            },
            writing: {
              answers: writingAnswers,
              questions: writingQuestions,
              stats: {
                band: writingBand,
                tasks: writingAnswers.length
              }
            },
            speaking: {
              answers: speakingAnswers,
              questions: speakingQuestions,
              stats: {
                band: speakingBand,
                tasks: speakingAnswers.length
              }
            },
            overall: {
              band: overallBand,
              sections: 4,
              completedSections
            }
          });
        } else {
          throw new Error(`Failed to load exam data: ${response.statusText || 'Unknown error'}`);
        }
      } catch (error) {
        console.error("Full length test data fetch error:", error);
        setError({
          type: 'api',
          message: error.message || 'Failed to load full length test results',
          details: error
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [examId, retryCount]);



  // Loading state
  if (loading) {
    return (
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <SkeletonLoader 
                    type="exam-results" 
                    message="Loading Full Length Test Results..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
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
                    title="Failed to Load Full Length Test Results"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                          onClick={() => navigate("/exam-review")}
                        >
                          <i className="fas fa-arrow-left me-2"></i>
                          Full Length Tests
                        </button>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        <i className="fas fa-file-alt me-2"></i>
                        {examData.name || 'Full Length Test'} Review
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
                        Solution For: {examData.name || 'Full Length Test'}
                      </h4>
                      <div className="d-flex gap-2">
                        <button
                          onClick={handleShowComparison}
                          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                        >
                          <Eye size={16} />
                          Detailed Comparison
                        </button>
                        
                        {/* Share button */}
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            if (navigator.share) {
                              navigator.share({
                                title: `${examData.name} - Full Length Test Results`,
                                text: `Check out my Full Length IELTS test results!`,
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
                        
                        {/* View Exam button */}
                        <button
                          onClick={handleViewExamPaper}
                          className="btn btn-outline-info btn-sm d-flex align-items-center gap-2"
                        >
                          <i className="fas fa-eye"></i>
                          View Exam
                        </button>
                        
                        {/* Back button */}
                        <button
                          onClick={() => navigate("/exam-review")}
                          className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2"
                        >
                          <i className="fas fa-arrow-left"></i>
                          Back
                        </button>
                      </div>
                    </div>

                    {/* Export Features */}
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
                            Full Length Test Summary
                          </h5>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-md-3">
                              <div className="summary-item">
                                <i className="fas fa-book text-primary me-2"></i>
                                <strong>Reading:</strong> {examData.reading.stats.correct}/{examData.reading.studentAnswers.length} (Band {examData.reading.stats.band})
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="summary-item">
                                <i className="fas fa-headphones text-success me-2"></i>
                                <strong>Listening:</strong> {examData.listening.stats.correct}/{examData.listening.studentAnswers.length} (Band {examData.listening.stats.band})
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="summary-item">
                                <i className="fas fa-edit text-warning me-2"></i>
                                <strong>Writing:</strong> {examData.writing.stats.tasks} tasks (Band {examData.writing.stats.band})
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="summary-item">
                                <i className="fas fa-microphone text-danger me-2"></i>
                                <strong>Speaking:</strong> {examData.speaking.stats.tasks} tasks (Band {examData.speaking.stats.band})
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-md-6">
                              <div className="summary-item">
                                <i className="fas fa-award text-primary me-2"></i>
                                <strong>Overall Band:</strong> {examData.overall.band}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="summary-item">
                                <i className="fas fa-calendar text-secondary me-2"></i>
                                <strong>Date:</strong> {new Date().toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Module Navigation Tabs */}
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-light">
                        <ul className="nav nav-tabs card-header-tabs" id="moduleTab" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeTab === 'reading' ? 'active' : ''}`}
                              onClick={() => handleTabChange('reading')}
                              type="button"
                            >
                              <i className="fas fa-book me-2 text-primary"></i>
                              Reading ({examData.reading.stats.correct}/{examData.reading.studentAnswers.length})
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeTab === 'listening' ? 'active' : ''}`}
                              onClick={() => handleTabChange('listening')}
                              type="button"
                            >
                              <i className="fas fa-headphones me-2 text-success"></i>
                              Listening ({examData.listening.stats.correct}/{examData.listening.studentAnswers.length})
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeTab === 'writing' ? 'active' : ''}`}
                              onClick={() => handleTabChange('writing')}
                              type="button"
                            >
                              <i className="fas fa-edit me-2 text-warning"></i>
                              Writing ({examData.writing.stats.tasks} tasks)
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeTab === 'speaking' ? 'active' : ''}`}
                              onClick={() => handleTabChange('speaking')}
                              type="button"
                            >
                              <i className="fas fa-microphone me-2 text-danger"></i>
                              Speaking ({examData.speaking.stats.tasks} tasks)
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content" id="moduleTabContent">
                      {/* Reading Tab */}
                      {activeTab === 'reading' && (
                        <div className="tab-pane fade show active">
                          <div className="card border-0 shadow-sm">
                            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                              <h5 className="card-title mb-0">
                                <i className="fas fa-book me-2"></i>
                                Reading Section Review
                              </h5>
                              <div className="d-flex gap-2">
                                <button
                                  onClick={() => handleSectionComparison('reading')}
                                  className="btn btn-light btn-sm"
                                  title="Detailed Comparison"
                                >
                                  <i className="fas fa-chart-bar me-1"></i>
                                  Compare
                                </button>
                                <button
                                  onClick={() => handleViewSectionExam('reading')}
                                  className="btn btn-outline-light btn-sm"
                                  title="View Reading Exam"
                                >
                                  <i className="fas fa-eye me-1"></i>
                                  View Exam
                                </button>
                              </div>
                            </div>
                            <div className="card-body">
                              {examData.reading.studentAnswers && examData.reading.studentAnswers.length > 0 ? (
                                <div className="table-responsive">
                                  <table className="table table-striped table-hover">
                                    <thead className="table-dark">
                                      <tr>
                                        <th>Question</th>
                                        <th>Your Answer</th>
                                        <th>Correct Answer</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {examData.reading.studentAnswers.map((studentAnswer, index) => (
                                        <tr key={index}>
                                          <td><strong>Q{index + 1}</strong></td>
                                          <td>{studentAnswer?.answer_text || 'Not answered'}</td>
                                          <td className="text-success">
                                            {examData.reading.correctAnswers[index]?.answer_text || 'N/A'}
                                          </td>
                                          <td>
                                            {(() => {
                                              const correctAnswerText = examData.reading.correctAnswers[index]?.answer_text?.trim() || '';
                                              const studentAnswerText = studentAnswer?.answer_text?.trim() || '';
                                              
                                              let isCorrect = false;
                                              if (correctAnswerText && studentAnswerText) {
                                                if (correctAnswerText.includes(' OR ')) {
                                                  const correctOptions = correctAnswerText.split(' OR ').map(opt => opt.trim().toLowerCase());
                                                  isCorrect = correctOptions.includes(studentAnswerText.toLowerCase());
                                                } else if (correctAnswerText.includes(' AND ')) {
                                                  const correctOptions = correctAnswerText.split(' AND ').map(opt => opt.trim().toLowerCase());
                                                  isCorrect = correctOptions.every(opt => studentAnswerText.toLowerCase().includes(opt));
                                                } else {
                                                  isCorrect = correctAnswerText.toLowerCase() === studentAnswerText.toLowerCase();
                                                }
                                              }
                                              
                                              if (isCorrect) {
                                                return (
                                                  <span className="badge bg-success">
                                                    <i className="fas fa-check me-1"></i>Correct
                                                  </span>
                                                );
                                              } else if (studentAnswerText) {
                                                return (
                                                  <span className="badge bg-danger">
                                                    <i className="fas fa-times me-1"></i>Incorrect
                                                  </span>
                                                );
                                              } else {
                                                return (
                                                  <span className="badge bg-warning">
                                                    <i className="fas fa-minus me-1"></i>Skipped
                                                  </span>
                                                );
                                              }
                                            })()}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div className="text-center py-5">
                                  <i className="fas fa-book fa-3x text-muted mb-3"></i>
                                  <p className="text-muted">No reading data available</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Listening Tab */}
                      {activeTab === 'listening' && (
                        <div className="tab-pane fade show active">
                          <div className="card border-0 shadow-sm">
                            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                              <h5 className="card-title mb-0">
                                <i className="fas fa-headphones me-2"></i>
                                Listening Section Review
                              </h5>
                              <div className="d-flex gap-2">
                                <button
                                  onClick={() => handleSectionComparison('listening')}
                                  className="btn btn-light btn-sm"
                                  title="Detailed Comparison"
                                >
                                  <i className="fas fa-chart-bar me-1"></i>
                                  Compare
                                </button>
                                <button
                                  onClick={() => handleViewSectionExam('listening')}
                                  className="btn btn-outline-light btn-sm"
                                  title="View Listening Exam"
                                >
                                  <i className="fas fa-eye me-1"></i>
                                  View Exam
                                </button>
                              </div>
                            </div>
                            <div className="card-body">
                              {examData.listening.studentAnswers && examData.listening.studentAnswers.length > 0 ? (
                                <div className="table-responsive">
                                  <table className="table table-striped table-hover">
                                    <thead className="table-dark">
                                      <tr>
                                        <th>Question</th>
                                        <th>Your Answer</th>
                                        <th>Correct Answer</th>
                                        <th>Status</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {examData.listening.studentAnswers.map((studentAnswer, index) => (
                                        <tr key={index}>
                                          <td><strong>Q{index + 1}</strong></td>
                                          <td>{studentAnswer?.answer_text || 'Not answered'}</td>
                                          <td className="text-success">
                                            {examData.listening.correctAnswers[index]?.answer_text || 'N/A'}
                                          </td>
                                          <td>
                                            {(() => {
                                              const correctAnswerText = examData.listening.correctAnswers[index]?.answer_text?.trim() || '';
                                              const studentAnswerText = studentAnswer?.answer_text?.trim() || '';
                                              
                                              let isCorrect = false;
                                              if (correctAnswerText && studentAnswerText) {
                                                if (correctAnswerText.includes(' OR ')) {
                                                  const correctOptions = correctAnswerText.split(' OR ').map(opt => opt.trim().toLowerCase());
                                                  isCorrect = correctOptions.includes(studentAnswerText.toLowerCase());
                                                } else if (correctAnswerText.includes(' AND ')) {
                                                  const correctOptions = correctAnswerText.split(' AND ').map(opt => opt.trim().toLowerCase());
                                                  isCorrect = correctOptions.every(opt => studentAnswerText.toLowerCase().includes(opt));
                                                } else {
                                                  isCorrect = correctAnswerText.toLowerCase() === studentAnswerText.toLowerCase();
                                                }
                                              }
                                              
                                              if (isCorrect) {
                                                return (
                                                  <span className="badge bg-success">
                                                    <i className="fas fa-check me-1"></i>Correct
                                                  </span>
                                                );
                                              } else if (studentAnswerText) {
                                                return (
                                                  <span className="badge bg-danger">
                                                    <i className="fas fa-times me-1"></i>Incorrect
                                                  </span>
                                                );
                                              } else {
                                                return (
                                                  <span className="badge bg-warning">
                                                    <i className="fas fa-minus me-1"></i>Skipped
                                                  </span>
                                                );
                                              }
                                            })()}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div className="text-center py-5">
                                  <i className="fas fa-headphones fa-3x text-muted mb-3"></i>
                                  <p className="text-muted">No listening data available</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Writing Tab */}
                      {activeTab === 'writing' && (
                        <div className="tab-pane fade show active">
                          <div className="card border-0 shadow-sm">
                            <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
                              <h5 className="card-title mb-0">
                                <i className="fas fa-edit me-2"></i>
                                Writing Section Review
                              </h5>
                              <div className="d-flex gap-2">
                                <button
                                  onClick={() => handleSectionComparison('writing')}
                                  className="btn btn-dark btn-sm"
                                  title="Detailed Comparison"
                                >
                                  <i className="fas fa-chart-bar me-1"></i>
                                  Compare
                                </button>
                                <button
                                  onClick={() => handleViewSectionExam('writing')}
                                  className="btn btn-outline-light btn-sm"
                                  title="View Writing Exam"
                                >
                                  <i className="fas fa-eye me-1"></i>
                                  View Exam
                                </button>
                              </div>
                            </div>
                            <div className="card-body">
                              {examData.writing.answers && examData.writing.answers.length > 0 ? (
                                <div className="accordion" id="writingAccordion">
                                  {examData.writing.answers.map((task, index) => (
                                    <div key={index} className="accordion-item mb-3">
                                      <h2 className="accordion-header">
                                        <button
                                          className="accordion-button"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target={`#writingTask${index}`}
                                        >
                                          <i className="fas fa-edit me-2"></i>
                                          Writing Task {index + 1}
                                        </button>
                                      </h2>
                                      <div
                                        id={`writingTask${index}`}
                                        className="accordion-collapse collapse show"
                                      >
                                        <div className="accordion-body">
                                          <div className="mb-3">
                                            <h6><strong>Your Response:</strong></h6>
                                            <div className="bg-light p-3 rounded">
                                              <p className="mb-0">{task.answer_text || 'No response provided'}</p>
                                            </div>
                                          </div>
                                          {task.ai_assessment && (
                                            <div>
                                              <h6><strong>AI Assessment:</strong></h6>
                                              <div className="row">
                                                <div className="col-md-3">
                                                  <div className="card bg-light">
                                                    <div className="card-body text-center">
                                                      <h5 className="card-title text-warning">
                                                        {task.ai_assessment.task_response || 'N/A'}
                                                      </h5>
                                                      <p className="card-text small">Task Response</p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-3">
                                                  <div className="card bg-light">
                                                    <div className="card-body text-center">
                                                      <h5 className="card-title text-warning">
                                                        {task.ai_assessment.coherence_cohesion || 'N/A'}
                                                      </h5>
                                                      <p className="card-text small">Coherence</p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-3">
                                                  <div className="card bg-light">
                                                    <div className="card-body text-center">
                                                      <h5 className="card-title text-warning">
                                                        {task.ai_assessment.lexical_resource || 'N/A'}
                                                      </h5>
                                                      <p className="card-text small">Lexical Resource</p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-3">
                                                  <div className="card bg-light">
                                                    <div className="card-body text-center">
                                                      <h5 className="card-title text-warning">
                                                        {task.ai_assessment.grammatical_range || 'N/A'}
                                                      </h5>
                                                      <p className="card-text small">Grammar</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              {task.ai_assessment.feedback && (
                                                <div className="mt-3">
                                                  <h6><strong>Detailed Feedback:</strong></h6>
                                                  <div className="alert alert-info">
                                                    {task.ai_assessment.feedback}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-5">
                                  <i className="fas fa-edit fa-3x text-muted mb-3"></i>
                                  <p className="text-muted">No writing data available</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Speaking Tab */}
                      {activeTab === 'speaking' && (
                        <div className="tab-pane fade show active">
                          <div className="card border-0 shadow-sm">
                            <div className="card-header bg-danger text-white d-flex justify-content-between align-items-center">
                              <h5 className="card-title mb-0">
                                <i className="fas fa-microphone me-2"></i>
                                Speaking Section Review
                              </h5>
                              <div className="d-flex gap-2">
                                <button
                                  onClick={() => handleSectionComparison('speaking')}
                                  className="btn btn-light btn-sm"
                                  title="Detailed Comparison"
                                >
                                  <i className="fas fa-chart-bar me-1"></i>
                                  Compare
                                </button>
                                <button
                                  onClick={() => handleViewSectionExam('speaking')}
                                  className="btn btn-outline-light btn-sm"
                                  title="View Speaking Exam"
                                >
                                  <i className="fas fa-eye me-1"></i>
                                  View Exam
                                </button>
                              </div>
                            </div>
                            <div className="card-body">
                              {examData.speaking.answers && examData.speaking.answers.length > 0 ? (
                                <div className="accordion" id="speakingAccordion">
                                  {examData.speaking.answers.map((task, index) => (
                                    <div key={index} className="accordion-item mb-3">
                                      <h2 className="accordion-header">
                                        <button
                                          className="accordion-button"
                                          type="button"
                                          data-bs-toggle="collapse"
                                          data-bs-target={`#speakingTask${index}`}
                                        >
                                          <i className="fas fa-microphone me-2"></i>
                                          Speaking Task {index + 1}
                                        </button>
                                      </h2>
                                      <div
                                        id={`speakingTask${index}`}
                                        className="accordion-collapse collapse show"
                                      >
                                        <div className="accordion-body">
                                          <div className="mb-3">
                                            <h6><strong>Your Response:</strong></h6>
                                            <div className="bg-light p-3 rounded">
                                              <p className="mb-0">{task.answer_text || 'No response provided'}</p>
                                            </div>
                                          </div>
                                          {task.ai_assessment && (
                                            <div>
                                              <h6><strong>AI Assessment:</strong></h6>
                                              <div className="row">
                                                <div className="col-md-3">
                                                  <div className="card bg-light">
                                                    <div className="card-body text-center">
                                                      <h5 className="card-title text-danger">
                                                        {task.ai_assessment.fluency_coherence || 'N/A'}
                                                      </h5>
                                                      <p className="card-text small">Fluency</p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-3">
                                                  <div className="card bg-light">
                                                    <div className="card-body text-center">
                                                      <h5 className="card-title text-danger">
                                                        {task.ai_assessment.lexical_resource || 'N/A'}
                                                      </h5>
                                                      <p className="card-text small">Lexical Resource</p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-3">
                                                  <div className="card bg-light">
                                                    <div className="card-body text-center">
                                                      <h5 className="card-title text-danger">
                                                        {task.ai_assessment.grammatical_range || 'N/A'}
                                                      </h5>
                                                      <p className="card-text small">Grammar</p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-3">
                                                  <div className="card bg-light">
                                                    <div className="card-body text-center">
                                                      <h5 className="card-title text-danger">
                                                        {task.ai_assessment.pronunciation || 'N/A'}
                                                      </h5>
                                                      <p className="card-text small">Pronunciation</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              {task.ai_assessment.feedback && (
                                                <div className="mt-3">
                                                  <h6><strong>Detailed Feedback:</strong></h6>
                                                  <div className="alert alert-info">
                                                    {task.ai_assessment.feedback}
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-5">
                                  <i className="fas fa-microphone fa-3x text-muted mb-3"></i>
                                  <p className="text-muted">No speaking data available</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Score Card Sidebar */}
                <div className="col-xl-4 col-lg-4">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4 className="sidebar__title">Performance Overview</h4>
                    </div>
                    
                    {/* Overall Score Card */}
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-gradient-primary text-white">
                        <h5 className="card-title mb-0">
                          <i className="fas fa-award me-2"></i>
                          Overall Band Score
                        </h5>
                      </div>
                      <div className="card-body text-center">
                        <h1 className="display-4 text-primary mb-0">{examData.overall.band}</h1>
                        <p className="text-muted">
                          {examData.overall.completedSections}/{examData.overall.sections} sections completed
                        </p>
                      </div>
                    </div>
                    
                    {/* Module Scores */}
                    <div className="card border-0 shadow-sm">
                      <div className="card-header bg-light">
                        <h6 className="card-title mb-0">Module Breakdown</h6>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <span><i className="fas fa-book text-primary me-2"></i>Reading</span>
                            <span className="badge bg-primary">Band {examData.reading.stats.band}</span>
                          </div>
                          <small className="text-muted">
                            {examData.reading.stats.correct}/{examData.reading.studentAnswers.length} correct
                          </small>
                        </div>
                        
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <span><i className="fas fa-headphones text-success me-2"></i>Listening</span>
                            <span className="badge bg-success">Band {examData.listening.stats.band}</span>
                          </div>
                          <small className="text-muted">
                            {examData.listening.stats.correct}/{examData.listening.studentAnswers.length} correct
                          </small>
                        </div>
                        
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <span><i className="fas fa-edit text-warning me-2"></i>Writing</span>
                            <span className="badge bg-warning">Band {examData.writing.stats.band}</span>
                          </div>
                          <small className="text-muted">{examData.writing.stats.tasks} tasks completed</small>
                        </div>
                        
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span><i className="fas fa-microphone text-danger me-2"></i>Speaking</span>
                            <span className="badge bg-danger">Band {examData.speaking.stats.band}</span>
                          </div>
                          <small className="text-muted">{examData.speaking.stats.tasks} tasks completed</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modals */}
        {isExamPaperModalOpen && (
          <SmallModal
            isOpen={isExamPaperModalOpen}
            onClose={handleCloseExamPaper}
            size="xl"
            centered
            title="Full Length Test Paper"
            footer={
              <button className="btn btn-secondary" onClick={handleCloseExamPaper}>
                Close
              </button>
            }
          >
            <div className="container-fluid">
              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                <strong>Full Length Test Overview</strong>
                <p className="mt-2 mb-0">
                  This test includes all four IELTS modules: Reading, Listening, Writing, and Speaking.
                  Each section is designed to assess your English proficiency comprehensively.
                </p>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-header bg-primary text-white">
                      <i className="fas fa-book me-2"></i>
                      Reading Section
                    </div>
                    <div className="card-body">
                      <p>Questions: {examData.reading.studentAnswers.length}</p>
                      <p>Band Score: {examData.reading.stats.band}</p>
                      <p>Correct: {examData.reading.stats.correct}/{examData.reading.studentAnswers.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-header bg-success text-white">
                      <i className="fas fa-headphones me-2"></i>
                      Listening Section
                    </div>
                    <div className="card-body">
                      <p>Questions: {examData.listening.studentAnswers.length}</p>
                      <p>Band Score: {examData.listening.stats.band}</p>
                      <p>Correct: {examData.listening.stats.correct}/{examData.listening.studentAnswers.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-header bg-warning text-white">
                      <i className="fas fa-edit me-2"></i>
                      Writing Section
                    </div>
                    <div className="card-body">
                      <p>Tasks: {examData.writing.stats.tasks}</p>
                      <p>Band Score: {examData.writing.stats.band}</p>
                      <p>Assessment: AI Evaluated</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-header bg-danger text-white">
                      <i className="fas fa-microphone me-2"></i>
                      Speaking Section
                    </div>
                    <div className="card-body">
                      <p>Tasks: {examData.speaking.stats.tasks}</p>
                      <p>Band Score: {examData.speaking.stats.band}</p>
                      <p>Assessment: AI Evaluated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SmallModal>
        )}

        {/* Section Exam Modal */}
        {isSectionExamModalOpen && selectedSectionExam && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i className={`fas ${
                      selectedSectionExam === 'reading' ? 'fa-book-open' :
                      selectedSectionExam === 'listening' ? 'fa-headphones' :
                      selectedSectionExam === 'writing' ? 'fa-edit' :
                      'fa-microphone'
                    } me-2`}></i>
                    {selectedSectionExam.charAt(0).toUpperCase() + selectedSectionExam.slice(1)} Section Exam
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseSectionExam}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    Viewing {selectedSectionExam} section exam paper
                  </div>
                  

                  
                  {selectedSectionExam === 'reading' && examData.reading.questions && examData.reading.questions.length > 0 && (
                    <div>
                      {examData.reading.questions.map((exam, index) => (
                        <div key={index} className="mb-4">
                          <div className="alert alert-primary">
                            <h5 className="mb-0">
                              <i className="fas fa-book me-2"></i>
                              {exam.name || `Reading Section ${index + 1}`}
                            </h5>
                          </div>
                          
                          {/* Two-column layout like mini test and practice test */}
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
                              {exam.passage_image && (
                                <div className="mb-4 text-center">
                                  <img
                                    src={exam.passage_image}
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
                              {exam.passage && (
                                <div
                                  style={{
                                    backgroundColor: "white",
                                    padding: "15px",
                                    borderRadius: "5px",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    lineHeight: "1.6",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: exam.passage,
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
                              {exam.question && (
                                <div
                                  style={{
                                    backgroundColor: "white",
                                    padding: "15px",
                                    borderRadius: "5px",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    lineHeight: "1.6",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: exam.question,
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedSectionExam === 'listening' && examData.listening.questions && examData.listening.questions.length > 0 && (
                    <div>
                      {examData.listening.questions.map((exam, index) => (
                        <div key={index} className="mb-4">
                          <div className="alert alert-success">
                            <h5 className="mb-0">
                              <i className="fas fa-headphones me-2"></i>
                              {exam.name || `Listening Section ${index + 1}`}
                            </h5>
                          </div>
                          
                          {/* Audio control at the top */}
                          {exam.audio_file && (
                            <div className="mb-4 text-center bg-light p-3 rounded">
                              <h6 className="text-success mb-3">
                                <i className="fas fa-volume-up me-2"></i>
                                Audio File
                              </h6>
                              <audio controls className="w-100" style={{ maxWidth: "500px" }}>
                                <source src={exam.audio_file} type="audio/mpeg" />
                                <source src={exam.audio_file} type="audio/wav" />
                                Your browser does not support the audio element.
                              </audio>
                            </div>
                          )}
                          
                          {/* Two-column layout for passage and questions */}
                          <div className="row">
                            <div 
                              className="col-md-6"
                              style={{
                                maxHeight: "60vh",
                                overflowY: "auto",
                                padding: "20px",
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              <div className="mb-3">
                                <h5 className="text-success mb-3">
                                  <i className="fas fa-file-text me-2"></i>
                                  Listening Text
                                </h5>
                              </div>
                              {exam.passage && (
                                <div
                                  style={{
                                    backgroundColor: "white",
                                    padding: "15px",
                                    borderRadius: "5px",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    lineHeight: "1.6",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: exam.passage,
                                  }}
                                />
                              )}
                            </div>
                            <div
                              className="col-md-6"
                              style={{
                                maxHeight: "60vh",
                                overflowY: "auto",
                                padding: "20px",
                                backgroundColor: "#f9f9f9",
                              }}
                            >
                              <div className="mb-3">
                                <h5 className="text-primary mb-3">
                                  <i className="fas fa-question-circle me-2"></i>
                                  Listening Questions
                                </h5>
                              </div>
                              {exam.question && (
                                <div
                                  style={{
                                    backgroundColor: "white",
                                    padding: "15px",
                                    borderRadius: "5px",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    lineHeight: "1.6",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: exam.question,
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedSectionExam === 'writing' && examData.writing.questions && examData.writing.questions.length > 0 && (
                    <div>
                      {examData.writing.questions.map((task, index) => (
                        <div key={index} className="mb-4">
                          <div className="alert alert-warning">
                            <h5 className="mb-0">
                              <i className="fas fa-edit me-2"></i>
                              {task.name || `Writing Task ${index + 1}`}
                            </h5>
                          </div>
                          
                          {/* Single column layout for writing tasks */}
                          <div 
                            className="card"
                            style={{
                              backgroundColor: "#f9f9f9",
                              border: "none",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                            }}
                          >
                            <div className="card-body p-4">
                              <div className="mb-4">
                                <h5 className="text-warning mb-3">
                                  <i className="fas fa-tasks me-2"></i>
                                  Writing Task Instructions
                                </h5>
                                {task.prompt && (
                                  <div
                                    style={{
                                      backgroundColor: "white",
                                      padding: "20px",
                                      borderRadius: "5px",
                                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                      lineHeight: "1.8",
                                      fontSize: "16px",
                                      border: "2px solid #ffc107"
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: task.prompt,
                                    }}
                                  />
                                )}
                              </div>
                              
                              {task.requirements && task.requirements.length > 0 && (
                                <div className="mt-4">
                                  <h6 className="text-warning mb-3">
                                    <i className="fas fa-clipboard-list me-2"></i>
                                    Additional Requirements:
                                  </h6>
                                  <div 
                                    className="bg-white p-3 rounded"
                                    style={{ border: "1px solid #ffc107" }}
                                  >
                                    <ul className="mb-0" style={{ paddingLeft: "20px" }}>
                                      {task.requirements.map((req, reqIndex) => (
                                        <li key={reqIndex} className="mb-2">
                                          <i className="fas fa-check-circle text-success me-2"></i>
                                          {req}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedSectionExam === 'speaking' && examData.speaking.questions && examData.speaking.questions.length > 0 && (
                    <div>
                      {examData.speaking.questions.map((part, index) => (
                        <div key={index} className="mb-4">
                          <div className="alert alert-danger text-white">
                            <h5 className="mb-0">
                              <i className="fas fa-microphone me-2"></i>
                              {part.name || `Speaking Part ${index + 1}`}
                            </h5>
                          </div>
                          
                          {/* Single column layout for speaking parts */}
                          <div 
                            className="card"
                            style={{
                              backgroundColor: "#f9f9f9",
                              border: "none",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                            }}
                          >
                            <div className="card-body p-4">
                              {part.instructions && (
                                <div className="mb-4">
                                  <h5 className="text-danger mb-3">
                                    <i className="fas fa-info-circle me-2"></i>
                                    Speaking Instructions
                                  </h5>
                                  <div
                                    style={{
                                      backgroundColor: "white",
                                      padding: "20px",
                                      borderRadius: "5px",
                                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                      lineHeight: "1.8",
                                      fontSize: "16px",
                                      border: "2px solid #dc3545"
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html: part.instructions,
                                    }}
                                  />
                                </div>
                              )}
                              
                              {part.questions && part.questions.length > 0 && (
                                <div className="mt-4">
                                  <h5 className="text-danger mb-3">
                                    <i className="fas fa-comments me-2"></i>
                                    Speaking Questions
                                  </h5>
                                  <div className="row">
                                    {part.questions.map((q, qIndex) => (
                                      <div key={qIndex} className="col-12 mb-3">
                                        <div 
                                          className="bg-white p-3 rounded"
                                          style={{ 
                                            border: "1px solid #dc3545",
                                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                                          }}
                                        >
                                          <div className="d-flex align-items-start">
                                            <span className="badge bg-danger me-3 mt-1">
                                              Q{qIndex + 1}
                                            </span>
                                            <div className="flex-grow-1">
                                              <p className="mb-0" style={{ lineHeight: "1.6" }}>
                                                {q.question || q}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Fallback: Show answer data if questions not available */}
                  {selectedSectionExam && 
                   (!examData[selectedSectionExam]?.questions || 
                    examData[selectedSectionExam]?.questions.length === 0) && (
                    <div>
                      <div className="alert alert-info">
                        <i className="fas fa-info-circle me-2"></i>
                        Original exam questions are not available. Showing answer analysis instead.
                      </div>
                      
                      {(selectedSectionExam === 'reading' || selectedSectionExam === 'listening') && (
                        <div className="card">
                          <div className="card-header bg-secondary text-white">
                            <h6 className="card-title mb-0">
                              <i className="fas fa-list me-2"></i>
                              {selectedSectionExam.charAt(0).toUpperCase() + selectedSectionExam.slice(1)} Answers Summary
                            </h6>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                  <tr>
                                    <th>Question #</th>
                                    <th>Your Answer</th>
                                    <th>Correct Answer</th>
                                    <th>Result</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {examData[selectedSectionExam]?.studentAnswers?.map((studentAnswer, index) => {
                                    const correctAnswer = examData[selectedSectionExam]?.correctAnswers?.[index];
                                    const correctAnswerText = correctAnswer?.answer_text?.trim() || '';
                                    const studentAnswerText = studentAnswer?.answer_text?.trim() || '';
                                    
                                    let isCorrect = false;
                                    if (correctAnswerText && studentAnswerText) {
                                      if (correctAnswerText.includes(' OR ')) {
                                        const correctOptions = correctAnswerText.split(' OR ').map(opt => opt.trim().toLowerCase());
                                        isCorrect = correctOptions.includes(studentAnswerText.toLowerCase());
                                      } else if (correctAnswerText.includes(' AND ')) {
                                        const correctOptions = correctAnswerText.split(' AND ').map(opt => opt.trim().toLowerCase());
                                        isCorrect = correctOptions.every(opt => studentAnswerText.toLowerCase().includes(opt));
                                      } else {
                                        isCorrect = correctAnswerText.toLowerCase() === studentAnswerText.toLowerCase();
                                      }
                                    }
                                    
                                    return (
                                      <tr key={index}>
                                        <td><strong>Q{studentAnswer?.question_number || index + 1}</strong></td>
                                        <td>{studentAnswer?.answer_text || 'Not answered'}</td>
                                        <td className="text-success">
                                          {correctAnswer?.answer_text || 'N/A'}
                                        </td>
                                        <td>
                                          {isCorrect ? (
                                            <span className="badge bg-success">
                                              <i className="fas fa-check me-1"></i>Correct
                                            </span>
                                          ) : studentAnswerText ? (
                                            <span className="badge bg-danger">
                                              <i className="fas fa-times me-1"></i>Incorrect
                                            </span>
                                          ) : (
                                            <span className="badge bg-warning">
                                              <i className="fas fa-minus me-1"></i>Skipped
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {(selectedSectionExam === 'writing' || selectedSectionExam === 'speaking') && (
                        <div className="card">
                          <div className="card-header bg-secondary text-white">
                            <h6 className="card-title mb-0">
                              <i className="fas fa-comments me-2"></i>
                              {selectedSectionExam.charAt(0).toUpperCase() + selectedSectionExam.slice(1)} Assessment
                            </h6>
                          </div>
                          <div className="card-body">
                            {examData[selectedSectionExam]?.answers?.length > 0 ? (
                              examData[selectedSectionExam].answers.map((answer, index) => (
                                <div key={index} className="card mb-3">
                                  <div className="card-body">
                                    <h6 className="card-title">
                                      {selectedSectionExam.charAt(0).toUpperCase() + selectedSectionExam.slice(1)} Task {index + 1}
                                    </h6>
                                    {answer.ai_assessment && (
                                      <div className="mt-3">
                                        <h6 className="text-primary">AI Assessment:</h6>
                                        <div className="bg-light p-3 rounded">
                                          {answer.ai_assessment.feedback || answer.ai_assessment}
                                        </div>
                                        {answer.ai_assessment.overall_band && (
                                          <div className="mt-2">
                                            <span className="badge bg-primary">
                                              Band Score: {answer.ai_assessment.overall_band}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="alert alert-warning">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                No {selectedSectionExam} answers available.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseSectionExam}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  <h4 className="comparison-modal-title">
                    <BarChart3 size={24} className="me-2" />
                    Full Length Test Analysis
                  </h4>
                  <button
                    onClick={handleCloseComparison}
                    className="comparison-modal-close"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="comparison-modal-body">
                  <ComparisonView
                    questions={getComparisonQuestions()}
                    stats={getExportData().stats}
                    onQuestionChange={handleQuestionChange}
                    currentQuestion={currentQuestionIndex}
                    onViewExamPaper={handleViewExamPaper}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default FullLengthTestAnswer;
