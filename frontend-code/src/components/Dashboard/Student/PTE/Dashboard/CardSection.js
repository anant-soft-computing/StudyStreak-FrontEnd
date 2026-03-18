import React from "react";
import { calculateTotals } from "./PTEDashboard";
import { BookOpen, Headphones, Mic, PenTool } from "lucide-react";

const CardSection = ({ data }) => {
  const totals = calculateTotals(data);
  const cardData = [
    {
      icon: <Mic color="white" size={24} />,
      score: totals.speaking.total,
      label: "SPEAKING",
      leftColor: "#4B9DFF",
      textColor: "#4B9DFF",
    },
    {
      icon: <PenTool color="white" size={24} />,
      score: totals.writing.total,
      label: "WRITING",
      leftColor: "#E76565",
      textColor: "#E76565",
    },
    {
      icon: <BookOpen color="white" size={24} />,
      score: totals.reading.total,
      label: "READING",
      leftColor: "#4CAF50",
      textColor: "#4CAF50",
    },
    {
      icon: <Headphones color="white" size={24} />,
      score: totals.listening.total,
      label: "LISTENING",
      leftColor: "#FFC107",
      textColor: "#FFC107",
    },
  ];

  return (
    <div className="row mb-4">
      {cardData.map((card, index) => (
        <div key={index} className="col-12 col-md-3 col-lg-3 col-xl-3">
          <div
            className="d-flex align-items-center bg-white"
            style={{
              height: "70px",
              border: "1px solid #f0f0f0",
            }}
          >
            <div
              className="h-100 d-flex align-items-center justify-content-center px-3"
              style={{
                width: "70px",
                backgroundColor: card.leftColor,
              }}
            >
              {card.icon}
            </div>
            <div className="flex-grow-1 px-3 text-center">
              <h3
                className="mb-0 fw-bold"
                style={{
                  color: card.textColor,
                  fontSize: "24px",
                }}
              >
                {card.score}
              </h3>
              <small
                className="text-uppercase"
                style={{
                  color: card.textColor,
                  opacity: 0.7,
                }}
              >
                {card.label}
              </small>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSection;