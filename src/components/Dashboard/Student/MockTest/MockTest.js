import React, { useEffect, useState } from "react";
import TopBar from "../../../TopBar/TopBar";
import NavBar from "../../../NavBar/NavBar";
import DSNavBar from "../DSNavBar/DSNavBar";
import DSSidebar from "../DSSideBar/DSSideBar";
import Footer from "../../../Footer/Footer";
import Reading from "./Reading";
import Writing from "./Writing";
import Listening from "./Listening";
import Speaking from "./Speaking";
import ajaxCall from "../../../../helpers/ajaxCall";

const MockTest = () => {
  const [mockTestData, setMockTestData] = useState([]);
  const [givenTest, setGivenTest] = useState([]);

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
    <>
      <TopBar />
      <NavBar />
      <div className="body__wrapper">
        <div className="main_wrapper overflow-hidden">
          <div className="theme__shadow__circle"></div>
          <div className="theme__shadow__circle shadow__right"></div>
          <div className="dashboardarea sp_bottom_100">
            <DSNavBar />
            <div className="dashboard">
              <div className="container-fluid full__width__padding">
                <div className="row">
                  <DSSidebar />
                  <div className="col-xl-9 col-lg-9 col-md-12">
                    <div className="dashboard__content__wraper">
                      <div className="dashboard__section__title">
                        <h4>Assignment</h4>
                      </div>
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
                                className="single__tab__link active"
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
                                className="single__tab__link"
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
                                className="single__tab__link"
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
                                className="single__tab__link"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MockTest;
