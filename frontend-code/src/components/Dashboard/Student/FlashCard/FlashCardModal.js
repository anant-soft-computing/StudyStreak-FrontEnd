import React, { useEffect } from "react";
import { toast } from "react-toastify";
import CardFlip from "react-card-flip";
import SmallModal from "../../../UI/Modal";
import ajaxCall from "../../../../helpers/ajaxCall";

const FlashCardModal = ({
  show,
  onHide,
  cardID,
  flash_card_items,
  isFlipped,
  setIsFlipped,
  currentCardIndex,
  setCurrentCardIndex,
}) => {
  const handleClick = (id) => {
    setIsFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePreviousClick = () => {
    setCurrentCardIndex(
      (prevIndex) =>
        (prevIndex - 1 + flash_card_items?.length) % flash_card_items?.length
    );
  };

  const handleNextClick = () => {
    setCurrentCardIndex(
      (prevIndex) => (prevIndex + 1) % flash_card_items?.length
    );
  };

  const handleFlipClick = () => {
    handleClick(currentCardIndex);
  };

  const gamificationSubmit = async (cardID) => {
    const data = {
      model: "Flash Card",
      object_id: cardID,
    };
    try {
      const response = await ajaxCall(
        "/gamification/points/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
            }`,
          },
          method: "POST",
          body: JSON.stringify(data),
        },
        8000
      );
      if (response.status === 201) {
        toast.success("Points Updated Successfully");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (currentCardIndex === flash_card_items?.length - 1) {
      gamificationSubmit(cardID);
    }
  }, [currentCardIndex, flash_card_items, cardID]);

  return (
    <SmallModal
      size="lg"
      centered
      isOpen={show}
      onClose={onHide}
      footer={
        <div className="flesh-card-modal-footer">
          <button
            disabled={currentCardIndex === 0}
            className="default__button"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
          <button className="default__button" onClick={handleFlipClick}>
            Flip
          </button>
          <button
            disabled={flash_card_items?.length - 1 === currentCardIndex}
            className="default__button"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      }
    >
      <div className="row">
        <div className="flesh-card-modal-container">
          <CardFlip
            isFlipped={isFlipped[currentCardIndex]}
            flipDirection="horizontal"
          >
            <div
              className="gridarea__wraper gridarea__wraper__2"
              style={{ backgroundColor: "#01579b33" }}
              onClick={() => handleClick(currentCardIndex)}
            >
              <div>
                <h3>{flash_card_items[currentCardIndex]?.front}</h3>
              </div>
            </div>
            <div
              className="gridarea__wraper gridarea__wraper__2 "
              style={{ backgroundColor: "#fb980645" }}
              onClick={() => handleClick(currentCardIndex)}
            >
              <div>
                <h3>{flash_card_items[currentCardIndex]?.back}</h3>
              </div>
            </div>
          </CardFlip>
        </div>
      </div>
    </SmallModal>
  );
};

export default FlashCardModal;
