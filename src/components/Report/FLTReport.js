import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CounterCard from "./CounterCard";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../UI/Loading";
import Table from "../UI/Table";
import FReport from "./FReport";

const FLTReport = () => {
  const location = useLocation();
  const [examName, setExamName] = useState("");
  const [givenTest, setGivenTest] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTest, setActiveTest] = useState(0);
  const [fltData, setFLTData] = useState([]);
  const [fltID, setFLTID] = useState();

  const [counts, setCounts] = useState({
    reading: { correct: 0, incorrect: 0, skipped: 0, band: 0 },
    listening: { correct: 0, incorrect: 0, skipped: 0, band: 0 },
    writing: { band: 0 },
    speaking: { band: 0 },
  });

  const averageBand = () => {
    const bands = [
      counts.reading.band,
      counts.listening.band,
      counts.writing.band,
      counts.speaking.band,
    ].map((band) => parseFloat(band) || 0);
    const sum = bands.reduce((acc, band) => acc + band, 0);
    return bands.length > 0 ? (sum / bands.length).toFixed(1) : 0;
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
          "/get/flt/",
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
          if (location?.state?.FullLengthTestID) {
            setFLTID(location?.state?.FullLengthTestID);
            setActiveTest(location?.state?.FullLengthTestID);
          }
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [location.state]);

  const reportData = fltData
    ?.filter((item) => givenTest?.some((index) => index === item.id))
    ?.map((item, index) => ({ ...item, no: index + 1 }));

  const viewReport = (params) => {
    return (
      <button
        className="take-test"
        style={
          params.data.id === activeTest
            ? { backgroundColor: "green", border: "1px solid green" }
            : { backgroundColor: "#01579b", border: "1px solid #01579b" }
        }
        onClick={() => {
          setFLTID(params.data.id);
          setActiveTest(params.data.id);
        }}
      >
        View Report
      </button>
    );
  };

  const columns = [
    {
      headerName: "No",
      field: "no",
      width: 80,
      filter: true,
      cellRenderer: (params) => {
        return <div>{`${params.data.no}`}</div>;
      },
    },
    {
      headerName: "Name",
      field: "name",
      filter: true,
      width: 300,
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
      cellRenderer: viewReport,
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
                    {examName && (
                      <h4 className="sidebar__title">
                        Solution For : {examName}
                      </h4>
                    )}
                    <CounterCard
                      testGiven={reportData?.length}
                      testAvailable={fltData?.length}
                      correct={
                        counts?.reading?.correct + counts?.listening?.correct
                      }
                      incorrect={
                        counts?.reading?.incorrect +
                        counts?.listening?.incorrect
                      }
                      skipped={
                        counts?.reading?.skipped + counts?.listening?.skipped
                      }
                      band={averageBand()}
                      latestBand={location?.state?.latestBand}
                    />
                    <div className="row mt-3">
                      {isLoading ? (
                        <Loading />
                      ) : reportData.length > 0 ? (
                        <>
                          <Table rowData={reportData} columnDefs={columns} />
                          {fltID && (
                            <FReport
                              fltID={fltID}
                              setCounts={setCounts}
                              setExamName={setExamName}
                            />
                          )}
                        </>
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
