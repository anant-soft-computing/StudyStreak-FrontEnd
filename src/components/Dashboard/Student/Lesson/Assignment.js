import React from "react";
import Table from "../../../UI/Table";

const Assignment = ({ activeLesson }) => {
  const assignments = activeLesson
    ?.filter(
      (exam) =>
        exam.block_type === "Assignments" &&
        exam.exam_type === "General" &&
        exam.exam_category === "GENERAL"
    )
    .map((item, index) => {
      return {
        ...item,
        no: index + 1,
      };
    });

  const viewAssignment = (params) => {
    return (
      <button
        className="take-test"
        onClick={() =>
          window.open(
            `/assignment/${params.data.exam_type}/${params.data.id}`,
            "_blank"
          )
        }
      >
        View
      </button>
    );
  };

  const columns = [
    { headerName: "No", field: "no", resizable: false, width: 80 },
    { headerName: "Name", field: "exam_name", filter: true, width: 350 },
    {
      headerName: "No Of Questions",
      field: "no_of_questions",
      filter: true,
      width: 220,
    },
    {
      headerName: "View Assignment",
      field: "button",
      cellRenderer: viewAssignment,
      filter: true,
      width: 220,
    },
  ];

  return assignments && assignments.length > 0 ? (
    <Table rowData={assignments} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">Assignment Not Found !!</h5>
  );
};

export default Assignment;
