import React, { useReducer, useEffect } from "react";
import { Button, Form, Modal, Table, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { subscribeClientToMealPlan } from "../../api/requests";
import { getItemsOfAMealPlan, getMealPlanById, getClientMealPlan } from "../../api/requests";
import ItemCard from "./itemCard";

const reducer = (state, action) => {
  switch (action.type) {
    case "get-meal-plan-by-id":
      return { ...state, mealPlan: action.mealPlan };
    case "get-items-of-meal-plan":
      return { ...state, itemsOfMealPlan: action.itemsOfMealPlan };
    default:
      throw new Error();
  }
};

const SubscribeModal = (props) => {
  const { isOpen, onClose, onSubmit, mealPlanId } = props;

  const [state, dispatch] = useReducer(reducer, {
    mealPlan: null,
    itemsOfMealPlan: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  useEffect(() => {
    getMealPlanById(mealPlanId)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "get-meal-plan-by-id",
            mealPlan: response.data.meal_plan,
          });
        } else {
          console.log(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    if (state.selectedMealPlanId == null) {
      return;
    } else {
      getItemsOfAMealPlan(mealPlanId)
        .then((response) => {
          if (response.data.success) {
            dispatch({
              type: "get-items-of-meal-plan",
              itemsOfMealPlan: response.data.meal_plan_items,
            });
          } else {
            console.log(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [mealPlanId]);

  return (
    <Modal size="lg" show={isOpen} onHide={onClose} onClose={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Do you want to subscribe to this meal plan?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column">
          details about subscription and so...
        </div>
        {/* <Form onSubmit={handleSubmit}>
        </Form> */}
        <div>
          {/* price: {state.mealPlan.price} */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Subscribe
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubscribeModal;
