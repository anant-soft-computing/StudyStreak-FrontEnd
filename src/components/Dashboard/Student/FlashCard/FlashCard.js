import React, { useEffect, useState } from "react";
import "../../../../css/custom.css";
import ajaxCall from "../../../../helpers/ajaxCall";
import FlashCardModal from "./FlashCardModal";

const FlashCard = ({ courseId }) => {
  const [flashCardList, setFlashCardList] = useState([]);
  const [isFlipped, setIsFlipped] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

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
          setFlashCardList(
            response?.data.filter(
              (item) => item?.course?.id === parseInt(courseId)
            )
          );

          const initialFlipState = response.data.reduce((acc, curr) => {
            acc[curr.id] = false;
            return acc;
          }, {});

          setIsFlipped(initialFlipState);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [courseId]);

  const handleCloseModal = () => {
    setModalShow(false);
    setCurrentCardIndex(0);
  };

  return flashCardList.length > 0 ? (
    flashCardList.map(
      ({ id, description, set_priority, course, flash_card_items }) => (
        <>
          <div className="lesson__content__wrap">
            <h3>Flash Card</h3>
          </div>
          <div className="row">
            <div
              key={id}
              className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12 card__title"
              data-aos="fade-up"
            >
              <div
                className="gridarea__wraper gridarea__wraper__2 global-neomorphism-card-styling"
                onClick={() => setModalShow(true)}
              >
                <div className="gridarea__content">
                  <div className="gridarea__heading">
                    <h3>{course?.Course_Title}</h3>
                  </div>
                  <div className="zoom__meeting__id">
                    <p>
                      Description :{" "}
                      <span className="start__time">{description}</span>
                    </p>
                  </div>
                  <div className="zoom__meeting__id">
                    <p>
                      Priority :{" "}
                      <span className="start__time">{set_priority}</span>
                    </p>
                  </div>
                </div>
              </div>
              <FlashCardModal
                show={modalShow}
                onHide={handleCloseModal}
                flash_card_items={flash_card_items}
                isFlipped={isFlipped}
                setIsFlipped={setIsFlipped}
                currentCardIndex={currentCardIndex}
                setCurrentCardIndex={setCurrentCardIndex}
              />
            </div>
          </div>
        </>
      )
    )
  ) : (
    <h5 className="text-danger">No Flash Card Available !!</h5>
  );
};

export default FlashCard;
