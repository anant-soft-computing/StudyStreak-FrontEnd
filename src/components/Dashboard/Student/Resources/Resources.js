import React, { useEffect, useState } from "react";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";

const Resources = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [resourcesList, setResourceList] = useState([]);
  const batchIds = JSON.parse(localStorage.getItem("BatchIds"));
  const courseIds = JSON.parse(localStorage.getItem("courses"))?.map(
    (item) => item?.id
  );
  const studentId = JSON.parse(localStorage.getItem("StudentID"));

  const doDocument = (params) => {
    return params.value !== "-" ? (
      <button className="take-test" onClick={() => window.open(params.value)}>
        <i className="icofont-download" /> Download
      </button>
    ) : (
      "-"
    );
  };

  const doVideoAndLink = (params) => {
    return params.value !== "-" ? (
      <button className="take-test" onClick={() => window.open(params.value)}>
        View
      </button>
    ) : (
      "-"
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
      headerName: "Batch",
      field: "batch",
      resizable: true,
      filter: true,
    },
    {
      headerName: "Description",
      field: "description",
      resizable: true,
      filter: true,
      width: 380,
    },
    {
      headerName: "Video / Link",
      field: "link",
      resizable: true,
      filter: true,
      cellRenderer: doVideoAndLink,
    },
    {
      headerName: "Documents",
      field: "document",
      resizable: true,
      cellRenderer: doDocument,
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
          const filteredResources = response?.data?.filter((item) => {
            const student = item?.student?.some((s) => s?.id === studentId);
            const batch = item?.batch?.some((b) => batchIds?.includes(b?.id));
            const course = item?.course?.some((c) =>
              courseIds?.includes(c?.id)
            );
            return student || batch || course;
          });

          const resourcesWithNumbers = filteredResources.flatMap(
            (item, index) =>
              item?.documents?.map((document, docIndex) => ({
                no: `${index + 1}. (${docIndex + 1}).`,
                student: item?.student?.some((s) => s?.id === studentId)
                  ? `${
                      item?.student.find((s) => s?.id === studentId)?.user
                        .first_name
                    } ${
                      item?.student.find((s) => s.id === studentId)?.user
                        .last_name
                    }`
                  : "-",
                batch:
                  item?.batch
                    ?.filter((b) => batchIds?.includes(b?.id))
                    ?.map((b) => b?.batch_name)
                    ?.join(", ") || "-",
                course:
                  item?.course?.map((c) => c?.Course_Title)?.join(", ") || "-",
                description: document?.description || "-",
                document: document?.document || "-",
                link: item?.link || "-",
              }))
          );
          setResourceList(resourcesWithNumbers);
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
