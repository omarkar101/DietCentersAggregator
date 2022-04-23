import React, { useState, useReducer, useEffect, useCallback } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import styled from "styled-components";
import { getMealPlanItems, removeItemFromMealPlan } from "../../api/requests";
import UploadAndDisplayImage from "../uploadImage/UploadAndDisplayImage";
import AddNewItemModal from "./add_new_item_modal";

const reducer = (state, action) => {
  switch (action.type) {
    case "success-load-meal-plan-items":
      return { ...state, selectedMealPlanItems: action.selectedMealPlanItems };
    case "open-add-item-modal":
      return { ...state, modalOpen: true };
    case "close-item-modal":
      return { ...state, modalOpen: false };
    case "clear-selected-meal-plan-items":
      return { ...state, selectedMealPlanItems: [] };
    default:
      throw new Error();
  }
};

const MealPlanModal = (props) => {
  const {
    isOpen,
    onClose,
    onSubmit,
    mealPlanId,
    mealPlanName,
    mealPlanDescription,
    mealPlanPrice,
    mealPlanImage,
    mealPlanCounter,
  } = props;
  const [planName, setPlanName] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [planPrice, setPlanPrice] = useState(0);
  const [planImage, setPlanImage] = useState(null);
  const [planCounter, setPlanCounter] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(planName, planDescription, planPrice, planImage, planCounter);
    setPlanName("");
    setPlanDescription("");
    setPlanPrice(0);
    setPlanImage(null);
    setPlanCounter(0);
  };

  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    selectedMealPlanItems: [],
  });

  useEffect(() => {
    if (mealPlanId != null) {
      getMealPlanItems(mealPlanId)
        .then((response) => {
          if (response.data.success) {
            dispatch({
              type: "success-load-meal-plan-items",
              selectedMealPlanItems: response.data.meal_plan_items,
            });
          } else {
            console.log(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      dispatch({ type: "clear-selected-meal-plan-items" });
    }
  }, [mealPlanId]);

  useEffect(() => {
    setPlanName(mealPlanName);
    setPlanDescription(mealPlanDescription);
    setPlanPrice(mealPlanPrice);
    setPlanImage(mealPlanImage);
    setPlanCounter(mealPlanCounter);
  }, [
    mealPlanName,
    mealPlanDescription,
    mealPlanPrice,
    mealPlanImage,
    mealPlanCounter,
  ]);

  const toggleDeleteItem = useCallback((e) => {
    console.log("mealPlanId:", mealPlanId);
    console.log("itemId:", e.target.id);
    removeItemFromMealPlan(mealPlanId, e.target.id)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "success-load-meal-plan-items",
            selectedMealPlanItems: response.data.meal_plan_items,
          });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [mealPlanId]);

  const toggleOpenModal = useCallback((e) => {
    dispatch({ type: "open-add-item-modal" });
  }, []);

  const toggleModalOnSubmit = useCallback(() => {
    dispatch({ type: "close-item-modal" });
  }, []);

  const toggleModalOnClose = useCallback(() => {
    dispatch({ type: "close-item-modal" });
  }, []);

  return (
    <Modal size="lg" show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Meal Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              rows={3}
              value={planDescription}
              onChange={(e) => setPlanDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={planPrice}
              onChange={(e) => setPlanPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCounter">
            <Form.Label>Number of monthly subscription meals</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter number of uses"
              value={planCounter}
              onChange={(e) => setPlanCounter(e.target.value)}
            />
          </Form.Group>
          {!mealPlanId && <h3>To add items and image for this meal plan, please edit it after adding it.</h3>}
          {mealPlanId &&
            <>
              <Form.Group className="mb-3">
                <Form.Label>Meal Plan Image</Form.Label>
                <UploadAndDisplayImage
                  image={planImage}
                  setImage={setPlanImage}
                />
              </Form.Group>
              <Container>
                <AddNewItemModal
                  isOpen={state.modalOpen}
                  onClose={toggleModalOnClose}
                  onSubmit={toggleModalOnSubmit}
                  mealPlanId={mealPlanId}
                />
                <h2>
                  These are the items in this meal plan{" "}
                  <Button variant="success" onClick={toggleOpenModal}>
                    Add new item
                  </Button>
                </h2>

                <Table striped bordered hover>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                  {state.selectedMealPlanItems.map((item) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>
                        <div className="mb-2">
                          <Button
                            id={item.id}
                            variant="danger"
                            size="sm"
                            onClick={toggleDeleteItem}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>
              </Container>
            </>}
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
