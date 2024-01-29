import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ajaxCall from "../../../../helpers/ajaxCall";

const ViewExam = () => {
  const [examList, setExamList] = useState([]);

  const getExams = async () => {
    try {
      const response = await ajaxCall(
        `/exam-blocks`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );

      if (response.status === 200) {
        const examWithNumbers = response?.data?.map((exam, index) => ({
          ...exam,
          no: index + 1,
        }));
        setExamList(examWithNumbers);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  const gridOptions = {
    rowData: examList,
    columnDefs: [
      { headerName: "No.", field: "no" },
      {
        headerName: "Exam Name",
        field: "exam_name",
        filter: true,
      },
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
      { headerName: "Block Threshold", field: "block_threshold", filter: true },
    ],
    pagination: true,
    paginationPageSize: 20,
    domLayout: "autoHeight",
    defaultColDef: {
      sortable: true,
      resizable: true,
    },
  };

  return (
    <div className="ag-theme-alpine">
      <AgGridReact {...gridOptions} />
    </div>
  );
};
export default ViewExam;
