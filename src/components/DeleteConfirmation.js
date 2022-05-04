import React from 'react'
import { Modal, Button } from "react-bootstrap";

import "../styles.css";

const DeleteConfirmation = ({ showModal, hideModal, confirmModal, id, entityType, message }) => {
  return (
    <Modal show={showModal} onHide={hideModal} className="special_modal">
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body><div>{message}</div></Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => confirmModal(entityType, id) }>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmation