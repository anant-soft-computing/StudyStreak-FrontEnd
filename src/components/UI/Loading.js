import React from "react";

const Loading = ({ color, text }) => {
  return (
    <div className="text-center">
      <button className={`btn btn-${color}`} type="button">
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>{" "}
        {text}
      </button>
    </div>
  );
};

export default Loading;