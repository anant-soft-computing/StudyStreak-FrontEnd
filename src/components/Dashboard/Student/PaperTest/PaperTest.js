import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";
import BuyCourse from "../BuyCourse/BuyCourse";

const Download = ({ url }) =>
  url !== "-" ? (
    <button className="take-test" onClick={() => window.open(url)}>
      <i className="icofont-download" /> Download
    </button>
  ) : (
    "-"
  );

const ViewButton = ({ url }) =>
  url !== "-" ? (
    <button className="take-test" onClick={() => window.open(url)}>
      View
    </button>
  ) : (
    "-"
  );

const columns = [
  { headerName: "No.", field: "no", width: 90 },
  { headerName: "Student", field: "student", resizable: true, filter: true },
  { headerName: "Course", field: "course", resizable: true, filter: true },
  { headerName: "Batch", field: "batch", resizable: true, filter: true },
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
    cellRenderer: (params) => <ViewButton url={params.value} />,
  },
  {
    headerName: "Documents",
    field: "document",
    resizable: true,
    cellRenderer: (params) => <Download url={params.value} />,
    filter: true,
    width: 400,
  },
];

const PaperTest = () => {
  const { packageCount } = useLocation().state || {};
  const [isLoading, setIsLoading] = useState(true);
  const [paperTestList, setPaperTestList] = useState([]);

  const category = localStorage.getItem("category");
  const batchIds = JSON?.parse(localStorage.getItem("BatchIds"));
  const courseIds = JSON?.parse(localStorage.getItem("courses"));
  const studentId = JSON?.parse(localStorage.getItem("StudentID"));

  const filterPaperTest = useCallback(
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

  const formatPaperTest = useCallback(
    (resources) => {
      return resources.flatMap((item, index) => {
        const baseData = {
          no: `${index + 1}.`,
          student: item?.student?.some((s) => s?.id === studentId)
            ? `${
                item.student.find((s) => s?.id === studentId)?.user.first_name
              } ${
                item.student.find((s) => s?.id === studentId)?.user.last_name
              }`
            : "-",
          batch:
            item?.batch
              ?.filter((b) => batchIds?.includes(b?.id))
              ?.map((b) => b?.batch_name)
              ?.join(", ") || "-",
          course:
            item?.course
              ?.filter(
                (c) => courseIds?.includes(c?.id) && c?.category === category
              )
              ?.map((c) => c?.Course_Title)
              ?.join(", ") || "-",
          link: item?.link || "-",
        };

        const filteredDocuments = item?.documents?.filter((document) =>
          document.description.includes("Paper Test")
        );

        return filteredDocuments.map((document) => ({
          ...baseData,
          description: document?.description || "-",
          document: document?.document || "-",
        }));
      });
    },
    [category]
  );

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
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
          const filteredResources = filterPaperTest(response?.data);
          const formattedResources = formatPaperTest(filteredResources);
          setPaperTestList(formattedResources);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, [filterPaperTest, formatPaperTest]);

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
                      <h4>Paper Test</h4>
                    </div>
                    <div className="row">
                      {packageCount === 0 ? (
                        <BuyCourse message="No Paper Test Available, Please Buy a Course !!" />
                      ) : isLoading ? (
                        <Loading />
                      ) : paperTestList.length > 0 ? (
                        <Table rowData={paperTestList} columnDefs={columns} />
                      ) : (
                        <h5 className="text-center text-danger">
                          No Paper Test Available !!
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

export default PaperTest;