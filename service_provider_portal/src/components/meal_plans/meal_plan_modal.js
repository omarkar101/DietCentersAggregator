import React from "react";
import { useCallback, useReducer, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import styled from "styled-components";
import AddNewItemModal from "./add_new_item_modal";

const reducer = (state, action) => {
  switch (action.type) {
    case 'open-add-item-modal':
      return {modalOpen: true, selectedItemId: null, selectedItemDescription: null, selectedItemName: null};
    case 'submit-add-item-modal':
      return {modalOpen: false, selectedItemDescription: action.itemDescription, selectedItemName: action.itemName};
    case 'delete-item':
      return {};
    case 'open-edit-item-modal':
      return {modalOpen: true, selectedItemDescription: action.itemDescription, selectedItemName: action.itemName};
    case 'submit-edit-item-modal':
      return {modalOpen: false, selectedItemDescription: action.itemDescription, selectedItemName: action.itemName,
        selectedItemId: action.itemId};
    case 'close-item-modal':
      return {modalOpen: false, selectedItemDescription: null, selectedItemName: null, selectedItemId: null};
    default:
      throw new Error();
  }
}

const MealPlanModal = (props) => {
  const { isOpen, onClose, onSubmit, mealPlanName, mealPlanDescription } = props;

  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    selectedItemId: null,
    selectedItemDescription: null,
    selectedItemName: null
  });

  const items = [
    { name: "Burger", description: "Hello World", categories: "Fast Food" },
    { name: "Burger", description: "Hello World", categories: "Fast Food" },
    { name: "Burger", description: "Hello World", categories: "Fast Food" },
  ];


  const toggleDeleteItem = useCallback((e) => {
    console.log('delete');
    dispatch({type: 'delete-item'});
  }, []);

  const toggleOpenModal = useCallback((e) => {
    dispatch({type: 'open-add-item-modal'});
  }, []);

  const toggleModalOnSubmit = useCallback(() => {
    dispatch({type: 'close-item-modal'});
  }, []);

  const toggleModalOnClose = useCallback(() => {
    dispatch({type: 'close-item-modal'});
  }, []);

  return (
    <Modal size="lg" show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Meal Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={mealPlanName}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              rows={3}
              value={mealPlanDescription}
            />
          </Form.Group>
          <Container>
          <AddNewItemModal isOpen={state.modalOpen} onClose={toggleModalOnClose} onSubmit={toggleModalOnSubmit}
          mealPlanName={state.selectedMealPlanName} mealPlanDescription={state.selectedMealPlanDescription} />
            <h2>These are the items in this meal plan <Button variant="success" onClick={toggleOpenModal}>Add new item</Button></h2>
            
            <Table striped bordered hover>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
              {items.map((item, index) => (
                <tr>
                  <td>{item.name}</td>
                  <td>This is food</td>
                  <td>
                    <div className="mb-2">
                      <Button id={index} variant="danger" size="sm" onClick={toggleDeleteItem}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Container = styled.div`
  margin: 10px 10px 10px 10px;
  th,
  tr {
    text-align: center;
  }
`;

export default MealPlanModal;
