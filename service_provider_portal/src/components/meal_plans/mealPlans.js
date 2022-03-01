import { useCallback, useReducer, useState } from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import MealPlanModal from "./meal_plan_modal";

const reducer = (state, action) => {
  switch (action.type) {
    case 'open-add-meal-plan-modal':
      return {modalOpen: true, selectedMealPlanId: null, selectedMealPlanDescription: null, selectedMealPlanName: null};
    case 'submit-add-meal-plan-modal':
      return {modalOpen: false, selectedMealPlanDescription: action.mealPlanDescription, selectedMealPlanName: action.mealPlanName};
    case 'delete-meal-plan':
      return {};
    case 'open-edit-meal-plan-modal':
      return {modalOpen: true, selectedMealPlanDescription: action.mealPlanDescription, selectedMealPlanName: action.mealPlanName};
    case 'submit-edit-meal-plan-modal':
      return {modalOpen: false, selectedMealPlanDescription: action.mealPlanDescription, selectedMealPlanName: action.mealPlanName,
        selectedMealPlanId: action.mealPlanId};
    case 'close-meal-plan-modal':
      return {modalOpen: false, selectedMealPlanDescription: null, selectedMealPlanName: null, selectedMealPlanId: null};
    default:
      throw new Error();
  }
}

const MealPlans = (props) => {

  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    selectedMealPlanId: null,
    selectedMealPlanDescription: null,
    selectedMealPlanName: null
  });

  const mealPlans = [
    {'name': 'Burger', 'description': 'Hello World', 'categories': 'Fast Food'},
    {'name': 'Burger', 'description': 'Hello World', 'categories': 'Fast Food'},
    {'name': 'Burger', 'description': 'Hello World', 'categories': 'Fast Food'}
  ]

  const toggleDeleteMealPlan = useCallback((e) => {
    console.log('delete');
    dispatch({type: 'delete-meal-plan'});
  }, []);

  const toggleOpenModal = useCallback((e) => {
    const mealPlanId = e.target.id;
    const mealPlanName = e.target.dataset.mealPlanName;
    const mealPlanDescription = e.target.dataset.mealPlanDescription;
    console.log(mealPlanDescription, mealPlanName);
    dispatch({type: 'open-edit-meal-plan-modal', mealPlanDescription: mealPlanDescription, mealPlanName: mealPlanName});
  }, []);

  const toggleModalOnSubmit = useCallback(() => {
    dispatch({type: 'close-meal-plan-modal'});
  }, []);

  const toggleModalOnClose = useCallback(() => {
    dispatch({type: 'close-meal-plan-modal'});
  }, []);

  return (
    <>
      <Container>
        <MealPlanModal isOpen={state.modalOpen} onClose={toggleModalOnClose} onSubmit={toggleModalOnSubmit}
          mealPlanName={state.selectedMealPlanName} mealPlanDescription={state.selectedMealPlanDescription} />
        <Button variant="success" onClick={toggleOpenModal}>Add Meal Plan</Button>
        <Table striped bordered hover>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          {mealPlans.map((mealPlan, index) =>
            <tr>
              <td>{mealPlan.name}</td>
              <td>{mealPlan.description}</td>
              <td>This is food</td>
              <td>
                <div className="mb-4">
                  <Button id={index} data-mealPlanName={mealPlan.name} data-mealPlanDescription={mealPlan.description} variant="primary"
                      size="sm" onClick={toggleOpenModal}>
                    Edit
                  </Button>
                  <Button id={index} variant="danger" size="sm" onClick={toggleDeleteMealPlan}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>)}
        </Table>
      </Container>
    </>);
}

const Container = styled.div`
  margin: 10px 10px 10px 10px;
  th, tr {
    text-align: center;
  }
`;

export default MealPlans;
