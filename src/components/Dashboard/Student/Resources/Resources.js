import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import SmallModal from "../../../UI/Modal";
import DSSidebar from "../DSSideBar/DSSideBar";
import BuyCourse from "../BuyCourse/BuyCourse";
import ajaxCall from "../../../../helpers/ajaxCall";

const documentsColumns = [
  {
    headerName: "No.",
    field: "no",
    filter: true,
    cellRenderer: (params) => params.rowIndex + 1,
    width: 110,
  },
  {
    headerName: "Description",
    field: "description",
    filter: true,
    width: 450,
  },
  {
    headerName: "Download",
    field: "document",
    filter: true,
    width: 200,
    cellRenderer: (params) => {
      return params.value !== null ? (
        <button className="take-test" onClick={() => window.open(params.value)}>
          <i className="icofont-download" /> Download
        </button>
      ) : (
        "-"
      );
    },
  },
];

const Resources = () => {
  const { packageCount } = useLocation().state || {};
  const [isLoading, setIsLoading] = useState(true);
  const [resourcesList, setResourceList] = useState([]);

  const [documents, setDocuments] = useState([]);
  const [openDocuments, setOpenDocuments] = useState(false);

  const category = localStorage.getItem("category");
  const batchIds = JSON?.parse(localStorage.getItem("BatchIds"));
  const courseIds = JSON?.parse(localStorage.getItem("courses"));
  const studentId = JSON?.parse(localStorage.getItem("StudentID"));

  const handleDocuments = (document) => {
    setOpenDocuments(true);
    setDocuments(document);
  };

  const filterResources = useCallback(
    (data) => {
      return data.filter((item) => {
        const studentMatch = item?.student?.some((s) => s?.id === studentId);
        const batchMatch = item?.batch?.some((b) => batchIds?.includes(b?.id));
        const courseMatch = item?.course?.some(
          (c) => courseIds?.includes(c?.id) && c?.category === category
        );
        return studentMatch || batchMatch || courseMatch;
      });
    },
    [category]
  );

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          "/resources/?is_paper=false",
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
          const filteredResources = filterResources(response?.data);
          setResourceList(filteredResources);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [filterResources]);

  const columns = [
    {
      headerName: "No.",
      cellRenderer: (params) => params.rowIndex + 1,
      width: 85,
    },
    {
      name: "Student",
      field: "student",
      filter: true,
      width: 350,
      cellRenderer: (params) =>
        params?.value?.some(({ id }) => id === studentId)
          ? `${
              params?.value.find(({ id }) => id === studentId)?.user.first_name
            } ${
              params?.value.find(({ id }) => id === studentId)?.user.last_name
            }`
          : "-",
    },
    {
      name: "Batch",
      field: "batch",
      filter: true,
      width: 350,
      cellRenderer: (params) =>
        params?.value
          ?.filter(({ id }) => batchIds?.includes(id))
          ?.map(({ batch_name }) => batch_name)
          ?.join(", ") || "-",
    },
    {
      name: "Course",
      field: "course",
      filter: true,
      width: 350,
      cellRenderer: (params) =>
        params?.value
          ?.filter(
            (item) =>
              courseIds?.includes(item?.id) && item?.category === category
          )
          ?.map(({ Course_Title }) => Course_Title)
          ?.join(", ") || "-",
    },
    {
      headerName: "Video / Link",
      field: "link",
      width: 160,
      cellRenderer: (params) =>
        params.value ? (
          <button
            className="take-test"
            onClick={() => window.open(params.value)}
          >
            View
          </button>
        ) : (
          "-"
        ),
    },
    {
      headerName: "Documents",
      field: "documents",
      width: 160,
      cellRenderer: (params) => {
        return params.value.length > 0 ? (
          <button
            className="take-test"
            onClick={() => handleDocuments(params.value)}
          >
            View
          </button>
        ) : (
          "-"
        );
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
                      <h4>Resources</h4>
                    </div>
                    <div className="row">
                      {packageCount === 0 ? (
                        <BuyCourse message="No Resources Available, Please Buy a Course !!" />
                      ) : isLoading ? (
                        <Loading />
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
      <SmallModal
        size="lg"
        centered
        isOpen={openDocuments}
        onClose={() => setOpenDocuments(false)}
        title="Documents"
      >
        <Table columnDefs={documentsColumns} rowData={documents} />
      </SmallModal>
    </div>
  );
};

export default Resources;
