import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../../UI/Table";
import Loading from "../../../../UI/Loading";
import DSSidebar from "../../DSSideBar/DSSideBar";
import ajaxCall from "../../../../../helpers/ajaxCall";

const Listening = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [givenTest, setGivenTest] = useState([]);
  const [listeningData, setListeningData] = useState([]);

  const handleClick = (data) => {
    Object?.keys(data?.IELTS)?.forEach((key) => {
      if (Array.isArray(data?.IELTS[key])) {
        if (data?.IELTS[key].length > 0) {
          window.open(`/PTE/IELTS/${key}/${data.id}`, "_blank");
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
            navigate(`/exam-practice-test-answer/${examId}`, {
              state: { fullPaper: paperId, examForm: "Listening" },
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
          "/createexamview/?exam_type=Listening&category=PTE",
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
          setListeningData(response?.data);
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
        return params.data.IELTS?.Listening.length;
      },
      filter: true,
      width: 300,
    },
    {
      headerName: "Time",
      field: "time",
      cellRenderer: () => {
        return "30 Minutes";
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
                      <h4>PTE Listening</h4>
                      <div className="dashboard__form__wraper">
                        <div className="dashboard__form__input">
                          <label>Listening Exam Type</label>
                          <select
                            className="form-select"
                            name="listeningExamType"
                          >
                            <option value="Summarize spoken text [SST]">
                              Summarize spoken text [SST]
                            </option>
                            <option value="MC, choose multiple answers">
                              MC, choose multiple answers
                            </option>
                            <option value="Fill in the blanks [LFIB]">
                              Fill in the blanks [LFIB]
                            </option>
                            <option value="Highlight correct summary">
                              Highlight correct summary
                            </option>
                            <option value="MC, choose single answer">
                              MC, choose single answer
                            </option>
                            <option value="Select missing words [SMW]">
                              Select missing words [SMW]
                            </option>
                            <option value="Highlight incorrect words">
                              Highlight incorrect words
                            </option>
                            <option value="Write from diction [WFD]">
                              Write from diction [WFD]
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading />
                      ) : listeningData.length > 0 ? (
                        <Table rowData={listeningData} columnDefs={columns} />
                      ) : (
                        <h5 className="text-center text-danger">
                          No Listening Tests Available !!
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

export default Listening;
