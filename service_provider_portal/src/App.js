import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/common/navbar";
import Items from "./components/items/items";
import Login from "./components/login/login";
import MealPlans from "./components/meal_plans/mealPlans";
import SignUp from "./components/signup/signup";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppNavbar />
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/items' element={<Items />} />
          <Route path='/meal_plans' element={<MealPlans />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
