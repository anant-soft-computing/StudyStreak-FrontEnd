import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";

import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import Tab from "../../../UI/Tab";
import PracticeTestTable from "./PracticeTestTable";

const tabs = [
  { name: "Reading" },
  { name: "Writing" },
  { name: "Listening" },
  { name: "Speaking" },
];

const PracticeTest = () => {
  const { count, givenTest } = useLocation().state || {};
  const [readingData, setReadingData] = useState([]);
  const [listeningData, setListeningData] = useState([]);
  const [speakingData, setSpeakingData] = useState([]);
  const [writingData, setWritingData] = useState([]);
  const [activeTab, setActiveTab] = useState("Reading");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/createexamview/`,
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
          setReadingData(
            data?.filter(({ exam_type }) => exam_type === "Reading")
          );
          setSpeakingData(
            data?.filter(({ exam_type }) => exam_type === "Speaking")
          );
          setWritingData(
            data?.filter(({ exam_type }) => exam_type === "Writing")
          );
          setListeningData(
            data?.filter(({ exam_type }) => exam_type === "Listening")
          );
        } else {
          console.log("error");
        }
      } catch (error) {
        console.error("error", error);
      }
    })();
  }, []);

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
                      <BuyCourse message="No Practice Test Available , Please Buy a Course !!" />
                    ) : (
                      <div className="row">
                        <Tab
                          tabs={tabs}
                          activeTab={activeTab}
                          handleTabChange={handleTabChange}
                        />
                        <div className="tab-content tab__content__wrapper aos-init aos-animate">
                          {activeTab === "Reading" && (
                            <PracticeTestTable
                              testData={readingData}
                              givenTest={givenTest}
                              testType="Reading"
                            />
                          )}
                          {activeTab === "Writing" && (
                            <PracticeTestTable
                              testData={writingData}
                              givenTest={givenTest}
                              testType="Writing"
                            />
                          )}
                          {activeTab === "Listening" && (
                            <PracticeTestTable
                              testData={listeningData}
                              givenTest={givenTest}
                              testType="Listening"
                            />
                          )}
                          {activeTab === "Speaking" && (
                            <PracticeTestTable
                              testData={speakingData}
                              givenTest={givenTest}
                              testType="Speaking"
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

export default PracticeTest;
