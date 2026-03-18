import React, { useState } from "react";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import Four from "./Four";
import Five from "./Five";
import Six from "./Six";
import StartTest from "./StartTest";
import Listening from "./Listening";
import SmallModal from "../../../../../UI/Modal";

const Instructions = ({ startTest }) => {
  const instructions = [
    <StartTest />,
    <One />,
    <Two />,
    <Three />,
    <Four />,
    <Five />,
    <Six />,
    <Listening startTest={startTest} />,
  ];

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < instructions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setOpen(false);
    }
  };

  return (
    <div>
      <div>{instructions[currentIndex]}</div>
      {currentIndex < instructions.length - 1 && (
        <div className="d-flex justify-content-end m-5">
          <button className="default__button" onClick={() => setOpen(true)}>
            Next
          </button>
        </div>
      )}
      {open && currentIndex < instructions.length - 1 && (
        <SmallModal
          centered
          isOpen={open}
          onClose={() => setOpen(false)}
          footer={
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-success" onClick={handleNext}>
                Yes
              </button>
              <button className="btn btn-danger" onClick={() => setOpen(false)}>
                No
              </button>
            </div>
          }
          title="PTE-Academic Mock Test"
        >
          Do you want to go to the next?
        </SmallModal>
      )}
    </div>
  );
};

export default Instructions;
