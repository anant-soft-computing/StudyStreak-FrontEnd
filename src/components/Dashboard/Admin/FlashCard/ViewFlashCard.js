import React, { useEffect, useState } from "react";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 110 },
  { headerName: "Name", field: "title", filter: true },
  { headerName: "Description", field: "description", filter: true },
  { headerName: "Priority", field: "set_priority", filter: true },
  { headerName: "Course", field: "course.Course_Title", filter: true },
  { headerName: "Items", field: "flash_card_items.length", filter: true },
];

const ViewFlashCard = () => {
  const [flashCardList, setFlashCardList] = useState([]);

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
          const flashCardWithNumbers = response?.data?.map(
            (flashCard, index) => ({
              ...flashCard,
              no: index + 1,
            })
          );
          setFlashCardList(flashCardWithNumbers);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  return <Table rowData={flashCardList} columnDefs={columns} />;
};

export default ViewFlashCard;
