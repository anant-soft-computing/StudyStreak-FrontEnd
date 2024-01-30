import React from "react";

const Quiz = ({ activeLesson }) => {
  return (
    <div>
      {activeLesson?.[0]?.length > 0 && (
        <>
          <div className="lesson__content__wrap">
            <h3>Quiz</h3>
          </div>
          <div className="lesson__quiz__wrap">
            {activeLesson?.[0]?.map((question, index) => (
              <div className="quiz__single__attemp" key={index}>
                <li style={{ marginTop: "70px" }}>{`Question : ${index + 1}/${
                  activeLesson?.[0]?.length
                }`}</li>
                <hr />
                <h3>{question.Question}</h3>
                <div className="row">
                  {activeLesson?.[0]
                    ?.filter((option) => option.name === question.id)
                    ?.map((option, optionIndex) => (
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
      )}
    </div>
  );
};

export default Quiz;
