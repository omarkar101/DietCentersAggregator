import React from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

const AddNewItemModal = (props) => {
  const { isOpen, onClose, onSubmit, itemName, itemDescription } = props;

  const items = [
    { name: "Burger", description: "Hello World", categories: "Fast Food" },
    { name: "Burger", description: "Hello World", categories: "Fast Food" },
    { name: "Burger", description: "Hello World", categories: "Fast Food" },
  ];

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      style={{ background: isOpen ? "black" : "" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                  <Button id={index} variant="success" size="sm">
                    Add this item to your meal plan
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewItemModal;
