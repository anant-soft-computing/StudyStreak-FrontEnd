import React, { useEffect, useState } from "react";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";

const Resources = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [resourcesList, setResourceList] = useState([]);

  const doDownload = (params) => {
    return (
      <button className="take-test" onClick={() => window.open(params.value)}>
        <i className="icofont-download" /> Download
      </button>
    );
  };

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 76,
    },
    {
      headerName: "Batch",
      field: "batch",
      resizable: true,
      filter: true,
    },
    {
      headerName: "Student",
      field: "student",
      resizable: true,
      filter: true,
    },
    {
      headerName: "Course",
      field: "course",
      resizable: true,
      filter: true,
    },
    {
      headerName: "Description",
      field: "description",
      resizable: true,
      filter: true,
    },
    {
      headerName: "Download",
      field: "document",
      resizable: true,
      cellRenderer: doDownload,
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/resources/`,
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
        if (response?.status === 200) {
          const resourcesWithNumbers = response.data.flatMap((item, index) =>
            item.documents.map((document, docIndex) => ({
              no: `${index + 1}. (${docIndex + 1}).`,
              batch: item.batch?.batch_name,
              student:
                item.student?.user?.first_name +
                " " +
                item.student?.user?.last_name,
              course: item.course?.Course_Title,
              description: document.description,
              document: document.document,
            }))
          );
          setIsLoading(false);
          setResourceList(resourcesWithNumbers);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
                      <h4>Resources</h4>
                    </div>
                    <div className="row">
                      {isLoading ? (
                        <Loading text="Loading..." color="primary" />
                      ) : resourcesList.length > 0 ? (
                        <Table rowData={resourcesList} columnDefs={columns} />
                      ) : (
                        <h5 className="text-center text-danger">
                          No Resources Available !!
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

export default Resources;
