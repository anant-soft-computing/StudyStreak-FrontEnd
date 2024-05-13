import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import Tab from "../../../UI/Tab";
import TestTable from "./TestTable";
import MTAssessment from "../Assessment/MTAssessment/MTAssessment";

const tabs = [
  { name: "Reading" },
  { name: "Writing" },
  { name: "Listening" },
  { name: "Speaking" },
];

const MockTest = () => {
  const { count, givenTest, givenSpeakingTest } = useLocation().state || {};
  const [activeTab, setActiveTab] = useState("Reading");
  const [mockTestData, setMockTestData] = useState([]);
  const [speakingData, setSpeakingData] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setData) => {
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
          const { data } = response;
          if (url === "/exam-blocks/") {
            const mockTest = data?.filter(
              ({ block_type }) => block_type === "Assignments"
            );
            setData(mockTest);
          } else if (url === "/speaking-block/") {
            const speakingData = data
              .filter((item) => item.block_threshold === 0)
              .map((item) => ({
                ...item,
                exam_name: item.name,
                no_of_questions: item.questions.length,
              }));
            setData(speakingData);
          }
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    fetchData("/exam-blocks/", setMockTestData);
    fetchData("/speaking-block/", setSpeakingData);
  }, []);

  const testByExamType = (examType) =>
    mockTestData.filter(({ exam_type }) => exam_type === examType);
  const givenWritingTest = testByExamType("Writing").filter((item) =>
    givenTest?.some((index) => index.id === item.id)
  );
  const givenST = speakingData.filter((item) =>
    givenSpeakingTest?.some((index) => index.id === item.id)
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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
                      <h4>Mini Test</h4>
                    </div>
                    {count?.mini_test_count === "" ? (
                      <BuyCourse message="No Mini Test Available, Please Buy a Course!" />
                    ) : (
                      <div className="row">
                        <Tab
                          tabs={tabs}
                          activeTab={activeTab}
                          handleTabChange={handleTabChange}
                        />
                        <div className="tab-content tab__content__wrapper aos-init aos-animate">
                          {tabs.map(
                            ({ name }) =>
                              activeTab === name && (
                                <TestTable
                                  key={name}
                                  testData={
                                    name === "Speaking"
                                      ? speakingData
                                      : testByExamType(name)
                                  }
                                  givenTest={givenTest}
                                  testType={name}
                                  givenSpeakingTest={givenSpeakingTest}
                                />
                              )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {(activeTab === "Writing" || activeTab === "Speaking") && (
                    <MTAssessment
                      testType={activeTab}
                      givenWritingTest={givenWritingTest}
                      givenSpeakingTest={givenST}
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

export default MockTest;
