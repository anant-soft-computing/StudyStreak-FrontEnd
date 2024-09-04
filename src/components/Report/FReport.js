import React, { useEffect, useState } from "react";
import ajaxCall from "../../helpers/ajaxCall";
import CheckIcon from "../UI/CheckIcon";
import CancelIcon from "../UI/CancelIcon";
import SkipIcon from "../UI/SkipIcon";
import readingBandValues from "../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../utils/bandValues/listeningBandValues";
import SmallModal from "../UI/Modal";
import { writingAssessment } from "../../utils/assessment/writingAssessment";
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
      <div className="row mt-4">
        <div className="col-xl-12 col-lg-12 AnswerCard">
          <div className="blog__details__content__wraper">
            <div>
              {/* Reading */}
              <div className="dashboard__section__title">
                <h4 className="sidebar__title">Reading :- </h4>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="dashboard__table table-responsive table__height">
                    <table>
                      <thead>
                        <tr>
                          <th>Question No.</th>
                          <th>Correct Answer</th>
                          <th>Your Answer</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {rCorrectAnswers?.map(
                          ({ id, question_number, answer_text }, index) => (
                            <tr
                              key={id}
                              className={`${
                                index % 2 === 0 ? "" : "dashboard__table__row"
                              }`}
                            >
                              <td className="text-dark">{question_number}.</td>
                              <td className="text-dark">
                                <div className="dashboard__table__star">
                                  {answer_text}
                                </div>
                              </td>
                              <td className="text-dark">
                                {rStudentAnswers?.length > 0 &&
                                  rStudentAnswers[index]?.answer_text}
                              </td>
                              <td className="text-dark">
                                {!rStudentAnswers[index]?.answer_text ? (
                                  <SkipIcon />
                                ) : rCorrectAnswers[
                                    index
                                  ]?.answer_text.includes(" OR ") ? (
                                  rCorrectAnswers[index]?.answer_text
                                    .split(" OR ")
                                    .map((option) =>
                                      option.trim().toLowerCase()
                                    )
                                    .includes(
                                      rStudentAnswers[
                                        index
                                      ]?.answer_text.toLowerCase()
                                    ) ? (
                                    <CheckIcon />
                                  ) : (
                                    <CancelIcon />
                                  )
                                ) : rCorrectAnswers[
                                    index
                                  ]?.answer_text.includes(" AND ") ? (
                                  rCorrectAnswers[index]?.answer_text
                                    .split(" AND ")
                                    .map((option) =>
                                      option.trim().toLowerCase()
                                    )
                                    .every((option) =>
                                      rStudentAnswers[index]?.answer_text
                                        .toLowerCase()
                                        .includes(option)
                                    ) ? (
                                    <CheckIcon />
                                  ) : (
                                    <CancelIcon />
                                  )
                                ) : rStudentAnswers[index]?.answer_text ===
                                  rCorrectAnswers[index]?.answer_text ? (
                                  <CheckIcon />
                                ) : (
                                  <CancelIcon />
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Writing */}
              <div className="dashboard__section__title mt-4">
                <h4 className="sidebar__title">Writing :-</h4>
              </div>
              <div className="row">
                <div>
                  <div className="writing__exam">
                    <div className="dashboard__section__title">
                      <h4 className="sidebar__title">AI Assessment</h4>
                    </div>
                    {writingTestAnswers?.Writing?.map((item, index) => {
                      const assessments = writingAssessment(
                        item?.ai_assessment
                      );
                      return (
                        <div key={index}>
                          <div className="gptResponse">
                            <h4>({index + 1}) Explanation:</h4>
                            {Object.keys(assessments)?.map((section, i) => (
                              <div key={i}>
                                <br />
                                <strong>{section}</strong>
                                <div>{assessments[section]}</div>
                              </div>
                            ))}
                          </div>
                          <br />
                        </div>
                      );
                    })}
                  </div>
                  <div className="writing__exam">
                    <div className="dashboard__section__title">
                      <h4 className="sidebar__title">Tutor Assessment</h4>
                    </div>
                    {writingTestAnswers?.Writing?.some(
                      (item) => item?.tutor_assessment
                    ) ? (
                      writingTestAnswers?.Writing?.map((item, index) => (
                        <div key={index}>
                          <div className="gptResponse">
                            ({index + 1}). {item.tutor_assessment}
                          </div>
                          <br />
                        </div>
                      ))
                    ) : (
                      <h5 className="text-center text-danger">
                        Assessment By Tutor Will Be Displayed Here
                      </h5>
                    )}
                  </div>
                </div>
              </div>

              {/* Listening */}
              <div className="dashboard__section__title mt-4">
                <h4 className="sidebar__title">Listening :-</h4>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="dashboard__table table-responsive table__height">
                    <table>
                      <thead>
                        <tr>
                          <th>Question No.</th>
                          <th>Correct Answer</th>
                          <th>Your Answer</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {lCorrectAnswers?.map(
                          ({ id, question_number, answer_text }, index) => (
                            <tr
                              key={id}
                              className={`${
                                index % 2 === 0 ? "" : "dashboard__table__row"
                              }`}
                            >
                              <td className="text-dark">{question_number}.</td>
                              <td className="text-dark">
                                <div className="dashboard__table__star">
                                  {answer_text}
                                </div>
                              </td>
                              <td className="text-dark">
                                {lStudentAnswers?.length > 0 &&
                                  lStudentAnswers[index]?.answer_text}
                              </td>
                              <td className="text-dark">
                                {!lStudentAnswers[index]?.answer_text ? (
                                  <SkipIcon />
                                ) : lCorrectAnswers[
                                    index
                                  ]?.answer_text.includes(" OR ") ? (
                                  lCorrectAnswers[index]?.answer_text
                                    .split(" OR ")
                                    .map((option) =>
                                      option.trim().toLowerCase()
                                    )
                                    .includes(
                                      lStudentAnswers[
                                        index
                                      ]?.answer_text.toLowerCase()
                                    ) ? (
                                    <CheckIcon />
                                  ) : (
                                    <CancelIcon />
                                  )
                                ) : lCorrectAnswers[
                                    index
                                  ]?.answer_text.includes(" AND ") ? (
                                  lCorrectAnswers[index]?.answer_text
                                    .split(" AND ")
                                    .map((option) =>
                                      option.trim().toLowerCase()
                                    )
                                    .every((option) =>
                                      lStudentAnswers[index]?.answer_text
                                        .toLowerCase()
                                        .includes(option)
                                    ) ? (
                                    <CheckIcon />
                                  ) : (
                                    <CancelIcon />
                                  )
                                ) : lStudentAnswers[index]?.answer_text ===
                                  lCorrectAnswers[index]?.answer_text ? (
                                  <CheckIcon />
                                ) : (
                                  <CancelIcon />
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Speaking */}
              <div className="dashboard__section__title mt-4">
                <h4 className="sidebar__title">Speaking :-</h4>
              </div>
              <div className="row">
                <div className="col-xl-12">
                  <div className="dashboard__table table-responsive table__height">
                    <table>
                      <thead>
                        <tr>
                          <th>Question Number</th>
                          <th>Answer Audio</th>
                          <th>AI Assessment</th>
                          <th>Tutor Assessment</th>
                          <th>Band</th>
                        </tr>
                      </thead>
                      <tbody>
                        {speakingTestAnswers?.Speaking?.map((item, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0 ? "" : "dashboard__table__row"
                            }`}
                          >
                            <td>{index + 1}</td>
                            <td>
                              <audio controls>
                                <source
                                  src={`https://studystreak.in/${item?.answer_audio}`}
                                  type="audio/mpeg"
                                />
                              </audio>
                            </td>
                            <td>
                              {item.ai_assessment ? (
                                <button
                                  className="take-test"
                                  onClick={() =>
                                    handleOpenModal(item.ai_assessment)
                                  }
                                >
                                  View
                                </button>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>
                              {item.tutor_assessment ? (
                                <button
                                  className="take-test"
                                  onClick={() =>
                                    handleOpenTAModal(item.tutor_assessment)
                                  }
                                >
                                  View
                                </button>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td>{item.band || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
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
