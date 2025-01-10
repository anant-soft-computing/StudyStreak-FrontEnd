import React, { useEffect, useState } from "react";
import Table from "../../../../UI/Table";
import Loading from "../../../../UI/Loading";
import DSSidebar from "../../DSSideBar/DSSideBar";
import ajaxCall from "../../../../../helpers/ajaxCall";

const FreeMockTest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fullLengthTestData, setFullLengthTestData] = useState([]);

  const sortedFLT = fullLengthTestData.sort((a, b) => {
    const getNumber = (name) => {
      const match = name.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    const nameA = getNumber(a.name);
    const nameB = getNumber(b.name);
    return nameA - nameB;
  });

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
          const fullLengthTest = response.data.filter(({ name }) =>
            name.includes("PTE")
          );
          setFullLengthTestData(fullLengthTest);
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
        return (
          <button
            className="take-test"
            onClick={() =>
              window.open(`/PTE-Academic/MockTest/${params.data?.id}`, "_blank")
            }
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
      field: "reading_set.Reading.length",
      filter: true,
      width: 250,
    },
    {
      headerName: "Writing Set",
      field: "writing_set.Writing.length",
      filter: true,
      width: 250,
    },
    {
      headerName: "Listening Set",
      field: "listening_set.Listening.length",
      filter: true,
      width: 250,
    },
    {
      headerName: "Speaking Set",
      field: "speaking_set.Speaking.length",
      filter: true,
      width: 250,
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
                      <h4>Free Mock Test</h4>
                    </div>
                    {isLoading ? (
                      <Loading />
                    ) : sortedFLT.length > 0 ? (
                      <Table rowData={sortedFLT} columnDefs={columns} />
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

export default FreeMockTest;
