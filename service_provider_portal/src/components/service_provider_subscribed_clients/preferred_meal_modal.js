import React, { useReducer, useEffect, useCallback } from "react";
import { Button, Form, Modal, Table, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { subscribeClientToMealPlan } from "../../api/requests";
import { getItemsOfAMealPlan, getMealPlanById, getClientMealPlan, getMealPlanItems, getClientPreferredMeal, sendMealToClient } from "../../api/requests";
// import ItemCard from "./itemCard";

const reducer = (state, action) => {
  switch (action.type) {
    case "get-meal-plan-by-id":
      return { ...state, mealPlan: action.mealPlan };
    case "get-items-of-meal-plan":
      return { ...state, itemsOfMealPlan: action.itemsOfMealPlan };
    case "success-load-items": 
      return {...state, mealPlanItems: action.items}
    case "success-load-preferred-meal":
      return {...state, preferredMeal: action.preferredMeal}
    default:
      throw new Error();
  }
};

const PreferredMealModal = (props) => {
  const { isOpen, onClose, client, mealPlan } = props;

  const [state, dispatch] = useReducer(reducer, {
    mealPlan: null,
    itemsOfMealPlan: [],
    mealPlanItems: [],
    preferredMeal: null,
    mostRecentMealOrdered: null
  }); 

const sendMeal = useCallback((e) => {
  // console.log(itemId)
  if (client != null){
    if (e.target.id!=null){
      sendMealToClient(client.user_id, e.target.id)
        .then((response) => {
          if (response.data.success) {
            onClose()
          } else {
            console.log(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }
}, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit();
//   };

  useEffect(() => {
    if (mealPlan != null) {
      getMealPlanItems(mealPlan.id)
        .then((response) => {
          if (response.data.success) {
            dispatch({ type: "success-load-items", items: response.data.meal_plan_items})
          } else {
            console.log(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    if (client != null){
      getClientPreferredMeal(client.user_id)
        .then((response) => {
          if (response.data.success) {
            dispatch({ type: "success-load-preferred-meal", preferredMeal: response.data.preferred_item})
          } else {
            console.log(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [mealPlan, client]);

  return (
    <Modal size="lg" show={isOpen} onHide={onClose} onClose={onClose}>
      <Modal.Header closeButton> 
        <Modal.Title>prefered</Modal.Title>
      </Modal.Header>
      <div>
        this user prefers the meal: 
        {(state.preferredMeal==null)
          ? `This user has no preferred meal yet`
          : <div>
          
          {state.preferredMeal.name}
        <Button onClick={sendMeal} id={state.preferredMeal.id} class="btn btn-success">send</Button>
        </div>
          }

      </div>

      <hr/>
      other items in this meal plan:
      
      <Modal.Body>
        {state.mealPlanItems?.map((item) => (
          <div>
            <div>item name: {item.name}</div>
            <div>description: {item.description}</div>
              <Button id={item.id} onClick={sendMeal} class="btn btn-success">send</Button>
            <hr/>
          </div>
          
        ))}
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreferredMealModal;
