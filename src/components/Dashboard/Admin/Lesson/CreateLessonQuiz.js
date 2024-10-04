import React, { useState } from "react";
import SingleSelection from "../../../UI/SingleSelect";

const initialCLQ = {
  lesson: "",
  quiz_questions: [
    {
      question: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "",
    },
  ],
};

const CreateLessonQuiz = () => {
  const [lessonQuiz, setLessonQuiz] = useState(initialCLQ);

  // Handle input changes for question and options
  const handleInputChange = (index, field, value) => {
    const updatedQuestions = [...lessonQuiz.quiz_questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setLessonQuiz({ ...lessonQuiz, quiz_questions: updatedQuestions });
  };

  const handleCorrectAnswerChange = (index, correctOption) => {
    const updatedQuestions = [...lessonQuiz.quiz_questions];
    updatedQuestions[index].correct_answer = correctOption;
    setLessonQuiz({ ...lessonQuiz, quiz_questions: updatedQuestions });
  };

  const addNewQuestion = () => {
    setLessonQuiz({
      ...lessonQuiz,
      quiz_questions: [
        ...lessonQuiz.quiz_questions,
        {
          question: "",
          option_a: "",
          option_b: "",
          option_c: "",
          option_d: "",
          correct_answer: "",
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = lessonQuiz.quiz_questions.filter(
      (q, qIndex) => qIndex !== index
    );
    setLessonQuiz({ ...lessonQuiz, quiz_questions: updatedQuestions });
  };

  return (
    <div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
        <div className="dashboard__select__heading">
          <span>Lesson</span>
        </div>
        <div className="dashboard__selector">
          <SingleSelection isSearch={true} />
        </div>
      </div>

      {lessonQuiz.quiz_questions.map((quiz, index) => (
        <div key={index} className="mt-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <div className="dashboard__form__wraper">
                <div className="dashboard__form__input">
                  <label>Question ({index + 1})</label>
                  <input
                    type="text"
                    placeholder="Enter question"
                    value={quiz.question}
                    onChange={(e) =>
                      handleInputChange(index, "question", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <button
              className="dashboard__small__btn__2 flash-card__remove__btn"
              onClick={() => removeQuestion(index)}
            >
              <i className="icofont-ui-delete" />
            </button>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center">
            {["option_a", "option_b", "option_c", "option_d"].map(
              (option, optIndex) => (
                <div key={optIndex}>
                  <div className="dashboard__form__wraper">
                    <div className="dashboard__form__input">
                      <label>{`Option ${String.fromCharCode(
                        65 + optIndex
                      )}`}</label>
                      <input
                        type="text"
                        placeholder={`Option ${String.fromCharCode(
                          65 + optIndex
                        )}`}
                        value={quiz[option]}
                        onChange={(e) =>
                          handleInputChange(index, option, e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="form__check">
                    <label>Is This Correct</label>
                    <input
                      type="checkbox"
                      checked={quiz.correct_answer === option}
                      onChange={() => handleCorrectAnswerChange(index, option)}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}

      <div className="col-xl-12 mt-4">
        <button className="dashboard__small__btn__2" onClick={addNewQuestion}>
          + Question
        </button>
      </div>

      <div className="create__course__bottom__button text-center mt-4">
        <button className="default__button">Create Lesson Quiz</button>
      </div>
    </div>
  );
};

export default CreateLessonQuiz;
