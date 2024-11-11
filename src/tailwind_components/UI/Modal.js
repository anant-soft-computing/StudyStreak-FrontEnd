import React from "react";
import Modal from "react-bootstrap/Modal";

const SmallModal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size,
  centered,
}) => {
  return (
    <Modal show={isOpen} onHide={onClose} size={size} centered={centered}>
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
};

export default SmallModal;