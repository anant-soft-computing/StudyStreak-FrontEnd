import { useNavigate } from "react-router-dom";
import Table from "../../../UI/Table";

const Assignment = ({ activeLesson }) => {
  const navigate = useNavigate();

  const assignments = activeLesson?.filter(
    (exam) =>
      exam.block_type === "Assignments" &&
      exam.exam_type === "General" &&
      exam.exam_category === "GENERAL"
  );

  const viewAssignment = (params) => {
    return (
      <button
        className="take-test"
        onClick={() => navigate(`/assignment/General/${params.data.id}`)}
      >
        View
      </button>
    );
  };

  const columns = [
    {
      headerName: "View Assignment",
      field: "button",
      cellRenderer: viewAssignment,
      filter: true,
      width: 260,
    },
    { headerName: "Name", field: "exam_name", filter: true, width: 350 },
    { headerName: "No Of Questions", field: "no_of_questions", filter: true, width: 280 },
  ];

  return assignments && assignments.length > 0 ? (
    <Table rowData={assignments} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">Assignment Not Found !!</h5>
  );
};

export default Assignment;
