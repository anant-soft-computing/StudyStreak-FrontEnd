import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import ajaxCall from "../../../helpers/ajaxCall";
import AnswerCard from "../AnswerCard";
import ScoreCard from "../ScoreCard/ScoreCard";
import WritingAnswerTable from "../AnswerTable/WritingAnswerTable";
import readingBandValues from "../../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../../utils/bandValues/listeningBandValues";
import SmallModal from "../../UI/Modal";
import SkipIcon from "../../UI/SkipIcon";
import CheckIcon from "../../UI/CheckIcon";
import CancelIcon from "../../UI/CancelIcon";
// Enhanced UI Components
import SkeletonLoader from "../../UI/SkeletonLoader";
import ErrorBoundary from "../../UI/ErrorBoundary";
import ErrorDisplay from "../../UI/ErrorDisplay";
import ExportFeatures from "../../UI/ExportFeatures";
import ComparisonView from "../../UI/ComparisonView";
import "../../UI/ComparisonModal.css";
import { Eye, BarChart3, X } from "lucide-react";

const PracticeTestAnswer = () => {
  const { examId, examType } = useParams();
  const [band, setBand] = useState(0);
  const [examName, setExamName] = useState("");
  const [activeTab, setActiveTab] = useState("block-0");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examPaperData, setExamPaperData] = useState(null);
  const [writingAnswers, setWritingAnswers] = useState([]);

  // Store answers by block
  const [blocksData, setBlocksData] = useState([]);
  const [overallStats, setOverallStats] = useState({
    skipCount: 0,
    correctCount: 0,
    incorrectCount: 0,
  });

  // Enhanced state management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [showComparisonView, setShowComparisonView] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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

  // Handle ESC key to close modal and manage body scroll
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showComparisonView) {
        setShowComparisonView(false);
      }
    };

    if (showComparisonView) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [showComparisonView]);

  // Helper function to extract individual questions from exam paper HTML
  const extractQuestionsFromHTML = (htmlContent) => {
    if (!htmlContent) return [];
    
    try {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      
      const questions = [];
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

  // Prepare comparison data for all blocks
  const getComparisonQuestions = () => {
    const allQuestions = [];
    
    blocksData.forEach((block, blockIndex) => {
      block.correctAnswers.forEach((correctAnswer, questionIndex) => {
        const studentAnswer = block.studentAnswers[questionIndex];
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

        allQuestions.push({
          questionNumber: allQuestions.length + 1,
          blockName: block.blockName,
          blockIndex: blockIndex,
          question: `${block.blockName} - Question ${questionIndex + 1}`,
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
    });
    
    return allQuestions;
  };

  // Prepare export data
  const getExportData = () => {
    const allQuestions = getComparisonQuestions();
    
    return {
      stats: {
        totalQuestions: allQuestions.length,
        correctAnswers: overallStats.correctCount,
        incorrectAnswers: overallStats.incorrectCount,
        skippedAnswers: overallStats.skipCount,
        accuracy: overallStats.correctCount > 0 ? 
          ((overallStats.correctCount / allQuestions.length) * 100).toFixed(2) : 0,
        totalScore: overallStats.correctCount,
        maxScore: allQuestions.length,
        band: band,
        timeTaken: 'N/A',
      },
      questions: allQuestions,
      blocks: blocksData.map(block => ({
        name: block.blockName,
        correct: block.stats.correct,
        total: block.stats.total,
        percentage: block.stats.percentage
      }))
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await ajaxCall(
          `/practice-answers/${examId}/`,
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
          const data = response.data;
          setExamName(data?.name);

          if (examType === "Writing") {
            const studentAnswers = data?.student_answers?.Writing || [];
            const totalBand = studentAnswers.reduce((sum, item) => {
              return sum + (item.band !== null ? parseFloat(item.band) : 0);
            }, 0);
            setBand(totalBand / studentAnswers.length || 0);
            setWritingAnswers(studentAnswers);
            return;
          }

          // Process Reading/Listening answers
          const studentAnswersByType = data?.student_answers?.[examType] || [];
          const correctAnswersByType = data?.correct_answers?.[examType] || [];

          const blocks = [];
          let totalCorrect = 0;
          let totalIncorrect = 0;
          let totalSkipped = 0;

          // Match student answers with correct answers by block_id
          correctAnswersByType.forEach((correctBlock, index) => {
            const studentBlock = studentAnswersByType.find(
              (block) => block.block_id === correctBlock.block_id
            ) || { answers: [] };

            const correctAnswers = correctBlock.answers.sort(
              (a, b) => a.question_number - b.question_number
            );
            const studentAnswers = studentBlock.answers.sort(
              (a, b) => a.question_number - b.question_number
            );

            let correct = 0;
            let incorrect = 0;
            let skipped = 0;

            // Calculate stats for this block
            studentAnswers.forEach((item, idx) => {
              const correctAnswer = correctAnswers[idx]?.answer_text?.trim();
              const studentAnswer = item.answer_text?.trim();

              if (!studentAnswer) {
                skipped++;
              } else if (correctAnswer?.includes(" OR ")) {
                const options = correctAnswer
                  .split(" OR ")
                  .map((o) => o.trim());
                options.includes(studentAnswer) ? correct++ : incorrect++;
              } else if (correctAnswer?.includes(" AND ")) {
                const options = correctAnswer
                  .split(" AND ")
                  .map((o) => o.trim());
                options.every((o) => studentAnswer.includes(o))
                  ? correct++
                  : incorrect++;
              } else {
                correctAnswer === studentAnswer ? correct++ : incorrect++;
              }
            });

            totalCorrect += correct;
            totalIncorrect += incorrect;
            totalSkipped += skipped;

            blocks.push({
              blockId: correctBlock.block_id,
              blockName: `Section ${index + 1}`,
              correctAnswers,
              studentAnswers,
              stats: {
                correct,
                incorrect,
                skipped,
                total: correctAnswers.length,
                percentage: ((correct / correctAnswers.length) * 100).toFixed(
                  2
                ),
              },
            });
          });

          setBlocksData(blocks);
          setOverallStats({
            skipCount: totalSkipped,
            correctCount: totalCorrect,
            incorrectCount: totalIncorrect,
          });

          // Calculate overall band score
          if (examType === "Reading") {
            setBand(readingBandValues[totalCorrect]);
          } else if (examType === "Listening") {
            setBand(listeningBandValues[totalCorrect]);
          }
        } else {
          throw new Error(`Failed to load practice test data: ${response.statusText || 'Unknown error'}`);
        }
      } catch (error) {
        console.error("Practice test data fetch error:", error);
        setError({
          type: 'api',
          message: error.message || 'Failed to load practice test results',
          details: error
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [examType, examId, retryCount]);

  const fetchExamPaper = async (blockId) => {
    try {
      const response = await ajaxCall(
        `/exam/block/${blockId}/`,
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
        setExamPaperData(response.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleBlockSelect = async (blockId) => {
    await fetchExamPaper(blockId);
    handleViewExam();
  };

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
                    title="Failed to Load Practice Test Results"
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
      <div className="body__wrapper practice-test-results-container">
        <div className="main_wrapper overflow-hidden">
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8 AnswerCard">
                  <div className="blog__details__content__wraper">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h4 className="sidebar__title">Solution For: {examName}</h4>
                      <div className="d-flex gap-2">
                        <button
                          onClick={handleShowComparison}
                          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                        >
                          <Eye size={16} />
                          Detailed Comparison
                        </button>
                      </div>
                    </div>

                    {/* Export Features - Added for practice tests */}
                    <div className="mb-4">
                      <ExportFeatures
                        data={getExportData()}
                        examTitle={examName}
                        studentName="Student"
                        examDate={new Date().toLocaleDateString()}
                      />
                    </div>
                  {examType === "Writing" ? (
                    <>
                      <h4 className="sidebar__title">Band: {band}</h4>
                      <WritingAnswerTable data={writingAnswers} />
                    </>
                  ) : (
                    <>
                      <AnswerCard
                        band={band}
                        skipCount={overallStats.skipCount}
                        correctCount={overallStats.correctCount}
                        incorrectCount={overallStats.incorrectCount}
                      />
                      <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="mt-4 mb-3"
                        id="exam-blocks-tabs"
                      >
                        {blocksData.map((block, index) => (
                          <Tab
                            key={`block-${index}`}
                            eventKey={`block-${index}`}
                            title={block.blockName}
                          >
                            <div className="mt-4">
                              <h5 className="sidebar__title">
                                {block.blockName} - Score: {block.stats.correct}
                                /{block.stats.total} ({block.stats.percentage}%)
                              </h5>
                              <div className="writing__exam">
                                <div className="dashboard__section__title">
                                  <h4 className="sidebar__title">
                                    Answer Table
                                  </h4>
                                  <button
                                    className="take-test"
                                    onClick={() =>
                                      handleBlockSelect(
                                        blocksData[activeTab.split("-")[1]]
                                          ?.blockId
                                      )
                                    }
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
                                          {block?.correctAnswers?.map(
                                            ({ id, answer_text }, index) => {
                                              let icon;
                                              const studentAnswerText =
                                                block?.studentAnswers?.[
                                                  index
                                                ]?.answer_text?.trim();
                                              const correctAnswerText =
                                                answer_text?.trim();

                                              if (!studentAnswerText) {
                                                icon = <SkipIcon />;
                                              } else if (
                                                correctAnswerText?.includes(
                                                  " OR "
                                                )
                                              ) {
                                                const correctOptions =
                                                  correctAnswerText
                                                    .split(" OR ")
                                                    .map((option) =>
                                                      option
                                                        .trim()
                                                        .toLowerCase()
                                                    );
                                                icon = correctOptions.includes(
                                                  studentAnswerText.toLowerCase()
                                                ) ? (
                                                  <CheckIcon />
                                                ) : (
                                                  <CancelIcon />
                                                );
                                              } else if (
                                                correctAnswerText?.includes(
                                                  " AND "
                                                )
                                              ) {
                                                const correctOptions =
                                                  correctAnswerText
                                                    .split(" AND ")
                                                    .map((option) =>
                                                      option
                                                        .trim()
                                                        .toLowerCase()
                                                    );
                                                icon = correctOptions.every(
                                                  (option) =>
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
                                                  <td className="text-dark">
                                                    {icon}
                                                  </td>
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
                            </div>
                          </Tab>
                        ))}
                      </Tabs>
                    </>
                  )}
                </div>
              </div>
              <ScoreCard />
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
          {examType === "Reading" ? (
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
                {examPaperData?.question_other && (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: examPaperData?.question_other,
                    }}
                  />
                )}
              </div>
            </div>
          ) : (
            <div style={{ padding: "10px" }}>
              {examPaperData?.audio && (
                <div className="mb-4 text-center">
                  <audio
                    controls
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      margin: "0 auto",
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
                {examPaperData?.question_other && (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: examPaperData?.question_other,
                    }}
                  />
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
                <h5 className="modal-title mb-0">Detailed Answer Comparison - {examName}</h5>
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
                  examTitle={examName}
                  onViewExamPaper={handleViewExam}
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

export default PracticeTestAnswer;
