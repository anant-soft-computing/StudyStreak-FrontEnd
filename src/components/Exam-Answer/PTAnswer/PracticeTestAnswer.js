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
  const [currentBlockInfo, setCurrentBlockInfo] = useState(null); // Store current block info for modal
  const [examStructure, setExamStructure] = useState(null); // Store full exam structure
  const [blockToSectionMap, setBlockToSectionMap] = useState({}); // Map block IDs to section data

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
    setCurrentBlockInfo(null); // Clear block info when closing
  };

  // Helper function to process question HTML for the specific block
  const processQuestionsForBlock = (questionHTML, blockInfo) => {
    if (!questionHTML || !blockInfo) return questionHTML;
    
    try {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = questionHTML;
      
      // Log the original HTML structure
      console.log('📝 Processing questions for block:', {
        blockName: blockInfo.blockName,
        questionRange: `${blockInfo.studentAnswers?.[0]?.question_number || 1} - ${blockInfo.studentAnswers?.[blockInfo.studentAnswers?.length - 1]?.question_number || blockInfo.stats?.total}`,
        htmlLength: questionHTML.length
      });
      
      // Return the original HTML for now - the backend should ideally return only the relevant questions
      return questionHTML;
    } catch (error) {
      console.error('Error processing questions:', error);
      return questionHTML;
    }
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
            
            // Helper function to extract band score from AI assessment if not in band field
            const extractBandFromAssessment = (aiAssessment) => {
              if (!aiAssessment) return null;
              
              // Try to find #Band: X.X pattern
              const bandMatch = aiAssessment.match(/#Band:\s*([\d.]+)/i);
              if (bandMatch) {
                return parseFloat(bandMatch[1]);
              }
              
              // Try to find overall band in different formats
              const overallMatch = aiAssessment.match(/overall.*?band.*?:?\s*([\d.]+)/i);
              if (overallMatch) {
                return parseFloat(overallMatch[1]);
              }
              
              return null;
            };
            
            // Process each answer and extract band scores
            const bandsWithSources = studentAnswers.map((item, index) => {
              let bandScore = null;
              let source = 'none';
              
              // First try the band field
              if (item.band !== null && item.band !== undefined && item.band !== '') {
                bandScore = parseFloat(item.band);
                source = 'band_field';
              } 
              // If no band field, try to extract from AI assessment
              else if (item.ai_assessment) {
                bandScore = extractBandFromAssessment(item.ai_assessment);
                source = 'ai_assessment';
              }
              
              return {
                index: index + 1,
                bandScore,
                source,
                hasBand: bandScore !== null && !isNaN(bandScore)
              };
            });
            
            // Filter only items with valid band scores
            const validBands = bandsWithSources.filter(item => item.hasBand);
            
            const totalBand = validBands.reduce((sum, item) => {
              return sum + item.bandScore;
            }, 0);
            
            const avgBand = validBands.length > 0 ? totalBand / validBands.length : 0;
            
            // Round to nearest 0.5 for IELTS band score
            const roundedBand = Math.round(avgBand * 2) / 2;
            
            console.log('Writing Band Calculation:', {
              totalAnswers: studentAnswers.length,
              bandsWithSources,
              validBands,
              totalBand,
              avgBand,
              roundedBand
            });
            
            setBand(roundedBand);
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
                percentage: ((correct / correctAnswers.length) * 100).toFixed(
                  2
                ),
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
          hasAudio: !!response.data?.audio,
          passageLength: response.data?.passage?.length || 0,
          questionLength: response.data?.question_other?.length || 0,
          dataKeys: Object.keys(response.data || {})
        });
        console.log('📄 Full exam paper data:', response.data);
        setExamPaperData(response.data);
      }
    } catch (error) {
      console.error("❌ Error fetching exam paper:", error);
    }
  };

  const handleBlockSelect = async (blockId) => {
    const selectedBlock = blocksData.find(b => b.blockId === blockId);
    console.log('🎯 Selected block for viewing:', {
      blockId,
      blockName: selectedBlock?.blockName,
      questionRange: `Q${selectedBlock?.studentAnswers?.[0]?.question_number || 1} - Q${selectedBlock?.studentAnswers?.[selectedBlock?.studentAnswers?.length - 1]?.question_number || selectedBlock?.stats?.total || '?'}`,
      expectedBlock: selectedBlock
    });
    setCurrentBlockInfo(selectedBlock); // Store for use in modal
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
                      <h4 className="sidebar__title">Overall Band Score: {band.toFixed(1)}</h4>
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
                                      handleBlockSelect(block.blockId)
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
        title={currentBlockInfo?.blockName || examPaperData?.exam_name || "Exam Review"}
        footer={
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        }
      >
        <div className="container-fluid">
          {/* Block Information Banner */}
          {(currentBlockInfo || examPaperData) && (
            <div className="alert alert-info mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-info-circle me-2"></i>
                  <strong>{currentBlockInfo?.blockName || examPaperData?.exam_name}</strong>
                  {currentBlockInfo && (
                    <span className="ms-2">
                      - Questions {currentBlockInfo.studentAnswers?.[0]?.question_number || 1} to {currentBlockInfo.studentAnswers?.[currentBlockInfo.studentAnswers?.length - 1]?.question_number || currentBlockInfo.stats?.total}
                    </span>
                  )}
                </div>
                <div>
                  {currentBlockInfo && (
                    <span className="badge bg-primary">
                      {currentBlockInfo.stats?.total} Questions
                    </span>
                  )}
                  {(examPaperData?.id || currentBlockInfo?.blockId) && (
                    <span className="badge bg-success ms-2">
                      Section ID: {currentBlockInfo?.blockId || examPaperData?.id}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
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
                  <div>
                    {currentBlockInfo?.blockName && (
                      <div className="alert alert-success mb-3">
                        <i className="fas fa-check-circle me-2"></i>
                        <strong>Displaying:</strong> {currentBlockInfo.blockName} - This section contains only the questions for this specific part.
                      </div>
                    )}
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "15px",
                        borderRadius: "5px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: processQuestionsForBlock(examPaperData?.question_other, currentBlockInfo),
                      }}
                    />
                  </div>
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
                  <div>
                    {examPaperData?.exam_name && (
                      <div className="alert alert-success mb-3">
                        <i className="fas fa-check-circle me-2"></i>
                        <strong>Displaying:</strong> {examPaperData.exam_name} - This section contains only the questions for this specific part.
                      </div>
                    )}
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "15px",
                        borderRadius: "5px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: processQuestionsForBlock(examPaperData?.question_other, currentBlockInfo),
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
