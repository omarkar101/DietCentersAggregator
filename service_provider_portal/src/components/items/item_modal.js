import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ItemModal = (props) => {
  const { isOpen, onClose, onSubmit, itemName, itemDescription } = props;
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={itemName} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Description" rows={3} value={itemDescription} />
          </Form.Group>
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
    </Modal>);
}

export default ItemModal;
