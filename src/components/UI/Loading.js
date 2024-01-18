import React from "react";
import logo from "../../img/logo/Logo.png";

const Loading = () => {
  return (
    <div id="back__preloader">
      <div id="back__circle_loader"></div>
      <div className="back__loader_logo">
        <img loading="lazy" src={logo} alt="Preload" height={22} width="100%" />
      </div>
    </div>
  );
};

export default Loading;