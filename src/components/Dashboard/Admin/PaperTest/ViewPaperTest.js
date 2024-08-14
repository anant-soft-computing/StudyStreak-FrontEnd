import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";

const Download= ({ url }) =>
  url !== "-" ? (
    <button className="take-test" onClick={() => window.open(url)}>
      <i className="icofont-download" /> Download
    </button>
  ) : (
    "-"
  );

const columns = [
  { headerName: "No.", field: "no", width: 90 },
  {
    headerName: "Course",
    field: "course",
    resizable: true,
    filter: true,
    width: 480,
  },
  {
    headerName: "Description",
    field: "description",
    resizable: true,
    filter: true,
    width: 480,
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

const formatPaperTestData = (responseData) => {
  return responseData.flatMap((item, index) => {
    const filteredDocuments = item?.documents?.filter((document) =>
      document.description.includes("Paper Test")
    );
    return (
      filteredDocuments?.map((document, docIndex) => ({
        no: `${index + 1}. (${docIndex + 1}).`,
        course:
          item?.course?.length > 0
            ? item?.course?.map((course) => course.Course_Title).join(", ")
            : "-",
        description: document?.description || "-",
        document: document?.document || "-",
      })) || []
    );
  });
};

const ViewPaperTest = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [paperTestList, setPaperTestList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    const fetchPaperTests = async () => {
      if (activeTab !== "View Paper Test") return;
      setIsLoading(true);
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
          const data = formatPaperTestData(response?.data);
          setPaperTestList(data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPaperTests();
  }, [activeTab, authData?.accessToken]);

  if (isLoading) {
    return <Loading text="Loading..." color="primary" />;
  }

  if (paperTestList.length === 0) {
    return (
      <h5 className="text-center text-danger">No Paper Test Available !!</h5>
    );
  }

  return <Table rowData={paperTestList} columnDefs={columns} />;
};

export default ViewPaperTest;
