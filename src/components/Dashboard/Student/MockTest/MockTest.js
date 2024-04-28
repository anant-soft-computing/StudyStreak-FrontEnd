import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";

import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import Tab from "../../../UI/Tab";
import TestTable from "./TestTable";

const tabs = [
  { name: "Reading" },
  { name: "Writing" },
  { name: "Listening" },
  { name: "Speaking" },
];

const MockTest = () => {
  const { count, givenTest } = useLocation().state || {};
  const [activeTab, setActiveTab] = useState("Reading");
  const [mockTestData, setMockTestData] = useState([]);
  const [speakingData, setSpeakingData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/exam-blocks/",
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
          const mockTest = data?.filter(
            ({ block_type }) => block_type === "Assignments"
          );
          setMockTestData(mockTest);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
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

        if (response.status === 200) {
          const { data } = response;
          const speakingDataFormat = data.map((item) => ({
            ...item,
            exam_name: item.name,
            no_of_questions: item.questions.length,
          }));
          setSpeakingData(speakingDataFormat);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const testByExamType = (examType) =>
    mockTestData?.filter(({ exam_type }) => exam_type === examType);

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
                          {activeTab === "Reading" && (
                            <TestTable
                              testData={testByExamType("Reading")}
                              givenTest={givenTest}
                              testType={"Reading"}
                            />
                          )}
                          {activeTab === "Writing" && (
                            <TestTable
                              testData={testByExamType("Writing")}
                              givenTest={givenTest}
                              testType={"Writing"}
                            />
                          )}
                          {activeTab === "Listening" && (
                            <TestTable
                              testData={testByExamType("Listening")}
                              givenTest={givenTest}
                              testType={"Listening"}
                            />
                          )}
                          {activeTab === "Speaking" && (
                            <TestTable
                              testData={speakingData}
                              givenTest={givenTest}
                              testType={"Speaking"}
                            />
                          )}
                        </div>
                      </div>
                    )}
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

export default MockTest;
