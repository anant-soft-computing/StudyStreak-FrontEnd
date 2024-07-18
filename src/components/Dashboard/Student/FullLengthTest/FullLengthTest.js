import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import Table from "../../../UI/Table";

const FullLengthTest = () => {
  const { count } = useLocation().state || {};
  const [givenTest, setGivenTest] = useState([]);
  const [fullLengthTestData, setFullLengthTestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/student-stats/`,
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
          `/get/flt/`,
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
          setIsLoading(false);
          setFullLengthTestData([...response.data]);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const handleFullLengthTest = (examId) => {
    window.open(`/fulllength-live-exam/${examId}`, "_blank");
  };

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
            >
              Review Test
            </button>
          );
        }
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
      filter: true,
    },
    {
      headerName: "Reading Set",
      field: "reading_set.Reading.length",
      filter: true,
    },
    {
      headerName: "Writing Set",
      field: "writing_set.Writing.length",
      filter: true,
    },
    {
      headerName: "Listening Set",
      field: "listening_set.Listening.length",
      filter: true,
    },
    {
      headerName: "Speaking Set",
      field: "speaking_set.Speaking.length",
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
                      <h4>Full Length Test</h4>
                    </div>
                    {count?.full_length_test_count === "" ? (
                      <BuyCourse message="No Full Length Test Available, Please Buy a Course!" />
                    ) : isLoading ? (
                      <Loading text="Loading..." color="primary" />
                    ) : fullLengthTestData.length > 0 ? (
                      <Table
                        rowData={fullLengthTestData}
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

export default FullLengthTest;
