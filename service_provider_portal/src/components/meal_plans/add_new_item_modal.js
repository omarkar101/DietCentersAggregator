import React, { useEffect, useReducer } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { getItemsNotInMealPlan } from "../../api/requests";

const reducer = (state, action) => {
  switch (action.type) {
    case 'success-load-items':
      return {...state, items: action.items};
    default:
      throw new Error();
  }
};

const AddNewItemModal = (props) => {
  const { isOpen, onClose, mealPlanId } = props;

  const [state, dispatch] = useReducer(reducer, {
    selectedItemId: null,
    items: []
  });

  useEffect(() => {
    console.log('mealPlanId:', mealPlanId);
    if (mealPlanId != null) {
      getItemsNotInMealPlan(mealPlanId)
        .then((response) => {
          if (response.data.success) {
            dispatch({ type: 'success-load-items', items: response.data.items });
          } else {
            alert(response.data.message);
          }
        })
        .catch((e) => {
          alert(e)
        })
    }
  }, [mealPlanId]);

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
          {state.items.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <div className="mb-2">
                  <Button id={item.id} variant="success" size="sm">
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
