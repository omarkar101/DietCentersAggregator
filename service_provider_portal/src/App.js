import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/common/navbar";
import Items from "./components/items/items";
import Login from "./components/login/login";
import MealPlans from "./components/meal_plans/mealPlans";
import Profile from "./components/profile/profile";
import SignUp from "./components/signup/signup";
import Authentication from "./containers/auth_container";
import User from "./containers/user_container";
import API from "./api/api";

const App = () => {
  API.interceptors.response.use((response) => {
    if (response.data.response_status === 401) {
      window.location.pathname = "/login";
    }
    return response;
  });
  return (
    <>
      <Authentication.Provider>
        <User.Provider>
          <BrowserRouter>
            <AppNavbar />
            <Routes>
              <Route path="/" element={<MealPlans />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/items" element={<Items />} />
              <Route path="/meal_plans" element={<MealPlans />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </User.Provider>
      </Authentication.Provider>
    </>
  );
};

export default App;
