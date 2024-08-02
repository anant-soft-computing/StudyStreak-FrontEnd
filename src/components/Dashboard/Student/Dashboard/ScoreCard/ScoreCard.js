import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";
import readingBandValues from "../../../../../utils/bandValues/ReadingBandValues";
import listeningBandValues from "../../../../../utils/bandValues/listeningBandValues";

const ScoreCard = () => {
  const [band, setBand] = useState(0);
  const [fltData, setFltData] = useState([]);
  const [practiceTestData, setPracticeTestData] = useState([]);

  const fetchTestData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
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
        setData(response?.data);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchTestData(
      "/test-submission/?test_type=practise_set&records=1",
      setPracticeTestData
    );
  }, []);

  useEffect(() => {
    fetchTestData("/test-submission/?test_type=flt&records=1", setFltData);
  }, []);

  useEffect(() => {
    const fetchPracticeAnswers = async () => {
      try {
        const response = await ajaxCall(
          `/practice-answers/${practiceTestData?.[0]?.practise_set}/`,
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
          const testType = practiceTestData?.[0].practise_set_type;
          const studentAnswers = response?.data?.student_answers[testType];

          if (testType === "Writing" || testType === "Speaking") {
            const totalBand = studentAnswers.reduce(
              (sum, item) => sum + parseFloat(item.band),
              0
            );
            setBand(totalBand / studentAnswers.length);
          } else if (testType === "Reading" || testType === "Listening") {
            handleReadingOrListening(response.data, testType);
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const handleReadingOrListening = (data, type) => {
      const studentAnswers = data.student_answers[type].reduce(
        (acc, curr) =>
          acc.concat(
            curr.answers.sort((a, b) => a.question_number - b.question_number)
          ),
        []
      );
      const correctAnswer = data.correct_answers[type].reduce(
        (acc, curr) =>
          acc.concat(
            curr.answers.sort((a, b) => a.question_number - b.question_number)
          ),
        []
      );

      let correct = 0;
      studentAnswers.forEach((item, index) => {
        const correctAnswerText = correctAnswer[index]?.answer_text?.trim();
        const studentAnswerText = item.answer_text?.trim();

        if (correctAnswerText?.includes(" OR ")) {
          const correctOptions = correctAnswerText
            .split(" OR ")
            .map((option) => option.trim());
          if (correctOptions.includes(studentAnswerText)) {
            correct++;
          }
        } else if (correctAnswerText?.includes(" AND ")) {
          const correctOptions = correctAnswerText
            .split(" AND ")
            .map((option) => option.trim());
          if (
            correctOptions.every((option) =>
              studentAnswerText?.includes(option)
            )
          ) {
            correct++;
          }
        } else {
          if (correctAnswerText === studentAnswerText) {
            correct++;
          }
        }
      });

      if (type === "Reading") {
        setBand(readingBandValues[correct]);
      } else if (type === "Listening") {
        setBand(listeningBandValues[correct]);
      }
    };

    if (practiceTestData?.[0]?.practise_set) {
      fetchPracticeAnswers();
    }
  }, [practiceTestData]);

  return (
    <>
      <div className="col-xl-6 column__custom__class">
        <div className="gridarea__wraper card-background">
          <div className="gridarea__content">
            <div className="gridarea__heading">
              <h6>Your Latest Given Practice Test</h6>
            </div>
            {practiceTestData?.length > 0 ? (
              <div>
                <div className="gridarea__price d-flex align-items-center gap-2 mb-0">
                  <h3>
                    {practiceTestData?.[0]?.practise_set_name}, Band : {band}
                  </h3>
                </div>
                <div className="gridarea__bottom">
                  <div className="gridarea__small__content">
                    <Link
                      to={
                        practiceTestData?.[0]?.practise_set_name &&
                        "/praticeTest-report"
                      }
                      state={{ latestBand: band }}
                    >
                      <h6>View Full Report {">>"}</h6>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <h6 className="text-center text-danger">
                Not Given Any Practice Test !!
              </h6>
            )}
          </div>
        </div>
      </div>
      <div className="col-xl-6 column__custom__class">
        <div className="gridarea__wraper card-background">
          <div className="gridarea__content">
            <div className="gridarea__heading">
              <h6>Your Latest Full Length Test </h6>
            </div>
            {fltData?.length > 0 ? (
              <div>
                <div className="gridarea__price d-flex gap-2 mb-0">
                  <h3>{fltData?.[0]?.flt_set_name}</h3>
                </div>
                <div className="gridarea__bottom">
                  <div className="gridarea__small__content">
                    <Link
                      to={
                        fltData?.[0]?.flt_set_name && "/full-length-test-report"
                      }
                    >
                      <h6>View Full Report {">>"}</h6>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <h6 className="text-center text-danger">
                Not Given Any Latest Full Length Test !!
              </h6>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreCard;
