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
import { Eye, BarChart3, X, BookOpen, Headphones, PenTool, Mic } from "lucide-react";

const EnhancedPracticeTestAnswer = () => {
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
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [examStructure, setExamStructure] = useState(null); // Store full exam structure
  const [blockToSectionMap, setBlockToSectionMap] = useState({}); // Map block IDs to section data

  // Handle ESC key to close modal and manage body scroll
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        if (showComparisonView) {
          setShowComparisonView(false);
        } else if (isModalOpen) {
          setIsModalOpen(false);
        }
      }
    };

    if (showComparisonView || isModalOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [showComparisonView, isModalOpen]);

  // Enhanced handler functions
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleViewExam = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleShowComparison = (blockIndex = 0) => {
    setCurrentBlockIndex(blockIndex);
    setCurrentQuestionIndex(0);
    setShowComparisonView(true);
  };

  const handleCloseComparison = () => {
    setShowComparisonView(false);
  };

  const handleQuestionChange = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Get module-specific icon
  const getModuleIcon = () => {
    switch (examType) {
      case 'Reading': return <BookOpen size={20} />;
      case 'Listening': return <Headphones size={20} />;
      case 'Writing': return <PenTool size={20} />;
      case 'Speaking': return <Mic size={20} />;
      default: return <BarChart3 size={20} />;
    }
  };

  // Get module-specific title
  const getModuleTitle = () => {
    return `${examType} Practice Test Results`;
  };

  // Prepare comparison data for current block
  const getComparisonQuestions = () => {
    if (!blocksData || blocksData.length === 0) return [];
    
    const currentBlock = blocksData[currentBlockIndex];
    if (!currentBlock) return [];

    return currentBlock.correctAnswers.map((correctAnswer, index) => {
      const studentAnswer = currentBlock.studentAnswers[index];
      const studentAnswerText = studentAnswer?.answer_text?.trim() || 'No answer provided';
      const correctAnswerText = correctAnswer?.answer_text?.trim() || 'No correct answer available';
      
      // Determine if answer is correct based on the same logic
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

      return {
        questionNumber: correctAnswer.question_number || (index + 1),
        question: correctAnswer?.question_text || 
                 correctAnswer?.question || 
                 `Question ${correctAnswer.question_number || (index + 1)} - Please check the exam paper for details`,
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
    const currentBlock = blocksData[currentBlockIndex] || {};
    const stats = currentBlock.stats || {};
    
    return {
      stats: {
        totalQuestions: stats.total || 0,
        correctAnswers: stats.correct || 0,
        incorrectAnswers: stats.incorrect || 0,
        skippedAnswers: stats.skipped || 0,
        accuracy: parseFloat(stats.percentage) || 0,
        totalScore: stats.correct || 0,
        maxScore: stats.total || 0,
        band: band,
        timeTaken: 'N/A', // Can be added if available in data
      },
      questions: getComparisonQuestions()
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, fetch the full practice test structure to get the correct section order
        const structureResponse = await ajaxCall(
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

        let sectionOrder = [];
        if (structureResponse.status === 200) {
          const structureData = structureResponse.data;
          setExamStructure(structureData);
          
          // Get the sections in the correct order from the structure
          const sections = structureData?.IELTS?.[examType] || [];
          
          // Sort sections by exam_name to maintain proper order
          sectionOrder = [...sections].sort((a, b) => {
            const extractSortKey = (name) => {
              if (!name) return 0;
              
              // Extract the last part of the name for sorting (e.g., "2.1", "2.2", "2.3")
              const parts = name.trim().split(" ");
              const lastPart = parts[parts.length - 1];
              
              // Try to match decimal pattern (e.g., "2.1", "10.3")
              const decimalMatch = lastPart.match(/^(\d+)\.(\d+)$/);
              if (decimalMatch) {
                const major = parseInt(decimalMatch[1]);
                const minor = parseInt(decimalMatch[2]);
                return major * 1000 + minor;
              }
              
              // Try to match simple number pattern (e.g., "1", "2", "10")
              const numberMatch = lastPart.match(/^(\d+)$/);
              if (numberMatch) {
                return parseInt(numberMatch[1]) * 1000;
              }
              
              // Fallback: try to extract any number from the entire name
              const anyNumberMatch = name.match(/(\d+)/);
              if (anyNumberMatch) {
                return parseInt(anyNumberMatch[1]) * 1000;
              }
              
              return 0;
            };
            
            const keyA = extractSortKey(a.exam_name);
            const keyB = extractSortKey(b.exam_name);
            
            console.log(`Comparing: "${a.exam_name}" (${keyA}) vs "${b.exam_name}" (${keyB})`);
            return keyA - keyB;
          });
          
          console.log('📋 Section order from structure (after sorting):', sectionOrder.map((s, idx) => ({
            index: idx,
            id: s.id,
            name: s.exam_name,
            blockId: s.id
          })));
        }
        
        // Now fetch the answers
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
            setLoading(false);
            return;
          }

          // Process Reading/Listening answers
          const studentAnswersByType = data?.student_answers?.[examType] || [];
          const correctAnswersByType = data?.correct_answers?.[examType] || [];

          const blocks = [];
          let totalCorrect = 0;
          let totalIncorrect = 0;
          let totalSkipped = 0;

          // Create a map of block_id to correct answers for easy lookup
          const correctAnswersMap = {};
          correctAnswersByType.forEach(correctBlock => {
            correctAnswersMap[correctBlock.block_id] = correctBlock;
          });

          // Process blocks in the order they appear in sectionOrder
          const blocksToProcess = sectionOrder.length > 0 
            ? sectionOrder.map(section => ({
                ...correctAnswersMap[section.id],
                sectionName: section.exam_name
              })).filter(b => b && b.block_id)
            : correctAnswersByType;

          blocksToProcess.forEach((correctBlock, index) => {
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

            const blockName = correctBlock.sectionName || `Section ${index + 1}`;
            console.log(`📦 Creating block ${index + 1}:`, {
              blockId: correctBlock.block_id,
              blockName: blockName,
              sectionName: correctBlock.sectionName,
              correct,
              total: correctAnswers.length
            });

            blocks.push({
              blockId: correctBlock.block_id,
              blockName: blockName,
              correctAnswers,
              studentAnswers,
              stats: {
                correct,
                incorrect,
                skipped,
                total: correctAnswers.length,
                percentage: ((correct / correctAnswers.length) * 100).toFixed(2),
              },
            });
          });

          setBlocksData(blocks);
          console.log('📚 Blocks data loaded in correct order:', blocks.map(b => ({
            blockId: b.blockId,
            blockName: b.blockName,
            totalQuestions: b.stats.total
          })));
          
          // Create block to section map for later use
          const blockMap = {};
          sectionOrder.forEach((section, index) => {
            blockMap[section.id] = section;
          });
          setBlockToSectionMap(blockMap);
          
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
          throw new Error(`Failed to load practice test results: ${response.statusText || 'Unknown error'}`);
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
      console.log('📂 Fetching exam paper for block:', blockId);
      
      // Check if we have the section mapped
      const mappedSection = blockToSectionMap[blockId];
      if (mappedSection) {
        console.log('✅ Using mapped section data:', {
          blockId,
          sectionId: mappedSection.id,
          sectionName: mappedSection.exam_name,
          hasPassage: !!mappedSection.passage,
          hasQuestion: !!mappedSection.question_other,
        });
        
        // Use the mapped section data directly
        setExamPaperData({
          passage: mappedSection.passage,
          question_other: mappedSection.question_other,
          passageImage: mappedSection.passage_image,
          audio: mappedSection.audio_file,
          exam_name: mappedSection.exam_name,
          id: mappedSection.id
        });
        return;
      }
      
      // Fallback to API call if no mapping exists
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
        console.log('✅ Exam paper data received from API:', {
          blockId,
          hasPassage: !!response.data?.passage,
          hasQuestion: !!response.data?.question_other,
        });
        setExamPaperData(response.data);
      }
    } catch (error) {
      console.error("❌ Exam paper fetch error:", error);
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
      <div className="body__wrapper exam-results-container">
        <div className="main_wrapper overflow-hidden">
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8 AnswerCard">
                  <div className="blog__details__content__wraper">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="sidebar__title d-flex align-items-center gap-2">
                        {getModuleIcon()}
                        {getModuleTitle()}: {examName}
                      </h4>
                      {blocksData.length > 0 && (
                        <button
                          onClick={() => handleShowComparison(0)}
                          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                        >
                          <Eye size={16} />
                          Detailed Analysis
                        </button>
                      )}
                    </div>

                    {examType === "Writing" ? (
                      <WritingAnswerTable writingAnswers={writingAnswers} />
                    ) : (
                      <Tabs
                        id="controlled-tabs"
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        className="mb-3 custom-tabs"
                      >
                        {blocksData.map((block, index) => (
                          <Tab
                            key={`block-${index}`}
                            eventKey={`block-${index}`}
                            title={
                              <span className="d-flex align-items-center gap-2">
                                {block.blockName}
                                <span className="badge bg-primary">
                                  {block.stats.correct}/{block.stats.total}
                                </span>
                              </span>
                            }
                          >
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h5 className="mb-0">{block.blockName} Results</h5>
                              <div className="d-flex gap-2">
                                <button
                                  onClick={() => handleBlockSelect(block.blockId)}
                                  className="btn btn-outline-secondary btn-sm"
                                >
                                  <Eye size={14} className="me-1" />
                                  View Questions
                                </button>
                                <button
                                  onClick={() => handleShowComparison(index)}
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  <BarChart3 size={14} className="me-1" />
                                  Compare Answers
                                </button>
                              </div>
                            </div>
                            
                            <AnswerCard
                              key={`answer-card-${index}`}
                              correctAnswers={block.correctAnswers}
                              studentAnswers={block.studentAnswers}
                              isReading={examType === "Reading"}
                              isListening={examType === "Listening"}
                            />
                          </Tab>
                        ))}
                      </Tabs>
                    )}
                  </div>
                </div>

                <div className="col-xl-4 col-lg-4">
                  <ScoreCard
                    band={band}
                    skipCount={overallStats.skipCount}
                    correctCount={overallStats.correctCount}
                    incorrectCount={overallStats.incorrectCount}
                    examType={examType}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Export Features */}
          <div className="container">
            <div className="row">
              <div className="col-12">
                <ExportFeatures
                  data={getExportData()}
                  examTitle={`${examType} Practice Test - ${examName}`}
                  studentName="Student"
                  examDate={new Date().toLocaleDateString()}
                />
              </div>
            </div>
          </div>

          {/* Exam Paper Modal */}
          <SmallModal
            size="lg"
            centered
            title="Practice Test Questions"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          >
            <div style={{ minHeight: "400px", maxHeight: "70vh" }}>
              {examPaperData?.passage && (
                <div
                  className="overflow-auto mb-4"
                  style={{
                    maxHeight: "40vh",
                    padding: "20px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
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
                </div>
              )}
              
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
                {examPaperData?.question && (
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "15px",
                      borderRadius: "5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: examPaperData?.question,
                    }}
                  />
                )}
              </div>
            </div>
          </SmallModal>

          {/* Comparison View Modal */}
          {showComparisonView && (
            <div className="comparison-modal-overlay" onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleCloseComparison();
              }
            }}>
              <div className="comparison-modal-dialog">
                <div className="comparison-modal-content">
                  <div className="comparison-modal-header">
                    <h5 className="modal-title mb-0">
                      {examType} Practice Test - Detailed Answer Analysis
                    </h5>
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
                      examTitle={`${examType} Practice Test - ${examName} - ${blocksData[currentBlockIndex]?.blockName || 'Section'}`}
                      onViewExamPaper={() => {
                        if (blocksData[currentBlockIndex]) {
                          handleBlockSelect(blocksData[currentBlockIndex].blockId);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default EnhancedPracticeTestAnswer;