import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";
import ajaxCall from "../../../../helpers/ajaxCall";

const columns = [
  { headerName: "No.", field: "no", resizable: false, width: 120 },
  { headerName: "Name", field: "title", filter: true, width: 450 },
  { headerName: "Description", field: "description", filter: true, width: 500 },
  {
    headerName: "Items",
    field: "flash_card_items.length",
    filter: true,
    width: 380,
  },
];

const ViewFlashCard = ({ activeTab }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [flashCardList, setFlashCardList] = useState([]);
  const authData = useSelector((state) => state.authStore);

  useEffect(() => {
    if (activeTab === "View FlashCard") {
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
            setFlashCardList(flashCardWithNumbers);
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [activeTab, authData?.accessToken]);

  return isLoading ? (
    <Loading />
  ) : flashCardList.length > 0 ? (
    <Table rowData={flashCardList} columnDefs={columns} />
  ) : (
    <h5 className="text-center text-danger">No Flash Cards Available !!</h5>
  );
};

export default ViewFlashCard;
