import React from "react";
import Footer from "../../components/Footer/Footer";
import TopBar from "../../components/TopBar/TopBar";
import NavBar from "../../components/NavBar/NavBar";

const Tests = () => {
  return (
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          Tests Component
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tests;
