import React from "react";
import { useNavigate } from "react-router-dom";

const BuyCourse = ({ message }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h5 className="text-center text-danger">{message}</h5>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="default__button"
          onClick={() => navigate("/courses")}
        >
          Buy Course
        </button>
      </div>
    </div>
  );
};

export default BuyCourse;