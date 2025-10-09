import React from 'react';
import { AlertCircle, Wifi, RefreshCw, AlertTriangle, XCircle } from 'lucide-react';
import './ErrorDisplay.css';

const ErrorDisplay = ({ 
  error, 
  onRetry, 
  type = 'general',
  title,
  message,
  showRetry = true,
  className = '',
  size = 'medium' 
}) => {
  // Error type configurations
  const errorConfigs = {
    network: {
      icon: Wifi,
      defaultTitle: 'Connection Error',
      defaultMessage: 'Unable to connect to the server. Please check your internet connection and try again.',
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    api: {
      icon: AlertCircle,
      defaultTitle: 'Service Error',
      defaultMessage: 'There was a problem with the service. Please try again in a moment.',
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    validation: {
      icon: AlertTriangle,
      defaultTitle: 'Validation Error',
      defaultMessage: 'Please check your input and try again.',
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    auth: {
      icon: XCircle,
      defaultTitle: 'Authentication Error',
      defaultMessage: 'Your session has expired. Please log in again.',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    general: {
      icon: AlertCircle,
      defaultTitle: 'Something went wrong',
      defaultMessage: 'An unexpected error occurred. Please try again.',
      iconColor: 'text-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  };

  const config = errorConfigs[type] || errorConfigs.general;
  const IconComponent = config.icon;

  // Size configurations
  const sizeConfigs = {
    small: {
      containerClass: 'error-display-small',
      iconSize: 20,
      titleClass: 'text-sm font-medium',
      messageClass: 'text-xs',
      buttonClass: 'px-2 py-1 text-xs'
    },
    medium: {
      containerClass: 'error-display-medium',
      iconSize: 24,
      titleClass: 'text-base font-semibold',
      messageClass: 'text-sm',
      buttonClass: 'px-3 py-2 text-sm'
    },
    large: {
      containerClass: 'error-display-large',
      iconSize: 32,
      titleClass: 'text-lg font-bold',
      messageClass: 'text-base',
      buttonClass: 'px-4 py-2 text-base'
    }
  };

  const sizeConfig = sizeConfigs[size] || sizeConfigs.medium;

  // Extract error message
  const getErrorMessage = () => {
    if (message) return message;
    if (error?.message) return error.message;
    if (error?.response?.data?.message) return error.response.data.message;
    if (typeof error === 'string') return error;
    return config.defaultMessage;
  };

  // Extract error title
  const getErrorTitle = () => {
    if (title) return title;
    if (error?.name) return error.name;
    if (error?.response?.status) {
      return `Error ${error.response.status}`;
    }
    return config.defaultTitle;
  };

  return (
    <div className={`error-display ${sizeConfig.containerClass} ${config.bgColor} ${config.borderColor} ${className}`}>
      <div className="error-display-content">
        {/* Error Icon */}
        <div className="error-display-icon">
          <IconComponent 
            size={sizeConfig.iconSize} 
            className={config.iconColor} 
          />
        </div>

        {/* Error Text */}
        <div className="error-display-text">
          <h3 className={`error-display-title ${sizeConfig.titleClass}`}>
            {getErrorTitle()}
          </h3>
          <p className={`error-display-message ${sizeConfig.messageClass}`}>
            {getErrorMessage()}
          </p>
        </div>

        {/* Retry Button */}
        {showRetry && onRetry && (
          <div className="error-display-actions">
            <button
              onClick={onRetry}
              className={`error-display-retry ${sizeConfig.buttonClass}`}
            >
              <RefreshCw size={16} className="mr-1" />
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Error Details (Development Mode) */}
      {process.env.NODE_ENV === 'development' && error && (
        <details className="error-display-details">
          <summary className="error-display-details-summary">
            🔧 Error Details (Dev Mode)
          </summary>
          <div className="error-display-details-content">
            <pre className="error-display-stack">
              {error.stack || JSON.stringify(error, null, 2)}
            </pre>
          </div>
        </details>
      )}
    </div>
  );
};

// Inline error display for forms and inputs
export const InlineError = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <div className={`inline-error ${className}`}>
      <AlertCircle size={14} className="inline-error-icon" />
      <span className="inline-error-text">
        {typeof error === 'string' ? error : error.message}
      </span>
    </div>
  );
};

// Toast-style error notification
export const ErrorToast = ({ error, onClose, autoClose = true, duration = 5000 }) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, duration]);

  if (!error) return null;

  return (
    <div className="error-toast">
      <div className="error-toast-content">
        <AlertCircle size={20} className="error-toast-icon" />
        <span className="error-toast-message">
          {typeof error === 'string' ? error : error.message}
        </span>
        {onClose && (
          <button onClick={onClose} className="error-toast-close">
            <XCircle size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

// Error state for empty/no data scenarios
export const EmptyError = ({ 
  title = "No data found", 
  message = "There's nothing to display right now.",
  action,
  actionLabel = "Refresh",
  className = ""
}) => {
  return (
    <div className={`empty-error ${className}`}>
      <div className="empty-error-content">
        <div className="empty-error-icon">
          <AlertCircle size={48} className="text-gray-400" />
        </div>
        <h3 className="empty-error-title">{title}</h3>
        <p className="empty-error-message">{message}</p>
        {action && (
          <button onClick={action} className="empty-error-action">
            <RefreshCw size={16} className="mr-2" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;