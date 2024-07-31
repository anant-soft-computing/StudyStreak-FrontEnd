import React, { useEffect, useState } from "react";
import Tab from "../UI/Tab";
import ajaxCall from "../../helpers/ajaxCall";
import TestReport from "./TestReport";
import CounterCard from "./CounterCard";

const tabs = [
  { name: "Reading" },
  { name: "Writing" },
  { name: "Listening" },
  { name: "Speaking" },
];

const PracticeTestReport = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [testData, setTestData] = useState({
    Reading: [],
    Writing: [],
    Listening: [],
    Speaking: [],
  });
  const [givenTest, setGivenTest] = useState([]);
  const [activeTab, setActiveTab] = useState("Reading");
  const [counts, setCounts] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
    band: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/student-stats/`,
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
          setGivenTest(response?.data?.student_pt);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, [activeTab]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `/createexamview/?exam_type=${activeTab}`,
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
          const { data } = response;
          const filteredData = {
            Reading: data?.filter(({ exam_type }) => exam_type === "Reading"),
            Writing: data?.filter(({ exam_type }) => exam_type === "Writing"),
            Listening: data?.filter(
              ({ exam_type }) => exam_type === "Listening"
            ),
            Speaking: data?.filter(({ exam_type }) => exam_type === "Speaking"),
          };
          setIsLoading(false);
          setTestData(filteredData);
        } else {
          setIsLoading(false);
          console.log("error");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("error", error);
      }
    };
    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const reportData = (type) =>
    testData[type]?.filter((item) =>
      givenTest?.some((index) => index === item.id)
    );

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Practice Test Report</h4>
                    </div>
                    <CounterCard counts={counts} />
                    <div className="row">
                      <Tab
                        tabs={tabs}
                        activeTab={activeTab}
                        handleTabChange={handleTabChange}
                      />
                      <div className="tab-content tab__content__wrapper aos-init aos-animate">
                        <TestReport
                          reportData={reportData(activeTab)}
                          testType={activeTab}
                          isLoading={isLoading}
                          setCounts={setCounts}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTestReport;
