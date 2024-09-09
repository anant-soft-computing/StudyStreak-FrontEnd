import React, { useEffect, useState } from "react";
import ajaxCall from "../../helpers/ajaxCall";
import SmallModal from "../UI/Modal";
import AnswerTable from "../Exam-Answer/AnswerTable/AnswerTable";
import { speakingAssessment } from "../../utils/assessment/speakingAssessment";
import WritingAnswerTable from "../Exam-Answer/AnswerTable/WritingAnswerTable";
import SpeakingAnswerTable from "../Exam-Answer/AnswerTable/SpeakingAnswerTable";

const Report = ({ paperId, testType, testID, setExamName }) => {
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [writingAnswers, setWritingAnswers] = useState([]);
  const [speakingAnswers, setSpeakingAnswers] = useState([]);

  const [sAssessment, setSAssessment] = useState("");
  const [sTAssessment, setSTAssessment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);

  const handleOpenModal = (content) => {
    setSAssessment(content);
    setIsModalOpen(true);
  };

  const handleOpenTAModal = (content) => {
    setSTAssessment(content);
    setIsTutorModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `/practice-answers/${paperId || testID}/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          if (testType === "Speaking") {
            const studentAnswers = response?.data?.student_answers?.Speaking;
            setSpeakingAnswers(studentAnswers);
          }
          if (testType === "Writing") {
            const studentAnswers = response?.data?.student_answers?.Writing;
            setWritingAnswers(studentAnswers);
          }
          setExamName(response?.data?.name);

          let studentAnswers = [];
          let correctAnswer = [];

          if (
            testType === "Reading" &&
            response.data?.student_answers?.Reading &&
            response.data?.correct_answers?.Reading
          ) {
            response.data.student_answers.Reading.forEach((block) => {
              studentAnswers = studentAnswers.concat(
                block.answers.sort(
                  (a, b) => a.question_number - b.question_number
                )
              );
            });

            response.data.correct_answers.Reading.forEach((block) => {
              correctAnswer = correctAnswer.concat(
                block.answers.sort(
                  (a, b) => a.question_number - b.question_number
                )
              );
            });
          } else if (
            testType === "Listening" &&
            response.data?.student_answers?.Listening &&
            response.data?.correct_answers?.Listening
          ) {
            response.data.student_answers.Listening.forEach((block) => {
              studentAnswers = studentAnswers.concat(
                block.answers.sort(
                  (a, b) => a.question_number - b.question_number
                )
              );
            });

            response.data.correct_answers.Listening.forEach((block) => {
              correctAnswer = correctAnswer.concat(
                block.answers.sort(
                  (a, b) => a.question_number - b.question_number
                )
              );
            });
          }
          setStudentAnswers(studentAnswers);
          setCorrectAnswer(correctAnswer);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [testType, paperId, testID]);

  return (
    <>
      <div className="row mt-4">
        <div className="col-xl-12 col-lg-12 AnswerCard">
          <div className="blog__details__content__wraper">
            {testType === "Writing" && (
              <WritingAnswerTable data={writingAnswers} />
            )}
            {(testType === "Reading" || testType === "Listening") && (
              <AnswerTable
                correctAnswer={correctAnswer}
                studentAnswer={studentAnswers}
              />
            )}
            {testType === "Speaking" && (
              <SpeakingAnswerTable
                data={speakingAnswers}
                viewAIA={handleOpenModal}
                viewTA={handleOpenTAModal}
              />
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SmallModal
          size="lg"
          centered
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          {Object.keys(speakingAssessment(sAssessment)).map(
            (section, index) => (
              <div key={index}>
                <br />
                <strong>{section}</strong>
                <div>{speakingAssessment(sAssessment)[section]}</div>
              </div>
            )
          )}
        </SmallModal>
      )}
      {isTutorModalOpen && (
        <SmallModal
          size="lg"
          centered
          isOpen={isTutorModalOpen}
          onClose={() => setIsTutorModalOpen(false)}
        >
          {sTAssessment}
        </SmallModal>
      )}
    </>
  );
};

export default Report;
