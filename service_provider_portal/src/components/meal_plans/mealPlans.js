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
        selectedMealPlanDescription: action.mealPlanDescription,
        selectedMealPlanName: action.mealPlanName,
        selectedMealPlanPrice: action.mealPlanPrice,
        selectedMealPlanCounter: action.mealPlanCounter,
      };
    case "submit-add-meal-plan-modal":
      return {
        ...state,
        modalOpen: false,
        selectedMealPlanDescription: "",
        selectedMealPlanName: "",
        selectedMealPlanPrice: 0,
        selectedMealPlanCounter: 0,
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
        selectedMealPlanPrice: action.mealPlanPrice,
        selectedMealPlanCounter: action.mealPlanCounter,
      };
    case "submit-edit-meal-plan-modal":
      return {
        ...state,
        modalOpen: false,
        selectedMealPlanId: null,
        selectedMealPlanDescription: "",
        selectedMealPlanName: "",
        selectedMealPlanPrice: 0,
        selectedMealPlanCounter: 0,
        mealPlans: action.mealPlans,
      };
    case "close-meal-plan-modal":
      return {
        ...state,
        modalOpen: false,
        selectedMealPlanId: null,
        selectedMealPlanDescription: "",
        selectedMealPlanName: "",
        selectedMealPlanPrice: 0,
        selectedMealPlanCounter: 0,
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
    selectedMealPlanPrice: 0,
    selectedMealPlanImage: null,
    selectedMealPlanCounter: 0,
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

  const toggleModalOnSubmit = (mealPlanName, mealPlanDescription, mealPlanPrice, mealPlanImage, mealPlanCounter) => {
    if (state.selectedMealPlanId == null) {
      addOneMealPlan(mealPlanName, mealPlanDescription, mealPlanPrice, mealPlanCounter)
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
      editOneMealPlan(state.selectedMealPlanId, mealPlanName, mealPlanDescription, mealPlanPrice, mealPlanImage, mealPlanCounter)
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
  };

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
    const mealPlanPrice = e.target.dataset.mealplanprice;
    const mealPlanCounter = e.target.dataset.mealplancounter;
    dispatch({
      type: "open-add-meal-plan-modal",
      mealPlanDescription: mealPlanDescription,
      mealPlanName: mealPlanName,
      mealPlanPrice: mealPlanPrice,
      mealPlanCounter: mealPlanCounter,
    });
  }, []);

  const toggleOpenEditMealPlanModal = useCallback((e) => {
    const mealPlanId = e.target.id;
    const mealPlanName = e.target.dataset.mealplanname;
    const mealPlanDescription = e.target.dataset.mealplandescription;
    const mealPlanPrice = e.target.dataset.mealplanprice;
    const mealPlanCounter = e.target.dataset.mealplancounter;
    dispatch({
      type: "open-edit-meal-plan-modal",
      mealPlanId: mealPlanId,
      mealPlanName: mealPlanName,
      mealPlanDescription: mealPlanDescription,
      mealPlanPrice: mealPlanPrice,
      mealPlanCounter: mealPlanCounter,
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
          mealPlanId={state.selectedMealPlanId}
          mealPlanName={state.selectedMealPlanName}
          mealPlanDescription={state.selectedMealPlanDescription}
          mealPlanPrice={state.selectedMealPlanPrice}
          mealPlanImage={state.selectedMealPlanImage}
          mealPlanCounter={state.selectedMealPlanCounter}
        />
        <Button variant="success" data-mealplanname=''
          data-mealplandescription='' data-mealplanprice='0' onClick={toggleOpenAddMealPlanModal}>
          Add Meal Plan
        </Button>
        <Table striped bordered hover>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          {state.mealPlans?.map((mealPlan) => (
            <tr>
              <td><img width={'100px'} height={'100px'} src={mealPlan.image} alt="2" /></td>
              <td>{mealPlan.name}</td>
              <td>{mealPlan.description}</td>
              <td>{mealPlan.price}</td>
              <td>
                <div className="mb-4">
                  <Button
                    id={mealPlan.id}
                    data-mealplanname={mealPlan.name}
                    data-mealplandescription={mealPlan.description}
                    data-mealplanprice={mealPlan.price}
                    data-mealplancounter={mealPlan.meal_plan_uses}
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
