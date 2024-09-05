import React, { useEffect, useState } from "react";
import ajaxCall from "../../helpers/ajaxCall";
import SmallModal from "../UI/Modal";
import readingBandValues from "../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../utils/bandValues/listeningBandValues";
import AnswerTable from "../Exam-Answer/AnswerTable/AnswerTable";
import WritingAnswerTable from "../Exam-Answer/AnswerTable/WritingAnswerTable";
import SpeakingAnswerTable from "../Exam-Answer/AnswerTable/SpeakingAnswerTable";
import { speakingAssessment } from "../../utils/assessment/speakingAssessment";

const FReport = ({ fltID, setCounts, setExamName }) => {
  const [rStudentAnswers, setRStudentAnswers] = useState([]);
  const [rCorrectAnswers, setRCorrectAnswers] = useState([]);

  const [lStudentAnswers, setLStudentAnswers] = useState([]);
  const [lCorrectAnswers, setLCorrectAnswers] = useState([]);

  const [writingTestAnswers, setWritingTestAnswers] = useState([]);

  const [speakingTestAnswers, setSpeakingTestAnswers] = useState([]);

  const [sAssessment, setSAssessment] = useState("");
  const [sTAssessment, setSTAssessment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `/flt-answers/${fltID}/`,
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
          setExamName(response?.data?.name);
          const { writing_set, speaking_set, reading_set, listening_set } =
            response.data;

          setWritingTestAnswers(writing_set?.student_answers);
          setSpeakingTestAnswers(speaking_set?.student_answers);

          let rstudentAnswers = [];
          let rcorrectAnswer = [];
          let lstudentAnswers = [];
          let lcorrectAnswer = [];

          // Reading
          if (
            reading_set?.student_answers?.Reading &&
            reading_set?.correct_answers?.Reading
          ) {
            rstudentAnswers = reading_set.student_answers.Reading.reduce(
              (acc, curr) => acc.concat(curr.answers),
              []
            );
            rcorrectAnswer = reading_set.correct_answers.Reading.reduce(
              (acc, curr) => acc.concat(curr.answers),
              []
            );
          }

          // Listening
          if (
            listening_set?.student_answers?.Listening &&
            listening_set?.correct_answers?.Listening
          ) {
            lstudentAnswers = listening_set.student_answers.Listening.reduce(
              (acc, curr) => acc.concat(curr.answers),
              []
            );
            lcorrectAnswer = listening_set.correct_answers.Listening.reduce(
              (acc, curr) => acc.concat(curr.answers),
              []
            );
          }

          // Calculate counts for Reading
          let rSkip = 0,
            rCorrect = 0,
            rIncorrect = 0;
          rstudentAnswers.forEach((item, index) => {
            const correctAnswerText =
              rcorrectAnswer[index]?.answer_text?.trim();
            const studentAnswerText = item?.answer_text?.trim();

            if (!studentAnswerText) {
              rSkip++;
            } else if (correctAnswerText?.includes(" OR ")) {
              const correctOptions = correctAnswerText
                .split(" OR ")
                .map((option) => option.trim());
              if (correctOptions.includes(studentAnswerText)) {
                rCorrect++;
              } else {
                rIncorrect++;
              }
            } else if (correctAnswerText?.includes(" AND ")) {
              const correctOptions = correctAnswerText
                .split(" AND ")
                .map((option) => option.trim());
              if (
                correctOptions.every((option) =>
                  studentAnswerText.includes(option)
                )
              ) {
                rCorrect++;
              } else {
                rIncorrect++;
              }
            } else {
              if (correctAnswerText === studentAnswerText) {
                rCorrect++;
              } else {
                rIncorrect++;
              }
            }
          });

          // Calculate counts for Listening
          let lSkip = 0,
            lCorrect = 0,
            lIncorrect = 0;
          lstudentAnswers.forEach((item, index) => {
            const correctAnswerText =
              lcorrectAnswer[index]?.answer_text?.trim();
            const studentAnswerText = item?.answer_text?.trim();

            if (!studentAnswerText) {
              lSkip++;
            } else if (correctAnswerText?.includes(" OR ")) {
              const correctOptions = correctAnswerText
                .split(" OR ")
                .map((option) => option.trim());
              if (correctOptions.includes(studentAnswerText)) {
                lCorrect++;
              } else {
                lIncorrect++;
              }
            } else if (correctAnswerText?.includes(" AND ")) {
              const correctOptions = correctAnswerText
                .split(" AND ")
                .map((option) => option.trim());
              if (
                correctOptions.every((option) =>
                  studentAnswerText.includes(option)
                )
              ) {
                lCorrect++;
              } else {
                lIncorrect++;
              }
            } else {
              if (correctAnswerText === studentAnswerText) {
                lCorrect++;
              } else {
                lIncorrect++;
              }
            }
          });

          // Set state
          setRStudentAnswers(rstudentAnswers);
          setRCorrectAnswers(rcorrectAnswer);
          setLStudentAnswers(lstudentAnswers);
          setLCorrectAnswers(lcorrectAnswer);

          setCounts((prev) => ({
            ...prev,
            reading: {
              correct: rCorrect,
              incorrect: rIncorrect,
              skipped: rSkip,
              band: readingBandValues[rCorrect],
            },
            listening: {
              correct: lCorrect,
              incorrect: lIncorrect,
              skipped: lSkip,
              band: listeningBandValues[lCorrect],
            },
          }));
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [fltID, setCounts, setExamName]);

  const handleOpenModal = (content) => {
    setSAssessment(content);
    setIsModalOpen(true);
  };

  const handleOpenTAModal = (content) => {
    setSTAssessment(content);
    setIsTutorModalOpen(true);
  };

  const calculateAverageBand = (answers) => {
    const bandScores = answers
      ?.map((item) => (item.band !== null ? parseFloat(item.band) : 0))
      .filter((band) => !isNaN(band));
    if (bandScores?.length > 0) {
      const sum = bandScores?.reduce((a, b) => a + b, 0);
      return (sum / bandScores?.length).toFixed(1);
    }
    return 0;
  };

  useEffect(() => {
    const writingBand = calculateAverageBand(writingTestAnswers?.Writing);
    const speakingBand = calculateAverageBand(speakingTestAnswers?.Speaking);

    setCounts((prev) => ({
      ...prev,
      writing: { band: writingBand },
      speaking: { band: speakingBand },
    }));
  }, [writingTestAnswers, speakingTestAnswers, setCounts]);

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 AnswerCard">
          <div className="blog__details__content__wraper">
            {/* Reading */}
            <AnswerTable
              correctAnswer={rCorrectAnswers}
              studentAnswer={rStudentAnswers}
              tableTitle="Reading"
            />

            {/* Writing */}
            <div className="dashboard__section__title mt-4">
              <h4 className="sidebar__title">Writing</h4>
            </div>
            <WritingAnswerTable data={writingTestAnswers?.Writing} />

            {/* Listening */}
            <AnswerTable
              correctAnswer={lCorrectAnswers}
              studentAnswer={lStudentAnswers}
              tableTitle="Listening"
            />

            {/* Speaking */}
            <div className="dashboard__section__title mt-4">
              <h4 className="sidebar__title">Speaking</h4>
            </div>
            <SpeakingAnswerTable
              data={speakingTestAnswers?.Speaking}
              viewAIA={handleOpenModal}
              viewTA={handleOpenTAModal}
            />
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

export default FReport;
