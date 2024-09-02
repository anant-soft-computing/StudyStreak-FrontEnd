import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import DSSidebar from "../DSSideBar/DSSideBar";
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
  const [activeTab, setActiveTab] = useState("Reading");
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("IELTS");
  const [givenTest, setGivenTest] = useState([]);
  const [givenSpeakingTest, setGivenSpeakingTest] = useState([]);
  const [allMockTestData, setAllMockTestData] = useState([]);
  const [allSpeakingData, setAllSpeakingData] = useState([]);

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
          setGivenTest(response?.data?.student_mock);
          setGivenSpeakingTest(response?.data?.student_speakingblock);
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, [activeTab]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "Speaking") {
          const speakingBlocksResponse = await ajaxCall(
            "/speaking-block/",
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
          if (speakingBlocksResponse.status === 200) {
            const allSpeakingData = speakingBlocksResponse.data
              .filter((item) => item.block_threshold === 0)
              .map((item) => ({
                ...item,
                exam_name: item.name,
                no_of_questions: item.questions.length,
              }));
            setAllSpeakingData(allSpeakingData);
          }
        } else {
          const examBlocksResponse = await ajaxCall(
            `/exam-blocks/?fields=id,block_type,exam_category,exam_name,no_of_questions,exam_type&exam_type=${activeTab}`,
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
          if (examBlocksResponse.status === 200) {
            const mockTestData = examBlocksResponse.data.filter(
              ({ block_type, exam_category }) =>
                block_type === "Assignments" && exam_category === category
            );
            setAllMockTestData(mockTestData);
          }
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeTab, category]);

  const testByExamType = (examType) =>
    allMockTestData.filter(({ exam_type }) => exam_type === examType);
  const givenWritingTest = testByExamType("Writing").filter((item) =>
    givenTest?.some((index) => index === item.id)
  );
  const givenST = allSpeakingData.filter((item) =>
    givenSpeakingTest?.some((index) => index === item.id)
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
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Mini Test</h4>
                      <div className="col-xl-2">
                        <div className="dashboard__form__wraper">
                          <div className="dashboard__form__input">
                            <label>Category</label>
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                            >
                              {[
                                "IELTS",
                                "TOFEL",
                                "PTE",
                                "DUOLINGO",
                                "GRE",
                                "GMAT",
                              ].map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
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
                                    ? allSpeakingData
                                    : testByExamType(name)
                                }
                                givenTest={givenTest}
                                testType={name}
                                givenSpeakingTest={givenSpeakingTest}
                                isLoading={isLoading}
                              />
                            )
                        )}
                      </div>
                    </div>
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
