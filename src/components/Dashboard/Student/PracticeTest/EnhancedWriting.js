import React, { useState } from "react";
import { Eye, PenTool, Clock, FileText, BarChart3, Edit3 } from "lucide-react";
import SkeletonLoader from "../../../UI/SkeletonLoader";
import ErrorDisplay from "../../../UI/ErrorDisplay";

const EnhancedWritingTest = ({ writingData, givenTest, onTestTaken }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async (data) => {
    try {
      setLoading(true);
      setError(null);

      Object?.keys(data?.IELTS)?.forEach((key) => {
        if (Array.isArray(data?.IELTS[key])) {
          if (data?.IELTS[key].length > 0) {
            window.open(`/PracticeLiveExam/IELTS/${key}/${data.id}`, "_blank");
          }
        }
      });

      // Notify parent component that test was taken
      if (onTestTaken) {
        onTestTaken(data.id, 'Writing');
      }
    } catch (error) {
      console.error("Error launching writing test:", error);
      setError({
        type: 'general',
        message: 'Failed to launch writing test. Please try again.',
        details: error
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewResults = (testId) => {
    window.open(`/PracticeTestAnswer/Writing/${testId}`, "_blank");
  };

  const getTestStatus = (testData) => {
    const isGiven = givenTest.some((test) => test?.id === testData.id || test === testData.id);
    return isGiven ? 'completed' : 'available';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <span className="badge bg-success ms-2">Completed</span>;
      case 'available':
        return <span className="badge bg-warning ms-2">Available</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="row">
        {[1, 2, 3].map(i => (
          <div key={i} className="col-lg-4 col-md-6 col-12">
            <SkeletonLoader type="default" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="row">
        <div className="col-12">
          <ErrorDisplay
            error={error}
            type={error.type || 'general'}
            onRetry={() => setError(null)}
            title="Writing Tests Error"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {writingData.map((data, index) => {
          const testStatus = getTestStatus(data);
          const isCompleted = testStatus === 'completed';
          
          return (
            <div className="col-lg-4 col-md-6 col-12" key={index}>
              <div className="enhanced-practice-test-card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="test-icon">
                      <PenTool size={24} className="text-warning" />
                    </div>
                    {getStatusBadge(testStatus)}
                  </div>
                  <h3 className="test-title">
                    {data?.IELTS?.Name || 'Writing Practice Test'}
                  </h3>
                </div>

                <div className="card-body">
                  <div className="test-stats">
                    <div className="stat-item">
                      <FileText size={16} className="stat-icon" />
                      <div className="stat-details">
                        <span className="stat-label">Tasks</span>
                        <span className="stat-value">2</span>
                      </div>
                    </div>
                    
                    <div className="stat-item">
                      <BarChart3 size={16} className="stat-icon" />
                      <div className="stat-details">
                        <span className="stat-label">Word Count</span>
                        <span className="stat-value">400+</span>
                      </div>
                    </div>
                    
                    <div className="stat-item">
                      <Clock size={16} className="stat-icon" />
                      <div className="stat-details">
                        <span className="stat-label">Duration</span>
                        <span className="stat-value">60 min</span>
                      </div>
                    </div>

                    <div className="stat-item">
                      <Edit3 size={16} className="stat-icon" />
                      <div className="stat-details">
                        <span className="stat-label">AI Feedback</span>
                        <span className="stat-value">Included</span>
                      </div>
                    </div>
                  </div>

                  <div className="test-description">
                    <p className="text-muted">
                      IELTS Academic Writing test with Task 1 (chart/graph description) 
                      and Task 2 (essay writing) with detailed AI-powered feedback.
                    </p>
                  </div>

                  <div className="writing-features">
                    <div className="feature-badge">
                      <Edit3 size={12} />
                      <span>Grammar Check</span>
                    </div>
                    <div className="feature-badge">
                      <BarChart3 size={12} />
                      <span>Band Scoring</span>
                    </div>
                    <div className="feature-badge">
                      <FileText size={12} />
                      <span>Task Response</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="d-flex gap-2 justify-content-center">
                    {isCompleted ? (
                      <>
                        <button
                          className="btn btn-outline-warning flex-fill"
                          onClick={() => handleClick(data)}
                          disabled={loading}
                        >
                          <PenTool size={16} className="me-1" />
                          Retake Test
                        </button>
                        <button
                          className="btn btn-warning flex-fill"
                          onClick={() => handleViewResults(data.id)}
                        >
                          <Eye size={16} className="me-1" />
                          View Results
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-warning w-100"
                        onClick={() => handleClick(data)}
                        disabled={loading}
                      >
                        <PenTool size={16} className="me-1" />
                        {loading ? 'Starting...' : 'Start Writing Test'}
                      </button>
                    )}
                  </div>
                </div>

                {isCompleted && (
                  <div className="completion-indicator">
                    <div className="completion-badge">
                      <Eye size={12} />
                      <span>Results Available</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {writingData.length === 0 && (
        <div className="text-center py-5">
          <PenTool size={48} className="text-muted mb-3" />
          <h4 className="text-muted">No Writing Tests Available</h4>
          <p className="text-muted">Writing practice tests will appear here when they become available.</p>
        </div>
      )}
    </>
  );
};

export default EnhancedWritingTest;