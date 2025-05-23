import React from "react";
import { ProgressBar } from "react-bootstrap";

const SummaryCard = ({ title, icon, score, percentage, color }) => {
  return (
    <div
      className="mb-4"
      style={{
        backgroundColor: color,
        borderRadius: "6px",
        padding: "20px",
        color: "white",
      }}
    >
      <div className="d-flex align-items-center">
        {icon}
        <div className="ms-2">
          <h3 className="mb-0" style={{ color: "white", fontWeight: "bold" }}>
            {score}
          </h3>
          <div className="text-uppercase" style={{ fontSize: "0.8rem" }}>
            {title}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <ProgressBar
          now={parseFloat(percentage)}
          style={{
            height: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: "3px",
          }}
          variant="light"
        />
      </div>
    </div>
  );
};

export default SummaryCard;
