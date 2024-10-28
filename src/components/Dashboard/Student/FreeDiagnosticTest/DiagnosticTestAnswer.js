import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import SmallModal from "../../../UI/Modal";
import { speakingAssessment } from "../../../../utils/assessment/speakingAssessment";
import QuestionCard from "../../../Exam-Answer/FLTAnswer/QuestionCard";
import WritingAnswerTable from "../../../Exam-Answer/AnswerTable/WritingAnswerTable";
import SpeakingAnswerTable from "../../../Exam-Answer/AnswerTable/SpeakingAnswerTable";
import SkipIcon from "../../../UI/SkipIcon";
import CheckIcon from "../../../UI/CheckIcon";
import CancelIcon from "../../../UI/CancelIcon";

const DiagnosticTestAnswer = () => {
  const { examId } = useParams();
  const [examName, setExamName] = useState("");
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

  const [counts, setCounts] = useState({
    reading: { correct: 0, incorrect: 0, skipped: 0, band: 0 },
    listening: { correct: 0, incorrect: 0, skipped: 0, band: 0 },
    writing: { band: 0 },
    speaking: { band: 0 },
  });

  const totalQuestions =
    rCorrectAnswers?.length +
    lCorrectAnswers?.length +
    (writingTestAnswers?.Writing?.length || 0) +
    (speakingTestAnswers?.Speaking?.length || 0);

  const totalMarks =
    counts.reading.band +
    counts.listening.band +
    counts.writing.band +
    counts.speaking.band;

  const percentage =
    totalQuestions > 0 ? ((totalMarks / totalQuestions) * 100).toFixed(2) : 0;

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
          `/flt-answers/${examId}/`,
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
              band: rCorrect,
            },
            listening: {
              correct: lCorrect,
              incorrect: lIncorrect,
              skipped: lSkip,
              band: lCorrect,
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
  }, [examId]);

  useEffect(() => {
    const writingBand = writingTestAnswers?.Writing?.length || 0;
    const speakingBand = speakingTestAnswers?.Speaking?.length || 0;

    setCounts((prev) => ({
      ...prev,
      writing: { band: writingBand },
      speaking: { band: speakingBand },
    }));
  }, [writingTestAnswers, speakingTestAnswers, setCounts]);

  return (
    <>
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="blogarea__2 sp_top_100 sp_bottom_100">
            <div className="container">
              <div className="row">
                <div className="col-xl-12 col-lg-12 AnswerCard">
                  <div className="blog__details__content__wraper">
                    <h4 className="sidebar__title">
                      Solution For : {examName}
                    </h4>
                    <QuestionCard counts={counts} />
                    <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                      <div
                        className="flt-band-card"
                        style={{
                          backgroundColor: "#dcdcdc",
                        }}
                      >
                        <div className="text-center">Reading</div>
                        <div className="text-center">
                          {counts?.reading?.band}
                        </div>
                      </div>
                      <div
                        className="flt-band-card"
                        style={{
                          backgroundColor: "#dcdcdc",
                        }}
                      >
                        <div className="text-center">Writing</div>
                        <div className="text-center">
                          {counts?.writing?.band}
                        </div>
                      </div>
                      <div
                        className="flt-band-card"
                        style={{
                          backgroundColor: "#dcdcdc",
                        }}
                      >
                        <div className="text-center">Listening</div>
                        <div className="text-center">
                          {counts?.listening?.band}
                        </div>
                      </div>
                      <div
                        className="flt-band-card"
                        style={{
                          backgroundColor: "#dcdcdc",
                        }}
                      >
                        <div className="text-center">Speaking</div>
                        <div className="text-center">
                          {counts?.speaking?.band}
                        </div>
                      </div>
                      <div className="text-center d-flex align-items-center">
                        =
                      </div>
                      <div
                        className="flt-band-card"
                        style={{
                          backgroundColor: "#dcdcdc",
                        }}
                      >
                        <div className="text-center">Marks</div>
                        <div className="text-center">
                          {totalMarks} / {totalQuestions}
                        </div>
                      </div>
                      <div
                        className="flt-band-card"
                        style={{
                          backgroundColor: "#dcdcdc",
                        }}
                      >
                        <div className="text-center">Percentage</div>
                        <div className="text-center">{percentage} %</div>
                      </div>
                    </div>
                    
                    {/* Reading */}
                    <div className="writing__exam">
                      <div className="dashboard__section__title">
                        <h4 className="sidebar__title">Reading</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="dashboard__table table-responsive">
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
                                {rCorrectAnswers.map(
                                  ({ id, answer_text }, index) => {
                                    let icon;
                                    const studentAnswerText =
                                      rStudentAnswers?.[
                                        index
                                      ]?.answer_text?.trim();
                                    const correctAnswerText =
                                      answer_text?.trim();

                                    if (!studentAnswerText) {
                                      icon = <SkipIcon />;
                                    } else {
                                      icon =
                                        studentAnswerText ===
                                        correctAnswerText ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        );
                                    }
                                    return (
                                      <tr
                                        key={id}
                                        className={`${
                                          index % 2 === 0
                                            ? ""
                                            : "dashboard__table__row"
                                        }`}
                                      >
                                        <td className="text-dark">
                                          {index + 1}.
                                        </td>
                                        <td className="text-dark">
                                          <div className="dashboard__table__star">
                                            {correctAnswerText}
                                          </div>
                                        </td>
                                        <td className="text-dark">
                                          {studentAnswerText}
                                        </td>
                                        <td className="text-dark">{icon}</td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Writing */}
                    <div className="dashboard__section__title mt-4">
                      <h4 className="sidebar__title">Writing</h4>
                    </div>
                    <WritingAnswerTable data={writingTestAnswers?.Writing} />

                    {/* Listening */}
                    <div className="writing__exam">
                      <div className="dashboard__section__title">
                        <h4 className="sidebar__title">Listening</h4>
                      </div>
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="dashboard__table table-responsive">
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
                                {lCorrectAnswers.map(
                                  ({ id, answer_text }, index) => {
                                    let icon;
                                    const studentAnswerText =
                                      lStudentAnswers?.[
                                        index
                                      ]?.answer_text?.trim();
                                    const correctAnswerText =
                                      answer_text?.trim();

                                    if (!studentAnswerText) {
                                      icon = <SkipIcon />;
                                    } else {
                                      icon =
                                        studentAnswerText ===
                                        correctAnswerText ? (
                                          <CheckIcon />
                                        ) : (
                                          <CancelIcon />
                                        );
                                    }
                                    return (
                                      <tr
                                        key={id}
                                        className={`${
                                          index % 2 === 0
                                            ? ""
                                            : "dashboard__table__row"
                                        }`}
                                      >
                                        <td className="text-dark">
                                          {index + 1}.
                                        </td>
                                        <td className="text-dark">
                                          <div className="dashboard__table__star">
                                            {correctAnswerText}
                                          </div>
                                        </td>
                                        <td className="text-dark">
                                          {studentAnswerText}
                                        </td>
                                        <td className="text-dark">{icon}</td>
                                      </tr>
                                    );
                                  }
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

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

export default DiagnosticTestAnswer;
