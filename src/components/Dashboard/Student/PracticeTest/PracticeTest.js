import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import Tab from "../../../UI/Tab";
import PracticeTestTable from "./PracticeTestTable";
import PTAssessment from "../Assessment/PTAssessment/PTAssessment";

const tabs = [
  { name: "Reading" },
  { name: "Writing" },
  { name: "Listening" },
  { name: "Speaking" },
];

const PracticeTest = () => {
  const { count, givenTest } = useLocation().state || {};
  const [isLoading, setIsLoading] = useState(true);
  const [testData, setTestData] = useState({
    Reading: [],
    Writing: [],
    Listening: [],
    Speaking: [],
  });
  const [activeTab, setActiveTab] = useState("Reading");

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
            Reading: data.filter(({ exam_type }) => exam_type === "Reading"),
            Writing: data.filter(({ exam_type }) => exam_type === "Writing"),
            Listening: data.filter(
              ({ exam_type }) => exam_type === "Listening"
            ),
            Speaking: data.filter(({ exam_type }) => exam_type === "Speaking"),
          };
          setIsLoading(false);
          setTestData(filteredData);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const givenTestOfType = (type) =>
    testData[type].filter((item) =>
      givenTest.some((index) => index.id === item.id)
    );

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                <div className="col-xl-9 col-lg-9 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Practice Test</h4>
                    </div>
                    {count?.practice_test_count === "" ? (
                      <BuyCourse message="No Practice Test Available, Please Buy a Course !!" />
                    ) : (
                      <div className="row">
                        <Tab
                          tabs={tabs}
                          activeTab={activeTab}
                          handleTabChange={handleTabChange}
                        />
                        <div className="tab-content tab__content__wrapper aos-init aos-animate">
                          <PracticeTestTable
                            testData={testData[activeTab]}
                            givenTest={givenTestOfType(activeTab)}
                            testType={activeTab}
                            isLoading={isLoading}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {(activeTab === "Writing" || activeTab === "Speaking") && (
                    <PTAssessment
                      testType={activeTab}
                      givenWritingTest={givenTestOfType("Writing")}
                      givenSpeakingTest={givenTestOfType("Speaking")}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTest;
