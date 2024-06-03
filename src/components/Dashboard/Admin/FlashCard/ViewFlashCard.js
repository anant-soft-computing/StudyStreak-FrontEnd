import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ajaxCall from "../../../../helpers/ajaxCall";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 110 },
  { headerName: "Name", field: "title", filter: true },
  { headerName: "Description", field: "description", filter: true },
  { headerName: "Priority", field: "set_priority", filter: true },
  { headerName: "Course", field: "course.Course_Title", filter: true },
  { headerName: "Items", field: "flash_card_items.length", filter: true },
];

const ViewFlashCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [flashCardList, setFlashCardList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await ajaxCall(
          `/gamification/flashcard/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${authData?.accessToken}`,
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
          setIsLoading(false);
          setFlashCardList(flashCardWithNumbers);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [authData?.accessToken]);

  return isLoading ? (
    <Loading text="Loading..." color="primary" />
  ) : flashCardList.length > 0 ? (
    <Table rowData={flashCardList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Flash Cards Available !!</h5>
  );
};

export default ViewFlashCard;
