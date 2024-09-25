import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";
import ajaxCall from "../../../../helpers/ajaxCall";

const DownloadButton = ({ url }) =>
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
    width: 360,
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
    cellRenderer: (params) => <DownloadButton url={params.value} />,
  },
];

const formatResourceData = (responseData) => {
  return responseData.flatMap((item, index) => {
    const resources =
      item.documents?.length > 0
        ? item.documents.map((document, docIndex) => ({
            no: `${index + 1}. (${docIndex + 1}).`,
            batch:
              item.batch?.length > 0
                ? item.batch.map((batch) => batch.batch_name).join(", ")
                : "-",
            student:
              item.student?.length > 0
                ? item.student
                    .map(
                      (student) =>
                        `${student.user.first_name} ${student.user.last_name}`
                    )
                    .join(", ")
                : "-",
            course:
              item.course?.length > 0
                ? item.course.map((course) => course.Course_Title).join(", ")
                : "-",
            description: document.description || "-",
            document: document.document || "-",
            link: item.link || "-",
          }))
        : [
            {
              no: `${index + 1}.`,
              batch:
                item.batch?.length > 0
                  ? item.batch.map((batch) => batch.batch_name).join(", ")
                  : "-",
              student:
                item.student?.length > 0
                  ? item.student
                      .map(
                        (student) =>
                          `${student.user.first_name} ${student.user.last_name}`
                      )
                      .join(", ")
                  : "-",
              course:
                item.course?.length > 0
                  ? item.course.map((course) => course.Course_Title).join(", ")
                  : "-",
              description: "-",
              document: "-",
              link: item.link || "-",
            },
          ];

    return resources;
  });
};

const ViewResources = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [resourcesList, setResourceList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    if (activeTab === "View Resources") {
      setIsLoading(true);
      const fetchResources = async () => {
        try {
          const response = await ajaxCall(
            `/resources/`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${authData?.accessToken}`,
              },
              method: "GET",
            },
            8000
          );
          if (response?.status === 200) {
            const data = formatResourceData(response?.data);
            setResourceList(data);
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchResources();
    }
  }, [activeTab, authData?.accessToken]);

  return isLoading ? (
    <Loading />
  ) : resourcesList.length > 0 ? (
    <Table rowData={resourcesList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Resources Available !!</h5>
  );
};

export default ViewResources;
