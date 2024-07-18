import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";

const ScoreCard = () => {
  const [fltData, setFltData] = useState({});
  const [practiceTestData, setPracticeTestData] = useState({});

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
        setData(response.data[0]);
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

  return (
    <>
      <div className="col-xl-6 column__custom__class">
        <div className="gridarea__wraper card-background">
          <div className="gridarea__content">
            <div className="gridarea__heading">
              <h6>Your Latest Given Practice Test</h6>
            </div>
            <div className="gridarea__price d-flex gap-2 mb-0">
              <h3>
                {practiceTestData?.practise_set_name} -{" "}
                {practiceTestData?.practise_set_type}
              </h3>
            </div>
            <div className="gridarea__bottom">
              <div className="gridarea__small__content">
                <Link
                  to={
                    practiceTestData.practise_set_type === "Writing" ||
                    practiceTestData.practise_set_type === "Speaking"
                      ? `/practice-assessment/${practiceTestData?.practise_set}`
                      : `/exam-practice-test-answer/${practiceTestData?.practise_set}`
                  }
                  state={{ examType: practiceTestData?.practise_set_type }}
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
              <h6>Your Latest Full Length Test </h6>
            </div>
            <div className="gridarea__price d-flex gap-2 mb-0">
              <h3>{fltData?.flt_set_name}</h3>
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