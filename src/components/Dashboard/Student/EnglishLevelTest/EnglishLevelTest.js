import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import ajaxCall from "../../../../helpers/ajaxCall";

const EnglishLevelTest = () => {
  const navigate = useNavigate();
  const { packageCount } = useLocation().state || {};
  const [givenTest, setGivenTest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [englishLevelTestData, setEnglishLevelTestData] = useState([]);

  const handleEnglishLevelTest = (examId) => {
    window.open(`/DiagnosticTest/${examId}`, "_blank");
  };

  const viewEnglishLevelTest = (examId) => {
    navigate(`/DiagnosticTest/Answer/${examId}`);
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
          setGivenTest(response?.data?.student_flt);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/ct/flts/?is_diagnostic=true&is_quick=false",
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
          setEnglishLevelTestData(response.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const columns = [
    {
      headerName: "Take Test",
      field: "button",
      cellRenderer: (params) => {
        const examId = params.data.id;
        const isGiven = givenTest?.find((test) => test === examId);
        if (isGiven) {
          return (
            <button
              className="take-test"
              style={{ backgroundColor: "green", border: "1px solid green" }}
              onClick={() => viewEnglishLevelTest(params.data.id)}
            >
              Review Test
            </button>
          );
        }
        return (
          <button
            className="take-test"
            onClick={() => handleEnglishLevelTest(params.data.id)}
          >
            Take Test
          </button>
        );
      },
    },
    {
      headerName: "Name",
      field: "name",
      filter: true,
      width: 250,
    },
    {
      headerName: "Reading Set",
      field: "reading_block_count",
      filter: true,
    },
    {
      headerName: "Writing Set",
      field: "writing_block_count",
      filter: true,
    },
    {
      headerName: "Listening Set",
      field: "listening_block_count",
      filter: true,
    },
    {
      headerName: "Speaking Set",
      field: "speaking_block_count",
      filter: true,
    },
    {
      headerName: "Status",
      field: "Status",
      cellRenderer: (params) => {
        const examId = params.data.id;
        const isGiven = givenTest?.find((test) => test === examId);
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
                      <h4>Diagnostic Test</h4>
                    </div>
                    {packageCount === 0 ? (
                      <BuyCourse message="No Diagnostic Test Available, Please Buy a Course !!" />
                    ) : isLoading ? (
                      <Loading />
                    ) : englishLevelTestData.length > 0 ? (
                      <Table
                        rowData={englishLevelTestData}
                        columnDefs={columns}
                      />
                    ) : (
                      <h5 className="text-center text-danger">
                        No Tests Available !!
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
  );
};

export default EnglishLevelTest;
