import React , { useState, useReducer, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import UploadAndDisplayImage from "../uploadImage/UploadAndDisplayImage";
import { addOneItem } from '../../api/requests';

const ItemModal = (props) => {
  const { isOpen, onClose, onSubmit, itemName, itemDescription, itemCategory } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, description, category, image);

    setName('');
    setDescription('');
    setCategory('');
  }

  useEffect(() => {
    setName(itemName);
    setDescription(itemDescription);
    setCategory(itemCategory);
  }, [itemName, itemDescription, itemCategory]);

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control required type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control required type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control required as="textarea" placeholder="Description" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Item Image</Form.Label>
            <UploadAndDisplayImage image={image} setImage={setImage} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>);
}

export default ItemModal;
