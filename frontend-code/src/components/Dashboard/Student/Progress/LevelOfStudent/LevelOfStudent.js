import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import ajaxCall from "../../../../../helpers/ajaxCall";

const LevelOfStudent = () => {
  const [testData, setTestData] = useState({
    rCorrectAnswers: [],
    lCorrectAnswers: [],
    writingTestAnswers: [],
    speakingTestAnswers: [],
    givenDiagnosticTest: {},
  });

  const [counts, setCounts] = useState({
    reading: { correct: 0, incorrect: 0, skipped: 0, band: 0 },
    listening: { correct: 0, incorrect: 0, skipped: 0, band: 0 },
    writing: { band: 0 },
    speaking: { band: 0 },
  });

  const totalQuestions =
    testData.rCorrectAnswers?.length +
    testData.lCorrectAnswers?.length +
    (testData.writingTestAnswers?.Writing?.length || 0) +
    (testData.speakingTestAnswers?.Speaking?.length || 0);

  const totalMarks =
    counts.reading.band +
    counts.listening.band +
    counts.writing.band +
    counts.speaking.band;

  const percentage =
    totalQuestions > 0 ? ((totalMarks / totalQuestions) * 100).toFixed(2) : 0;

  const calculateAnswerCounts = (studentAnswers, correctAnswers) => {
    let skip = 0,
      correct = 0,
      incorrect = 0;

    studentAnswers.forEach((item, index) => {
      const correctAnswerText = correctAnswers[index]?.answer_text?.trim();
      const studentAnswerText = item?.answer_text?.trim();

      if (!studentAnswerText) {
        skip++;
      } else if (correctAnswerText === studentAnswerText) {
        correct++;
      } else {
        incorrect++;
      }
    });

    return { skip, correct, incorrect };
  };

  const fetchFLTAnswer = useCallback(async (fltID) => {
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
        const { writing_set, speaking_set, reading_set, listening_set } =
          response.data;

        const processAnswerSet = (set, key) =>
          set?.student_answers?.[key]?.reduce(
            (acc, curr) =>
              acc.concat(
                curr.answers.sort(
                  (a, b) => a.question_number - b.question_number
                )
              ),
            []
          ) || [];
        const processCorrectSet = (set, key) =>
          set?.correct_answers?.[key]?.reduce(
            (acc, curr) =>
              acc.concat(
                curr.answers.sort(
                  (a, b) => a.question_number - b.question_number
                )
              ),
            []
          ) || [];

        const rstudentAnswers = processAnswerSet(reading_set, "Reading");
        const rcorrectAnswer = processCorrectSet(reading_set, "Reading");
        const lstudentAnswers = processAnswerSet(listening_set, "Listening");
        const lcorrectAnswer = processCorrectSet(listening_set, "Listening");

        const readingCounts = calculateAnswerCounts(
          rstudentAnswers,
          rcorrectAnswer
        );
        const listeningCounts = calculateAnswerCounts(
          lstudentAnswers,
          lcorrectAnswer
        );

        setTestData((prev) => ({
          ...prev,
          rCorrectAnswers: rcorrectAnswer,
          lCorrectAnswers: lcorrectAnswer,
          writingTestAnswers: writing_set?.student_answers,
          speakingTestAnswers: speaking_set?.student_answers,
        }));

        setCounts((prev) => ({
          ...prev,
          reading: {
            ...readingCounts,
            band: readingCounts.correct,
          },
          listening: {
            ...listeningCounts,
            band: listeningCounts.correct,
          },
        }));
      }
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    const fetchDiagnosticTest = async () => {
      try {
        const response = await ajaxCall(
          "/given-diagnostic/?name=Diagnostic",
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
          setTestData((prev) => ({
            ...prev,
            givenDiagnosticTest: response.data,
          }));
          fetchFLTAnswer(response.data?.flt_id);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchDiagnosticTest();
  }, [fetchFLTAnswer]);

  useEffect(() => {
    const writingBand = testData.writingTestAnswers?.Writing?.length || 0;
    const speakingBand = testData.speakingTestAnswers?.Speaking?.length || 0;

    setCounts((prev) => ({
      ...prev,
      writing: { band: writingBand },
      speaking: { band: speakingBand },
    }));
  }, [testData.writingTestAnswers, testData.speakingTestAnswers]);

  if (!testData.givenDiagnosticTest?.flt_name) {
    return null;
  }

  return (
    <div>
      <h4
        className="sidebar__title"
        style={{ marginBottom: "0px", marginTop: "20px" }}
      >
        Level Of Student
      </h4>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 column__custom__class">
          <div className="gridarea__wraper text-center card-background">
            <div className="gridarea__content p-2 m-2">
              <div className="gridarea__heading">
                <h3>{testData.givenDiagnosticTest?.flt_name}</h3>
                <h3>
                  Given Date:{" "}
                  {moment(testData.givenDiagnosticTest?.submitted_date).format(
                    "lll"
                  )}
                </h3>
                <h3>Percentage: {percentage}%</h3>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-center mt-2 mb-3">
                <button
                  className="default__button"
                  onClick={() =>
                    window.open(
                      `/DiagnosticTest/Answer/${testData.givenDiagnosticTest?.flt_id}`,
                      "_blank"
                    )
                  }
                >
                  View Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelOfStudent;
