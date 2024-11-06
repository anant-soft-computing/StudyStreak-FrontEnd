import React from "react";
import studyStreak from "../img/logo/Logo1.png";

const Loading = () => {
  return (
    <div id="back__preloader">
      <div id="back__circle_loader" />
      <div className="back__loader_logo">
        <img src={studyStreak} alt="Loading" />
      </div>
    </div>
  );
};

export default Loading;
