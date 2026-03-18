import React from "react";

const StartTest = () => {
  return (
    <div className="instruction-card m-5">
      <p className="instruction-heading">
        Start a new <b>PTE-Academic</b> Mock Test
      </p>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#000",
          marginBottom: "20px",
        }}
      />
      <div className="instruction-content">
        PTE-Academic Mock Test is a simulation of Pearson PTE-Academic English
        Test and the questions will be selected randomly from our question bank.
        Each PTE-Academic Mock Test will have different questions. In "Standard
        PTE-Academic Mock Test" the number of questions are based on the real
        PTE exam.
      </div>

      <p className="instruction-wishes">
        <b className="text-danger">Notice:</b> Taking the PTE-Academic Mock test
        is free but for checking your answers and scoring{" "}
        <b className="text-danger">you need to pay the Mock fee.</b>
      </p>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#000",
          marginBottom: "20px",
        }}
      />

      <p className="instruction-wishes">
        <input className="mr-2" type="radio" name="radio" checked />
        <span className="instruction-wishes">
          Standard PTE-Academic Mock Test
        </span>
      </p>
      <p className="instruction-wishes">
        <input className="mr-2" type="radio" name="radio" />
        <span className="instruction-wishes">
          Optional PTE-Academic Mock Test
        </span>
      </p>
    </div>
  );
};

export default StartTest;
