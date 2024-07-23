import React, { useEffect, useState } from "react";
import "../../../../css/custom.css";
import DSSidebar from "../DSSideBar/DSSideBar";
import ajaxCall from "../../../../helpers/ajaxCall";
import FlashCardModal from "./FlashCardModal";
import Table from "../../../UI/Table";
import Loading from "../../../UI/Loading";

const FlashCard = () => {
  const [cardID, setCardID] = useState(0);
  const [flashCardList, setFlashCardList] = useState([]);
  const [isFlipped, setIsFlipped] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [flashCardItems, setFlashCardItems] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const courseIds = JSON.parse(localStorage.getItem("courses"));

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
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response?.status === 200) {
          setFlashCardList(
            response?.data?.filter((item) =>
              courseIds?.some((data) => data?.id === item?.course?.id)
            )
          );

          const initialFlipState = response?.data?.reduce((acc, curr) => {
            acc[curr.id] = false;
            return acc;
          }, {});
          setIsLoading(false);
          setIsFlipped(initialFlipState);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log("error", error);
      }
    })();
  }, []);

  const handleCloseModal = () => {
    setModalShow(false);
    setCurrentCardIndex(0);
  };

  const handleViewCard = (data) => {
    setModalShow(true);
    setCardID(data?.id);
    setFlashCardItems(data?.flash_card_items);
  };

  const viewCard = (params) => {
    const { data } = params;
    return (
      <button className="take-test" onClick={() => handleViewCard(data)}>
        Open Card
      </button>
    );
  };

  const columns = [
    {
      headerName: "View Card",
      field: "button",
      cellRenderer: viewCard,
      width: 166,
    },
    { headerName: "Title", field: "title", filter: true, width: 250 },
    {
      headerName: "Course Name",
      field: "course.Course_Title",
      filter: true,
    },
    {
      headerName: "Description",
      field: "description",
      filter: true,
      width: 300,
    },
    {
      headerName: "Priority",
      field: "set_priority",
      filter: true,
    },
  ];

  return (
    <div className="body__wrapper">
      <div className="main_wrapper overflow-hidden">
        <div className="dashboardarea sp_bottom_100">
          <div className="dashboard">
            <div className="container-fluid full__width__padding">
              <div className="row">
                <DSSidebar />
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="dashboard__content__wraper common-background-color-across-app">
                    <div className="dashboard__section__title">
                      <h4>Flash Cards</h4>
                    </div>
                    {isLoading ? (
                      <Loading text="Loading...." color="primary" />
                    ) : flashCardList.length > 0 ? (
                      <Table rowData={flashCardList} columnDefs={columns} />
                    ) : (
                      <h5 className="text-center text-danger">
                        No FlashCard Available !!
                      </h5>
                    )}
                    <FlashCardModal
                      show={modalShow}
                      onHide={handleCloseModal}
                      cardID={cardID}
                      flash_card_items={flashCardItems}
                      isFlipped={isFlipped}
                      setIsFlipped={setIsFlipped}
                      currentCardIndex={currentCardIndex}
                      setCurrentCardIndex={setCurrentCardIndex}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
