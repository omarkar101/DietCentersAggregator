import React from "react";
import { useCallback, useReducer, useState, useEffect } from "react";
import { getAllMealPlans } from "../../api/requests";
import Collection from "../common/collection";
import "./diningOut.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "get-list-of-meal-plans":
      return { ...state, mealPlans: action.mealPlans };
    default:
      throw new Error();
  }
};

const DiningOut = () => {

  const [state, dispatch] = useReducer(reducer, {
    mealPlans: [],
  });

  useEffect(() => {
    getAllMealPlans()
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "get-list-of-meal-plans",
            mealPlans: response.data.meal_plans,
          });
        } else {
          console.log(response.data.message);
        }
      })
  }, []);

  return (
    <div>
      <Collection list={state.mealPlans} />
    </div>
  );
};

export default DiningOut;
