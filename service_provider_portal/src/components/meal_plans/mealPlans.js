import { useCallback, useEffect, useReducer, useState } from "react";
import { Button, Table } from "react-bootstrap";
import styled from "styled-components";
import MealPlanModal from "./meal_plan_modal";
import {
  addOneMealPlan,
  deleteOneMealPlan,
  editOneMealPlan,
  getAllMealPlans,
} from "../../api/requests";

const reducer = (state, action) => {
  switch (action.type) {
    case "get-all-meal-plans":
      return { ...state, modalOpen: false, mealPlans: action.mealPlans };
    case "open-add-meal-plan-modal":
      return {
        ...state,
        modalOpen: true,
        selectedMealPlanId: null,
        selectedMealPlanDescription: null,
        selectedMealPlanName: null,
      };
    case "submit-add-meal-plan-modal":
      return {
        ...state,
        modalOpen: false,
        selectedMealPlanDescription: "",
        selectedMealPlanName: "",
        mealPlans: action.mealPlans,
      };
    case "delete-meal-plan":
      return { ...state, mealPlans: action.mealPlans };
    case "open-edit-meal-plan-modal":
      return {
        ...state,
        modalOpen: true,
        selectedMealPlanId: action.mealPlanId,
        selectedMealPlanDescription: action.mealPlanDescription,
        selectedMealPlanName: action.mealPlanName,
      };
    case "submit-edit-meal-plan-modal":
      return {
        ...state,
        modalOpen: false,
        selectedMealPlanId: null,
        selectedMealPlanDescription: "",
        selectedMealPlanName: "",
      };
    case "close-meal-plan-modal":
      return {
        ...state,
        modalOpen: false,
        selectedMealPlanId: "",
        selectedMealPlanDescription: "",
        selectedMealPlanName: "",
      };
    default:
      throw new Error();
  }
};

const MealPlans = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    modalOpen: false,
    selectedMealPlanId: null,
    selectedMealPlanDescription: "",
    selectedMealPlanName: "",
    mealPlans: [],
  });

  useEffect(() => {
    getAllMealPlans()
    .then((response) => {
      if (response.data.success) {
        dispatch({ type: 'get-all-meal-plans', mealPlans: response.data.meal_plans})
      } else {
        alert(response.data.message);
      }
    })
    .catch((e) => {
      alert(e);
    });
  }, []);

  const toggleModalOnSubmit = useCallback((mealPlanName, mealPlanDescription) => {
    if (state.selectedMealPlanId == null) {
      addOneMealPlan(mealPlanName, mealPlanDescription)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: 'submit-add-meal-plan-modal', mealPlans: response.data.meal_plans })
        } else {
          alert(response.data.message);
        }
      })
      .catch((e) => {
        alert(e);
      });
    } else {
      editOneMealPlan(state.selectedMealPlanId, mealPlanName, mealPlanDescription)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: 'submit-edit-meal-plan-modal', mealPlans: response.data.meal_plans })
        } else {
          alert(response.data.message)
        }
      })
      .catch((e) => {
        alert(e);
      });
    }
  }, []);

  const toggleDeleteMealPlan = useCallback((e) => {
    const mealPlanId = e.target.id;
    deleteOneMealPlan(mealPlanId)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: "delete-meal-plan", mealPlans: response.data.meal_plans })
        } else {
          alert(response.data.message);
        }
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const toggleOpenAddMealPlanModal = useCallback((e) => {
    const mealPlanName = e.target.dataset.mealplanname;
    const mealPlanDescription = e.target.dataset.mealplandescription;
    dispatch({
      type: "open-add-meal-plan-modal",
      mealPlanDescription: mealPlanDescription,
      mealPlanName: mealPlanName,
    });
  }, []);

  const toggleOpenEditMealPlanModal = useCallback((e) => {
    const mealPlanId = e.target.id;
    const mealPlanName = e.target.dataset.mealplanname;
    const mealPlanDescription = e.target.dataset.mealplandescription;
    dispatch({
      type: "open-edit-meal-plan-modal",
      mealPlanId: mealPlanId,
      mealPlanName: mealPlanName,
      mealPlanDescription: mealPlanDescription,
    });
  }, []);

  const toggleModalOnClose = useCallback(() => {
    dispatch({ type: "close-meal-plan-modal" });
  }, []);

  return (
    <>
      <Container>
        <MealPlanModal
          isOpen={state.modalOpen}
          onClose={toggleModalOnClose}
          onSubmit={toggleModalOnSubmit}
          mealPlanName={state.selectedMealPlanName}
          mealPlanDescription={state.selectedMealPlanDescription}
        />
        <Button variant="success" data-mealplanname=''
          data-mealplandescription='' onClick={toggleOpenAddMealPlanModal}>
          Add Meal Plan
        </Button>
        <Table striped bordered hover>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
          {state.mealPlans?.map((mealPlan) => (
            <tr>
              <td>{mealPlan.name}</td>
              <td>{mealPlan.description}</td>
              <td>
                <div className="mb-4">
                  <Button
                    id={mealPlan.id}
                    data-mealplanname={mealPlan.name}
                    data-mealplandescription={mealPlan.description}
                    variant="primary"
                    size="sm"
                    onClick={toggleOpenEditMealPlanModal}
                  >
                    Edit
                  </Button>
                  <Button
                    id={mealPlan.id}
                    variant="danger"
                    size="sm"
                    onClick={toggleDeleteMealPlan}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 10px 10px 10px 10px;
  th,
  tr {
    text-align: center;
  }
`;

export default MealPlans;
