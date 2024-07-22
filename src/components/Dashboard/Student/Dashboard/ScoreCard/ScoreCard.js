import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";

const ScoreCard = () => {
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
                <div className="gridarea__price d-flex gap-2 mb-0">
                  <h3>
                    {practiceTestData?.[0]?.practise_set_name} -{" "}
                    {practiceTestData?.[0].practise_set_type}
                  </h3>
                </div>
                <div className="gridarea__bottom">
                  <div className="gridarea__small__content">
                    <Link
                      to={
                        practiceTestData?.[0]?.practise_set_name &&
                        "/praticeTest-report"
                      }
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
                    <Link to="">
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