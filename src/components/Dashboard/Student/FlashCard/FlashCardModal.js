import React from "react";
import CardFlip from "react-card-flip";
import Modal from "react-bootstrap/Modal";

const FlashCardModal = ({
  show,
  onHide,
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

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="customization-of-flesh-card-modal"
    >
      <Modal.Header
        closeButton
        className="custom-css-for-flesh-card-modal-bg"
      />
      <Modal.Body className="custom-css-for-flesh-card-modal-bg">
        <div className="row">
          <div className="flesh-card-modal-container" data-aos="fade-up">
            <CardFlip
              isFlipped={isFlipped[currentCardIndex]}
              flipDirection="horizontal"
            >
              <div
                className="gridarea__wraper gridarea__wraper__2 global-neomorphism-card-styling"
                onClick={() => handleClick(currentCardIndex)}
              >
                <div>
                  <h3>{flash_card_items[currentCardIndex]?.front}</h3>
                </div>
              </div>
              <div
                className="gridarea__wraper gridarea__wraper__2 global-neomorphism-card-styling"
                onClick={() => handleClick(currentCardIndex)}
              >
                <div>
                  <h3>{flash_card_items[currentCardIndex]?.back}</h3>
                </div>
              </div>
            </CardFlip>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="custom-css-for-flesh-card-modal-bg">
        <div className="flesh-card-modal-footer">
          <button
            disabled={currentCardIndex === 0}
            className="default__button"
            onClick={handlePreviousClick}
          >
            Previous
          </button>
          <button
            disabled={flash_card_items?.length - 1 === currentCardIndex}
            className="default__button"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default FlashCardModal;