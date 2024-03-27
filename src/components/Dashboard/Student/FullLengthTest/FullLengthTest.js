import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";

const difficultLevelTabs = ["Easy", "Medium", "Hard"];

const FullLengthTest = () => {
  const { state: { count } = {} } = useLocation();
  const navigate = useNavigate();
  const [fullLengthTestData, setFullLengthTestData] = useState([]);
  const [difficulty_level, setDifficultyLevel] = useState("Easy");
  const { full_length_test_count } = count;

  const handleDifficultyLevel = (e) => {
    setDifficultyLevel(e.target.innerHTML);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/get/flt/?difficulty_level=${difficulty_level}`,
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
          setFullLengthTestData([...response.data]);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [difficulty_level]);

  const handleFullLengthTest = (id) => {
    window.open(`/fulllength-live-exam/${id}`, "_blank");
  };

  const renderTestCards = (
    <div className="row">
      {fullLengthTestData?.map(({ id, name }, index) => (
        <div
          className="col-lg-4 col-md-6 col-12"
          data-aos="fade-up"
          key={index}
        >
          <div className="gridarea__wraper gridarea__wraper__2 zoom__meeting__grid global-neomorphism-card-styling d-flex flex-column justify-content-between">
            <div className="gridarea__content ">
              <div className="gridarea__heading mt-3">
                <h3 className="text-center">Full Length Test </h3>
              </div>
              <div className="gridarea__heading">
                <h3 className="text-center">{name}</h3>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-center mt-2 mb-3">
                <button
                  className="default__button"
                  onClick={() => handleFullLengthTest(id)}
                >
                  Take Test
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
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
                      <h4>Full Length Test</h4>
                    </div>
                    {full_length_test_count === "" ? (
                      <>
                        <h5 className="text-center text-danger">
                          No Full Length Test Available , Please Buy a Course !!
                        </h5>
                        <div className="d-flex justify-content-center mt-4">
                          <button
                            className="default__button"
                            onClick={() => navigate("/courses")}
                          >
                            Buy Course
                          </button>
                        </div>
                      </>
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
                            {difficultLevelTabs.map((tab, index) => (
                              <li
                                className="nav-item"
                                role="presentation"
                                key={index}
                              >
                                <button
                                  className={`single__tab__link common-background-color-across-app ${
                                    tab === difficulty_level ? "active" : ""
                                  }`}
                                  data-bs-toggle="tab"
                                  data-bs-target={`#projects__${tab}`}
                                  type="button"
                                  aria-selected="true"
                                  role="tab"
                                  onClick={handleDifficultyLevel}
                                >
                                  {tab}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div
                          className="tab-content tab__content__wrapper aos-init aos-animate"
                          id="myTabContent"
                          data-aos="fade-up"
                        >
                          {difficultLevelTabs.map((test, index) => (
                            <div
                              className={`tab-pane fade ${
                                test === difficulty_level ? "show active" : ""
                              }`}
                              id={`projects__${test}`}
                              role="tabpanel"
                              key={index}
                            >
                              <div className="row">{renderTestCards}</div>
                            </div>
                          ))}
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

export default FullLengthTest;
