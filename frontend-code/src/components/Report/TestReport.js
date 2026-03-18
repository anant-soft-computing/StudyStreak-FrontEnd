import React, { useState, useEffect, useCallback } from "react";
import Loading from "../UI/Loading";
import Table from "../UI/Table";
import Report from "./Report";
import listeningBandValues from "../../utils/bandValues/listeningBandValues";
import readingBandValues from "../../utils/bandValues/ReadingBandValues";
import ajaxCall from "../../helpers/ajaxCall";

const TestReport = ({
  reportData,
  testType,
  isLoading,
  setCounts,
  setExamName,
  testID,
  setActiveTest,
  activeTest,
}) => {
  const [rowsData, setRowsData] = useState([]);

  useEffect(() => {
    const initialData = reportData.map((data, index) => ({
      paperId: data.IELTS.id,
      no: index + 1,
      Name: data.IELTS.Name,
    }));
    setRowsData(initialData);
  }, [reportData]);

  const fetchData = useCallback(
    async (paperId) => {
      try {
        const response = await ajaxCall(
          `/practice-answers/${paperId}/`,
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
          let studentAnswers = [],
            correctAnswer = [];
          let skip = 0,
            correct = 0,
            incorrect = 0,
            band = 0;

          if (testType === "Speaking" || testType === "Writing") {
            const answersKey = testType === "Speaking" ? "Speaking" : "Writing";
            studentAnswers = response?.data?.student_answers?.[answersKey];
            const totalBand = studentAnswers?.reduce((sum, item) => {
              const bandValue = item.band !== null ? parseFloat(item.band) : 0;
              return sum + bandValue;
            }, 0);
            band = totalBand / studentAnswers?.length;
          } else {
            if (
              testType === "Reading" &&
              response.data?.student_answers?.Reading &&
              response.data?.correct_answers?.Reading
            ) {
              response?.data?.student_answers?.Reading?.forEach((block) => {
                studentAnswers = studentAnswers.concat(
                  block.answers.sort(
                    (a, b) => a.question_number - b.question_number
                  )
                );
              });
              response.data?.correct_answers?.Reading?.forEach((block) => {
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
              response?.data?.student_answers?.Listening?.forEach((block) => {
                studentAnswers = studentAnswers.concat(
                  block.answers.sort(
                    (a, b) => a.question_number - b.question_number
                  )
                );
              });
              response.data?.correct_answers?.Listening?.forEach((block) => {
                correctAnswer = correctAnswer.concat(
                  block.answers.sort(
                    (a, b) => a.question_number - b.question_number
                  )
                );
              });
            }

            studentAnswers?.forEach((item, index) => {
              const correctAnswerText =
                correctAnswer[index]?.answer_text?.trim();
              const studentAnswerText = item?.answer_text?.trim();

              if (!studentAnswerText) {
                skip++;
              } else if (correctAnswerText?.includes(" OR ")) {
                const correctOptions = correctAnswerText
                  ?.split(" OR ")
                  ?.map((option) => option?.trim());
                if (correctOptions?.includes(studentAnswerText)) {
                  correct++;
                } else {
                  incorrect++;
                }
              } else if (correctAnswerText?.includes(" AND ")) {
                const correctOptions = correctAnswerText
                  ?.split(" AND ")
                  ?.map((option) => option?.trim());
                if (
                  correctOptions?.every((option) =>
                    studentAnswerText?.includes(option)
                  )
                ) {
                  correct++;
                } else {
                  incorrect++;
                }
              } else {
                if (correctAnswerText === studentAnswerText) {
                  correct++;
                } else {
                  incorrect++;
                }
              }
            });
            band =
              testType === "Reading"
                ? readingBandValues[correct]
                : listeningBandValues[correct];
          }
          setCounts((prev) => ({
            ...prev,
            correct: correct,
            incorrect: incorrect,
            skipped: skip,
            band: band,
          }));
          return { paperId };
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    [setCounts, testType]
  );

  useEffect(() => {
    if (testID) {
      fetchData(testID);
    }
  }, [fetchData, testID]);

  const viewReport = async (params) => {
    const paperId = params.data.paperId;
    const result = await fetchData(paperId);

    if (result) {
      setActiveTest(paperId);
    }
  };

  const columns = [
    {
      headerName: "No",
      field: "no",
      width: 110,
      filter: true,
      cellRenderer: (params) => {
        return <div>{`${params.data.no}`}</div>;
      },
    },
    {
      headerName: "Name",
      field: "Name",
      cellRenderer: (params) => {
        return <div>{params.data.Name}</div>;
      },
      filter: true,
      width: 355,
    },
    {
      headerName: "View Report",
      field: "button",
      cellRenderer: (params) => {
        const paperId = params.data.paperId;
        return (
          <button
            className="take-test"
            onClick={() => viewReport(params)}
            style={
              paperId === activeTest
                ? { backgroundColor: "green", border: "1px solid green" }
                : { backgroundColor: "#01579b", border: "1px solid #01579b" }
            }
          >
            View Report
          </button>
        );
      },
      width: 260,
    },
  ];

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : reportData.length > 0 ? (
        <>
          <div className="col-xl-6">
            <Table rowData={rowsData} columnDefs={columns} />
          </div>
          {activeTest && (
            <Report
              testID={testID}
              paperId={activeTest}
              testType={testType}
              setExamName={setExamName}
            />
          )}
        </>
      ) : (
        <h5 className="text-center text-danger">{`No ${testType} Report Available !!`}</h5>
      )}
    </div>
  );
};

export default TestReport;
