import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import Reading from "./Reading";
import Writing from "./Writing";
import Listening from "./Listening";
import Speaking from "./Speaking";
import ajaxCall from "../../../../helpers/ajaxCall";
import BuyCourse from "../BuyCourse/BuyCourse";
import Tab from "../../../UI/Tab";

const tabs = [
  { name: "Reading" },
  { name: "Writing" },
  { name: "Listening" },
  { name: "Speaking" },
];

const MockTest = () => {
  const { state: { count } = {} } = useLocation();
  const [activeTab, setActiveTab] = useState("Reading");
  const [mockTestData, setMockTestData] = useState([]);
  const [givenTest, setGivenTest] = useState([]);
  const { mini_test_count } = count;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const readingData = mockTestData?.filter(
    (item) => item.exam_type === "Reading"
  );

  const writingData = mockTestData?.filter(
    (item) => item.exam_type === "Writing"
  );

  const listeningData = mockTestData?.filter(
    (item) => item.exam_type === "Listening"
  );

  const speakingData = mockTestData?.filter(
    (item) => item.exam_type === "Speaking"
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/studentview/",
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
          setGivenTest(response?.data[0].student_mock);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/exam-blocks/`,
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
          const mockTest = response?.data?.filter(
            (item) => item.block_type === "Assignments"
          );
          setMockTestData(mockTest);
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
                      <h4>Mini Test</h4>
                    </div>
                    {mini_test_count === "" ? (
                      <BuyCourse message="No Mini Test Available , Please Buy a Course !!" />
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
                              <Reading
                                readingData={readingData}
                                givenTest={givenTest}
                              />
                            </div>
                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "Writing" ? "show active" : ""
                            }`}
                          >
                            <div className="row">
                              <Writing
                                writingData={writingData}
                                givenTest={givenTest}
                              />
                            </div>
                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "Listening" ? "show active" : ""
                            }`}
                          >
                            <div className="row">
                              <Listening
                                listeningData={listeningData}
                                givenTest={givenTest}
                              />
                            </div>
                          </div>
                          <div
                            className={`tab-pane fade ${
                              activeTab === "Speaking" ? "show active" : ""
                            }`}
                          >
                            <div className="row">
                              <Speaking
                                speakingData={speakingData}
                                givenTest={givenTest}
                              />
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

export default MockTest;
