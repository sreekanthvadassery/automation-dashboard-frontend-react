import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave} from '@fortawesome/free-solid-svg-icons'
import { Modal, Button } from "react-bootstrap";

//Basic Reference
//https://codemoto.io/coding/react/react-delete-confirmation-modal
const SubmitConfirmation = ({ showModal, hideModal, confirmModal, data, message }) => {
  return (
    <Modal show={showModal} onHide={hideModal} className="special_modal">
      <Modal.Header closeButton>
        <Modal.Title>Are you sure to Submit the data?</Modal.Title>
      </Modal.Header>
      <Modal.Body><div>{message}</div></Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={hideModal}>
            Cancel
        </Button>
        <Button variant="success" onClick={() => confirmModal( data) }>
            <FontAwesomeIcon icon={faSave} />Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SubmitConfirmation