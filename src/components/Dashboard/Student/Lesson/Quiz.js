import React, { useState } from "react";
import { toast } from "react-toastify";

const Quiz = ({ activeLesson }) => {
  const [userSelections, setUserSelections] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleCheckboxChange = (questionIndex, optionIndex) => {
    const updatedSelections = [...userSelections];
    updatedSelections[questionIndex] = {
      ...updatedSelections[questionIndex],
      [optionIndex]: !updatedSelections[questionIndex]?.[optionIndex],
    };
    setUserSelections(updatedSelections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const anyAnswerSelected = userSelections.some((questionSelection) =>
      Object.values(questionSelection)?.includes(true)
    );
    if (anyAnswerSelected) {
      setShowAnswers(true);
      toast.success("Your Quiz Submitted Successfully");
    } else {
      toast.error("Please select at least one answer before submitting.");
    }
  };

  return activeLesson?.length > 0 ? (
    <>
      <div className="lesson__content__wrap">
        <h3>Quiz</h3>
      </div>
      <div className="lesson__quiz__wrap">
        <form onSubmit={handleSubmit}>
          {activeLesson.map((question, questionIndex) => (
            <div className="quiz__single__attemp" key={questionIndex}>
              <li className="card__title">{`Question : ${questionIndex + 1}/${
                activeLesson.length
              }`}</li>
              <hr />
              <h3>{question.Question}</h3>
              <div className="row">
                {question.quiz_options.map((option, optionIndex) => (
                  <div className="col-md-6" key={optionIndex}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`flexCheckDefault_${optionIndex}`}
                        checked={userSelections[questionIndex]?.[optionIndex]}
                        onChange={() =>
                          handleCheckboxChange(questionIndex, optionIndex)
                        }
                      />
                      <label
                        className={
                          "form-check-label" +
                          (showAnswers && option.correct_answer
                            ? " text-success"
                            : showAnswers &&
                              userSelections[questionIndex]?.[optionIndex] &&
                              !option.correct_answer
                            ? " text-danger"
                            : "")
                        }
                        htmlFor={`flexCheckDefault_${optionIndex}`}
                      >
                        {option.Answers}
                        {showAnswers && option.correct_answer && (
                          <span> (Correct)</span>
                        )}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center">
            <button type="submit" className="default__button mt-4">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  ) : (
    <h5 className="text-center text-danger">Quiz Not Found !!</h5>
  );
};

export default Quiz;