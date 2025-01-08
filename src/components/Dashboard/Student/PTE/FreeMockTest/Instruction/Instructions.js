import React, { useState } from "react";
import { toast } from "react-toastify";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";
import Five from "./Five";
import Six from "./Six";
import Seven from "./Seven";
import Eight from "./Eight";

const Instructions = () => {
  const instructions = [
    <One />,
    <Two />,
    <Three />,
    <Four />,
    <Five />,
    <Six />,
    <Seven />,
    <Eight />,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < instructions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast.success("All Instructions are Completed");
    }
  };
  return (
    <div>
      <div>{instructions[currentIndex]}</div>
      <div className="d-flex justify-content-end m-5">
        <button
          className="default__button"
          onClick={handleNext}
          disabled={currentIndex >= instructions.length}
        >
          {currentIndex < instructions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default Instructions;
