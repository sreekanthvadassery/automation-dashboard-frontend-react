import React from 'react'
import { useState } from "react";
import { Row, Col, Container, Card, Table, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirmation from '../DeleteConfirmation';

const DeleteConfirmationExample = () => {
    // Set up a list of fruits and vegetables
    const [fruits, setFruits] = useState([
      { id: 1, name: "Apple" },
      { id: 2, name: "Orange" },
      { id: 3, name: "Banana" },
      { id: 4, name: "Kiwi" },
      { id: 5, name: "Pineapple" },
    ]);
    const [vegetables, setVegetables] = useState([
      { id: 1, name: "Lettuce" },
      { id: 2, name: "Carrot" },
      { id: 3, name: "Onion" },
      { id: 4, name: "Brocolli" },
      { id: 5, name: "Mushroom" },
    ]);
  
    // Set up some additional local state
    const [entityType, setEntityType] = useState(null);
    const [id, setId] = useState(null);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [fruitMessage, setFruitMessage] = useState(null);
    const [vegetableMessage, setVegetableMessage] = useState(null);
  
    // Handle the displaying of the modal based on type and id
    const showDeleteModal = (entityType, id) => {
      setEntityType(entityType);
      setId(id);
      setFruitMessage(null);
      setVegetableMessage(null);
  
      if (entityType === "fruit") {
        setDeleteMessage(`Are you sure you want to delete the fruit '${fruits.find((x) => x.id === id).name}'?`);
      } else if (entityType === "vegetable") {
        setDeleteMessage(`Are you sure you want to delete the vegetable '${vegetables.find((x) => x.id === id).name}'?`);
      }
  
      setDisplayConfirmationModal(true);
    };
  
    // Hide the modal
    const hideConfirmationModal = () => {
      setDisplayConfirmationModal(false);
    };
  
    // Handle the actual deletion of the item
    const submitDelete = (entityType, id) => {
      if (entityType === "fruit") {
        setFruitMessage(`The fruit '${fruits.find((x) => x.id === id).name}' was deleted successfully.`);
        setFruits(fruits.filter((fruit) => fruit.id !== id));
      } else if (entityType === "vegetable") {
        setVegetableMessage(`The vegetable '${vegetables.find((x) => x.id === id).name}' was deleted successfully.`);
        setVegetables(vegetables.filter((vegetable) => vegetable.id !== id));
      }
      setDisplayConfirmationModal(false);
    };
  
    return (
      <Container className="mt-4">
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <h1>Reusable Delete Confirmation Modal</h1>
            <Card className="mt-2">
              <Card.Header>Fruits</Card.Header>
              <Card.Body>
                {fruitMessage && <Alert variant="success">{fruitMessage}</Alert>}
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th style={{ width: "120px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fruits.map((fruit) => {
                      return (
                        <tr key={fruit.id}>
                          <td>{fruit.id}</td>
                          <td>{fruit.name}</td>
                          <td className='text-center'>
                            <FontAwesomeIcon icon={faTrash} className="text-danger cursor" onClick={() => showDeleteModal("fruit", fruit.id)} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
            <Card className="mt-2">
              <Card.Header>Vegetables</Card.Header>
              <Card.Body>
                {vegetableMessage && <Alert variant="success">{vegetableMessage}</Alert>}
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th style={{ width: "120px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vegetables.map((vegetable) => {
                      return (
                        <tr key={vegetable.id}>
                          <td>{vegetable.id}</td>
                          <td>{vegetable.name}</td>
                          <td className='text-center'>
                            <FontAwesomeIcon icon={faTrash} className="text-danger cursor" onClick={() => showDeleteModal("vegetable", vegetable.id)} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <DeleteConfirmation showModal={displayConfirmationModal} hideModal={hideConfirmationModal} confirmModal={submitDelete} id={id} entityType={entityType} message={deleteMessage} />
      </Container>
    );
  };

export default DeleteConfirmationExample