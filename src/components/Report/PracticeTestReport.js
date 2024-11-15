import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [testData, setTestData] = useState({
    Reading: [],
    Writing: [],
    Listening: [],
    Speaking: [],
  });
  const [examName, setExamName] = useState("");
  const [givenTest, setGivenTest] = useState([]);
  const [activeTest, setActiveTest] = useState(null);
  const [activeTab, setActiveTab] = useState("Reading");
  const [initialTabSet, setInitialTabSet] = useState(false);
  const [counts, setCounts] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
    band: 0,
  });

  const testAvailable = () => {
    if (activeTab === "Reading") {
      return testData.Reading?.length;
    } else if (activeTab === "Writing") {
      return testData.Writing?.length;
    } else if (activeTab === "Listening") {
      return testData.Listening?.length;
    } else if (activeTab === "Speaking") {
      return testData.Speaking?.length;
    }
  };

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
          setTestData(filteredData);

          if (location?.state?.practiceTestID && !initialTabSet) {
            setActiveTab(location?.state?.practiceTestType);
            setActiveTest(location?.state?.practiceTestID);
            setInitialTabSet(true);
          }
        }
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [
    activeTab,
    location?.state?.practiceTestID,
    location?.state?.practiceTestType,
    initialTabSet,
  ]);

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
                    {examName && (
                      <h4 className="sidebar__title">
                        Solution For : {examName}
                      </h4>
                    )}
                    <CounterCard
                      testType={activeTab}
                      latestBand={location?.state?.latestBand}
                      testGiven={reportData(activeTab)?.length}
                      testAvailable={testAvailable(activeTab)}
                      correct={counts?.correct}
                      incorrect={counts?.incorrect}
                      skipped={counts?.skipped}
                      band={counts?.band?.toFixed(1)}
                    />
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
                          setExamName={setExamName}
                          testID={location?.state?.practiceTestID}
                          activeTest={activeTest}
                          setActiveTest={setActiveTest}
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
