import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";

const ScoreCard = () => {
  const [miniTestData, setMiniTestData] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/test-submission/?test_type=exam_block&records=1",
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
          setMiniTestData(response?.data);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return (
    <>
      <div className="col-xl-6 column__custom__class">
        <div className="gridarea__wraper card-background">
          <div className="gridarea__content">
            <div className="gridarea__heading">
              <h6>Your Latest Mini Test Band Score</h6>
            </div>
            <div className="gridarea__price d-flex gap-2 mb-0">
              <h3>
                {miniTestData?.exam_name} - {miniTestData?.band}
              </h3>
            </div>
            <div className="gridarea__bottom">
              <div className="gridarea__small__content">
                <Link
                  to={
                    miniTestData.exam_type === "Writing" ||
                    miniTestData.exam_type === "Speaking"
                      ? `/assessment/${miniTestData?.exam_block}`
                      : `/exam-answer/${miniTestData?.exam_block}`
                  }
                  state={{ examType: miniTestData?.exam_type }}
                >
                  <h6>View Full Report {">>"}</h6>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-6 column__custom__class">
        <div className="gridarea__wraper card-background">
          <div className="gridarea__content">
            <div className="gridarea__heading">
              <h6>Your Latest Full Length Test Band Score"</h6>
            </div>
            <div className="gridarea__price d-flex gap-2 mb-0">
              <h3>Full Length Test - Overall 7.0</h3>
            </div>
            <div className="gridarea__bottom">
              <div className="gridarea__small__content">
                <Link to="">
                  <h6>View Full Report {">>"}</h6>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScoreCard;