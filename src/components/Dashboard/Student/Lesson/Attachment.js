import React from "react";
import Table from "../../../UI/Table";

const Attachment = ({ activeLesson }) => {
  const doDownload = (params) => {
    return (
      <button
        className="take-test"
        onClick={() => window.open(`http://studystreak.in${params.value}`)}
      >
        <i className="icofont-download" /> Download
      </button>
    );
  };

  const columns = [
    {
      headerName: "Lesson Name",
      field: "lesson.Lesson_Title",
      filter: true,
      width: 350,
    },
    {
      headerName: "Description",
      field: "attachment_description",
      filter: true,
      width: 255,
    },
    {
      headerName: "Download",
      field: "attachment",
      cellRenderer: doDownload,
    },
  ];

  return activeLesson && activeLesson.length > 0 ? (
    <Table rowData={activeLesson} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">Attachment Not Found !!</h5>
  );
};

export default Attachment;
