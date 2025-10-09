import React, { useState } from 'react';
import { 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight, 
  Maximize2, 
  X,
  CheckCircle,
  XCircle,
  Clock,
  Target
} from 'lucide-react';
import './ComparisonView.css';

const ComparisonView = ({ 
  questions = [], 
  currentQuestionIndex = 0,
  onQuestionChange,
  examTitle = 'Exam Review',
  className = '',
  onViewExamPaper // New prop to handle viewing full exam paper
}) => {
  const [viewMode, setViewMode] = useState('side-by-side'); // 'side-by-side', 'overlay', 'sequential'
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(true);
  const [showUserAnswer, setShowUserAnswer] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(currentQuestionIndex);

  const currentQuestion = questions[selectedQuestion] || {};

  // Navigation handlers
  const handlePrevQuestion = () => {
    const newIndex = Math.max(0, selectedQuestion - 1);
    setSelectedQuestion(newIndex);
    onQuestionChange?.(newIndex);
  };

  const handleNextQuestion = () => {
    const newIndex = Math.min(questions.length - 1, selectedQuestion + 1);
    setSelectedQuestion(newIndex);
    onQuestionChange?.(newIndex);
  };

  const handleQuestionSelect = (index) => {
    setSelectedQuestion(index);
    onQuestionChange?.(index);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Get question statistics
  const getQuestionStats = () => {
    const total = questions.length;
    // For assessment type questions (Speaking/Writing), all are considered "completed"
    const hasAssessments = questions.some(q => q.answerType === "ASSESSMENT");
    
    if (hasAssessments) {
      return { total, correct: total, incorrect: 0, accuracy: 100, isAssessment: true };
    }
    
    const correct = questions.filter(q => q.isCorrect).length;
    const incorrect = total - correct;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    return { total, correct, incorrect, accuracy, isAssessment: false };
  };

  const stats = getQuestionStats();

  // Render question navigation
  const renderQuestionNavigation = () => (
    <div className="comparison-navigation">
      <div className="comparison-nav-header">
        <h4 className="comparison-nav-title">
          {stats.isAssessment ? "Assessment Overview" : "Questions Overview"}
        </h4>
        <div className="comparison-stats">
          {stats.isAssessment ? (
            <>
              <span className="stat-item">
                <Target size={14} className="text-blue-500" />
                Assessment Completed
              </span>
              <span className="stat-item">
                <CheckCircle size={14} className="text-green-500" />
                AI Feedback Available
              </span>
            </>
          ) : (
            <>
              <span className="stat-item">
                <CheckCircle size={14} className="text-green-500" />
                {stats.correct} Correct
              </span>
              <span className="stat-item">
                <XCircle size={14} className="text-red-500" />
                {stats.incorrect} Incorrect
              </span>
              <span className="stat-item">
                <Target size={14} className="text-blue-500" />
                {stats.accuracy}% Accuracy
              </span>
            </>
          )}
        </div>
      </div>
      
      <div className="comparison-nav-grid">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => handleQuestionSelect(index)}
            className={`comparison-nav-item ${
              index === selectedQuestion ? 'active' : ''
            } ${question.answerType === 'ASSESSMENT' ? 'assessment' : 
                 question.isCorrect ? 'correct' : 'incorrect'}`}
          >
            <span className="nav-item-number">{index + 1}</span>
            <span className="nav-item-status">
              {question.answerType === 'ASSESSMENT' ? (
                <Target size={12} />
              ) : question.isCorrect ? (
                <CheckCircle size={12} />
              ) : (
                <XCircle size={12} />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  // Render answer comparison
  const renderAnswerComparison = () => {
    const { 
      question, 
      userAnswer, 
      correctAnswer, 
      explanation, 
      isCorrect, 
      answerType,
      hasMultipleCorrectAnswers 
    } = currentQuestion;

    return (
      <div className="answer-comparison">
        {/* Question */}
        <div className="comparison-question">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <h3 className="comparison-question-title mb-0">
              Question {selectedQuestion + 1} of {questions.length}
            </h3>
            {hasMultipleCorrectAnswers && (
              <span className="badge bg-info">
                {answerType === 'OR' ? 'Multiple Valid Answers' : 'All Parts Required'}
              </span>
            )}
          </div>
          
          <div className="comparison-question-content">
            <div className="comparison-question-text">
              {/* Handle different question types */}
              {currentQuestion.answerType === 'ASSESSMENT' ? (
                <div className="assessment-question">
                  <div className="d-flex align-items-center mb-3">
                    <Target size={20} className="text-primary me-2" />
                    <h5 className="mb-0 text-primary">
                      {currentQuestion.examType} Assessment Task
                    </h5>
                  </div>
                  {currentQuestion.fullQuestion ? (
                    <div 
                      className="task-description"
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "15px",
                        borderRadius: "8px",
                        border: "1px solid #dee2e6",
                        lineHeight: "1.6"
                      }}
                      dangerouslySetInnerHTML={{ __html: currentQuestion.fullQuestion }} 
                    />
                  ) : (
                    <div className="alert alert-info">
                      <i className="fas fa-info-circle me-2"></i>
                      This is an assessment-based task. Your response has been evaluated by AI.
                    </div>
                  )}
                  
                  {currentQuestion.band && (
                    <div className="mt-3">
                      <div className="d-flex align-items-center">
                        <span className="fw-bold me-2">Band Score:</span>
                        <span className="badge bg-primary fs-6">{currentQuestion.band}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : question && question !== `Question ${selectedQuestion + 1} - Please check the exam paper for details` ? (
                <div className="traditional-question">
                  <div className="question-text" style={{ lineHeight: "1.6" }}>
                    <div dangerouslySetInnerHTML={{ __html: question }} />
                  </div>
                </div>
              ) : (
                <div className="question-placeholder">
                  <p><strong>Question {selectedQuestion + 1}</strong></p>
                  <p className="text-muted mb-3">
                    Question details are available in the exam paper. Click "View Full Exam Paper" to see all question content.
                  </p>
                  {onViewExamPaper && (
                    <button
                      onClick={onViewExamPaper}
                      className="btn btn-outline-primary btn-sm"
                    >
                      <Eye size={14} className="me-1" />
                      View Full Exam Paper
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Answer Comparison - Moved to top */}
        <div className={`comparison-content comparison-${viewMode}`}>
          {/* User Answer */}
          {showUserAnswer && (
            <div className="comparison-answer-section user-answer">
              <div className="answer-section-header">
                <h4 className="answer-section-title">
                  Your Answer
                  {!userAnswer || userAnswer === 'No answer provided' ? (
                    <span className="badge bg-warning ms-2">Skipped</span>
                  ) : isCorrect ? (
                    <span className="badge bg-success ms-2">✓</span>
                  ) : (
                    <span className="badge bg-danger ms-2">✗</span>
                  )}
                </h4>
                <button
                  onClick={() => setShowUserAnswer(false)}
                  className="toggle-visibility"
                  title="Hide your answer"
                >
                  <EyeOff size={16} />
                </button>
              </div>
              <div className={`answer-content ${answerType === 'ASSESSMENT' ? 'assessment-answer' : isCorrect ? 'correct-answer' : 'incorrect-answer'}`}>
                {answerType === 'ASSESSMENT' ? (
                  <div className="assessment-response">
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-upload text-success me-2"></i>
                      <strong>{userAnswer}</strong>
                    </div>
                    <div className="text-muted">
                      <small>
                        Your {currentQuestion.examType === 'Speaking' ? 'audio response' : 'written response'} has been submitted and evaluated by our AI assessment system.
                      </small>
                    </div>
                  </div>
                ) : userAnswer && userAnswer !== 'No answer provided' ? (
                  <div>
                    <strong>"{userAnswer}"</strong>
                    {!isCorrect && hasMultipleCorrectAnswers && (
                      <div className="mt-2 small text-muted">
                        <em>Note: This question accepts {answerType === 'OR' ? 'multiple valid answers' : 'answers containing all required parts'}.</em>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-muted">
                    <em>You did not provide an answer for this question.</em>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Correct Answer */}
          {showCorrectAnswer && (
            <div className="comparison-answer-section correct-answer">
              <div className="answer-section-header">
                <h4 className="answer-section-title">
                  Correct Answer
                  {hasMultipleCorrectAnswers && (
                    <span className="badge bg-info ms-2">
                      {answerType === 'OR' ? 'Multiple Options' : 'All Required'}
                    </span>
                  )}
                </h4>
                <button
                  onClick={() => setShowCorrectAnswer(false)}
                  className="toggle-visibility"
                  title="Hide correct answer"
                >
                  <EyeOff size={16} />
                </button>
              </div>
              <div className="answer-content always-correct">
                {answerType === 'ASSESSMENT' ? (
                  <div className="assessment-feedback">
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-robot text-primary me-2"></i>
                      <strong>AI Assessment Feedback</strong>
                    </div>
                    <div 
                      className="feedback-content"
                      style={{
                        backgroundColor: "#f8f9fa",
                        padding: "12px",
                        borderRadius: "6px",
                        border: "1px solid #dee2e6",
                        lineHeight: "1.5"
                      }}
                    >
                      {explanation && explanation !== "No assessment available" ? (
                        <div dangerouslySetInnerHTML={{ __html: explanation }} />
                      ) : (
                        <div className="text-muted">
                          <em>Assessment feedback is being processed.</em>
                        </div>
                      )}
                    </div>
                  </div>
                ) : correctAnswer ? (
                  <div>
                    <strong>"{correctAnswer}"</strong>
                    {hasMultipleCorrectAnswers && (
                      <div className="mt-2 small">
                        {answerType === 'OR' ? (
                          <div>
                            <em>Any of these answers would be correct:</em>
                            <ul className="mt-1 mb-0">
                              {correctAnswer.split(' OR ').map((option, idx) => (
                                <li key={idx}>{option.trim()}</li>
                              ))}
                            </ul>
                          </div>
                        ) : answerType === 'AND' ? (
                          <div>
                            <em>Your answer must include all of these elements:</em>
                            <ul className="mt-1 mb-0">
                              {correctAnswer.split(' AND ').map((option, idx) => (
                                <li key={idx}>{option.trim()}</li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-muted">
                    <em>No correct answer available</em>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Answer Status - Moved here after answers */}
        <div className="comparison-answer-status">
          <div className="comparison-question-status">
            {isCorrect ? (
              <span className="status-correct">
                <CheckCircle size={16} />
                Correct Answer
                {hasMultipleCorrectAnswers && answerType === 'OR' && (
                  <small className="ms-2 text-muted">(One of multiple valid answers)</small>
                )}
                {hasMultipleCorrectAnswers && answerType === 'AND' && (
                  <small className="ms-2 text-muted">(All required parts found)</small>
                )}
              </span>
            ) : (
              <span className="status-incorrect">
                <XCircle size={16} />
                Incorrect Answer
                {!userAnswer || userAnswer === 'No answer provided' ? (
                  <small className="ms-2 text-muted">(No answer provided)</small>
                ) : hasMultipleCorrectAnswers ? (
                  <small className="ms-2 text-muted">
                    ({answerType === 'OR' ? 'Not matching any valid option' : 'Missing required parts'})
                  </small>
                ) : (
                  <small className="ms-2 text-muted">(Does not match correct answer)</small>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Explanation */}
        {explanation && (
          <div className="comparison-explanation">
            <h4 className="explanation-title">Explanation</h4>
            <div className="explanation-content">
              {explanation}
            </div>
          </div>
        )}

        {/* Hidden Answer Toggle Buttons */}
        <div className="comparison-toggles">
          {!showUserAnswer && (
            <button
              onClick={() => setShowUserAnswer(true)}
              className="toggle-btn toggle-user"
            >
              <Eye size={16} />
              Show Your Answer
            </button>
          )}
          {!showCorrectAnswer && (
            <button
              onClick={() => setShowCorrectAnswer(true)}
              className="toggle-btn toggle-correct"
            >
              <Eye size={16} />
              Show Correct Answer
            </button>
          )}
        </div>
      </div>
    );
  };

  // Render view mode controls
  const renderViewControls = () => (
    <div className="comparison-controls">
      <div className="view-mode-controls">
        <label className="control-label">View Mode:</label>
        <select
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
          className="view-mode-select"
        >
          <option value="side-by-side">Side by Side</option>
          <option value="overlay">Overlay</option>
          <option value="sequential">Sequential</option>
        </select>
      </div>

      <div className="navigation-controls">
        <button
          onClick={handlePrevQuestion}
          disabled={selectedQuestion === 0}
          className="nav-btn nav-prev"
        >
          <ArrowLeft size={16} />
          Previous
        </button>
        
        <span className="question-counter">
          {selectedQuestion + 1} / {questions.length}
        </span>
        
        <button
          onClick={handleNextQuestion}
          disabled={selectedQuestion === questions.length - 1}
          className="nav-btn nav-next"
        >
          Next
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="display-controls">
        <button
          onClick={toggleFullscreen}
          className="control-btn fullscreen-btn"
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <X size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </div>
  );

  if (questions.length === 0) {
    return (
      <div className="comparison-view-empty">
        <Clock size={48} className="empty-icon" />
        <h3>No Questions Available</h3>
        <p>There are no questions to compare at this time.</p>
      </div>
    );
  }

  return (
    <div className={`comparison-view ${isFullscreen ? 'fullscreen' : ''} ${className}`}>
      {/* Header */}
      <div className="comparison-header">
        <h2 className="comparison-title">{examTitle} - Answer Comparison</h2>
        {renderViewControls()}
      </div>

      {/* Main Content */}
      <div className="comparison-main">
        {/* Question Navigation Sidebar */}
        <div className="comparison-sidebar">
          {renderQuestionNavigation()}
        </div>

        {/* Answer Comparison Content */}
        <div className="comparison-content-area">
          {renderAnswerComparison()}
        </div>
      </div>

      {/* Footer with additional info */}
      <div className="comparison-footer">
        <div className="comparison-footer-info">
          <span className="footer-stat">
            <Clock size={14} />
            Question {selectedQuestion + 1} of {questions.length}
          </span>
          <span className="footer-stat">
            <Target size={14} />
            Overall Accuracy: {stats.accuracy}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;