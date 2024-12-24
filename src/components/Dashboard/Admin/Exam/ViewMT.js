import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const ViewMT = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [examType, setExamType] = useState("Reading");
  const [mockTestData, setMockTestData] = useState([]);
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
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [authData?.accessToken]
  );

  useEffect(() => {
    if (activeTab !== "View MT") return;

    if (examType === "Speaking") {
      fetchData("/speaking-block/", setMockTestData);
    } else {
      fetchData(
        `/exam-blocks/?fields=id,block_type,exam_category,exam_name,no_of_questions,exam_type,sub_category&exam_type=${examType}`,
        setMockTestData
      );
    }
  }, [activeTab, authData.accessToken, examType, fetchData]);

  const miniTestData = mockTestData.map((item, index) => ({
    ...item,
    no: index + 1,
  }));

  const columns = [
    { headerName: "No.", field: "no", resizable: false, width: 135 },
    {
      headerName: "Exam Name",
      field: "exam_name",
      filter: true,
      valueGetter: (params) => params.data?.exam_name || params.data?.name,
      width: 330,
    },
    {
      headerName: "Exam Type",
      field: "exam_type",
      filter: true,
      valueGetter: (params) => params.data?.exam_type || "Speaking",
      width: 330,
    },
    {
      headerName: "Exam Category",
      field: "exam_category",
      filter: true,
      valueGetter: (params) => params.data?.exam_category || "Speaking",
      width: 330,
    },
    {
      headerName: "Block Type",
      field: "block_type",
      filter: true,
      valueGetter: (params) => params.data?.block_type || "Mock Test",
      width: 330,
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (miniTestData.length === 0) {
    return (
      <h5 className="text-center text-danger">No Mock Test Available !!</h5>
    );
  }

  return (
    <div>
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
            <option>Reading</option>
            <option>Writing</option>
            <option>Listening</option>
            <option>Speaking</option>
            <option>General</option>
          </select>
        </div>
      </div>
      <Table rowData={miniTestData} columnDefs={columns} />
    </div>
  );
};

export default ViewMT;
