import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";

const PaperTest = () => {
  const { courseId } = useParams();
  const [paperTestList, setPaperTestList] = useState([]);

  const Download = ({ url }) =>
    url !== "-" ? (
      <button className="take-test" onClick={() => window.open(url)}>
        <i className="icofont-download" /> Download
      </button>
    ) : (
      "-"
    );

  const formatPaperTestData = useCallback(
    (responseData) => {
      return responseData.flatMap((item) => {
        if (item.course.some((course) => course.id === parseInt(courseId))) {
          const filteredDocuments = item?.documents?.filter((document) =>
            document.description.includes("Paper Test")
          );
          return (
            filteredDocuments?.map((document, docIndex) => ({
              no: docIndex + 1,
              course:
                item?.course
                  .filter((course) => course.id === parseInt(courseId))
                  .map((course) => course.Course_Title)
                  .join(", ") || "-",
              description: document?.description || "-",
              document: document?.document || "-",
            })) || []
          );
        }
        return [];
      });
    },
    [courseId]
  );

  useEffect(() => {
    const fetchPaperTests = async () => {
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
          const formattedData = formatPaperTestData(response.data);
          setPaperTestList(formattedData);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPaperTests();
  }, [courseId, formatPaperTestData]);

  const columns = [
    { headerName: "No", field: "no", width: 100 },
    { headerName: "Course", field: "course" },
    { headerName: "Description", field: "description", width: 380 },
    {
      headerName: "Documents",
      field: "document",
      resizable: true,
      cellRenderer: (params) => <Download url={params.value} />,
    },
  ];

  if (paperTestList.length === 0) {
    return (
      <h5 className="text-center text-danger">No Paper Test Available !!</h5>
    );
  }

  return <Table rowData={paperTestList} columnDefs={columns} />;
};

export default PaperTest;
