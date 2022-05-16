import React, { useReducer, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { getMealPlanItems, getClientPreferredMeal } from "../../api/requests";
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
  const { isOpen, onClose, client, mealPlan, onSubmit } = props;

  const [state, dispatch] = useReducer(reducer, {
    mealPlan: null,
    itemsOfMealPlan: [],
    mealPlanItems: [],
    preferredMeal: null,
    mostRecentMealOrdered: null
  }); 



  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(client.user_id, e.target.id);
    onClose();
  };

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
        <Modal.Title>Select a meal to send for the client</Modal.Title>
      </Modal.Header>
      <div className="p-2">
        this user prefers the meal: 
        {(state.preferredMeal==null)
          ? `This user has no preferred meal yet`
          : <div>
          
          {state.preferredMeal.name}
        <Button onClick={handleSubmit} id={state.preferredMeal.id} class="btn btn-success">send</Button>
        </div>
          }

      </div>

      <hr/>
      other items in this meal plan:
      
      <Modal.Body>
        <div className='p-2'>
          {state.mealPlanItems?.map((item) => (
            <div>
              <div>item name: {item.name}</div>
              <div>description: {item.description}</div>
                <Button onClick={handleSubmit} id={item.id} class="btn btn-success">send</Button>
              <hr/>
            </div>
            
          ))}
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreferredMealModal;
