import React, { Component } from 'react';
import './ErrorBoundary.css';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      isRetrying: false
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log error to an error reporting service
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error, errorInfo) => {
    // In a real app, you would send this to your error tracking service
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.group('🐛 Error Report');
    console.error('Error Details:', errorData);
    console.groupEnd();
  };

  handleRetry = () => {
    this.setState({ isRetrying: true });
    
    setTimeout(() => {
      this.setState({ 
        hasError: false, 
        error: null, 
        errorInfo: null,
        isRetrying: false 
      });
    }, 1000);
  };

  handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  handleReportBug = () => {
    const subject = encodeURIComponent('Bug Report: Application Error');
    const body = encodeURIComponent(`
Error Message: ${this.state.error?.message || 'Unknown error'}
Stack Trace: ${this.state.error?.stack || 'No stack trace available'}
Component Stack: ${this.state.errorInfo?.componentStack || 'No component stack available'}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}

Please describe what you were doing when this error occurred:
[Your description here]
    `);
    
    window.open(`mailto:support@studystreak.in?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      const isDevelopment = process.env.NODE_ENV === 'development';

      return (
        <div className="error-boundary">
          <div className="error-boundary-container">
            <div className="error-boundary-content">
              {/* Error Icon */}
              <div className="error-icon">
                <AlertTriangle size={64} className="text-red-500" />
              </div>

              {/* Error Title */}
              <h1 className="error-title">
                Oops! Something went wrong
              </h1>

              {/* Error Description */}
              <p className="error-description">
                We're sorry, but something unexpected happened. Don't worry, our team has been notified and is working on a fix.
              </p>

              {/* Error Message (for users) */}
              {error && (
                <div className="error-message-container">
                  <h3 className="error-message-title">Error Details:</h3>
                  <div className="error-message">
                    {error.message || 'An unknown error occurred'}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="error-actions">
                <button 
                  onClick={this.handleRetry}
                  disabled={this.state.isRetrying}
                  className="error-btn error-btn-primary"
                >
                  {this.state.isRetrying ? (
                    <>
                      <RefreshCw size={16} className="animate-spin mr-2" />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} className="mr-2" />
                      Try Again
                    </>
                  )}
                </button>

                <button 
                  onClick={this.handleGoHome}
                  className="error-btn error-btn-secondary"
                >
                  <Home size={16} className="mr-2" />
                  Go to Dashboard
                </button>

                <button 
                  onClick={this.handleReportBug}
                  className="error-btn error-btn-outline"
                >
                  <Bug size={16} className="mr-2" />
                  Report Bug
                </button>
              </div>

              {/* Development Mode Details */}
              {isDevelopment && error && (
                <details className="error-details">
                  <summary className="error-details-summary">
                    🔧 Developer Information (Development Mode Only)
                  </summary>
                  
                  <div className="error-details-content">
                    <div className="error-section">
                      <h4>Error Stack:</h4>
                      <pre className="error-stack">
                        {error.stack}
                      </pre>
                    </div>

                    {errorInfo && (
                      <div className="error-section">
                        <h4>Component Stack:</h4>
                        <pre className="error-stack">
                          {errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Help Text */}
              <div className="error-help">
                <p>
                  If this problem persists, please contact our support team at{' '}
                  <a href="mailto:support@studystreak.in" className="error-link">
                    support@studystreak.in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for functional components
export const withErrorBoundary = (WrappedComponent, errorBoundaryProps = {}) => {
  return (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

// Hook for handling errors in functional components
export const useErrorHandler = () => {
  const handleError = (error, errorInfo = {}) => {
    console.error('Error caught by useErrorHandler:', error);
    
    // Create a custom error event
    const errorEvent = new CustomEvent('unhandledError', {
      detail: { error, errorInfo }
    });
    
    window.dispatchEvent(errorEvent);
  };

  return handleError;
};

export default ErrorBoundary;