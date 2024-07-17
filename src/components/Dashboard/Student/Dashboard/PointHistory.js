import React, { useEffect, useState } from "react";
import moment from "moment";
import ajaxCall from "../../../../helpers/ajaxCall";
import Loading from "../../../UI/Loading";
import Table from "../../../UI/Table";

const specificColumns = {
  "Flash Card": [
    { headerName: "No.", field: "no", resizable: false, width: 110 },
    { headerName: "Name", field: "title", filter: true },
    { headerName: "Description", field: "description", filter: true },
    { headerName: "Point", field: "points", filter: true },
  ],
  Lesson: [
    { headerName: "Lesson Title", field: "name", filter: true },
    { headerName: "Description", field: "Lesson_Description", filter: true },
    { headerName: "Point", field: "points", filter: true },
  ],
  Course: [
    { headerName: "No.", field: "no", resizable: false, width: 60 },
    { headerName: "Course Title", field: "Course_Title", filter: true },
    { headerName: "Point", field: "points", filter: true },
  ],
  "Exam Block": [
    { headerName: "No.", field: "no", resizable: false, width: 68 },
    { headerName: "Exam Name", field: "exam_name", filter: true },
    { headerName: "Exam Type", field: "exam_type", filter: true },
    { headerName: "Point", field: "points", filter: true },
  ],
  "Full Length Test": [
    { headerName: "No.", field: "no", resizable: false, width: 68 },
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
  "Practice Test": [
    { headerName: "No.", field: "no", resizable: false, width: 68 },
    { headerName: "Exam Name", field: "Name", filter: true },
    { headerName: "Point", field: "points", filter: true },
  ],
  "Live Class": [
    { headerName: "Meeting Title", field: "meeting_title" },
    {
      headerName: "Start Date",
      field: "start_date",
      valueGetter: (params) =>
        moment(params.data.start_time).format("lll"),
    },
    {
      headerName: "End Date",
      field: "end_date",
      valueGetter: (params) =>
        moment(params.data.end_time).format("lll"),
    },
    { headerName: "Description", field: "meeting_description" },
    { headerName: "Batch Name", field: "select_batch.batch_name" },
    { headerName: "Point", field: "points", filter: true },
  ],
};

const options = [
  { value: "Flash Card", label: "Flash Card" },
  { value: "Lesson", label: "Lesson" },
  { value: "Course", label: "Course" },
  { value: "Exam Block", label: "Mock Test" },
  { value: "Full Length Test", label: "Full Length Test" },
  { value: "Practice Test", label: "Practice Test" },
  { value: "Live Class", label: "Live Class" },
];

const endpoints = {
  "Flash Card": `/gamification/flashcard/`,
  Lesson: `/lessonview/`,
  Course: `/courselistview/`,
  "Exam Block": `/exam-blocks/?fields=id,exam_name,exam_type`,
  "Full Length Test": `/get/flt/`,
  "Practice Test": `/moduleListView/`,
  "Live Class": `/liveclass_list_view/`,
};

const PointHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
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
  }, []);

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
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h4>Total Points: {totalPoints}</h4>
        <div className="col-xl-2">
          <div className="dashboard__form__wraper">
            <div className="dashboard__form__input">
              <label>Content</label>
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
            <Loading text="Loading..." color="primary" />
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
