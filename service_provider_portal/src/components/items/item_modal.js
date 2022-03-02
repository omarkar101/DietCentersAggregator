import React , { useState }from "react";
import { Button, Form, Modal } from "react-bootstrap";
import UploadAndDisplayImage from "../uploadImage/UploadAndDisplayImage";
import { addOneItem } from '../../api/requests';

const ItemModal = (props) => {

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);

  const { isOpen, onClose, onSubmit, itemName, itemDescription, itemCategory } = props;

  const { items } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    addOneItem(name, description, category)
      .then(response => {
        console.log(response);
        if(response.data.success) {
          items = data.items;
        } else {
          alert(response.data.message);
        }
      })
      .catch(e => {
        alert(e);
      }) 
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={itemName} onChange={e => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCategort">
            <Form.Label>Categroy</Form.Label>
            <Form.Control as="textarea" placeholder="Category" value={itemCategory} onChange={e => setCategory(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Description" rows={3} value={itemDescription} onChange={e => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label>Item Image</Form.Label>
            <UploadAndDisplayImage />
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
