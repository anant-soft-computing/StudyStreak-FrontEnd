import React from "react";

const SkeletonLoader = ({ type = "default" }) => {
  if (type === "table") {
    return (
      <div className="skeleton-loader">
        <div className="skeleton-table">
          <div className="skeleton-row skeleton-header">
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
            <div className="skeleton-cell"></div>
          </div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="skeleton-row">
              <div className="skeleton-cell"></div>
              <div className="skeleton-cell"></div>
              <div className="skeleton-cell"></div>
              <div className="skeleton-cell"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "stats") {
    return (
      <div className="skeleton-stats">
        <div className="d-flex flex-wrap gap-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="skeleton-stat-card">
              <div className="skeleton-line skeleton-short"></div>
              <div className="skeleton-line skeleton-shorter"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "assessment") {
    return (
      <div className="skeleton-assessment">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line skeleton-medium"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line skeleton-short"></div>
      </div>
    );
  }

  return (
    <div className="skeleton-loader">
      <div className="skeleton-line skeleton-title"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line skeleton-medium"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line skeleton-short"></div>
    </div>
  );
};

export default SkeletonLoader;