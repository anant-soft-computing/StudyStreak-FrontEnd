import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ajaxCall from "../../../../../helpers/ajaxCall";
import DSSidebar from "../../DSSideBar/DSSideBar";
import Loading from "../../../../UI/Loading";
import Table from "../../../../UI/Table";

const Speaking = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [givenTest, setGivenTest] = useState([]);
  const [speakingData, setSpeakingData] = useState([]);

  const handleClick = (data) => {
    Object?.keys(data?.IELTS)?.forEach((key) => {
      if (Array.isArray(data?.IELTS[key])) {
        if (data?.IELTS[key].length > 0) {
          window.open(`/PTE-Speaking/IELTS/${key}/${data.id}`, "_blank");
        }
      }
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/student-stats/",
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
          setGivenTest(response?.data?.student_pt);
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  const testButton = (params) => {
    const examId = params.data.id;
    const paperId = params.data.IELTS.id;
    const isGiven = givenTest?.find((item) => item === examId);
    if (isGiven) {
      return (
        <button
          className="take-test"
          onClick={() => {
            navigate(`/practice-assessment/${paperId}`, {
              state: { examType: "Speaking" },
            });
          }}
          style={{ backgroundColor: "green", border: "1px solid green" }}
        >
          Review Test
        </button>
      );
    } else {
      return (
        <button className="take-test" onClick={() => handleClick(params.data)}>
          Take Test
        </button>
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          "/createexamview/?exam_type=Speaking&category=PTE",
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
          setSpeakingData(response?.data);
        }
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: testButton,
      width: 200,
    },
    {
      headerName: "Name",
      field: "Name",
      cellRenderer: (params) => {
        return params.data.IELTS?.Name;
      },
      filter: true,
      width: 350,
    },
    {
      headerName: "Questions",
      field: "questions",
      cellRenderer: (params) => {
        return params.data.IELTS?.Speaking.length;
      },
      filter: true,
      width: 300,
    },
    {
      headerName: "Time",
      field: "time",
      cellRenderer: () => {
        return "15 Minutes";
      },
      filter: true,
      width: 300,
    },
    {
      headerName: "Status",
      field: "Status",
      cellRenderer: (params) => {
        const examId = params.data.id;
        const isGiven = givenTest?.find((item) => item === examId);
        if (isGiven) {
          return (
            <button className="given-tag" style={{ backgroundColor: "green" }}>
              Given
            </button>
          );
        } else {
          return (
            <button className="given-tag" style={{ backgroundColor: "red" }}>
              Not Given
            </button>
          );
        }
      },
      filter: true,
      width: 300,
    },
  ];

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
                      <h4>PTE Speaking</h4>
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>Speaking Exam Type</label>
                          <select
                            className="form-select"
                            name="speakingExamType"
                          >
                            <option value="Read aloud [RA]">
                              Read aloud [RA]
                            </option>
                            <option value="Repeat sentence [RS]">
                              Repeat sentence [RS]
                            </option>
                            <option value="Describe image [DI]">
                              Describe image [DI]
                            </option>
                            <option value="Re-tell lecture [RL]">
                              Re-tell lecture [RL]
                            </option>
                            <option value="Answer short question [ASQ]">
                              Answer short question [ASQ]
                            </option>
                            <option value="Respond to a sitution [RTS]">
                              Respond to a sitution [RTS]
                            </option>
                            <option value="Summarize group discussion [SGD]">
                              Summarize group discussion [SGD]
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading />
                      ) : speakingData.length > 0 ? (
                        <Table rowData={speakingData} columnDefs={columns} />
                      ) : (
                        <h5 className="text-center text-danger">
                          No Speaking Tests Available !!
                        </h5>
                      )}
                    </div>
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

export default Speaking;