import React from "react";
import Modal from "react-bootstrap/Modal";

const SmallModal = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default SmallModal;