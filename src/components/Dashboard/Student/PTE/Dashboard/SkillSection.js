import React from "react";
import { ProgressBar } from "react-bootstrap";

const SkillSection = ({ title, items }) => {
  // Group items by source
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.source]) {
      acc[item.source] = [];
    }
    acc[item.source].push(item);
    return acc;
  }, {});

  return (
    <div className="mb-4">
      <h5 style={{ marginBottom: "15px" }}>{title}</h5>
      {Object.entries(groupedItems).map(([source, sourceItems]) => (
        <div key={source}>
          <h6
            style={{
              fontSize: "0.9rem",
              margin: "10px 0 5px 0",
              color: "white",
              background: "#01569b",
              padding: "5px 10px",
              borderRadius: "3px",
            }}
          >
            {source}
          </h6>
          {sourceItems.map((item, index) => (
            <div key={index} className="mb-3">
              <div
                className="d-flex justify-content-between"
                style={{ marginBottom: "5px" }}
              >
                <span>
                  {item.label}{" "}
                  <span style={{ opacity: 0.7 }}>{item.shortcode}</span>
                </span>
                <span>{item.value}</span>
              </div>
              <ProgressBar
                now={parseFloat(item.progress)}
                style={{
                  height: "10px",
                  backgroundColor: "#f0f0f0",
                  borderRadius: "3px",
                }}
                variant={item.variant}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkillSection;
