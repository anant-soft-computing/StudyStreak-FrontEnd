import React from "react";

const Quiz = ({activeLesson}) => {
  return (
    <div>
      {activeLesson?.quiz_questions?.length > 0 ? (
        <>
          <div className="dashboard__section__title">
            <h4>Quiz</h4>
          </div>
          <div className="lesson__quiz__wrap">
            {activeLesson.quiz_questions.map((question, index) => (
              <div className="quiz__single__attemp" key={index}>
                <li>{`Question : ${index + 1}/${
                  activeLesson.quiz_questions.length
                } | `}</li>{" "}
                <li>{`Attempts allowed : 1 `}</li> <li> | Time: 5.0 Min</li>
                <hr className="hr" />
                <h3>{question.Question}</h3>
                <div className="row">
                  {activeLesson.quiz_options
                    .filter((option) => option.name === question.id)
                    .map((option, optionIndex) => (
                      <div className="col-md-6" key={optionIndex}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`flexCheckDefault_${optionIndex}`}
                            checked={option.correct_answer}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexCheckDefault_${optionIndex}`}
                          >
                            {option.Answers}
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No Quize Available For This Lesson.</p>
      )}
    </div>
  );
};

export default Quiz;