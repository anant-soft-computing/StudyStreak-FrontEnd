import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  { headerName: "No.", field: "no" },
  { headerName: "Name", field: "title", filter: true },
  { headerName: "Description", field: "description", filter: true },
  { headerName: "Priority", field: "set_priority", filter: true },
  { headerName: "Course", field: "course.Course_Title", filter: true },
  { headerName: "Items", field: "flash_card_items.length", filter: true },
];

const ViewFlashCard = () => {
  const [flashCardList, setFlashCardList] = useState([]);

  console.log("flashCardList", flashCardList);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/get/flashcard/`,
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
          const flashCardWithNumbers = response?.data?.map((flashCard, index) => ({
            ...flashCard,
            no: index + 1,
          }));
          setFlashCardList(flashCardWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const gridOptions = {
    rowData: flashCardList,
    columnDefs: columns,
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

export default ViewFlashCard;