import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";

import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import Table from "../../../UI/Table";

const difficultLevelTabs = ["Easy", "Medium", "Hard"];

const FullLengthTest = () => {
  const { count, givenTest } = useLocation().state || {};
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

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: (params) => {
        return (
          <button
            className="take-test"
            onClick={() => handleFullLengthTest(params.data.id)}
          >
            Take Test
          </button>
        );
      },
    },
    {
      headerName: "Name",
      field: "name",
      cellRenderer: (params) => <div>{params.data?.name}</div>,
    },
    {
      headerName: "Status",
      field: "Status",
      cellRenderer: (params) => {
        const examId = params.data.id;
        const isGiven = givenTest.find((test) => test.id === examId);
        if (isGiven) {
          return <button className="given-tag">Given</button>;
        } else {
          return (
            <button className="given-tag" style={{ backgroundColor: "red" }}>
              Not Given
            </button>
          );
        }
      },
    },
  ];

  const renderTestGrid = (
    <>
      {fullLengthTestData.length === 0 ? (
        <h5 className="text-center text-danger">No Tests Available !!</h5>
      ) : (
        <Table rowData={fullLengthTestData} columnDefs={columns} />
      )}
    </>
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
                      <BuyCourse message="No Full Length Test Available, Please Buy a Course!" />
                    ) : (
                      <div className="row">
                        <div className="col-xl-12 aos-init aos-animate">
                          <ul
                            className="nav about__button__wrap dashboard__button__wrap"
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
                        <div className="tab-content tab__content__wrapper aos-init aos-animate">
                          <div
                            className="tab-pane fade show active"
                            id={`projects__${difficulty_level}`}
                            role="tabpanel"
                          >
                            <div className="row">{renderTestGrid}</div>
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

export default FullLengthTest;
