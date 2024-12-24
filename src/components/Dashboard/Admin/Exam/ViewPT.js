import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const ViewPT = ({ activeTab }) => {
  const [ptList, setPtList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [examType, setExamType] = useState("Reading");
  const authData = useSelector((state) => state.authStore);

  const ptData = ptList.map((item, index) => ({
    ...item,
    no: index + 1,
  }));

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
    if (activeTab !== "View PT") return;

    fetchData(`/moduleListView/?exam_type=${examType}`, setPtList);
  }, [activeTab, authData.accessToken, examType, fetchData]);

  const columns = [
    {
      headerName: "No.",
      field: "no",
      resizable: false,
      width: 200,
    },
    {
      headerName: "Exam Name",
      field: "Name",
      filter: true,
      width: 370,
    },
    {
      headerName: "Exam Category",
      field: "category",
      filter: true,
      width: 300,
    },
    {
      headerName: "Exam Sub Category",
      field: "sub_category",
      filter: true,
      width: 300,
    },
    ...(examType === "Reading"
      ? [
          {
            headerName: "Reading Set",
            field: "reading_count",
            filter: true,
            width: 265,
          },
        ]
      : []),
    ...(examType === "Writing"
      ? [
          {
            headerName: "Writing Set",
            field: "writing_count",
            filter: true,
            width: 265,
          },
        ]
      : []),
    ...(examType === "Listening"
      ? [
          {
            headerName: "Listening Set",
            field: "listening_count",
            filter: true,
            width: 265,
          },
        ]
      : []),
    ...(examType === "Speaking"
      ? [
          {
            headerName: "Speaking Set",
            field: "speaking_count",
            filter: true,
            width: 265,
          },
        ]
      : []),
  ];

  if (isLoading) {
    return <Loading />;
  }

  if (ptData.length === 0) {
    return (
      <h5 className="text-center text-danger">No Practice Test Available !!</h5>
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
      <Table rowData={ptData} columnDefs={columns} />
    </div>
  );
};

export default ViewPT;
