import React , {useState} from 'react'
import { Button, Modal } from 'react-bootstrap';

import "../styles.css";

const ModalExample = () => {
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
 
  return (
    <div>
        <Button variant="primary" onClick={handleShow}>
            Launch demo modal
        </Button>

        <Modal variant="dark" show={show} onHide={handleClose} className="special_modal">
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalExample