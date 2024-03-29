import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import Reading from "./Reading";
import Listening from "./Listening";
import Writing from "./Writing";
import Speaking from "./Speaking";
import BuyCourse from "../BuyCourse/BuyCourse";
import Tab from "../../../UI/Tab";

const tabs = [
  { name: "Reading" },
  { name: "Writing" },
  { name: "Listening" },
  { name: "Speaking" },
];

const PracticeTest = () => {
  const { state: { count } = {} } = useLocation();
  const [readingData, setReadingData] = useState([]);
  const [listeningData, setListeningData] = useState([]);
  const [speakingData, setSpeakingData] = useState([]);
  const [writingData, setWritingData] = useState([]);
  const [activeTab, setActiveTab] = useState("Reading");
  const { practice_test_count } = count;

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
          setReadingData(
            response?.data?.filter(
              (examBlock) => examBlock?.exam_type === "Reading"
            )
          );
          setSpeakingData(
            response?.data?.filter(
              (examBlock) => examBlock?.exam_type === "Speaking"
            )
          );
          setWritingData(
            response?.data?.filter(
              (examBlock) => examBlock?.exam_type === "Writing"
            )
          );
          setListeningData(
            response?.data?.filter(
              (examBlock) => examBlock?.exam_type === "Listening"
            )
          );
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
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
                    {practice_test_count === "" ? (
                      <BuyCourse message="No Practice Test Available , Please Buy a Course !!" />
                    ) : (
                      <div className="row">
                        <Tab
                          tabs={tabs}
                          activeTab={activeTab}
                          handleTabChange={handleTabChange}
                        />
                        <div className="tab-content tab__content__wrapper aos-init aos-animate">
                          <div
                            className={`tab-pane fade ${
                              activeTab === "Reading" ? "show active" : ""
                            }`}
                          >
                            <div className="row">
                              <Reading readingData={readingData} />
                            </div>
                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "Writing" ? "show active" : ""
                            }`}
                          >
                            <div className="row">
                              <Writing writingData={writingData} />
                            </div>
                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "Listening" ? "show active" : ""
                            }`}
                          >
                            <div className="row">
                              <Listening listeningData={listeningData} />
                            </div>
                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "Speaking" ? "show active" : ""
                            }`}
                          >
                            <div className="row">
                              <Speaking speakingData={speakingData} />
                            </div>
                          </div>
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
