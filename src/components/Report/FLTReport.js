import React, { useEffect, useState } from "react";
import CounterCard from "./CounterCard";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../UI/Loading";
import Table from "../UI/Table";

const FLTReport = () => {
  const [givenTest, setGivenTest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fltData, setFLTData] = useState([]);

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
          setFLTData([...response.data]);
          setIsLoading(false);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const reportData = fltData
    ?.filter((item) => givenTest?.some((index) => index === item.id))
    ?.map((item, index) => ({ ...item, no: index + 1 }));

  const columns = [
    {
      headerName: "No",
      field: "no",
      width: 110,
      filter: true,
      cellRenderer: (params) => {
        return <div>{`(${params.data.no}).`}</div>;
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
      headerName: "View Report",
      field: "button",
      cellRenderer: () => {
        return <button className="take-test">View Report</button>;
      },
      width: 260,
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
                      <h4>Full Length Test Report</h4>
                    </div>
                    <CounterCard
                      testGiven={reportData?.length}
                      testAvailable={fltData?.length}
                    />
                    <div className="row mt-3">
                      {isLoading ? (
                        <Loading text="Loading...." color="primary" />
                      ) : reportData.length > 0 ? (
                        <Table rowData={reportData} columnDefs={columns} />
                      ) : (
                        <h5 className="text-center text-danger">{`No Full Length Test Report Available !!`}</h5>
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

export default FLTReport;
