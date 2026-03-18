import React, { useState } from "react";
import { Eye, BookOpen, Clock, FileText, BarChart3 } from "lucide-react";
import SkeletonLoader from "../../../UI/SkeletonLoader";
import ErrorDisplay from "../../../UI/ErrorDisplay";

const EnhancedReadingTest = ({ readingData, givenTest, onTestTaken }) => {
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
        onTestTaken(data.id, 'Reading');
      }
    } catch (error) {
      console.error("Error launching reading test:", error);
      setError({
        type: 'general',
        message: 'Failed to launch reading test. Please try again.',
        details: error
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewResults = (testId) => {
    window.open(`/PracticeTestAnswer/Reading/${testId}`, "_blank");
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
        return <span className="badge bg-primary ms-2">Available</span>;
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
            title="Reading Tests Error"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {readingData.map((data, index) => {
          const testStatus = getTestStatus(data);
          const isCompleted = testStatus === 'completed';
          
          return (
            <div className="col-lg-4 col-md-6 col-12" key={index}>
              <div className="enhanced-practice-test-card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="test-icon">
                      <BookOpen size={24} className="text-primary" />
                    </div>
                    {getStatusBadge(testStatus)}
                  </div>
                  <h3 className="test-title">
                    {data?.IELTS?.Name || 'Reading Practice Test'}
                  </h3>
                </div>

                <div className="card-body">
                  <div className="test-stats">
                    <div className="stat-item">
                      <FileText size={16} className="stat-icon" />
                      <div className="stat-details">
                        <span className="stat-label">Sections</span>
                        <span className="stat-value">3</span>
                      </div>
                    </div>
                    
                    <div className="stat-item">
                      <BarChart3 size={16} className="stat-icon" />
                      <div className="stat-details">
                        <span className="stat-label">Questions</span>
                        <span className="stat-value">40</span>
                      </div>
                    </div>
                    
                    <div className="stat-item">
                      <Clock size={16} className="stat-icon" />
                      <div className="stat-details">
                        <span className="stat-label">Duration</span>
                        <span className="stat-value">60 min</span>
                      </div>
                    </div>
                  </div>

                  <div className="test-description">
                    <p className="text-muted">
                      IELTS Academic Reading test with 3 sections covering various text types 
                      including articles, reports, and academic papers.
                    </p>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="d-flex gap-2 justify-content-center">
                    {isCompleted ? (
                      <>
                        <button
                          className="btn btn-outline-primary flex-fill"
                          onClick={() => handleClick(data)}
                          disabled={loading}
                        >
                          <BookOpen size={16} className="me-1" />
                          Retake Test
                        </button>
                        <button
                          className="btn btn-primary flex-fill"
                          onClick={() => handleViewResults(data.id)}
                        >
                          <Eye size={16} className="me-1" />
                          View Results
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleClick(data)}
                        disabled={loading}
                      >
                        <BookOpen size={16} className="me-1" />
                        {loading ? 'Starting...' : 'Start Reading Test'}
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

      {readingData.length === 0 && (
        <div className="text-center py-5">
          <BookOpen size={48} className="text-muted mb-3" />
          <h4 className="text-muted">No Reading Tests Available</h4>
          <p className="text-muted">Reading practice tests will appear here when they become available.</p>
        </div>
      )}
    </>
  );
};

export default EnhancedReadingTest;