import React from "react";
import TopBar from "../TopBar/TopBar";
import NavBar from "../NavBar/NavBar";
import DragDrop from "./DragDrop";

const ExamCreate = () => {
  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="mt-4">
            <DragDrop />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamCreate;
