import React , { useState, useReducer, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import UploadAndDisplayImage from "../uploadImage/UploadAndDisplayImage";
import { addOneItem } from '../../api/requests';

const reducer = (state, action) => {
  switch (action.type) {
    case 'submit-add-item-modal':
      return { items: action.items };
    case 'submit-edit-item-modal':
      return {};
    default:
      throw new Error();
  }
}

const ItemModal = (props) => {
  const { isOpen, onClose, onSubmit, itemName, itemDescription, itemCategory } = props;

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);


  // const [state, dispatch] = useReducer(reducer, {
  //   items: []
  // });

  // const { items } = state;


  const handleSubmit = (e) => {
    // e.preventDefault();
    // addOneItem(name, description, category)
    //   .then(response => {
    //     if(response.data.success) {
    //       items = response.data.items;
    //       dispatch({type: 'submit-add-item-modal', items: items });
    //     } else {
    //       alert(response.data.message);
    //     }
    //   })
    //   .catch(e => {
    //     alert(e);
    //   }) 
  }

  useEffect(() => {
    setName(itemName);
    setDescription(itemDescription);
    setCategory(itemCategory)
  }, [itemName, itemDescription, itemCategory]);

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCategory">
            <Form.Label>Categroy</Form.Label>
            <Form.Control type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Description" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
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
