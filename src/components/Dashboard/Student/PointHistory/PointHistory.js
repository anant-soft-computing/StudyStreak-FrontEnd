import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";

const specificColumns = {
  "Flash Card": [
    { headerName: "No.", field: "no", width: 80 },
    { headerName: "Name", field: "title", filter: true, width: 400 },
    {
      headerName: "Description",
      field: "description",
      filter: true,
      width: 450,
    },
    {
      headerName: "Flash Card Items",
      field: "flash_card_items.length",
      filter: true,
      width: 220,
    },
    { headerName: "Point", field: "points", filter: true, width: 220 },
  ],
  "Exam Block": [
    { headerName: "No.", field: "no", width: 80 },
    { headerName: "Exam Name", field: "exam_name", filter: true, width: 300 },
    { headerName: "Exam Type", field: "exam_type", filter: true, width: 300 },
    {
      headerName: "Exam Category",
      field: "exam_category",
      filter: true,
      width: 280,
    },
    {
      headerName: "No Of Questions",
      field: "no_of_questions",
      filter: true,
      width: 200,
    },
    { headerName: "Point", field: "points", filter: true, width: 200 },
  ],
  "Practice Test": [
    { headerName: "No.", field: "no", width: 220 },
    { headerName: "Exam Name", field: "Name", filter: true, width: 450 },
    {
      headerName: "Exam Type",
      field: "practice_test_type",
      filter: true,
      width: 450,
    },
    { headerName: "Point", field: "points", filter: true, width: 250 },
  ],
  "Full Length Test": [
    { headerName: "No.", field: "no", width: 160 },
    { headerName: "Exam Name", field: "name", filter: true },
    {
      headerName: "Reading Set",
      field: "reading_set.Reading.length",
      filter: true,
    },
    {
      headerName: "Writing Set",
      field: "writing_set.Writing.length",
      filter: true,
    },
    {
      headerName: "Listening Set",
      field: "listening_set.Listening.length",
      filter: true,
    },
    {
      headerName: "Speaking Set",
      field: "speaking_set.Speaking.length",
      filter: true,
    },
    { headerName: "Point", field: "points", filter: true },
  ],
};

const options = [
  { value: "Flash Card", label: "Flash Card" },
  { value: "Exam Block", label: "Mock Test" },
  { value: "Practice Test", label: "Practice Test" },
  { value: "Full Length Test", label: "Full Length Test" },
];

const endpoints = {
  "Flash Card": `/gamification/flashcard/`,
  "Exam Block": `/exam-blocks/?fields=id,exam_name,exam_type,exam_category,no_of_questions`,
  "Full Length Test": `/get/flt/`,
  "Practice Test": `/moduleListView/`,
};

const PointHistory = ({ setTotalPoints }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("Flash Card");
  const [dataList, setDataList] = useState([]);
  const [pointHistory, setPointHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ajaxCall(
          `/gamification/points/`,
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
          const points = response?.data?.map((item, index) => ({
            ...item,
            no: index + 1,
          }));
          setPointHistory(points);
          setTotalPoints(response?.data?.reduce((a, b) => a + b.points, 0));
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setTotalPoints]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await ajaxCall(
          endpoints[content],
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
          setDataList(response?.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [content]);

  const getFilteredDataList = () => {
    return dataList
      .filter((item) =>
        pointHistory.some((i) => i.object_id === item.id && i.model === content)
      )
      .map((item, index) => ({
        ...item,
        no: index + 1,
        points:
          pointHistory.find(
            (i) => i.object_id === item.id && i.model === content
          )?.points || 0,
      }));
  };

  const columns = specificColumns[content] || [];

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-end">
        <div className="col-2 mb-3">
          <div className="dashboard__form__wraper">
            <div className="dashboard__form__input">
              <select
                className="form-select"
                aria-label="Default select example"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12">
        <div className="dashboard__table table-responsive">
          {isLoading ? (
            <Loading />
          ) : getFilteredDataList().length > 0 ? (
            <Table rowData={getFilteredDataList()} columnDefs={columns} />
          ) : (
            <h5 className="text-center text-danger">No Point Available !!</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default PointHistory;