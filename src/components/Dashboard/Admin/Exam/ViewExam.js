import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ajaxCall from "../../../../helpers/ajaxCall";

const ExamGrid = ({ no, rowData, columnDefs }) => {
  const gridStyle = {
    width: no === 1 || no === 2 ? "54%" : "100%",
  };
  const gridOptions = {
    rowData,
    columnDefs,
    pagination: true,
    paginationPageSize: 20,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  };

  return (
    <div className="ag-theme-alpine" style={gridStyle}>
      <AgGridReact {...gridOptions} />
    </div>
  );
};

const ViewExam = () => {
  const [examList, setExamList] = useState([]);
  const [ptList, setPtList] = useState([]);
  const [fltList, setFltList] = useState([]);

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
    fetchData("/exam-blocks", () => true, setExamList);
    fetchData(
      "/moduleListView",
      ({ exam_test }) => exam_test === "Practice",
      setPtList
    );
    fetchData(
      "/moduleListView",
      ({ exam_test }) => exam_test === "Full Length",
      setFltList
    );
  }, []);

  return (
    <div>
      <div className="dashboard__form__wraper">
        <div className="dashboard__form__input">
          <label>(1) Mock Tests : </label>
        </div>
      </div>
      <ExamGrid
        no={0}
        rowData={examList}
        columnDefs={[
          { headerName: "No.", field: "no" },
          { headerName: "Exam Name", field: "exam_name", filter: true },
          { headerName: "Exam Type", field: "exam_type", filter: true },
          {
            headerName: "No. Of Questions",
            field: "no_of_questions",
            filter: true,
          },
          { headerName: "Block Type", field: "block_type", filter: true },
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
          <ExamGrid
            no={1}
            rowData={ptList}
            columnDefs={[
              { headerName: "No.", field: "no" },
              { headerName: "Exam Name", field: "Name", filter: true },
              { headerName: "Exam Type", field: "exam_test", filter: true },
            ]}
          />
        </div>

        <div>
          <div className="dashboard__form__wraper mt-4">
            <div className="dashboard__form__input">
              <label>(3) Full Length Tests : </label>
            </div>
          </div>
          <ExamGrid
            no={2}
            rowData={fltList}
            columnDefs={[
              { headerName: "No.", field: "no" },
              { headerName: "Exam Name", field: "Name", filter: true },
              { headerName: "Exam Type", field: "exam_test", filter: true },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewExam;
