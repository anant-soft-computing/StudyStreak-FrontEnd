import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const examsCategory = [
  { name: "IELTS", value: "IELTS" },
  { name: "GRE", value: "GRE" },
  { name: "GMAT", value: "GMAT" },
  { name: "PTE", value: "PTE" },
  { name: "GENERAL", value: "GENERAL" },
  { name: "TOFEL", value: "TOFEL" },
];

const categoryToExamTypes = {
  IELTS: ["Reading", "Writing", "Listening", "Speaking"],
  PTE: ["Reading", "Writing", "Listening", "Speaking"],
  TOFEL: ["Reading", "Writing", "Listening", "Speaking"],
  GRE: [
    "AWA",
    "Integrated Reasoning",
    "Quantitative Reasoning",
    "Verbal Reasoning",
  ],
  GMAT: [
    "AWA",
    "Integrated Reasoning",
    "Quantitative Reasoning",
    "Verbal Reasoning",
  ],
  GENERAL: ["General"],
};

const ViewMT = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [examType, setExamType] = useState("Reading");
  const [mockTestData, setMockTestData] = useState([]);
  const [examCategory, setExamCategory] = useState("IELTS");
  const authData = useSelector((state) => state.authStore);

  const fetchData = useCallback(
    async (url, setDataCallback) => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          url,
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
          setDataCallback(response.data);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    },
    [authData?.accessToken]
  );

  useEffect(() => {
    if (activeTab !== "View MT") return;

    if (examType === "Speaking") {
      fetchData(
        `/speaking-block/?exam_category=${examCategory}`,
        setMockTestData
      );
    } else {
      fetchData(
        `/exam/blocks/?exam_category=${examCategory}&exam_type=${examType}`,
        setMockTestData
      );
    }
  }, [activeTab, authData.accessToken, examCategory, examType, fetchData]);

  useEffect(() => {
    const validExamTypes = categoryToExamTypes[examCategory];
    if (!validExamTypes.includes(examType)) {
      setExamType(validExamTypes[0]);
    }
  }, [examCategory, examType]);

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 68,
      cellRenderer: (params) => params.rowIndex + 1,
    },
    {
      headerName: "Exam Name",
      field: "exam_name",
      filter: true,
      valueGetter: (params) => params.data?.exam_name || params.data?.name,
      width: 350,
    },
    {
      headerName: "Exam Category",
      field: "exam_category",
      filter: true,
      valueGetter: (params) => params.data?.exam_category || "Speaking",
      width: 340,
    },
    {
      headerName: "Exam Sub Category",
      field: "sub_category",
      filter: true,
      valueGetter: (params) => params.data?.sub_category || "-",
      width: 340,
    },
    {
      headerName: "Exam Type",
      field: "exam_type",
      filter: true,
      valueGetter: (params) => params.data?.exam_type || "Speaking",
      width: 340,
    },
  ];

  return (
    <div>
      <div className="row">
        <div className="col-xl-2 mb-4">
          <div className="dashboard__select__heading">
            <span>Exam Category</span>
          </div>
          <div className="dashboard__selector">
            <select
              className="form-select"
              aria-label="Default select example"
              value={examCategory}
              onChange={(e) => setExamCategory(e.target.value)}
            >
              {examsCategory.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-xl-2 mb-4">
          <div className="dashboard__select__heading">
            <span>Exam Type</span>
          </div>
          <div className="dashboard__selector">
            <select
              className="form-select"
              aria-label="Default select example"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
            >
              {categoryToExamTypes[examCategory].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : mockTestData.length > 0 ? (
        <Table rowData={mockTestData} columnDefs={columns} />
      ) : (
        <h5 className="text-center text-danger">No Mock Test Available !!</h5>
      )}
    </div>
  );
};

export default ViewMT;
