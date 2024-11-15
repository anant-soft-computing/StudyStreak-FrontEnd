import React from "react";
import Table from "../../../UI/Table";

const Attachment = ({ activeLesson }) => {
  const attachment = activeLesson?.map((lesson, index) => {
    return {
      ...lesson,
      no: index + 1,
    };
  });

  const doDownload = (params) => {
    return params.value !== null ? (
      <button
        className="take-test"
        onClick={() => window.open(params.value)}
      >
        <i className="icofont-download" /> Download
      </button>
    ) : (
      "-"
    );
  };

  const columns = [
    { headerName: "No", field: "no", resizable: false, width: 80 },
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

  return attachment && attachment.length > 0 ? (
    <Table rowData={attachment} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">Attachment Not Found !!</h5>
  );
};

export default Attachment;
