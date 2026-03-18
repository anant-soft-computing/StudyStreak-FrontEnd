import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Quiz = ({ activeLesson }) => {
  const [userSelections, setUserSelections] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState([]);

  // Reset state when activeLesson changes
  useEffect(() => {
    setUserSelections({});
    setShowAnswers(false);
    setCurrentQuiz(activeLesson);
  }, [activeLesson]);

  const handleOptionSelect = (questionId, optionId) => {
    setUserSelections((prev) => ({
      ...prev,
      [questionId]: optionId, // Store the selected option ID for each question
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all questions have been answered
    const answeredCount = Object.keys(userSelections).length;
    if (answeredCount === currentQuiz.length) {
      setShowAnswers(true);
      toast.success("Your Quiz Submitted Successfully");
    } else {
      toast.error(
        `Please answer all questions before submitting. (${answeredCount}/${currentQuiz.length} answered)`
      );
    }
  };

  const calculateScore = () => {
    if (!showAnswers) return null;

    let correctCount = 0;
    currentQuiz.forEach((question) => {
      const selectedOptionId = userSelections[question.id];
      if (selectedOptionId) {
        const selectedOption = question.quiz_options.find(
          (opt) => opt.id === selectedOptionId
        );
        if (selectedOption && selectedOption.correct_answer) {
          correctCount++;
        }
      }
    });

    return {
      correct: correctCount,
      total: currentQuiz.length,
      percentage: Math.round((correctCount / currentQuiz.length) * 100),
    };
  };

  const score = calculateScore();

  return currentQuiz?.length > 0 ? (
    <>
      <div className="lesson__content__wrap">
        <h3>Quiz</h3>
        {showAnswers && score && (
          <div className="alert alert-info">
            Your score: {score.correct} out of {score.total} ({score.percentage}
            %)
          </div>
        )}
      </div>
      <div className="lesson__quiz__wrap">
        <form onSubmit={handleSubmit}>
          {currentQuiz.map((question, questionIndex) => (
            <div className="quiz__single__attemp" key={question.id}>
              <li className="card__title">{`Question ${questionIndex + 1} of ${
                currentQuiz.length
              }`}</li>
              <hr />
              <h3>{question.Question}</h3>
              <div className="row">
                {question.quiz_options.map((option) => (
                  <div className="col-md-6" key={option.id}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question_${question.id}`}
                        id={`option_${option.id}`}
                        checked={userSelections[question.id] === option.id}
                        onChange={() =>
                          handleOptionSelect(question.id, option.id)
                        }
                      />
                      <label
                        className={
                          "form-check-label" +
                          (showAnswers
                            ? option.correct_answer
                              ? " text-success fw-bold"
                              : userSelections[question.id] === option.id &&
                                !option.correct_answer
                              ? " text-danger"
                              : ""
                            : "")
                        }
                        htmlFor={`option_${option.id}`}
                      >
                        {option.Answers}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center">
            {!showAnswers ? (
              <button type="submit" className="default__button mt-4">
                Submit Quiz
              </button>
            ) : (
              <div className="mt-4">
                <button
                  type="button"
                  className="default__button"
                  onClick={() => {
                    setUserSelections({});
                    setShowAnswers(false);
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  ) : (
    <h5 className="text-center text-danger">Quiz Not Found!</h5>
  );
};

export default Quiz;