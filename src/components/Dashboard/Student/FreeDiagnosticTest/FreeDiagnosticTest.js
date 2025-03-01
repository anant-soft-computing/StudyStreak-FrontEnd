import React, { useEffect, useState } from "react";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const FreeDiagnosticTest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [freeDiagnosticTest, setFreeDiagnosticTest] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          "/ct/flts/?is_diagnostic=true&is_quick=true",
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
          setFreeDiagnosticTest(response?.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleFullLengthTest = (examId) => {
    window.open(`/DiagnosticTest/${examId}`, "_blank");
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
      filter: true,
      width: 350,
    },
    {
      headerName: "Reading Set",
      field: "reading_set.Reading.length",
      filter: true,
      width: 220,
    },
    {
      headerName: "Writing Set",
      field: "writing_set.Writing.length",
      filter: true,
      width: 220,
    },
    {
      headerName: "Listening Set",
      field: "listening_set.Listening.length",
      filter: true,
      width: 220,
    },
    {
      headerName: "Speaking Set",
      field: "speaking_set.Speaking.length",
      filter: true,
      width: 220,
    },
  ];

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Free Diagnostic Test</h4>
                    </div>
                    {isLoading ? (
                      <Loading />
                    ) : freeDiagnosticTest.length > 0 ? (
                      <Table
                        rowData={freeDiagnosticTest}
                        columnDefs={columns}
                      />
                    ) : (
                      <h5 className="text-center text-danger">
                        No Free Diagnostic Test Available !!
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

export default FreeDiagnosticTest;
