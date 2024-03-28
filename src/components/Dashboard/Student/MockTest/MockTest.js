import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import Reading from "./Reading";
import Writing from "./Writing";
import Listening from "./Listening";
import Speaking from "./Speaking";
import ajaxCall from "../../../../helpers/ajaxCall";
import BuyCourse from "../BuyCourse/BuyCourse";

const MockTest = () => {
  const { state: { count } = {} } = useLocation();
  const [mockTestData, setMockTestData] = useState([]);
  const [givenTest, setGivenTest] = useState([]);
  const { mini_test_count } = count;

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
            (item) => item.block_type === "Mock Test"
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
                        <div
                          className="col-xl-12 aos-init aos-animate"
                          data-aos="fade-up"
                        >
                          <ul
                            className="nav  about__button__wrap dashboard__button__wrap"
                            id="myTab"
                            role="tablist"
                          >
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link active common-background-color-across-app"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__one"
                                type="button"
                                aria-selected="true"
                                role="tab"
                              >
                                Reading
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link common-background-color-across-app"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__two"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabIndex="-1"
                              >
                                Writing
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link common-background-color-across-app"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__three"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabIndex="-1"
                              >
                                Listening
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="single__tab__link common-background-color-across-app"
                                data-bs-toggle="tab"
                                data-bs-target="#projects__four"
                                type="button"
                                aria-selected="false"
                                role="tab"
                                tabIndex="-1"
                              >
                                Speaking
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div
                          className="tab-content tab__content__wrapper aos-init aos-animate"
                          id="myTabContent"
                          data-aos="fade-up"
                        >
                          <div
                            className="tab-pane fade active show"
                            id="projects__one"
                            role="tabpanel"
                            aria-labelledby="projects__one"
                          >
                            <Reading
                              readingData={readingData}
                              givenTest={givenTest}
                            />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__two"
                            role="tabpanel"
                            aria-labelledby="projects__two"
                          >
                            <Writing
                              writingData={writingData}
                              givenTest={givenTest}
                            />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__three"
                            role="tabpanel"
                            aria-labelledby="projects__three"
                          >
                            <Listening
                              listeningData={listeningData}
                              givenTest={givenTest}
                            />
                          </div>
                          <div
                            className="tab-pane fade"
                            id="projects__four"
                            role="tabpanel"
                            aria-labelledby="projects__four"
                          >
                            <Speaking
                              speakingData={speakingData}
                              givenTest={givenTest}
                            />
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
