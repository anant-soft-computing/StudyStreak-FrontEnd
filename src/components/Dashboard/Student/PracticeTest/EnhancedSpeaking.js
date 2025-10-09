import React, { useState } from "react";
import { Eye, Mic, Clock, FileText, BarChart3, MessageCircle } from "lucide-react";
import SkeletonLoader from "../../../UI/SkeletonLoader";
import ErrorDisplay from "../../../UI/ErrorDisplay";

const EnhancedSpeakingTest = ({ speakingData, givenTest, onTestTaken }) => {
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
        onTestTaken(data.id, 'Speaking');
      }
    } catch (error) {
      console.error("Error launching speaking test:", error);
      setError({
        type: 'general',
        message: 'Failed to launch speaking test. Please try again.',
        details: error
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewResults = (testId) => {
    window.open(`/PracticeTestAnswer/Speaking/${testId}`, "_blank");
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
        return <span className="badge bg-danger ms-2">Available</span>;
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
            title="Speaking Tests Error"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        {speakingData.map((data, index) => {
          const testStatus = getTestStatus(data);
          const isCompleted = testStatus === 'completed';
          
          return (
            <div className="col-lg-4 col-md-6 col-12" key={index}>
              <div className="enhanced-practice-test-card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="test-icon">
                      <Mic size={24} className="text-danger" />
                    </div>
                    {getStatusBadge(testStatus)}
                  </div>
                  <h3 className="test-title">
                    {data?.IELTS?.Name || 'Speaking Practice Test'}
                  </h3>
                </div>

                <div className="card-body">
                  <div className="test-stats">
                    <div className="stat-item">
                      <FileText size={16} className="stat-icon" />
                      <div className="stat-details">
                        <span className="stat-label">Parts</span>
                        <span className="stat-value">3</span>
                      </div>
                    </div>
                    
                    <div className="stat-item">
                      <MessageCircle size={16} className="stat-icon" />
                      <div className="stat-details">
                        <span className="stat-label">Format</span>
                        <span className="stat-value">Interview</span>
                      </div>
                    </div>
                    
                    <div className="stat-item">
                      <Clock size={16} className="stat-icon" />
                      <div className="stat-details">
                        <span className="stat-label">Duration</span>
                        <span className="stat-value">11-14 min</span>
                      </div>
                    </div>

                    <div className="stat-item">
                      <BarChart3 size={16} className="stat-icon" />
                      <div className="stat-details">
                        <span className="stat-label">AI Analysis</span>
                        <span className="stat-value">Included</span>
                      </div>
                    </div>
                  </div>

                  <div className="test-description">
                    <p className="text-muted">
                      IELTS Speaking test simulation with 3 parts: introduction, 
                      long turn, and discussion with AI-powered pronunciation and fluency analysis.
                    </p>
                  </div>

                  <div className="speaking-features">
                    <div className="feature-badge">
                      <Mic size={12} />
                      <span>Voice Recording</span>
                    </div>
                    <div className="feature-badge">
                      <MessageCircle size={12} />
                      <span>Pronunciation</span>
                    </div>
                    <div className="feature-badge">
                      <BarChart3 size={12} />
                      <span>Fluency Score</span>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="d-flex gap-2 justify-content-center">
                    {isCompleted ? (
                      <>
                        <button
                          className="btn btn-outline-danger flex-fill"
                          onClick={() => handleClick(data)}
                          disabled={loading}
                        >
                          <Mic size={16} className="me-1" />
                          Retake Test
                        </button>
                        <button
                          className="btn btn-danger flex-fill"
                          onClick={() => handleViewResults(data.id)}
                        >
                          <Eye size={16} className="me-1" />
                          View Results
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-danger w-100"
                        onClick={() => handleClick(data)}
                        disabled={loading}
                      >
                        <Mic size={16} className="me-1" />
                        {loading ? 'Starting...' : 'Start Speaking Test'}
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

      {speakingData.length === 0 && (
        <div className="text-center py-5">
          <Mic size={48} className="text-muted mb-3" />
          <h4 className="text-muted">No Speaking Tests Available</h4>
          <p className="text-muted">Speaking practice tests will appear here when they become available.</p>
        </div>
      )}
    </>
  );
};

export default EnhancedSpeakingTest;