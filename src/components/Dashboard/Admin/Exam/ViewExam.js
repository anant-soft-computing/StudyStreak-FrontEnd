import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";

const ViewExam = () => {
  const [examList, setExamList] = useState([]);
  const [speakingList, setSpeakingList] = useState([]);
  const [ptList, setPtList] = useState([]);
  const [fltList, setFltList] = useState([]);

  const mtData = [...examList, ...speakingList];
  const miniTestData = mtData.map((item, index) => ({
    ...item,
    no: index + 1,
  }));

  const fetchData = async (url, filterFn, setData) => {
    try {
      const response = await ajaxCall(
        url,
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

      if (response.status === 200) {
        const filteredData = response.data.filter(filterFn);
        const dataWithNumbers = filteredData.map((item, index) => ({
          ...item,
          no: index + 1,
        }));
        setData(dataWithNumbers);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData(
      "/exam-blocks/",
      ({ block_type }) => block_type === "Mock Test",
      setExamList
    );
    fetchData("/speaking-block/", () => true, setSpeakingList);
    fetchData("/moduleListView/", () => true, setPtList);
    fetchData("/get/flt/", () => true, setFltList);
  }, []);

  return (
    <div>
      <div className="dashboard__form__wraper">
        <div className="dashboard__form__input">
          <label>(1) Mock Tests : </label>
        </div>
      </div>
      <Table
        rowData={miniTestData}
        columnDefs={[
          { headerName: "No.", field: "no", resizable: false, width: 68 },
          {
            headerName: "Exam Name",
            field: "exam_name" || "name",
            filter: true,
            valueGetter: (params) => {
              return params.data?.exam_name || params.data?.name;
            },
          },
          {
            headerName: "Exam Type",
            field: "exam_type" || "Speaking",
            filter: true,
            valueGetter: (params) => {
              return params.data?.exam_type || "Speaking";
            },
          },
          {
            headerName: "No. Of Questions",
            field: "no_of_questions" || "questions.length",
            filter: true,
            valueGetter: (params) => {
              return (
                params.data?.no_of_questions || params.data?.questions.length
              );
            },
          },
          {
            headerName: "Block Type",
            field: "block_type" || "Mock Test",
            filter: true,
            valueGetter: (params) => {
              return params.data?.block_type || "Mock Test";
            },
          },
          {
            headerName: "Difficulty Level",
            field: "difficulty_level",
            filter: true,
          },
          {
            headerName: "Block Threshold",
            field: "block_threshold",
            filter: true,
          },
        ]}
      />
      <div>
        <div>
          <div className="dashboard__form__wraper mt-4">
            <div className="dashboard__form__input">
              <label>(2) Practice Tests : </label>
            </div>
          </div>
          <Table
            rowData={ptList}
            columnDefs={[
              { headerName: "No.", field: "no", resizable: false, width: 68 },
              { headerName: "Exam Name", field: "Name", filter: true },
              {
                headerName: "Difficulty Level",
                field: "difficulty_level",
                filter: true,
              },
              {
                headerName: "Reading Set",
                field: "Reading.length",
                filter: true,
              },
              {
                headerName: "Writing Set",
                field: "Writing.length",
                filter: true,
              },
              {
                headerName: "Listening Set",
                field: "Listening.length",
                filter: true,
              },
              {
                headerName: "Speaking Set",
                field: "Speaking.length",
                filter: true,
              },
            ]}
          />
        </div>

        <div>
          <div className="dashboard__form__wraper mt-4">
            <div className="dashboard__form__input">
              <label>(3) Full Length Tests : </label>
            </div>
          </div>
          <Table
            rowData={fltList}
            columnDefs={[
              { headerName: "No.", field: "no", resizable: false, width: 68 },
              { headerName: "Exam Name", field: "name", filter: true },
              {
                headerName: "Exam Level",
                field: "difficulty_level",
                filter: true,
              },
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
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewExam;
